/**
 * one-flows — Field DS token bridge
 *
 * Replaces the per-file `const T = { color: { text: { … } } }` JS objects
 * that were pasted across every screen with raw hex values. Each value
 * here resolves to a Field DS CSS variable from `@tokens/tokens.css` so
 * SVG `stroke=` / `fill=` props and inline `style.color` use the
 * canonical design system at runtime.
 *
 * For the small set of one-flows-specific accents that don't yet have a
 * Field DS counterpart (avatar identity hues, transit map shades, plan
 * tier accents) we keep raw hex pending design alignment. These are the
 * audit's remaining "raw values" and are listed below for visibility.
 */
export const T = {
  color: {
    text: {
      primary:       'var(--color-text-primary)',     // Field DS grey-900 (was #0e0e0e — slight shift)
      deep:          'var(--grey-1000)',
      heading:       'var(--color-text-primary)',     // grey-900
      strong:        'var(--grey-800)',
      body:          'var(--color-text-secondary)',   // grey-700
      muted:         'var(--color-text-tertiary)',    // grey-600
      subtle:        'var(--color-text-muted)',       // grey-500
      // Off-spec — kept raw pending DS extension.
      highEmphasis:  'rgba(2,6,12,0.92)',
      secondary:     'rgba(2,6,12,0.6)',
      row:           '#262626',
    },
    surface: {
      canvas:    'var(--color-surface-primary)',
      page:      'var(--color-surface-secondary)',
      subtle:    'var(--color-surface-secondary)',
      scrim:     'var(--color-surface-tertiary)',     // was #f3f3f5 → grey-200
      scrim50:   'var(--grey-50)',
      // Off-spec — map UI specific.
      mapBg:     '#e8eef6',
      mapRoad:   'var(--color-surface-primary)',
    },
    border: {
      divider:  'var(--color-border-primary)',
      subtle:   'var(--color-border-subtle)',
      hairline: 'var(--color-border-subtle)',         // was #f5f5f5 → grey-200
      muted:    'var(--color-border-medium)',
      strong:   'var(--color-border-medium)',
    },
    brand: {
      green:        'var(--green-700)',               // was #108757 → DS #0f8857 (slight shift)
      greenSoft:    'var(--green-100)',
      greenSurface: 'var(--green-50)',
      blue:         'var(--brand-blue-700)',          // was #3866DF — kept as DS blue
      blueDeep:     'var(--brand-blue-700)',
      blueMid:      'var(--brand-blue-600)',
      blueSoft:     'var(--brand-blue-100)',
      blueScrim:    'var(--brand-blue-50)',
      // Off-spec — order tracking palette.
      transit:      '#1d4ed8',
      transitDot:   '#3b82f6',
      transitSoft:  '#e8efff',
      grass500:     '#5a9674',
    },
    accent: {
      info:        'var(--brand-blue-600)',
      infoDeep:    'var(--brand-blue-700)',
      yellow:      'var(--noon-400)',                 // was #FFE600 → DS #feee00
      yellowSoft:  'var(--noon-200)',                 // was #FFF6BF → close
      // Off-spec — plan tier identity.
      duo:         '#3D5BFF',
      duoSoft:     '#EEF1FF',
      family:      '#7B47E0',
      familySoft:  '#F4EEFF',
      orange:      'var(--orange-700)',               // was #f36302 → DS #e5641a (slight shift)
      orangeLight: 'var(--orange-300)',
    },
    avatar: {
      // Off-spec — identity zone.
      a: '#3D5BFF',
      b: '#FF6FA3',
      c: '#7B47E0',
    },
    status: {
      transit:   { fg: '#1d4ed8',                  bg: '#e8efff',                     dot: '#3b82f6' },
      preparing: { fg: 'var(--orange-800)',        bg: 'var(--orange-100)',           dot: 'var(--orange-600)' },
      delivered: { fg: 'var(--green-700)',         bg: 'var(--green-100)',            dot: 'var(--green-700)' },
      cancelled: { fg: 'var(--red-800)',           bg: 'var(--red-100)',              dot: 'var(--red-700)' },
      returned:  { fg: 'var(--color-text-secondary)', bg: 'var(--color-surface-tertiary)', dot: 'var(--color-text-tertiary)' },
    },
    danger:     'var(--color-text-error)',           // unifies #f43333 / #de1c1c / #c43a3a
    dangerSoft: 'var(--red-100)',
    verified:   'var(--green-700)',
  },
} as const;

export type DSTokens = typeof T;
