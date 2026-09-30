'use client';

import * as React from 'react';
import Image from 'next/image';
import { Layers } from 'lucide-react';

interface VisualCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  imageSrc?: string;
  isSelected?: boolean;
  onClick?: () => void;
  priceText?: string;
  fallbackIcon?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'wide';
  className?: string;
}

export const VisualCard: React.FC<VisualCardProps> = ({
  title,
  subtitle,
  description,
  badge,
  imageSrc,
  isSelected = false,
  onClick,
  priceText,
  fallbackIcon,
  aspectRatio = 'video',
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);

  const ratios = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    wide: 'aspect-[21/9]',
  };

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-xl border text-left cursor-pointer transition-all duration-200 select-none overflow-hidden ${
        isSelected
          ? 'bg-neutral-850 border-cyan-500/90 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-950/40'
          : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
      } ${className}`}
    >
      {/* Image or Graceful Degradation Placeholder */}
      <div className={`relative w-full ${ratios[aspectRatio]} overflow-hidden bg-neutral-950/80 border-b border-neutral-800/60 flex items-center justify-center`}>
        {imageSrc && !imgError ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-500 group-hover:text-neutral-400 transition-colors">
            {fallbackIcon || <Layers className="w-8 h-8 stroke-[1.5] text-cyan-400/60 mb-1" />}
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-1">Визуализация</span>
          </div>
        )}

        {/* Badge in image area */}
        {badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-neutral-950/90 text-cyan-300 border border-cyan-800/40 backdrop-blur-md shadow-md">
            {badge}
          </span>
        )}

        {/* Selected check circle */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-500 text-neutral-950 flex items-center justify-center shadow-md">
            <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className={`text-xs font-semibold leading-snug tracking-tight ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
            {title}
          </h4>
          {priceText && (
            <span className="text-[11px] font-mono font-medium text-cyan-400 shrink-0">
              {priceText}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-[11px] text-neutral-400 mt-0.5 font-medium truncate">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};