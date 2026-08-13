import type {
  OperatorHomeNextAction,
  OperatorHomeNextActionKind,
  OperatorHomeNextActionPlan,
  OperatorHomeRoutePath,
  OperatorHomeStatusInput,
} from "./operator-home-types";
import {
  buildOperatorHomeStableKey,
  normalizeOperatorHomeValidationCommands,
} from "./operator-home-types";

const ACTION_TEXT: Record<
  OperatorHomeNextActionKind,
  {
    title: string;
    detail: string;
    href: OperatorHomeRoutePath;
    reviewRequired: boolean;
    prompt: string;
  }
> = {
  "review stabilization blockers": {
    title: "Review stabilization blockers",
    detail:
      "Stabilization has blocker posture. Open the read-only Stabilization Command Center before feature work.",
    href: "/stabilization",
    reviewRequired: true,
    prompt:
      "Review Stabilization Command Center first. Preserve latest-message authority. Do not auto-fix, auto-rollback, run commands, write files, mutate Brain graph, or dispatch apply gates from Home.",
  },
  "review regression fix queue": {
    title: "Review regression fix queue",
    detail:
      "Regression Fix Queue has ready work. Review the queue and route any edit path through Safe Patch Preview.",
    href: "/stabilization",
    reviewRequired: true,
    prompt:
      "Review ready Regression Fix Queue items. Use Safe Patch Preview only. No auto-fix, no command execution without approval, and no file writes without approval.",
  },
  "ingest verification output": {
    title: "Ingest verification output",
    detail:
      "Verification output needs review. Open Jarvis and paste evidence into the reviewed workflow.",
    href: "/jarvis",
    reviewRequired: true,
    prompt:
      "Ingest verification output as reviewed evidence. Evidence is context, not proof. Preserve latest-message authority.",
  },
  "review file workflow": {
    title: "Review file workflow",
    detail:
      "File workflow needs attention. Open Files for context and preview-only patch planning.",
    href: "/files",
    reviewRequired: true,
    prompt:
      "Review Files Command Center before edits. Keep current file contents authoritative and use preview-only handoff.",
  },
  "review brain or memory": {
    title: "Review Brain or memory",
    detail:
      "Brain or memory review is needed. Open Memory when available, otherwise inspect Brain runtime context.",
    href: "/memory",
    reviewRequired: true,
    prompt:
      "Review memory candidates or Brain context. Do not auto-promote memory, auto-merge graph events, or mutate Brain graph.",
  },
  "continue creative workflow": {
    title: "Continue creative workflow",
    detail:
      "Creative workflow is active. Open Creative Production Studio for preview planning and artifact handoff.",
    href: "/creative",
    reviewRequired: true,
    prompt:
      "Continue creative production in preview mode. Route file changes through Safe Patch Preview and keep approval boundaries visible.",
  },
  "continue next phase": {
    title: "Continue next phase",
    detail:
      "No blocker input is present. Continue the next planned phase after manual validation review.",
    href: "/",
    reviewRequired: false,
    prompt:
      "Continue the next phase after reviewing validation posture. Preserve latest-message authority and keep Home read-only.",
  },
  "commit clean checkpoint": {
    title: "Commit clean checkpoint",
    detail:
      "No blocker input is present. After manual validation passes, commit a clean checkpoint from the terminal.",
    href: "/stabilization",
    reviewRequired: false,
    prompt:
      "Commit clean checkpoint only after validation passes. Home does not run tests, write files, execute commands, or create commits.",
  },
};

function routeAvailable(input: OperatorHomeStatusInput, href: OperatorHomeRoutePath): boolean {
  return input.routeAvailability?.[href] !== false;
}

function makeAction(
  kind: OperatorHomeNextActionKind,
  input: OperatorHomeStatusInput,
  priority: "primary" | "secondary" = "secondary"
): OperatorHomeNextAction {
  const text = ACTION_TEXT[kind];
  let href = text.href;

  if (kind === "review regression fix queue" && !routeAvailable(input, "/stabilization")) {
    href = "/jarvis";
  }

  if (kind === "review brain or memory" && !routeAvailable(input, "/memory")) {
    href = "/brain";
  }

  if (kind === "continue creative workflow" && !routeAvailable(input, "/creative")) {
    href = "/jarvis";
  }

  return {
    id: buildOperatorHomeStableKey("operator-home-next-action", kind, href),
    kind,
    title: text.title,
    detail: text.detail,
    href,
    priority,
    reviewRequired: text.reviewRequired,
    prompt: text.prompt,
  };
}

export function selectOperatorHomeNextAction(
  input: OperatorHomeStatusInput = {}
): OperatorHomeNextAction {
  if (input.stabilizationHasBlockers) {
    return makeAction("review stabilization blockers", input, "primary");
  }

  if ((input.regressionFixQueueReadyCount ?? 0) > 0) {
    return makeAction("review regression fix queue", input, "primary");
  }

  if (input.verificationOutputNeedsIngestion) {
    return makeAction("ingest verification output", input, "primary");
  }

  if (input.fileWorkflowNeedsAttention) {
    return makeAction("review file workflow", input, "primary");
  }

  if (input.brainReviewNeeded || input.memoryReviewNeeded) {
    return makeAction("review brain or memory", input, "primary");
  }

  if (input.creativeWorkflowActive) {
    return makeAction("continue creative workflow", input, "primary");
  }

  return makeAction("commit clean checkpoint", input, "primary");
}

export function buildOperatorHomeNextActionPlan(
  input: OperatorHomeStatusInput = {}
): OperatorHomeNextActionPlan {
  const selected = selectOperatorHomeNextAction(input);
  const orderedActions = [
    selected,
    makeAction("review stabilization blockers", input),
    makeAction("review regression fix queue", input),
    makeAction("ingest verification output", input),
    makeAction("review file workflow", input),
    makeAction("review brain or memory", input),
    makeAction("continue creative workflow", input),
    makeAction("commit clean checkpoint", input),
    makeAction("continue next phase", input),
  ].filter((action, index, all) => all.findIndex((item) => item.id === action.id) === index);
  const blockers = [
    input.stabilizationHasBlockers ? "Stabilization has blocker posture." : null,
    input.latestMessageAuthorityPreserved === false
      ? "Latest-message authority is not preserved."
      : null,
  ].filter((item): item is string => Boolean(item));
  const warnings = [
    input.verificationOutputNeedsIngestion ? "Verification output needs ingestion." : null,
    input.fileWorkflowNeedsAttention ? "File workflow needs attention." : null,
    (input.regressionFixQueueReadyCount ?? 0) > 0
      ? "Regression Fix Queue has ready items."
      : null,
    input.memoryReviewNeeded ? "Memory workflow needs review." : null,
    input.brainReviewNeeded ? "Brain runtime needs review." : null,
    input.creativeWorkflowActive ? "Creative workflow is active." : null,
  ].filter((item): item is string => Boolean(item));
  const validationCommands = normalizeOperatorHomeValidationCommands(input.validationCommands);

  return {
    id: "operator-home-next-action-plan",
    selected,
    orderedActions,
    blockers,
    warnings,
    validationCommands,
    summary: summarizeOperatorHomeNextAction({
      selected,
      orderedActions,
      blockers,
      warnings,
      validationCommands,
    }),
  };
}

export function summarizeOperatorHomeNextAction(
  plan: Pick<
    OperatorHomeNextActionPlan,
    "selected" | "orderedActions" | "blockers" | "warnings" | "validationCommands"
  >
): string[] {
  return [
    `Primary next action: ${plan.selected.title}.`,
    `Target route: ${plan.selected.href}.`,
    `${plan.blockers.length} blocker(s), ${plan.warnings.length} warning(s), and ${plan.orderedActions.length} ordered action(s).`,
    `${plan.validationCommands.length} validation commands are copy-only.`,
  ];
}
