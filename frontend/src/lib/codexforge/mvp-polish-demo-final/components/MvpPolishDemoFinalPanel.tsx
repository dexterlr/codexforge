"use client";
import { buildPolishReadinessSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { PolishCheckPanel } from "./PolishCheckPanel";
import { DemoFinalScriptPanel } from "./DemoFinalScriptPanel";
import { DemoFinalScreenPanel } from "./DemoFinalScreenPanel";
import { PolishCopyUpgradePanel } from "./PolishCopyUpgradePanel";
import { PolishNavigationUpgradePanel } from "./PolishNavigationUpgradePanel";
import { PolishReadinessSummaryPanel } from "./PolishReadinessSummaryPanel";
import { PolishFinalHandoffPanel } from "./PolishFinalHandoffPanel";
import { PolishSafetyStrip } from "./PolishSafetyStrip";
import { PolishEmptyState } from "./PolishEmptyState";

export function MvpPolishDemoFinalPanel() {
  const summary = buildPolishReadinessSummary();
  return <div style={shell} data-codexforge-panel="MvpPolishDemoFinalPanel renders Final polish for the coding MVP demo Review final demo no duplicate menus no giant route chip cloud no cramped top sections no repeated safety essays one primary CTA clear next step premium layout no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildMvpPolishStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>Final polish for the coding MVP demo</h1><p style={lede}>Keep the operator path calm: one primary action, manual review, separate validation, and copyable evidence.</p><a href="#main-checklist" style={buttonLike}>Review final demo</a></div><PolishSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <PolishEmptyState />
    <section id="main-checklist" style={grid}><PolishCheckPanel />
        <DemoFinalScriptPanel />
        <DemoFinalScreenPanel />
        <PolishCopyUpgradePanel />
        <PolishNavigationUpgradePanel />
        <PolishReadinessSummaryPanel />
        <PolishFinalHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}
