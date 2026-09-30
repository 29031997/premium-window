import { WindowConfiguration } from '../../types/configurator';
import {
  WindowSceneGraph,
  Rect,
  FrameExtensionRect,
  ImpostGeometry,
  SashGeometry,
  DimensionBadge,
  OpeningLines,
  HandleGeometry,
  Point,
} from '../../types/geometry';
import { EXTERIOR_COLORS } from '../../data/colors';
import { WINDOW_HANDLES, HANDLE_COLORS } from '../../data/handles';

export function calculateWindowSceneGraph(config: WindowConfiguration): WindowSceneGraph {
  const frameThickness = 75; // мм толщина видимой рамы
  const impostThickness = 70; // мм ширина вертикального/горизонтального импоста
  const sashProfileThickness = 65; // мм ширина профиля створки

  const marginLeft = 150;
  const marginTop = 130;
  const marginRight = 100;
  const marginBottom = 150;

  const originX = marginLeft;
  const originY = marginTop;

  const overallOuterFrame: Rect = {
    x: originX,
    y: originY,
    width: config.width,
    height: config.height,
  };

  // 1. Доборы (расширители рамы)
  const frameExtensions: FrameExtensionRect[] = [];
  const ext = config.frameExtensions;

  if (ext.topMm > 0) {
    frameExtensions.push({
      side: 'top',
      extensionMm: ext.topMm,
      x: originX,
      y: originY - ext.topMm,
      width: config.width,
      height: ext.topMm,
    });
  }
  if (ext.bottomMm > 0) {
    frameExtensions.push({
      side: 'bottom',
      extensionMm: ext.bottomMm,
      x: originX,
      y: originY + config.height,
      width: config.width,
      height: ext.bottomMm,
    });
  }
  if (ext.leftMm > 0) {
    frameExtensions.push({
      side: 'left',
      extensionMm: ext.leftMm,
      x: originX - ext.leftMm,
      y: originY,
      width: ext.leftMm,
      height: config.height,
    });
  }
  if (ext.rightMm > 0) {
    frameExtensions.push({
      side: 'right',
      extensionMm: ext.rightMm,
      x: originX + config.width,
      y: originY,
      width: ext.rightMm,
      height: config.height,
    });
  }

  // 2. Геометрия импостов и створок
  const imposts: ImpostGeometry[] = [];
  const sashes: SashGeometry[] = [];

  const daylightX = originX + frameThickness;
  const daylightY = originY + frameThickness;
  const daylightWidth = config.width - frameThickness * 2;
  const daylightHeight = config.height - frameThickness * 2;

  const isTopLight = config.windowTypeId.includes('top-light');
  const isBottomLight = config.windowTypeId.includes('bottom-light');

  let mainAreaY = daylightY;
  let mainAreaHeight = daylightHeight;

  if (isTopLight) {
    const topLightHeight = Math.min(600, Math.max(350, Math.round(config.height * 0.28)));
    mainAreaY = daylightY + topLightHeight + impostThickness;
    mainAreaHeight = daylightHeight - topLightHeight - impostThickness;

    // Горизонтальный импост
    imposts.push({
      orientation: 'horizontal',
      rect: {
        x: daylightX,
        y: daylightY + topLightHeight,
        width: daylightWidth,
        height: impostThickness,
      },
    });

    // Верхняя фрамуга
    const topGlassRect: Rect = {
      x: daylightX + 20,
      y: daylightY + 20,
      width: daylightWidth - 40,
      height: topLightHeight - 40,
    };

    sashes.push({
      id: 'top-light-sash',
      sashIndex: 99,
      outerRect: {
        x: daylightX,
        y: daylightY,
        width: daylightWidth,
        height: topLightHeight,
      },
      glassRect: topGlassRect,
      isFrosted: false,
      isInfill: false,
      handle: null,
      opening: {
        type: 'tilt',
        hingeSide: 'bottom',
        pathD: `M ${topGlassRect.x} ${topGlassRect.y + topGlassRect.height} L ${topGlassRect.x + topGlassRect.width / 2} ${topGlassRect.y} L ${topGlassRect.x + topGlassRect.width} ${topGlassRect.y + topGlassRect.height}`,
      },
    });
  }

  // Расчет основных вертикальных секций (створок)
  const sashCount = Math.max(1, config.sashes.length);
  const totalImpostWidth = (sashCount - 1) * impostThickness;
  const availableSashWidth = Math.max(200, daylightWidth - totalImpostWidth);

  // Вычисляем ширину каждой секции
  const calculatedWidths: number[] = [];
  const customSum = config.sashes.reduce((acc, s) => acc + (s.widthMm || 0), 0);
  const useProportional = customSum > 0 && Math.abs(customSum - config.width) < 50;

  if (useProportional) {
    config.sashes.forEach(s => {
      const ratio = s.widthMm / config.width;
      calculatedWidths.push(Math.round(availableSashWidth * ratio));
    });
  } else {
    const equalWidth = Math.round(availableSashWidth / sashCount);
    for (let i = 0; i < sashCount; i++) {
      calculatedWidths.push(equalWidth);
    }
  }

  // Коррекция последней створки на остаток пикселей
  const sumWidths = calculatedWidths.reduce((a, b) => a + b, 0);
  const diff = availableSashWidth - sumWidths;
  if (calculatedWidths.length > 0) {
    calculatedWidths[calculatedWidths.length - 1] += diff;
  }

  // Оконная ручка
  const handleModel = WINDOW_HANDLES.find(h => h.id === config.handle.modelId) || WINDOW_HANDLES[0];
  const handleColor = HANDLE_COLORS.find(c => c.id === config.handle.colorId) || HANDLE_COLORS[0];

  let currentSashX = daylightX;

  config.sashes.forEach((sashConf, idx) => {
    const sWidth = calculatedWidths[idx] || Math.round(availableSashWidth / sashCount);
    const outerRect: Rect = {
      x: currentSashX,
      y: mainAreaY,
      width: sWidth,
      height: mainAreaHeight,
    };

    // Если это не последняя створка, добавляем вертикальный импост
    if (idx < sashCount - 1) {
      imposts.push({
        orientation: 'vertical',
        rect: {
          x: currentSashX + sWidth,
          y: mainAreaY,
          width: impostThickness,
          height: mainAreaHeight,
        },
      });
    }

    const isOpenable = sashConf.openingStyleId !== 'fix';
    const inset = isOpenable ? sashProfileThickness : 18;

    const glassRect: Rect = {
      x: outerRect.x + inset,
      y: outerRect.y + inset,
      width: Math.max(10, outerRect.width - inset * 2),
      height: Math.max(10, outerRect.height - inset * 2),
    };

    // Определение направления открывания и векторов
    let opening: OpeningLines | null = null;
    let handle: HandleGeometry | null = null;

    if (isOpenable) {
      const styleId = sashConf.openingStyleId;
      const isLeft = styleId.includes('left') || styleId.includes('DL') || styleId === 'tilt-turn-left';
      const isRight = styleId.includes('right') || styleId.includes('DR') || styleId === 'tilt-turn-right';
      const isTiltOnly = styleId === 'tilt' || styleId === 'Kipp';

      if (isTiltOnly) {
        opening = {
          type: 'tilt',
          hingeSide: 'bottom',
          pathD: `M ${glassRect.x} ${glassRect.y + glassRect.height} L ${glassRect.x + glassRect.width / 2} ${glassRect.y} L ${glassRect.x + glassRect.width} ${glassRect.y + glassRect.height}`,
        };
        handle = {
          position: {
            x: outerRect.x + outerRect.width / 2,
            y: outerRect.y + 24,
          },
          rotation: 90,
          colorHex: handleColor.hex,
          model: handleModel.name,
        };
      } else if (isLeft) {
        // Петли слева, ручка справа
        const turnPath = `M ${glassRect.x} ${glassRect.y} L ${glassRect.x + glassRect.width} ${glassRect.y + glassRect.height / 2} L ${glassRect.x} ${glassRect.y + glassRect.height}`;
        const tiltPath = styleId.includes('tilt') || styleId.includes('DK')
          ? ` M ${glassRect.x} ${glassRect.y + glassRect.height} L ${glassRect.x + glassRect.width / 2} ${glassRect.y} L ${glassRect.x + glassRect.width} ${glassRect.y + glassRect.height}`
          : '';

        opening = {
          type: tiltPath ? 'tilt-turn' : 'turn',
          hingeSide: 'left',
          pathD: turnPath + tiltPath,
        };
        handle = {
          position: {
            x: outerRect.x + outerRect.width - 24,
            y: outerRect.y + outerRect.height / 2,
          },
          rotation: 0,
          colorHex: handleColor.hex,
          model: handleModel.name,
        };
      } else {
        // Петли справа, ручка слева
        const turnPath = `M ${glassRect.x + glassRect.width} ${glassRect.y} L ${glassRect.x} ${glassRect.y + glassRect.height / 2} L ${glassRect.x + glassRect.width} ${glassRect.y + glassRect.height}`;
        const tiltPath = styleId.includes('tilt') || styleId.includes('DK')
          ? ` M ${glassRect.x} ${glassRect.y + glassRect.height} L ${glassRect.x + glassRect.width / 2} ${glassRect.y} L ${glassRect.x + glassRect.width} ${glassRect.y + glassRect.height}`
          : '';

        opening = {
          type: tiltPath ? 'tilt-turn' : 'turn',
          hingeSide: 'right',
          pathD: turnPath + tiltPath,
        };
        handle = {
          position: {
            x: outerRect.x + 24,
            y: outerRect.y + outerRect.height / 2,
          },
          rotation: 0,
          colorHex: handleColor.hex,
          model: handleModel.name,
        };
      }
    }

    // Декоративные раскладки (шпроссы)
    let glazingBars: Point[][] | undefined = undefined;
    if (config.options.glazingBars && !sashConf.isInfill) {
      glazingBars = [];
      // 1 вертикальная полоса по центру
      const midX = glassRect.x + glassRect.width / 2;
      glazingBars.push([
        { x: midX, y: glassRect.y },
        { x: midX, y: glassRect.y + glassRect.height },
      ]);
      // 2 горизонтальные полосы на 1/3 и 2/3 высоты
      const y1 = glassRect.y + glassRect.height * 0.33;
      const y2 = glassRect.y + glassRect.height * 0.67;
      glazingBars.push([
        { x: glassRect.x, y: y1 },
        { x: glassRect.x + glassRect.width, y: y1 },
      ]);
      glazingBars.push([
        { x: glassRect.x, y: y2 },
        { x: glassRect.x + glassRect.width, y: y2 },
      ]);
    }

    sashes.push({
      id: sashConf.id || `sash-${idx}`,
      sashIndex: idx,
      outerRect,
      glassRect,
      isFrosted: sashConf.isFrosted,
      isInfill: sashConf.isInfill,
      opening,
      handle,
      glazingBars,
    });

    currentSashX += sWidth + impostThickness;
  });

  // 3. Плашки размеров
  const badges: DimensionBadge[] = [];

  // Общая ширина
  badges.push({
    id: 'badge-total-width',
    label: 'Общая ширина',
    value: config.width,
    min: 400,
    max: 5000,
    step: 50,
    position: {
      x: originX + config.width / 2,
      y: originY - 45,
    },
    orientation: 'horizontal',
    target: 'overall-width',
  });

  // Общая высота
  badges.push({
    id: 'badge-total-height',
    label: 'Общая высота',
    value: config.height,
    min: 500,
    max: 3500,
    step: 50,
    position: {
      x: originX - 60,
      y: originY + config.height / 2,
    },
    orientation: 'vertical',
    target: 'overall-height',
  });

  // Ширина отдельных створок (снизу окна)
  if (config.sashes.length > 1) {
    let startX = daylightX;
    config.sashes.forEach((s, idx) => {
      const sWidth = calculatedWidths[idx] || Math.round(availableSashWidth / sashCount);
      badges.push({
        id: `badge-sash-width-${idx}`,
        label: `Створка ${idx + 1}`,
        value: s.widthMm || Math.round(config.width / config.sashes.length),
        min: 400,
        max: 2000,
        step: 50,
        position: {
          x: startX + sWidth / 2,
          y: originY + config.height + 45,
        },
        orientation: 'horizontal',
        target: 'sash-width',
        sashIndex: idx,
      });
      startX += sWidth + impostThickness;
    });
  }

  // 4. Цвета и оформление
  const extColor = EXTERIOR_COLORS.find(c => c.id === config.colors.exteriorId) || EXTERIOR_COLORS[0];
  const glassTint = config.glazingId.includes('acoustic')
    ? 'rgba(180, 220, 245, 0.32)'
    : 'rgba(215, 238, 255, 0.22)';

  const canvasWidth = config.width + marginLeft + marginRight;
  const canvasHeight = config.height + marginTop + marginBottom;
  const viewBox = `0 0 ${canvasWidth} ${canvasHeight}`;

  return {
    viewBox,
    canvasWidth,
    canvasHeight,
    overallOuterFrame,
    frameExtensions,
    imposts,
    sashes,
    badges,
    frameColorHex: extColor.hex,
    glassTint,
  };
}