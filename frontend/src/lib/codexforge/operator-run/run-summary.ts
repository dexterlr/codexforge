import { getCodexForgeToolAdapter } from "@/lib/codexforge/tools/tool-adapter-registry";
import type { OperatorRun, OperatorRunInput, OperatorRunSideEffectLevel, OperatorRunStep } from "./run-types";
import { buildOperatorRunReactKey, normalizeOperatorRunId } from "./run-types";
import { buildRunArtifactLedger } from "./run-artifacts";
import { buildRunContext } from "./run-context";
import { buildRunPolicyBoundary, isRunExecutionBlocked } from "./run-policy";
import { buildRunReadiness } from "./run-readiness";
import { buildRunReplay } from "./run-replay";
import { buildRunTimeline } from "./run-timeline";

function sideEffectFor(input: OperatorRunInput): OperatorRunSideEffectLevel {
  const toolName = input.toolName ?? input.adapter?.toolName ?? "render-job";
  const adapter = input.adapter ?? getCodexForgeToolAdapter(toolName);
  if (!adapter) return "none";
  if (adapter.sideEffect === "local-file-read") return "read-only";
  return adapter.sideEffect;
}

export function buildOperatorRunStep(args: {
  runId: string;
  label: string;
  summary: string;
  index: number;
  approvalRequired?: boolean;
}): OperatorRunStep {
  return {
    id: buildOperatorRunReactKey(args.runId, "step", args.index, args.label),
    label: args.label,
    summary: args.summary,
    status: args.approvalRequired ? "waiting-approval" : "preview",
    approvalRequired: args.approvalRequired === true,
  };
}

export function selectNextRunAction(run: Pick<OperatorRun, "policyBoundary" | "approvalState" | "status">): string {
  if (isRunExecutionBlocked(run.policyBoundary)) return "Keep preview-only; execution is blocked or not implemented.";
  if (run.approvalState === "required" || run.approvalState === "pending") return "Request explicit operator approval before future execution.";
  return "Review artifact ledger and replay packet.";
}

export function buildOperatorRun(input: OperatorRunInput = {}): OperatorRun {
  const toolName = input.toolName ?? input.adapter?.toolName ?? "render-job";
  const adapter = input.adapter ?? getCodexForgeToolAdapter(toolName);
  const id = normalizeOperatorRunId(input.id ?? `${input.sourceSurface ?? "creative"}-${toolName}`);
  const policyBoundary = buildRunPolicyBoundary({ ...input, toolName, adapter });
  const approvalState = policyBoundary.executionBlocked
    ? "blocked"
    : policyBoundary.approvalRequired
      ? "required"
      : "not-required";
  const status = policyBoundary.executionBlocked ? "blocked" : policyBoundary.approvalRequired ? "waiting-approval" : "completed-preview";
  const artifacts = buildRunArtifactLedger({ ...input, toolName, adapter }, id);
  const context = buildRunContext({ ...input, toolName, adapter });
  const replaySummary = buildRunReplay(input, policyBoundary, artifacts);
  const runShell = {
    id,
    policyBoundary,
    expectedArtifacts: artifacts,
    approvalState,
    context,
  } as Pick<OperatorRun, "id" | "policyBoundary" | "expectedArtifacts" | "approvalState" | "context">;
  const readiness = buildRunReadiness(runShell);
  const run = {
    id,
    title: input.title ?? "Operator run preview",
    sourceSurface: input.sourceSurface ?? "creative",
    capabilityId: input.capabilityId ?? adapter?.capability ?? "rendering",
    adapterId: input.adapterId ?? adapter?.adapter ?? "local-safe-render-job",
    toolName,
    status,
    approvalState,
    sideEffectLevel: sideEffectFor({ ...input, toolName, adapter }),
    riskLevel: policyBoundary.executionBlocked ? "blocked" : policyBoundary.approvalRequired ? "high" : "low",
    sourcePrompt: input.sourcePrompt ?? "Preview a safe operator run.",
    steps: [
      buildOperatorRunStep({ runId: id, index: 1, label: "Preview plan", summary: "Prepare deterministic run steps." }),
      buildOperatorRunStep({ runId: id, index: 2, label: "Policy boundary", summary: "Evaluate adapter policy.", approvalRequired: policyBoundary.approvalRequired }),
      buildOperatorRunStep({ runId: id, index: 3, label: "Artifact ledger", summary: "Record expected preview artifacts." }),
    ],
    timeline: buildRunTimeline(id),
    expectedArtifacts: artifacts,
    replaySummary,
    context,
    policyBoundary,
    readiness,
    safeNextAction: "Review artifact ledger and replay packet.",
  } satisfies OperatorRun;

  return { ...run, safeNextAction: selectNextRunAction(run) };
}

export function summarizeOperatorRun(run: OperatorRun): string {
  return `${run.title}: ${run.status}; ${run.safeNextAction}`;
}
