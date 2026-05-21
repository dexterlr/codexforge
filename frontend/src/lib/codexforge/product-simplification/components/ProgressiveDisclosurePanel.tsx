"use client";

import type { CSSProperties } from "react";
import type { ProgressiveDisclosure } from "../product-simplification-types";
import { SimplifiedSafetyBadge } from "./SimplifiedSafetyBadge";

export function ProgressiveDisclosurePanel({ disclosure }: { disclosure: ProgressiveDisclosure }) {
  return (
    <section style={panel} data-codexforge-progressive-disclosure-panel="ProgressiveDisclosurePanel renders Essentials Advanced details raw JSON hidden by default collapsible visually secondary">
      <h2 style={title}>Essentials</h2>
      <ul style={list}>
        {disclosure.essentials.map((item) => (
          <li key={`essential-${disclosure.route}-${item}`} style={itemStyle}>{item}</li>
        ))}
      </ul>
      <div style={badgeRow}>
        {disclosure.safetyBadges.map((badge) => (
          <SimplifiedSafetyBadge key={`disclosure-${disclosure.route}-${badge}`} label={badge} />
        ))}
      </div>
      {disclosure.sections.map((section) => (
        <details key={section.id} style={details} open={section.defaultOpen}>
          <summary style={summary}>{section.title}</summary>
          <p style={copy}>{section.summary}</p>
          <ul style={list}>
            {section.items.map((entry) => (
              <li key={`${section.id}-${entry}`} style={itemStyle}>{entry}</li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.34)", borderRadius: 8, display: "grid", gap: 10, padding: 14 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0 };
const list: CSSProperties = { display: "grid", gap: 6, margin: 0, paddingLeft: 18 };
const itemStyle: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45 };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const details: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.12)", paddingTop: 10 };
const summary: CSSProperties = { color: "#bfdbfe", cursor: "pointer", fontSize: 12, fontWeight: 900 };
const copy: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: "8px 0" };
