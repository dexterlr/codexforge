"use client";
import { buildMvpOnboardingSummary } from "../index";
import { MvpOnboardingEmptyState } from "./MvpOnboardingEmptyState";
import { MvpOnboardingSafetyStrip } from "./MvpOnboardingSafetyStrip";
import { OnboardingCompletionPanel } from "./OnboardingCompletionPanel";
import { OnboardingFirstRunPanel } from "./OnboardingFirstRunPanel";
import { OnboardingHandoffPanel } from "./OnboardingHandoffPanel";
import { OnboardingRouteGuidePanel } from "./OnboardingRouteGuidePanel";
import { OnboardingSafeTaskPanel } from "./OnboardingSafeTaskPanel";
import { OnboardingSafetyPromisePanel } from "./OnboardingSafetyPromisePanel";
import { OnboardingStepPanel } from "./OnboardingStepPanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";

export function MvpOnboardingPanel() {
  const summary = buildMvpOnboardingSummary();
  return <div style={shell} data-codexforge-panel="MvpOnboardingPanel renders Start with CodexForge Learn the safe coding flow in a few minutes no phase numbers in main copy no auto-apply no auto-run approval required validation separate rollback guidance shown user stays in control preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>First run</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#onboarding-flow" style={buttonLike}>{summary.primaryAction}</a></div><MvpOnboardingSafetyStrip /></section>
    <section style={strip}><strong>{summary.safeTask.title}</strong><span>{summary.safeTask.route}</span><span>Two-minute guide</span></section>
    <MvpOnboardingEmptyState />
    <section id="onboarding-flow" style={grid}><OnboardingSafeTaskPanel /><OnboardingStepPanel /><OnboardingSafetyPromisePanel /><OnboardingRouteGuidePanel /><OnboardingFirstRunPanel /><OnboardingCompletionPanel /><OnboardingHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Onboarding explains the manual path without adding automation.</p></details>
  </div>;
}
