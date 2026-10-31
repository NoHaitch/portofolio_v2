import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { chromium } from '@playwright/test'
import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'

const require = createRequire(import.meta.url)
const nextBin = require.resolve('next/dist/bin/next')

const port = 3101
const baseUrl = process.env.LIGHTHOUSE_URL ?? `http://127.0.0.1:${port}`
const reportDir = 'reports/lighthouse'

// The detail route is a hardcoded placeholder slug, update it if that project is renamed.
const routes = [
  '',
  '/about',
  '/experience',
  '/education',
  '/contact',
  '/work',
  '/work/projects',
  '/work/activities',
  '/work/projects/dbms',
]
const locales = ['', '/id', '/ja', '/zh']
const pages = locales.flatMap((locale) => routes.map((route) => `${locale}${route}` || '/'))

// Scores are 0 to 1. Performance is a regression floor, not a target: simulated mobile CPU
// throttling makes the home page swing between roughly 75 and 85 across runs.
const thresholds = {
  accessibility: 1,
  seo: 1,
  'best-practices': 0.9,
  performance: 0.7,
}

const env = { ...process.env, NEXT_DIST_DIR: '.next-e2e' }
let server

async function waitForServer(url) {
  const deadline = Date.now() + 60_000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // Server is not up yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Server did not respond at ${url}`)
}

async function startServer() {
  if (process.env.LIGHTHOUSE_URL) return

  const build = spawnSync(process.execPath, [nextBin, 'build'], { env, stdio: 'inherit' })
  if (build.status !== 0) throw new Error('next build failed')

  server = spawn(
    process.execPath,
    [nextBin, 'start', '--hostname', '127.0.0.1', '--port', String(port)],
    { env, stdio: 'ignore' },
  )
  await waitForServer(baseUrl)
}

function slug(path) {
  return path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')
}

async function main() {
  await startServer()

  const chrome = await launch({
    chromePath: chromium.executablePath(),
    // Reduced motion stops the rotating hero text from being sampled mid-fade by contrast checks.
    chromeFlags: ['--headless=new', '--no-sandbox', '--force-prefers-reduced-motion'],
  })

  mkdirSync(reportDir, { recursive: true })
  const failures = []
  const rows = []

  try {
    for (const path of pages) {
      const result = await lighthouse(`${baseUrl}${path}`, {
        port: chrome.port,
        output: ['html', 'json'],
        logLevel: 'error',
        onlyCategories: Object.keys(thresholds).map((key) => key),
      })
      if (!result) throw new Error(`No Lighthouse result for ${path}`)

      writeFileSync(`${reportDir}/${slug(path)}.html`, result.report[0])
      writeFileSync(`${reportDir}/${slug(path)}.json`, result.report[1])

      const row = { page: path }
      for (const [category, minimum] of Object.entries(thresholds)) {
        const score = result.lhr.categories[category].score ?? 0
        row[category] = Math.round(score * 100)
        if (score < minimum) {
          failures.push(`${path} ${category}: ${Math.round(score * 100)} < ${minimum * 100}`)
        }
      }
      rows.push(row)
    }
  } finally {
    await chrome.kill()
  }

  console.table(rows)
  console.log(`Reports written to ${reportDir}`)

  if (failures.length > 0) {
    console.error(`\nBelow threshold:\n${failures.join('\n')}`)
    process.exitCode = 1
  }
}

try {
  await main()
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  server?.kill()
}
