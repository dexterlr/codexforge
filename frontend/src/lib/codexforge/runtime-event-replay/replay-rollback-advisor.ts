import type {
  RuntimeReplayRollbackAdvice,
  RuntimeReplayRollbackOption,
  RuntimeReplayRollbackOptionKind,
  RuntimeReplayRiskReport,
  RuntimeReplaySimulation,
} from "./runtime-event-replay-types";
import { buildRuntimeEventReplayStableKey } from "./runtime-event-replay-types";

const OPTION_DEFAULTS: Record<RuntimeReplayRollbackOptionKind, Omit<RuntimeReplayRollbackOption, "id" | "kind">> = {
  "do-not-apply-event": {
    label: "do not apply event",
    detail: "Do not apply event from replay output; replay is preview-only and read-only.",
    priority: "primary",
    readOnly: true,
  },
  "review-runtime-event-journal": {
    label: "review runtime event journal",
    detail: "Review runtime event journal entries before any future approval decision.",
    priority: "primary",
    readOnly: true,
  },
  "reject-memory-promotion": {
    label: "reject memory promotion",
    detail: "Reject memory promotion if duplicate, contradiction, or authority risks are visible.",
    priority: "secondary",
    readOnly: true,
  },
  "restore-graph-snapshot-before-promotion": {
    label: "restore graph snapshot before promotion if future persistence exists",
    detail: "If future persistence exists, restore the selected graph snapshot before any promotion path.",
    priority: "secondary",
    readOnly: true,
  },
  "create-corrective-event-after-approval": {
    label: "create corrective event only after approval",
    detail: "Create a corrective event only after explicit approval and guarded runtime execution review.",
    priority: "secondary",
    readOnly: true,
  },
  "inspect-reducer-preview": {
    label: "inspect reducer preview",
    detail: "Inspect reducer preview and impact analysis before deciding on any future guarded action.",
    priority: "secondary",
    readOnly: true,
  },
  "stop-and-stabilize": {
    label: "stop and stabilize",
    detail: "Stop and stabilize when blocker risks appear; do not auto-run rollback.",
    priority: "primary",
    readOnly: true,
  },
};

export function buildRuntimeReplayRollbackOption(
  input: Partial<RuntimeReplayRollbackOption> & { kind: RuntimeReplayRollbackOptionKind }
): RuntimeReplayRollbackOption {
  const defaults = OPTION_DEFAULTS[input.kind];
  return {
    id: input.id ?? buildRuntimeEventReplayStableKey("runtime-replay-rollback-option", input.kind),
    kind: input.kind,
    label: input.label ?? defaults.label,
    detail: input.detail ?? defaults.detail,
    priority: input.priority ?? defaults.priority,
    readOnly: true,
  };
}

export function buildRuntimeReplayRollbackAdvice(args: {
  simulation: RuntimeReplaySimulation;
  riskReport: RuntimeReplayRiskReport;
}): RuntimeReplayRollbackAdvice {
  const kinds: RuntimeReplayRollbackOptionKind[] = [
    "do-not-apply-event",
    "review-runtime-event-journal",
    "inspect-reducer-preview",
  ];

  if (args.riskReport.items.some((risk) => risk.id === "duplicate-memory-risk" || risk.id === "contradiction-risk" || risk.id === "memory-authority-risk")) {
    kinds.push("reject-memory-promotion", "restore-graph-snapshot-before-promotion");
  }
  if (args.riskReport.items.some((risk) => risk.id === "unknown-event-type" || risk.id === "reducer-missing")) {
    kinds.push("stop-and-stabilize");
  }
  if (args.simulation.status === "partial" || args.simulation.status === "reducer-warning") {
    kinds.push("create-corrective-event-after-approval");
  }

  const options = Array.from(new Set(kinds)).map((kind) => buildRuntimeReplayRollbackOption({ kind }));
  const selected =
    options.find((option) => option.kind === "stop-and-stabilize") ??
    options.find((option) => option.kind === "do-not-apply-event") ??
    options[0];

  const advice: RuntimeReplayRollbackAdvice = {
    id: "runtime-replay-rollback-advice",
    options,
    selected,
    summary: [],
  };

  return { ...advice, summary: summarizeRuntimeReplayRollbackAdvice(advice) };
}

export function summarizeRuntimeReplayRollbackAdvice(advice: RuntimeReplayRollbackAdvice): string[] {
  return [
    `Selected rollback guidance: ${advice.selected.label}.`,
    `${advice.options.length} conceptual read-only rollback option(s) are visible.`,
    "Rollback advisor says do not apply event, review runtime event journal, reject memory promotion when needed, restore graph snapshot before promotion if future persistence exists, create corrective event only after approval, inspect reducer preview, and stop and stabilize.",
    "No rollback execution is available from replay.",
  ];
}
