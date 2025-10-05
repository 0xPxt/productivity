// SVG Dimensions
export const COFFEE_CUP = {
  SVG_WIDTH: 300,
  SVG_HEIGHT: 300,
  CUP_HEIGHT: 70,
  CUP_Y_BASE: 200,
  CUP_Y_TOP: 130,
} as const;

// Colors
export const COLORS = {
  STROKE: '#C8BFB5',
  COFFEE: '#6B4423',
  COFFEE_SHIMMER: '#8B5A3C',
  STEAM: '#9A9085',
  ICON_STROKE: '#9A9085',
  ICON_FILL: '#403A34',
} as const;

// Animation
export const ANIMATION = {
  STEAM_THRESHOLD: 10, // Show steam when coffee fill > 10%
  STEAM_DELAYS: ['0s', '0.3s', '0.6s'],
  FILL_DURATION: 'duration-1000',
  ICON_HOVER_DURATION: 'duration-500',
} as const;

// Button Styles
export const BUTTON_BASE_CLASSES =
  'px-6 py-2 bg-highlight text-foreground border border-border rounded hover:bg-border transition-colors cursor-pointer min-w-24 flex items-center justify-center';

export const BUTTON_DISABLED_CLASSES =
  'disabled:opacity-30 disabled:cursor-not-allowed';

// Icon Paths
export const ICON_PATHS = {
  play: 'M5 3l14 9-14 9V3z',
  pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z',
  reset: 'M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  settings: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
} as const;
