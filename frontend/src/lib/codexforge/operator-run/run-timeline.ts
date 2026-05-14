import type { OperatorRunStatus, OperatorRunTimelineItem, OperatorRunTimelineStage } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

const TIMELINE: Array<{ stage: OperatorRunTimelineStage; label: string; summary: string; status: OperatorRunStatus }> = [
  { stage: "drafted", label: "Run drafted", summary: "Operator intent is captured as a local preview run.", status: "draft" },
  { stage: "plan-prepared", label: "Plan prepared", summary: "Steps, target capability, and expected artifacts are assembled.", status: "preview" },
  { stage: "policy-checked", label: "Policy checked", summary: "Adapter policy, side effects, and blocked actions are evaluated.", status: "preview" },
  { stage: "approval-boundary", label: "Approval boundary reached", summary: "Any external or local-app execution is gated.", status: "waiting-approval" },
  { stage: "artifact-preview", label: "Artifact preview generated", summary: "Ledger entries are previews only and do not write files.", status: "completed-preview" },
  { stage: "future-execution-gated", label: "Future execution gated", summary: "Replay can be used later after approval and worker wiring.", status: "blocked" },
];

export function buildRunTimelineItem(runId: string, stage: OperatorRunTimelineStage): OperatorRunTimelineItem {
  const item = TIMELINE.find((entry) => entry.stage === stage) ?? TIMELINE[0];
  return { ...item, id: buildOperatorRunReactKey(runId, item.stage) };
}

export function buildRunTimeline(runId: string): OperatorRunTimelineItem[] {
  return TIMELINE.map((item) => buildRunTimelineItem(runId, item.stage));
}

export function summarizeRunTimeline(timeline: OperatorRunTimelineItem[]): string {
  return `${timeline.length} preview timeline events; execution remains gated.`;
}
