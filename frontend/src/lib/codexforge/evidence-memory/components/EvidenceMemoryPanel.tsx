import type { CSSProperties } from "react";
import {
  buildEvidenceBrainMergeCandidate,
  buildEvidenceMemoryCandidates,
  buildEvidenceMemoryReviewPolicy,
  buildEvidenceMemorySummary,
  buildEvidenceSourceTrace,
  normalizeReadOnlyExecutionEvidence,
  type EvidenceMemoryInput,
} from "../index";
import { EvidenceBrainMergePanel } from "./EvidenceBrainMergePanel";
import { EvidenceConfidencePanel } from "./EvidenceConfidencePanel";
import { EvidenceMemoryCandidatePanel } from "./EvidenceMemoryCandidatePanel";
import { EvidenceMemorySafetyNotice } from "./EvidenceMemorySafetyNotice";
import { EvidenceReviewPolicyPanel } from "./EvidenceReviewPolicyPanel";
import { EvidenceSourceTracePanel } from "./EvidenceSourceTracePanel";
import { EvidenceSummaryPanel } from "./EvidenceSummaryPanel";

const defaultEvidenceInput: EvidenceMemoryInput = {
  request: {
    requestId: "phase-27-evidence-memory-request",
    taskId: "phase-27-read-only-execution-evidence-to-memory",
    stepId: "review-read-only-evidence-memory",
    selectedReadOnlyTool: "search-project",
  },
  result: {
    id: "phase-27-evidence-memory-result",
    requestId: "phase-27-evidence-memory-request",
    toolName: "search-project",
    ok: true,
    status: "completed",
    summary: "Read-only execution evidence is ready to become reviewable memory candidates.",
    evidenceSnippets: [
      "ReadOnlyStepExecutionPanel captures visible read-only evidence.",
      "Memory review requires explicit approval before promotion.",
      "Brain merge review remains preview-only until approved.",
    ],
    filePaths: [
      "src/app/tasks/page-client.tsx",
      "src/app/memory/page-client.tsx",
      "src/app/brain/page-client.tsx",
    ],
    matchedLines: [
      {
        id: "phase-27-evidence-memory-match:tasks",
        path: "src/app/tasks/page-client.tsx",
        line: 12,
        preview: "Read-only execution evidence can be reviewed before memory promotion.",
        matchText: "Read-only execution evidence",
      },
    ],
    warnings: ["Review required before memory promotion; no graph mutation from evidence UI."],
    errorMessage: null,
    nextSafeAction: "Review execution evidence before memory promotion.",
    raw: null,
  },
};

export function EvidenceMemoryPanel({
  input,
  compact = false,
}: {
  input?: EvidenceMemoryInput;
  compact?: boolean;
}) {
  const evidence = normalizeReadOnlyExecutionEvidence(input ?? defaultEvidenceInput);
  const candidates = buildEvidenceMemoryCandidates(evidence);
  const policy = buildEvidenceMemoryReviewPolicy(candidates);
  const brainMergeCandidate = buildEvidenceBrainMergeCandidate(candidates.slice(0, compact ? 2 : 5));
  const trace = buildEvidenceSourceTrace({
    evidence,
    candidates,
    brainMergeCandidate,
  });
  const summary = buildEvidenceMemorySummary({
    evidence,
    candidates,
    policy,
  });

  return (
    <section
      style={panel}
      data-codexforge-evidence-memory-panel="EvidenceMemoryPanel renders Evidence Memory Review required before memory promotion no graph mutation memory is context, not authority Brain merge review required"
    >
      <div style={header}>
        <div style={titleBlock}>
          <span style={eyebrow}>CodexForge Phase 27</span>
          <h2 style={title}>Evidence Memory</h2>
          <p style={copy}>
            Read-only execution evidence is normalized into evidence summaries, memory candidates, source traces,
            and preview-only Brain merge candidate data. Review required before memory promotion.
          </p>
        </div>
        <span style={badge}>no graph mutation</span>
      </div>

      <EvidenceMemorySafetyNotice />
      <EvidenceSummaryPanel summary={summary} />
      <div style={layout}>
        <div style={mainColumn}>
          <EvidenceMemoryCandidatePanel candidates={candidates} compact={compact} />
          <EvidenceConfidencePanel evidence={evidence.items} candidates={candidates} />
        </div>
        <aside style={sideColumn}>
          <EvidenceSourceTracePanel trace={trace} />
          <EvidenceReviewPolicyPanel policy={policy} />
          <EvidenceBrainMergePanel candidate={brainMergeCandidate} />
        </aside>
      </div>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { color: "#f8fafc", border: "1px solid rgba(45,212,191,0.22)", background: "linear-gradient(135deg, rgba(5,13,29,0.94), rgba(15,23,42,0.74))", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12, alignItems: "start", minWidth: 0 };
const titleBlock: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 24, lineHeight: 1.1, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safeText };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.14)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, ...safeText };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(min(100%, 470px), 0.95fr)", gap: 14, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
