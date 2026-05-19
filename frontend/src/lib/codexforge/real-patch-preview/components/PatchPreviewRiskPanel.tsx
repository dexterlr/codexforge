import type { CSSProperties } from "react";
import type { RealPatchPreviewRiskReport } from "../real-patch-preview-types";

export function PatchPreviewRiskPanel({ report }: { report: RealPatchPreviewRiskReport | null }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-risk-panel="PatchPreviewRiskPanel renders risk report detects apply-diff write-file run-command"
    >
      <div style={eyebrow}>Patch Preview Risk</div>
      {report ? (
        <>
          <strong style={title}>{report.level.toUpperCase()} risk - {report.score}</strong>
          <p style={copy}>{report.summary}</p>
          <div style={list}>
            {report.factors.map((factor) => (
              <span key={factor.id}>{factor.label}: {factor.detail}</span>
            ))}
          </div>
        </>
      ) : (
        <p style={copy}>Risk report appears after preparation.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.20)", background: "rgba(127,29,29,0.14)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#fecaca", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#fee2e2", fontSize: 13, lineHeight: 1.35, overflowWrap: "anywhere" };
const copy: CSSProperties = { color: "#fecaca", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 5, color: "#fee2e2", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere" };
