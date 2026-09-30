'use client';

import * as React from 'react';
import { useConfiguratorStore } from '../../../hooks/use-configurator-store';
import { calculateWindowSceneGraph } from '../../../lib/configurator/svg-geometry';
import { DimensionBadge } from './dimension-badge';

export const WindowSvgView: React.FC = () => {
  const config = useConfiguratorStore((s) => s.configuration);
  const setWidth = useConfiguratorStore((s) => s.setWidth);
  const setHeight = useConfiguratorStore((s) => s.setHeight);
  const setSashWidth = useConfiguratorStore((s) => s.setSashWidth);

  // Вычисляем чистое геометрическое дерево для SVG
  const scene = React.useMemo(() => {
    return calculateWindowSceneGraph(config);
  }, [config]);

  const handleBadgeChange = (target: string, value: number, sashIndex?: number) => {
    if (target === 'overall-width') {
      setWidth(value);
    } else if (target === 'overall-height') {
      setHeight(value);
    } else if (target === 'sash-width' && sashIndex !== undefined) {
      setSashWidth(sashIndex, value);
    }
  };

  const { overallOuterFrame, frameExtensions, imposts, sashes, badges, frameColorHex, glassTint } = scene;

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[580px] flex items-center justify-center p-4 lg:p-8 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 rounded-2xl border border-neutral-800 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Архитектурная координатная фоновая сетка */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Метка масштаба / режима */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-neutral-400 select-none backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>Интерактивная схема · 1:10</span>
      </div>

      <svg
        viewBox={scene.viewBox}
        className="w-full h-full max-h-[75vh] select-none transition-all duration-300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Световые градиенты для стекла */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#d8eeff" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#c5e6ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#9ccaff" stopOpacity="0.05" />
          </linearGradient>

          {/* Паттерн матового стекла */}
          <pattern id="frostedGlassPattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#e6f2fa" fillOpacity="0.4" />
            <circle cx="2" cy="2" r="1" fill="#ffffff" fillOpacity="0.7" />
            <circle cx="6" cy="6" r="1.2" fill="#d0e5f5" fillOpacity="0.8" />
          </pattern>

          {/* Паттерн непрозрачной панели (infill) */}
          <pattern id="infillPattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#2d3034" />
            <line x1="0" y1="8" x2="16" y2="8" stroke="#393d42" strokeWidth="1.5" />
          </pattern>

          {/* Тень для рамы */}
          <filter id="frameShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. Выносные размерные линии */}
        {/* Горизонтальная линия габарита сверху */}
        <g stroke="#525252" strokeWidth="1" strokeDasharray="3 3">
          <line
            x1={overallOuterFrame.x}
            y1={overallOuterFrame.y}
            x2={overallOuterFrame.x}
            y2={overallOuterFrame.y - 45}
          />
          <line
            x1={overallOuterFrame.x + overallOuterFrame.width}
            y1={overallOuterFrame.y}
            x2={overallOuterFrame.x + overallOuterFrame.width}
            y2={overallOuterFrame.y - 45}
          />
          <line
            x1={overallOuterFrame.x}
            y1={overallOuterFrame.y - 45}
            x2={overallOuterFrame.x + overallOuterFrame.width}
            y2={overallOuterFrame.y - 45}
            strokeDasharray="none"
            stroke="#737373"
          />
        </g>

        {/* Вертикальная линия габарита слева */}
        <g stroke="#525252" strokeWidth="1" strokeDasharray="3 3">
          <line
            x1={overallOuterFrame.x}
            y1={overallOuterFrame.y}
            x2={overallOuterFrame.x - 60}
            y2={overallOuterFrame.y}
          />
          <line
            x1={overallOuterFrame.x}
            y1={overallOuterFrame.y + overallOuterFrame.height}
            x2={overallOuterFrame.x - 60}
            y2={overallOuterFrame.y + overallOuterFrame.height}
          />
          <line
            x1={overallOuterFrame.x - 60}
            y1={overallOuterFrame.y}
            x2={overallOuterFrame.x - 60}
            y2={overallOuterFrame.y + overallOuterFrame.height}
            strokeDasharray="none"
            stroke="#737373"
          />
        </g>

        {/* 2. Подсветка расширителей рамы (доборов) */}
        {frameExtensions.map((ext, idx) => (
          <g key={`ext-${idx}`}>
            <rect
              x={ext.x}
              y={ext.y}
              width={ext.width}
              height={ext.height}
              fill="#06b6d4"
              fillOpacity="0.15"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <text
              x={ext.x + ext.width / 2}
              y={ext.y + ext.height / 2 + 4}
              textAnchor="middle"
              fill="#22d3ee"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Добор +{ext.extensionMm} мм
            </text>
          </g>
        ))}

        {/* 3. Внешняя рама окна */}
        <rect
          x={overallOuterFrame.x}
          y={overallOuterFrame.y}
          width={overallOuterFrame.width}
          height={overallOuterFrame.height}
          fill={frameColorHex}
          stroke="#171717"
          strokeWidth="2"
          filter="url(#frameShadow)"
          rx="2"
        />

        {/* Внутренняя фаска рамы */}
        <rect
          x={overallOuterFrame.x + 3}
          y={overallOuterFrame.y + 3}
          width={overallOuterFrame.width - 6}
          height={overallOuterFrame.height - 6}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />

        {/* 4. Импосты (вертикальные и горизонтальные разделители) */}
        {imposts.map((imp, idx) => (
          <g key={`impost-${idx}`}>
            <rect
              x={imp.rect.x}
              y={imp.rect.y}
              width={imp.rect.width}
              height={imp.rect.height}
              fill={frameColorHex}
              stroke="#171717"
              strokeWidth="1.5"
            />
            {/* Тонкие линии фасок на импосте */}
            <rect
              x={imp.rect.x + 2}
              y={imp.rect.y + 2}
              width={imp.rect.width - 4}
              height={imp.rect.height - 4}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* 5. Створки, стеклопакеты, раскладки и ручки */}
        {sashes.map((sash, idx) => {
          const isOpenable = Boolean(sash.opening);

          return (
            <g key={sash.id}>
              {/* Профиль створки (если створка открывающаяся) */}
              {isOpenable && (
                <>
                  <rect
                    x={sash.outerRect.x}
                    y={sash.outerRect.y}
                    width={sash.outerRect.width}
                    height={sash.outerRect.height}
                    fill={frameColorHex}
                    stroke="#171717"
                    strokeWidth="2"
                    rx="1"
                  />
                  <rect
                    x={sash.outerRect.x + 2}
                    y={sash.outerRect.y + 2}
                    width={sash.outerRect.width - 4}
                    height={sash.outerRect.height - 4}
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.14"
                    strokeWidth="1"
                  />
                </>
              )}

              {/* Стеклопакет или глухая панель */}
              {sash.isInfill ? (
                <rect
                  x={sash.glassRect.x}
                  y={sash.glassRect.y}
                  width={sash.glassRect.width}
                  height={sash.glassRect.height}
                  fill="url(#infillPattern)"
                  stroke="#171717"
                  strokeWidth="1.5"
                />
              ) : sash.isFrosted ? (
                <rect
                  x={sash.glassRect.x}
                  y={sash.glassRect.y}
                  width={sash.glassRect.width}
                  height={sash.glassRect.height}
                  fill="url(#frostedGlassPattern)"
                  stroke="#171717"
                  strokeWidth="1.5"
                />
              ) : (
                <g>
                  {/* Базовый цвет стекла с легким оттенком остекления */}
                  <rect
                    x={sash.glassRect.x}
                    y={sash.glassRect.y}
                    width={sash.glassRect.width}
                    height={sash.glassRect.height}
                    fill={glassTint}
                    stroke="#171717"
                    strokeWidth="1.5"
                  />
                  {/* Оптический градиент и отражение света */}
                  <rect
                    x={sash.glassRect.x}
                    y={sash.glassRect.y}
                    width={sash.glassRect.width}
                    height={sash.glassRect.height}
                    fill="url(#glassReflection)"
                  />
                  {/* Диагональный блик архитектурного стекла */}
                  <line
                    x1={sash.glassRect.x + 20}
                    y1={sash.glassRect.y + sash.glassRect.height - 20}
                    x2={sash.glassRect.x + sash.glassRect.width - 20}
                    y2={sash.glassRect.y + 20}
                    stroke="#ffffff"
                    strokeOpacity="0.18"
                    strokeWidth="2"
                    strokeDasharray="18 12"
                  />
                </g>
              )}

              {/* Резиновый уплотнитель по периметру стекла */}
              <rect
                x={sash.glassRect.x}
                y={sash.glassRect.y}
                width={sash.glassRect.width}
                height={sash.glassRect.height}
                fill="none"
                stroke="#1f2428"
                strokeWidth="2.5"
              />

              {/* Декоративные раскладки (шпроссы) */}
              {sash.glazingBars &&
                sash.glazingBars.map((lineCoords, barIdx) => (
                  <line
                    key={`bar-${barIdx}`}
                    x1={lineCoords[0].x}
                    y1={lineCoords[0].y}
                    x2={lineCoords[1].x}
                    y2={lineCoords[1].y}
                    stroke={frameColorHex}
                    strokeWidth="6"
                    strokeLinecap="square"
                  />
                ))}

              {/* Векторные линии открывания створки */}
              {sash.opening && (
                <path
                  d={sash.opening.pathD}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray={sash.opening.type.includes('tilt') ? '6 4' : 'none'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              )}

              {/* Оконная ручка */}
              {sash.handle && (
                <g
                  transform={`translate(${sash.handle.position.x}, ${sash.handle.position.y}) rotate(${sash.handle.rotation})`}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                >
                  {/* Розетка ручки */}
                  <rect
                    x="-6"
                    y="-18"
                    width="12"
                    height="36"
                    rx="3"
                    fill={sash.handle.colorHex}
                    stroke="#171717"
                    strokeWidth="1"
                  />
                  {/* Рукоять рычага */}
                  <rect
                    x="-4"
                    y="0"
                    width="8"
                    height="54"
                    rx="4"
                    fill={sash.handle.colorHex}
                    stroke="#171717"
                    strokeWidth="1.2"
                  />
                  {/* Металлическая грань/блик */}
                  <line
                    x1="-1"
                    y1="4"
                    x2="-1"
                    y2="48"
                    stroke="#ffffff"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* 6. Интерактивные плашки размеров прямо на чертеже */}
        {badges.map((badge) => (
          <DimensionBadge
            key={badge.id}
            badge={badge}
            onChange={(val) => handleBadgeChange(badge.target, val, badge.sashIndex)}
          />
        ))}
      </svg>
    </div>
  );
};