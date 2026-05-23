"use client";

import type { CSSProperties } from "react";
import type { LiveTrialChecklist } from "../coding-flow-live-trial-types";

export function LiveTrialChecklistPanel({ checklist }: { checklist: LiveTrialChecklist }) {
  return (
    <section style={panel} data-codexforge-live-trial-checklist-panel="LiveTrialChecklistPanel renders Pick a safe file Preview the patch Prepare validation Capture result">
      <h2 style={title}>{checklist.title}</h2>
      <div style={grid}>
        {checklist.items.map((item) => (
          <article key={`live-trial-checklist-${item.itemId}`} style={itemBox}>
            <span style={section}>{item.section}</span>
            <h3 style={itemTitle}>{item.label}</h3>
            <p style={copy}>{item.instruction}</p>
            <span style={meta}>{item.route} | {item.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const title: CSSProperties = { fontSize: 20, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", minWidth: 0 };
const itemBox: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 14 };
const section: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const itemTitle: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const meta: CSSProperties = { color: "#93c5fd", fontSize: 12, fontWeight: 800 };
