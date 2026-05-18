"use client";

import type { CSSProperties, ReactNode } from "react";

export function GlobalActivityPanel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section style={panel} data-codexforge-global-activity-panel="GlobalActivityPanel renders">
      <div style={heading}>
        <h2 style={titleStyle}>{title}</h2>
        {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.64)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const titleStyle: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 17, letterSpacing: 0, overflowWrap: "anywhere" };
const subtitleStyle: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
