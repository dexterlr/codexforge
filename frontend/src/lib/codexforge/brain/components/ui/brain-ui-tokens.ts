import type { CSSProperties } from "react";

export type BrainTone = {
  label: string;
  border: string;
  background: string;
  color: string;
  accent: string;
};

export const BRAIN_UI_TOKENS = {
  radius: {
    panel: 8,
    control: 8,
    pill: 999,
  },
  color: {
    shell:
      "radial-gradient(circle at 24% 0%, rgba(14,165,233,0.20), transparent 34%), linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.92))",
    panel: "rgba(15,23,42,0.82)",
    panelStrong: "rgba(15,23,42,0.92)",
    panelSoft: "rgba(255,255,255,0.045)",
    border: "rgba(125,211,252,0.22)",
    borderSoft: "rgba(255,255,255,0.10)",
    text: "rgba(241,245,249,0.96)",
    textMuted: "rgba(226,232,240,0.74)",
    textSubtle: "rgba(148,163,184,0.88)",
    cyan: "rgba(125,211,252,0.92)",
    green: "rgba(220,252,231,0.94)",
    amber: "rgba(254,243,199,0.94)",
    red: "rgba(254,226,226,0.94)",
  },
  shadow: {
    shell: "0 22px 80px rgba(2,6,23,0.34)",
    panel: "0 18px 60px rgba(2,6,23,0.22)",
  },
  spacing: {
    compact: 10,
    comfortable: 14,
    dense: 8,
  },
} as const;

export const BRAIN_PANEL_SURFACE_STYLES = {
  shell: {
    display: "grid",
    gap: 14,
    padding: 16,
    borderRadius: BRAIN_UI_TOKENS.radius.panel,
    border: `1px solid ${BRAIN_UI_TOKENS.color.border}`,
    background: BRAIN_UI_TOKENS.color.shell,
    color: BRAIN_UI_TOKENS.color.text,
    boxShadow: BRAIN_UI_TOKENS.shadow.shell,
    minWidth: 0,
  } satisfies CSSProperties,
  panel: {
    display: "grid",
    gap: 14,
    padding: 16,
    borderRadius: BRAIN_UI_TOKENS.radius.panel,
    border: `1px solid ${BRAIN_UI_TOKENS.color.border}`,
    background:
      "radial-gradient(circle at 18% 0%, rgba(14,165,233,0.16), transparent 34%), rgba(15,23,42,0.84)",
    boxShadow: BRAIN_UI_TOKENS.shadow.panel,
    minWidth: 0,
  } satisfies CSSProperties,
  panelSubtle: {
    display: "grid",
    gap: 10,
    padding: 12,
    borderRadius: BRAIN_UI_TOKENS.radius.panel,
    border: `1px solid ${BRAIN_UI_TOKENS.color.borderSoft}`,
    background: BRAIN_UI_TOKENS.color.panelSoft,
    minWidth: 0,
  } satisfies CSSProperties,
  callout: {
    padding: 11,
    borderRadius: BRAIN_UI_TOKENS.radius.control,
    border: "1px solid rgba(34,197,94,0.18)",
    background: "rgba(34,197,94,0.08)",
    color: BRAIN_UI_TOKENS.color.green,
    fontSize: 12,
    lineHeight: 1.5,
  } satisfies CSSProperties,
} as const;

export const BRAIN_PANEL_TEXT_STYLES = {
  eyebrow: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 0,
    textTransform: "uppercase",
    color: "rgba(186,230,253,0.86)",
  } satisfies CSSProperties,
  title: {
    margin: "4px 0 0",
    fontSize: 18,
    lineHeight: 1.2,
  } satisfies CSSProperties,
  copy: {
    margin: 0,
    color: BRAIN_UI_TOKENS.color.textMuted,
    fontSize: 12,
    lineHeight: 1.5,
  } satisfies CSSProperties,
  mono: {
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  } satisfies CSSProperties,
} as const;

export const BRAIN_PANEL_BADGE_STYLES = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: BRAIN_UI_TOKENS.radius.pill,
    padding: "3px 8px",
    fontSize: 10,
    fontWeight: 900,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  readOnly: {
    border: "1px solid rgba(34,197,94,0.20)",
    background: "rgba(34,197,94,0.10)",
    color: BRAIN_UI_TOKENS.color.green,
  } satisfies CSSProperties,
  keyboard: {
    border: "1px solid rgba(125,211,252,0.22)",
    background: "rgba(14,165,233,0.10)",
    color: "rgba(224,242,254,0.94)",
  } satisfies CSSProperties,
} as const;

const SEVERITY_TONES: Record<string, BrainTone> = {
  critical: {
    label: "critical",
    border: "rgba(248,113,113,0.36)",
    background: "rgba(239,68,68,0.12)",
    color: BRAIN_UI_TOKENS.color.red,
    accent: "rgba(248,113,113,0.95)",
  },
  high: {
    label: "high",
    border: "rgba(251,191,36,0.32)",
    background: "rgba(251,191,36,0.10)",
    color: BRAIN_UI_TOKENS.color.amber,
    accent: "rgba(251,191,36,0.95)",
  },
  medium: {
    label: "medium",
    border: "rgba(125,211,252,0.30)",
    background: "rgba(14,165,233,0.10)",
    color: "rgba(224,242,254,0.94)",
    accent: "rgba(125,211,252,0.95)",
  },
  low: {
    label: "low",
    border: "rgba(148,163,184,0.24)",
    background: "rgba(148,163,184,0.08)",
    color: "rgba(226,232,240,0.82)",
    accent: "rgba(148,163,184,0.95)",
  },
};

const STATUS_TONES: Record<string, BrainTone> = {
  ready: {
    label: "ready",
    border: "rgba(34,197,94,0.24)",
    background: "rgba(34,197,94,0.10)",
    color: BRAIN_UI_TOKENS.color.green,
    accent: "rgba(34,197,94,0.95)",
  },
  active: {
    label: "active",
    border: "rgba(125,211,252,0.32)",
    background: "rgba(14,165,233,0.12)",
    color: "rgba(224,242,254,0.96)",
    accent: "rgba(125,211,252,0.95)",
  },
  "read-only": {
    label: "read-only",
    border: "rgba(34,197,94,0.22)",
    background: "rgba(34,197,94,0.10)",
    color: BRAIN_UI_TOKENS.color.green,
    accent: "rgba(34,197,94,0.95)",
  },
  warming: {
    label: "warming",
    border: "rgba(251,191,36,0.28)",
    background: "rgba(251,191,36,0.10)",
    color: BRAIN_UI_TOKENS.color.amber,
    accent: "rgba(251,191,36,0.95)",
  },
  blocked: {
    label: "blocked",
    border: "rgba(248,113,113,0.34)",
    background: "rgba(239,68,68,0.12)",
    color: BRAIN_UI_TOKENS.color.red,
    accent: "rgba(248,113,113,0.95)",
  },
  unavailable: {
    label: "unavailable",
    border: "rgba(148,163,184,0.24)",
    background: "rgba(148,163,184,0.08)",
    color: "rgba(226,232,240,0.72)",
    accent: "rgba(148,163,184,0.86)",
  },
};

export function getBrainSeverityTone(severity?: string | null): BrainTone {
  const key = severity?.toLowerCase() ?? "";
  return SEVERITY_TONES[key] ?? SEVERITY_TONES.low;
}

export function getBrainStatusTone(status?: string | null): BrainTone {
  const key = status?.toLowerCase() ?? "";
  return STATUS_TONES[key] ?? STATUS_TONES.active;
}
