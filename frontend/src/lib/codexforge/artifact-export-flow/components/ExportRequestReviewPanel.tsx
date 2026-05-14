"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactExportFlowReactKey,
  summarizeExportRequestReview,
  type ExportRequestReview,
} from "@/lib/codexforge/artifact-export-flow";

export function ExportRequestReviewPanel({ review }: { review: ExportRequestReview }) {
  return (
    <section style={panel} data-codexforge-export-request-review-panel="ExportRequestReviewPanel renders">
      <div style={header}>
        <span style={eyebrow}>Review requests</span>
        <strong style={badge}>{review.items.length} artifact file(s)</strong>
      </div>
      <ul style={summaryList}>
        {summarizeExportRequestReview(review).map((line, index) => (
          <li key={buildArtifactExportFlowReactKey("review-summary", line, index)}>{line}</li>
        ))}
      </ul>
      <div style={requestGrid}>
        {review.items.map((item, index) => (
          <article key={buildArtifactExportFlowReactKey("review-item", item.artifactId, index)} style={requestCard}>
            <div style={row}>
              <strong style={itemTitle}>{item.title}</strong>
              <span style={riskBadge}>{item.riskGroup}</span>
            </div>
            <code style={pathText}>{item.targetRelativePath}</code>
            <div style={metaGrid}>
              <span>extension: {item.extension}</span>
              <span>content: {item.contentSizeBytes} bytes</span>
              <span>source: {item.sourceSurface}</span>
              <span>overwrite: {item.overwrite ? "true" : "false"}</span>
              <span>approved: {item.approved ? "true" : "false"}</span>
              <span>path: {item.pathSafetyState}</span>
            </div>
            {item.validationWarnings.length > 0 ? (
              <ul style={warningList}>
                {item.validationWarnings.map((warning) => (
                  <li key={buildArtifactExportFlowReactKey("warning", item.artifactId, warning)}>{warning}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(96,165,250,0.20)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(96,165,250,0.28)", color: "#dbeafe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const summaryList: CSSProperties = { margin: 0, padding: 0, listStyle: "none", color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, display: "grid", gap: 5 };
const requestGrid: CSSProperties = { display: "grid", gap: 10 };
const requestCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 14 };
const riskBadge: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", borderRadius: 7, padding: "4px 7px", color: "#e2e8f0", fontSize: 11, textTransform: "uppercase" };
const pathText: CSSProperties = { color: "#bfdbfe", fontSize: 12, whiteSpace: "normal", overflowWrap: "anywhere" };
const metaGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 6, color: "#cbd5e1", fontSize: 12 };
const warningList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#fde68a", fontSize: 12, lineHeight: 1.4 };
