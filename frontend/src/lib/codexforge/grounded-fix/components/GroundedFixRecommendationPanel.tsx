"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { buildGroundedFixCandidates } from "../fix-candidate-builder";
import { rankGroundedFixCandidates } from "../fix-confidence";
import { buildGroundedFixFileImpact } from "../fix-file-impact";
import { buildGroundedFixPreviewHandoff } from "../fix-preview-handoff";
import { buildGroundedFixRecommendationPolicy } from "../fix-recommendation-policy";
import { buildGroundedFixRecommendationSummary } from "../fix-recommendation-summary";
import { buildGroundedFixRiskBoard } from "../fix-risk-model";
import { normalizeFixSignals } from "../fix-signal-normalizer";
import type { GroundedFixRawSignal } from "../grounded-fix-types";
import { FixCandidatePanel } from "./FixCandidatePanel";
import { FixConfidencePanel } from "./FixConfidencePanel";
import { FixFileImpactPanel } from "./FixFileImpactPanel";
import { FixPreviewHandoffPanel } from "./FixPreviewHandoffPanel";
import { FixRecommendationPolicyPanel } from "./FixRecommendationPolicyPanel";
import { FixRiskPanel } from "./FixRiskPanel";
import { FixSignalPanel } from "./FixSignalPanel";
import { GroundedFixSafetyNotice } from "./GroundedFixSafetyNotice";

type GroundedFixRecommendationPanelProps = {
  signals?: readonly GroundedFixRawSignal[];
  manualGoal?: string;
  onCopyPrompt?: (prompt: string) => void;
  onUsePrompt?: (prompt: string) => void;
  compact?: boolean;
};

const demoSignals: GroundedFixRawSignal[] = [
  {
    id: "grounded-fix-demo-ai-panel",
    type: "chat-evidence",
    title: "Evidence panel needs preview handoff",
    summary: "Grounded recommendations should copy a Safe Patch Preview prompt without auto-send or mutation.",
    sourceType: "evidence-grounded-chat",
    sourceId: "phase-29-demo-evidence",
    filePath: "src/app/ai/page.tsx",
    lineNumber: 1,
    confidence: 0.78,
    importance: "high",
    riskHints: ["chat route/hook", "UI page/component"],
  },
  {
    id: "grounded-fix-demo-stale-memory",
    type: "memory-candidate",
    title: "Memory is context only",
    summary: "Older memory may suggest a fix but current files must be verified first.",
    sourceType: "evidence-memory",
    sourceId: "phase-29-demo-memory",
    filePath: "src/lib/codexforge/grounded-fix/index.ts",
    confidence: 0.42,
    importance: "medium",
    warnings: ["Weak evidence warning", "Stale evidence warning"],
    riskHints: ["memory/merge file"],
  },
];

export function GroundedFixRecommendationPanel({
  signals: rawSignals = demoSignals,
  manualGoal = "Recommend a grounded fix and prepare Safe Patch Preview handoff only.",
  onCopyPrompt,
  onUsePrompt,
  compact = false,
}: GroundedFixRecommendationPanelProps) {
  const model = useMemo(() => {
    const signals = normalizeFixSignals(rawSignals);
    const candidates = rankGroundedFixCandidates(buildGroundedFixCandidates({ signals, manualGoal }));
    const topCandidate = candidates[0] ?? null;
    const policy = buildGroundedFixRecommendationPolicy({ signals, candidates, manualGoal });
    const summary = buildGroundedFixRecommendationSummary({ signals, candidates, policy });
    const riskBoard = topCandidate ? buildGroundedFixRiskBoard({ candidate: topCandidate, signals }) : null;
    const impact = topCandidate ? buildGroundedFixFileImpact(topCandidate) : null;
    const handoff = topCandidate ? buildGroundedFixPreviewHandoff(topCandidate) : null;
    return { signals, candidates, topCandidate, policy, summary, riskBoard, impact, handoff };
  }, [manualGoal, rawSignals]);

  return (
    <section
      data-codexforge-grounded-fix-recommendation-panel="GroundedFixRecommendationPanel renders Grounded Fix Recommendation evidence is context, not proof verify current files preview diff only Safe Patch Preview no file writes without approval preserve latest-message authority"
      style={panel}
    >
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Grounded Fix Recommendation</span>
          <h2 style={heading}>Reviewed fix recommendation engine</h2>
          <p style={body}>
            Evidence, file intelligence, task readiness, and manual goals become reviewed recommendations only. The panel
            can copy a fix prompt but does not auto-send, run commands, write files, apply diffs, or mutate memory.
          </p>
        </div>
        <span style={pill}>{model.summary.candidateCount} candidates</span>
      </div>

      <GroundedFixSafetyNotice />
      <div style={grid}>
        <FixSignalPanel signals={model.signals} />
        <FixCandidatePanel candidates={model.candidates} />
      </div>
      {model.topCandidate && model.riskBoard ? (
        <div style={grid}>
          <FixRiskPanel riskBoard={model.riskBoard} />
          <FixConfidencePanel candidate={model.topCandidate} />
        </div>
      ) : null}
      {compact ? null : model.impact ? <FixFileImpactPanel impact={model.impact} /> : null}
      <FixRecommendationPolicyPanel policy={model.policy} />
      {model.handoff ? (
        <FixPreviewHandoffPanel handoff={model.handoff} onCopyPrompt={onCopyPrompt} onUsePrompt={onUsePrompt} />
      ) : null}
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
