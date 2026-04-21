import type {
  CodexForgeDiff,
  CodexForgeExecutionPhase,
  CodexForgeMessage,
  CodexForgePlan,
  CodexForgePlanDomain,
  CodexForgeRole,
  CodexForgeSnapshotMeta,
  CodexForgeStructuredReply,
  CodexForgeStructuredSection,
  CodexForgeStructuredTool,
} from "@/lib/codexforge/types";

export type CodexForgeClientMessage = CodexForgeMessage;
export type CodexForgeClientRole = CodexForgeRole;
export type CodexForgeClientPlan = CodexForgePlan;
export type CodexForgeClientStructuredReply = CodexForgeStructuredReply;
export type CodexForgeClientStructuredSection = CodexForgeStructuredSection;
export type CodexForgeClientStructuredTool = CodexForgeStructuredTool;

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

const VALID_PLAN_STATUSES: readonly NonNullable<CodexForgeClientPlan["status"]>[] = [
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

/* ================= PRIMITIVES ================= */

function asTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
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

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}

/* ================= PLAN ================= */

function normalizePlan(value: unknown): CodexForgeClientPlan | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;

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

  const nextAction = asTrimmedString(record.nextAction) ?? steps[0] ?? undefined;
  const status = isPlanStatus(record.status) ? record.status : undefined;
  const intent = asTrimmedString(record.intent);
  const domain = isPlanDomain(record.domain) ? record.domain : undefined;

  return {
    goal,
    steps,
    ...(asOptionalArray(risks) ? { risks } : null),
    ...(asOptionalArray(files) ? { files } : null),
    ...(asOptionalArray(commands) ? { commands } : null),
    ...(asOptionalArray(notes) ? { notes } : null),
    ...(asOptionalArray(tags) ? { tags } : null),
    ...(nextAction ? { nextAction } : null),
    ...(status ? { status } : null),
    ...(intent ? { intent } : null),
    ...(domain ? { domain } : null),
  };
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
  const nextAction = steps[0];

  return {
    goal,
    steps,
    ...(asOptionalArray(risks) ? { risks } : null),
    ...(asOptionalArray(files) ? { files } : null),
    ...(asOptionalArray(commands) ? { commands } : null),
    ...(asOptionalArray(notes) ? { notes } : null),
    ...(asOptionalArray(tags) ? { tags } : null),
    ...(nextAction ? { nextAction } : null),
    ...(intent ? { intent } : null),
    ...(domain ? { domain } : null),
    status: "active",
  };
}

/* ================= TOOLS ================= */

export function normalizeStructuredTools(
  value: unknown
): CodexForgeClientStructuredTool[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item): CodexForgeClientStructuredTool | null => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return null;

      const record = item as Record<string, unknown>;
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
      if (!section || typeof section !== "object" || Array.isArray(section)) {
        return null;
      }

      const record = section as Record<string, unknown>;
      const title = asTrimmedString(record.title);
      const items = dedupeStrings(asStringArray(record.items));

      if (!title || items.length === 0) {
        return null;
      }

      return { title, items };
    })
    .filter((section): section is CodexForgeClientStructuredSection => section !== null);
}

/* ================= DIFFS ================= */

function normalizeDiffs(value: unknown): CodexForgeDiff[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const diffs = value
    .map((item): CodexForgeDiff | null => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const filePath = asTrimmedString(record.filePath);
      const patch = asTrimmedString(record.patch);

      if (!filePath || !patch) {
        return null;
      }

      return { filePath, patch };
    })
    .filter((item): item is CodexForgeDiff => item !== null);

  return diffs.length > 0 ? diffs : undefined;
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
  if (!record) {
    return undefined;
  }

  const stepText = asTrimmedString(record.stepText);
  const resultSummary = asTrimmedString(record.resultSummary);
  const phase = isExecutionPhase(record.phase) ? record.phase : undefined;
  const stepIndex = asFiniteNumber(record.stepIndex);
  const diffCount = asFiniteNumber(record.diffCount);
  const snapshotFileCount = asFiniteNumber(record.snapshotFileCount);
  const logs = dedupeStrings(asStringArray(record.logs));

  const execution: NonNullable<CodexForgeClientStructuredReply["execution"]> = {
    ...(stepIndex !== undefined ? { stepIndex } : null),
    ...(stepText ? { stepText } : null),
    ...(resultSummary ? { resultSummary } : null),
    ...(phase ? { phase } : null),
    ...(diffCount !== undefined ? { diffCount } : null),
    ...(snapshotFileCount !== undefined ? { snapshotFileCount } : null),
    ...(logs.length > 0 ? { logs } : null),
  };

  return Object.keys(execution).length > 0 ? execution : undefined;
}

/* ================= STRUCTURED REPLY ================= */

export function normalizeStructuredReply(
  value: unknown
): CodexForgeClientStructuredReply | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;

  const tools = normalizeStructuredTools(record.tools);
  const sections = normalizeStructuredSections(record.sections);
  const diffs = normalizeDiffs(record.diffs);
  const snapshot = normalizeSnapshot(record.snapshot);

  const explicitPlan = normalizePlan(record.plan);
  const legacyPlan = buildLegacyPlan(record);
  const plan = explicitPlan ?? legacyPlan;

  const directGoal = asTrimmedString(record.goal);
  const directNextSteps = dedupeStrings(asStringArray(record.nextSteps));
  const directContext = dedupeStrings(asStringArray(record.context));
  const directUnderstanding = dedupeStrings(asStringArray(record.understanding));
  const directFiles = dedupeStrings(asStringArray(record.files));
  const directCommands = dedupeStrings(asStringArray(record.commands));
  const directRisks = dedupeStrings(asStringArray(record.risks));
  const directStatus = dedupeStrings(asStringArray(record.status));
  const directTags = dedupeStrings(asStringArray(record.tags));

  const domain =
    isPlanDomain(record.domain) ? record.domain : plan?.domain;

  const mergedTags = dedupeStrings([
    ...directTags,
    ...(plan?.tags ?? []),
  ]);

  const structured: CodexForgeClientStructuredReply = {
    mode: asTrimmedString(record.mode),
    title: asTrimmedString(record.title),
    summary: asTrimmedString(record.summary),

    plan,

    goal: directGoal ?? plan?.goal,
    nextSteps: directNextSteps.length > 0 ? directNextSteps : plan?.steps,

    context: asOptionalArray(directContext),
    understanding: asOptionalArray(directUnderstanding),
    files: asOptionalArray(directFiles) ?? plan?.files,
    commands: asOptionalArray(directCommands) ?? plan?.commands,
    risks: asOptionalArray(directRisks) ?? plan?.risks,
    status: asOptionalArray(directStatus),

    tools: tools.length > 0 ? tools : undefined,
    sections: sections.length > 0 ? sections : undefined,

    execution: normalizeExecution(record.execution),
    ...(diffs ? { diffs } : null),
    ...(snapshot ? { snapshot } : null),
    ...(domain ? { domain } : null),
    ...(mergedTags.length > 0 ? { tags: mergedTags } : null),
  };

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
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const id = asTrimmedString(candidate.id);
      const role = candidate.role;
      const text =
        typeof candidate.text === "string" ? candidate.text : "";
      const ts =
        typeof candidate.ts === "number" && Number.isFinite(candidate.ts)
          ? candidate.ts
          : null;

      if (!id || !isRole(role) || !text || ts === null) {
        return null;
      }

      const sourceValue = candidate.source;

      return {
        id,
        role,
        text,
        ts,
        structured: normalizeStructuredReply(candidate.structured),
        source:
          sourceValue === "api" ||
          sourceValue === "local-fallback" ||
          sourceValue === "system"
            ? sourceValue
            : role === "system"
              ? "system"
              : "api",
      };
    })
    .filter((item): item is CodexForgeClientMessage => item !== null);

  return parsed.slice(-300);
}