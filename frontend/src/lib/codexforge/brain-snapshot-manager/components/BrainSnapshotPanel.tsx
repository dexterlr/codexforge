import type { CSSProperties, ReactNode } from "react";

const panel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.16)",
  background: "linear-gradient(145deg, rgba(15,23,42,0.86), rgba(2,6,23,0.74))",
  borderRadius: 8,
  padding: 18,
  minWidth: 0,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

const heading: CSSProperties = { margin: 0, fontSize: 18, lineHeight: 1.25 };
const subtitleStyle: CSSProperties = { margin: 0, opacity: 0.72, lineHeight: 1.55, overflowWrap: "anywhere" };

export function BrainSnapshotPanel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section data-codexforge-brain-snapshot-panel="BrainSnapshotPanel renders" style={panel}>
      <div style={{ display: "grid", gap: 6, marginBottom: 14, minWidth: 0 }}>
        <h2 style={heading}>{title}</h2>
        {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export const brainSnapshotGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  gap: 14,
  minWidth: 0,
};

export const brainSnapshotWrapStyle: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};
