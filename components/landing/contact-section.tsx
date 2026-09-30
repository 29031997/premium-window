'use client';

import * as React from 'react';
import { useConfiguratorStore } from '../../hooks/use-configurator-store';
import { calculateWindowPrice } from '../../lib/configurator/pricing';
import { formatCurrency } from '../../utils/format-currency';
import { Button } from '../ui/button';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const config = useConfiguratorStore((s) => s.configuration);
  const priceResult = React.useMemo(() => calculateWindowPrice(config), [config]);

  const [isSent, setIsSent] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    stage: 'Коробка здания готова',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <section id="contacts" className="relative w-full py-20 lg:py-28 bg-neutral-900/40 border-t border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Левая колонка: Форма связи */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              Прямой контакт
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Обсудить проект со старшим инженером
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
              Отправьте чертежи, спецификацию или параметры из конфигуратора. Мы подготовим детализированный сметный расчет со статическим анализом ветровых нагрузок.
            </p>

            {isSent ? (
              <div className="p-8 rounded-3xl bg-neutral-950 border border-emerald-500/40 text-center space-y-4 animate-in fade-in-50">
                <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Заявка принята в работу</h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Параметры окна ({config.width} × {config.height} мм на сумму {formatCurrency(priceResult.totalPrice)}) переданы главному конструктору. Мы свяжемся с вами в течение рабочего дня.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSent(false)}>
                  Отправить еще одно сообщение
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-xl space-y-4">
                {/* Плашка привязки расчета из конфигуратора */}
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-400 block">Прикрепленный расчет:</span>
                    <span className="text-white font-medium">{config.width} × {config.height} мм · {config.sashes.length} ств.</span>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold">{formatCurrency(priceResult.totalPrice)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      placeholder="Александр"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Телефон *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Электронная почта</label>
                    <input
                      type="email"
                      placeholder="client@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Стадия строительства</label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Проектирование / Архитектурный план">Проектирование / Архитектурный план</option>
                      <option value="Коробка здания готова">Коробка здания готова</option>
                      <option value="Замена существующего остекления">Замена существующего остекления</option>
                      <option value="Требуется консультация">Требуется консультация</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1.5 font-medium">Пожелания по проекту</label>
                  <textarea
                    rows={3}
                    placeholder="Например: загородный дом, нужны раздвижные порталы 5х3м..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full gap-2">
                  <span>Запросить коммерческое предложение</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Правая колонка: Шоурумы и прямые каналы */}
          <div className="lg:col-span-5 space-y-6 lg:pt-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
              <h3 className="text-lg font-bold text-white">Инженерное бюро и шоурум</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block">Главный демонстрационный зал:</span>
                    <span className="text-white font-medium">г. Шымкент, проспект Бауыржана Момышулы, 28/1</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block">Отдел индивидуального проектирования:</span>
                    <a href="tel:+77015550198" className="text-white font-medium hover:text-cyan-300 font-mono">
                      +7 (701) 555-01-98
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block">Техническая документация и проекты:</span>
                    <a href="mailto:project@premium-fenster.kz" className="text-white font-medium hover:text-cyan-300 font-mono">
                      project@premium-fenster.kz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block">График работы:</span>
                    <span className="text-white font-medium">Пн — Сб: 09:00 — 19:00 (по предварительной записи)</span>
                  </div>
                </div>
              </div>

              {/* Кнопки мессенджеров */}
              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <span className="text-xs text-neutral-400 block">Быстрый ответ в мессенджере:</span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/77015550198"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};