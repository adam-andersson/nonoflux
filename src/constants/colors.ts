export const Palette = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
} as const;

export const Colors = {
  // light: {
  surface: Palette.slate[50],
  active: Palette.slate[700],
  clue: Palette.slate[300],
  border: Palette.slate[400],
  borderThick: Palette.slate[900],
  // },
  // dark: {
  //   background: Palette.slate[950],
  //   surface: Palette.slate[900],
  //   borderThick: Palette.slate[300],
  // },
} as const;
