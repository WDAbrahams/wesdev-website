import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Stack } from '@/components/sections/Stack';
import { Work } from '@/components/sections/Work';
import { Contact } from '@/components/sections/Contact';
import { getAbout, getServices, getWork } from '@/lib/content';

/**
 * Single-page entry point — composes every section in spec order:
 * Navbar → Hero → About → Stack → Work → Contact + Footer.
 * Content is read at build time from `/content`.
 */
export default function Home() {
  const about = getAbout();
  const services = getServices();
  const work = getWork();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About about={about} />
        <Stack services={services} />
        <Work projects={work} />
        <Contact />
      </main>
    </>
  );
}
