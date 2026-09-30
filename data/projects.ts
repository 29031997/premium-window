export interface ArchitecturalProject {
  id: string;
  title: string;
  location: string;
  year: number;
  areaSqm: string;
  glazingType: string;
  profileSystem: string;
  description: string;
  imageUrl: string;
  specs: {
    windLoadClass: string;
    thermalUw: string;
    acousticDb: string;
    glassDimensions: string;
  };
}

export const ARCHITECTURAL_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'mountain-chalet-almaty',
    title: 'Резиденция «Тау-Самал»',
    location: 'Алматы, предгорье Заилийского Алатау',
    year: 2025,
    areaSqm: '680 м²',
    glazingType: 'Панорамный структурный триплекс VSG 44.2',
    profileSystem: 'Schüco AWS 90.SI+ & Natura Solid 110',
    description: 'Монументальный проект на склоне горы с безрамными угловыми стыками и раздвижными порталами 6.2 × 3.1 м.',
    imageUrl: 'https://images.unsplash.com/photos/modern-living-room-with-high-ceilings-and-large-windows-IXLv2HcP46Q?auto=format&fit=crop&w=1600&q=80',
    specs: {
      windLoadClass: 'Класс C4 (до 160 км/ч)',
      thermalUw: '0.70 Вт/м²K',
      acousticDb: '46 дБ',
      glassDimensions: '6200 × 3100 мм',
    },
  },
  {
    id: 'burabay-lake-villa',
    title: 'Вилла у озера «Бурабай»',
    location: 'Акмолинская область',
    year: 2025,
    areaSqm: '490 м²',
    glazingType: 'Мультифункциональный энергосберегающий триплекс с зеркальным Low-E',
    profileSystem: 'Natura Solid 96 (Дерево-Алюминий, Дуб)',
    description: 'Остекление в пол по всему южному фасаду с защитой от перегрева в летний зной и предельным удержанием тепла зимой при морозах -40°C.',
    imageUrl: 'https://images.unsplash.com/photos/elegant-white-living-room-overlooking-a-beautiful-lake-and-mountains-tRQGuk9YvEA?auto=format&fit=crop&w=1600&q=80',
    specs: {
      windLoadClass: 'Класс C3',
      thermalUw: '0.67 Вт/м²K',
      acousticDb: '43 дБ',
      glassDimensions: '4800 × 2800 мм',
    },
  },
  {
    id: 'shymkent-manor',
    title: 'Частное поместье «Атамекен»',
    location: 'Шымкент, парковая зона',
    year: 2026,
    areaSqm: '820 м²',
    glazingType: 'Acoustic SoundMaster 9(SC)-5-8 с защитой от солнца SolarControl',
    profileSystem: 'Schüco AWS 75.SI Premium в цвете DB 703',
    description: 'Индивидуальные фасадные конструкции с интегрированными скрытыми створками Hidden Sash и автоматическими приводами Schüco TipTronic.',
    imageUrl: 'https://images.unsplash.com/photos/modern-living-room-with-sectional-sofa-and-large-window-yxO8YG082v8?auto=format&fit=crop&w=1600&q=80',
    specs: {
      windLoadClass: 'Класс B3',
      thermalUw: '0.74 Вт/м²K',
      acousticDb: '48 дБ',
      glassDimensions: '5400 × 3000 мм',
    },
  },
];