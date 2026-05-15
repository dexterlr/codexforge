import {
  buildExecutionReadinessStableKey,
  uniqueExecutionReadinessStrings,
  type ExecutionCommandIntent,
  type ExecutionIntent,
  type ExecutionMutationIntent,
  type ExecutionReadinessDomain,
  type ExecutionReadinessInput,
  type ExecutionReadinessInputDraft,
  type ExecutionReadinessInputValidation,
  type ExecutionReadinessReference,
  type ExecutionReadinessStep,
  type ExecutionReadinessStepInput,
} from "./execution-readiness-types";

const DEFAULT_STEPS = [
  "Inspect current files and source signals.",
  "Review the activated task plan before any future execution.",
  "Confirm Safe Patch Preview for any file mutation.",
  "Prepare the test and readiness checklist without running commands.",
];

const DEFAULT_GOAL =
  "Prepare active task execution readiness before any future execution.";

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeDomain(value: unknown): ExecutionReadinessDomain {
  const normalized = normalizeString(value);
  const domains: ExecutionReadinessDomain[] = [
    "general",
    "web",
    "research",
    "debug",
    "game-server",
    "movie",
    "video",
    "comfyui",
    "unreal",
    "automation",
  ];

  return normalized && domains.includes(normalized as ExecutionReadinessDomain)
    ? (normalized as ExecutionReadinessDomain)
    : "general";
}

function normalizeStep(
  step: ExecutionReadinessStepInput,
  activatedTaskId: string,
  index: number
): ExecutionReadinessStep | null {
  if (typeof step === "string") {
    const text = normalizeString(step);
    if (!text) return null;

    return {
      id: buildExecutionReadinessStableKey("execution-step", activatedTaskId, index, text),
      sourceStepId: null,
      label: `Step ${index + 1}`,
      text,
      gate: "review",
    };
  }

  if (!step || typeof step !== "object") return null;

  const text =
    normalizeString("text" in step ? step.text : null) ??
    normalizeString("detail" in step ? step.detail : null) ??
    normalizeString("label" in step ? step.label : null);
  if (!text) return null;

  const sourceStepId =
    normalizeString("sourceStepId" in step ? step.sourceStepId : null) ??
    normalizeString("id" in step ? step.id : null);
  const label = normalizeString("label" in step ? step.label : null) ?? text;
  const gate = normalizeString("gate" in step ? step.gate : null) ?? "review";

  return {
    id: buildExecutionReadinessStableKey("execution-step", activatedTaskId, index, sourceStepId ?? text),
    sourceStepId,
    label,
    text,
    gate,
  };
}

function normalizeSteps(
  steps: ExecutionReadinessStepInput[] | null | undefined,
  activatedTaskId: string
): ExecutionReadinessStep[] {
  const source = steps && steps.length > 0 ? steps : DEFAULT_STEPS;

  return source
    .map((step, index) => normalizeStep(step, activatedTaskId, index))
    .filter((step): step is ExecutionReadinessStep => step !== null);
}

function normalizeReference(
  value: string | ExecutionReadinessReference,
  type: "memory" | "artifact" | "run"
): ExecutionReadinessReference | null {
  if (typeof value === "string") {
    const label = normalizeString(value);
    if (!label) return null;
    return {
      id: buildExecutionReadinessStableKey("execution-readiness", type, label),
      label,
      summary: `${type} reference supplied for readiness review.`,
    };
  }

  const label = normalizeString(value.label) ?? normalizeString(value.id);
  if (!label) return null;

  return {
    id: normalizeString(value.id) ?? buildExecutionReadinessStableKey("execution-readiness", type, label),
    label,
    summary: normalizeString(value.summary) ?? `${type} reference supplied for readiness review.`,
  };
}

function normalizeReferences(
  values: Array<string | ExecutionReadinessReference> | null | undefined,
  type: "memory" | "artifact" | "run"
): ExecutionReadinessReference[] {
  if (!values) return [];
  const normalized = values
    .map((value) => normalizeReference(value, type))
    .filter((value): value is ExecutionReadinessReference => value !== null);
  const seen = new Set<string>();

  return normalized.filter((value) => {
    if (seen.has(value.id)) return false;
    seen.add(value.id);
    return true;
  });
}

function inferExecutionIntent(args: {
  explicit?: ExecutionIntent | null;
  domain: ExecutionReadinessDomain;
  goal: string;
}): ExecutionIntent {
  if (args.explicit) return args.explicit;
  const text = `${args.domain} ${args.goal}`.toLowerCase();
  if (
    text.includes("movie") ||
    text.includes("video") ||
    text.includes("comfy") ||
    text.includes("unreal") ||
    text.includes("render")
  ) {
    return "creative-preview";
  }
  return "future-execution";
}

function inferMutationIntent(args: {
  explicit?: ExecutionMutationIntent | null;
  impactedFiles: string[];
  approvalGates: string[];
  goal: string;
}): ExecutionMutationIntent {
  if (args.explicit) return args.explicit;
  const text = `${args.goal} ${args.approvalGates.join(" ")}`.toLowerCase();
  if (text.includes("graph")) return "graph-mutation";
  if (text.includes("memory")) return "memory-mutation";
  if (text.includes("apply-diff")) return "apply-diff";
  if (
    args.impactedFiles.length > 0 ||
    text.includes("safe patch preview") ||
    text.includes("file mutation") ||
    text.includes("write")
  ) {
    return "file-mutation";
  }
  return "none";
}

function inferCommandIntent(args: {
  explicit?: ExecutionCommandIntent | null;
  suggestedTests: string[];
  goal: string;
}): ExecutionCommandIntent {
  if (args.explicit) return args.explicit;
  const text = `${args.goal} ${args.suggestedTests.join(" ")}`.toLowerCase();
  if (text.includes("npm run build")) return "build-web-app";
  if (text.includes("run-command")) return "run-command";
  if (args.suggestedTests.length > 0 || text.includes("test")) return "run-tests";
  return "none";
}

function collectPlanSteps(input: ExecutionReadinessInputDraft): ExecutionReadinessStepInput[] | null {
  if (input.steps) return input.steps;
  if (!input.plan) return null;

  return input.plan.steps.map((step) => ({
    id: step.id,
    label: step.label,
    text: step.text,
    detail: step.detail,
    gate: step.gate,
  }));
}

export function buildExecutionReadinessInput(
  input: ExecutionReadinessInputDraft = {}
): ExecutionReadinessInput {
  const plan = input.plan ?? null;
  const activatedTaskId =
    normalizeString(input.activatedTaskId) ??
    normalizeString(plan?.id) ??
    "execution-readiness-activated-task";
  const taskGoal =
    normalizeString(input.taskGoal) ??
    normalizeString(plan?.goal) ??
    DEFAULT_GOAL;
  const taskDomain = normalizeDomain(input.taskDomain ?? plan?.domain);
  const impactedFiles = uniqueExecutionReadinessStrings(
    input.impactedFiles ?? plan?.impactedFiles ?? []
  );
  const approvalGates = uniqueExecutionReadinessStrings(
    input.approvalGates ??
      plan?.approvalGates ?? [
        "Explicit execution approval required.",
        "Safe Patch Preview required before file mutation.",
        "Command execution requires approval.",
      ]
  );
  const suggestedTests = uniqueExecutionReadinessStrings(
    input.suggestedTests ??
      plan?.acceptanceChecks?.filter((check) =>
        check.toLowerCase().includes("test")
      ) ?? [
        "npm run build",
        "git diff --check",
      ]
  );
  const steps = normalizeSteps(collectPlanSteps(input), activatedTaskId);
  const relatedMemories = normalizeReferences(
    input.relatedMemories ?? plan?.sourceMemoryIds ?? [],
    "memory"
  );
  const relatedArtifacts = normalizeReferences(input.relatedArtifacts ?? [], "artifact");
  const relatedRuns = normalizeReferences(input.relatedRuns ?? [], "run");
  const riskNotes = uniqueExecutionReadinessStrings(input.riskNotes ?? plan?.riskNotes ?? []);
  const executionIntent = inferExecutionIntent({
    explicit: input.executionIntent,
    domain: taskDomain,
    goal: taskGoal,
  });
  const mutationIntent = inferMutationIntent({
    explicit: input.mutationIntent,
    impactedFiles,
    approvalGates,
    goal: taskGoal,
  });
  const commandIntent = inferCommandIntent({
    explicit: input.commandIntent,
    suggestedTests,
    goal: taskGoal,
  });
  const draft = {
    id: buildExecutionReadinessStableKey(
      "execution-readiness-input",
      activatedTaskId,
      taskGoal,
      steps.map((step) => step.id).join(".")
    ),
    activatedTaskId,
    taskGoal,
    taskDomain,
    steps,
    impactedFiles,
    relatedMemories,
    relatedArtifacts,
    relatedRuns,
    riskNotes,
    approvalGates,
    suggestedTests,
    executionIntent,
    mutationIntent,
    commandIntent,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionReadinessInput(draft),
  };
}

export function validateExecutionReadinessInput(
  input: ExecutionReadinessInput
): ExecutionReadinessInputValidation {
  const reasons = [
    input.activatedTaskId.trim() ? "" : "Activated task id is required.",
    input.taskGoal.trim() ? "" : "Task goal is required.",
    input.steps.length > 0 ? "" : "At least one activated task step is required.",
    input.approvalGates.length > 0 ? "" : "Approval gates must be visible.",
  ].filter(Boolean);
  const valid = reasons.length === 0;

  return {
    id: buildExecutionReadinessStableKey("execution-readiness-validation", input.id),
    inputId: input.id,
    valid,
    state: valid ? "valid" : "blocked",
    reasons,
    summary: summarizeExecutionReadinessInput(input),
  };
}

export function summarizeExecutionReadinessInput(input: ExecutionReadinessInput): string[] {
  return [
    `Execution readiness input maps activated task ${input.activatedTaskId} to a visible readiness cockpit.`,
    `${input.steps.length} steps, ${input.impactedFiles.length} impacted files, ${input.relatedMemories.length} memories, ${input.relatedArtifacts.length} artifacts, and ${input.relatedRuns.length} runs are in scope.`,
    `Execution intent: ${input.executionIntent}; mutation intent: ${input.mutationIntent}; command intent: ${input.commandIntent}.`,
    "Input is deterministic and local-first: no runtime clocks, random IDs, network calls, or AI calls.",
  ];
}
