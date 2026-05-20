import type { CSSProperties } from "react";

export const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
export const displayText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "normal", wordBreak: "normal" };
export const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(8,13,28,0.82)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14, ...safeText };
export const title: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.18, letterSpacing: 0, margin: 0, ...displayText };
export const body: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.48, margin: 0, ...safeText };
export const small: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.4, ...safeText };
export const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, lineHeight: 1.2, textTransform: "uppercase", ...safeText };
export const chip: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.09)", borderRadius: 8, color: "#ccfbf1", display: "inline-flex", fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "6px 8px", width: "fit-content", ...safeText };
export const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", minWidth: 0 };
export const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.42)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10, ...safeText };
export const codeLine: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "#020617", borderRadius: 8, color: "#dbeafe", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, overflowX: "auto", padding: 8, whiteSpace: "pre-wrap", ...safeText };
export const linkButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", width: "fit-content", ...safeText };

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={row}>
      <span style={small}>{label}</span>
      <strong style={{ color: "#f8fafc", fontSize: 16, ...safeText }}>{value}</strong>
    </div>
  );
}
