import {
  buildStepRunnerPreviewStableKey,
  uniqueStepRunnerPreviewStrings,
  type StepRunnerApprovalState,
  type StepRunnerCommandIntent,
  type StepRunnerDomain,
  type StepRunnerInput,
  type StepRunnerInputDraft,
  type StepRunnerInputValidation,
  type StepRunnerMutationIntent,
  type StepRunnerReadinessStatus,
  type StepRunnerReference,
} from "./step-runner-preview-types";

const DEFAULT_GOAL =
  "Preview an active task step run packet without executing the step.";

const DEFAULT_STEPS = [
  "Inspect current task context and selected step.",
  "Build a policy checked approval packet.",
  "Prepare a dry run plan without running commands.",
];

const DOMAINS: StepRunnerDomain[] = [
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

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeDomain(value: unknown): StepRunnerDomain {
  const normalized = normalizeString(value);
  return normalized && DOMAINS.includes(normalized as StepRunnerDomain)
    ? (normalized as StepRunnerDomain)
    : "general";
}

function normalizeStepIndex(value: unknown, stepCount: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  const max = Math.max(stepCount - 1, 0);
  return Math.min(Math.max(Math.trunc(value), 0), max);
}

function normalizeReadinessStatus(
  value: unknown,
  fallback: StepRunnerReadinessStatus
): StepRunnerReadinessStatus {
  return value === "ready" ||
    value === "needs-review" ||
    value === "missing" ||
    value === "blocked"
    ? value
    : fallback;
}

function normalizeMutationIntent(value: unknown): StepRunnerMutationIntent | null {
  return value === "none" ||
    value === "file-mutation" ||
    value === "apply-diff" ||
    value === "memory-mutation" ||
    value === "graph-mutation" ||
    value === "artifact-export"
    ? value
    : null;
}

function normalizeCommandIntent(value: unknown): StepRunnerCommandIntent | null {
  return value === "none" ||
    value === "run-tests" ||
    value === "run-command" ||
    value === "build-web-app"
    ? value
    : null;
}

function normalizeApprovalState(value: unknown): StepRunnerApprovalState {
  return value === "pending" || value === "approved" || value === "rejected"
    ? value
    : "not-requested";
}

function normalizeReference(
  value: string | StepRunnerReference,
  type: "memory" | "artifact" | "run"
): StepRunnerReference | null {
  if (typeof value === "string") {
    const label = normalizeString(value);
    if (!label) return null;
    return {
      id: buildStepRunnerPreviewStableKey("step-runner", type, label),
      label,
      summary: `${type} context is available for preview review.`,
    };
  }

  const label = normalizeString(value.label) ?? normalizeString(value.id);
  if (!label) return null;

  return {
    id:
      normalizeString(value.id) ??
      buildStepRunnerPreviewStableKey("step-runner", type, label),
    label,
    summary:
      normalizeString(value.summary) ??
      `${type} context is available for preview review.`,
  };
}

function normalizeReferences(
  values: Array<string | StepRunnerReference> | null | undefined,
  type: "memory" | "artifact" | "run"
): StepRunnerReference[] {
  const seen = new Set<string>();

  return (values ?? [])
    .map((value) => normalizeReference(value, type))
    .filter((value): value is StepRunnerReference => value !== null)
    .filter((value) => {
      if (seen.has(value.id)) return false;
      seen.add(value.id);
      return true;
    });
}

function collectStepDrafts(input: StepRunnerInputDraft): Array<{
  id: string | null;
  label: string | null;
  text: string;
}> {
  if (input.step) {
    if (typeof input.step === "string") {
      const text = normalizeString(input.step);
      return text ? [{ id: null, label: null, text }] : [];
    }

    const text =
      normalizeString(input.step.text) ??
      normalizeString(input.step.detail) ??
      normalizeString(input.step.label);
    return text
      ? [
          {
            id: normalizeString(input.step.id),
            label: normalizeString(input.step.label),
            text,
          },
        ]
      : [];
  }

  if (input.plan?.steps && input.plan.steps.length > 0) {
    return input.plan.steps
      .map((step) => ({
        id: normalizeString(step.id),
        label: normalizeString(step.label),
        text:
          normalizeString(step.text) ??
          normalizeString(step.detail) ??
          normalizeString(step.label) ??
          "",
      }))
      .filter((step) => step.text.length > 0);
  }

  return DEFAULT_STEPS.map((text, index) => ({
    id: buildStepRunnerPreviewStableKey("default-step", index, text),
    label: `Step ${index + 1}`,
    text,
  }));
}

function inferMutationIntent(args: {
  explicit: StepRunnerMutationIntent | null;
  impactedFiles: string[];
  goal: string;
  stepLabel: string;
  selectedToolIntent: string | null;
}): StepRunnerMutationIntent {
  if (args.explicit) return args.explicit;

  const text = `${args.goal} ${args.stepLabel} ${args.selectedToolIntent ?? ""}`.toLowerCase();
  if (text.includes("brain") || text.includes("graph")) return "graph-mutation";
  if (text.includes("memory")) return "memory-mutation";
  if (text.includes("apply-diff")) return "apply-diff";
  if (
    args.impactedFiles.length > 0 ||
    text.includes("write-file") ||
    text.includes("file mutation") ||
    text.includes("patch")
  ) {
    return "file-mutation";
  }

  return "none";
}

function inferCommandIntent(args: {
  explicit: StepRunnerCommandIntent | null;
  goal: string;
  stepLabel: string;
  selectedToolIntent: string | null;
}): StepRunnerCommandIntent {
  if (args.explicit) return args.explicit;

  const text = `${args.goal} ${args.stepLabel} ${args.selectedToolIntent ?? ""}`.toLowerCase();
  if (text.includes("build-web-app") || text.includes("npm run build")) {
    return "build-web-app";
  }
  if (text.includes("run-command") || text.includes("shell")) return "run-command";
  if (text.includes("run-tests") || text.includes("test")) return "run-tests";
  return "none";
}

function inferSelectedToolIntent(args: {
  explicit: string | null;
  mutationIntent: StepRunnerMutationIntent;
  commandIntent: StepRunnerCommandIntent;
}): string {
  if (args.explicit) return args.explicit.trim().toLowerCase();
  if (args.commandIntent === "build-web-app") return "build-web-app";
  if (args.commandIntent === "run-command") return "run-command";
  if (args.commandIntent === "run-tests") return "run-tests";
  if (args.mutationIntent === "apply-diff") return "apply-diff";
  if (args.mutationIntent === "file-mutation") return "write-file";
  if (args.mutationIntent === "graph-mutation") return "brain-merge-review";
  if (args.mutationIntent === "memory-mutation") return "memory-review";
  return "read-file";
}

export function buildStepRunnerInput(
  input: StepRunnerInputDraft = {}
): StepRunnerInput {
  const stepDrafts = collectStepDrafts(input);
  const selectedIndex = normalizeStepIndex(input.stepIndex, stepDrafts.length);
  const selectedStep = stepDrafts[selectedIndex] ?? stepDrafts[0] ?? {
    id: null,
    label: "Step 1",
    text: DEFAULT_STEPS[0],
  };
  const activeTaskId =
    normalizeString(input.activeTaskId) ??
    normalizeString(input.plan?.id) ??
    normalizeString(input.readiness?.activatedTaskId) ??
    "step-runner-preview-active-task";
  const taskGoal =
    normalizeString(input.taskGoal) ??
    normalizeString(input.plan?.goal) ??
    normalizeString(input.readiness?.taskGoal) ??
    DEFAULT_GOAL;
  const taskDomain = normalizeDomain(
    input.taskDomain ?? input.plan?.domain ?? input.readiness?.taskDomain
  );
  const stepLabel =
    normalizeString(input.stepLabel) ??
    normalizeString(selectedStep.label) ??
    selectedStep.text;
  const stepId =
    normalizeString(input.stepId) ??
    normalizeString(selectedStep.id) ??
    buildStepRunnerPreviewStableKey("step-runner-step", activeTaskId, selectedIndex, stepLabel);
  const impactedFiles = uniqueStepRunnerPreviewStrings(
    input.impactedFiles ?? input.plan?.impactedFiles ?? input.readiness?.impactedFiles ?? []
  );
  const explicitTool = normalizeString(input.selectedToolIntent);
  const firstMutationIntent = normalizeMutationIntent(input.mutationIntent);
  const firstCommandIntent = normalizeCommandIntent(input.commandIntent);
  const mutationIntent = inferMutationIntent({
    explicit: firstMutationIntent,
    impactedFiles,
    goal: taskGoal,
    stepLabel,
    selectedToolIntent: explicitTool,
  });
  const commandIntent = inferCommandIntent({
    explicit: firstCommandIntent,
    goal: taskGoal,
    stepLabel,
    selectedToolIntent: explicitTool,
  });
  const selectedToolIntent = inferSelectedToolIntent({
    explicit: explicitTool,
    mutationIntent,
    commandIntent,
  });
  const relatedMemories = normalizeReferences(
    input.relatedMemories ?? input.plan?.sourceMemoryIds ?? input.readiness?.relatedMemories ?? [],
    "memory"
  );
  const relatedArtifacts = normalizeReferences(
    input.relatedArtifacts ?? input.readiness?.relatedArtifacts ?? [],
    "artifact"
  );
  const relatedRuns = normalizeReferences(
    input.relatedRuns ?? input.readiness?.relatedRuns ?? [],
    "run"
  );
  const readinessStatus = normalizeReadinessStatus(
    input.readinessStatus,
    input.readiness ? "ready" : "needs-review"
  );
  const draft: StepRunnerInput = {
    id: buildStepRunnerPreviewStableKey(
      "step-runner-input",
      activeTaskId,
      stepId,
      selectedToolIntent
    ),
    activeTaskId,
    stepId,
    stepLabel,
    stepIndex: selectedIndex,
    taskGoal,
    taskDomain,
    impactedFiles,
    relatedMemories,
    relatedArtifacts,
    relatedRuns,
    readinessStatus,
    mutationIntent,
    commandIntent,
    selectedToolIntent,
    approvalState: normalizeApprovalState(input.approvalState),
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerInput(draft),
  };
}

export function validateStepRunnerInput(
  input: StepRunnerInput
): StepRunnerInputValidation {
  const reasons = [
    input.activeTaskId.trim() ? "" : "Active task id is required.",
    input.stepId.trim() ? "" : "Step id is required.",
    input.stepLabel.trim() ? "" : "Step label is required.",
    input.taskGoal.trim() ? "" : "Task goal is required.",
    input.stepIndex >= 0 ? "" : "Step index must be zero or greater.",
    input.selectedToolIntent.trim() ? "" : "Selected tool intent is required.",
  ].filter(Boolean);
  const valid = reasons.length === 0;

  return {
    id: buildStepRunnerPreviewStableKey("step-runner-input-validation", input.id),
    inputId: input.id,
    valid,
    state: valid ? "valid" : "blocked",
    reasons,
    summary: summarizeStepRunnerInput(input),
  };
}

export function summarizeStepRunnerInput(input: StepRunnerInput): string[] {
  return [
    `Step Runner Input maps active task ${input.activeTaskId} step ${input.stepIndex + 1} to an approval-ready preview packet.`,
    `${input.impactedFiles.length} impacted files, ${input.relatedMemories.length} memories, ${input.relatedArtifacts.length} artifacts, and ${input.relatedRuns.length} runs are in scope.`,
    `Readiness: ${input.readinessStatus}; mutation intent: ${input.mutationIntent}; command intent: ${input.commandIntent}; selected tool intent: ${input.selectedToolIntent}.`,
    "Input IDs are deterministic: no runtime clocks, random IDs, AI calls, network calls, command execution, or file mutation.",
  ];
}
