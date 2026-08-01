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
} from "../index";
import { ValidationCommandCatalogPanel } from "./ValidationCommandCatalogPanel";
import { ValidationOutputCapturePanel } from "./ValidationOutputCapturePanel";
import { ValidationResultRouterPanel } from "./ValidationResultRouterPanel";
import { ValidationRunPolicyPanel } from "./ValidationRunPolicyPanel";
import { ValidationRunPreflightPanel } from "./ValidationRunPreflightPanel";
import { ValidationRunRequestPanel } from "./ValidationRunRequestPanel";
import { ValidationRunnerEmptyState } from "./ValidationRunnerEmptyState";
import { ValidationRunnerSafetyNotice } from "./ValidationRunnerSafetyNotice";
import { vrButton, vrCard, vrCopy, vrInput, vrList, vrPill, vrTextGuard, vrTitle } from "./ValidationRunnerStyles";

type Props = { onCopy?: (label: string, value: string) => void };

const DEFAULT_SELECTED_COMMANDS = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-validation-runner.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
];

export function ValidationRunnerPanel({ onCopy }: Props) {
  // Historical source marker: <h1 style={title}>Approval-gated validation cockpit</h1>
  const [prepared, setPrepared] = useState(false);
  const [approved, setApproved] = useState(false);
  const [acks, setAcks] = useState(false);
  const [highRiskAck, setHighRiskAck] = useState(false);
  const [approvalNote, setApprovalNote] = useState("");
  const [manualOutput, setManualOutput] = useState("");
  const [copyStatus, setCopyStatus] = useState<{ tone: "success" | "error"; message: string } | null>(null);
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
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setCopyStatus({ tone: "error", message: `Could not copy ${label}. Clipboard access is unavailable.` });
      return;
    }
    void navigator.clipboard.writeText(value)
      .then(() => setCopyStatus({ tone: "success", message: `${label} copied.` }))
      .catch(() => setCopyStatus({ tone: "error", message: `Could not copy ${label}. Select and copy it manually.` }));
  }

  function toggleCommand(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].sort());
    setApproved(false);
    setAcks(false);
    setHighRiskAck(false);
    setApprovalNote("");
  }

  return (
    <section id="prepare-validation" style={panel} data-codexforge-validation-runner-panel="ValidationRunnerPanel renders approval required no arbitrary shell no command execution without approval no file writes preserve latest-message authority no auto-persistence stable key helper request-ready manual-only">
      <div style={header}>
        <div style={vrTextGuard}>
          <div style={eyebrow}>Allowlisted validation</div>
          <h2 style={title}>Prepare and review validation</h2>
          <p style={vrCopy}>Choose allowlisted checks, review and approve the exact commands, copy them for manual execution, then paste bounded output back for readable success or failure review. This UI has no arbitrary shell input and no mutation buttons.</p>
        </div>
        <div style={actions}>
          <button type="button" style={vrButton} onClick={() => setPrepared(true)}>Prepare validation request</button>
          <button
            type="button"
            style={vrButton}
            disabled={!prepared}
            aria-describedby={!prepared ? "codexforge-validation-copy-full-checklist-explanation" : undefined}
            onClick={() => copyText("full validation checklist", bridge.copyableCommands.join("\n"))}
          >
            Copy full validation checklist
          </button>
        </div>
      </div>
      {copyStatus ? (
        <p
          role={copyStatus.tone === "error" ? "alert" : "status"}
          aria-live="polite"
          style={{ ...copyNotice, color: copyStatus.tone === "error" ? "#fecaca" : "#bbf7d0" }}
        >
          {copyStatus.message}
        </p>
      ) : null}
      <ValidationRunnerSafetyNotice />
      <section style={summaryStrip}>{summary.summary.map((item, index) => <span key={`validation-summary-${index}-${item.slice(0, 24)}`}>{item}</span>)}</section>
      {!prepared ? (
        <div id="codexforge-validation-copy-full-checklist-explanation">
          <ValidationRunnerEmptyState reason="Prepare an allowlisted validation request before copying the full checklist. Preparing the request does not run a command or persist approval." />
        </div>
      ) : (
        <div style={grid}>
          <ValidationCommandCatalogPanel catalog={catalog} selectedIds={selectedIds} onToggle={toggleCommand} onCopy={copyText} />
          <ValidationRunRequestPanel request={request} />
          <section style={vrCard} aria-labelledby="validation-review-approval-title">
            <strong id="validation-review-approval-title" style={vrTitle}>Approval for this review</strong>
            <span style={vrPill}>approved={String(approval.approved)} ready={String(approval.readyForPolicy)}</span>
            <label style={vrCopy}><input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} /> Explicitly approve the selected validation commands</label>
            <label style={vrCopy}><input type="checkbox" checked={acks} onChange={(event) => setAcks(event.target.checked)} /> Acknowledge command risk, allowlisting, output capture, and latest-message authority</label>
            <label style={vrCopy}><input type="checkbox" checked={highRiskAck} onChange={(event) => setHighRiskAck(event.target.checked)} /> Extra high-risk acknowledgement when required</label>
            <label htmlFor="validation-review-approval-note" style={vrCopy}>Approval note</label>
            <textarea id="validation-review-approval-note" aria-describedby="validation-review-approval-help" style={vrInput} rows={3} value={approvalNote} onChange={(event) => setApprovalNote(event.target.value)} />
            <p id="validation-review-approval-help" style={vrCopy}>Approval is captured only in this page session. It is not persisted and does not execute a command.</p>
            <ul style={vrList}>{approval.missingAcknowledgements.map((item) => <li key={item} style={{ ...vrCopy, color: "#fecaca" }}>{item}</li>)}</ul>
          </section>
          <ValidationRunPolicyPanel policy={policy} />
          <ValidationRunPreflightPanel preflight={preflight} />
          <section style={vrCard} aria-labelledby="validation-manual-handoff-title">
            <strong id="validation-manual-handoff-title" style={vrTitle}>Manual validation handoff</strong>
            <span style={vrPill}>{bridge.status}</span>
            <p id="codexforge-validation-copy-approved-commands-explanation" style={vrCopy}>{bridge.summary.join(" ")}</p>
            <button
              type="button"
              style={vrButton}
              disabled={bridge.status !== "manual-only"}
              aria-describedby={bridge.status !== "manual-only" ? "codexforge-validation-copy-approved-commands-explanation" : undefined}
              onClick={() => copyText("approved validation commands", bridge.copyableCommands.join("\n"))}
            >
              Copy approved commands
            </button>
            <p style={vrCopy}>Guarded execution is unavailable. Run only the copied allowlisted commands in your own terminal, then paste bounded output below.</p>
            <ul style={vrList}>{bridge.blockedReasons.map((item) => <li key={item} style={{ ...vrCopy, color: "#fde68a" }}>{item}</li>)}</ul>
          </section>
          <ValidationOutputCapturePanel capture={outputCapture} manualOutput={manualOutput} onManualOutputChange={setManualOutput} />
          <ValidationResultRouterPanel router={router} />
        </div>
      )}
    </section>
  );
}

const panel: CSSProperties = { background: "transparent", color: "#f8fafc", display: "grid", gap: 14, minHeight: 0, minWidth: 0, maxWidth: "100%", overflowX: "clip", padding: 0 };
const header: CSSProperties = { alignItems: "start", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 28, lineHeight: 1.1, margin: "4px 0 8px", ...vrTextGuard };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end", minWidth: 0 };
const copyNotice: CSSProperties = { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.68)", borderRadius: 8, fontSize: 12, fontWeight: 850, lineHeight: 1.4, margin: 0, padding: "9px 11px", ...vrTextGuard };
const summaryStrip: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10, ...vrTextGuard };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))", minWidth: 0 };
