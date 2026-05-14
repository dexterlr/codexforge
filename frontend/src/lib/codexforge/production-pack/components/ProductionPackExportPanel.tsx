"use client";

import type { CSSProperties } from "react";
import { buildProductionPackReactKey, type ProductionPack } from "../production-pack-types";
import { summarizeProductionPackExportRequests } from "../production-pack-export";

export function ProductionPackExportPanel({
  pack,
  prepared,
  approved,
  exporting,
  exportStatus,
  onPrepare,
  onApprovalChange,
  onExport,
}: {
  pack: ProductionPack;
  prepared: boolean;
  approved: boolean;
  exporting: boolean;
  exportStatus: string;
  onPrepare: () => void;
  onApprovalChange: (approved: boolean) => void;
  onExport: () => void;
}) {
  return (
    <section style={panel} data-codexforge-production-pack-export-panel="ProductionPackExportPanel renders">
      <div style={header}>
        <span style={eyebrow}>Export requests</span>
        <strong style={badge}>approved false by default</strong>
      </div>
      <div style={actions}>
        <button type="button" style={button} onClick={onPrepare}>Prepare export requests</button>
        <label style={approval}>
          <input type="checkbox" checked={approved} onChange={(event) => onApprovalChange(event.currentTarget.checked)} />
          explicit export approval required
        </label>
        <button type="button" style={button} onClick={onExport} disabled={!prepared || !approved || exporting}>
          Export approved pack
        </button>
      </div>
      <ul style={list}>
        {summarizeProductionPackExportRequests(pack).map((line, index) => (
          <li key={buildProductionPackReactKey("export-summary", line, index)} style={lineItem}>{line}</li>
        ))}
      </ul>
      <div style={requestList}>
        {(prepared ? pack.exportRequests : pack.exportRequests.slice(0, 3)).map((request, index) => (
          <article key={buildProductionPackReactKey("export", request.artifactId, index)} style={requestCard}>
            <strong>{request.title}</strong>
            <code>{request.targetRelativePath}</code>
            <span>approved: {request.approved ? "true" : "false"}</span>
          </article>
        ))}
      </div>
      <p style={status}>{exportStatus || "Safe artifact workspace export is idle."}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(69,26,3,0.20)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.30)", color: "#fef3c7", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const actions: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" };
const button: CSSProperties = { border: "1px solid rgba(251,191,36,0.34)", background: "rgba(245,158,11,0.14)", color: "#fef3c7", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const approval: CSSProperties = { border: "1px solid rgba(251,191,36,0.20)", borderRadius: 8, padding: "8px 10px", color: "#fde68a", fontSize: 12, display: "flex", gap: 8, alignItems: "center" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 };
const lineItem: CSSProperties = { color: "#fef3c7", fontSize: 13, lineHeight: 1.45 };
const requestList: CSSProperties = { display: "grid", gap: 8, maxHeight: 220, overflow: "auto" };
const requestCard: CSSProperties = { border: "1px solid rgba(251,191,36,0.14)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#fffbeb", fontSize: 12, overflowWrap: "anywhere" };
const status: CSSProperties = { margin: 0, color: "#fde68a", fontSize: 12, lineHeight: 1.4 };
