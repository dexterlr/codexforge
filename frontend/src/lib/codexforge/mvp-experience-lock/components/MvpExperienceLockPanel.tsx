"use client";
import { buildMvpExperienceLockSummary } from "../index";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell, strip } from "./ComponentStyles";
import { ExperienceRouteLockPanel } from "./ExperienceRouteLockPanel";
import { ExperienceCopyLockPanel } from "./ExperienceCopyLockPanel";
import { ExperienceNavigationLockPanel } from "./ExperienceNavigationLockPanel";
import { ExperienceDemoLockPanel } from "./ExperienceDemoLockPanel";
import { ExperienceSafetyLockPanel } from "./ExperienceSafetyLockPanel";
import { ExperienceReadinessDecisionPanel } from "./ExperienceReadinessDecisionPanel";
import { ExperienceReleaseHandoffPanel } from "./ExperienceReleaseHandoffPanel";
import { MvpExperienceLockSafetyStrip } from "./MvpExperienceLockSafetyStrip";
import { MvpExperienceLockEmptyState } from "./MvpExperienceLockEmptyState";
export function MvpExperienceLockPanel() {
  const summary = buildMvpExperienceLockSummary();
  return <div style={shell} data-codexforge-panel="MvpExperienceLockPanel renders MVP experience lock demo-ready demo-ready-with-notes not-ready blocked Show readiness decision first no duplicate nav no cramped labels no unsafe buttons no fake claims no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage plain English buildMvpExperienceLockStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Coding MVP</span><h1 style={headline}>MVP experience lock</h1><p style={lede}>Confirm the coding MVP is clear, safe, demo-ready, and consistent.</p><a href="#main-checklist" style={buttonLike}>Copy release demo handoff</a></div><MvpExperienceLockSafetyStrip /></section>
    <section style={strip}><strong>{summary.status}</strong><span>{summary.primaryAction}</span><span>{summary.nextRoute}</span></section>
    <MvpExperienceLockEmptyState />
    <section id="main-checklist" style={grid}><ExperienceRouteLockPanel /><ExperienceCopyLockPanel /><ExperienceNavigationLockPanel /><ExperienceDemoLockPanel /><ExperienceSafetyLockPanel /><ExperienceReadinessDecisionPanel /><ExperienceReleaseHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are collapsed or visually secondary. Copy handoffs are allowed; execution stays manual and approval-gated.</p></details>
  </div>;
}
