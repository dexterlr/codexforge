"use client";

import type { CSSProperties } from "react";
import type { PatchPreviewQueueReadinessItem } from "../patch-preview-queue-types";

export function PatchPreviewQueueReadinessPanel({ readiness }: { readiness: PatchPreviewQueueReadinessItem }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-queue-readiness-panel="PatchPreviewQueueReadinessPanel renders readiness includes current file verification readiness includes suggested tests readiness includes rollback note"
    >
      <div style={header}>
        <h3 style={title}>Readiness</h3>
        <span style={badge}>{readiness.status}</span>
      </div>
      <div style={checks}>
        {readiness.checks.map((check) => (
          <div key={check.id} style={checkRow}>
            <strong>{check.label}</strong>
            <span>{check.status}</span>
            <small>{check.detail}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 9, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const badge: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, padding: "5px 7px", fontSize: 11, fontWeight: 900, color: "#dbeafe" };
const checks: CSSProperties = { display: "grid", gap: 7 };
const checkRow: CSSProperties = { border: "1px solid rgba(125,211,252,0.12)", borderRadius: 8, padding: 8, display: "grid", gap: 3, fontSize: 12, color: "#e0f2fe", overflowWrap: "anywhere" };
