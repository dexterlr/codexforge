"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  buildApplyDiffExecutionGateSession,
  buildApplyExecutionAuditLedger,
  buildApplyExecutionResultContract,
  executeApprovedApplyDiffRequest,
  summarizeApplyDiffExecutionGateSession,
  type ApplyExecutionApprovalStateSource,
  type ApplyExecutionGateInputSource,
  type ApplyExecutionResultContract,
} from "../index";
import { ApplyDiffExecutionSafetyNotice } from "./ApplyDiffExecutionSafetyNotice";
import { ExecutionApprovalStatePanel } from "./ExecutionApprovalStatePanel";
import { ExecutionAuditLedgerPanel } from "./ExecutionAuditLedgerPanel";
import { ExecutionBridgePanel } from "./ExecutionBridgePanel";
import { ExecutionGateInputPanel } from "./ExecutionGateInputPanel";
import { ExecutionPolicyConfirmationPanel } from "./ExecutionPolicyConfirmationPanel";
import { ExecutionRequestPacketPanel } from "./ExecutionRequestPacketPanel";
import { ExecutionResultContractPanel } from "./ExecutionResultContractPanel";

type Props = {
  source?: ApplyExecutionGateInputSource;
  approval?: Omit<ApplyExecutionApprovalStateSource, "input">;
  onCopyPacket?: (packet: string) => void;
  compact?: boolean;
};

const demoSource: ApplyExecutionGateInputSource = {
  dryRunId: "apply-diff-dry-run:demo-clean",
  applyGateId: "apply-gate:demo-human-approved",
  approvalPacketId: "apply-approval-packet:demo-human-approved",
  previewDiffCompositionId: "preview-diff-composition-demo",
  queueItemId: "patch-preview-queue-demo",
  goal: "Prepare an approved apply-diff execution request packet through the guarded execute route.",
  targetFiles: ["src/app/ai/page.tsx"],
  dryRunStatus: "dry-run-complete",
  dryRunResultSummary: ["Dry run completed successfully as simulation only."],
  patchSourceState: "real-patch-reviewed",
  realPatchAvailabilityState: "reviewed",
  approvalPosture: "approved",
  policyPosture: "review-ready",
  rollbackPosture: "acknowledged",
  verificationPosture: "acknowledged",
  operatorAcknowledgementState: "partial",
  riskLevel: "medium",
  approvedTargetFiles: ["src/app/ai/page.tsx"],
  patchSummary: ["Reviewed patch is present, but dispatch remains disabled until explicit operator approval is supplied."],
  rollbackPlan: ["Use git restore path before commit.", "Use git revert after commit."],
  verificationPlan: [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-apply-diff-execution-gate.ps1",
  ],
  evidenceRefs: ["apply-diff-dry-run:demo-clean"],
  toolInputPreview: {
    path: "src/app/ai/page.tsx",
    patch: '--- a/src/app/ai/page.tsx\n+++ b/src/app/ai/page.tsx\n@@ -1,1 +1,1 @@\n-"use client";\n+"use client";',
    createIfMissing: false,
    dryRun: false,
    createBackup: true,
  },
};

export function ApplyDiffExecutionGatePanel({ source, approval, onCopyPacket, compact = false }: Props) {
  const session = useMemo(
    () => buildApplyDiffExecutionGateSession({ source: source ?? demoSource, approval }),
    [approval, source]
  );
  const [dispatching, setDispatching] = useState(false);
  const [result, setResult] = useState<ApplyExecutionResultContract | null>(null);
  const visibleResult = result ?? session.resultContract;
  const visibleLedger = useMemo(
    () =>
      buildApplyExecutionAuditLedger({
        input: session.input,
        approvalState: session.approvalState,
        policyConfirmation: session.policyConfirmation,
        requestPacket: session.requestPacket,
        bridgePayload: session.bridgePayload,
        resultContract: visibleResult,
      }),
    [session.approvalState, session.bridgePayload, session.input, session.policyConfirmation, session.requestPacket, visibleResult]
  );
  const dispatchDisabled = dispatching || !session.requestPacket.ready || !session.bridgePayload.canDispatch;

  async function dispatchApprovedApplyRequest() {
    if (dispatchDisabled) return;

    setResult(
      buildApplyExecutionResultContract({
        requestId: session.requestPacket.requestId,
        status: "dispatched",
        ok: false,
        summary: ["User-dispatched guarded apply request through the execute route."],
        verificationNextSteps: session.requestPacket.verificationChecks,
        rollbackNextSteps: session.requestPacket.rollbackNotes,
        evidenceRefs: [session.requestPacket.id],
      })
    );
    setDispatching(true);

    try {
      const nextResult = await executeApprovedApplyDiffRequest({ packet: session.requestPacket });
      setResult(nextResult);
    } finally {
      setDispatching(false);
    }
  }

  return (
    <section
      style={panel}
      data-codexforge-apply-diff-execution-gate-panel="ApplyDiffExecutionGatePanel renders Apply-Diff Execution Gate explicit operator approval required no silent execution apply-diff is approval-required execute route is the guarded boundary verification required after dispatch rollback plan required preserve latest-message authority bridge does not auto-run on render"
    >
      <div style={header}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Apply-Diff Execution Gate</span>
          <h2 style={title}>Review approved apply request</h2>
          <p style={copy}>
            Dry-run-clean package becomes a visible request packet, approval state, policy confirmation, guarded bridge,
            result contract, and local audit ledger. It does not auto-send, auto-run, call broker-execution, call direct
            write-file, call direct run-command, mutate Brain graph state, or write files unless the approved execute
            route dispatch button is clicked.
          </p>
        </div>
        <button
          type="button"
          style={secondaryButton}
          onClick={() => onCopyPacket?.(JSON.stringify(session.requestPacket, null, 2))}
        >
          Copy request packet
        </button>
      </div>
      <ApplyDiffExecutionSafetyNotice />
      <div style={summaryBox}>
        <ul style={summaryList}>
          {summarizeApplyDiffExecutionGateSession(session).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <ExecutionGateInputPanel input={session.input} validation={session.inputValidation} />
      <ExecutionApprovalStatePanel approvalState={session.approvalState} validation={session.approvalValidation} />
      <ExecutionPolicyConfirmationPanel policy={session.policyConfirmation} />
      {compact ? null : (
        <div style={grid}>
          <ExecutionRequestPacketPanel packet={session.requestPacket} validation={session.requestValidation} />
          <ExecutionBridgePanel
            bridge={session.bridgePayload}
            disabled={dispatchDisabled}
            dispatching={dispatching}
            onDispatch={dispatchApprovedApplyRequest}
          />
          <ExecutionResultContractPanel result={visibleResult} />
          <ExecutionAuditLedgerPanel ledger={visibleLedger} />
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(196,181,253,0.26)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.72))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const title: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, color: "#cbd5e1", overflowWrap: "anywhere" };
const secondaryButton: CSSProperties = { border: "1px solid rgba(196,181,253,0.32)", background: "rgba(196,181,253,0.14)", color: "#ede9fe", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const summaryBox: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 10, minWidth: 0 };
const summaryList: CSSProperties = { margin: 0, paddingLeft: 18, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
