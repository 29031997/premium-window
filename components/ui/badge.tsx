import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'accent';
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-neutral-800 text-neutral-200 border-neutral-700',
    secondary: 'bg-neutral-900 text-neutral-400 border-neutral-800',
    outline: 'border-neutral-700 text-neutral-300',
    accent: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/50',
  };

  return (
    <div
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};