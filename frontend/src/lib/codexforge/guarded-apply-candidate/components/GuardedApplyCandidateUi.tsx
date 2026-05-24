"use client";

import type { CSSProperties, ReactNode } from "react";

export function GuardedApplyCandidateCard({
  title,
  badge,
  children,
  marker,
}: {
  title: string;
  badge?: string;
  children: ReactNode;
  marker: string;
}) {
  return (
    <section style={card} data-codexforge-guarded-apply-candidate-card={marker}>
      <div style={cardHeader}>
        <h2 style={cardTitle}>{title}</h2>
        {badge ? <span style={badgeStyle}>{badge}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function GuardedApplyCandidateList({ items }: { items: readonly string[] }) {
  return (
    <ul style={list}>
      {items.map((item) => (
        <li key={`guarded-apply-candidate-item-${item}`} style={listItem}>{item}</li>
      ))}
    </ul>
  );
}

export function GuardedApplyCandidateCopyButton({
  label,
  value,
  primary = false,
}: {
  label: string;
  value: string;
  primary?: boolean;
}) {
  function copyText() {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
  }

  return (
    <button type="button" style={primary ? primaryButton : secondaryButton} onClick={copyText}>
      {label}
    </button>
  );
}

export const card: CSSProperties = {
  background: "rgba(15, 23, 42, 0.72)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 14,
};
export const cardHeader: CSSProperties = { alignItems: "center", display: "flex", gap: 10, justifyContent: "space-between", minWidth: 0 };
export const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 16, fontWeight: 900, letterSpacing: 0, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
export const badgeStyle: CSSProperties = { border: "1px solid rgba(94,234,212,0.24)", borderRadius: 999, color: "#99f6e4", flex: "0 0 auto", fontSize: 11, fontWeight: 900, padding: "4px 7px" };
export const muted: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
export const list: CSSProperties = { display: "grid", gap: 7, listStyle: "none", margin: 0, padding: 0 };
export const listItem: CSSProperties = { borderLeft: "2px solid rgba(94,234,212,0.34)", color: "#e2e8f0", fontSize: 12, lineHeight: 1.45, paddingLeft: 9 };
export const primaryButton: CSSProperties = { background: "#5eead4", border: 0, borderRadius: 8, color: "#042f2e", cursor: "pointer", fontSize: 13, fontWeight: 900, padding: "10px 12px" };
export const secondaryButton: CSSProperties = { background: "rgba(15,23,42,0.8)", border: "1px solid rgba(125,211,252,0.24)", borderRadius: 8, color: "#dbeafe", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 10px" };
