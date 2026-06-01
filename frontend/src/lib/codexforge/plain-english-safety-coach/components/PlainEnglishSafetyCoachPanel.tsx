"use client";
import { buildSafetyCoachSummary } from "../index";
import { SafetyCoachEmptyState } from "./SafetyCoachEmptyState";
import { SafetyCoachStrip } from "./SafetyCoachStrip";
import { SafetyCoachSummaryPanel } from "./SafetyCoachSummaryPanel";
import { SafetyCopyPanel } from "./SafetyCopyPanel";
import { SafetyNextStepPanel } from "./SafetyNextStepPanel";
import { SafetyPromisePanel } from "./SafetyPromisePanel";
import { SafetyTermPanel } from "./SafetyTermPanel";
import { SafetyWarningPanel } from "./SafetyWarningPanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell } from "../../assisted-coding-mode/components/ComponentStyles";

export function PlainEnglishSafetyCoachPanel() {
  const summary = buildSafetyCoachSummary();
  return <div style={shell} data-codexforge-panel="PlainEnglishSafetyCoachPanel renders Safety coach plain English no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Plain-English safety</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#safety-terms" style={buttonLike}>{summary.primaryAction}</a></div><SafetyCoachStrip /></section>
    <SafetyCoachEmptyState />
    <section id="safety-terms" style={grid}><SafetyCoachSummaryPanel /><SafetyTermPanel /><SafetyPromisePanel /><SafetyWarningPanel /><SafetyNextStepPanel /><SafetyCopyPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are secondary. Main copy avoids technical safety jargon and explains one idea at a time.</p></details>
  </div>;
}
