'use client';

import * as React from 'react';
import Image from 'next/image';
import { ARCHITECTURAL_PROJECTS, ArchitecturalProject } from '../../data/projects';
import { MapPin, ArrowUpRight, Wind, Thermometer, Volume2, Maximize, X } from 'lucide-react';
import { Button } from '../ui/button';

export const ProjectsGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = React.useState<ArchitecturalProject | null>(null);

  return (
    <section id="projects" className="relative w-full py-20 lg:py-28 bg-neutral-950 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              Портфолио объектов
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Реализованные архитектурные проекты
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Частные загородные резиденции и виллы с монументальными площадями остекления, бесшовными углами и повышенными ветровыми нагрузками.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-500">
            Каталог объектов 2025–2026
          </div>
        </div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ARCHITECTURAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Фотография объекта */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-950">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Плашка года и площади */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-white">
                    {project.areaSqm}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300">
                    {project.year}
                  </span>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Описание проекта */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Ключевые параметры узлов */}
                <div className="pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-neutral-500 block">Система:</span>
                    <span className="text-neutral-200 truncate block">{project.profileSystem.split('&')[0]}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Остекление:</span>
                    <span className="text-cyan-400 block">{project.specs.glassDimensions}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно детализации проекта */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/60 hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedProject.location} · {selectedProject.year} г.</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Технический паспорт объекта */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                Инженерная спецификация остекления
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Ветровая стойкость:</span>
                    <span className="text-white font-medium">{selectedProject.specs.windLoadClass}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Теплопередача Uw:</span>
                    <span className="text-white font-medium">{selectedProject.specs.thermalUw}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Шумоизоляция:</span>
                    <span className="text-white font-medium">{selectedProject.specs.acousticDb}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Maximize className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Максимальный формат:</span>
                    <span className="text-white font-medium">{selectedProject.specs.glassDimensions}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="md" onClick={() => setSelectedProject(null)}>
                Закрыть
              </Button>
              <Button
                variant="accent"
                size="md"
                onClick={() => {
                  setSelectedProject(null);
                  const el = document.getElementById('configurator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Рассчитать похожий проект
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};