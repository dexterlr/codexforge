import type {
  CodexForgeRuntimeHealthBuildInput,
  CodexForgeRuntimeHealthSeverity,
  CodexForgeRuntimeNextSafeAction,
  CodexForgeRuntimeSafetyPosture,
  CodexForgeRuntimeSubsystemStatus,
} from "./health-types";

type SafetyKind =
  | "read-only"
  | "approval-required"
  | "blocked"
  | "mutation"
  | "file-write"
  | "command"
  | "render"
  | "external";

function action(
  id: string,
  label: string,
  detail: string,
  readOnly: boolean,
  approvalRequired: boolean,
  blocked = false
): CodexForgeRuntimeNextSafeAction {
  return { id, label, detail, readOnly, approvalRequired, blocked };
}

export function classifyRuntimeSafetySignal(value: string): {
  kind: SafetyKind;
  status: CodexForgeRuntimeSubsystemStatus;
  severity: CodexForgeRuntimeHealthSeverity;
  approvalRequired: boolean;
} {
  const normalized = value.toLowerCase();
  if (normalized.includes("blocked")) {
    return { kind: "blocked", status: "blocked", severity: "critical", approvalRequired: true };
  }
  if (normalized.includes("command")) {
    return { kind: "command", status: "partial", severity: "high", approvalRequired: true };
  }
  if (normalized.includes("mutation") || normalized.includes("mutate")) {
    return { kind: "mutation", status: "partial", severity: "high", approvalRequired: true };
  }
  if (normalized.includes("file write") || normalized.includes("write")) {
    return { kind: "file-write", status: "partial", severity: "high", approvalRequired: true };
  }
  if (normalized.includes("render")) {
    return { kind: "render", status: "partial", severity: "medium", approvalRequired: true };
  }
  if (normalized.includes("external") || normalized.includes("web-research")) {
    return { kind: "external", status: "partial", severity: "medium", approvalRequired: true };
  }
  if (normalized.includes("approval")) {
    return { kind: "approval-required", status: "partial", severity: "medium", approvalRequired: true };
  }
  return { kind: "read-only", status: "ready", severity: "info", approvalRequired: false };
}

export function buildRuntimeSafetyPosture(
  input: CodexForgeRuntimeHealthBuildInput = {}
): CodexForgeRuntimeSafetyPosture {
  const recommendationActions = (input.recommendations ?? []).map((item) => item.nextSafeAction);
  const approvalActions = recommendationActions.filter((item) => item.approvalRequired);
  const readOnlyActions = recommendationActions.filter((item) => item.readOnly);
  const blockedActions = recommendationActions.filter((item) => item.safety === "blocked");

  const readOnly = [
    action(
      "safety:inspect-dashboard",
      "Inspect health dashboard",
      "Read-only inspection of runtime health, diagnostics, and subsystem evidence.",
      true,
      false
    ),
    ...readOnlyActions.map((item) =>
      action(item.id, item.label, item.description, item.readOnly, item.approvalRequired)
    ),
  ];
  const approvalRequired = [
    action(
      "safety:mutation-boundary",
      "Approval required for mutation",
      "Graph, file, command, render, and external actions stay outside this read-only dashboard.",
      false,
      true
    ),
    ...approvalActions.map((item) =>
      action(item.id, item.label, item.description, item.readOnly, item.approvalRequired)
    ),
  ];
  const blocked = [
    action(
      "safety:blocked-autonomous-action",
      "Autonomous action blocked",
      "The dashboard may recommend inspection but must not execute repair actions.",
      false,
      true,
      true
    ),
    ...blockedActions.map((item) =>
      action(item.id, item.label, item.description, item.readOnly, item.approvalRequired, true)
    ),
  ];

  const boundaries = [
    "tool-policy read-only boundary",
    "web-research external approval boundary",
    "mutation boundary",
    "file write boundary",
    "command execution boundary",
    "render boundary",
    "external boundary",
  ].map((label) => {
    const classified = classifyRuntimeSafetySignal(label);
    return {
      id: label.split(" ").join("-"),
      label,
      status: classified.status,
      severity: classified.severity,
      reason:
        classified.approvalRequired
          ? "Explicit approval is required before this boundary can be crossed."
          : "Read-only inspection is allowed inside the dashboard.",
      approvalRequired: classified.approvalRequired,
    };
  });

  const warnings = boundaries
    .filter((boundary) => boundary.approvalRequired)
    .map((boundary) => `${boundary.label}: approval-required`);

  return {
    id: "runtime-safety-posture",
    status: warnings.length > 0 ? "partial" : "ready",
    severity: warnings.length > 0 ? "medium" : "info",
    summary: "Runtime safety posture is read-only; mutation, command, render, and external actions require explicit approval.",
    readOnlyActions: readOnly,
    approvalRequiredActions: approvalRequired,
    blockedActions: blocked,
    boundaries,
    warnings,
  };
}

export function summarizeRuntimeSafetyPosture(
  posture: CodexForgeRuntimeSafetyPosture
): string {
  return `Safety posture ${posture.status}: ${posture.readOnlyActions.length} read-only actions, ${posture.approvalRequiredActions.length} approval-required actions, ${posture.blockedActions.length} blocked actions.`;
}
