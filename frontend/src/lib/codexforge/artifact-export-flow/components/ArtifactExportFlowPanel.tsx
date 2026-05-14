"use client";

import { useReducer, useState, type CSSProperties } from "react";
import type { ProductionPack } from "@/lib/codexforge/production-pack";
import {
  buildExportResultLedgerItem,
  parseExportApiResult,
  reduceExportFlowState,
  buildInitialExportFlowState,
} from "@/lib/codexforge/artifact-export-flow";
import { buildArtifactIngestionSummary } from "@/lib/codexforge/artifact-ingestion";
import { ArtifactIngestionPanel } from "@/lib/codexforge/artifact-ingestion/components";
import { ExportApprovalChecklist } from "./ExportApprovalChecklist";
import { ExportProgressPanel } from "./ExportProgressPanel";
import { ExportRequestReviewPanel } from "./ExportRequestReviewPanel";
import { ExportResultLedger } from "./ExportResultLedger";
import { ExportSafetyBoundary } from "./ExportSafetyBoundary";
import { ExportWorkspaceRefreshPanel } from "./ExportWorkspaceRefreshPanel";

export function ArtifactExportFlowPanel({ pack }: { pack: ProductionPack }) {
  const [approved, setApproved] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [state, dispatch] = useReducer(
    reduceExportFlowState,
    {
      sourcePackId: pack.id,
      exportRequests: pack.exportRequests,
    },
    buildInitialExportFlowState
  );
  const ingestionBundle = buildArtifactIngestionSummary({
    pack,
    exportLedger: state.flow.resultsLedger,
  });

  function prepareReview() {
    setApproved(false);
    dispatch({ type: "review.created", requests: pack.exportRequests });
  }

  function toggleApproval(nextApproved: boolean) {
    setApproved(nextApproved);
    dispatch({ type: "approval.toggled", approved: nextApproved });
  }

  async function exportApprovedArtifacts() {
    if (state.preparedPayloads.length === 0 || state.flow.progressState !== "ready-to-export") return;
    setExporting(true);
    dispatch({ type: "export.started" });

    for (const payload of state.preparedPayloads) {
      try {
        const response = await fetch("/api/codexforge/artifacts/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = parseExportApiResult(await response.json(), payload);
        const item = buildExportResultLedgerItem({
          result,
          sourcePackId: pack.id,
          sourceSurface: String(payload.sourceSurface),
        });
        dispatch({ type: result.ok ? "export.item.completed" : "export.item.failed", item });
      } catch {
        const item = buildExportResultLedgerItem({
          result: {
            ok: false,
            artifactId: payload.artifactId,
            targetRelativePath: payload.targetRelativePath,
            exportedPath: "",
            error: "Guarded artifact export API request failed.",
            safetyNote: "artifact export only; source mutation blocked",
          },
          sourcePackId: pack.id,
          sourceSurface: String(payload.sourceSurface),
        });
        dispatch({ type: "export.item.failed", item });
      }
    }

    dispatch({ type: "export.completed" });
    setExporting(false);
  }

  return (
    <section
      style={panel}
      data-codexforge-artifact-export-flow-panel="ArtifactExportFlowPanel renders explicit approval required safe artifact workspace source mutation blocked .codexforge/artifacts"
    >
      <div style={header}>
        <div style={copy}>
          <span style={eyebrow}>Phase 14 export flow</span>
          <h2 style={title}>Real Artifact Export Review</h2>
          <p style={lede}>
            Production pack previews become reviewable artifact files only after explicit approval and a guarded local export API call.
          </p>
        </div>
        <a href="/artifacts" style={link}>Open Artifacts</a>
      </div>
      <div style={layout}>
        <div style={main}>
          <ExportRequestReviewPanel review={state.flow.review} />
          <ExportResultLedger ledger={state.flow.resultsLedger} />
        </div>
        <aside style={rail}>
          <ExportSafetyBoundary />
          <ExportApprovalChecklist checklist={state.flow.approvalChecklist} approved={approved} onApprovalChange={toggleApproval} />
          <ExportProgressPanel state={state} exporting={exporting} onPrepareReview={prepareReview} onExport={exportApprovedArtifacts} />
          <ExportWorkspaceRefreshPanel onRefreshed={() => dispatch({ type: "workspace.refreshed" })} />
        </aside>
      </div>
      <ArtifactIngestionPanel bundle={ingestionBundle} />
    </section>
  );
}

const panel: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(45,212,191,0.20)", background: "linear-gradient(135deg, rgba(3,7,18,0.96), rgba(15,23,42,0.88))", borderRadius: 8, padding: 18, display: "grid", gap: 16, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "start", gap: 14, flexWrap: "wrap" };
const copy: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 26, lineHeight: 1.15, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 14, lineHeight: 1.5, maxWidth: 860 };
const link: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.14)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", textDecoration: "none", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 430px), 0.75fr)", gap: 14, alignItems: "start" };
const main: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
const rail: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
