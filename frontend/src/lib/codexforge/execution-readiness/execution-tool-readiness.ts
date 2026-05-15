import {
  buildExecutionReadinessStableKey,
  uniqueExecutionReadinessStrings,
  type ExecutionReadinessInput,
  type ExecutionToolNeed,
  type ExecutionToolReadiness,
} from "./execution-readiness-types";

const READ_ONLY_TOOLS = ["read-file", "list-files", "search-project"];
const APPROVAL_REQUIRED_TOOLS = [
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
];
const BLOCKED_TOOLS = ["broker-execution"];
const PREVIEW_ONLY_TOOLS = [
  "render",
  "creative-render",
  "blender-python",
  "video-render",
];

function normalizeToolName(toolName: string): string {
  return toolName.trim().toLowerCase();
}

export function classifyExecutionToolNeed(toolName: string): ExecutionToolNeed {
  const normalized = normalizeToolName(toolName);

  if (READ_ONLY_TOOLS.includes(normalized)) {
    return {
      id: buildExecutionReadinessStableKey("execution-tool", normalized),
      toolName: normalized,
      posture: "read-only",
      approvalRequired: false,
      executionAllowed: true,
      reason: `${normalized} allowed as read-only readiness context.`,
    };
  }

  if (BLOCKED_TOOLS.includes(normalized)) {
    return {
      id: buildExecutionReadinessStableKey("execution-tool", normalized),
      toolName: normalized,
      posture: "blocked",
      approvalRequired: false,
      executionAllowed: false,
      reason: `${normalized} blocked by execution readiness policy.`,
    };
  }

  if (PREVIEW_ONLY_TOOLS.includes(normalized)) {
    return {
      id: buildExecutionReadinessStableKey("execution-tool", normalized),
      toolName: normalized,
      posture: "preview-only",
      approvalRequired: true,
      executionAllowed: false,
      reason: `${normalized} is preview-only unless a future explicit capability gate allows it.`,
    };
  }

  if (APPROVAL_REQUIRED_TOOLS.includes(normalized)) {
    return {
      id: buildExecutionReadinessStableKey("execution-tool", normalized),
      toolName: normalized,
      posture: "approval-required",
      approvalRequired: true,
      executionAllowed: false,
      reason: `${normalized} requires explicit approval before future execution.`,
    };
  }

  return {
    id: buildExecutionReadinessStableKey("execution-tool", normalized || "unknown"),
    toolName: normalized || "unknown-tool",
    posture: "approval-required",
    approvalRequired: true,
    executionAllowed: false,
    reason: "Unknown execution tool requires explicit approval and review before use.",
  };
}

function collectToolNames(input: ExecutionReadinessInput): string[] {
  const names = [
    ...READ_ONLY_TOOLS,
    "broker-execution",
    input.mutationIntent === "file-mutation" ? "write-file" : "",
    input.mutationIntent === "apply-diff" || input.mutationIntent === "file-mutation"
      ? "apply-diff"
      : "",
    input.commandIntent === "run-command" ? "run-command" : "",
    input.commandIntent === "run-tests" || input.suggestedTests.length > 0 ? "run-tests" : "",
    input.commandIntent === "build-web-app" ||
    input.suggestedTests.some((test) => test.toLowerCase().includes("npm run build"))
      ? "build-web-app"
      : "",
    input.executionIntent === "creative-preview" ? "render" : "",
    input.executionIntent === "creative-preview" ? "creative-render" : "",
  ];

  return uniqueExecutionReadinessStrings(names);
}

export function buildExecutionToolReadiness(
  input: ExecutionReadinessInput
): ExecutionToolReadiness {
  const tools = collectToolNames(input).map(classifyExecutionToolNeed);
  const draft: ExecutionToolReadiness = {
    id: "execution-tool-readiness",
    inputId: input.id,
    tools,
    readOnlyTools: tools
      .filter((tool) => tool.posture === "read-only")
      .map((tool) => tool.toolName),
    approvalRequiredTools: tools
      .filter((tool) => tool.posture === "approval-required")
      .map((tool) => tool.toolName),
    previewOnlyTools: tools
      .filter((tool) => tool.posture === "preview-only")
      .map((tool) => tool.toolName),
    blockedTools: tools
      .filter((tool) => tool.posture === "blocked")
      .map((tool) => tool.toolName),
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionToolReadiness(draft),
  };
}

export function summarizeExecutionToolReadiness(
  readiness: ExecutionToolReadiness
): string[] {
  return [
    `${readiness.readOnlyTools.join(", ")} are read-only readiness tools.`,
    `${readiness.approvalRequiredTools.length} tools require future explicit approval.`,
    `${readiness.previewOnlyTools.length} tools are preview-only and ${readiness.blockedTools.join(", ")} is blocked.`,
    "No tools are imported or executed by execution readiness.",
  ];
}
