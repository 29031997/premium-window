import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      primary: 'bg-white text-neutral-950 hover:bg-neutral-100 shadow-sm active:scale-[0.98]',
      secondary: 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:scale-[0.98]',
      outline: 'border border-neutral-700 bg-transparent text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800/40 active:scale-[0.98]',
      ghost: 'bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white',
      accent: 'bg-cyan-500 text-neutral-950 font-semibold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-[0.98]',
      danger: 'bg-red-600 text-white hover:bg-red-500',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
      md: 'h-10 px-4 text-sm rounded-xl gap-2',
      lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
      icon: 'h-9 w-9 rounded-lg p-0',
    };

    const combined = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button ref={ref} className={combined} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';