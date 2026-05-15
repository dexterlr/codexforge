import { validateReadOnlyExecutionRequest } from "./read-only-execution-request";
import {
  READ_ONLY_EXECUTION_ALWAYS_BLOCKED_TOOLS,
  READ_ONLY_EXECUTION_CREATIVE_TOOLS,
  READ_ONLY_EXECUTION_ELIGIBLE_TOOLS,
  READ_ONLY_EXECUTION_EXTERNAL_TOOLS,
  READ_ONLY_EXECUTION_MUTATION_TOOLS,
  buildReadOnlyExecutionStableKey,
  type ReadOnlyExecutionPolicy,
  type ReadOnlyExecutionPolicyRule,
  type ReadOnlyExecutionPolicyRuleState,
  type ReadOnlyExecutionRequest,
} from "./read-only-execution-types";

function buildRule(
  id: string,
  label: string,
  state: ReadOnlyExecutionPolicyRuleState,
  detail: string
): ReadOnlyExecutionPolicyRule {
  return { id, label, state, detail };
}

function normalizeToolName(value: string): string {
  return value.trim().toLowerCase();
}

function isEligibleReadOnlyTool(toolName: string): boolean {
  return READ_ONLY_EXECUTION_ELIGIBLE_TOOLS.includes(toolName as never);
}

function isBlockedTool(toolName: string): boolean {
  return READ_ONLY_EXECUTION_ALWAYS_BLOCKED_TOOLS.includes(toolName);
}

function isMutationTool(toolName: string): boolean {
  return READ_ONLY_EXECUTION_MUTATION_TOOLS.includes(toolName);
}

function isCreativeTool(toolName: string): boolean {
  return READ_ONLY_EXECUTION_CREATIVE_TOOLS.includes(toolName);
}

function isExternalTool(toolName: string): boolean {
  return READ_ONLY_EXECUTION_EXTERNAL_TOOLS.includes(toolName);
}

export function buildReadOnlyExecutionPolicy(
  request: ReadOnlyExecutionRequest | null = null
): ReadOnlyExecutionPolicy {
  const toolName = normalizeToolName(request?.selectedReadOnlyTool ?? "");
  const validation = request ? validateReadOnlyExecutionRequest(request) : null;
  const requestValid = validation?.valid === true;
  const eligible = request ? isEligibleReadOnlyTool(toolName) : false;
  const blockedByName = request ? isBlockedTool(toolName) : false;
  const mutationTool = request ? isMutationTool(toolName) : false;
  const creativeTool = request ? isCreativeTool(toolName) : false;
  const externalTool = request ? isExternalTool(toolName) : false;
  const unknownTool =
    !!request &&
    !eligible &&
    !blockedByName &&
    !mutationTool &&
    !creativeTool &&
    !externalTool;
  const missingApproval = request?.approval.approved !== true;
  const missingToolInput = request?.toolInputPreview.hasInput !== true;
  const missingApprovedPreview = request?.fromApprovedStepRunnerPreview !== true;

  const blockedReasons = [
    request ? "" : "Read-only execution request is required.",
    requestValid ? "" : validation?.reasons.join(" "),
    eligible ? "" : `${toolName || "unknown-tool"} is not eligible for read-only execution.`,
    blockedByName ? "broker-execution is blocked." : "",
    mutationTool ? `${toolName} is a mutation or command tool and remains blocked.` : "",
    creativeTool ? `${toolName} is a creative/local-app tool and remains blocked.` : "",
    externalTool ? `${toolName} is an external API tool and remains blocked.` : "",
    unknownTool ? `${toolName} is unknown and remains blocked.` : "",
    missingApproval ? "Explicit read-only execution approval is required." : "",
    missingToolInput ? "Missing tool input blocks execution." : "",
    missingApprovedPreview ? "Request must come from approved step runner preview." : "",
  ].filter((item): item is string => typeof item === "string" && item.trim().length > 0);

  const allowed =
    !!request &&
    requestValid &&
    eligible &&
    !blockedByName &&
    !mutationTool &&
    !creativeTool &&
    !externalTool &&
    !unknownTool &&
    !missingApproval &&
    !missingToolInput &&
    !missingApprovedPreview;

  const rules: ReadOnlyExecutionPolicyRule[] = [
    buildRule(
      "eligible-read-only-tools",
      "Only read-only tools are eligible",
      eligible ? "passed" : "blocked",
      "read-file, list-files, search-project, and snapshot-project are the only eligible tools."
    ),
    buildRule(
      "explicit-approval-required",
      "Explicit approval required",
      missingApproval ? "approval-required" : "passed",
      "Read-only execution is approval-gated and never auto-approved."
    ),
    buildRule(
      "tool-input-required",
      "Tool input required",
      missingToolInput ? "blocked" : "passed",
      "Missing tool input blocks execution so the operator can inspect the exact request."
    ),
    buildRule(
      "approved-step-runner-preview-required",
      "Approved Step Runner Preview required",
      missingApprovedPreview ? "blocked" : "passed",
      "Request must come from approved step runner preview before a read-only run can be attempted."
    ),
    buildRule(
      "mutation-tools-blocked",
      "Mutation tools blocked",
      mutationTool ? "blocked" : "passed",
      "write-file, apply-diff, run-command, run-tests, build-web-app, and generate-diff remain blocked."
    ),
    buildRule(
      "broker-execution-blocked",
      "broker-execution blocked",
      blockedByName ? "blocked" : "passed",
      "broker-execution remains blocked and cannot be unlocked by this policy."
    ),
    buildRule(
      "creative-tools-blocked",
      "Creative tools blocked",
      creativeTool ? "blocked" : "passed",
      "blender-python, unreal-editor-command, comfyui-workflow-run, render-job, video-render, and deck-export remain blocked."
    ),
    buildRule(
      "external-api-blocked",
      "external-api blocked",
      externalTool ? "blocked" : "passed",
      "external-api and unknown external network tools remain blocked."
    ),
    buildRule(
      "visible-capture-required",
      "Visible result capture required",
      "passed",
      "Result, evidence, and ledger must be captured visibly after execution."
    ),
    buildRule(
      "no-mutation-guarantees",
      "No file or graph mutation",
      "passed",
      "Read-only execution performs no file mutation and no Brain graph mutation."
    ),
  ];

  const policy: ReadOnlyExecutionPolicy = {
    id: "read-only-execution-policy",
    requestId: request?.requestId ?? "no-request",
    allowed,
    blocked: !allowed,
    eligibleTools: READ_ONLY_EXECUTION_ELIGIBLE_TOOLS,
    mutationTools: READ_ONLY_EXECUTION_MUTATION_TOOLS,
    creativeTools: READ_ONLY_EXECUTION_CREATIVE_TOOLS,
    externalTools: READ_ONLY_EXECUTION_EXTERNAL_TOOLS,
    blockedTools: READ_ONLY_EXECUTION_ALWAYS_BLOCKED_TOOLS,
    explicitReadOnlyExecutionApprovalRequired: true,
    mutationToolsBlocked: true,
    brokerExecutionBlocked: true,
    creativeToolsBlocked: true,
    externalApiBlocked: true,
    unknownToolsBlocked: true,
    missingApprovalBlocksExecution: missingApproval,
    missingToolInputBlocksExecution: missingToolInput,
    requiresApprovedStepRunnerPreview: true,
    requestFromApprovedStepRunnerPreview: request?.fromApprovedStepRunnerPreview === true,
    visibleResultCaptureRequired: true,
    noGraphMutation: true,
    noFileMutation: true,
    rules,
    blockedReasons,
    requiredApprovals: ["Explicit read-only execution approval required."],
    summary: [],
  };

  return {
    ...policy,
    summary: summarizeReadOnlyExecutionPolicy(policy),
  };
}

export function isReadOnlyExecutionAllowed(policy: ReadOnlyExecutionPolicy): boolean {
  return policy.allowed;
}

export function summarizeReadOnlyExecutionPolicy(
  policy: ReadOnlyExecutionPolicy
): string[] {
  return [
    policy.allowed
      ? "Read-only execution is allowed for this approved request."
      : "Read-only execution is blocked until request, approval, input, source, and tool policy pass.",
    "Only read-file, list-files, search-project, and snapshot-project are eligible.",
    "Mutation tools remain blocked: write-file, apply-diff, run-command, run-tests, build-web-app, and generate-diff.",
    "broker-execution, creative tools, external-api, and unknown tools are blocked; result capture is visible and no file mutation or graph mutation is allowed.",
  ];
}

export function buildReadOnlyExecutionPolicyRuleId(
  requestId: string,
  ruleId: string
): string {
  return buildReadOnlyExecutionStableKey("read-only-policy-rule", requestId, ruleId);
}
