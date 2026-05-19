import { isValidationCommandAllowlisted, isSmokeCodexForgeScriptCommand } from "./validation-command-catalog";
import {
  buildValidationRunnerStableId,
  uniqueValidationRunnerStrings,
  type ValidationRunApproval,
  type ValidationRunPolicy,
  type ValidationRunRequest,
} from "./validation-runner-types";

const DESTRUCTIVE_TOKENS = /\b(rm|del|erase|rmdir|remove-item|move-item|copy-item|set-content|add-content|out-file|git\s+clean|git\s+reset|git\s+checkout|git\s+restore|git\s+revert|apply-diff|write-file)\b/i;
const NETWORK_TOKENS = /\b(curl|wget|invoke-webrequest|iwr|invoke-restmethod|irm|fetch|http:\/\/|https:\/\/|ssh|scp|ftp)\b/i;
const CHAINING_TOKENS = /(&&|\|\||;|`|\|)/;
const PATH_TRAVERSAL = /(^|[\\/])\.\.([\\/]|$)/;

function commandBlockedReasons(command: string): string[] {
  const blocked: string[] = [];
  const exactAllowlisted = isValidationCommandAllowlisted(command);
  if (!exactAllowlisted) blocked.push(`Policy blocks unknown command: ${command}`);
  if (CHAINING_TOKENS.test(command) && !exactAllowlisted) blocked.push(`Policy blocks command chaining: ${command}`);
  if (PATH_TRAVERSAL.test(command)) blocked.push(`Policy blocks path traversal: ${command}`);
  if (NETWORK_TOKENS.test(command)) blocked.push(`Policy blocks external network token: ${command}`);
  if (DESTRUCTIVE_TOKENS.test(command)) blocked.push(`Policy blocks destructive or write token: ${command}`);
  if (command.includes("broker-execution")) blocked.push("Policy blocks broker execution.");
  if (command.includes("apply-diff")) blocked.push("Policy blocks apply-diff.");
  if (command.includes("write-file")) blocked.push("Policy blocks write-file.");
  if (command.toLowerCase().includes("powershell") && !isSmokeCodexForgeScriptCommand(command)) {
    blocked.push("Policy blocks arbitrary shell/script path outside scripts/smoke-codexforge-*.ps1.");
  }
  return blocked;
}

export function buildValidationRunPolicy(args: {
  request?: ValidationRunRequest | null;
  approval?: ValidationRunApproval | null;
  arbitraryShellAttempted?: boolean | null;
  brokerExecutionAttempted?: boolean | null;
  applyDiffAttempted?: boolean | null;
  writeFileAttempted?: boolean | null;
  brainGraphMutationAttempted?: boolean | null;
}): ValidationRunPolicy {
  const request = args.request ?? null;
  const approval = args.approval ?? null;
  const blocked: string[] = [];
  const warnings: string[] = [];
  if (!request) blocked.push("Policy requires validation request.");
  if (request && !request.validation.valid) blocked.push(...request.validation.blockedReasons);
  if (!approval?.approved) blocked.push("Policy blocks missing approval.");
  if (approval && !approval.readyForPolicy) blocked.push(...approval.missingAcknowledgements.map((item) => `Policy blocks ${item}.`));
  for (const command of request?.selectedCommands ?? []) blocked.push(...commandBlockedReasons(command.command));
  if (request?.selectedCommands.some((command) => !command.allowlisted)) blocked.push("Policy requires all commands to be allowlisted.");
  if (args.arbitraryShellAttempted === true) blocked.push("Policy blocks arbitrary shell.");
  if (args.brokerExecutionAttempted === true) blocked.push("Policy blocks broker execution.");
  if (args.applyDiffAttempted === true) blocked.push("Policy blocks apply-diff.");
  if (args.writeFileAttempted === true) blocked.push("Policy blocks write-file.");
  if (args.brainGraphMutationAttempted === true) blocked.push("Policy blocks Brain graph mutation.");
  if (request?.selectedCommands.some((command) => command.category === "unknown")) warnings.push("Unknown category commands remain blocked by default.");
  const blockedReasons = uniqueValidationRunnerStrings(blocked);
  const allowed = blockedReasons.length === 0;
  const policy: ValidationRunPolicy = {
    id: buildValidationRunnerStableId("validation-policy", request?.requestId ?? "missing-request", String(allowed)),
    allowed,
    requestReady: allowed,
    requestRequired: true,
    explicitApprovalRequired: true,
    allowlistRequired: true,
    arbitraryShellBlocked: true,
    commandChainingBlocked: true,
    pathTraversalBlocked: true,
    networkCommandsBlocked: true,
    destructiveCommandsBlocked: true,
    writeCommandsBlocked: true,
    brokerExecutionBlocked: true,
    applyDiffWriteFileBlocked: true,
    brainGraphMutationBlocked: true,
    outputCaptureAllowed: true,
    manualCopyFallbackAllowed: true,
    latestMessageAuthorityPreserved: true,
    blockedReasons,
    warnings: uniqueValidationRunnerStrings(warnings),
    nextSafeAction: allowed ? "Request-ready; copy commands or use guarded bridge if available." : "Resolve blocked reasons before validation run.",
    summary: [],
  };
  return { ...policy, summary: summarizeValidationRunPolicy(policy) };
}

export function isValidationRunAllowed(policy: ValidationRunPolicy): boolean {
  return policy.allowed && policy.requestReady && policy.blockedReasons.length === 0;
}

export function summarizeValidationRunPolicy(policy: ValidationRunPolicy): string[] {
  return [
    `Policy allowed=${policy.allowed}; requestReady=${policy.requestReady}.`,
    `${policy.blockedReasons.length} blocked reason(s), ${policy.warnings.length} warning(s).`,
    "No arbitrary shell, broker execution, apply-diff, write-file, Brain graph mutation, network command, destructive command, or unallowlisted command may run.",
    `Next safe action: ${policy.nextSafeAction}`,
  ];
}

export const validationPolicyTokenPatterns = {
  destructiveCommandBlockText: "destructive command block",
  approvalCheckText: "approval check",
  allowlistText: "allowlist",
};
