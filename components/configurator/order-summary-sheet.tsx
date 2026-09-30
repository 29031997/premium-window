'use client';

import * as React from 'react';
import { useConfiguratorStore } from '../../hooks/use-configurator-store';
import { calculateWindowPrice } from '../../lib/configurator/pricing';
import { formatCurrency } from '../../utils/format-currency';
import { Sheet } from '../ui/sheet';
import { Button } from '../ui/button';
import { CheckCircle2, ShieldCheck, Download, Send, PhoneCall } from 'lucide-react';

export const OrderSummarySheet: React.FC = () => {
  const config = useConfiguratorStore((s) => s.configuration);
  const isOpen = useConfiguratorStore((s) => s.isSummaryDrawerOpen);
  const setOpen = useConfiguratorStore((s) => s.setSummaryDrawerOpen);

  const priceResult = React.useMemo(() => {
    return calculateWindowPrice(config);
  }, [config]);

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Сброс статуса после закрытия панели
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={handleClose}
      title="Спецификация и расчет стоимости"
      description="Детализированная калькуляция конструкции и фурнитуры"
    >
      {isSubmitted ? (
        <div className="py-10 text-center space-y-4 animate-in fade-in-50">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-xl font-bold text-white">Расчет успешно зафиксирован!</h3>
          <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
            Номер проектной заявки: <span className="font-mono text-cyan-400 font-bold">#WIN-2026-8941</span>.
            Ведущий инженер свяжется с вами в течение 15 минут для уточнения даты выезда на контрольный замер.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" size="md" onClick={() => window.print()} className="gap-2">
              <Download className="w-4 h-4" />
              <span>Сохранить в PDF</span>
            </Button>
            <Button variant="primary" size="md" onClick={handleClose}>
              Вернуться к конфигуратору
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Сводная плашка параметров */}
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium font-mono">
              Параметры изделия
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-neutral-500 block">Габариты:</span>
                <span className="text-white font-medium">{config.width} × {config.height} мм ({priceResult.areaSquareMeters.toFixed(2)} м²)</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Количество створок:</span>
                <span className="text-white font-medium">{config.sashes.length} секции</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Монтаж:</span>
                <span className="text-white font-medium">{config.options.installation ? 'Сертифицированный по ГОСТ' : 'Без монтажа'}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Гарантия:</span>
                <span className="text-cyan-400 font-medium">10 лет на профиль и стекло</span>
              </div>
            </div>
          </div>

          {/* Детализированная разбивка стоимости */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium font-mono">
              Позиции сметы (без скрытых доплат)
            </div>

            <div className="divide-y divide-neutral-800/80 rounded-xl bg-neutral-950/40 border border-neutral-800 overflow-hidden">
              {priceResult.items
                .filter((item) => item.amount > 0)
                .map((item) => (
                  <div key={item.id} className="p-3.5 flex items-start justify-between gap-3 text-xs">
                    <div className="min-w-0 pr-2">
                      <div className={`font-medium ${item.isHighlighted ? 'text-white' : 'text-neutral-200'}`}>
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <div className="font-mono font-semibold text-neutral-100 whitespace-nowrap">
                      +{formatCurrency(item.amount)}
                    </div>
                  </div>
                ))}
            </div>

            {/* Итоговая сумма */}
            <div className="p-4 rounded-xl bg-neutral-850 border border-neutral-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Итоговая расчетная стоимость:</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Включает НДС и заводскую упаковку
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-cyan-400">
                {formatCurrency(priceResult.totalPrice)}
              </div>
            </div>
          </div>

          {/* Форма фиксации расчета */}
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3.5">
            <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Зафиксировать расчет и забронировать выезд инженера
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Оставьте контактные данные — расчет закрепится за вами с сохранением текущих скидок.
            </p>

            <div className="space-y-2.5 pt-1">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Электронная почта (для отправки PDF-сметы)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <Button type="submit" variant="accent" size="lg" className="w-full gap-2 mt-2">
              <Send className="w-4 h-4" />
              <span>Получить детальное КП и вызов на замер</span>
            </Button>
          </form>
        </div>
      )}
    </Sheet>
  );
};