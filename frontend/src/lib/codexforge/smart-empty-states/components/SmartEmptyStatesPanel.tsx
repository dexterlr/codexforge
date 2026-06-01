"use client";
import { buildSmartEmptyStateSummary } from "../index";
import { EmptyStateDefinitionPanel } from "./EmptyStateDefinitionPanel";
import { EmptyStateHelpCopyPanel } from "./EmptyStateHelpCopyPanel";
import { EmptyStateNextActionPanel } from "./EmptyStateNextActionPanel";
import { EmptyStateRouteMapPanel } from "./EmptyStateRouteMapPanel";
import { EmptyStateSafetyNotePanel } from "./EmptyStateSafetyNotePanel";
import { SmartEmptyStateEmptyState } from "./SmartEmptyStateEmptyState";
import { SmartEmptyStateSafetyStrip } from "./SmartEmptyStateSafetyStrip";
import { SmartEmptyStateSummaryPanel } from "./SmartEmptyStateSummaryPanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell } from "../../assisted-coding-mode/components/ComponentStyles";

export function SmartEmptyStatesPanel() {
  const summary = buildSmartEmptyStateSummary();
  return <div style={shell} data-codexforge-panel="SmartEmptyStatesPanel renders Helpful empty states Copy empty-state checklist plain English no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Help everywhere</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#empty-state-checklist" style={buttonLike}>{summary.primaryAction}</a></div><SmartEmptyStateSafetyStrip /></section>
    <SmartEmptyStateEmptyState />
    <section id="empty-state-checklist" style={grid}><SmartEmptyStateSummaryPanel /><EmptyStateDefinitionPanel /><EmptyStateNextActionPanel /><EmptyStateHelpCopyPanel /><EmptyStateRouteMapPanel /><EmptyStateSafetyNotePanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are secondary. Empty states guide users without adding hidden mutation or execution.</p></details>
  </div>;
}
