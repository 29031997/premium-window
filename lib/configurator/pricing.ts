import { WindowConfiguration } from '../../types/configurator';
import { PriceCalculationResult, PriceLineItem } from '../../types/pricing';
import { PROFILE_SYSTEMS } from '../../data/profiles';
import { GLAZING_OPTIONS } from '../../data/glazing';
import { EXTERIOR_COLORS, INTERIOR_COLORS } from '../../data/colors';
import { WINDOW_HANDLES } from '../../data/handles';
import { OUTER_FRAMES } from '../../data/outer-frames';
import { OPENING_STYLES } from '../../data/window-types';

export function calculateWindowPrice(config: WindowConfiguration): PriceCalculationResult {
  const items: PriceLineItem[] = [];

  const widthM = config.width / 1000;
  const heightM = config.height / 1000;
  const areaSqm = widthM * heightM;
  const perimeterM = 2 * (widthM + heightM);

  // 1. Базовая конструкция рамы
  const baseRate = 220; // €/m²
  const perimeterRate = 35; // €/m
  const baseCost = Math.round(areaSqm * baseRate + perimeterM * perimeterRate);

  items.push({
    id: 'base-frame',
    category: 'base',
    label: `Базовая конструкция (${config.width} × ${config.height} мм)`,
    description: `Площадь остекления ${areaSqm.toFixed(2)} м², периметр ${perimeterM.toFixed(2)} м`,
    amount: baseCost,
  });

  // 2. Профильная система
  const profile = PROFILE_SYSTEMS.find(p => p.id === config.profileId) || PROFILE_SYSTEMS[0];
  const profileSurcharge = Math.round(perimeterM * profile.pricePerMeter * 0.45);
  items.push({
    id: `profile-${profile.id}`,
    category: 'profile',
    label: `Профиль: ${profile.name}`,
    description: `${profile.depthMm} мм, теплотехника Uw = ${profile.uwValue} Вт/м²K, ${profile.soundInsulationDb} дБ`,
    amount: profileSurcharge,
    isHighlighted: true,
  });

  // 3. Формула остекления
  const glazing = GLAZING_OPTIONS.find(g => g.id === config.glazingId) || GLAZING_OPTIONS[0];
  const glazingCost = Math.round(areaSqm * (110 + glazing.priceDeltaPerSqm));
  items.push({
    id: `glazing-${glazing.id}`,
    category: 'glazing',
    label: `Стеклопакет: ${glazing.name}`,
    description: `${glazing.formula} (Ug ${glazing.ugValue} Вт/м²K, ${glazing.soundDb} дБ)`,
    amount: glazingCost,
  });

  // 4. Цвет и декоративное покрытие
  const extColor = EXTERIOR_COLORS.find(c => c.id === config.colors.exteriorId) || EXTERIOR_COLORS[0];
  const intColor = INTERIOR_COLORS.find(c => c.id === config.colors.interiorId) || INTERIOR_COLORS[0];
  const avgColorMult = (extColor.priceMultiplier + intColor.priceMultiplier) / 2;
  const colorSurcharge = Math.round(baseCost * (avgColorMult - 1));

  if (colorSurcharge > 0) {
    items.push({
      id: 'color-finish',
      category: 'color',
      label: `Цветовое покрытие: ${extColor.code} (снаружи) / ${intColor.code} (внутри)`,
      description: 'Двухсторонняя порошковая покраска или структурированная ламинация',
      amount: colorSurcharge,
    });
  }

  // 5. Механизмы открывания створок
  let openableSashesCount = 0;

  config.sashes.forEach((sash, idx) => {
    const style = OPENING_STYLES[sash.openingStyleId] || OPENING_STYLES['fix'];
    if (style.priceDelta > 0) {
      openableSashesCount++;
      items.push({
        id: `sash-mechanism-${idx}`,
        category: 'hardware',
        label: `Створка №${idx + 1}: ${style.name}`,
        description: `Механизм запирания ${style.code}`,
        amount: style.priceDelta,
      });
    }
    if (sash.isFrosted) {
      const frostedCost = Math.round((areaSqm / Math.max(1, config.sashes.length)) * 45);
      items.push({
        id: `frosted-glass-${idx}`,
        category: 'glazing',
        label: `Матовое сатинированное стекло (Створка №${idx + 1})`,
        amount: frostedCost,
      });
    }
    if (sash.isInfill) {
      items.push({
        id: `infill-panel-${idx}`,
        category: 'glazing',
        label: `Непрозрачная термопанель (Створка №${idx + 1})`,
        amount: 35,
      });
    }
  });

  // 6. Наружная рама
  const outerFrame = OUTER_FRAMES.find(f => f.id === config.outerFrameId) || OUTER_FRAMES[0];
  if (outerFrame.priceDelta > 0) {
    items.push({
      id: `frame-${outerFrame.id}`,
      category: 'base',
      label: `Наружная рама: ${outerFrame.name}`,
      description: outerFrame.description,
      amount: outerFrame.priceDelta,
    });
  }

  // 7. Расширители рамы (доборы)
  const ext = config.frameExtensions;
  const extTotalMm = ext.topMm + ext.bottomMm + ext.leftMm + ext.rightMm;
  if (extTotalMm > 0) {
    const extCost = Math.round((extTotalMm / 1000) * 45);
    items.push({
      id: 'frame-extensions',
      category: 'extensions',
      label: `Дополнительные расширители рамы (доборы)`,
      description: `Верх: ${ext.topMm} мм, Низ: ${ext.bottomMm} мм, Лево: ${ext.leftMm} мм, Право: ${ext.rightMm} мм`,
      amount: extCost,
    });
  }

  // 8. Оконные ручки
  const handleCount = Math.max(1, openableSashesCount);
  const handleModel = WINDOW_HANDLES.find(h => h.id === config.handle.modelId) || WINDOW_HANDLES[0];
  const handleTotal = handleModel.basePrice * handleCount;
  items.push({
    id: `handle-${handleModel.id}`,
    category: 'hardware',
    label: `Оконная ручка: ${handleModel.name} (${handleCount} шт.)`,
    description: handleModel.description,
    amount: handleTotal,
  });

  // 9. Дополнительные опции
  if (config.options.warmEdgeSpacer) {
    const spacerCost = Math.round(perimeterM * 14);
    items.push({
      id: 'opt-warm-edge',
      category: 'options',
      label: 'Тёплая композитная дистанционная рамка',
      description: 'Устраняет мостик холода по контуру стеклопакета и исключает конденсат',
      amount: spacerCost,
    });
  }

  if (config.options.glazingBars) {
    const barsCost = Math.round(areaSqm * 65 + 40);
    items.push({
      id: 'opt-glazing-bars',
      category: 'options',
      label: 'Декоративные раскладки (шпроссы)',
      description: 'Внутренние или накладные архитектурные переплеты',
      amount: barsCost,
    });
  }

  if (config.options.alarmContacts) {
    const alarmCost = 75 * Math.max(1, openableSashesCount);
    items.push({
      id: 'opt-alarm-contacts',
      category: 'options',
      label: 'Встроенные магнитные герконы (Умный дом / Сигнализация)',
      description: 'Скрытый датчик контроля открытия створки в фальце рамы',
      amount: alarmCost,
    });
  }

  if (config.options.preDrilledHoles) {
    items.push({
      id: 'opt-drilled-holes',
      category: 'options',
      label: 'Заводские монтажные отверстия в раме',
      description: 'Прецизионное сверление по кондукторам с защитными заглушками',
      amount: 25,
    });
  }

  // 10. Монтаж
  const subtotalWithoutInstall = items.reduce((sum, item) => sum + item.amount, 0);

  if (config.options.installation) {
    const installCost = Math.max(160, Math.round(subtotalWithoutInstall * 0.16));
    items.push({
      id: 'opt-installation',
      category: 'installation',
      label: 'Сертифицированный монтаж по ГОСТ',
      description: 'Монтажный шов с трехслойной защитой: ПСУЛ, полиуретан и пароизоляция',
      amount: installCost,
      isHighlighted: true,
    });
  }

  const totalPrice = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    basePrice: baseCost,
    totalPrice,
    areaSquareMeters: areaSqm,
    perimeterMeters: perimeterM,
    items,
  };
}