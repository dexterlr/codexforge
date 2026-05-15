import {
  READ_ONLY_EXECUTION_ALWAYS_BLOCKED_TOOLS,
  READ_ONLY_EXECUTION_CREATIVE_TOOLS,
  READ_ONLY_EXECUTION_ELIGIBLE_TOOLS,
  READ_ONLY_EXECUTION_EXTERNAL_TOOLS,
  READ_ONLY_EXECUTION_MUTATION_TOOLS,
  buildReadOnlyExecutionStableKey,
  normalizeReadOnlyJsonRecord,
  type ReadOnlyExecutionExpectedResultKind,
  type ReadOnlyExecutionRequest,
  type ReadOnlyExecutionToolClass,
  type ReadOnlyToolRoute,
  type ReadOnlyToolRouteMode,
} from "./read-only-execution-types";

function normalizeToolName(value: string): string {
  return value.trim().toLowerCase() || "unknown-tool";
}

function expectedResultKind(toolName: string): ReadOnlyExecutionExpectedResultKind {
  if (toolName === "read-file") return "file-content";
  if (toolName === "list-files") return "file-list";
  if (toolName === "search-project") return "search-results";
  if (toolName === "snapshot-project") return "project-snapshot";
  return "blocked-result";
}

function routeModeForClass(toolClass: ReadOnlyExecutionToolClass): ReadOnlyToolRouteMode {
  if (toolClass === "eligible-read-only") return "read-only-local-execute";
  if (toolClass === "mutation") return "blocked-mutation";
  if (toolClass === "broker") return "blocked-broker";
  if (toolClass === "creative") return "blocked-creative";
  if (toolClass === "external") return "blocked-external";
  return "blocked-unknown";
}

function evidenceLabelsForTool(toolName: string): string[] {
  if (toolName === "read-file") {
    return ["file", "path", "summary", "warning", "error"];
  }
  if (toolName === "list-files") {
    return ["path", "summary", "warning", "error"];
  }
  if (toolName === "search-project") {
    return ["path", "line", "match", "summary", "warning", "error"];
  }
  if (toolName === "snapshot-project") {
    return ["file", "path", "summary", "warning", "error"];
  }

  return ["summary", "error"];
}

function safeFallbackForClass(toolClass: ReadOnlyExecutionToolClass): string {
  if (toolClass === "eligible-read-only") {
    return "Capture the read-only result, evidence snippets, and ledger entry visibly.";
  }
  if (toolClass === "mutation") {
    return "Use read-file, list-files, search-project, or snapshot-project instead; mutation tools remain blocked.";
  }
  if (toolClass === "broker") {
    return "Use local read-only project inspection only; broker execution remains blocked.";
  }
  if (toolClass === "creative") {
    return "Prepare a static planning note instead of running creative or local-app tooling.";
  }
  if (toolClass === "external") {
    return "Use local project evidence only; external API calls remain blocked.";
  }

  return "Choose an eligible read-only tool and inspect the request again.";
}

function reasonForRoute(toolName: string, toolClass: ReadOnlyExecutionToolClass): string {
  if (toolClass === "eligible-read-only") {
    return `${toolName} is routed as an approved local read-only tool request.`;
  }
  if (toolClass === "mutation") {
    return `${toolName} is blocked because it can mutate files or run commands.`;
  }
  if (toolClass === "broker") {
    return "broker-execution is blocked.";
  }
  if (toolClass === "creative") {
    return `${toolName} is blocked because creative/local-app execution is outside Phase 26.`;
  }
  if (toolClass === "external") {
    return `${toolName} is blocked because external API tools are outside Phase 26.`;
  }

  return `${toolName} is unknown and blocked.`;
}

export function classifyReadOnlyTool(toolName: string): ReadOnlyExecutionToolClass {
  const normalized = normalizeToolName(toolName);
  if (READ_ONLY_EXECUTION_ELIGIBLE_TOOLS.includes(normalized as never)) {
    return "eligible-read-only";
  }
  if (READ_ONLY_EXECUTION_MUTATION_TOOLS.includes(normalized)) {
    return "mutation";
  }
  if (READ_ONLY_EXECUTION_ALWAYS_BLOCKED_TOOLS.includes(normalized)) {
    return "broker";
  }
  if (READ_ONLY_EXECUTION_CREATIVE_TOOLS.includes(normalized)) {
    return "creative";
  }
  if (READ_ONLY_EXECUTION_EXTERNAL_TOOLS.includes(normalized)) {
    return "external";
  }

  return "unknown";
}

export function buildReadOnlyToolRoute(
  request: ReadOnlyExecutionRequest
): ReadOnlyToolRoute {
  const toolName = normalizeToolName(request.selectedReadOnlyTool);
  const toolClass = classifyReadOnlyTool(toolName);
  const routeMode = routeModeForClass(toolClass);
  const normalizedInput = normalizeReadOnlyJsonRecord(request.toolInputPreview.input);
  const allowed = toolClass === "eligible-read-only";
  const route: ReadOnlyToolRoute = {
    id: buildReadOnlyExecutionStableKey(
      "read-only-tool-route",
      request.requestId,
      toolName,
      routeMode
    ),
    requestId: request.requestId,
    toolName,
    routeMode,
    toolClass,
    normalizedInput,
    allowed,
    blocked: !allowed,
    reason: reasonForRoute(toolName, toolClass),
    expectedResultKind: expectedResultKind(toolName),
    evidenceLabels: evidenceLabelsForTool(toolName),
    safeFallback: safeFallbackForClass(toolClass),
    summary: [],
  };

  return {
    ...route,
    summary: summarizeReadOnlyToolRoute(route),
  };
}

export function summarizeReadOnlyToolRoute(route: ReadOnlyToolRoute): string[] {
  return [
    `Tool ${route.toolName} classified as ${route.toolClass} with route mode ${route.routeMode}.`,
    route.allowed
      ? "Router prepared deterministic metadata only; actual execution is isolated behind the guarded client bridge."
      : `Route is blocked. Safe fallback: ${route.safeFallback}`,
    `Expected result kind: ${route.expectedResultKind}; evidence labels: ${route.evidenceLabels.join(", ")}.`,
  ];
}
