import * as React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 bg-neutral-950 border-t border-neutral-850 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-cyan-400 font-mono font-bold text-[10px]">
            PW
          </div>
          <span className="text-white font-semibold">PREMIUM FENSTERBAU</span>
          <span className="text-neutral-500">|</span>
          <span>Оконные и фасадные конструкции высшего класса</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-neutral-500">
          <span>Сертификация ift Rosenheim (Германия)</span>
          <span>ГОСТ 23166-99 / ГОСТ 30971-2012</span>
          <span>© 2026 Все права защищены</span>
        </div>
      </div>
    </footer>
  );
};