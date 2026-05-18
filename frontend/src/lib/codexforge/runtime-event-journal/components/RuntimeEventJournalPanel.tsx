"use client";

import type { CSSProperties, ReactNode } from "react";

export function RuntimeEventJournalPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-journal-panel="RuntimeEventJournalPanel renders read-only no graph mutation"
    >
      <div style={heading}>
        <h2 style={titleStyle}>{title}</h2>
        {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "linear-gradient(145deg, rgba(15,23,42,0.78), rgba(2,6,23,0.58))",
  borderRadius: 8,
  boxShadow: "0 18px 50px rgba(2,6,23,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 14,
};
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const titleStyle: CSSProperties = { color: "#f8fafc", fontSize: 16, lineHeight: 1.2, margin: 0, ...safeText };
const subtitleStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
