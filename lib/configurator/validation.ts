import { WindowConfiguration } from '../../types/configurator';
import { WINDOW_TYPES } from '../../data/window-types';

export interface ValidationIssue {
  field: string;
  message: string;
  level: 'error' | 'warning';
}

export function validateWindowConfiguration(config: WindowConfiguration): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const typeDef = WINDOW_TYPES.find(t => t.id === config.windowTypeId) || WINDOW_TYPES[0];

  if (config.width < typeDef.minWidth) {
    issues.push({
      field: 'width',
      message: `Минимальная ширина для конструкции «${typeDef.name}» составляет ${typeDef.minWidth} мм.`,
      level: 'error',
    });
  } else if (config.width > typeDef.maxWidth) {
    issues.push({
      field: 'width',
      message: `Максимальная ширина для конструкции «${typeDef.name}» составляет ${typeDef.maxWidth} мм. Требуется согласование статических расчетов.`,
      level: 'error',
    });
  }

  if (config.height < typeDef.minHeight) {
    issues.push({
      field: 'height',
      message: `Минимальная высота для данной конструкции составляет ${typeDef.minHeight} мм.`,
      level: 'error',
    });
  } else if (config.height > typeDef.maxHeight) {
    issues.push({
      field: 'height',
      message: `Максимальная высота превышена (${typeDef.maxHeight} мм). Для таких высот рекомендуется установка усиливающих пилястр.`,
      level: 'error',
    });
  }

  // Проверка минимальной ширины створок
  config.sashes.forEach((sash, index) => {
    if (sash.widthMm < 400 && sash.openingStyleId !== 'fix') {
      issues.push({
        field: `sash-${index}`,
        message: `Ширина створки №${index + 1} (${sash.widthMm} мм) меньше минимально допустимой для открывания (400 мм).`,
        level: 'warning',
      });
    }
  });

  return issues;
}