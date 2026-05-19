import type { CSSProperties } from "react";

export const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "linear-gradient(145deg, rgba(8,18,34,0.92), rgba(3,7,18,0.72))",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
  minWidth: 0,
};

export const title: CSSProperties = { margin: 0, fontSize: 18, lineHeight: 1.2, overflowWrap: "anywhere" };
export const muted: CSSProperties = { color: "#a7b7ca", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
export const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 10, minWidth: 0 };
export const item: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
export const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 999, color: "#e0f2fe", display: "inline-flex", fontSize: 11, fontWeight: 850, padding: "5px 8px", width: "fit-content", maxWidth: "100%", overflowWrap: "anywhere" };
export const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 850, padding: "9px 11px", overflowWrap: "anywhere" };

export function postureColor(posture: string): string {
  if (posture === "healthy" || posture === "pass") return "#86efac";
  if (posture === "blocked" || posture === "blocker") return "#fca5a5";
  if (posture === "risk") return "#fdba74";
  if (posture === "warning" || posture === "needs-review") return "#fde68a";
  return "#cbd5e1";
}
