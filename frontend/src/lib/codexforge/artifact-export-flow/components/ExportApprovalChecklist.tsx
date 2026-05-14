"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactExportFlowReactKey,
  type ExportApprovalChecklist as Checklist,
} from "@/lib/codexforge/artifact-export-flow";

export function ExportApprovalChecklist({
  checklist,
  approved,
  onApprovalChange,
}: {
  checklist: Checklist;
  approved: boolean;
  onApprovalChange: (approved: boolean) => void;
}) {
  const items = [
    ["user approved export", checklist.userApprovedExport],
    ["safe workspace target", checklist.safeWorkspaceTarget],
    ["extension allowed", checklist.extensionAllowed],
    ["no traversal", checklist.noTraversal],
    ["no source mutation path", checklist.noSourceMutationPath],
    ["no command execution intent", checklist.noCommandExecutionIntent],
    ["preview-only artifact language", checklist.previewOnlyLanguage],
  ] as const;

  return (
    <section style={panel} data-codexforge-export-approval-checklist="ExportApprovalChecklist renders explicit approval required">
      <div style={header}>
        <span style={eyebrow}>Approval checklist</span>
        <strong style={checklist.approved ? goodBadge : waitBadge}>{checklist.approved ? "approved" : "approval required"}</strong>
      </div>
      <label style={approvalToggle}>
        <input type="checkbox" checked={approved} onChange={(event) => onApprovalChange(event.currentTarget.checked)} />
        I approve artifact export only to the safe artifact workspace; source mutation blocked.
      </label>
      <div style={checkGrid}>
        {items.map(([label, passed]) => (
          <div key={buildArtifactExportFlowReactKey("approval", label)} style={checkItem}>
            <span style={passed ? dotGood : dotWait} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(69,26,3,0.24)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const goodBadge: CSSProperties = { border: "1px solid rgba(34,197,94,0.28)", color: "#bbf7d0", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const waitBadge: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", color: "#fef3c7", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const approvalToggle: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 10, color: "#fef3c7", display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, lineHeight: 1.45 };
const checkGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 8 };
const checkItem: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 9, display: "flex", gap: 8, alignItems: "center", color: "#e2e8f0", fontSize: 12, minWidth: 0 };
const dotGood: CSSProperties = { width: 8, height: 8, borderRadius: 8, background: "#22c55e", flex: "0 0 auto" };
const dotWait: CSSProperties = { width: 8, height: 8, borderRadius: 8, background: "#f59e0b", flex: "0 0 auto" };
