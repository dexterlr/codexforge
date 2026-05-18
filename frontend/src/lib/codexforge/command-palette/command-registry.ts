import type {
  CodexForgeCommand,
  CodexForgeCommandInput,
  CodexForgeCommandRegistryOptions,
  CodexForgeCommandRouteAvailability,
} from "./command-palette-types";
import {
  buildCodexForgeSafePatchPromptPayload,
  buildCodexForgeStabilizationHandoffPayload,
  buildCodexForgeValidationChecklistPayload,
} from "./command-copy-payloads";
import { isCodexForgeCommandMutationBlocked } from "./command-safety";

const DEFAULT_ROUTE_AVAILABILITY: CodexForgeCommandRouteAvailability = {
  "/": true,
  "/ai": true,
  "/brain": true,
  "/files": true,
  "/tasks": true,
  "/memory": true,
  "/creative": true,
  "/capabilities": true,
  "/stabilization": true,
};

export function buildCodexForgeCommand(input: CodexForgeCommandInput): CodexForgeCommand {
  const noMutation = input.noMutation ?? true;
  const disabledReason =
    input.disabledReason ??
    (noMutation ? undefined : "Mutation commands are blocked from the global command palette.");

  return {
    description: "",
    group: "Safety",
    kind: "safe-action",
    safetyLevel: disabledReason ? "blocked" : "safe",
    requiresReview: false,
    keywords: [],
    priority: 1000,
    ...input,
    noMutation,
    disabledReason,
  };
}

function routeAvailable(
  availability: CodexForgeCommandRouteAvailability,
  href: NonNullable<CodexForgeCommand["href"]>
): boolean {
  return availability[href] === true;
}

function buildRouteCommand(
  availability: CodexForgeCommandRouteAvailability,
  input: CodexForgeCommandInput & { href: NonNullable<CodexForgeCommand["href"]> }
): CodexForgeCommand | null {
  if (!routeAvailable(availability, input.href)) return null;
  return buildCodexForgeCommand({
    group: "Navigate",
    kind: "route",
    safetyLevel: "safe",
    requiresReview: false,
    noMutation: true,
    ...input,
  });
}

export function buildCodexForgeCommands(
  options: CodexForgeCommandRegistryOptions = {}
): CodexForgeCommand[] {
  const availability = { ...DEFAULT_ROUTE_AVAILABILITY, ...options.routeAvailability };
  const routeCommands = [
    buildRouteCommand(availability, {
      id: "go-operator-home",
      label: "Go to Operator Home",
      description: "Navigate to the operator dashboard.",
      href: "/",
      keywords: ["home", "dashboard", "operator", "route"],
      priority: 10,
    }),
    buildRouteCommand(availability, {
      id: "go-ai-workspace",
      label: "Go to AI Workspace",
      description: "Navigate to planning, chat, and reviewed handoffs.",
      href: "/ai",
      keywords: ["ai", "workspace", "chat", "route"],
      priority: 20,
    }),
    buildRouteCommand(availability, {
      id: "go-brain",
      label: "Go to Brain",
      description: "Navigate to Brain graph inspection without mutation.",
      href: "/brain",
      keywords: ["brain", "graph", "recall", "route"],
      priority: 30,
    }),
    buildRouteCommand(availability, {
      id: "go-files",
      label: "Go to Files",
      description: "Navigate to Files Command Center.",
      href: "/files",
      keywords: ["files", "source", "workflow", "route"],
      priority: 40,
    }),
    buildRouteCommand(availability, {
      id: "go-tasks",
      label: "Go to Tasks",
      description: "Navigate to reviewed task workflow.",
      href: "/tasks",
      keywords: ["tasks", "activation", "route"],
      priority: 50,
    }),
    buildRouteCommand(availability, {
      id: "go-memory",
      label: "Go to Memory",
      description: "Navigate to memory review candidates.",
      href: "/memory",
      keywords: ["memory", "review", "route"],
      priority: 60,
    }),
    buildRouteCommand(availability, {
      id: "go-creative",
      label: "Go to Creative",
      description: "Navigate to Creative Production Studio previews.",
      href: "/creative",
      keywords: ["creative", "preview", "studio", "route"],
      priority: 70,
    }),
    buildRouteCommand(availability, {
      id: "go-capabilities",
      label: "Go to Capabilities",
      description: "Navigate to Capability Cockpit.",
      href: "/capabilities",
      keywords: ["capabilities", "tools", "policy", "route"],
      priority: 80,
    }),
    buildRouteCommand(availability, {
      id: "go-stabilization",
      label: "Go to Stabilization",
      description: "Navigate to Stabilization Command Center.",
      href: "/stabilization",
      keywords: ["stabilization", "smoke", "build", "route"],
      priority: 90,
    }),
  ].filter((command): command is CodexForgeCommand => command !== null);

  const commands: CodexForgeCommand[] = [
    ...routeCommands,
    buildCodexForgeCommand({
      id: "copy-full-validation-checklist",
      label: "Copy full validation checklist",
      description: "Copy build, smoke, diff, and status checks without running them.",
      group: "Validation",
      kind: "copy-command",
      copyPayload: buildCodexForgeValidationChecklistPayload(),
      safetyLevel: "copy-only",
      requiresReview: false,
      keywords: ["validation", "checklist", "build", "smoke", "git diff check"],
      priority: 110,
    }),
    buildCodexForgeCommand({
      id: "copy-build-command",
      label: "Copy build command",
      description: "Copy npm run build.",
      group: "Validation",
      kind: "copy-command",
      copyPayload: "npm run build",
      safetyLevel: "copy-only",
      requiresReview: false,
      keywords: ["build", "command", "validation"],
      priority: 120,
    }),
    buildCodexForgeCommand({
      id: "copy-managed-smoke-command",
      label: "Copy managed smoke command",
      description: "Copy npm run smoke:codexforge:server.",
      group: "Validation",
      kind: "copy-command",
      copyPayload: "npm run smoke:codexforge:server",
      safetyLevel: "copy-only",
      requiresReview: false,
      keywords: ["smoke", "server", "validation"],
      priority: 130,
    }),
    buildCodexForgeCommand({
      id: "copy-git-diff-check",
      label: "Copy git diff check",
      description: "Copy git diff --check.",
      group: "Validation",
      kind: "copy-command",
      copyPayload: "git diff --check",
      safetyLevel: "copy-only",
      requiresReview: false,
      keywords: ["git", "diff", "check"],
      priority: 140,
    }),
    buildCodexForgeCommand({
      id: "review-regression-triage",
      label: "Review regression triage",
      description: "Open the review flow for regression signals before fix queue work.",
      group: "Stabilize",
      kind: "review",
      href: routeAvailable(availability, "/stabilization") ? "/stabilization" : undefined,
      safetyLevel: "review-gated",
      requiresReview: true,
      keywords: ["regression", "triage", "stabilization"],
      priority: 150,
    }),
    buildCodexForgeCommand({
      id: "review-regression-fix-queue",
      label: "Review regression fix queue",
      description: "Review queued fixes before patch preview.",
      group: "Stabilize",
      kind: "review",
      href: routeAvailable(availability, "/stabilization") ? "/stabilization" : undefined,
      safetyLevel: "review-gated",
      requiresReview: true,
      keywords: ["regression", "fix queue", "review"],
      priority: 160,
    }),
    buildCodexForgeCommand({
      id: "prepare-safe-patch-preview",
      label: "Prepare Safe Patch Preview",
      description: "Copy a safe preview prompt; does not call apply-diff or write files.",
      group: "Patch workflow",
      kind: "patch-preview",
      copyPayload: buildCodexForgeSafePatchPromptPayload(),
      safetyLevel: "copy-only",
      requiresReview: true,
      keywords: ["patch", "preview", "safe", "inspect first"],
      priority: 170,
    }),
    buildCodexForgeCommand({
      id: "compose-preview-diff",
      label: "Compose Preview Diff",
      description: "Open preview diff planning without applying changes.",
      group: "Patch workflow",
      kind: "patch-preview",
      copyPayload: "Compose a preview diff only. Do not apply-diff, write-file, run-command, or mutate source files from UI.",
      safetyLevel: "copy-only",
      requiresReview: true,
      keywords: ["preview diff", "compose", "patch"],
      priority: 180,
    }),
    buildCodexForgeCommand({
      id: "review-apply-gate",
      label: "Review Apply Gate",
      description: "Review apply gate posture; execution remains blocked from palette.",
      group: "Patch workflow",
      kind: "review",
      href: routeAvailable(availability, "/stabilization") ? "/stabilization" : undefined,
      safetyLevel: "review-gated",
      requiresReview: true,
      keywords: ["apply gate", "review", "approval"],
      priority: 190,
    }),
    buildCodexForgeCommand({
      id: "paste-verification-output",
      label: "Paste verification output",
      description: "Copy a prompt for reviewing verification output pasted by the operator.",
      group: "Verification",
      kind: "copy-prompt",
      copyPayload: "Review this verification output. Preserve latest-message authority, distinguish evidence from proof, and recommend the next safe action without running commands.",
      safetyLevel: "copy-only",
      requiresReview: true,
      keywords: ["verification", "output", "review"],
      priority: 200,
    }),
    buildCodexForgeCommand({
      id: "review-memory-candidates",
      label: "Review memory candidates",
      description: "Navigate to memory review; no auto-promote.",
      group: "Memory",
      kind: "memory-review",
      href: routeAvailable(availability, "/memory") ? "/memory" : undefined,
      safetyLevel: "review-gated",
      requiresReview: true,
      keywords: ["memory", "candidates", "no auto-promote"],
      priority: 210,
    }),
    buildCodexForgeCommand({
      id: "open-latest-message-authority-guidance",
      label: "Open latest-message authority guidance",
      description: "Copy guidance for preserving newest user instruction precedence.",
      group: "Safety",
      kind: "copy-prompt",
      copyPayload: "Preserve latest-message authority: the newest user instruction steers the current turn. If instructions conflict, follow the newest one and call out the conflict.",
      safetyLevel: "copy-only",
      requiresReview: false,
      keywords: ["latest-message authority", "safety", "guidance"],
      priority: 220,
    }),
    buildCodexForgeCommand({
      id: "continue-next-phase-safely",
      label: "Continue next phase safely",
      description: "Copy a safe handoff prompt for the next phase.",
      group: "Next action",
      kind: "handoff",
      copyPayload: buildCodexForgeStabilizationHandoffPayload(),
      safetyLevel: "copy-only",
      requiresReview: true,
      keywords: ["next phase", "handoff", "safe"],
      priority: 230,
    }),
    buildCodexForgeCommand({
      id: "commit-clean-checkpoint",
      label: "Recommend commit clean checkpoint",
      description: "Copy a checkpoint recommendation; the palette never commits.",
      group: "Next action",
      kind: "safe-action",
      copyPayload: "Working tree appears clean after validation. Recommend a commit clean checkpoint, but do not commit without explicit approval.",
      safetyLevel: "copy-only",
      requiresReview: true,
      keywords: ["commit clean checkpoint", "clean", "next action"],
      priority: 240,
    }),
  ];

  if (options.includeEducationalBlockedCommands) {
    for (const blocked of ["apply-diff", "write-file", "run-command", "broker-execution"]) {
      commands.push(
        buildCodexForgeCommand({
          id: `blocked-${blocked}`,
          label: `Blocked: ${blocked}`,
          description: `${blocked} is visible only as blocked-policy text and cannot execute from the palette.`,
          group: "Safety",
          kind: "safe-action",
          safetyLevel: "blocked",
          requiresReview: true,
          disabledReason: `${blocked} is mutation-capable or execution-capable and blocked in the palette.`,
          keywords: [blocked, "blocked", "safety"],
          noMutation: false,
          priority: 900,
        })
      );
    }
  }

  return commands
    .map((command) =>
      isCodexForgeCommandMutationBlocked(command)
        ? {
            ...command,
            safetyLevel: "blocked" as const,
            disabledReason: command.disabledReason ?? "Mutation blocked by command safety policy.",
          }
        : command
    )
    .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
}

export function summarizeCodexForgeCommands(commands = buildCodexForgeCommands()): string {
  const disabled = commands.filter((command) => command.disabledReason).length;
  return `${commands.length} deterministic commands, ${commands.length - disabled} enabled, ${disabled} disabled, no mutation commands executable.`;
}
