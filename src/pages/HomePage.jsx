import Hero from '../components/Hero';
import Skills from '../components/Skills';
import ProjectsOverview from '../components/ProjectsOverview';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
      <ProjectsOverview />
      <Contact />
    </main>
  );
}
