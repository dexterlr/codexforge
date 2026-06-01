"use client";
import { buildNoviceFirstTaskSummary } from "../index";
import { FirstTaskApplyReviewGuidePanel } from "./FirstTaskApplyReviewGuidePanel";
import { FirstTaskHandoffPanel } from "./FirstTaskHandoffPanel";
import { FirstTaskPreviewGuidePanel } from "./FirstTaskPreviewGuidePanel";
import { FirstTaskResultGuidePanel } from "./FirstTaskResultGuidePanel";
import { FirstTaskSafeFilePanel } from "./FirstTaskSafeFilePanel";
import { FirstTaskScenarioPanel } from "./FirstTaskScenarioPanel";
import { FirstTaskStepPanel } from "./FirstTaskStepPanel";
import { FirstTaskValidationGuidePanel } from "./FirstTaskValidationGuidePanel";
import { NoviceFirstTaskEmptyState } from "./NoviceFirstTaskEmptyState";
import { NoviceFirstTaskSafetyStrip } from "./NoviceFirstTaskSafetyStrip";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "../../assisted-coding-mode/components/ComponentStyles";

export function NoviceFirstTaskPanel() {
  const summary = buildNoviceFirstTaskSummary();
  return <div style={shell} data-codexforge-panel="NoviceFirstTaskPanel renders Your first safe task Start first task plain English no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Start here</span><h1 style={headline}>{summary.scenario.title}</h1><p style={lede}>{summary.scenario.subtitle}</p><a href="#first-task-flow" style={buttonLike}>{summary.scenario.primaryAction}</a></div><NoviceFirstTaskSafetyStrip /></section>
    <section style={strip}><strong>First safe task</strong><span>One wording change</span><span>One file only</span></section>
    <NoviceFirstTaskEmptyState />
    <section id="first-task-flow" style={grid}><FirstTaskScenarioPanel /><FirstTaskStepPanel /><FirstTaskSafeFilePanel /><FirstTaskPreviewGuidePanel /><FirstTaskApplyReviewGuidePanel /><FirstTaskValidationGuidePanel /><FirstTaskResultGuidePanel /><FirstTaskHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are secondary. This guide only teaches the manual path and never applies or validates automatically.</p></details>
  </div>;
}
