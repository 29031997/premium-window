'use client';

import * as React from 'react';
import { useConfiguratorStore } from '../../hooks/use-configurator-store';
import { calculateWindowPrice } from '../../lib/configurator/pricing';
import { formatCurrency } from '../../utils/format-currency';
import { WINDOW_TYPES } from '../../data/window-types';
import { Button } from '../ui/button';
import { ChevronRight, FileText } from 'lucide-react';

export const StickyPricingBar: React.FC = () => {
  const config = useConfiguratorStore((s) => s.configuration);
  const setSummaryDrawerOpen = useConfiguratorStore((s) => s.setSummaryDrawerOpen);

  const priceResult = React.useMemo(() => {
    return calculateWindowPrice(config);
  }, [config]);

  const windowTypeDef = WINDOW_TYPES.find((t) => t.id === config.windowTypeId) || WINDOW_TYPES[1];

  return (
    <div className="sticky bottom-4 inset-x-0 z-30 mx-auto max-w-5xl px-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 shadow-2xl backdrop-blur-2xl transition-all duration-200 hover:border-neutral-600">
        {/* Краткая подпись спецификации */}
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium">Предварительный расчет</div>
            <div className="text-sm font-semibold text-white truncate max-w-[280px] sm:max-w-md">
              {windowTypeDef.name} · {config.width} × {config.height} мм · {config.sashes.length} ств.
            </div>
          </div>
        </div>

        {/* Стоимость и CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="text-right">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider block font-medium">Итого:</span>
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
              {formatCurrency(priceResult.totalPrice)}
            </span>
          </div>

          <Button
            variant="accent"
            size="md"
            onClick={() => setSummaryDrawerOpen(true)}
            className="gap-2 shadow-lg shadow-cyan-500/20"
          >
            <span>Посмотреть состав</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};