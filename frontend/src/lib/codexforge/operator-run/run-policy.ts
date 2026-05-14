import { getCodexForgeToolAdapter } from "@/lib/codexforge/tools/tool-adapter-registry";
import type { OperatorRunInput, OperatorRunPolicyBoundary } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

const BLOCKED_FROM_RUN_CENTER = ["broker-execution", "write-file", "apply-diff", "run-command"];
const CONSENT_TOOLS = ["pc-bridge", "camera-inspect"];
const APPROVAL_TOOLS = ["blender-python", "unreal-editor-command", "comfyui-workflow-run", "render-job", "video-render"];

function normalizeToolName(input: OperatorRunInput): string {
  return (input.toolName ?? input.adapter?.toolName ?? "render-job").trim().toLowerCase();
}

export function buildRunPolicyBoundary(input: OperatorRunInput): OperatorRunPolicyBoundary {
  const toolName = normalizeToolName(input);
  const adapter = input.adapter ?? getCodexForgeToolAdapter(toolName);
  const adapterId = input.adapterId ?? adapter?.adapter ?? "operator-preview-adapter";
  const executionBlocked =
    BLOCKED_FROM_RUN_CENTER.includes(toolName) ||
    adapter?.blocksByDefault === true ||
    adapter?.sideEffect === "broker-action";
  const approvalRequired =
    executionBlocked ||
    adapter?.requiresApproval === true ||
    APPROVAL_TOOLS.includes(toolName) ||
    CONSENT_TOOLS.includes(toolName);

  const reasons = [
    "Preview is allowed in the Operator Run Center.",
    executionBlocked ? "Apply and execute actions are not implemented in this phase." : null,
    toolName === "broker-execution" ? "Broker execution is blocked." : null,
    CONSENT_TOOLS.includes(toolName) ? "PC bridge and camera tools require explicit session consent." : null,
    APPROVAL_TOOLS.includes(toolName) ? "External creative tools require approval before execution." : null,
    BLOCKED_FROM_RUN_CENTER.includes(toolName) ? "Write, apply, and command tools are blocked from this UI." : null,
  ].filter((item): item is string => !!item);

  return {
    id: buildOperatorRunReactKey("policy", toolName, adapterId),
    toolName,
    adapterId,
    executionBlocked,
    approvalRequired,
    previewAllowed: true,
    applyExecuteImplemented: false,
    reasons,
    nextAction: executionBlocked
      ? "Keep this run in preview and choose a non-executing artifact path."
      : approvalRequired
        ? "Review the preview and collect explicit approval before any future execution worker exists."
        : "Continue preview planning with no execution side effects.",
  };
}

export function isRunExecutionBlocked(boundary: OperatorRunPolicyBoundary): boolean {
  return boundary.executionBlocked || boundary.applyExecuteImplemented === false;
}

export function summarizeRunPolicyBoundary(boundary: OperatorRunPolicyBoundary): string {
  if (boundary.executionBlocked) return "Execution blocked; preview and replay only.";
  if (boundary.approvalRequired) return "Approval required before execution; preview allowed.";
  return "Preview allowed; no execution implementation is present.";
}
