"use client";

import { useState, type CSSProperties } from "react";
import {
  buildPatchChangeRequest,
  buildPatchPreviewContextFromFile,
  buildRealPatchPreviewHandoff,
  buildRealPatchPreviewPlan,
  buildRealPatchPreviewRiskReport,
  buildRealPatchPreviewRollbackPlan,
  buildRealPatchPreviewSummary,
  buildRealPatchPreviewTestPlan,
  buildUnifiedDiffPreview,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type RealPatchPreviewHandoff,
  type RealPatchPreviewPlan,
  type RealPatchPreviewRiskReport,
  type RealPatchPreviewRollbackPlan,
  type RealPatchPreviewSummary,
  type RealPatchPreviewTestPlan,
  type UnifiedDiffPreview,
} from "../index";
import type {
  ProjectFileCategory,
  ProjectFileMetadata,
  ProjectFilePurpose,
  ProjectFileRiskReport,
} from "../../local-project-reader";
import { PatchChangeRequestPanel } from "./PatchChangeRequestPanel";
import { PatchContextPanel } from "./PatchContextPanel";
import { PatchPlanPanel } from "./PatchPlanPanel";
import { PatchPreviewHandoffPanel } from "./PatchPreviewHandoffPanel";
import { PatchPreviewRiskPanel } from "./PatchPreviewRiskPanel";
import { PatchPreviewRollbackPanel } from "./PatchPreviewRollbackPanel";
import { PatchPreviewTestPlanPanel } from "./PatchPreviewTestPlanPanel";
import { RealPatchPreviewEmptyState } from "./RealPatchPreviewEmptyState";
import { RealPatchPreviewSafetyNotice } from "./RealPatchPreviewSafetyNotice";
import { UnifiedDiffPreviewPanel } from "./UnifiedDiffPreviewPanel";

type RealPatchPreviewSession = {
  request: PatchChangeRequest;
  context: PatchPreviewContext;
  plan: RealPatchPreviewPlan;
  diffPreview: UnifiedDiffPreview;
  riskReport: RealPatchPreviewRiskReport;
  testPlan: RealPatchPreviewTestPlan;
  rollbackPlan: RealPatchPreviewRollbackPlan;
  handoff: RealPatchPreviewHandoff;
  summary: RealPatchPreviewSummary;
};

export function RealPatchPreviewPanel({
  selectedFilePath,
  selectedFileCategory,
  fileContent,
  metadata,
  purpose,
  risk,
  onCopy,
}: {
  selectedFilePath: string;
  selectedFileCategory: ProjectFileCategory | "unknown";
  fileContent: string | null;
  metadata: ProjectFileMetadata | null;
  purpose: ProjectFilePurpose | null;
  risk: ProjectFileRiskReport | null;
  onCopy?: (label: string, value: string) => void;
}) {
  const [requestedChangeText, setRequestedChangeText] = useState("");
  const [operatorIntent, setOperatorIntent] = useState("Prepare a preview-only patch plan for the selected file.");
  const [session, setSession] = useState<RealPatchPreviewSession | null>(null);
  const [copied, setCopied] = useState("");
  const contentReady = Boolean(selectedFilePath && fileContent && fileContent.trim().length > 0);

  function preparePreview() {
    const request = buildPatchChangeRequest({
      selectedFilePath,
      selectedFileCategory,
      requestedChangeText,
      operatorIntent,
      constraints: [
        "preview-only",
        "no file writes",
        "no apply",
        "no command execution",
        "preserve latest-message authority",
      ],
    });
    const context = buildPatchPreviewContextFromFile({
      filePath: selectedFilePath,
      fileContent: fileContent ?? "",
      metadata,
      purpose,
      risk,
    });
    const plan = buildRealPatchPreviewPlan({ request, context });
    const diffPreview = buildUnifiedDiffPreview({ request, context });
    const testPlan = buildRealPatchPreviewTestPlan({ filePath: selectedFilePath, context, request });
    const riskReport = buildRealPatchPreviewRiskReport({ request, context, plan, testPlan });
    const rollbackPlan = buildRealPatchPreviewRollbackPlan(selectedFilePath);
    const handoff = buildRealPatchPreviewHandoff({
      request,
      context,
      plan,
      diffPreview,
      riskReport,
      testPlan,
      rollbackPlan,
    });
    const summary = buildRealPatchPreviewSummary({
      request,
      context,
      plan,
      diffPreview,
      riskReport,
      testPlan,
      rollbackPlan,
      handoff,
    });
    setSession({ request, context, plan, diffPreview, riskReport, testPlan, rollbackPlan, handoff, summary });
  }

  function copyText(label: string, value: string) {
    onCopy?.(label, value);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).then(() => setCopied(label)).catch(() => setCopied(""));
    }
  }

  return (
    <section
      style={panel}
      data-codexforge-real-patch-preview-panel="RealPatchPreviewPanel renders Real Patch Preview v1 preview-only no file writes no apply no command execution Patch Application Gate preserve latest-message authority"
    >
      <div style={header}>
        <div style={textGuard}>
          <div style={eyebrow}>Real Patch Preview v1</div>
          <strong style={title}>Selected file to preview-only diff handoff</strong>
          <p style={copy}>
            Build deterministic request, supplied-content context, patch plan, unified diff preview, risk, tests,
            rollback, and copy-only handoff. This panel does not apply patches.
          </p>
        </div>
        <span style={pill}>Preview-only</span>
      </div>

      <RealPatchPreviewSafetyNotice />

      {!contentReady ? (
        <RealPatchPreviewEmptyState />
      ) : (
        <>
          <PatchChangeRequestPanel
            selectedPath={selectedFilePath}
            requestedChangeText={requestedChangeText}
            onRequestedChangeTextChange={setRequestedChangeText}
            operatorIntent={operatorIntent}
            onOperatorIntentChange={setOperatorIntent}
            onPreparePreview={preparePreview}
            request={session?.request ?? null}
          />
          <div style={summaryStrip}>
            <span>{session?.summary.summary ?? "Preview artifacts are local state only until Prepare preview is pressed."}</span>
            {copied ? <strong>Copied {copied}</strong> : null}
          </div>
          <div style={grid}>
            <PatchContextPanel context={session?.context ?? null} />
            <PatchPlanPanel plan={session?.plan ?? null} />
            <UnifiedDiffPreviewPanel diffPreview={session?.diffPreview ?? null} />
            <PatchPreviewRiskPanel report={session?.riskReport ?? null} />
            <PatchPreviewTestPlanPanel plan={session?.testPlan ?? null} />
            <PatchPreviewRollbackPanel plan={session?.rollbackPlan ?? null} />
            <PatchPreviewHandoffPanel
              handoff={session?.handoff ?? null}
              onCopyReviewPrompt={() => session ? copyText("patch review prompt", session.handoff.reviewPrompt) : undefined}
              onCopyApplyGatePrompt={() => session ? copyText("apply-gate handoff", session.handoff.applyGatePromptPreview) : undefined}
            />
          </div>
        </>
      )}
    </section>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  overflowWrap: "anywhere",
};

const panel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(2,6,23,0.76)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 12,
};

const header: CSSProperties = {
  alignItems: "start",
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  justifyContent: "space-between",
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  display: "block",
  fontSize: 16,
  lineHeight: 1.25,
  marginTop: 3,
  ...textGuard,
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: "6px 0 0",
  ...textGuard,
};

const pill: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.34)",
  background: "rgba(52,211,153,0.12)",
  borderRadius: 8,
  color: "#bbf7d0",
  fontSize: 11,
  fontWeight: 900,
  padding: "7px 9px",
  textTransform: "uppercase",
};

const summaryStrip: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.56)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "flex",
  flexWrap: "wrap",
  fontSize: 12,
  gap: 8,
  justifyContent: "space-between",
  lineHeight: 1.45,
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: "9px 10px",
};

const grid: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
  minWidth: 0,
};
