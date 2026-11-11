import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import en from '@/lib/i18n/messages/en'
import { getItems } from '@/lib/work'
import { chunkMarkdown, type KnowledgeChunk } from './retrieval'

const profilePath = path.join(process.cwd(), 'content', 'assistant', 'profile.md')
const educationPath = path.join(process.cwd(), 'content', 'assistant', 'education.md')

function pushChunks(
  chunks: KnowledgeChunk[],
  base: Omit<KnowledgeChunk, 'id' | 'text'>,
  idPrefix: string,
  body: string,
) {
  chunkMarkdown(body).forEach((text, index) => {
    chunks.push({ ...base, id: `${idPrefix}-${index}`, text })
  })
}

// English only: the assistant answers from the canonical English content.
export function buildKnowledgeBase(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = []

  const profile = matter(fs.readFileSync(profilePath, 'utf8'))
  pushChunks(
    chunks,
    { title: String(profile.data.title ?? 'Profile'), kind: 'profile', href: '/about' },
    'profile',
    profile.content,
  )

  const educationKnowledge = matter(fs.readFileSync(educationPath, 'utf8'))
  const educationSections = educationKnowledge.content.split(/^### /m).slice(1)
  if (educationSections.length === 0) {
    throw new Error('Assistant education knowledge must contain at least one section.')
  }
  for (const [index, section] of educationSections.entries()) {
    const newline = section.indexOf('\n')
    if (newline < 0 || !section.slice(0, newline).trim() || !section.slice(newline).trim()) {
      throw new Error(`Invalid assistant education section ${index + 1}.`)
    }
    const title = section.slice(0, newline).trim()
    pushChunks(
      chunks,
      { title, kind: 'education', href: '/education' },
      `itb-education-${index}`,
      section.slice(newline).trim(),
    )
  }

  for (const kind of ['projects', 'activities'] as const) {
    for (const item of getItems(kind)) {
      const header = [
        item.summary,
        item.tags.length ? `Tags: ${item.tags.join(', ')}` : '',
        item.fields.length ? `Fields: ${item.fields.join(', ')}` : '',
        `Date: ${item.date}`,
        ...item.links.map((link) => `${link.label}: ${link.url}`),
      ]
        .filter(Boolean)
        .join('\n')
      pushChunks(
        chunks,
        {
          title: item.title,
          kind: kind === 'projects' ? 'project' : 'activity',
          href: `/work/${kind}/${item.slug}`,
        },
        `${kind}-${item.slug}`,
        `${header}\n\n${item.body}`,
      )
    }
  }

  const projects = getItems('projects')
  chunks.push({
    id: 'project-catalog',
    title: "Francisco's project catalog",
    kind: 'project',
    href: '/work/projects',
    text: [
      `Complete catalog of ${projects.length} projects published on Francisco's portfolio. Browse the project archive at /work/projects.`,
      ...projects.map(
        (project) =>
          `${project.title}: ${project.summary} Categories: ${project.category}. Technologies: ${project.tags.join(', ') || 'not listed'}.`,
      ),
    ].join('\n\n'),
  })

  chunks.push({
    id: 'site-index',
    title: "Francisco's portfolio page guide",
    kind: 'profile',
    href: '/',
    text: [
      'Homepage: introduction, areas of expertise, and recent projects and activities.',
      'About: personal story, interests, and hobbies. Route: /about.',
      'Work: recent projects and activities. Route: /work.',
      'Projects archive: searchable and filterable project list with project detail pages. Route: /work/projects.',
      'Activities archive: searchable activity list with activity detail pages. Route: /work/activities.',
      'Experience: engineering, teaching, academic support, campus, community, and data science roles. Route: /experience.',
      'Education: university and high-school education, coursework, honors, and certificates. Route: /education.',
      'Contact: professional and community links. Route: /contact.',
      'About this site: its purpose and implementation. Route: /about-site.',
    ].join('\n'),
  })

  for (const entry of en.experience.entries) {
    chunks.push({
      id: `experience-${entry.id}`,
      title: `${entry.title} at ${entry.organization}`,
      kind: 'experience',
      href: '/experience',
      text: `${entry.title}, ${entry.organization} (${entry.arrangement}, ${entry.period}). ${entry.summary}`,
    })
  }

  const { education } = en
  chunks.push({
    id: 'education',
    title: 'Education',
    kind: 'education',
    href: '/education',
    text: [
      `${education.universityDegree}, ${education.universityPeriod}. ${education.universityGrade}.`,
      ...education.universityDetails,
      `Activities: ${education.universityActivities.join('; ')}.`,
      `Skills: ${education.universitySkills.join(', ')}.`,
      `${education.highSchoolDegree}, ${education.highSchoolPeriod}.`,
      ...education.highSchoolActivities,
      ...education.highSchoolHonors,
    ].join('\n'),
  })

  return chunks
}
