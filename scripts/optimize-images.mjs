/**
 * Turns the originals in assets-src/ into responsive AVIF + WebP + JPEG
 * derivatives under public/images/. Re-run after dropping in new photography:
 *   node scripts/optimize-images.mjs
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-src'
const OUT = 'public/images'
const WIDTHS = [480, 960, 1600, 2400]

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
const manifest = {}

for (const file of files) {
  const { name } = parse(file)
  const input = sharp(join(SRC, file)).rotate()
  const { width = 0, height = 0 } = await input.metadata()

  // A 6px-wide render, inlined as a data URI, is the blur placeholder shown
  // while the real image decodes.
  const blurBuf = await input
    .clone()
    .resize(6, Math.max(1, Math.round((6 * height) / width)))
    .webp({ quality: 40 })
    .toBuffer()

  const widths = WIDTHS.filter((w) => w <= width)
  if (widths.length === 0) widths.push(width)

  for (const w of widths) {
    const resized = input.clone().resize(w, null, { withoutEnlargement: true })
    await Promise.all([
      resized.clone().avif({ quality: 52 }).toFile(join(OUT, `${name}-${w}.avif`)),
      resized.clone().webp({ quality: 74 }).toFile(join(OUT, `${name}-${w}.webp`)),
      resized.clone().jpeg({ quality: 76, mozjpeg: true }).toFile(join(OUT, `${name}-${w}.jpg`)),
    ])
  }

  manifest[name] = {
    widths,
    aspect: +(width / height).toFixed(4),
    blur: `data:image/webp;base64,${blurBuf.toString('base64')}`,
  }
  console.log(`${name.padEnd(20)} ${width}x${height} -> ${widths.join(', ')}`)
}

await writeFile('src/data/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n${files.length} images -> ${OUT}, manifest written.`)
