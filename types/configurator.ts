export type ProfileMaterial = 'aluminium' | 'wood' | 'wood-aluminium' | 'upvc' | 'upvc-aluminium';

export interface ProfileSystem {
  id: string;
  name: string;
  category: ProfileMaterial;
  depthMm: number;
  chambers?: number;
  uwValue: number; // W/m²K
  soundInsulationDb: number;
  description: string;
  badge?: string;
  imagePath: string;
  pricePerMeter: number;
}

export interface WindowTypeOption {
  id: string;
  name: string;
  sashCount: number;
  hasTopLight: boolean;
  hasBottomLight: boolean;
  description: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  imagePath: string;
  availableOpeningStyles: OpeningStyleOption[];
}

export type OpeningType = 'fix' | 'turn-left' | 'turn-right' | 'tilt-turn-left' | 'tilt-turn-right' | 'tilt' | 'stulp-left' | 'stulp-right' | 'sliding';

export interface OpeningStyleOption {
  id: string;
  name: string;
  code: string;
  type: OpeningType;
  description: string;
  imagePath: string;
  priceDelta: number;
}

export interface ColorOption {
  id: string;
  name: string;
  code: string;
  hex: string;
  texturePath?: string;
  priceMultiplier: number;
  category: 'standard' | 'ral' | 'wood-stain' | 'metallic';
}

export interface GlazingOption {
  id: string;
  name: string;
  formula: string;
  ugValue: number;
  soundDb: number;
  thicknessMm: number;
  description: string;
  imagePath: string;
  priceDeltaPerSqm: number;
  features: string[];
}

export interface OuterFrameOption {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  priceDelta: number;
}

export interface HandleOption {
  id: string;
  name: string;
  model: string;
  isLockable: boolean;
  hasSecuForte: boolean;
  description: string;
  imagePath: string;
  basePrice: number;
}

export interface HandleColorOption {
  id: string;
  name: string;
  hex: string;
  finish: string;
}

export interface SashConfig {
  id: string;
  openingStyleId: string;
  widthMm: number;
  isFrosted: boolean;
  isInfill: boolean; // Опция непрозрачной сэндвич-панели вместо стекла
}

export interface FrameExtensions {
  topMm: number;
  bottomMm: number;
  leftMm: number;
  rightMm: number;
}

export interface WindowConfiguration {
  width: number;
  height: number;
  installationHeight: number;
  windowTypeId: string;
  profileId: string;
  outerFrameId: string;
  colors: {
    exteriorId: string;
    interiorId: string;
  };
  glazingId: string;
  sashes: SashConfig[];
  frameExtensions: FrameExtensions;
  handle: {
    modelId: string;
    colorId: string;
  };
  options: {
    warmEdgeSpacer: boolean;
    glazingBars: boolean;
    alarmContacts: boolean;
    installation: boolean;
    preDrilledHoles: boolean;
  };
  customerNotes: string;
}