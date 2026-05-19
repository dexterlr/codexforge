import type { CSSProperties } from "react";

export const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "linear-gradient(145deg, rgba(8,18,34,0.94), rgba(3,7,18,0.78))",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
  ...safeText,
};

export const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 10,
  minWidth: 0,
};

export const item: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.54)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 7,
  ...safeText,
};

export const title: CSSProperties = { margin: 0, fontSize: 18, lineHeight: 1.2, ...safeText };
export const muted: CSSProperties = { color: "#a7b7ca", fontSize: 13, lineHeight: 1.5, ...safeText };
export const small: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
export const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", background: "rgba(14,165,233,0.12)", borderRadius: 999, color: "#e0f2fe", display: "inline-flex", fontSize: 11, fontWeight: 850, padding: "5px 8px", width: "fit-content", maxWidth: "100%", ...safeText };
export const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 850, padding: "9px 11px", ...safeText };

export function toneColor(value: string): string {
  if (value === "excellent" || value === "good" || value === "covered" || value === "functional") return "#86efac";
  if (value === "blocked" || value === "missing" || value === "high") return "#fca5a5";
  if (value === "needs-work" || value === "partial" || value === "preview-only" || value === "medium") return "#fde68a";
  return "#cbd5e1";
}
