import type { ContinuityHandoffNextAction, ContinuityHandoffNextActionKind, ContinuityHandoffNextActionPlan, ContinuityHandoffRiskSummary } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey } from "./continuity-handoff-types";

function action(actionKind: ContinuityHandoffNextActionKind, title: string, detail: string, targetRoute: ContinuityHandoffNextAction["targetRoute"], priority: "primary" | "secondary" = "secondary"): ContinuityHandoffNextAction {
  return {
    id: buildContinuityHandoffStableKey("handoff-next-action", actionKind, title),
    action: actionKind,
    title,
    detail,
    targetRoute,
    priority,
    reviewRequired: true,
  };
}

export function selectContinuityHandoffNextAction(args: {
  risks?: ContinuityHandoffRiskSummary;
  buildPassed?: boolean | null;
  smokePassed?: boolean | null;
  mutationRiskVisible?: boolean | null;
  memoryRiskVisible?: boolean | null;
  restoreRiskVisible?: boolean | null;
  clean?: boolean | null;
} = {}): ContinuityHandoffNextAction {
  if (args.risks?.blockerCount || args.buildPassed === false) return action("stop and stabilize", "Stop and stabilize", "Blockers or failed build come before next phase work.", "/stabilization", "primary");
  if (args.smokePassed === false) return action("fix failed smoke", "Fix failed smoke", "Failed smoke must be fixed before handoff can recommend continuation.", "/stabilization", "primary");
  if (args.mutationRiskVisible) return action("review Brain continuity", "Review Brain continuity", "Direct mutation risk comes before memory or runtime work.", "/brain-continuity", "primary");
  if (args.memoryRiskVisible) return action("review memory inbox", "Review memory inbox", "Memory risks come before promotion.", "/memory-inbox", "primary");
  if (args.restoreRiskVisible) return action("review snapshot restore gate", "Review snapshot restore gate", "Restore risks come before snapshot or runtime work.", "/snapshot-restore", "primary");
  if (args.clean) return action("commit clean checkpoint", "Recommend commit clean checkpoint", "Clean validation can be checkpointed before tagging smoke-suite clean or continuing next phase.", "smoke suite", "primary");
  return action("run validation manually", "Run validation manually", "Copy and run validation commands before next phase.", "smoke suite", "primary");
}

export function buildContinuityHandoffNextActionPlan(args: Parameters<typeof selectContinuityHandoffNextAction>[0] = {}): ContinuityHandoffNextActionPlan {
  const selected = selectContinuityHandoffNextAction(args);
  const orderedActions = [
    selected,
    action("run validation manually", "Run validation manually", "Copy validation commands only; UI does not execute commands.", "smoke suite"),
    action("fix failed smoke", "Fix failed smoke", "Failed build or smoke blocks next phase.", "/stabilization"),
    action("review stabilization", "Review stabilization", "Review build, smoke, regression, and rollback posture.", "/stabilization"),
    action("review Brain continuity", "Review Brain continuity", "Review continuity before graph, snapshot, or restore work.", "/brain-continuity"),
    action("review memory inbox", "Review memory inbox", "Review duplicate and contradiction risks before promotion.", "/memory-inbox"),
    action("review runtime event journal", "Review runtime event journal", "Review audit lifecycle before runtime event work.", "/runtime-journal"),
    action("review snapshot restore gate", "Review snapshot restore gate", "Restore remains preview-only and blocked by default.", "/snapshot-restore"),
    action("create next phase prompt", "Create next phase prompt", "Copy next-session prompt with current state, risks, validation, rollback, memory, and Brain posture.", "/handoff"),
    action("commit clean checkpoint", "Recommend commit clean checkpoint", "Commit only after manual validation and explicit operator approval.", "smoke suite"),
    action("tag smoke-suite clean", "Tag smoke-suite clean", "Only after full smoke suite is clean and reviewed.", "smoke suite"),
  ].filter((item, index, list) => list.findIndex((candidate) => candidate.action === item.action) === index);
  const blockers = args.risks?.items.filter((risk) => risk.blocker).map((risk) => risk.title) ?? [];
  return {
    id: "continuity-handoff-next-action-plan",
    selected,
    orderedActions,
    blockers,
    summary: summarizeContinuityHandoffNextActions(selected),
  };
}

export function summarizeContinuityHandoffNextActions(actionOrPlan: ContinuityHandoffNextAction | ContinuityHandoffNextActionPlan): string[] {
  const selected = "selected" in actionOrPlan ? actionOrPlan.selected : actionOrPlan;
  return [
    `Next safe action: ${selected.action}.`,
    selected.detail,
    "Selection is deterministic: blockers first, failed build or smoke before next phase, mutation risks before memory/runtime work, memory risks before promotion, restore risks before snapshot work, clean state can recommend commit clean checkpoint.",
  ];
}
