/**
 * Shared TypeScript interfaces for WesDev content and components.
 * No `any` types are used anywhere in the codebase (build spec §11).
 */

/** A single metric in the About stat strip. The accent-colored digits are
 * derived from `value`; `suffix` (e.g. "+") renders in the default text color. */
export interface AboutStat {
  /** Numeric target that counts up when scrolled into view. */
  value: number;
  /** Optional suffix appended after the number (e.g. "+"). */
  suffix?: string;
  /** Mono uppercase label beneath the number. */
  label: string;
}

/** Parsed shape of `content/about.json`. */
export interface AboutContent {
  eyebrow: string;
  heading: string;
  /** Body paragraphs; `**bold**` markers are rendered as <strong>. */
  paragraphs: string[];
  /** Portrait image path under `/public`, or null for the placeholder frame. */
  image: string | null;
  imageAlt: string;
  /** Mono placeholder label shown on the empty portrait frame. */
  imagePlaceholder: string;
  stats: AboutStat[];
}

/** Frontmatter for a service / capability column (`content/services/*.md`). */
export interface Service {
  /** Source filename without extension (used for stable ordering/keys). */
  slug: string;
  /** Display order (mono index 01–04). */
  order: number;
  /** Category title (h3). */
  title: string;
  /** Mono bulleted capability list. */
  items: string[];
}

/** Frontmatter for a selected-work project (`content/work/*.md`). */
export interface WorkProject {
  slug: string;
  order: number;
  title: string;
  year: string;
  /** Tag chip shown top-left on the thumbnail, e.g. "SaaS · 2026". */
  tag: string;
  description: string;
  tech: string[];
  /** Thumbnail image path under `/public`, or null for the placeholder. */
  image: string | null;
  imageAlt: string;
  /** Optional external link for the project. */
  url?: string;
}

/** Payload accepted by the contact API route (`/app/api/contact/route.ts`). */
export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
