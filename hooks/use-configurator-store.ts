import { create } from 'zustand';
import { WindowConfiguration, SashConfig, FrameExtensions } from '../types/configurator';
import { WINDOW_TYPES } from '../data/window-types';

interface ConfiguratorStore {
  configuration: WindowConfiguration;
  isSummaryDrawerOpen: boolean;

  // Actions
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setInstallationHeight: (height: number) => void;
  setWindowType: (typeId: string) => void;
  setSashWidth: (sashIndex: number, width: number) => void;
  setSashOpeningStyle: (sashIndex: number, openingStyleId: string) => void;
  toggleSashFrosted: (sashIndex: number) => void;
  toggleSashInfill: (sashIndex: number) => void;
  setProfile: (profileId: string) => void;
  setOuterFrame: (outerFrameId: string) => void;
  setExteriorColor: (colorId: string) => void;
  setInteriorColor: (colorId: string) => void;
  setGlazing: (glazingId: string) => void;
  setFrameExtension: (side: keyof FrameExtensions, mm: number) => void;
  setHandleModel: (modelId: string) => void;
  setHandleColor: (colorId: string) => void;
  toggleOption: (key: keyof WindowConfiguration['options']) => void;
  setCustomerNotes: (notes: string) => void;
  setSummaryDrawerOpen: (isOpen: boolean) => void;
  resetToDefaults: () => void;
}

const DEFAULT_CONFIG: WindowConfiguration = {
  width: 1800,
  height: 1500,
  installationHeight: 900,
  windowTypeId: '2-sashes',
  profileId: 'schuco-aws-75',
  outerFrameId: 'type-a',
  colors: {
    exteriorId: 'ral-7016',
    interiorId: 'ral-9016-int',
  },
  glazingId: 'triple-thermo-444',
  sashes: [
    {
      id: 'sash-0',
      openingStyleId: 'tilt-turn-left',
      widthMm: 900,
      isFrosted: false,
      isInfill: false,
    },
    {
      id: 'sash-1',
      openingStyleId: 'tilt-turn-right',
      widthMm: 900,
      isFrosted: false,
      isInfill: false,
    },
  ],
  frameExtensions: {
    topMm: 0,
    bottomMm: 0,
    leftMm: 0,
    rightMm: 0,
  },
  handle: {
    modelId: 'hoppe-toulon-secuforte',
    colorId: 'titanium-f9',
  },
  options: {
    warmEdgeSpacer: true,
    glazingBars: false,
    alarmContacts: false,
    installation: true,
    preDrilledHoles: true,
  },
  customerNotes: '',
};

export const useConfiguratorStore = create<ConfiguratorStore>((set) => ({
  configuration: DEFAULT_CONFIG,
  isSummaryDrawerOpen: false,

  setWidth: (width) =>
    set((state) => {
      const clamped = Math.max(400, Math.min(5000, Math.round(width)));
      const count = state.configuration.sashes.length;
      const sashWidth = Math.round(clamped / count);
      return {
        configuration: {
          ...state.configuration,
          width: clamped,
          sashes: state.configuration.sashes.map((s) => ({
            ...s,
            widthMm: sashWidth,
          })),
        },
      };
    }),

  setHeight: (height) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        height: Math.max(400, Math.min(3500, Math.round(height))),
      },
    })),

  setInstallationHeight: (height) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        installationHeight: Math.max(0, Math.min(3000, Math.round(height))),
      },
    })),

  setWindowType: (typeId) =>
    set((state) => {
      const typeDef = WINDOW_TYPES.find((t) => t.id === typeId) || WINDOW_TYPES[1];
      const count = typeDef.sashCount;
      const sashWidth = Math.round(typeDef.defaultWidth / count);

      const newSashes: SashConfig[] = [];
      for (let i = 0; i < count; i++) {
        // Назначаем эргономичные схемы по умолчанию
        let opening = 'tilt-turn-right';
        if (i === 0 && count > 1) opening = 'tilt-turn-left';
        if (count >= 3 && i === 1) opening = 'fix';

        newSashes.push({
          id: `sash-${i}`,
          openingStyleId: opening,
          widthMm: sashWidth,
          isFrosted: false,
          isInfill: false,
        });
      }

      return {
        configuration: {
          ...state.configuration,
          windowTypeId: typeId,
          width: typeDef.defaultWidth,
          height: typeDef.defaultHeight,
          sashes: newSashes,
        },
      };
    }),

  setSashWidth: (sashIndex, width) =>
    set((state) => {
      const newSashes = [...state.configuration.sashes];
      if (newSashes[sashIndex]) {
        newSashes[sashIndex] = {
          ...newSashes[sashIndex],
          widthMm: Math.max(300, Math.min(2500, Math.round(width))),
        };
      }
      return {
        configuration: {
          ...state.configuration,
          sashes: newSashes,
        },
      };
    }),

  setSashOpeningStyle: (sashIndex, openingStyleId) =>
    set((state) => {
      const newSashes = [...state.configuration.sashes];
      if (newSashes[sashIndex]) {
        newSashes[sashIndex] = {
          ...newSashes[sashIndex],
          openingStyleId,
        };
      }
      return {
        configuration: {
          ...state.configuration,
          sashes: newSashes,
        },
      };
    }),

  toggleSashFrosted: (sashIndex) =>
    set((state) => {
      const newSashes = [...state.configuration.sashes];
      if (newSashes[sashIndex]) {
        newSashes[sashIndex] = {
          ...newSashes[sashIndex],
          isFrosted: !newSashes[sashIndex].isFrosted,
        };
      }
      return {
        configuration: {
          ...state.configuration,
          sashes: newSashes,
        },
      };
    }),

  toggleSashInfill: (sashIndex) =>
    set((state) => {
      const newSashes = [...state.configuration.sashes];
      if (newSashes[sashIndex]) {
        newSashes[sashIndex] = {
          ...newSashes[sashIndex],
          isInfill: !newSashes[sashIndex].isInfill,
        };
      }
      return {
        configuration: {
          ...state.configuration,
          sashes: newSashes,
        },
      };
    }),

  setProfile: (profileId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        profileId,
      },
    })),

  setOuterFrame: (outerFrameId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        outerFrameId,
      },
    })),

  setExteriorColor: (colorId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        colors: {
          ...state.configuration.colors,
          exteriorId: colorId,
        },
      },
    })),

  setInteriorColor: (colorId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        colors: {
          ...state.configuration.colors,
          interiorId: colorId,
        },
      },
    })),

  setGlazing: (glazingId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        glazingId,
      },
    })),

  setFrameExtension: (side, mm) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        frameExtensions: {
          ...state.configuration.frameExtensions,
          [side]: Math.max(0, Math.min(200, Math.round(mm))),
        },
      },
    })),

  setHandleModel: (modelId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        handle: {
          ...state.configuration.handle,
          modelId,
        },
      },
    })),

  setHandleColor: (colorId) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        handle: {
          ...state.configuration.handle,
          colorId,
        },
      },
    })),

  toggleOption: (key) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        options: {
          ...state.configuration.options,
          [key]: !state.configuration.options[key],
        },
      },
    })),

  setCustomerNotes: (notes) =>
    set((state) => ({
      configuration: {
        ...state.configuration,
        customerNotes: notes,
      },
    })),

  setSummaryDrawerOpen: (isOpen) =>
    set(() => ({
      isSummaryDrawerOpen: isOpen,
    })),

  resetToDefaults: () =>
    set(() => ({
      configuration: DEFAULT_CONFIG,
    })),
}));