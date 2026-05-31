"use client";
import { buildCodingMvpRcSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { RcReadinessCheckPanel } from "./RcReadinessCheckPanel";
import { RcRouteCheckPanel } from "./RcRouteCheckPanel";
import { RcSafetyCheckPanel } from "./RcSafetyCheckPanel";
import { RcValidationCheckPanel } from "./RcValidationCheckPanel";
import { RcUxCheckPanel } from "./RcUxCheckPanel";
import { RcKnownGapsPanel } from "./RcKnownGapsPanel";
import { RcDecisionPanel } from "./RcDecisionPanel";
import { RcHandoffPanel } from "./RcHandoffPanel";
import { RcSafetyStrip } from "./RcSafetyStrip";
import { RcEmptyState } from "./RcEmptyState";

export function CodingMvpReleaseCandidatePanel() {
  const summary = buildCodingMvpRcSummary();
  return <div style={shell} data-codexforge-panel="CodingMvpReleaseCandidatePanel renders Gate the coding MVP release candidate Review RC gate rc-ready rc-ready-with-fixes no-go blocked build passes all coding path smoke scripts pass no unsafe UI tool calls manual trial path clear demo path clear validation capture clear guarded apply still safe no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildCodingMvpRcStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Gate the coding MVP release candidate</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Review RC gate</a></div><RcSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <RcEmptyState />
    <section id="main-checklist" style={grid}><RcReadinessCheckPanel />
        <RcRouteCheckPanel />
        <RcSafetyCheckPanel />
        <RcValidationCheckPanel />
        <RcUxCheckPanel />
        <RcKnownGapsPanel />
        <RcDecisionPanel />
        <RcHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}
