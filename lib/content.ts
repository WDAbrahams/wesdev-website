import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { AboutContent, Service, WorkProject } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Read and parse every `.md` file in a content subdirectory.
 *
 * @param subdir - Folder under `/content` (e.g. "services", "work").
 * @returns Frontmatter objects, one per file, with the `slug` injected.
 */
function readMarkdownDir<T>(subdir: string): (T & { slug: string })[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return { ...(data as T), slug };
    });
}

/**
 * Load the About section content from `content/about.json`.
 *
 * @returns Parsed {@link AboutContent}.
 */
export function getAbout(): AboutContent {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, 'about.json'), 'utf8');
  return JSON.parse(raw) as AboutContent;
}

/**
 * Load all service / capability columns, ordered by their `order` field.
 *
 * @returns Sorted array of {@link Service}.
 */
export function getServices(): Service[] {
  return readMarkdownDir<Omit<Service, 'slug'>>('services').sort(
    (a, b) => a.order - b.order,
  );
}

/**
 * Load all selected-work projects, ordered by their `order` field.
 *
 * @returns Sorted array of {@link WorkProject}.
 */
export function getWork(): WorkProject[] {
  return readMarkdownDir<Omit<WorkProject, 'slug'>>('work').sort(
    (a, b) => a.order - b.order,
  );
}
