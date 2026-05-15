import {
  buildStepRunnerPreviewStableKey,
  uniqueStepRunnerPreviewStrings,
  type StepRunnerInput,
  type StepRunnerToolMode,
  type StepRunnerToolPlan,
  type StepRunnerToolPlanItem,
} from "./step-runner-preview-types";

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
  "creative-render",
  "render",
  "video-render",
  "blender-python",
  "image-generation",
  "deck-export",
];

function normalizeToolName(toolName: string): string {
  return toolName.trim().toLowerCase() || "unknown-tool";
}

function approvalLabel(toolName: string, mode: StepRunnerToolMode): string | null {
  if (mode === "read-only" || mode === "blocked") return null;
  if (mode === "preview-only") return `future-capability-gate:${toolName}`;
  return `future-step-run-approval:${toolName}`;
}

export function classifyStepRunnerTool(toolName: string): StepRunnerToolPlanItem {
  const normalized = normalizeToolName(toolName);
  const id = buildStepRunnerPreviewStableKey("step-runner-tool", normalized);

  if (READ_ONLY_TOOLS.includes(normalized)) {
    return {
      id,
      toolName: normalized,
      mode: "read-only",
      reason: `${normalized} is a read-only planning tool for local context review.`,
      approvalRequired: false,
      blocked: false,
      sideEffectSummary: "No file mutation, command execution, network call, or Brain graph mutation.",
      safeAlternative: "Use this tool only to inspect context before future approval.",
      requiredApprovalLabel: null,
    };
  }

  if (BLOCKED_TOOLS.includes(normalized)) {
    return {
      id,
      toolName: normalized,
      mode: "blocked",
      reason: "broker-execution is always blocked by Step Runner Policy.",
      approvalRequired: false,
      blocked: true,
      sideEffectSummary: "Blocked capability; no future approval packet can unlock it in Phase 25.",
      safeAlternative: "Use read-file, list-files, or search-project to prepare a planning-only review.",
      requiredApprovalLabel: null,
    };
  }

  if (PREVIEW_ONLY_TOOLS.includes(normalized)) {
    return {
      id,
      toolName: normalized,
      mode: "preview-only",
      reason: `${normalized} remains preview-only unless a future capability gate allows it.`,
      approvalRequired: true,
      blocked: false,
      sideEffectSummary: "Creative output is described as expected future output only; nothing is rendered or exported.",
      safeAlternative: "Prepare a creative brief or artifact checklist without invoking creative execution.",
      requiredApprovalLabel: approvalLabel(normalized, "preview-only"),
    };
  }

  if (APPROVAL_REQUIRED_TOOLS.includes(normalized)) {
    const sideEffect =
      normalized === "write-file" || normalized === "apply-diff"
        ? "Would mutate files in a future run; Phase 25 only prepares Safe Patch Preview requirements."
        : "Would run commands or tests in a future run; Phase 25 only prepares a dry run plan.";

    return {
      id,
      toolName: normalized,
      mode: "approval-required",
      reason: `${normalized} requires future explicit approval before any run.`,
      approvalRequired: true,
      blocked: false,
      sideEffectSummary: sideEffect,
      safeAlternative: "Prepare an approval packet and dry run plan without executing the tool.",
      requiredApprovalLabel: approvalLabel(normalized, "approval-required"),
    };
  }

  return {
    id,
    toolName: normalized,
    mode: "approval-required",
    reason: "Unknown tool intent requires explicit review and approval before any future run.",
    approvalRequired: true,
    blocked: false,
    sideEffectSummary: "Unknown side effects are treated as approval-required and not executed.",
    safeAlternative: "Use read-file, list-files, or search-project for deterministic preview planning.",
    requiredApprovalLabel: approvalLabel(normalized, "approval-required"),
  };
}

function collectToolNames(input: StepRunnerInput): string[] {
  const intentTools = [
    input.selectedToolIntent,
    input.mutationIntent === "file-mutation" ? "write-file" : "",
    input.mutationIntent === "apply-diff" ? "apply-diff" : "",
    input.commandIntent === "run-command" ? "run-command" : "",
    input.commandIntent === "run-tests" ? "run-tests" : "",
    input.commandIntent === "build-web-app" ? "build-web-app" : "",
    input.taskDomain === "movie" || input.taskDomain === "video" ? "creative-render" : "",
    input.taskDomain === "comfyui" || input.taskDomain === "unreal" ? "render" : "",
  ];

  return uniqueStepRunnerPreviewStrings([
    ...READ_ONLY_TOOLS,
    ...intentTools,
    "broker-execution",
  ]);
}

export function buildStepRunnerToolPlan(input: StepRunnerInput): StepRunnerToolPlan {
  const proposedTool = classifyStepRunnerTool(input.selectedToolIntent);
  const byId = new Map<string, StepRunnerToolPlanItem>();

  for (const tool of [proposedTool, ...collectToolNames(input).map(classifyStepRunnerTool)]) {
    byId.set(tool.id, tool);
  }

  const tools = Array.from(byId.values()).sort((left, right) =>
    left.toolName.localeCompare(right.toolName)
  );
  const draft: StepRunnerToolPlan = {
    id: "step-runner-tool-plan",
    inputId: input.id,
    proposedTool,
    tools,
    readOnlyTools: tools
      .filter((tool) => tool.mode === "read-only")
      .map((tool) => tool.toolName),
    previewOnlyTools: tools
      .filter((tool) => tool.mode === "preview-only")
      .map((tool) => tool.toolName),
    approvalRequiredTools: tools
      .filter((tool) => tool.mode === "approval-required")
      .map((tool) => tool.toolName),
    blockedTools: tools
      .filter((tool) => tool.mode === "blocked")
      .map((tool) => tool.toolName),
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerToolPlan(draft),
  };
}

export function summarizeStepRunnerToolPlan(plan: StepRunnerToolPlan): string[] {
  return [
    `Proposed tool ${plan.proposedTool.toolName} is ${plan.proposedTool.mode}.`,
    `${plan.readOnlyTools.join(", ")} are read-only planning tools.`,
    `${plan.approvalRequiredTools.length} tools require future explicit approval and ${plan.previewOnlyTools.length} tools are preview-only.`,
    `${plan.blockedTools.join(", ")} is blocked; no tools are imported or executed by Step Runner Preview.`,
  ];
}
