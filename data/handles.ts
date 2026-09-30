import { HandleOption, HandleColorOption } from '../types/configurator';

export const WINDOW_HANDLES: HandleOption[] = [
  {
    id: 'hoppe-toulon-secuforte',
    name: 'Hoppe Toulon SecuForte',
    model: 'Toulon-01',
    isLockable: false,
    hasSecuForte: true,
    description: 'Инновационная противовзломная система: ручка автоматически блокируется снаружи при закрытии окна.',
    imagePath: '/assets/Window handle/Hoppe Toulon SecuForte.jpg',
    basePrice: 48,
  },
  {
    id: 'hoppe-toulon-lockable',
    name: 'Hoppe Toulon с замком',
    model: 'Toulon-Lock',
    isLockable: true,
    hasSecuForte: false,
    description: 'Эргономичная дизайнерская ручка со встроенной цилиндрической личинкой и ключом (детская безопасность).',
    imagePath: '/assets/Window handle/Hoppe Toulon Lockable.jpg',
    basePrice: 58,
  },
  {
    id: 'hoppe-toulon-standard',
    name: 'Hoppe Toulon Standard',
    model: 'Toulon-Std',
    isLockable: false,
    hasSecuForte: false,
    description: 'Лаконичная ручка с мягкими фасками и фирменным бесшумным ходом механизма фиксации 45°/90°.',
    imagePath: '/assets/Window handle/Hoppe Toulon.jpg',
    basePrice: 32,
  },
  {
    id: 'hoppe-new-york',
    name: 'Hoppe New York',
    model: 'NewYork-01',
    isLockable: false,
    hasSecuForte: false,
    description: 'Строгая геометрическая форма с плоской гранью для современных интерьеров в стиле минимализм и баухаус.',
    imagePath: '/assets/Window handle/Hoppe New York.jpg',
    basePrice: 38,
  },
];

export const HANDLE_COLORS: HandleColorOption[] = [
  { id: 'titanium-f9', name: 'Шлифованный титан F9', hex: '#63666A', finish: 'Satin Titanium' },
  { id: 'matte-black-9005', name: 'Матовый глубокий черный', hex: '#1F1F1F', finish: 'Deep Matte' },
  { id: 'silver-f1', name: 'Анодированное серебро F1', hex: '#C2C4C6', finish: 'Anodized Silver' },
  { id: 'brushed-brass', name: 'Сатинированная латунь', hex: '#C49E60', finish: 'Brushed Brass' },
  { id: 'pure-white-9016', name: 'Белоснежный эмаль', hex: '#EDEDED', finish: 'White Gloss' },
];