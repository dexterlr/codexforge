import type { CommandExecutionApprovalBoundary, CommandExecutionApprovalBoundaryBoundary, CommandExecutionApprovalBoundaryModel } from "./command-execution-approval-boundary-types";
import { buildCommandExecutionApprovalBoundaryStableKey } from "./command-execution-approval-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const COMMAND_EXECUTION_APPROVAL_BOUNDARY_LANGUAGE = [
  "Command execution approval boundary",
  "Command execution approval boundary does not run commands",
  "Command execution requires explicit operator approval",
  "Unsafe commands stay blocked",
  "Command risk groups",
  "Working-directory checklist",
] as const;

export function buildCommandExecutionApprovalBoundary(input: Omit<CommandExecutionApprovalBoundary, "id"> & { idHint: string }): CommandExecutionApprovalBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildCommandExecutionApprovalBoundaryStableKey("command-execution-approval-boundary", idHint, input.status), ...boundary };
}

export function buildCommandExecutionApprovalBoundaries(): CommandExecutionApprovalBoundary[] {
  return [
    buildCommandExecutionApprovalBoundary({
      idHint: "command-execution-approval-boundary",
      status: "blocked",
      identity: "Command execution boundary identity: command-execution-approval-boundary reviews command intent, risk, directory, environment, timeout, and logging without running commands.",
      sections: [
        { label: "Command risk groups", items: ["Command risk groups: shell, git, test, build, smoke, package, server launch, process control, dependency install, destructive mutation, network, and credential exposure remain blocked by default."] },
        { label: "Command preview checklist", items: ["Command preview checklist: command text, arguments, intended effect, reversible steps, risk class, expected output, and explicit operator approval status must be visible before any future command can run."] },
        { label: "Working-directory checklist", items: ["Working-directory checklist: canonical workspace, denied scratch workspaces, denied arbitrary paths, path boundary, and repo scope must be reviewed."] },
        { label: "Environment/secrets checklist", items: ["Environment/secrets checklist: no process.env values are printed, no secrets are displayed, no tokens are stored, and no example real key/token/endpoint values appear."] },
        { label: "Timeout/logging checklist", items: ["Timeout/logging checklist: timeout, log redaction, captured evidence route, stop plan, retry policy, and recovery owner must be defined before execution is considered."] },
        { label: "Denied command actions", items: ["Denied command actions: run shell, git, test, build, smoke, package, server, dependency install, local bridge, provider, connector, or automation commands from UI."] },
        { label: "Unresolved command blockers", items: ["Unresolved command blockers: missing command allowlist, working directory proof, secret redaction, timeout, evidence capture, local runtime route, and recovery route keep unsafe commands blocked."] },
      ],
      routes: ["/local-runtime-approval-boundary", "/recovery-retry-boundary", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep command execution blocked, review the command packet, then connect evidence, runtime, and recovery requirements before explicit operator approval.",
      advancedDetails: `Advanced command execution approval boundary details: Command execution approval boundary does not run commands. Command execution requires explicit operator approval. Unsafe commands stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildCommandExecutionApprovalBoundaryBoundary(): CommandExecutionApprovalBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeCommandExecutionApprovalBoundary(model: Pick<CommandExecutionApprovalBoundaryModel, "commandExecutionApprovalBoundaries">): string {
  return "Command execution approval boundary reviews " + model.commandExecutionApprovalBoundaries.length + " command boundary packet without running commands. Command execution requires explicit operator approval, and unsafe commands stay blocked.";
}

export function buildCommandExecutionApprovalBoundaryModel(): CommandExecutionApprovalBoundaryModel {
  const commandExecutionApprovalBoundaries = buildCommandExecutionApprovalBoundaries();
  const model: CommandExecutionApprovalBoundaryModel = {
    title: "Command execution approval boundary",
    summary: "",
    reviewPackets: commandExecutionApprovalBoundaries,
    commandExecutionApprovalBoundaries,
    boundary: buildCommandExecutionApprovalBoundaryBoundary(),
    language: [...COMMAND_EXECUTION_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Command execution boundary identity",
      "Command risk groups",
      "Command preview checklist",
      "Working-directory checklist",
      "Environment/secrets checklist",
      "Timeout/logging checklist",
      "Denied command actions",
      "Unresolved command blockers",
      "Local runtime boundary route",
      "Recovery boundary route",
      "Next recommended action",
      "advanced command execution approval boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCommandExecutionApprovalBoundary(model) };
}
