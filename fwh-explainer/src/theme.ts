// Shared streetwear design tokens
export const SW = {
  // Backgrounds
  bgPure: '#000000',
  bgCard: '#0d0d0d',
  bgCardRed: '#0f0000',
  bgCardGreen: '#000f00',

  // Brand colors
  gold: '#C9A84C',
  goldGlow: 'rgba(201,168,76,0.5)',
  red: '#E8334A',
  redGlow: 'rgba(232,51,74,0.5)',
  green: '#00C853',

  // Typography — Impact for max streetwear energy
  fontDisplay: '"Impact", "Arial Black", "Franklin Gothic Heavy", sans-serif',
  fontBody: '"Arial Black", "Impact", sans-serif',

  // Borders
  borderGold: '2px solid rgba(201,168,76,0.6)',
  borderRed: '2px solid rgba(232,51,74,0.5)',
  borderGreen: '2px solid rgba(0,200,83,0.35)',

  // Grain overlay — pure CSS noise, no soft gradients
  grain: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
} as const;
