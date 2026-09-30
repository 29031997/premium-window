import { OuterFrameOption } from '../types/configurator';

export const OUTER_FRAMES: OuterFrameOption[] = [
  {
    id: 'type-a',
    name: 'Type A (Classic Flush)',
    description: 'Классическая рама со скрытым штапиком и универсальной четвертью для большинства каменных проемов.',
    imagePath: '/assets/Window frame (outer frame)/Type A.png',
    priceDelta: 0,
  },
  {
    id: 'type-b',
    name: 'Type B (Beveled Drain)',
    description: 'Рама со скошенным фальцем 15° для улучшенного водоотведения в регионах с высокой ветровой нагрузкой.',
    imagePath: '/assets/Window frame (outer frame)/Type B.png',
    priceDelta: 45,
  },
  {
    id: 'type-c',
    name: 'Type C (Monoblock Façade)',
    description: 'Интегрированная рама с широкой внешней полкой для бесшовного монтажа в вентилируемый фасад.',
    imagePath: '/assets/Window frame (outer frame)/Type C.png',
    priceDelta: 85,
  },
  {
    id: 'type-d',
    name: 'Type D (Hidden Sash)',
    description: 'Инновационная скрытая створка: снаружи видна только тонкая рама, остекление выглядит сплошным.',
    imagePath: '/assets/Window frame (outer frame)/Type D.png',
    priceDelta: 130,
  },
];