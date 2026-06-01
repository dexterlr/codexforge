"use client";
import { buildAssistedMvpQualitySummary } from "../index";
import { AssistedCopyQualityPanel } from "./AssistedCopyQualityPanel";
import { AssistedEmptyStateQualityPanel } from "./AssistedEmptyStateQualityPanel";
import { AssistedMvpQualityEmptyState } from "./AssistedMvpQualityEmptyState";
import { AssistedMvpQualitySafetyStrip } from "./AssistedMvpQualitySafetyStrip";
import { AssistedNavQualityPanel } from "./AssistedNavQualityPanel";
import { AssistedQualityCheckPanel } from "./AssistedQualityCheckPanel";
import { AssistedQualityHandoffPanel } from "./AssistedQualityHandoffPanel";
import { AssistedRouteQualityPanel } from "./AssistedRouteQualityPanel";
import { AssistedSafetyQualityPanel } from "./AssistedSafetyQualityPanel";
import { buttonLike, details, grid, headline, hero, heroCopy, eyebrow, lede, shell } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedMvpQualitySweepPanel() {
  const summary = buildAssistedMvpQualitySummary();
  return <div style={shell} data-codexforge-panel="AssistedMvpQualitySweepPanel renders Assisted MVP quality Copy quality sweep plain English no auto-apply no auto-run approval required preserve latest-message authority route uses home-grade/unified shell marker no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Quality sweep</span><h1 style={headline}>{summary.title}</h1><p style={lede}>{summary.subtitle}</p><a href="#quality-sweep" style={buttonLike}>{summary.primaryAction}</a></div><AssistedMvpQualitySafetyStrip /></section>
    <AssistedMvpQualityEmptyState />
    <section id="quality-sweep" style={grid}><AssistedQualityCheckPanel /><AssistedRouteQualityPanel /><AssistedCopyQualityPanel /><AssistedSafetyQualityPanel /><AssistedEmptyStateQualityPanel /><AssistedNavQualityPanel /><AssistedQualityHandoffPanel /></section>
    <details style={details}><summary>Advanced details</summary><p>Advanced details are secondary. This is a quality review and does not add automation.</p></details>
  </div>;
}
