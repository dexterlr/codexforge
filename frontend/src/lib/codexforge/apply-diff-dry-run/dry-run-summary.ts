import { buildApplyDryRunConflictCheck } from "./dry-run-conflict-check";
import { buildApplyDryRunFileImpact } from "./dry-run-file-impact";
import { buildApplyDiffDryRunInput, validateApplyDiffDryRunInput } from "./dry-run-input";
import { buildApplyDryRunLedger } from "./dry-run-ledger";
import { buildApplyDiffDryRunPolicy } from "./dry-run-policy";
import { buildApplyDryRunResult } from "./dry-run-result";
import { simulateApplyDiffDryRun } from "./dry-run-simulator";
import type {
  ApplyDiffDryRunInputSource,
  ApplyDiffDryRunSession,
  ApplyDiffDryRunSummary,
  ApplyDryRunResult,
} from "./apply-dry-run-types";

export function buildApplyDiffDryRunSummary(result: ApplyDryRunResult): ApplyDiffDryRunSummary {
  const warningsCount = result.warnings.length;
  const blockedState = !result.ok;
  const conflictCount = result.status === "conflict-risk" ? 1 : 0;

  return {
    id: `apply-diff-dry-run-summary:${result.dryRunId}`,
    dryRunId: result.dryRunId,
    targetFileCount: result.targetFiles.length,
    simulatedOperationCount: result.simulatedOperations.length,
    blockedState,
    warningsCount,
    conflictCount,
    readinessStatus: result.status,
    nextSafeAction: blockedState
      ? "Review dry-run result, resolve blocked reasons, and keep mutation blocked."
      : "Review dry-run result; next safe action is real patch review, not apply.",
    summary: [
      `${result.targetFiles.length} target file(s), ${result.simulatedOperations.length} simulated operation(s).`,
      `Blocked=${blockedState}; warnings=${warningsCount}; readiness=${result.status}.`,
      "Next safe action: Review dry-run result.",
    ],
  };
}

export function buildApplyDiffDryRunReport(session: Omit<ApplyDiffDryRunSession, "dryRunReport">): string {
  return [
    "Apply-Diff Dry Run report",
    "",
    "Simulation only.",
    "No mutation.",
    "Actual apply-diff remains blocked.",
    "Pseudo diff alone is not applyable.",
    "Current file verification required.",
    "Rollback plan required.",
    "Preserve latest-message authority.",
    "",
    `Dry run: ${session.input.id}`,
    `Apply gate: ${session.input.applyGateId}`,
    `Approval packet: ${session.input.approvalPacketId}`,
    `Queue item: ${session.input.queueItemId}`,
    `Goal: ${session.input.goal}`,
    `Targets: ${session.input.targetFiles.join(", ")}`,
    `Patch source state: ${session.input.patchSourceState}`,
    `Real patch availability: ${session.input.realPatchAvailabilityState}`,
    `Policy allowed for simulation: ${session.policy.allowed}`,
    `Simulation status: ${session.simulation.status}`,
    `Result status: ${session.result.status}`,
    `Blocked reasons: ${session.result.blockedReasons.join("; ") || "none"}`,
    `Warnings: ${session.result.warnings.join("; ") || "none"}`,
    `Required next steps: ${session.result.requiredNextSteps.join("; ")}`,
    session.result.futureExecutorBoundary,
  ].join("\n");
}

export function buildApplyDiffDryRunSession(source: ApplyDiffDryRunInputSource): ApplyDiffDryRunSession {
  const input = buildApplyDiffDryRunInput(source);
  const validation = validateApplyDiffDryRunInput(input);
  const policy = buildApplyDiffDryRunPolicy(input);
  const simulation = simulateApplyDiffDryRun(input, policy);
  const fileImpact = buildApplyDryRunFileImpact(input, simulation.operations);
  const conflictCheck = buildApplyDryRunConflictCheck(input);
  const result = buildApplyDryRunResult({ input, policy, simulation, fileImpact, conflictCheck });
  const ledger = buildApplyDryRunLedger({ input, policy, simulation, fileImpact, conflictCheck, result });
  const summary = buildApplyDiffDryRunSummary(result);
  const partial = { input, validation, policy, simulation, fileImpact, conflictCheck, result, ledger, summary };
  const dryRunReport = buildApplyDiffDryRunReport(partial);

  return { ...partial, dryRunReport };
}

export function summarizeApplyDiffDryRunSession(session: ApplyDiffDryRunSession): string[] {
  return [
    ...session.summary.summary,
    `Simulation only=${session.result.simulationOnly}; result ok=${session.result.ok}.`,
    "Dry-run report can be copied, but it is not auto-sent, no checks are run, and no files are written.",
  ];
}
