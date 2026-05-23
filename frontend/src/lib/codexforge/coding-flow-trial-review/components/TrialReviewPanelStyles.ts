import type { CSSProperties } from "react";

export const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
export const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
export const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", minWidth: 0 };
export const itemBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 12 };
export const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
export const itemTitle: CSSProperties = { fontSize: 14, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
export const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
export const meta: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 800 };
export const buttonRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
export const secondaryButton: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.22)", borderRadius: 8, color: "#dbeafe", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px" };
