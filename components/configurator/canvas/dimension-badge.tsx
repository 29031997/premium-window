'use client';

import * as React from 'react';
import { DimensionBadge as DimensionBadgeType } from '../../../types/geometry';
import { Minus, Plus } from 'lucide-react';

interface DimensionBadgeProps {
  badge: DimensionBadgeType;
  onChange: (newValue: number) => void;
}

export const DimensionBadge: React.FC<DimensionBadgeProps> = ({
  badge,
  onChange,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [localVal, setLocalVal] = React.useState(badge.value.toString());

  React.useEffect(() => {
    setLocalVal(badge.value.toString());
  }, [badge.value]);

  const handleStep = (direction: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = Math.max(badge.min, Math.min(badge.max, badge.value + direction * badge.step));
    onChange(next);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const parsed = parseInt(localVal, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(badge.min, Math.min(badge.max, parsed));
      onChange(clamped);
      setLocalVal(clamped.toString());
    } else {
      setLocalVal(badge.value.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setLocalVal(badge.value.toString());
    }
  };

  // Размеры foreignObject контейнера
  const width = 130;
  const height = 36;
  const posX = badge.position.x - width / 2;
  const posY = badge.position.y - height / 2;

  return (
    <foreignObject
      x={posX}
      y={posY}
      width={width}
      height={height}
      className="overflow-visible"
    >
      <div className="flex items-center justify-between h-9 px-1.5 rounded-lg bg-neutral-900/95 border border-neutral-700/90 shadow-xl backdrop-blur-md text-neutral-100 font-mono text-xs select-none transition-all duration-150 hover:border-cyan-500/80 group">
        {/* Кнопка минус */}
        <button
          type="button"
          onClick={(e) => handleStep(-1, e)}
          disabled={badge.value <= badge.min}
          className="w-6 h-6 flex items-center justify-center rounded text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title={`Уменьшить на ${badge.step} мм`}
        >
          <Minus className="w-3 h-3" />
        </button>

        {/* Числовое значение или редактируемый инпут */}
        <div className="flex items-baseline gap-1 px-1 cursor-text" onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={localVal}
              onChange={(e) => setLocalVal(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-12 h-6 px-1 text-center bg-neutral-800 border border-cyan-500 rounded text-cyan-300 font-bold focus:outline-none"
            />
          ) : (
            <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
              {badge.value}
            </span>
          )}
          <span className="text-[10px] text-neutral-400">мм</span>
        </div>

        {/* Кнопка плюс */}
        <button
          type="button"
          onClick={(e) => handleStep(1, e)}
          disabled={badge.value >= badge.max}
          className="w-6 h-6 flex items-center justify-center rounded text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title={`Увеличить на ${badge.step} мм`}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </foreignObject>
  );
};