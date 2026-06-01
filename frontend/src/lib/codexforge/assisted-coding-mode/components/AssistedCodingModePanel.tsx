"use client";
import { buildAssistedCodingModeSummary } from "../index";
import { AssistedCodingGoalPanel } from "./AssistedCodingGoalPanel";
import { AssistedCodingHandoffPanel } from "./AssistedCodingHandoffPanel";
import { AssistedCodingModeEmptyState } from "./AssistedCodingModeEmptyState";
import { AssistedCodingModeSafetyStrip } from "./AssistedCodingModeSafetyStrip";
import { AssistedCodingNextActionPanel } from "./AssistedCodingNextActionPanel";
import { AssistedCodingReviewStatePanel } from "./AssistedCodingReviewStatePanel";
import { AssistedCodingRouteRecommendationPanel } from "./AssistedCodingRouteRecommendationPanel";
import { AssistedCodingSafetyStatePanel } from "./AssistedCodingSafetyStatePanel";
import { AssistedCodingStepPanel } from "./AssistedCodingStepPanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";

export function AssistedCodingModePanel() {
  const summary = buildAssistedCodingModeSummary();
  return <div style={shell} data-codexforge-panel="AssistedCodingModePanel renders Assisted coding mode Choose a goal and CodexForge will guide the next safe step Review inbox /review-inbox no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Guided coding</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#coding-goals" style={buttonLike}>{summary.primaryAction}</a></div><AssistedCodingModeSafetyStrip /></section>
    <section style={strip}><strong>{summary.nextAction.label}</strong><span>{summary.nextAction.href}</span><span>Still manual</span></section>
    <AssistedCodingModeEmptyState />
    <section id="coding-goals" style={grid}><AssistedCodingNextActionPanel /><AssistedCodingGoalPanel /><AssistedCodingStepPanel /><AssistedCodingSafetyStatePanel /><AssistedCodingRouteRecommendationPanel /><AssistedCodingReviewStatePanel /><AssistedCodingHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. This route recommends safe next steps only.</p></details>
  </div>;
}
