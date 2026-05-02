import type {
  CodexForgeDiff,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgePlan,
  CodexForgePlanDomain,
  CodexForgeRole,
  CodexForgeSnapshotMeta,
  CodexForgeStructuredReply,
  CodexForgeStructuredReplyMode,
  CodexForgeStructuredSection,
  CodexForgeStructuredTool,
} from "@/lib/codexforge/types";

export type CodexForgeClientMessage = CodexForgeMessage;
export type CodexForgeClientRole = CodexForgeRole;
export type CodexForgeClientPlan = CodexForgePlan;
export type CodexForgeClientStructuredReply = CodexForgeStructuredReply;
export type CodexForgeClientStructuredSection = CodexForgeStructuredSection;
export type CodexForgeClientStructuredTool = CodexForgeStructuredTool;

const MAX_CLIENT_MESSAGES = 300;

const VALID_PLAN_DOMAINS: readonly CodexForgePlanDomain[] = [
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
] as const;

const VALID_PLAN_STATUSES: readonly NonNullable<
  CodexForgeClientPlan["status"]
>[] = [
  "draft",
  "active",
  "completed",
  "executed",
  "blocked",
  "needs-approval",
] as const;

const VALID_EXECUTION_PHASES: readonly CodexForgeExecutionPhase[] = [
  "idle",
  "planning",
  "awaiting_plan_approval",
  "diffing",
  "awaiting_diff_approval",
  "applying",
  "testing",
  "done",
  "error",
  "fallback",
] as const;

const VALID_STRUCTURED_REPLY_MODES: readonly CodexForgeStructuredReplyMode[] = [
  "local",
  "local-fallback",
  "local-execution",
  "local-execution-fallback",
] as const;

/* ================= TYPE GUARDS ================= */

function isRole(value: unknown): value is CodexForgeClientRole {
  return value === "user" || value === "assistant" || value === "system";
}

function isToolAvailability(
  value: unknown
): value is CodexForgeClientStructuredTool["availability"] {
  return value === "unavailable" || value === "stub" || value === "ready";
}

function isPlanStatus(
  value: unknown
): value is NonNullable<CodexForgeClientPlan["status"]> {
  return VALID_PLAN_STATUSES.includes(
    value as NonNullable<CodexForgeClientPlan["status"]>
  );
}

function isPlanDomain(value: unknown): value is CodexForgePlanDomain {
  return VALID_PLAN_DOMAINS.includes(value as CodexForgePlanDomain);
}

function isExecutionPhase(value: unknown): value is CodexForgeExecutionPhase {
  return VALID_EXECUTION_PHASES.includes(value as CodexForgeExecutionPhase);
}

function isStructuredReplyMode(
  value: unknown
): value is CodexForgeStructuredReplyMode {
  return VALID_STRUCTURED_REPLY_MODES.includes(
    value as CodexForgeStructuredReplyMode
  );
}

/* ================= PRIMITIVES ================= */

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}

function asTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupeStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function asOptionalArray<T>(values: T[]): T[] | undefined {
  return values.length > 0 ? values : undefined;
}

function hasKeys(value: object): boolean {
  return Object.keys(value).length > 0;
}

/* ================= PLAN ================= */

function normalizePlan(value: unknown): CodexForgeClientPlan | undefined {
  const record = asRecord(value);
  if (!record) return undefined;

  const goal = asTrimmedString(record.goal);
  const steps = dedupeStrings(asStringArray(record.steps));

  if (!goal || steps.length === 0) {
    return undefined;
  }

  const risks = dedupeStrings(asStringArray(record.risks));
  const files = dedupeStrings(asStringArray(record.files));
  const commands = dedupeStrings(asStringArray(record.commands));
  const notes = dedupeStrings(asStringArray(record.notes));
  const tags = dedupeStrings(asStringArray(record.tags));

  const plan: CodexForgeClientPlan = {
    goal,
    steps,
  };

  const nextAction = asTrimmedString(record.nextAction) ?? steps[0];
  const status = isPlanStatus(record.status) ? record.status : undefined;
  const intent = asTrimmedString(record.intent);
  const domain = isPlanDomain(record.domain) ? record.domain : undefined;

  if (risks.length > 0) plan.risks = risks;
  if (files.length > 0) plan.files = files;
  if (commands.length > 0) plan.commands = commands;
  if (notes.length > 0) plan.notes = notes;
  if (tags.length > 0) plan.tags = tags;
  if (nextAction) plan.nextAction = nextAction;
  if (status) plan.status = status;
  if (intent) plan.intent = intent;
  if (domain) plan.domain = domain;

  return plan;
}

function buildLegacyPlan(
  record: Record<string, unknown>
): CodexForgeClientPlan | undefined {
  const goal = asTrimmedString(record.goal);
  const steps = dedupeStrings(asStringArray(record.nextSteps));

  if (!goal || steps.length === 0) {
    return undefined;
  }

  const risks = dedupeStrings(asStringArray(record.risks));
  const files = dedupeStrings(asStringArray(record.files));
  const commands = dedupeStrings(asStringArray(record.commands));
  const notes = dedupeStrings(asStringArray(record.notes));
  const tags = dedupeStrings(asStringArray(record.tags));
  const intent = asTrimmedString(record.intent);
  const domain = isPlanDomain(record.domain) ? record.domain : undefined;

  const plan: CodexForgeClientPlan = {
    goal,
    steps,
    status: "active",
    nextAction: steps[0],
  };

  if (risks.length > 0) plan.risks = risks;
  if (files.length > 0) plan.files = files;
  if (commands.length > 0) plan.commands = commands;
  if (notes.length > 0) plan.notes = notes;
  if (tags.length > 0) plan.tags = tags;
  if (intent) plan.intent = intent;
  if (domain) plan.domain = domain;

  return plan;
}

/* ================= TOOLS ================= */

export function normalizeStructuredTools(
  value: unknown
): CodexForgeClientStructuredTool[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item): CodexForgeClientStructuredTool | null => {
      const record = asRecord(item);
      if (!record) return null;

      const name = asTrimmedString(record.name);
      const description = asTrimmedString(record.description);
      const availability = record.availability;

      if (!name || !description || !isToolAvailability(availability)) {
        return null;
      }

      return {
        name,
        availability,
        description,
      };
    })
    .filter((item): item is CodexForgeClientStructuredTool => item !== null);
}

/* ================= SECTIONS ================= */

function normalizeStructuredSections(
  value: unknown
): CodexForgeClientStructuredSection[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((section): CodexForgeClientStructuredSection | null => {
      const record = asRecord(section);
      if (!record) return null;

      const title = asTrimmedString(record.title);
      const items = dedupeStrings(asStringArray(record.items));

      if (!title || items.length === 0) {
        return null;
      }

      return { title, items };
    })
    .filter(
      (section): section is CodexForgeClientStructuredSection => section !== null
    );
}

/* ================= DIFFS ================= */

function normalizeDiffs(value: unknown): CodexForgeDiff[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const diffs = value
    .map((item): CodexForgeDiff | null => {
      const record = asRecord(item);
      if (!record) return null;

      const filePath = asTrimmedString(record.filePath);
      const patch = asTrimmedString(record.patch);

      if (!filePath || !patch) {
        return null;
      }

      return { filePath, patch };
    })
    .filter((item): item is CodexForgeDiff => item !== null);

  return asOptionalArray(diffs);
}

/* ================= SNAPSHOT ================= */

function normalizeSnapshot(value: unknown): CodexForgeSnapshotMeta | undefined {
  const record = asRecord(value);
  if (!record) return undefined;

  const fileCount = asFiniteNumber(record.fileCount);
  const sampledPaths = dedupeStrings(asStringArray(record.sampledPaths));

  if (fileCount === undefined && sampledPaths.length === 0) {
    return undefined;
  }

  return {
    fileCount: fileCount ?? 0,
    sampledPaths,
  };
}

/* ================= EXECUTION ================= */

function normalizeExecution(
  value: unknown
): CodexForgeClientStructuredReply["execution"] | undefined {
  const record = asRecord(value);
  if (!record) return undefined;

  const execution: NonNullable<CodexForgeClientStructuredReply["execution"]> = {};

  const stepText = asTrimmedString(record.stepText);
  const resultSummary = asTrimmedString(record.resultSummary);
  const phase = isExecutionPhase(record.phase) ? record.phase : undefined;
  const stepIndex = asFiniteNumber(record.stepIndex);
  const diffCount = asFiniteNumber(record.diffCount);
  const snapshotFileCount = asFiniteNumber(record.snapshotFileCount);
  const logs = dedupeStrings(asStringArray(record.logs));

  if (stepIndex !== undefined) execution.stepIndex = stepIndex;
  if (stepText) execution.stepText = stepText;
  if (resultSummary) execution.resultSummary = resultSummary;
  if (phase) execution.phase = phase;
  if (diffCount !== undefined) execution.diffCount = diffCount;
  if (snapshotFileCount !== undefined) {
    execution.snapshotFileCount = snapshotFileCount;
  }
  if (logs.length > 0) execution.logs = logs;

  return hasKeys(execution) ? execution : undefined;
}

/* ================= STRUCTURED REPLY ================= */

export function normalizeStructuredReply(
  value: unknown
): CodexForgeClientStructuredReply | null {
  const record = asRecord(value);
  if (!record) return null;

  const tools = normalizeStructuredTools(record.tools);
  const sections = normalizeStructuredSections(record.sections);
  const diffs = normalizeDiffs(record.diffs);
  const snapshot = normalizeSnapshot(record.snapshot);
  const plan = normalizePlan(record.plan) ?? buildLegacyPlan(record);

  const directGoal = asTrimmedString(record.goal);
  const directNextSteps = dedupeStrings(asStringArray(record.nextSteps));
  const directContext = dedupeStrings(asStringArray(record.context));
  const directUnderstanding = dedupeStrings(asStringArray(record.understanding));
  const directFiles = dedupeStrings(asStringArray(record.files));
  const directCommands = dedupeStrings(asStringArray(record.commands));
  const directRisks = dedupeStrings(asStringArray(record.risks));
  const directStatus = dedupeStrings(asStringArray(record.status));
  const directTags = dedupeStrings(asStringArray(record.tags));

  const domain = isPlanDomain(record.domain) ? record.domain : plan?.domain;
  const mergedTags = dedupeStrings([...directTags, ...(plan?.tags ?? [])]);

  const structured: CodexForgeClientStructuredReply = {};

  const mode = isStructuredReplyMode(record.mode) ? record.mode : undefined;
  const title = asTrimmedString(record.title);
  const summary = asTrimmedString(record.summary);
  const execution = normalizeExecution(record.execution);

  if (mode) structured.mode = mode;
  if (title) structured.title = title;
  if (summary) structured.summary = summary;
  if (plan) structured.plan = plan;

  const goal = directGoal ?? plan?.goal;
  const nextSteps =
    directNextSteps.length > 0 ? directNextSteps : plan?.steps;
  const files =
    asOptionalArray(directFiles) ?? asOptionalArray(plan?.files ?? []);
  const commands =
    asOptionalArray(directCommands) ?? asOptionalArray(plan?.commands ?? []);
  const risks =
    asOptionalArray(directRisks) ?? asOptionalArray(plan?.risks ?? []);

  if (goal) structured.goal = goal;
  if (nextSteps && nextSteps.length > 0) structured.nextSteps = nextSteps;
  if (directContext.length > 0) structured.context = directContext;
  if (directUnderstanding.length > 0) {
    structured.understanding = directUnderstanding;
  }
  if (files && files.length > 0) structured.files = files;
  if (commands && commands.length > 0) structured.commands = commands;
  if (risks && risks.length > 0) structured.risks = risks;
  if (directStatus.length > 0) structured.status = directStatus;
  if (tools.length > 0) structured.tools = tools;
  if (sections.length > 0) structured.sections = sections;
  if (execution) structured.execution = execution;
  if (diffs) structured.diffs = diffs;
  if (snapshot) structured.snapshot = snapshot;
  if (domain) structured.domain = domain;
  if (mergedTags.length > 0) structured.tags = mergedTags;

  const hasContent =
    !!structured.mode ||
    !!structured.title ||
    !!structured.summary ||
    !!structured.plan ||
    !!structured.goal ||
    (structured.context?.length ?? 0) > 0 ||
    (structured.understanding?.length ?? 0) > 0 ||
    (structured.files?.length ?? 0) > 0 ||
    (structured.commands?.length ?? 0) > 0 ||
    (structured.risks?.length ?? 0) > 0 ||
    (structured.nextSteps?.length ?? 0) > 0 ||
    (structured.status?.length ?? 0) > 0 ||
    (structured.tools?.length ?? 0) > 0 ||
    (structured.sections?.length ?? 0) > 0 ||
    !!structured.execution ||
    (structured.diffs?.length ?? 0) > 0 ||
    !!structured.snapshot ||
    !!structured.domain ||
    (structured.tags?.length ?? 0) > 0;

  return hasContent ? structured : null;
}

/* ================= MESSAGES ================= */

export function asMessages(value: unknown): CodexForgeClientMessage[] {
  if (!Array.isArray(value)) return [];

  const parsed = value
    .map((item): CodexForgeClientMessage | null => {
      const candidate = asRecord(item);
      if (!candidate) return null;

      const id = asTrimmedString(candidate.id);
      const role = candidate.role;
      const text = typeof candidate.text === "string" ? candidate.text : "";
      const ts = asFiniteNumber(candidate.ts);

      if (!id || !isRole(role) || text.length === 0 || ts === undefined) {
        return null;
      }

      const sourceValue = candidate.source;
      const source =
        sourceValue === "api" ||
        sourceValue === "local-fallback" ||
        sourceValue === "system"
          ? sourceValue
          : role === "system"
            ? "system"
            : "api";

      return {
        id,
        role,
        text,
        ts,
        structured: normalizeStructuredReply(candidate.structured),
        source,
      };
    })
    .filter((item): item is CodexForgeClientMessage => item !== null);

  return parsed.slice(-MAX_CLIENT_MESSAGES);
}