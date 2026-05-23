import type { CSSProperties } from "react";

export const rhTextGuard: CSSProperties = { minWidth: 0, overflowWrap: "break-word", wordBreak: "normal" };
export const rhPanel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14, ...rhTextGuard };
export const rhTitle: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
export const rhCopy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0, ...rhTextGuard };
export const rhMeta: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 900, lineHeight: 1.3, margin: 0, ...rhTextGuard };
export const rhButton: CSSProperties = { background: "rgba(45,212,191,0.12)", border: "1px solid rgba(45,212,191,0.3)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "8px 10px" };
export const rhLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none", width: "fit-content" };
export const rhList: CSSProperties = { display: "grid", gap: 6, margin: 0, padding: 0 };
export const rhPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", display: "inline-flex", fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "5px 7px", width: "fit-content" };
