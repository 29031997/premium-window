'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  id: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  badge,
  icon,
  isOpen = false,
  onToggle,
  children,
}) => {
  return (
    <div className="border border-neutral-800/80 rounded-xl overflow-hidden bg-neutral-900/40 backdrop-blur-sm transition-colors duration-150 hover:border-neutral-700/80">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left transition-colors select-none focus-visible:outline-none focus-visible:bg-neutral-800/50"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-neutral-400 shrink-0">{icon}</span>}
          <span className="text-sm font-semibold text-neutral-100 truncate">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/60 shrink-0">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-neutral-800/40 animate-in fade-in-50 duration-150">
          {children}
        </div>
      )}
    </div>
  );
};