export function formatCurrency(amount: number, currency: string = '€'): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
  return `${formatted}\u00A0${currency}`;
}