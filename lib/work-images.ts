import path from 'node:path'
import { imageSizeFromFile } from 'image-size/fromFile'

const sizes = new Map<string, Promise<{ width: number; height: number }>>()

// Reads the real dimensions of a file in public/ so images reserve their space and avoid layout shift.
export function getPublicImageSize(src: string) {
  let size = sizes.get(src)
  if (!size) {
    size = imageSizeFromFile(path.join(process.cwd(), 'public', src)).then(({ width, height }) => ({
      width,
      height,
    }))
    sizes.set(src, size)
  }
  return size
}
