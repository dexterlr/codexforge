"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { classifyRegressionSignals, summarizeRegressionClassification } from "../regression-classifier";
import { buildRegressionSuspectedCause } from "../regression-cause-model";
import { buildRegressionFixRecommendation } from "../regression-fix-recommendation";
import { buildRegressionImpactMap } from "../regression-impact-map";
import { buildRegressionPreviewHandoff } from "../regression-preview-handoff";
import { buildRegressionRollbackAdvice } from "../regression-rollback-advisor";
import { normalizeRegressionSignals, summarizeRegressionSignals } from "../regression-signal-normalizer";
import { buildRegressionTriageSummary } from "../regression-triage-summary";
import type { RegressionRawSignal } from "../regression-triage-types";
import { RegressionCausePanel } from "./RegressionCausePanel";
import { RegressionClassifierPanel } from "./RegressionClassifierPanel";
import { RegressionFixRecommendationPanel } from "./RegressionFixRecommendationPanel";
import { RegressionImpactMapPanel } from "./RegressionImpactMapPanel";
import { RegressionPreviewHandoffPanel } from "./RegressionPreviewHandoffPanel";
import { RegressionRollbackAdvisorPanel } from "./RegressionRollbackAdvisorPanel";
import { RegressionSignalPanel } from "./RegressionSignalPanel";
import { RegressionTriageSafetyNotice } from "./RegressionTriageSafetyNotice";

type RegressionTriagePanelProps = {
  signals?: readonly RegressionRawSignal[];
  manualOperatorNote?: string;
  changedFiles?: readonly string[];
  targetFiles?: readonly string[];
  relatedFixRecommendation?: string;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoSignals: RegressionRawSignal[] = [
  {
    id: "regression-demo-duplicate-key",
    type: "duplicate-react-key",
    severity: "warning",
    title: "Duplicate React key warning",
    snippet: "Encountered two children with the same key in a regression triage list.",
    sourceKind: "browser-warning",
    relatedFiles: ["src/lib/codexforge/regression-triage/components/RegressionTriagePanel.tsx"],
    confidence: 0.84,
    regressionLikelihood: 0.76,
  },
  {
    id: "regression-demo-smoke-marker",
    type: "smoke-failure",
    severity: "blocker",
    title: "Smoke missing marker",
    snippet: "Smoke missing marker: RegressionTriagePanel renders.",
    sourceCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-regression-triage.ps1",
    relatedSmokeScript: "scripts/smoke-codexforge-regression-triage.ps1",
    relatedFiles: ["scripts/smoke-codexforge-regression-triage.ps1"],
    confidence: 0.82,
    regressionLikelihood: 0.88,
  },
  {
    id: "regression-demo-build-failure",
    type: "build-failure",
    severity: "blocker",
    title: "Build failure after integration",
    snippet: "Build failed after integration: bad import/export or client/server boundary.",
    sourceCommand: "npm run build",
    relatedFiles: ["src/lib/codexforge/regression-triage/index.ts"],
    confidence: 0.78,
    regressionLikelihood: 0.84,
  },
  {
    id: "regression-demo-mojibake",
    type: "mojibake-risk",
    severity: "warning",
    title: "Mojibake risk",
    snippet: "Visible text may contain mojibake from copied special characters.",
    relatedFiles: ["src/lib/codexforge/regression-triage/components/RegressionTriageSafetyNotice.tsx"],
    confidence: 0.68,
    regressionLikelihood: 0.58,
  },
];

export function RegressionTriagePanel({
  signals: rawSignals = demoSignals,
  manualOperatorNote = "Triage failed or warning verification signals into safe next actions only.",
  changedFiles = [],
  targetFiles = [],
  relatedFixRecommendation,
  onCopyPrompt,
  onUsePrompt,
  compact = false,
}: RegressionTriagePanelProps) {
  const model = useMemo(() => {
    const signals = normalizeRegressionSignals({
      verificationSignals: rawSignals,
      manualOperatorNote,
      changedFiles,
      targetFiles,
      relatedFixRecommendation,
    });
    const signalSummary = summarizeRegressionSignals(signals);
    const classifications = classifyRegressionSignals(signals);
    const classificationSummary = summarizeRegressionClassification(classifications);
    const suspectedCause = buildRegressionSuspectedCause({ signals, classifications });
    const impactMap = buildRegressionImpactMap({ signals, changedFiles, targetFiles });
    const rollbackAdvice = buildRegressionRollbackAdvice({ signals, impactMap });
    const fixRecommendation = buildRegressionFixRecommendation({
      signals,
      causes: suspectedCause.candidates,
      impactMap,
    });
    const handoff = buildRegressionPreviewHandoff({
      signals,
      causes: suspectedCause.candidates,
      impactMap,
      rollbackAdvice,
      fixRecommendation,
    });
    const summary = buildRegressionTriageSummary({
      signals,
      classifications,
      suspectedCause,
      impactMap,
      rollbackAdvice,
      fixRecommendation,
    });

    return {
      signals,
      signalSummary,
      classifications,
      classificationSummary,
      suspectedCause,
      impactMap,
      rollbackAdvice,
      fixRecommendation,
      handoff,
      summary,
    };
  }, [changedFiles, manualOperatorNote, rawSignals, relatedFixRecommendation, targetFiles]);

  return (
    <section
      data-codexforge-regression-triage-panel="RegressionTriagePanel renders Regression Triage no auto-fix no auto-rollback Safe Patch Preview evidence is context, not proof preserve latest-message authority"
      style={panel}
    >
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Regression Triage</span>
          <h2 style={heading}>Self-Healing Regression Triage</h2>
          <p style={body}>
            Failed verification signal becomes a reviewed regression card with suspected cause, impacted files, rollback
            advice, fix recommendation, and Safe Patch Preview handoff. It does not auto-run, auto-fix, auto-rollback,
            or write files.
          </p>
        </div>
        <span style={pill}>{model.summary.blockerCount} blockers</span>
      </div>

      <RegressionTriageSafetyNotice />
      <div style={summaryGrid}>
        {model.summary.summary.map((item) => (
          <div key={item} style={summaryCard}>{item}</div>
        ))}
      </div>
      <div style={summaryGrid}>
        <div style={summaryCard}>{model.signalSummary.summary[0]}</div>
        <div style={summaryCard}>{model.classificationSummary.summary[0]}</div>
      </div>
      <div style={grid}>
        <RegressionSignalPanel signals={model.signals} />
        <RegressionClassifierPanel classifications={model.classifications} />
      </div>
      <RegressionCausePanel suspectedCause={model.suspectedCause} />
      {compact ? null : <RegressionImpactMapPanel impactMap={model.impactMap} />}
      <div style={grid}>
        <RegressionRollbackAdvisorPanel advice={model.rollbackAdvice} />
        <RegressionFixRecommendationPanel recommendation={model.fixRecommendation} />
      </div>
      <RegressionPreviewHandoffPanel
        handoff={model.handoff}
        onCopyPrompt={onCopyPrompt}
        onUsePrompt={onUsePrompt}
      />
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.7))", borderRadius: 8, padding: 14, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { fontSize: 11, textTransform: "uppercase", color: "#5eead4", fontWeight: 900, overflowWrap: "anywhere" };
const heading: CSSProperties = { margin: "4px 0", fontSize: 18, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.76, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "6px 8px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8, minWidth: 0 };
const summaryCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 9, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
