'use client';

import * as React from 'react';
import { ConfiguratorPanel } from './panel/configurator-panel';
import { WindowSvgView } from './canvas/window-svg-view';
import { StickyPricingBar } from './sticky-pricing-bar';
import { OrderSummarySheet } from './order-summary-sheet';

export const ConfiguratorRoot: React.FC = () => {
  return (
    <section id="configurator" className="relative w-full py-16 lg:py-24 bg-neutral-950 text-white scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4 backdrop-blur-md">
            Интерактивный конфигуратор
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Спроектируйте остекление под архитектуру вашего объекта
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Настройте размеры, тип профиля, формулу стеклопакета и сценарии открывания. Изменения моментально отображаются на векторной схеме, а стоимость пересчитывается в реальном времени.
          </p>
        </div>

        {/* Главная рабочая область конфигуратора */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Слева: Скроллируемая панель настроек (28-30% ширины на десктопе) */}
          <div className="w-full lg:w-[32%] xl:w-[30%] shrink-0 lg:max-h-[780px] lg:overflow-y-auto lg:sticky lg:top-24 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
            <ConfiguratorPanel />
          </div>

          {/* Справа: Крупная интерактивная зона предпросмотра (70-72% ширины) */}
          <div className="w-full lg:w-[68%] xl:w-[70%] lg:sticky lg:top-24">
            <WindowSvgView />
          </div>
        </div>
      </div>

      {/* Нижняя Sticky-панель со стоимостью */}
      <StickyPricingBar />

      {/* Модальное окно (Sheet) подробной сводки */}
      <OrderSummarySheet />
    </section>
  );
};