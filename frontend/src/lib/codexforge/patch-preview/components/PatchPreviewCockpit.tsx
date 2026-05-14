"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgePatchPreviewPlan } from "../patch-preview-types";
import { PatchApprovalBoundary } from "./PatchApprovalBoundary";
import { PatchDiffPreviewPanel } from "./PatchDiffPreviewPanel";
import { PatchPreviewPlanPanel } from "./PatchPreviewPlanPanel";
import { PatchRiskBoard } from "./PatchRiskBoard";
import { PatchRollbackPanel } from "./PatchRollbackPanel";
import { PatchTestPlanPanel } from "./PatchTestPlanPanel";

export function PatchPreviewCockpit({
  plan,
  patchPrompt,
}: {
  plan: CodexForgePatchPreviewPlan | null;
  patchPrompt: string;
}) {
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState<"patch" | "tests" | "unavailable" | null>(null);

  const testPlanText = useMemo(() => {
    return plan?.suggestedTests.map((test) => `- ${test}`).join("\n") ?? "";
  }, [plan?.suggestedTests]);

  async function copyText(kind: "patch" | "tests") {
    if (!plan) return;

    try {
      await navigator.clipboard.writeText(kind === "patch" ? patchPrompt : testPlanText);
      setCopied(kind);
    } catch {
      setCopied("unavailable");
    }
  }

  if (!plan) {
    return (
      <section data-codexforge-patch-preview-cockpit style={cockpit}>
        <div style={header}>
          <div style={textGuard}>
            <div style={eyebrow}>Patch Preview Cockpit</div>
            <strong style={title}>Select a file to prepare a safe preview plan.</strong>
          </div>
          <span style={previewPill}>Preview only</span>
        </div>
        <div style={emptyState}>
          <strong>No file mutation</strong>
          <span>Patch planning stays disabled until a file is selected.</span>
        </div>
      </section>
    );
  }

  return (
    <section
      data-codexforge-patch-preview-cockpit
      data-codexforge-patch-preview-only="true"
      data-codexforge-no-file-mutation="true"
      style={cockpit}
    >
      <div style={header}>
        <div style={textGuard}>
          <div style={eyebrow}>Patch Preview Cockpit</div>
          <strong style={title}>Safe Patch Preview System</strong>
          <p style={lede}>{plan.nextAction}</p>
        </div>
        <span style={previewPill}>Preview only</span>
      </div>

      <div style={targetBox}>
        <strong>Selected file</strong>
        <span>{plan.selectedFilePath}</span>
      </div>

      <div style={actions}>
        <button type="button" onClick={() => setPrepared(true)} style={button}>
          Prepare preview plan
        </button>
        <button type="button" onClick={() => void copyText("patch")} style={secondaryButton}>
          {copied === "patch" ? "Patch prompt copied" : "Copy patch prompt"}
        </button>
        <button type="button" onClick={() => void copyText("tests")} style={secondaryButton}>
          {copied === "tests" ? "Test plan copied" : "Copy test plan"}
        </button>
      </div>

      {copied === "unavailable" ? (
        <p style={warning}>Clipboard is unavailable in this browser context.</p>
      ) : null}

      <div style={boundaryStrip}>
        <strong>Approval boundary active</strong>
        <span>No file mutation, apply path, command execution, or Brain graph mutation is available from this cockpit.</span>
      </div>

      <div style={panelGrid}>
        <PatchPreviewPlanPanel plan={plan} />
        <PatchRiskBoard board={plan.riskBoard} />
        <PatchTestPlanPanel plan={plan.testPlan} />
        <PatchRollbackPanel plan={plan.rollbackPlan} />
        <PatchApprovalBoundary boundary={plan.approvalBoundary} />
        <PatchDiffPreviewPanel
          diffPreview={
            prepared
              ? plan.diffPreviewPlaceholder
              : "Preview diff placeholder is ready. Press Prepare preview plan to focus the deterministic preview package."
          }
        />
      </div>
    </section>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const cockpit: CSSProperties = {
  border: "1px solid rgba(56,189,248,0.22)",
  background:
    "linear-gradient(145deg, rgba(2,6,23,0.94), rgba(15,23,42,0.84)), radial-gradient(circle at 90% 0%, rgba(56,189,248,0.16), transparent 32%)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 14,
  boxShadow: "0 18px 56px rgba(2,6,23,0.34), inset 0 1px 0 rgba(255,255,255,0.05)",
  ...textGuard,
};

const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
  ...textGuard,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.68,
};

const title: CSSProperties = {
  display: "block",
  marginTop: 4,
  fontSize: 18,
  lineHeight: 1.25,
  ...textGuard,
};

const lede: CSSProperties = {
  margin: "7px 0 0",
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.78,
  ...textGuard,
};

const previewPill: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.34)",
  background: "rgba(52,211,153,0.13)",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const targetBox: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
  ...textGuard,
};

const actions: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
  ...textGuard,
};

const button: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.36)",
  background: "rgba(52,211,153,0.15)",
  color: "white",
  borderRadius: 8,
  padding: "9px 11px",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
  ...textGuard,
};

const secondaryButton: CSSProperties = {
  ...button,
  border: "1px solid rgba(56,189,248,0.32)",
  background: "rgba(56,189,248,0.11)",
};

const warning: CSSProperties = {
  margin: 0,
  border: "1px solid rgba(251,191,36,0.30)",
  background: "rgba(251,191,36,0.10)",
  borderRadius: 8,
  padding: 10,
  fontSize: 12,
  lineHeight: 1.4,
  ...textGuard,
};

const boundaryStrip: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.30)",
  background: "rgba(127,29,29,0.14)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.45,
  ...textGuard,
};

const panelGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 12,
  alignItems: "start",
  ...textGuard,
};

const emptyState: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 6,
  fontSize: 13,
  lineHeight: 1.45,
  ...textGuard,
};
