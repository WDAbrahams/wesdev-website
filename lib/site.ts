/**
 * Central business / contact details for WesDev.
 *
 * The contact form is delivered via Web3Forms (see `app/api/contact/route.ts`),
 * which routes submissions to the address registered against the access key.
 */
export const SITE = {
  name: 'WesDev',
  tagline: 'Built from scratch · No templates',
  email: 'wesleydeanabrahams@gmail.com',
  phone: '+27 61 494 7771',
  /** Public social profiles. Empty until WesDev has live profiles to link. */
  socials: [] as { label: string; href: string }[],
} as const;
