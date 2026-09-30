'use client';

import * as React from 'react';
import { Volume2, VolumeX, Flame, Snowflake, ShieldCheck, Lock, ChevronRight } from 'lucide-react';

export const TechnologiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'acoustic' | 'thermal' | 'security'>('acoustic');
  const [soundMode, setSoundMode] = React.useState<'street' | 'room'>('room');

  return (
    <section id="technologies" className="relative w-full py-20 lg:py-28 bg-neutral-900/60 border-y border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            Технологии и производство
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Инженерия бескомпромиссного комфорта
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
            Каждое окно проектируется как многоуровневый физический барьер: оно отсекает городской гул, сохраняет тепло сибирской зимой и защищает резиденцию от несанкционированного доступа.
          </p>
        </div>

        {/* Интерактивный демонстрационный стенд */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Левая колонка: Архитектурный чертеж среза профиля (векторная визуализация) */}
          <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Фоновые технические линии */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              Срез системы Schüco / Natura 96
            </div>

            {/* Векторная схема слоев */}
            <div className="relative my-auto py-6 flex items-center justify-center">
              <svg viewBox="0 0 500 320" className="w-full max-w-lg select-none" fill="none">
                {/* Внешний защитный алюминиевый оклад */}
                <rect x="30" y="30" width="40" height="260" rx="4" fill="#383E42" stroke="#4b5563" strokeWidth="2" />
                <text x="50" y="165" textAnchor="middle" fill="#9ca3af" fontSize="10" transform="rotate(-90 50 165)" fontFamily="monospace">
                  Alu Clad (RAL 7016)
                </text>

                {/* Полиамидный терморазрыв (термомост) */}
                <rect
                  x="74"
                  y="60"
                  width="30"
                  height="200"
                  rx="3"
                  fill="#0e7490"
                  fillOpacity={activeTab === 'thermal' ? '0.85' : '0.35'}
                  stroke="#22d3ee"
                  strokeWidth={activeTab === 'thermal' ? '2.5' : '1'}
                  className="transition-all duration-300"
                />
                <text x="89" y="165" textAnchor="middle" fill="#e0f2fe" fontSize="9" transform="rotate(-90 89 165)" fontFamily="monospace">
                  Термомост 34 мм
                </text>

                {/* Несущий сердечник: дуб / композит */}
                <rect x="108" y="30" width="80" height="260" rx="4" fill="#583c28" stroke="#78350f" strokeWidth="2" />
                <text x="148" y="165" textAnchor="middle" fill="#fef3c7" fontSize="11" transform="rotate(-90 148 165)" fontFamily="monospace" fontWeight="bold">
                  Массив Дуба 96 мм
                </text>

                {/* Тройной EPDM уплотнитель */}
                <circle cx="106" cy="50" r="5" fill="#171717" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="106" cy="160" r="5" fill="#171717" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="106" cy="270" r="5" fill="#171717" stroke="#38bdf8" strokeWidth="1.5" />

                {/* Трехкамерный стеклопакет с аргоном */}
                {/* Стекло 1 (Внешнее с напылением) */}
                <rect x="220" y="20" width="12" height="280" rx="2" fill="#67e8f9" fillOpacity="0.8" stroke="#0891b2" strokeWidth="1.5" />
                {/* Газовая камера 1 (Аргон) */}
                <rect x="236" y="20" width="40" height="280" fill="#0891b2" fillOpacity={activeTab === 'thermal' ? '0.25' : '0.1'} stroke="#164e63" strokeDasharray="3 3" />
                <text x="256" y="160" textAnchor="middle" fill="#a5f3fc" fontSize="9" transform="rotate(-90 256 160)" fontFamily="monospace">
                  Аргон 90%
                </text>

                {/* Стекло 2 (Среднее флоат) */}
                <rect x="280" y="20" width="8" height="280" rx="2" fill="#a5f3fc" fillOpacity="0.7" stroke="#0891b2" strokeWidth="1" />
                {/* Газовая камера 2 (Аргон) */}
                <rect x="292" y="20" width="40" height="280" fill="#0891b2" fillOpacity={activeTab === 'thermal' ? '0.25' : '0.1'} stroke="#164e63" strokeDasharray="3 3" />

                {/* Стекло 3 (Внутренний ударопрочный триплекс SoundControl) */}
                <rect
                  x="336"
                  y="20"
                  width="18"
                  height="280"
                  rx="3"
                  fill="#38bdf8"
                  fillOpacity={activeTab === 'acoustic' ? '0.95' : '0.7'}
                  stroke="#0284c7"
                  strokeWidth={activeTab === 'acoustic' ? '2.5' : '1.5'}
                />
                <text x="345" y="160" textAnchor="middle" fill="#ffffff" fontSize="9" transform="rotate(-90 345 160)" fontFamily="monospace">
                  Триплекс SC
                </text>

                {/* Выноски активного фокуса */}
                {activeTab === 'acoustic' && (
                  <g className="animate-in fade-in duration-300">
                    <line x1="345" y1="20" x2="420" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="420" cy="40" r="3" fill="#38bdf8" />
                    <text x="430" y="44" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      49 dB
                    </text>
                  </g>
                )}

                {activeTab === 'thermal' && (
                  <g className="animate-in fade-in duration-300">
                    <line x1="89" y1="60" x2="40" y2="15" stroke="#22d3ee" strokeWidth="1.5" />
                    <circle cx="40" cy="15" r="3" fill="#22d3ee" />
                    <text x="10" y="12" fill="#22d3ee" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      Uw 0.71
                    </text>
                  </g>
                )}

                {activeTab === 'security' && (
                  <g className="animate-in fade-in duration-300">
                    <circle cx="106" cy="160" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                    <line x1="116" y1="160" x2="170" y2="190" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="175" y="195" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      Цапфа RC3
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Подпись режима внизу чертежа */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
              <span>Сечение профильного узла створки</span>
              <span className="font-mono text-cyan-400 font-semibold">Сертификат ift Rosenheim</span>
            </div>
          </div>

          {/* Правая колонка: Интерактивные карточки телеметрии */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Карточка 1: Акустический барьер */}
            <div
              onClick={() => setActiveTab('acoustic')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeTab === 'acoustic'
                  ? 'bg-neutral-900 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                    <VolumeX className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Акустический барьер 49 dB</h3>
                    <p className="text-xs text-neutral-400">Шумоподавление авиационного уровня</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400">-85% шума</span>
              </div>

              {activeTab === 'acoustic' && (
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Триплекс со специальной акустической PVB-пленкой Sound Control гасит резонансные низкочастотные волны (гул шоссе, железнодорожные составы).
                  </p>
                  {/* Интерактивный переключатель звука */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                    <span className="text-neutral-400">Сравнить уровень шума:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSoundMode('street');
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                          soundMode === 'street' ? 'bg-red-950 text-red-300 border border-red-800' : 'text-neutral-400'
                        }`}
                      >
                        Улица 85 дБ
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSoundMode('room');
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                          soundMode === 'room' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-neutral-400'
                        }`}
                      >
                        В комнате 36 дБ
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Карточка 2: Теплоизоляция Passivhaus */}
            <div
              onClick={() => setActiveTab('thermal')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeTab === 'thermal'
                  ? 'bg-neutral-900 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                    <Snowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Теплотехника Passivhaus</h3>
                    <p className="text-xs text-neutral-400">Uw = 0.71 Вт/м²K для суровых зим</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400">Класс А++</span>
              </div>

              {activeTab === 'thermal' && (
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2 animate-in fade-in duration-200">
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Широкий полиамидный терморазрыв с вспененными вставками и тёплые дистанционные рамки полностью исключают появление конденсата и наледи даже при морозах -40°C.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">Температура снаружи</span>
                      <span className="text-cyan-400 font-bold font-mono">-35°C</span>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">Внутреннее стекло</span>
                      <span className="text-emerald-400 font-bold font-mono">+19.5°C</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Карточка 3: Взломостойкость RC3 */}
            <div
              onClick={() => setActiveTab('security')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeTab === 'security'
                  ? 'bg-neutral-900 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Взломостойкость RC3 & Скрытые петли</h3>
                    <p className="text-xs text-neutral-400">Легированная сталь и анкерные ответные планки</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400">RC3 Test</span>
              </div>

              {activeTab === 'security' && (
                <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2 animate-in fade-in duration-200">
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Грибовидные запорные цапфы по всему периметру створки выдерживают отжим тяжелым инструментом (ломом, клиньями) более 5 минут непрерывного силового взлома.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};