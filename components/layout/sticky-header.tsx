'use client';

import * as React from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

export const StickyHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Технологии', target: 'technologies' },
    { label: 'Проекты', target: 'projects' },
    { label: 'Конфигуратор', target: 'configurator' },
    { label: 'Контакты', target: 'contacts' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none px-4 sm:px-6 pt-4 sm:pt-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Левая группа: Логотип + Раскрывающееся горизонтальное меню */}
        <div className="flex items-center gap-3 p-1.5 pl-4 pr-2 rounded-full bg-neutral-950/80 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Логотип */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs shadow-inner group-hover:border-cyan-400/60 transition-colors">
              PW
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-widest text-white uppercase block leading-none">
                PREMIUM
              </span>
              <span className="text-[10px] tracking-wider text-neutral-400 font-mono block leading-tight">
                FENSTERBAU
              </span>
            </div>
          </button>

          {/* Разделитель */}
          <div className="w-px h-5 bg-neutral-800 hidden sm:block" />

          {/* Триггер и горизонтальный док навигации */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-full hover:bg-neutral-850 transition-colors flex items-center justify-center"
              aria-label="Навигация"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Горизонтально раскрывающийся блок якорных ссылок */}
            <div
              className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${
                isMenuOpen ? 'max-w-md opacity-100 pl-2 pr-1' : 'max-w-0 opacity-0 p-0 pointer-events-none'
              }`}
            >
              <nav className="flex items-center gap-1 whitespace-nowrap">
                {navLinks.map((link) => (
                  <button
                    key={link.target}
                    type="button"
                    onClick={() => scrollToSection(link.target)}
                    className="px-3 py-1 text-xs font-medium text-neutral-300 hover:text-cyan-300 hover:bg-neutral-900 rounded-full transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Правая группа: Прямой телефон + Акцентный CTA */}
        <div className="flex items-center gap-3 p-1.5 pl-4 pr-1.5 rounded-full bg-neutral-950/80 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Телефон с индикатором активности */}
          <a
            href="tel:+77015550198"
            className="hidden md:flex items-center gap-2 text-xs font-medium text-neutral-200 hover:text-cyan-300 transition-colors mr-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">+7 (701) 555-01-98</span>
          </a>

          {/* Акцентная CTA-кнопка прямого скролла к конфигуратору */}
          <Button
            variant="accent"
            size="sm"
            onClick={() => scrollToSection('configurator')}
            className="rounded-full gap-1.5 px-4"
          >
            <span>Предварительный расчет</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
};