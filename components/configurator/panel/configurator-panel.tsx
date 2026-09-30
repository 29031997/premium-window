'use client';

import * as React from 'react';
import { useConfiguratorStore } from '../../../hooks/use-configurator-store';
import { WINDOW_TYPES } from '../../../data/window-types';
import { PROFILE_SYSTEMS } from '../../../data/profiles';
import { GLAZING_OPTIONS } from '../../../data/glazing';
import { EXTERIOR_COLORS, INTERIOR_COLORS } from '../../../data/colors';
import { WINDOW_HANDLES, HANDLE_COLORS } from '../../../data/handles';
import { OUTER_FRAMES } from '../../../data/outer-frames';
import { AccordionItem } from '../../ui/accordion';
import { VisualCard } from './visual-card';
import { Tooltip } from '../../ui/tooltip';
import { Switch } from '../../ui/switch';
import { Tabs } from '../../ui/tabs';
import {
  Ruler,
  Maximize2,
  Sliders,
  Shield,
  Palette,
  Layers,
  Square,
  Sparkles,
  Wrench,
  HelpCircle,
  EyeOff,
  PanelLeftClose,
} from 'lucide-react';

export const ConfiguratorPanel: React.FC = () => {
  const config = useConfiguratorStore((s) => s.configuration);
  const setWidth = useConfiguratorStore((s) => s.setWidth);
  const setHeight = useConfiguratorStore((s) => s.setHeight);
  const setInstallationHeight = useConfiguratorStore((s) => s.setInstallationHeight);
  const setWindowType = useConfiguratorStore((s) => s.setWindowType);
  const setSashOpeningStyle = useConfiguratorStore((s) => s.setSashOpeningStyle);
  const toggleSashFrosted = useConfiguratorStore((s) => s.toggleSashFrosted);
  const toggleSashInfill = useConfiguratorStore((s) => s.toggleSashInfill);
  const setProfile = useConfiguratorStore((s) => s.setProfile);
  const setOuterFrame = useConfiguratorStore((s) => s.setOuterFrame);
  const setExteriorColor = useConfiguratorStore((s) => s.setExteriorColor);
  const setInteriorColor = useConfiguratorStore((s) => s.setInteriorColor);
  const setGlazing = useConfiguratorStore((s) => s.setGlazing);
  const setFrameExtension = useConfiguratorStore((s) => s.setFrameExtension);
  const setHandleModel = useConfiguratorStore((s) => s.setHandleModel);
  const setHandleColor = useConfiguratorStore((s) => s.setHandleColor);
  const toggleOption = useConfiguratorStore((s) => s.toggleOption);
  const setCustomerNotes = useConfiguratorStore((s) => s.setCustomerNotes);

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    dimensions: true,
    type: false,
    opening: false,
    profile: true,
    colors: false,
    glazing: false,
    frame: false,
    hardware: false,
    options: false,
    install: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [colorTab, setColorTab] = React.useState<'exterior' | 'interior'>('exterior');
  const [showAdvancedDimensions, setShowAdvancedDimensions] = React.useState(false);
  const currentWindowType = WINDOW_TYPES.find((t) => t.id === config.windowTypeId) || WINDOW_TYPES[1];

  return (
    <div className="w-full h-full flex flex-col space-y-3.5 pr-1 lg:pr-2 select-none">
      {/* 1. Размеры */}
      <AccordionItem
        id="dimensions"
        title="Размеры и установка"
        icon={<Ruler className="w-4 h-4 text-cyan-400" />}
        badge={`${config.width} × ${config.height} мм`}
        isOpen={openSections.dimensions}
        onToggle={() => toggleSection('dimensions')}
      >
        <div className="space-y-4 pt-2">
          {/* Общая ширина */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                Общая ширина (W)
                <Tooltip content="Полная ширина окна по внешней раме. При изменении сразу меняется вся конструкция на схеме.">
                  <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-cyan-400 cursor-help" />
                </Tooltip>
              </span>
              <span className="font-mono text-cyan-400 font-semibold">{config.width} мм</span>
            </div>
            <input
              type="range"
              min={currentWindowType.minWidth}
              max={currentWindowType.maxWidth}
              step="10"
              value={config.width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Общая высота */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                Общая высота (H)
                <Tooltip content="Полная высота окна по внешней раме. Изменение пропорций немедленно отображается на чертеже.">
                  <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-cyan-400 cursor-help" />
                </Tooltip>
              </span>
              <span className="font-mono text-cyan-400 font-semibold">{config.height} мм</span>
            </div>
            <input
              type="range"
              min={currentWindowType.minHeight}
              max={currentWindowType.maxHeight}
              step="10"
              value={config.height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Расширенные настройки: высота установки */}
          <div className="pt-2 border-t border-neutral-800/60">
            <button
              type="button"
              onClick={() => setShowAdvancedDimensions(!showAdvancedDimensions)}
              className="text-xs text-neutral-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3 h-3" />
              <span>{showAdvancedDimensions ? 'Скрыть высоту монтажа' : 'Высота установки от пола...'}</span>
            </button>

            {showAdvancedDimensions && (
              <div className="mt-3 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 animate-in fade-in-50">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-300 flex items-center gap-1.5">
                    Высота установки
                    <Tooltip content="Высота установки окна относительно пола. Используется для расчёта и понимания монтажного положения окна.">
                      <HelpCircle className="w-3.5 h-3.5 text-neutral-500 hover:text-cyan-400 cursor-help" />
                    </Tooltip>
                  </span>
                  <span className="font-mono text-neutral-200">{config.installationHeight} мм</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={config.installationHeight}
                  onChange={(e) => setInstallationHeight(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-300"
                />
              </div>
            )}
          </div>
        </div>
      </AccordionItem>

      {/* 2. Тип окна */}
      <AccordionItem
        id="type"
        title="Тип конструкции окна"
        icon={<Maximize2 className="w-4 h-4 text-cyan-400" />}
        badge={currentWindowType.name}
        isOpen={openSections.type}
        onToggle={() => toggleSection('type')}
      >
        <div className="pt-2">
          <p className="text-xs text-neutral-400 mb-3 flex items-center gap-1">
            <span>Выберите конфигурацию секций окна</span>
            <Tooltip content="Определяет общую конструкцию: сколько секций у окна и есть ли верхние или нижние части.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {WINDOW_TYPES.map((type) => (
              <VisualCard
                key={type.id}
                title={type.name}
                subtitle={`${type.sashCount} створ${type.sashCount > 1 ? 'ки' : 'ка'}`}
                imageSrc={type.imagePath}
                isSelected={type.id === config.windowTypeId}
                onClick={() => setWindowType(type.id)}
                aspectRatio="square"
              />
            ))}
          </div>
        </div>
      </AccordionItem>

      {/* 3. Схема открывания */}
      <AccordionItem
        id="opening"
        title="Схема открывания створок"
        icon={<Sliders className="w-4 h-4 text-cyan-400" />}
        badge={`${config.sashes.length} ств.`}
        isOpen={openSections.opening}
        onToggle={() => toggleSection('opening')}
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-neutral-400 flex items-center gap-1">
            <span>Направление и механизм для каждой створки</span>
            <Tooltip content="Показывает, как именно открывается створка: в какую сторону и с каким типом механизма.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>

          {config.sashes.map((sash, index) => (
            <div key={sash.id} className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-200">Створка №{index + 1}</span>
                <span className="text-[11px] font-mono text-neutral-400">{sash.widthMm} мм</span>
              </div>

              {/* Выбор открывания */}
              <div className="grid grid-cols-3 gap-1.5">
                {currentWindowType.availableOpeningStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSashOpeningStyle(index, style.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center border transition-all select-none ${
                      sash.openingStyleId === style.id
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-sm'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-bold text-[11px] leading-tight">{style.code}</div>
                    <div className="text-[10px] text-neutral-400 truncate">{style.name}</div>
                  </button>
                ))}
              </div>

              {/* Опции для конкретной створки (матовое / глухая панель) */}
              <div className="pt-2 mt-2 border-t border-neutral-850 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => toggleSashFrosted(index)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] transition-colors border ${
                    sash.isFrosted
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-300'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Матовое</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleSashInfill(index)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] transition-colors border ${
                    sash.isInfill
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-300'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <PanelLeftClose className="w-3 h-3" />
                  <span>Термопанель</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </AccordionItem>

      {/* 4. Профильная система */}
      <AccordionItem
        id="profile"
        title="Система профиля"
        icon={<Shield className="w-4 h-4 text-cyan-400" />}
        badge={PROFILE_SYSTEMS.find((p) => p.id === config.profileId)?.name}
        isOpen={openSections.profile}
        onToggle={() => toggleSection('profile')}
      >
        <div className="space-y-3 pt-2">
          <p className="text-xs text-neutral-400 flex items-center gap-1">
            <span>Премиальные европейские системы</span>
            <Tooltip content="Профиль — это основа конструкции окна. Он влияет на внешний вид, теплоизоляцию, допустимые размеры и стоимость.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>

          <div className="space-y-2.5">
            {PROFILE_SYSTEMS.map((profile) => (
              <VisualCard
                key={profile.id}
                title={profile.name}
                subtitle={`${profile.depthMm} мм · Uw = ${profile.uwValue} Вт/м²K · ${profile.soundInsulationDb} dB`}
                description={profile.description}
                badge={profile.badge}
                imageSrc={profile.imagePath}
                isSelected={profile.id === config.profileId}
                onClick={() => setProfile(profile.id)}
                aspectRatio="wide"
              />
            ))}
          </div>
        </div>
      </AccordionItem>

      {/* 5. Цвета (Экстерьер / Интерьер) */}
      <AccordionItem
        id="colors"
        title="Цветовые решения"
        icon={<Palette className="w-4 h-4 text-cyan-400" />}
        badge={colorTab === 'exterior' ? 'Снаружи' : 'Внутри'}
        isOpen={openSections.colors}
        onToggle={() => toggleSection('colors')}
      >
        <div className="space-y-3 pt-2">
          <Tabs
            activeTab={colorTab}
            onChange={(tab) => setColorTab(tab as 'exterior' | 'interior')}
            tabs={[
              { id: 'exterior', label: 'Фасад (Снаружи)' },
              { id: 'interior', label: 'Интерьер (Внутри)' },
            ]}
          />

          <p className="text-xs text-neutral-400 flex items-center gap-1">
            <span>{colorTab === 'exterior' ? 'Отделка наружного оклада' : 'Отделка внутреннего профиля'}</span>
            <Tooltip content="Цвет окна со стороны интерьера / улицы. При выборе окно на схеме меняет цвет рамы.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>

          {/* Палитра свотчей */}
          <div className="grid grid-cols-2 gap-2">
            {(colorTab === 'exterior' ? EXTERIOR_COLORS : INTERIOR_COLORS).map((color) => {
              const isSelected =
                colorTab === 'exterior'
                  ? config.colors.exteriorId === color.id
                  : config.colors.interiorId === color.id;

              return (
                <div
                  key={color.id}
                  onClick={() =>
                    colorTab === 'exterior'
                      ? setExteriorColor(color.id)
                      : setInteriorColor(color.id)
                  }
                  className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                    isSelected
                      ? 'bg-neutral-850 border-cyan-500 ring-1 ring-cyan-500/50'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg border border-white/20 shrink-0 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">{color.name}</div>
                    <div className="text-[10px] text-neutral-400">{color.code}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AccordionItem>

      {/* 6. Стеклопакет и теплая рамка */}
      <AccordionItem
        id="glazing"
        title="Стеклопакет и энергосбережение"
        icon={<Layers className="w-4 h-4 text-cyan-400" />}
        badge={GLAZING_OPTIONS.find((g) => g.id === config.glazingId)?.name.split(' ')[1]}
        isOpen={openSections.glazing}
        onToggle={() => toggleSection('glazing')}
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-neutral-400 flex items-center gap-1">
            <span>Формулы остекления с защитой от теплопотерь</span>
            <Tooltip content="Тип стеклопакета влияет на теплоизоляцию, шумоизоляцию, безопасность и стоимость.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>

          <div className="space-y-2.5">
            {GLAZING_OPTIONS.map((glazing) => (
              <VisualCard
                key={glazing.id}
                title={glazing.name}
                subtitle={`${glazing.formula} · Ug = ${glazing.ugValue} · ${glazing.soundDb} dB`}
                description={glazing.description}
                imageSrc={glazing.imagePath}
                isSelected={glazing.id === config.glazingId}
                onClick={() => setGlazing(glazing.id)}
                aspectRatio="wide"
              />
            ))}
          </div>

          {/* Тёплая рамка */}
          <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
            <Switch
              checked={config.options.warmEdgeSpacer}
              onCheckedChange={() => toggleOption('warmEdgeSpacer')}
              label="Тёплая композитная рамка"
              description="Уменьшает краевые теплопотери стеклопакета и риск образования конденсата."
            />
          </div>
        </div>
      </AccordionItem>

      {/* 7. Наружная рама и доборы */}
      <AccordionItem
        id="frame"
        title="Рама и расширители (доборы)"
        icon={<Square className="w-4 h-4 text-cyan-400" />}
        badge={OUTER_FRAMES.find((f) => f.id === config.outerFrameId)?.name.split(' ')[0]}
        isOpen={openSections.frame}
        onToggle={() => toggleSection('frame')}
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-neutral-400 flex items-center gap-1">
            <span>Тип внешней рамы для монтажа</span>
            <Tooltip content="Вариант внешней рамы конструкции. Влияет на форму и особенности монтажного узла.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {OUTER_FRAMES.map((f) => (
              <VisualCard
                key={f.id}
                title={f.name}
                description={f.description}
                imageSrc={f.imagePath}
                isSelected={f.id === config.outerFrameId}
                onClick={() => setOuterFrame(f.id)}
                aspectRatio="square"
              />
            ))}
          </div>

          {/* Доборы (расширители) по 4 сторонам */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-200">Расширители рамы (доборы)</span>
              <Tooltip content="Дополнительный элемент рамы с выбранной стороны. Нужен для компенсации утеплителя, отделки или монтажного узла.">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help" />
              </Tooltip>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(['topMm', 'bottomMm', 'leftMm', 'rightMm'] as const).map((side) => {
                const labels: Record<string, string> = {
                  topMm: 'Сверху (Top)',
                  bottomMm: 'Снизу (Bottom)',
                  leftMm: 'Слева (Left)',
                  rightMm: 'Справа (Right)',
                };
                const val = config.frameExtensions[side];
                return (
                  <div key={side} className="p-2 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
                    <span className="text-neutral-400 block mb-1">{labels[side]}</span>
                    <select
                      value={val}
                      onChange={(e) => setFrameExtension(side, parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="0">Без добора (0 мм)</option>
                      <option value="40">+40 мм</option>
                      <option value="60">+60 мм</option>
                      <option value="100">+100 мм</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* 8. Ручки и фурнитура */}
      <AccordionItem
        id="hardware"
        title="Ручки и фурнитура"
        icon={<Sliders className="w-4 h-4 text-cyan-400" />}
        badge={WINDOW_HANDLES.find((h) => h.id === config.handle.modelId)?.name.split(' ')[1]}
        isOpen={openSections.hardware}
        onToggle={() => toggleSection('hardware')}
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-neutral-400 flex items-center gap-1">
            <span>Дизайнерские и противовзломные ручки</span>
            <Tooltip content="Модель оконной ручки. Может отличаться дизайном, наличием замка и дополнительной защитой SecuForte.">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help inline" />
            </Tooltip>
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {WINDOW_HANDLES.map((handle) => (
              <VisualCard
                key={handle.id}
                title={handle.name}
                description={handle.description}
                imageSrc={handle.imagePath}
                isSelected={handle.id === config.handle.modelId}
                onClick={() => setHandleModel(handle.id)}
                aspectRatio="square"
              />
            ))}
          </div>

          {/* Цвет ручки */}
          <div>
            <span className="text-xs font-semibold text-neutral-300 block mb-2">Металл ручки</span>
            <div className="grid grid-cols-2 gap-2">
              {HANDLE_COLORS.map((hc) => (
                <button
                  key={hc.id}
                  type="button"
                  onClick={() => setHandleColor(hc.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                    config.handle.colorId === hc.id
                      ? 'bg-neutral-850 border-cyan-500 ring-1 ring-cyan-500/50'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: hc.hex }}
                  />
                  <div className="truncate">
                    <span className="text-xs font-medium text-white block truncate">{hc.name}</span>
                    <span className="text-[10px] text-neutral-400">{hc.finish}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* 9. Дополнительные опции */}
      <AccordionItem
        id="options"
        title="Дополнительные опции"
        icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
        isOpen={openSections.options}
        onToggle={() => toggleSection('options')}
      >
        <div className="space-y-3 pt-2">
          {/* Декоративные раскладки */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <Switch
              checked={config.options.glazingBars}
              onCheckedChange={() => toggleOption('glazingBars')}
              label="Декоративные раскладки (шпроссы)"
              description="Внутренние или накладные архитектурные переплеты, делящие стекло на части."
            />
          </div>

          {/* Сигнализация (магнитный контакт) */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <Switch
              checked={config.options.alarmContacts}
              onCheckedChange={() => toggleOption('alarmContacts')}
              label="Магнитные герконы (Умный дом)"
              description="Скрытые датчики сигнализации, встроенные в фальц рамы."
            />
          </div>

          {/* Монтажные отверстия */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <Switch
              checked={config.options.preDrilledHoles}
              onCheckedChange={() => toggleOption('preDrilledHoles')}
              label="Заводские монтажные отверстия"
              description="Прецизионные подготовленные отверстия в раме для чистого крепления."
            />
          </div>
        </div>
      </AccordionItem>

      {/* 10. Монтаж и пожелания */}
      <AccordionItem
        id="install"
        title="Монтаж и комментарий"
        icon={<Wrench className="w-4 h-4 text-cyan-400" />}
        badge={config.options.installation ? 'С монтажом' : 'Без монтажа'}
        isOpen={openSections.install}
        onToggle={() => toggleSection('install')}
      >
        <div className="space-y-3.5 pt-2">
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl">
            <Switch
              checked={config.options.installation}
              onCheckedChange={() => toggleOption('installation')}
              label="Монтаж силами компании"
              description="Профессиональная установка сертифицированными мастерами с гарантией 5 лет."
            />
          </div>

          <div>
            <label className="text-xs text-neutral-300 font-semibold block mb-1.5 flex items-center gap-1.5">
              <span>Комментарий к заказу</span>
              <Tooltip content="Дополнительные пожелания клиента по заказу, проемам или доставке.">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-500 cursor-help" />
              </Tooltip>
            </label>
            <textarea
              rows={3}
              value={config.customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Укажите этаж, особенности проемов, пожелания по доставке..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </AccordionItem>
    </div>
  );
};