import { isValidationRunAllowed } from "./validation-run-policy";
import {
  buildValidationRunnerStableId,
  type ValidationExecutionBridge,
  type ValidationExecutionResult,
  type ValidationExecutionStatus,
  type ValidationRunApproval,
  type ValidationRunPolicy,
  type ValidationRunPreflight,
  type ValidationRunRequest,
} from "./validation-runner-types";

export type GuardedValidationRunHandler = (input: {
  request: ValidationRunRequest;
  approval: ValidationRunApproval;
  policy: ValidationRunPolicy;
  preflight: ValidationRunPreflight;
}) => Promise<{ outputs?: ValidationExecutionResult["outputs"]; warnings?: string[]; errors?: string[] }>;

function statusFromInputs(args: {
  approval: ValidationRunApproval;
  policy: ValidationRunPolicy;
  preflight: ValidationRunPreflight;
  guardedRunApiAvailable: boolean;
}): ValidationExecutionStatus {
  if (!args.approval.approved) return "approval-required";
  if (!isValidationRunAllowed(args.policy)) return "policy-blocked";
  if (args.preflight.blockerCount > 0) return "preflight-failed";
  if (!args.guardedRunApiAvailable) return "manual-only";
  return "request-ready";
}

export function buildValidationExecutionBridge(args: {
  request: ValidationRunRequest;
  approval: ValidationRunApproval;
  policy: ValidationRunPolicy;
  preflight: ValidationRunPreflight;
  guardedRunApiAvailable?: boolean | null;
}): ValidationExecutionBridge {
  const guardedRunApiAvailable = args.guardedRunApiAvailable === true;
  const status = statusFromInputs({ approval: args.approval, policy: args.policy, preflight: args.preflight, guardedRunApiAvailable });
  const blockedReasons = [
    status === "approval-required" ? "Explicit approval required." : null,
    status === "policy-blocked" ? "Policy blocked validation run." : null,
    status === "preflight-failed" ? "Preflight failed." : null,
    status === "manual-only" ? "No safe guarded operator run API exists; request-ready/manual-only with copyable commands." : null,
    ...args.policy.blockedReasons,
    ...args.approval.missingAcknowledgements,
  ].filter((item): item is string => Boolean(item));
  const canRequestRun = guardedRunApiAvailable && status === "request-ready";
  const bridge: ValidationExecutionBridge = {
    id: buildValidationRunnerStableId("validation-execution-bridge", args.request.requestId, status, String(guardedRunApiAvailable)),
    requestId: args.request.requestId,
    status,
    boundary: "guarded-validation-runner",
    guardedRunApiAvailable,
    canRequestRun,
    copyableCommands: args.request.selectedCommands.map((command) => command.command),
    blockedReasons: Array.from(new Set(blockedReasons)).sort(),
    safetyNotes: [
      "execution bridge does not execute on render",
      "execution bridge does not execute on module load",
      "UI must not call command execution directly",
      "No command execution without approval",
      "No file writes",
      "Brain graph and memory are not mutated",
    ],
    requestBodyPreview: canRequestRun
      ? { approved: true, requestId: args.request.requestId, commands: args.request.selectedCommands.map((command) => command.command), allowlist: true }
      : null,
    summary: [],
  };
  return { ...bridge, summary: summarizeValidationExecutionBridge(bridge) };
}

export async function executeApprovedValidationRun(args: {
  request: ValidationRunRequest;
  approval: ValidationRunApproval;
  policy: ValidationRunPolicy;
  preflight: ValidationRunPreflight;
  guardedRunHandler?: GuardedValidationRunHandler | null;
}): Promise<ValidationExecutionResult> {
  const bridge = buildValidationExecutionBridge({ ...args, guardedRunApiAvailable: Boolean(args.guardedRunHandler) });
  if (!args.approval.approved) return buildResult(args.request.requestId, "approval-required", [], bridge.blockedReasons, []);
  if (!isValidationRunAllowed(args.policy)) return buildResult(args.request.requestId, "policy-blocked", [], bridge.blockedReasons, args.policy.warnings);
  if (args.preflight.blockerCount > 0) return buildResult(args.request.requestId, "preflight-failed", [], bridge.blockedReasons, []);
  if (!args.guardedRunHandler) {
    return buildResult(args.request.requestId, "manual-only", [], bridge.blockedReasons, ["Manual copy fallback allowed."]);
  }
  try {
    const result = await args.guardedRunHandler(args);
    return buildResult(args.request.requestId, result.errors?.length ? "failed" : "completed", result.outputs ?? [], result.errors ?? [], result.warnings ?? []);
  } catch (error) {
    return buildResult(args.request.requestId, "failed", [], [error instanceof Error ? error.message : "Guarded validation handler failed."], []);
  }
}

function buildResult(
  requestId: string,
  status: ValidationExecutionStatus,
  outputs: ValidationExecutionResult["outputs"],
  errors: string[],
  warnings: string[]
): ValidationExecutionResult {
  const result: ValidationExecutionResult = {
    id: buildValidationRunnerStableId("validation-execution-result", requestId, status),
    requestId,
    status,
    completed: status === "completed",
    outputs,
    errors,
    warnings,
    summary: [],
  };
  return { ...result, summary: [`Execution status ${status}.`, status === "completed" ? "Guarded run completed." : "No completed success is fabricated.", `${errors.length} error(s), ${warnings.length} warning(s).`] };
}

export function summarizeValidationExecutionBridge(bridge: ValidationExecutionBridge): string[] {
  return [
    `Execution bridge status ${bridge.status}; canRequestRun=${bridge.canRequestRun}.`,
    bridge.guardedRunApiAvailable ? "Guarded validation API boundary available." : "No safe guarded run API is available; manual-only copy fallback.",
    `${bridge.blockedReasons.length} bridge blocked reason(s).`,
    "The bridge is the only validation domain place that may call guarded command execution, and this build is request-ready/manual-only.",
  ];
}
