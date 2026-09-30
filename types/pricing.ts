export interface PriceLineItem {
  id: string;
  category: 'base' | 'profile' | 'glazing' | 'color' | 'hardware' | 'extensions' | 'options' | 'installation';
  label: string;
  description?: string;
  amount: number;
  isHighlighted?: boolean;
}

export interface PriceCalculationResult {
  basePrice: number;
  totalPrice: number;
  areaSquareMeters: number;
  perimeterMeters: number;
  items: PriceLineItem[];
}