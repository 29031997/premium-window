import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PREMIUM FENSTERBAU | Архитектурные оконные системы и интерактивный конфигуратор',
  description: 'Проектирование и производство панорамных окон, раздвижных порталов и фасадных систем Schüco и Natura. Расчет стоимости онлайн.',
  keywords: ['панорамные окна', 'Schüco', 'дерево-алюминиевые окна', 'конфигуратор окон', 'Passivhaus', 'остекление вилл'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth bg-neutral-950 text-neutral-100 antialiased">
      <body className="min-h-screen bg-neutral-950 selection:bg-cyan-500 selection:text-neutral-950">
        {children}
      </body>
    </html>
  );
}