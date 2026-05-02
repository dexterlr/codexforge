import type { CSSProperties } from "react";

export const codexforgeTheme = {
  color: {
    pageBg:
      "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 60%)," +
      "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.16), transparent 55%)," +
      "radial-gradient(700px 400px at 50% 90%, rgba(236,72,153,0.10), transparent 55%)," +
      "linear-gradient(180deg, #070A12 0%, #050710 100%)",
    panelBg: "rgba(255,255,255,0.04)",
    panelBgSoft: "rgba(255,255,255,0.03)",
    panelBgStrong: "rgba(255,255,255,0.06)",
    panelDark: "rgba(0,0,0,0.18)",
    border: "rgba(255,255,255,0.12)",
    borderSoft: "rgba(255,255,255,0.10)",
    borderStrong: "rgba(255,255,255,0.18)",
    text: "white",
    textSoft: "rgba(255,255,255,0.92)",
    textMuted: "rgba(255,255,255,0.82)",
    textDim: "rgba(255,255,255,0.72)",
    primaryStart: "rgba(99,102,241,1)",
    primaryEnd: "rgba(16,185,129,1)",
    dangerBg: "rgba(239,68,68,0.12)",
    dangerBorder: "rgba(239,68,68,0.35)",
    success: "rgba(16,185,129,0.95)",
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    pill: 999,
  },
  shadow: {
    hero: "0 30px 100px rgba(0,0,0,0.45)",
    glow: "0 18px 60px rgba(99,102,241,0.16)",
    logo: "0 10px 30px rgba(99,102,241,0.18)",
  },
  font: {
    sans:
      'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    mono:
      'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
} as const;

export function appPageStyle(): CSSProperties {
  return {
    minHeight: "100vh",
    padding: "clamp(16px, 4vw, 40px)",
    color: codexforgeTheme.color.text,
    background: codexforgeTheme.color.pageBg,
    fontFamily: codexforgeTheme.font.sans,
  };
}

export function appShellStyle(maxWidth = 1160): CSSProperties {
  return {
    width: "100%",
    maxWidth,
    margin: "0 auto",
    display: "grid",
    gap: 18,
  };
}

export function glassPanelStyle(
  overrides?: CSSProperties
): CSSProperties {
  return {
    borderRadius: codexforgeTheme.radius.lg,
    border: `1px solid ${codexforgeTheme.color.border}`,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    boxShadow: codexforgeTheme.shadow.hero,
    ...overrides,
  };
}

export function subtlePanelStyle(
  overrides?: CSSProperties
): CSSProperties {
  return {
    borderRadius: codexforgeTheme.radius.lg,
    border: `1px solid ${codexforgeTheme.color.borderSoft}`,
    background: codexforgeTheme.color.panelBg,
    ...overrides,
  };
}

export function darkPanelStyle(
  overrides?: CSSProperties
): CSSProperties {
  return {
    borderRadius: codexforgeTheme.radius.md,
    border: `1px solid ${codexforgeTheme.color.borderSoft}`,
    background: codexforgeTheme.color.panelDark,
    ...overrides,
  };
}

export function pillButtonStyle(
  variant: "primary" | "ghost" | "danger" = "ghost",
  overrides?: CSSProperties
): CSSProperties {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: codexforgeTheme.radius.md,
    border: `1px solid ${codexforgeTheme.color.borderStrong}`,
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 14,
    userSelect: "none",
    cursor: "pointer",
    color: codexforgeTheme.color.text,
  };

  if (variant === "primary") {
    return {
      ...base,
      background: `linear-gradient(135deg, ${codexforgeTheme.color.primaryStart} 0%, ${codexforgeTheme.color.primaryEnd} 100%)`,
      boxShadow: codexforgeTheme.shadow.glow,
      ...overrides,
    };
  }

  if (variant === "danger") {
    return {
      ...base,
      background: codexforgeTheme.color.dangerBg,
      border: `1px solid ${codexforgeTheme.color.dangerBorder}`,
      ...overrides,
    };
  }

  return {
    ...base,
    background: codexforgeTheme.color.panelBgStrong,
    ...overrides,
  };
}

export const uiText = {
  eyebrow: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    opacity: 0.72,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 900,
    opacity: 0.88,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 900,
  },
  body: {
    fontSize: 13,
    lineHeight: 1.55,
    opacity: 0.84,
  },
  bodyStrong: {
    fontSize: 16,
    lineHeight: 1.65,
    opacity: 0.92,
  },
  muted: {
    fontSize: 12,
    opacity: 0.72,
  },
} as const;