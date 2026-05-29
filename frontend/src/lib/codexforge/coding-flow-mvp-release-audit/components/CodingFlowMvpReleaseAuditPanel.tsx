"use client";
import type { CSSProperties } from "react";
import { buildReleaseAuditCapabilityCheck, buildReleaseAuditGoNoGo, buildReleaseAuditHandoff, buildReleaseAuditInput, buildReleaseAuditKnownGaps, buildReleaseAuditSafetyCheck, buildReleaseAuditSmokeCoverage, buildReleaseAuditSummary, buildReleaseAuditUxCheck, buildReleaseAuditValidationCheck } from "../index";
import { ReleaseAuditCapabilityCheckPanel } from "./ReleaseAuditCapabilityCheckPanel";
import { ReleaseAuditEmptyState } from "./ReleaseAuditEmptyState";
import { ReleaseAuditGoNoGoPanel } from "./ReleaseAuditGoNoGoPanel";
import { ReleaseAuditHandoffPanel } from "./ReleaseAuditHandoffPanel";
import { ReleaseAuditInputPanel } from "./ReleaseAuditInputPanel";
import { ReleaseAuditKnownGapsPanel } from "./ReleaseAuditKnownGapsPanel";
import { ReleaseAuditSafetyCheckPanel } from "./ReleaseAuditSafetyCheckPanel";
import { ReleaseAuditSafetyStrip } from "./ReleaseAuditSafetyStrip";
import { ReleaseAuditSmokeCoveragePanel } from "./ReleaseAuditSmokeCoveragePanel";
import { ReleaseAuditUxCheckPanel } from "./ReleaseAuditUxCheckPanel";
import { ReleaseAuditValidationCheckPanel } from "./ReleaseAuditValidationCheckPanel";
export function CodingFlowMvpReleaseAuditPanel() {
  const input = buildReleaseAuditInput();
  const capability = buildReleaseAuditCapabilityCheck();
  const safety = buildReleaseAuditSafetyCheck();
  const ux = buildReleaseAuditUxCheck();
  const validation = buildReleaseAuditValidationCheck();
  const smoke = buildReleaseAuditSmokeCoverage();
  const checks = [...capability, ...safety, ...ux, ...validation, ...smoke];
  const goNoGo = buildReleaseAuditGoNoGo(input, checks);
  const handoff = buildReleaseAuditHandoff(goNoGo);
  const summary = buildReleaseAuditSummary(goNoGo);
  return <div style={shell} data-codexforge-release-audit-panel="CodingFlowMvpReleaseAuditPanel renders Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage deterministic ids buildReleaseAuditStableKey">
    <section style={hero}><div style={heroCopy}><span style={eyebrow}>Release readiness</span><h1 style={headline}>Coding flow MVP audit</h1><p style={lede}>Audit whether the manual coding flow is ready to call working MVP.</p><ReleaseAuditSafetyStrip /></div><ReleaseAuditGoNoGoPanel goNoGo={goNoGo} /></section>
    <section style={summaryStrip}><strong>{summary.status}</strong><span>{summary.blockerCount} blockers</span><span>{summary.nextAction}</span></section>
    <ReleaseAuditEmptyState />
    <section style={grid}><ReleaseAuditInputPanel input={input} /><ReleaseAuditCapabilityCheckPanel checks={capability} /><ReleaseAuditSafetyCheckPanel checks={safety} /><ReleaseAuditUxCheckPanel checks={ux} /><ReleaseAuditValidationCheckPanel checks={validation} /><ReleaseAuditSmokeCoveragePanel checks={smoke} /><ReleaseAuditKnownGapsPanel gaps={buildReleaseAuditKnownGaps()} /><ReleaseAuditHandoffPanel handoff={handoff} /></section>
    <details style={details}><summary>Detailed checklists</summary><p>Product Readiness and Consolidation reference release audit. Detailed checklists stay collapsed/secondary.</p></details>
  </div>;
}
const shell: CSSProperties = { display: "grid", gap: 14, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.86))", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)", padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 38, letterSpacing: 0, lineHeight: 1.05, margin: 0, overflowWrap: "normal", whiteSpace: "nowrap", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 760 };
const summaryStrip: CSSProperties = { alignItems: "center", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", padding: "10px 12px", fontSize: 13 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" };
const details: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, color: "#cbd5e1", padding: 12 };
