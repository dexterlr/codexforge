"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  buildApprovedPatchApplyApprovalPacket,
  buildApprovedPatchApplyDryRunPreview,
  buildApprovedPatchApplyExecutionBridge,
  buildApprovedPatchApplyPolicy,
  buildApprovedPatchApplyPreflight,
  buildApprovedPatchApplyRequest,
  buildApprovedPatchApplyRollbackPlan,
  buildApprovedPatchApplySummary,
  buildApprovedPatchApplyValidationCapture,
  executeApprovedPatchApplyRequest,
  validateApprovedPatchApplyApprovalPacket,
  type ApprovedPatchApplyExecutionResult,
  type ApprovedPatchApplyMode,
  type ApprovedPatchApplyRiskLevel,
} from "../index";
import { ApplyApprovalPacketPanel } from "./ApplyApprovalPacketPanel";
import { ApplyDryRunPreviewPanel } from "./ApplyDryRunPreviewPanel";
import { ApplyExecutionBridgePanel } from "./ApplyExecutionBridgePanel";
import { ApplyPolicyPanel } from "./ApplyPolicyPanel";
import { ApplyPreflightPanel } from "./ApplyPreflightPanel";
import { ApplyRequestPanel } from "./ApplyRequestPanel";
import { ApplyRollbackPlanPanel } from "./ApplyRollbackPlanPanel";
import { ApplyValidationCapturePanel } from "./ApplyValidationCapturePanel";
import { ApprovedPatchApplyEmptyState } from "./ApprovedPatchApplyEmptyState";
import { ApprovedPatchApplySafetyNotice } from "./ApprovedPatchApplySafetyNotice";

type Props = {
  sourcePreviewId?: string | null;
  selectedFilePath: string;
  previewDiff?: string | null;
  patchPlanSummary?: string | readonly string[] | null;
  riskLevel?: ApprovedPatchApplyRiskLevel | null;
  expectedTouchedFiles?: readonly string[] | null;
  operatorIntent?: string | null;
  requestedApplyMode?: ApprovedPatchApplyMode | null;
  onCopy?: (label: string, value: string) => void;
};

function buildApplyReviewPrompt(summary: readonly string[]): string {
  return [
    "Review Approved Patch Apply v1 request.",
    "",
    "Inspect first.",
    "No patch may apply without explicit approval, policy pass, preflight, dry-run preview, rollback plan, and validation plan.",
    "No command execution from UI.",
    "No direct apply-diff from UI.",
    "No file writes without approval.",
    "Do not mutate Brain graph or memory.",
    "Preserve latest-message authority.",
    "",
    ...summary,
  ].join("\n");
}

export function ApprovedPatchApplyPanel({
  sourcePreviewId,
  selectedFilePath,
  previewDiff,
  patchPlanSummary,
  riskLevel,
  expectedTouchedFiles,
  operatorIntent,
  requestedApplyMode = "request-ready",
  onCopy,
}: Props) {
  const [prepared, setPrepared] = useState(false);
  const [approved, setApproved] = useState(false);
  const [acknowledgementsReady, setAcknowledgementsReady] = useState(false);
  const [highRiskAcknowledged, setHighRiskAcknowledged] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const [manualResultText, setManualResultText] = useState("");
  const [executionResult, setExecutionResult] = useState<ApprovedPatchApplyExecutionResult | null>(null);
  const previewReady = Boolean(selectedFilePath && previewDiff && previewDiff.trim().length > 0);
  const request = useMemo(
    () =>
      buildApprovedPatchApplyRequest({
        sourcePreviewId,
        selectedFilePath,
        previewDiff,
        patchPlanSummary,
        riskLevel,
        expectedTouchedFiles,
        operatorIntent,
        requestedApplyMode,
      }),
    [expectedTouchedFiles, operatorIntent, patchPlanSummary, previewDiff, requestedApplyMode, riskLevel, selectedFilePath, sourcePreviewId]
  );
  const rollbackPlan = useMemo(() => buildApprovedPatchApplyRollbackPlan(request), [request]);
  const validationCapture = useMemo(
    () => buildApprovedPatchApplyValidationCapture({ request, manualResultText }),
    [manualResultText, request]
  );
  const preflight = useMemo(
    () =>
      buildApprovedPatchApplyPreflight({
        request,
        rollbackAvailable: rollbackPlan.ready,
        validationCommandsVisible: validationCapture.ready,
        directCommandExecution: false,
        directGraphMutation: false,
        brokerExecution: false,
        latestMessageAuthorityPreserved: true,
      }),
    [request, rollbackPlan.ready, validationCapture.ready]
  );
  const dryRunPreview = useMemo(() => buildApprovedPatchApplyDryRunPreview(request), [request]);
  const approvalPacket = useMemo(
    () =>
      buildApprovedPatchApplyApprovalPacket({
        request,
        approved,
        approvalNote,
        acknowledgedPreviewDiff: acknowledgementsReady,
        acknowledgedTouchedFiles: acknowledgementsReady,
        acknowledgedRiskLevel: acknowledgementsReady,
        acknowledgedRollbackPlan: acknowledgementsReady,
        acknowledgedValidationPlan: acknowledgementsReady,
        acknowledgedNoCommandExecutionFromUi: acknowledgementsReady,
        acknowledgedFileWriteBoundary: acknowledgementsReady,
        acknowledgedLatestMessageAuthority: acknowledgementsReady,
        highRiskExtraAcknowledged: highRiskAcknowledged,
      }),
    [acknowledgementsReady, approvalNote, approved, highRiskAcknowledged, request]
  );
  const approvalValidation = useMemo(() => validateApprovedPatchApplyApprovalPacket(approvalPacket), [approvalPacket]);
  const policy = useMemo(
    () =>
      buildApprovedPatchApplyPolicy({
        request,
        approvalPacket,
        preflight,
        dryRunPreview,
        rollbackPlan,
        validationCapture,
        directUiApplyDiffAttempted: false,
        directUiWriteFileAttempted: false,
        commandExecutionFromUiAttempted: false,
        brokerExecutionAttempted: false,
      }),
    [approvalPacket, dryRunPreview, preflight, request, rollbackPlan, validationCapture]
  );
  const bridge = useMemo(
    () =>
      buildApprovedPatchApplyExecutionBridge({
        request,
        approvalPacket,
        policy,
        preflight,
        dryRunPreview,
        rollbackPlan,
        validationCapture,
        guardedApiAvailable: false,
      }),
    [approvalPacket, dryRunPreview, policy, preflight, request, rollbackPlan, validationCapture]
  );
  const summary = useMemo(
    () =>
      buildApprovedPatchApplySummary({
        request,
        approvalPacket,
        policy,
        preflight,
        dryRunPreview,
        rollbackPlan,
        validationCapture,
        executionBridge: bridge,
      }),
    [approvalPacket, bridge, dryRunPreview, policy, preflight, request, rollbackPlan, validationCapture]
  );
  const validationChecklist = validationCapture.commands.map((command) => command.command).join("\n");

  function copyText(label: string, value: string) {
    onCopy?.(label, value);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
  }

  async function requestGuardedApply() {
    const result = await executeApprovedPatchApplyRequest({
      request,
      approvalPacket,
      policy,
      preflight,
      dryRunPreview,
      rollbackPlan,
      validationCapture,
    });
    setExecutionResult(result);
  }

  return (
    <section
      style={panel}
      data-codexforge-approved-patch-apply-panel="ApprovedPatchApplyPanel renders Approved Patch Apply v1 approval required no command execution no direct apply-diff from UI no file writes without approval preserve latest-message authority no auto-apply request-ready"
    >
      <div style={header}>
        <div style={textGuard}>
          <div style={eyebrow}>Approved Patch Apply v1</div>
          <strong style={title}>Preview diff to approval packet</strong>
          <p style={copy}>
            Prepare apply request, approval packet, policy, preflight, dry-run preview, rollback guidance,
            guarded execution bridge state, and validation capture. This panel does not apply on render, does not
            execute commands, and does not call direct apply-diff from UI.
          </p>
        </div>
        <div style={actions}>
          <button type="button" style={button} onClick={() => setPrepared(true)} disabled={!previewReady}>
            Prepare apply request
          </button>
          <button type="button" style={button} onClick={() => copyText("apply review prompt", buildApplyReviewPrompt(summary.summary))}>
            Copy apply review prompt
          </button>
          <button type="button" style={button} onClick={() => copyText("validation checklist", validationChecklist)}>
            Copy validation checklist
          </button>
        </div>
      </div>

      <ApprovedPatchApplySafetyNotice />

      {!previewReady ? (
        <ApprovedPatchApplyEmptyState reason="Preview diff required before approved patch apply can be prepared." />
      ) : !prepared ? (
        <ApprovedPatchApplyEmptyState />
      ) : (
        <>
          <section style={summaryStrip}>
            {summary.summary.map((item) => <span key={item}>{item}</span>)}
          </section>
          <div style={grid}>
            <ApplyRequestPanel request={request} />
            <ApplyApprovalPacketPanel
              packet={approvalPacket}
              validation={approvalValidation}
              approved={approved}
              onApprovedChange={setApproved}
              acknowledgementsReady={acknowledgementsReady}
              onAcknowledgementsReadyChange={setAcknowledgementsReady}
              highRiskAcknowledged={highRiskAcknowledged}
              onHighRiskAcknowledgedChange={setHighRiskAcknowledged}
              approvalNote={approvalNote}
              onApprovalNoteChange={setApprovalNote}
            />
            <ApplyPolicyPanel policy={policy} />
            <ApplyPreflightPanel preflight={preflight} />
            <ApplyDryRunPreviewPanel preview={dryRunPreview} />
            <ApplyRollbackPlanPanel plan={rollbackPlan} onCopy={copyText} />
            <ApplyExecutionBridgePanel
              bridge={bridge}
              result={executionResult}
              disabled={!prepared}
              onRequest={() => void requestGuardedApply()}
            />
            <ApplyValidationCapturePanel
              capture={validationCapture}
              manualResultText={manualResultText}
              onManualResultTextChange={setManualResultText}
              onCopy={copyText}
            />
          </div>
        </>
      )}
    </section>
  );
}

const textGuard: CSSProperties = { minWidth: 0, overflowWrap: "anywhere" };
const panel: CSSProperties = { border: "1px solid rgba(196,181,253,0.24)", background: "rgba(15,23,42,0.74)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 12 };
const header: CSSProperties = { alignItems: "start", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { display: "block", fontSize: 16, lineHeight: 1.25, marginTop: 3, ...textGuard };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: "6px 0 0", ...textGuard };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end", minWidth: 0 };
const button: CSSProperties = { border: "1px solid rgba(196,181,253,0.32)", background: "rgba(196,181,253,0.14)", borderRadius: 8, color: "#ede9fe", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "8px 10px" };
const summaryStrip: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.46)", borderRadius: 8, color: "#dbeafe", display: "grid", fontSize: 12, gap: 4, lineHeight: 1.45, minWidth: 0, overflowWrap: "anywhere", padding: 9 };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", minWidth: 0 };
