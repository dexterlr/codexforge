import { buildReadOnlyExecutionPolicy } from "./read-only-execution-policy";
import { buildReadOnlyExecutionResult, normalizeReadOnlyExecutionResult } from "./read-only-execution-result";
import { buildReadOnlyToolRoute, classifyReadOnlyTool } from "./read-only-tool-router";
import type {
  ReadOnlyExecutionRequest,
  ReadOnlyExecutionResult,
  ReadOnlyJsonValue,
} from "./read-only-execution-types";

export type ReadOnlyExecuteRoutePayload = {
  toolName: string;
  mode: "execute";
  input: Record<string, ReadOnlyJsonValue>;
  context: {
    requestId: string;
    userIntent: string;
    metadata: {
      readOnlyStepExecution: true;
      taskId: string;
      stepId: string;
      source: string;
      noFileMutation: true;
      noGraphMutation: true;
    };
  };
  approvalState: {
    approved: boolean;
    approvalId: string | null;
    approvedBy: string;
    reason: string;
  };
  metadata: {
    readOnlyStepExecution: true;
    approvalRequired: true;
    mutationToolsRemainBlocked: true;
  };
};

export type ReadOnlyClientBridgeSummary = {
  title: string;
  allowedTools: string[];
  blockedMutationTools: string[];
  route: string;
  safety: string[];
};

function buildBlockedBridgeResult(args: {
  request: ReadOnlyExecutionRequest;
  reason: string;
}): ReadOnlyExecutionResult {
  return buildReadOnlyExecutionResult({
    request: args.request,
    status: "blocked",
    ok: false,
    summary: "Guarded read-only client bridge refused the request.",
    errorMessage: args.reason,
    nextSafeAction: "Use an approved read-only request with explicit approval and visible input.",
    raw: {
      bridgeRefused: true,
      reason: args.reason,
    },
  });
}

export function buildReadOnlyExecuteRoutePayload(
  request: ReadOnlyExecutionRequest
): ReadOnlyExecuteRoutePayload {
  const approvalId = request.approval.approvalId ?? request.requestId;

  return {
    toolName: request.selectedReadOnlyTool,
    mode: "execute",
    input: request.toolInputPreview.input,
    context: {
      requestId: request.requestId,
      userIntent: request.reason,
      metadata: {
        readOnlyStepExecution: true,
        taskId: request.taskId,
        stepId: request.stepId,
        source: request.source,
        noFileMutation: true,
        noGraphMutation: true,
      },
    },
    approvalState: {
      approved: request.approval.approved,
      approvalId,
      approvedBy: request.approval.approvedBy ?? "codexforge-operator",
      reason: request.approval.reason,
    },
    metadata: {
      readOnlyStepExecution: true,
      approvalRequired: true,
      mutationToolsRemainBlocked: true,
    },
  };
}

export async function executeApprovedReadOnlyStep(
  request: ReadOnlyExecutionRequest
): Promise<ReadOnlyExecutionResult> {
  const policy = buildReadOnlyExecutionPolicy(request);
  const route = buildReadOnlyToolRoute(request);
  const toolClass = classifyReadOnlyTool(request.selectedReadOnlyTool);

  if (!policy.allowed) {
    return buildBlockedBridgeResult({
      request,
      reason: policy.blockedReasons.join(" ") || "Read-only execution policy blocked the request.",
    });
  }

  if (!route.allowed || toolClass !== "eligible-read-only") {
    return buildBlockedBridgeResult({
      request,
      reason: route.reason,
    });
  }

  const payload = buildReadOnlyExecuteRoutePayload(request);

  try {
    const response = await fetch("/api/codexforge/tools/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => null);

    return normalizeReadOnlyExecutionResult({
      request,
      route,
      raw: body ?? {
        ok: false,
        error: `Read-only execute route returned HTTP ${response.status}.`,
      },
    });
  } catch (error) {
    return buildReadOnlyExecutionResult({
      request,
      route,
      status: "failed",
      ok: false,
      summary: "Read-only execute route request failed.",
      errorMessage:
        error instanceof Error && error.message.trim().length > 0
          ? error.message.trim()
          : "Unable to call the guarded local execute route.",
      nextSafeAction: "Keep the result blocked and retry only after reviewing the local route.",
      raw: {
        bridgeError: true,
      },
    });
  }
}

export function summarizeReadOnlyClientBridge(): ReadOnlyClientBridgeSummary {
  return {
    title: "Guarded Read-Only Client Bridge",
    allowedTools: ["read-file", "list-files", "search-project", "snapshot-project"],
    blockedMutationTools: [
      "write-file",
      "apply-diff",
      "run-command",
      "run-tests",
      "build-web-app",
      "generate-diff",
      "broker-execution",
      "external-api",
    ],
    route: "/api/codexforge/tools/execute",
    safety: [
      "Only called by explicit button click in UI.",
      "Refuses mutation, broker, creative, external, and unknown tools before fetch.",
      "Passes explicit approval state to the local execute route.",
      "Does not auto-run on render.",
    ],
  };
}
