import type { CSSProperties } from "react";

export const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.78)",
  borderRadius: 8,
  boxShadow: "0 18px 70px rgba(0,0,0,0.28)",
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 16,
  ...safeText,
};

export const grid: CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  minWidth: 0,
};

export const item: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  display: "grid",
  gap: 7,
  minWidth: 0,
  padding: 12,
  ...safeText,
};

export const title: CSSProperties = {
  color: "#f8fafc",
  fontSize: 18,
  lineHeight: 1.18,
  margin: 0,
};

export const muted: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  ...safeText,
};

export const small: CSSProperties = {
  color: "#94a3b8",
  fontSize: 12,
  lineHeight: 1.4,
  ...safeText,
};

export const pill: CSSProperties = {
  alignSelf: "start",
  border: "1px solid rgba(45,212,191,0.24)",
  borderRadius: 999,
  color: "#99f6e4",
  display: "inline-flex",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1,
  padding: "6px 9px",
  textTransform: "uppercase",
};

export const button: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.35)",
  background: "rgba(20,184,166,0.13)",
  borderRadius: 8,
  color: "#f8fafc",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
  lineHeight: 1.2,
  padding: "10px 12px",
  ...safeText,
};

export function toneColor(tone: string): string {
  if (tone === "ready" || tone === "primary") return "#86efac";
  if (tone === "blocked" || tone === "high") return "#fca5a5";
  if (tone === "warning" || tone === "medium" || tone === "needs-review") return "#fde68a";
  return "#c4b5fd";
}
