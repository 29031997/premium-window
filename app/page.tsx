import { StickyHeader } from '../components/layout/sticky-header';
import { HeroSection } from '../components/landing/hero-section';
import { TechnologiesSection } from '../components/landing/technologies-section';
import { ProjectsGallery } from '../components/landing/projects-gallery';
import { ConfiguratorRoot } from '../components/configurator/configurator-root';
import { ContactSection } from '../components/landing/contact-section';
import { Footer } from '../components/layout/footer';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-neutral-950 overflow-x-hidden">
      {/* 1. Плавающая шапка поверх контента */}
      <StickyHeader />

      {/* 2. Hero-блок (Внимание) */}
      <HeroSection />

      {/* 3. Технологии и производство (Интерес) */}
      <TechnologiesSection />

      {/* 4. Реализованные проекты (Желание) */}
      <ProjectsGallery />

      {/* 5. Инженерный интерактивный конфигуратор (Действие) */}
      <ConfiguratorRoot />

      {/* 6. Контакты и финальный захват */}
      <ContactSection />

      {/* 7. Минималистичный футер */}
      <Footer />
    </main>
  );
}