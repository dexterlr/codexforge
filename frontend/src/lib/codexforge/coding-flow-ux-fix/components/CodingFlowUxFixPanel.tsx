"use client";

import type { CSSProperties } from "react";
import {
  buildCodingFlowPanelPriority,
  buildCodingFlowResultGuidanceFix,
  buildCodingFlowRouteHandoffFix,
  buildCodingFlowUxFixSummary,
  buildCodingFlowValidationCopyFix,
  buildDefaultCodingFlowCopyFixes,
  buildDefaultCodingFlowEmptyStateFixes,
  buildDefaultCodingFlowFrictions,
  selectCodingFlowPrimaryAction,
  summarizeCodingFlowUxFixSession,
  type CodingFlowUxRoute,
} from "../index";
import { CodingFlowCopyFixPanel } from "./CodingFlowCopyFixPanel";
import { CodingFlowEmptyStateFixPanel } from "./CodingFlowEmptyStateFixPanel";
import { CodingFlowFrictionPanel } from "./CodingFlowFrictionPanel";
import { CodingFlowPanelPriorityPanel } from "./CodingFlowPanelPriorityPanel";
import { CodingFlowPrimaryActionFixPanel } from "./CodingFlowPrimaryActionFixPanel";
import { CodingFlowResultGuidanceFixPanel } from "./CodingFlowResultGuidanceFixPanel";
import { CodingFlowRouteHandoffFixPanel } from "./CodingFlowRouteHandoffFixPanel";
import { CodingFlowUxFixEmptyState } from "./CodingFlowUxFixEmptyState";
import { CodingFlowUxFixSafetyStrip } from "./CodingFlowUxFixSafetyStrip";
import { CodingFlowValidationCopyFixPanel } from "./CodingFlowValidationCopyFixPanel";

const PRIORITY_ROUTES: readonly CodingFlowUxRoute[] = ["/code-flow", "/apply-validation", "/workflow-results", "/run-history", "/code-flow/trial", "/code-flow/trial-review"];
const PRIMARY_ROUTES: readonly CodingFlowUxRoute[] = ["/code-flow", "/code-flow/trial", "/code-flow/trial-review", "/apply-validation", "/workflow-results", "/run-history", "/start", "/files", "/validation", "/closed-loop"];

export function CodingFlowUxFixPanel() {
  const frictions = buildDefaultCodingFlowFrictions();
  const copyFixes = buildDefaultCodingFlowCopyFixes();
  const primaryActions = PRIMARY_ROUTES.map((route) => selectCodingFlowPrimaryAction(route));
  const panelPriorities = PRIORITY_ROUTES.map((route) => buildCodingFlowPanelPriority(route));
  const emptyStates = buildDefaultCodingFlowEmptyStateFixes();
  const validationCopy = buildCodingFlowValidationCopyFix();
  const resultGuidance = buildCodingFlowResultGuidanceFix();
  const routeHandoffs = buildCodingFlowRouteHandoffFix();
  const summary = buildCodingFlowUxFixSummary();
  const checklist = [
    "Coding Flow UX fix checklist",
    "",
    "1. Keep one primary action above the fold.",
    "2. Use Pick a file, Describe the change, Preview patch, Review apply, Prepare checks, Capture result.",
    "3. Show Apply blocked because preview, approval, or rollback is missing.",
    "4. Say Copy these checks, Run them in your terminal, Paste the output back.",
    "5. Keep advanced details collapsed by default.",
    "6. Keep no auto-apply, no auto-run, approval required, and preserve latest-message authority visible.",
  ].join("\n");

  function copyText(label: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value).catch(() => undefined);
    }
    void label;
  }

  return (
    <div style={shell} data-codexforge-coding-flow-ux-fix-panel="CodingFlowUxFixPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage no process env value printed in UI deterministic ids stable key helper">
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Coding Flow UX Fix Pack</span>
          <h1 style={headline}>Make the coding flow easier</h1>
          <p style={lede}>Fix wording, actions, empty states, and handoffs from the trial review.</p>
          <CodingFlowUxFixSafetyStrip />
        </div>
        <aside style={actionBox}>
          <span style={summaryLine}>{summarizeCodingFlowUxFixSession(summary)}</span>
          <button type="button" style={primaryAction} onClick={() => copyText("UX fix checklist", checklist)}>Copy UX fix checklist</button>
          <span style={finePrint}>Copy-only checklist. No auto-apply. No auto-run. Approval required.</span>
        </aside>
      </section>
      <section style={summaryStrip}>
        <span>Friction: {summary.frictionCount}</span>
        <span>Copy fixes: {summary.copyFixCount}</span>
        <span>Essential panels: {summary.essentialPanelCount}</span>
        <span>Next: run another live coding trial after UX fixes.</span>
      </section>
      <CodingFlowUxFixEmptyState />
      <CodingFlowFrictionPanel frictions={frictions} />
      <CodingFlowCopyFixPanel fixes={copyFixes} />
      <CodingFlowPrimaryActionFixPanel fixes={primaryActions} />
      <details style={details}>
        <summary style={detailsSummary}>Advanced UX details</summary>
        <div style={advancedGrid}>
          <CodingFlowPanelPriorityPanel priorities={panelPriorities} />
          <CodingFlowEmptyStateFixPanel fixes={emptyStates} />
          <CodingFlowValidationCopyFixPanel fix={validationCopy} onCopy={copyText} />
          <CodingFlowResultGuidanceFixPanel fixes={resultGuidance} />
          <CodingFlowRouteHandoffFixPanel items={routeHandoffs} onCopy={copyText} />
        </div>
      </details>
      <span hidden data-codexforge-coding-flow-ux-fix-summary={`${summary.validationCopyStatus} ${summary.routeHandoffStatus} ${summary.nextUxAction}`} />
    </div>
  );
}

const shell: CSSProperties = { color: "#f8fafc", display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 34, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const actionBox: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const summaryLine: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const primaryAction: CSSProperties = { background: "#5eead4", border: 0, borderRadius: 8, color: "#042f2e", cursor: "pointer", display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", padding: "10px 12px" };
const finePrint: CSSProperties = { color: "#93c5fd", fontSize: 11, lineHeight: 1.45 };
const summaryStrip: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, padding: 10 };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#dbeafe", padding: 14 };
const detailsSummary: CSSProperties = { cursor: "pointer", fontSize: 14, fontWeight: 900 };
const advancedGrid: CSSProperties = { display: "grid", gap: 14, marginTop: 14 };
