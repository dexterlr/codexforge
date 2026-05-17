import {
  buildApplyDiffDryRunStableKey,
  uniqueApplyDiffDryRunStrings,
  type ApplyDiffDryRunInput,
  type ApplyDiffDryRunPolicy,
  type ApplyDiffDryRunSimulation,
  type ApplyDryRunConflictCheck,
  type ApplyDryRunFileImpact,
  type ApplyDryRunResult,
  type ApplyDryRunResultStatus,
} from "./apply-dry-run-types";

function selectResultStatus(args: {
  input: ApplyDiffDryRunInput;
  policy: ApplyDiffDryRunPolicy;
  simulation: ApplyDiffDryRunSimulation;
  conflictCheck: ApplyDryRunConflictCheck;
}): ApplyDryRunResultStatus {
  if (args.simulation.status === "invalid") return "invalid";
  if (!args.policy.allowed) return args.simulation.status === "ready-for-real-patch-review" ? "blocked" : args.simulation.status;
  if (args.conflictCheck.blockerCount > 0) return "conflict-risk";
  if (args.input.realPatchAvailabilityState === "reviewed") return "dry-run-complete";
  return args.simulation.status;
}

function requiredNextSteps(args: {
  input: ApplyDiffDryRunInput;
  status: ApplyDryRunResultStatus;
  conflictCheck: ApplyDryRunConflictCheck;
}): string[] {
  const steps: string[] = [];
  if (!args.input.approvalPacketExplicit) steps.push("Attach explicit approval packet.");
  if (args.input.currentFileVerificationState !== "verified-current") steps.push("Verify current target files.");
  if (args.input.rollbackPlan.length < 1) steps.push("Add rollback plan.");
  if (args.input.verificationPlan.length < 1) steps.push("Add verification plan.");
  if (args.input.realPatchAvailabilityState !== "reviewed") steps.push("Provide reviewed real patch before any future apply.");
  if (args.conflictCheck.items.some((item) => item.kind === "stale-evidence")) steps.push("Refresh stale evidence against current files.");
  if (args.status === "dry-run-complete") steps.push("Review dry-run result; future executor boundary still blocks mutation.");
  if (steps.length === 0) steps.push("Review dry-run result and keep actual apply-diff blocked.");
  return uniqueApplyDiffDryRunStrings(steps);
}

export function buildApplyDryRunResult(args: {
  input: ApplyDiffDryRunInput;
  policy: ApplyDiffDryRunPolicy;
  simulation: ApplyDiffDryRunSimulation;
  fileImpact: ApplyDryRunFileImpact;
  conflictCheck: ApplyDryRunConflictCheck;
}): ApplyDryRunResult {
  const status = selectResultStatus(args);
  const blockedReasons = uniqueApplyDiffDryRunStrings([
    ...args.policy.blockedReasons,
    ...args.simulation.blockedReasons,
    ...args.conflictCheck.items.filter((item) => item.severity === "blocker").map((item) => item.detail),
  ]);
  const warnings = uniqueApplyDiffDryRunStrings([
    ...args.policy.warnings,
    ...args.simulation.warnings,
    ...args.conflictCheck.items.filter((item) => item.severity === "warning").map((item) => item.detail),
    ...args.fileImpact.items.map((item) => item.conflictWarning),
  ]);
  const ok = blockedReasons.length === 0 && status !== "blocked" && status !== "invalid" && status !== "conflict-risk";

  return normalizeApplyDryRunResult({
    id: `apply-diff-dry-run-result:${buildApplyDiffDryRunStableKey(args.input.id, status)}`,
    dryRunId: args.input.id,
    ok,
    status,
    summary: [
      ok ? "Dry run completed successfully as simulation only." : "Dry run is not ready.",
      `Result status ${status}; no real apply success is claimed.`,
      "Simulation only: actual apply-diff remains blocked.",
    ],
    blockedReasons,
    warnings,
    targetFiles: [...args.input.targetFiles],
    simulatedOperations: [...args.simulation.operations],
    requiredNextSteps: requiredNextSteps({ input: args.input, status, conflictCheck: args.conflictCheck }),
    futureExecutorBoundary:
      "Future executor boundary: this result cannot apply patches, write files, run commands, call broker-execution, or claim real apply success.",
    simulationOnly: true,
  });
}

export function normalizeApplyDryRunResult(result: ApplyDryRunResult): ApplyDryRunResult {
  return {
    ...result,
    blockedReasons: uniqueApplyDiffDryRunStrings(result.blockedReasons),
    warnings: uniqueApplyDiffDryRunStrings(result.warnings),
    targetFiles: uniqueApplyDiffDryRunStrings(result.targetFiles),
    requiredNextSteps: uniqueApplyDiffDryRunStrings(result.requiredNextSteps),
    simulatedOperations: [...result.simulatedOperations],
    simulationOnly: true,
  };
}

export function summarizeApplyDryRunResult(result: ApplyDryRunResult): string[] {
  return [
    `Result ${result.id}: ok=${result.ok}; status=${result.status}.`,
    `${result.targetFiles.length} target file(s), ${result.simulatedOperations.length} simulated operation(s).`,
    `${result.blockedReasons.length} blocked reason(s), ${result.warnings.length} warning(s).`,
    "This is simulation only and does not fabricate real apply success.",
  ];
}
