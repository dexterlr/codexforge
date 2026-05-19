"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  buildValidationCommandCatalog,
  buildValidationExecutionBridge,
  buildValidationOutputCapture,
  buildValidationOutputCaptureItem,
  buildValidationResultRouter,
  buildValidationRunApproval,
  buildValidationRunPolicy,
  buildValidationRunPreflight,
  buildValidationRunRequest,
  buildValidationRunnerSummary,
  executeApprovedValidationRun,
  type ValidationExecutionResult,
} from "../index";
import { ValidationCommandCatalogPanel } from "./ValidationCommandCatalogPanel";
import { ValidationExecutionBridgePanel } from "./ValidationExecutionBridgePanel";
import { ValidationOutputCapturePanel } from "./ValidationOutputCapturePanel";
import { ValidationResultRouterPanel } from "./ValidationResultRouterPanel";
import { ValidationRunApprovalPanel } from "./ValidationRunApprovalPanel";
import { ValidationRunPolicyPanel } from "./ValidationRunPolicyPanel";
import { ValidationRunPreflightPanel } from "./ValidationRunPreflightPanel";
import { ValidationRunRequestPanel } from "./ValidationRunRequestPanel";
import { ValidationRunnerEmptyState } from "./ValidationRunnerEmptyState";
import { ValidationRunnerSafetyNotice } from "./ValidationRunnerSafetyNotice";
import { vrButton, vrCopy, vrTextGuard } from "./ValidationRunnerStyles";

type Props = { onCopy?: (label: string, value: string) => void };

const DEFAULT_SELECTED_COMMANDS = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-validation-runner.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
];

export function ValidationRunnerPanel({ onCopy }: Props) {
  const [prepared, setPrepared] = useState(false);
  const [approved, setApproved] = useState(false);
  const [acks, setAcks] = useState(false);
  const [highRiskAck, setHighRiskAck] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const [manualOutput, setManualOutput] = useState("");
  const [executionResult, setExecutionResult] = useState<ValidationExecutionResult | null>(null);
  const catalog = useMemo(() => buildValidationCommandCatalog(), []);
  const defaultIds = useMemo(
    () => catalog.items.filter((item) => DEFAULT_SELECTED_COMMANDS.includes(item.command)).map((item) => item.id),
    [catalog.items]
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultIds);
  const selectedCommands = useMemo(() => catalog.items.filter((item) => selectedIds.includes(item.id)), [catalog.items, selectedIds]);
  const request = useMemo(() => buildValidationRunRequest({ selectedCommands, sourceSurface: "/validation" }), [selectedCommands]);
  const approval = useMemo(
    () =>
      buildValidationRunApproval({
        request,
        approved,
        approvalNote,
        acknowledgedCommands: acks,
        acknowledgedCommandRisk: acks,
        acknowledgedNoArbitraryShell: acks,
        acknowledgedOutputCapture: acks,
        acknowledgedNoBrainGraphMutation: acks,
        acknowledgedLatestMessageAuthority: acks,
        highRiskExtraAcknowledged: highRiskAck,
      }),
    [acks, approvalNote, approved, highRiskAck, request]
  );
  const policy = useMemo(() => buildValidationRunPolicy({ request, approval }), [approval, request]);
  const preflight = useMemo(() => buildValidationRunPreflight({ request, approval, policy }), [approval, policy, request]);
  const bridge = useMemo(() => buildValidationExecutionBridge({ request, approval, policy, preflight, guardedRunApiAvailable: false }), [approval, policy, preflight, request]);
  const outputItems = useMemo(
    () =>
      manualOutput.trim()
        ? [
            buildValidationOutputCaptureItem({
              commandId: selectedCommands[0]?.id ?? "manual-output",
              command: selectedCommands[0]?.command ?? "manual validation output",
              stdout: manualOutput,
              stderr: manualOutput.toLowerCase().includes("error") ? manualOutput : "",
            }),
          ]
        : [],
    [manualOutput, selectedCommands]
  );
  const outputCapture = useMemo(() => buildValidationOutputCapture({ requestId: request.requestId, items: outputItems }), [outputItems, request.requestId]);
  const router = useMemo(() => buildValidationResultRouter({ requestId: request.requestId, outputCapture }), [outputCapture, request.requestId]);
  const summary = useMemo(() => buildValidationRunnerSummary({ request, approval, policy, preflight, executionBridge: bridge, outputCapture, resultRouter: router }), [approval, bridge, outputCapture, policy, preflight, request, router]);

  function copyText(label: string, value: string) {
    onCopy?.(label, value);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
  }

  function toggleCommand(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].sort());
  }

  async function requestGuardedRun() {
    const result = await executeApprovedValidationRun({ request, approval, policy, preflight });
    setExecutionResult(result);
  }

  return (
    <section style={panel} data-codexforge-validation-runner-panel="ValidationRunnerPanel renders approval required no arbitrary shell no command execution without approval no file writes preserve latest-message authority no auto-persistence stable key helper request-ready manual-only">
      <div style={header}>
        <div style={vrTextGuard}>
          <div style={eyebrow}>Validation Runner v1</div>
          <h1 style={title}>Approval-gated validation cockpit</h1>
          <p style={vrCopy}>Checklist to explicit approval to guarded boundary to captured output to verification and regression routing. This UI has no arbitrary shell input and no mutation buttons.</p>
        </div>
        <div style={actions}>
          <button type="button" style={vrButton} onClick={() => setPrepared(true)}>Prepare validation request</button>
          <button type="button" style={vrButton} onClick={() => copyText("full validation checklist", bridge.copyableCommands.join("\n"))}>Copy full validation checklist</button>
        </div>
      </div>
      <ValidationRunnerSafetyNotice />
      <section style={summaryStrip}>{summary.summary.map((item) => <span key={item}>{item}</span>)}</section>
      {!prepared ? <ValidationRunnerEmptyState /> : null}
      <div style={grid}>
        <ValidationCommandCatalogPanel catalog={catalog} selectedIds={selectedIds} onToggle={toggleCommand} onCopy={copyText} />
        <ValidationRunRequestPanel request={request} />
        <ValidationRunApprovalPanel approval={approval} approved={approved} acknowledgementsReady={acks} highRiskAcknowledged={highRiskAck} approvalNote={approvalNote} onApprovedChange={setApproved} onAcknowledgementsReadyChange={setAcks} onHighRiskAcknowledgedChange={setHighRiskAck} onApprovalNoteChange={setApprovalNote} />
        <ValidationRunPolicyPanel policy={policy} />
        <ValidationRunPreflightPanel preflight={preflight} />
        <ValidationExecutionBridgePanel bridge={bridge} result={executionResult} onRequest={() => void requestGuardedRun()} onCopy={copyText} />
        <ValidationOutputCapturePanel capture={outputCapture} manualOutput={manualOutput} onManualOutputChange={setManualOutput} />
        <ValidationResultRouterPanel router={router} />
      </div>
    </section>
  );
}

const panel: CSSProperties = { background: "#020617", color: "#f8fafc", display: "grid", gap: 14, minHeight: "100vh", minWidth: 0, overflowX: "clip", padding: "24px min(4vw, 44px)" };
const header: CSSProperties = { alignItems: "start", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 28, lineHeight: 1.1, margin: "4px 0 8px", ...vrTextGuard };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end", minWidth: 0 };
const summaryStrip: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10, ...vrTextGuard };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))", minWidth: 0 };
