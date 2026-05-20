import type { CSSProperties, ReactNode } from "react";
import { buildUnrealAdapterReactKey } from "../index";

export function UnrealPanel({
  marker,
  title,
  children,
}: {
  marker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={panel} data-unreal-panel={marker}>
      <div style={header}>
        <span style={eyebrow}>{marker}</span>
        <h2 style={titleStyle}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function UnrealMetric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function UnrealList({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <strong style={smallTitle}>{title}</strong>
      <ul style={list}>
        {items.map((item, index) => (
          <li key={buildUnrealAdapterReactKey(title, item, index)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.18)",
  background: "rgba(15,23,42,0.72)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
  minWidth: 0,
  maxWidth: "100%",
};
export const header: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
export const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
export const titleStyle: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "normal", wordBreak: "normal" };
export const lede: CSSProperties = { margin: 0, color: "#dbeafe", lineHeight: 1.55, overflowWrap: "anywhere" };
export const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
export const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, overflowWrap: "anywhere" };
export const smallTitle: CSSProperties = { color: "#e2e8f0", fontSize: 12, textTransform: "uppercase" };
export const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5, overflowWrap: "anywhere" };
export const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#a7f3d0", fontSize: 11, fontWeight: 800, textTransform: "uppercase" };
export const button: CSSProperties = { border: "1px solid rgba(94,234,212,0.32)", background: "rgba(20,184,166,0.16)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
export const code: CSSProperties = { margin: 0, maxHeight: 420, overflowX: "auto", overflowY: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word", maxWidth: "100%", minWidth: 0, border: "1px solid rgba(148,163,184,0.18)", background: "#020617", borderRadius: 8, padding: 12, color: "#dbeafe", fontSize: 12, lineHeight: 1.45 };
