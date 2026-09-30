'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowDown, Sliders, Shield, VolumeX, ThermometerSnowflake, Check } from 'lucide-react';
import { Button } from '../ui/button';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-neutral-950">
      {/* Background Architectural Photo with Subtle Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photos/modern-living-room-with-high-ceilings-and-large-windows-IXLv2HcP46Q?auto=format&fit=crop&w=2000&q=85"
          alt="Панорамное остекление резиденции"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-neutral-950" />
      </div>

      {/* Интерактивная векторная проекция чертежа поверх панорамы */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="6 6" />
          <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="6 6" />
          <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#06b6d4" strokeWidth="0.75" strokeDasharray="6 6" />
          <circle cx="15%" cy="35%" r="4" fill="#06b6d4" />
          <circle cx="85%" cy="35%" r="4" fill="#06b6d4" />
        </svg>
      </div>

      {/* Контент первого экрана */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 sm:mt-12">
        {/* Kicker Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-6 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Немецкая инженерия · Индивидуальный проект</span>
        </div>

        {/* Главный заголовок */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] text-balance">
          Архитектурный свет и&nbsp;абсолютная тишина
        </h1>

        {/* Подзаголовок */}
        <p className="mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light text-balance">
          Проектируем и производим панорамные оконные порталы и фасадные конструкции Schüco и Natura для загородных вилл и пентхаусов.
        </p>

        {/* Блок ключевых инженерных метрик */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10 text-left">
          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <VolumeX className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Акустика</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">49 дБ</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Шумоизоляция триплекс</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <ThermometerSnowflake className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Теплотехника</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">0.71</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Uw Вт/м²K (Passivhaus)</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Безопасность</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">RC3</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Класс взломостойкости</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Check className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Гарантия</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">10 лет</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Заводской ресурс узлов</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="accent"
            size="lg"
            onClick={() => scrollTo('configurator')}
            className="w-full sm:w-auto px-8 gap-2 shadow-xl shadow-cyan-500/25"
          >
            <Sliders className="w-5 h-5" />
            <span>Собрать окно в конфигураторе</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo('technologies')}
            className="w-full sm:w-auto px-8 gap-2"
          >
            <span>Изучить конструкцию профиля</span>
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};