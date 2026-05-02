// src/lib/codexforge/chat/engine-render.ts

import type {
  CodexForgeChatContext,
  CodexForgeDiff,
  CodexForgeStructuredReply,
} from "../types";

import type {
  CodexForgeEngineAnalysis,
  CodexForgeEnginePlan,
} from "./contracts";

import {
  LIMITS,
  clampList,
  clampOptionalList,
  clampText,
  getExecutionDiffCount,
  getExecutionRequest,
  getExecutionSnapshotFileCount,
  isExecutionMode,
  resolveExecutionPhase,
} from "./engine-shared";

import {
  buildPlanStatus,
  buildUnderstandingItems,
} from "./engine-analysis";

/* ================= TYPES ================= */

type StructuredSection = NonNullable<CodexForgeStructuredReply["sections"]>[number];

type SectionPriority = "hero" | "primary" | "supporting" | "diagnostic";

type NormalizedSection = StructuredSection & {
  priority?: SectionPriority;
};

type MaybeString = string | undefined | null | false;

type GroundedRecommendation = {
  headline: string | undefined;
  file: string | undefined;
  fn: string | undefined;
  line: string | undefined;
  confidence: string | undefined;
  reason: string | undefined;
  nextAction: string | undefined;
  sourceSectionTitles: string[];
};

type RenderBucket = {
  heroSections: NormalizedSection[];
  primarySections: NormalizedSection[];
  supportingSections: NormalizedSection[];
  diagnosticSections: NormalizedSection[];
};

type TextSection = {
  title: string;
  items: string[];
};

/* ================= CONSTANTS ================= */

const GROUNDED_SECTION_TITLE = "Grounded recommendation";
const NEXT_ACTION_SECTION_TITLE = "Recommended next action";
const TOOL_AUDIT_SECTION_TITLE = "Tool audit";
const AUTO_INSPECTION_PREFIX = "Auto inspection:";
const FOLLOW_UP_INSPECTION_PREFIX = "Follow-up inspection:";

const GROUNDED_SECTION_TITLES = new Set([
  GROUNDED_SECTION_TITLE.toLowerCase(),
  NEXT_ACTION_SECTION_TITLE.toLowerCase(),
]);

const DIAGNOSTIC_SECTION_TITLES = new Set([
  TOOL_AUDIT_SECTION_TITLE.toLowerCase(),
]);

const LOW_VALUE_VISIBLE_SECTION_TITLES = new Set(
  [
    "automatic repo inspection",
    "auto inspection: read-file",
    "auto inspection: search-project",
    "auto inspection: list-files",
    "follow-up inspection: read-file",
    "follow-up inspection: search-project",
    "follow-up inspection: list-files",
    "tool audit",
    "recommended tool names",
    "tools",
    "status",
    "tags",
    "context",
    "interpretation",
    "what i understood",
    "files to check",
    "file clusters",
    "snapshot",
  ].map((title) => title.toLowerCase())
);

const MAX_VISIBLE_TEXT_LINES = 220;
const MAX_VISIBLE_SECTION_ITEMS = 12;
const MAX_VISIBLE_TOOLS = 8;

/* ================= GENERIC HELPERS ================= */

function compact(values: MaybeString[]): string[] {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is string => value.length > 0);
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeKey(value: string): string {
  return normalizeWhitespace(value).toLowerCase();
}

function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    const key = normalizeKey(trimmed);
    if (seen.has(key)) continue;

    seen.add(key);
    output.push(trimmed);
  }

  return output;
}

function normalizeVisibleText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\\\/]+/g, "/")
    .replace(/\s+/g, " ")
    .replace(/[•\-–—:;.]+$/g, "")
    .trim();
}

function dedupeVisibleItems(
  items?: MaybeString[],
  globalSeen?: Set<string>
): string[] {
  const localSeen = new Set<string>();
  const output: string[] = [];

  for (const item of items ?? []) {
    if (typeof item !== "string") continue;

    const trimmed = item.trim();
    if (!trimmed) continue;

    const key = normalizeVisibleText(trimmed);
    if (!key) continue;
    if (localSeen.has(key)) continue;
    if (globalSeen?.has(key)) continue;

    localSeen.add(key);
    output.push(trimmed);
  }

  return clampSectionItems(output);
}

function dedupeSections(sections: NormalizedSection[]): NormalizedSection[] {
  const seen = new Set<string>();
  const output: NormalizedSection[] = [];

  for (const section of sections) {
    const title = section.title?.trim();
    const items = dedupeStrings(section.items ?? []);

    if (!title || items.length === 0) continue;

    const key = `${normalizeKey(title)}::${items.map(normalizeKey).join("|")}`;
    if (seen.has(key)) continue;

    seen.add(key);
    output.push({
      ...section,
      title,
      items,
    });
  }

  return output;
}

function clampSectionItems(items: string[] | undefined): string[] {
  return dedupeStrings(items ?? [])
    .map((item) => clampText(item, LIMITS.maxSummaryText))
    .slice(0, MAX_VISIBLE_SECTION_ITEMS);
}

function makeSection(
  title: string,
  items: string[] | undefined,
  priority?: SectionPriority
): NormalizedSection | null {
  const cleanedItems = clampSectionItems(items);

  if (!title.trim() || cleanedItems.length === 0) {
    return null;
  }

  return {
    title: title.trim(),
    items: cleanedItems,
    ...(priority ? { priority } : {}),
  };
}

function pushIfSection(
  sections: NormalizedSection[],
  section: NormalizedSection | null
): void {
  if (section) sections.push(section);
}

function stripPriority(section: NormalizedSection): StructuredSection {
  return {
    title: section.title,
    items: section.items,
  };
}

function startsWithAny(value: string, prefixes: string[]): boolean {
  const normalized = value.toLowerCase();
  return prefixes.some((prefix) => normalized.startsWith(prefix.toLowerCase()));
}

/* ================= SUMMARY ================= */

function buildExecutionSummary(context: CodexForgeChatContext): string {
  const request = getExecutionRequest(context);
  const phase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);

  const parts = compact([
    request?.stepText
      ? `Processed step "${request.stepText}"`
      : "Processed execution step",
    `phase ${phase}`,
    typeof diffCount === "number"
      ? `${diffCount} diff preview${diffCount === 1 ? "" : "s"}`
      : "",
    typeof snapshotFileCount === "number"
      ? `${snapshotFileCount} snapshot file${
          snapshotFileCount === 1 ? "" : "s"
        }`
      : "",
  ]);

  return clampText(parts.join(" • "), LIMITS.maxSummaryText);
}

function buildSummary(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
): string {
  if (isExecutionMode(context)) {
    return buildExecutionSummary(context);
  }

  return clampText(
    plan.goal ?? `Generated ${analysis.intent} response.`,
    LIMITS.maxSummaryText
  );
}

/* ================= EXECUTION ================= */

function buildExecution(context: CodexForgeChatContext) {
  const request = getExecutionRequest(context);
  const phase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);

  const hasExecution =
    request?.mode === "execute-task-step" ||
    !!context.execution?.enginePhase ||
    typeof diffCount === "number" ||
    typeof snapshotFileCount === "number";

  if (!hasExecution) {
    return undefined;
  }

  const logs =
    request?.mode === "execute-task-step"
      ? clampList(
          compact([
            "Execution request interpreted locally.",
            request.stepText ? `Processed step: ${request.stepText}` : "",
            typeof diffCount === "number" ? `Diff count: ${diffCount}` : "",
            typeof snapshotFileCount === "number"
              ? `Snapshot files: ${snapshotFileCount}`
              : "",
          ]),
          4
        )
      : undefined;

  return {
    ...(typeof request?.stepIndex === "number"
      ? { stepIndex: request.stepIndex }
      : {}),
    ...(request?.stepText ? { stepText: request.stepText } : {}),
    phase,
    ...(typeof diffCount === "number" ? { diffCount } : {}),
    ...(typeof snapshotFileCount === "number" ? { snapshotFileCount } : {}),
    resultSummary: buildExecutionSummary(context),
    ...(logs?.length ? { logs } : {}),
  };
}

function getDiffs(context: CodexForgeChatContext): CodexForgeDiff[] | undefined {
  const diffs = context.execution?.diffs;

  if (!Array.isArray(diffs) || diffs.length === 0) {
    return undefined;
  }

  const normalized = diffs
    .filter(
      (diff): diff is CodexForgeDiff =>
        !!diff &&
        typeof diff.filePath === "string" &&
        diff.filePath.trim().length > 0 &&
        typeof diff.patch === "string"
    )
    .map((diff) => ({
      ...diff,
      filePath: diff.filePath.trim(),
      patch: diff.patch,
    }))
    .slice(0, LIMITS.maxGraphDiffs);

  return normalized.length > 0 ? normalized : undefined;
}

/* ================= PLAN ================= */

function buildStructuredPlan(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
) {
  const request = getExecutionRequest(context);
  const activeSteps = clampList(
    context.activePlan?.steps ?? [],
    LIMITS.maxPlanSteps
  );

  const steps =
    activeSteps.length > 0
      ? activeSteps
      : clampList(plan.nextSteps, LIMITS.maxPlanSteps);

  return {
    goal: plan.goal,
    steps,
    nextAction:
      request?.mode === "execute-task-step"
        ? plan.nextSteps[0] ?? "Review result"
        : context.activePlan?.nextAction ?? plan.nextSteps[0] ?? "Continue",
    risks: clampOptionalList(plan.risks, LIMITS.maxRisks),
    files: clampOptionalList(plan.files, LIMITS.maxFiles),
    commands: clampOptionalList(plan.commands, LIMITS.maxCommands),
    status: buildPlanStatus(analysis.intent, context),
    intent: analysis.intent,
    domain: plan.domain,
    tags: clampOptionalList(plan.tags, LIMITS.maxTags),
  };
}

/* ================= SECTION NORMALIZATION ================= */

function classifySection(section: StructuredSection): SectionPriority {
  const title = normalizeKey(section.title);

  if (GROUNDED_SECTION_TITLES.has(title)) {
    return "hero";
  }

  if (
    title.startsWith(AUTO_INSPECTION_PREFIX.toLowerCase()) ||
    title.startsWith(FOLLOW_UP_INSPECTION_PREFIX.toLowerCase()) ||
    DIAGNOSTIC_SECTION_TITLES.has(title)
  ) {
    return "diagnostic";
  }

  if (
    title.includes("what i understood") ||
    title.includes("interpretation") ||
    title.includes("automatic repo inspection") ||
    title.includes("context")
  ) {
    return "supporting";
  }

  return "primary";
}

function normalizePlanSections(plan: CodexForgeEnginePlan): NormalizedSection[] {
  return dedupeSections(
    (plan.sections ?? [])
      .map((section): NormalizedSection | null => {
        const title = section.title?.trim();
        const items = clampSectionItems(section.items);

        if (!title || items.length === 0) return null;

        return {
          title,
          items,
          priority: classifySection({ title, items }),
        };
      })
      .filter((section): section is NormalizedSection => section !== null)
  );
}

function findItem(items: string[], prefix: string): string | undefined {
  const normalizedPrefix = prefix.toLowerCase();
  return items.find((item) => item.toLowerCase().startsWith(normalizedPrefix));
}

function stripLabel(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const colonIndex = value.indexOf(":");
  if (colonIndex < 0) return value.trim();

  return value.slice(colonIndex + 1).trim();
}

function extractGroundedRecommendation(
  sections: NormalizedSection[]
): GroundedRecommendation | null {
  const sourceSections = sections.filter(
    (section) =>
      section.priority === "hero" ||
      normalizeKey(section.title).startsWith(
        AUTO_INSPECTION_PREFIX.toLowerCase()
      )
  );

  if (sourceSections.length === 0) {
    return null;
  }

  const allItems = dedupeStrings(sourceSections.flatMap((section) => section.items));

  const startHere = stripLabel(findItem(allItems, "Start here:"));
  const bestNext = stripLabel(findItem(allItems, "Best next edit point:"));
  const bestTarget = stripLabel(findItem(allItems, "Best edit target:"));
  const matchedFile = stripLabel(findItem(allItems, "Matched file:"));
  const primaryFile = stripLabel(findItem(allItems, "Primary file:"));
  const matchedFunction = stripLabel(findItem(allItems, "Matched function:"));
  const primaryFunction = stripLabel(findItem(allItems, "Primary file function:"));
  const matchedLine = stripLabel(findItem(allItems, "Edit line:"));
  const primaryLine = stripLabel(findItem(allItems, "Primary file edit line:"));
  const confidence = stripLabel(findItem(allItems, "Confidence:"));
  const primaryConfidence = stripLabel(findItem(allItems, "Primary file confidence:"));
  const why = allItems.find((item) => item.toLowerCase().startsWith("why this"));
  const editPoint = allItems.find((item) =>
    item.toLowerCase().startsWith("best next edit point:")
  );
  const changeTarget = stripLabel(findItem(allItems, "Change target:"));

  const headline = startHere ?? bestNext ?? bestTarget ?? matchedFile ?? primaryFile;
  const fn = matchedFunction ?? primaryFunction ?? changeTarget;
  const line = matchedLine ?? primaryLine;

  if (!headline && !matchedFile && !primaryFile && !fn) {
    return null;
  }

  return {
    headline,
    file: matchedFile ?? primaryFile,
    fn,
    line,
    confidence: confidence ?? primaryConfidence,
    reason: why,
    nextAction:
      editPoint ??
      (fn ? `Open ${fn}(...) and make the smallest focused change there.` : undefined),
    sourceSectionTitles: sourceSections.map((section) => section.title),
  };
}

function buildHeroSections(
  grounded: GroundedRecommendation | null
): NormalizedSection[] {
  if (!grounded) return [];

  const mainItems = compact([
    grounded.headline ? `Target: ${grounded.headline}` : "",
    grounded.file ? `File: ${grounded.file}` : "",
    grounded.fn ? `Function: ${grounded.fn}` : "",
    grounded.line ? `Line: ${grounded.line}` : "",
    grounded.confidence ? `Confidence: ${grounded.confidence}` : "",
    grounded.reason,
  ]);

  const nextActionItems = compact([
    grounded.nextAction,
    grounded.fn ? `Change target: ${grounded.fn}` : "",
    grounded.line ? `Open around line ${grounded.line}.` : "",
    "Make one focused change, then run npm run build.",
  ]);

  const sections: NormalizedSection[] = [];

  pushIfSection(sections, makeSection("Best edit target", mainItems, "hero"));
  pushIfSection(sections, makeSection("Next action", nextActionItems, "hero"));

  return sections;
}

function bucketSections(sections: NormalizedSection[]): RenderBucket {
  const heroSections: NormalizedSection[] = [];
  const primarySections: NormalizedSection[] = [];
  const supportingSections: NormalizedSection[] = [];
  const diagnosticSections: NormalizedSection[] = [];

  for (const section of sections) {
    switch (section.priority ?? classifySection(section)) {
      case "hero":
        heroSections.push(section);
        break;
      case "diagnostic":
        diagnosticSections.push(section);
        break;
      case "supporting":
        supportingSections.push(section);
        break;
      case "primary":
      default:
        primarySections.push(section);
        break;
    }
  }

  return {
    heroSections,
    primarySections,
    supportingSections,
    diagnosticSections,
  };
}

function buildCleanSections(plan: CodexForgeEnginePlan): StructuredSection[] {
  const normalized = normalizePlanSections(plan);
  const grounded = extractGroundedRecommendation(normalized);
  const hero = buildHeroSections(grounded);
  const bucket = bucketSections(normalized);

  const suppressOriginalHeroTitles = new Set(
    grounded?.sourceSectionTitles.map(normalizeKey) ?? []
  );

  const filteredHero = bucket.heroSections.filter(
    (section) => !suppressOriginalHeroTitles.has(normalizeKey(section.title))
  );

  const filteredSupporting = bucket.supportingSections.filter(
    (section) =>
      !startsWithAny(section.title, [
        "Automatic repo inspection",
        "What I understood",
      ])
  );

  const ordered = dedupeSections([
    ...hero,
    ...filteredHero,
    ...bucket.primarySections,
    ...filteredSupporting,
    ...bucket.diagnosticSections,
  ]);

  return ordered.map(stripPriority);
}

/* ================= STRUCTURED ================= */

export function buildStructured(
  analysis: CodexForgeEngineAnalysis,
  plan: CodexForgeEnginePlan,
  context: CodexForgeChatContext
): CodexForgeStructuredReply {
  const execution = buildExecution(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);
  const sections = buildCleanSections(plan);

  const contextItems = clampOptionalList(
    dedupeStrings(plan.contextNotes ?? []),
    LIMITS.maxContextItems
  );

  const understandingItems = clampOptionalList(
    dedupeStrings(buildUnderstandingItems(analysis, context, plan)),
    LIMITS.maxUnderstandingItems
  );

  const statusItems = clampOptionalList(
    dedupeStrings(plan.status ?? []),
    LIMITS.maxStatusItems
  );

  return {
    mode: isExecutionMode(context) ? "local-execution" : "local",

    title: isExecutionMode(context)
      ? `${analysis.projectName} execution update`
      : `${analysis.projectName} ${analysis.intent}`,

    summary: buildSummary(analysis, plan, context),
    goal: plan.goal,
    context: contextItems,
    understanding: understandingItems,
    sections,

    files: clampOptionalList(dedupeStrings(plan.files ?? []), LIMITS.maxFiles),
    commands: clampOptionalList(
      dedupeStrings(plan.commands ?? []),
      LIMITS.maxCommands
    ),
    risks: clampOptionalList(dedupeStrings(plan.risks ?? []), LIMITS.maxRisks),
    nextSteps: clampOptionalList(
      dedupeStrings(plan.nextSteps ?? []),
      LIMITS.maxNextSteps
    ),

    status: statusItems,
    tools: plan.recommendedTools,
    plan: buildStructuredPlan(analysis, plan, context),
    domain: plan.domain,
    tags: clampOptionalList(dedupeStrings(plan.tags ?? []), LIMITS.maxTags),
    execution,

    snapshot:
      typeof snapshotFileCount === "number"
        ? {
            fileCount: snapshotFileCount,
            sampledPaths: [],
          }
        : undefined,

    diffs: getDiffs(context),
  };
}

/* ================= GROUNDED TEXT RENDERING ================= */

function pushUniqueLine(
  lines: string[],
  seen: Set<string>,
  line: string,
  options?: { blankAfter?: boolean }
): void {
  const trimmed = line.trim();
  if (!trimmed) return;

  const key = normalizeVisibleText(trimmed);
  if (!key || seen.has(key)) return;

  seen.add(key);
  lines.push(trimmed);

  if (options?.blankAfter) {
    lines.push("");
  }
}

function pushUniqueSection(
  lines: string[],
  seen: Set<string>,
  title: string,
  items?: MaybeString[],
  options?: { numbered?: boolean; maxItems?: number }
): void {
  const cleanItems = dedupeVisibleItems(items).slice(
    0,
    options?.maxItems ?? MAX_VISIBLE_SECTION_ITEMS
  );

  const uniqueItems = cleanItems.filter((item) => {
    const key = normalizeVisibleText(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (uniqueItems.length === 0) {
    return;
  }

  lines.push(title);

  uniqueItems.forEach((item, index) => {
    const prefix = options?.numbered ? `${index + 1}.` : "-";
    lines.push(`${prefix} ${item}`);
  });

  lines.push("");
}

function findVisibleSection(
  reply: CodexForgeStructuredReply,
  title: string
): TextSection | undefined {
  const normalizedTitle = normalizeVisibleText(title);

  return reply.sections?.find(
    (section) => normalizeVisibleText(section.title) === normalizedTitle
  );
}

function getVisibleSectionItems(
  reply: CodexForgeStructuredReply,
  title: string
): string[] {
  return findVisibleSection(reply, title)?.items ?? [];
}

function collectVisibleTextPool(reply: CodexForgeStructuredReply): string[] {
  return dedupeVisibleItems([
    reply.summary,
    reply.goal,
    ...(reply.context ?? []),
    ...(reply.understanding ?? []),
    ...(reply.status ?? []),
    ...(reply.nextSteps ?? []),
    ...(reply.files ?? []),
    ...(reply.commands ?? []),
    ...(reply.risks ?? []),
    ...(reply.sections ?? []).flatMap((section) => [
      section.title,
      ...section.items,
    ]),
  ]);
}

function firstMatchingVisibleLine(
  values: string[],
  patterns: RegExp[]
): string | undefined {
  return values.find((value) =>
    patterns.some((pattern) => pattern.test(value.trim()))
  );
}

function hasGroundedRepoSignal(reply: CodexForgeStructuredReply): boolean {
  const text = collectVisibleTextPool(reply).join("\n").toLowerCase();

  return (
    text.includes("best grounded edit target") ||
    text.includes("grounded recommendation") ||
    text.includes("best next edit point") ||
    text.includes("matched function") ||
    text.includes("grounded function") ||
    text.includes("grounded file") ||
    text.includes("auto-inspection used") ||
    text.includes("auto tool executed")
  );
}

function buildGroundedOutcomeItems(reply: CodexForgeStructuredReply): string[] {
  const pool = collectVisibleTextPool(reply);
  const groundedItems = getVisibleSectionItems(reply, GROUNDED_SECTION_TITLE);

  return dedupeVisibleItems([
    firstMatchingVisibleLine(groundedItems, [
      /^best next edit point:/i,
      /^best edit target:/i,
      /^target:/i,
      /^start here:/i,
    ]) ??
      firstMatchingVisibleLine(pool, [
        /^best grounded edit target:/i,
        /^best next edit point:/i,
        /^target:/i,
        / → [A-Za-z0-9_]+\(\.\.\.\)/,
      ]) ??
      reply.summary ??
      "Grounded repository recommendation ready.",
  ]);
}

function buildGroundedWhyItems(reply: CodexForgeStructuredReply): string[] {
  const pool = collectVisibleTextPool(reply);
  const groundedItems = getVisibleSectionItems(reply, GROUNDED_SECTION_TITLE);

  return dedupeVisibleItems([
    firstMatchingVisibleLine(groundedItems, [/^why this/i]),
    firstMatchingVisibleLine(pool, [/^why this/i]),
    firstMatchingVisibleLine(groundedItems, [/^file role:/i]),
    firstMatchingVisibleLine(pool, [/^file role:/i]),
    firstMatchingVisibleLine(groundedItems, [/^confidence:/i]),
    firstMatchingVisibleLine(pool, [/^grounding confidence:/i, /^confidence:/i]),
  ]);
}

function buildGroundedNextActionItems(reply: CodexForgeStructuredReply): string[] {
  const recommended = getVisibleSectionItems(reply, NEXT_ACTION_SECTION_TITLE);

  const directActions = recommended.filter((item) => {
    const normalized = normalizeVisibleText(item);

    return (
      normalized.startsWith("start here") ||
      normalized.startsWith("change target") ||
      normalized.startsWith("open around line") ||
      normalized.includes("make the smallest focused change") ||
      normalized.includes("make one focused change") ||
      normalized.includes("run npm run build")
    );
  });

  const fallbackSteps =
    reply.nextSteps?.filter((step) => {
      const normalized = normalizeVisibleText(step);

      return (
        normalized.includes("open ") ||
        normalized.includes("edit ") ||
        normalized.includes("change ") ||
        normalized.includes("run npm run build")
      );
    }) ?? [];

  return dedupeVisibleItems([...directActions, ...fallbackSteps]).slice(0, 5);
}

function buildGroundedEvidenceItems(reply: CodexForgeStructuredReply): string[] {
  const pool = collectVisibleTextPool(reply);

  return dedupeVisibleItems([
    firstMatchingVisibleLine(pool, [/^matched file:/i, /^grounded file:/i]),
    firstMatchingVisibleLine(pool, [
      /^matched function:/i,
      /^grounded function:/i,
      /^function:/i,
    ]),
    firstMatchingVisibleLine(pool, [
      /^matched line:/i,
      /^edit line:/i,
      /^grounded line:/i,
      /^line:/i,
    ]),
    firstMatchingVisibleLine(pool, [/^tool used:/i, /^safe tool executed:/i]),
    firstMatchingVisibleLine(pool, [/^result: read /i, /^read .* lines/i]),
  ]);
}

function shouldRenderGroundedSupportingSection(section: TextSection): boolean {
  const normalizedTitle = normalizeVisibleText(section.title);

  if (LOW_VALUE_VISIBLE_SECTION_TITLES.has(normalizedTitle)) {
    return false;
  }

  if (normalizedTitle.startsWith("auto inspection")) {
    return false;
  }

  if (normalizedTitle.startsWith("follow-up inspection")) {
    return false;
  }

  if (normalizedTitle.includes("tool audit")) {
    return false;
  }

  if (normalizedTitle === normalizeVisibleText(GROUNDED_SECTION_TITLE)) {
    return false;
  }

  if (normalizedTitle === normalizeVisibleText(NEXT_ACTION_SECTION_TITLE)) {
    return false;
  }

  return true;
}

function renderGroundedRepoText(reply: CodexForgeStructuredReply): string {
  const lines: string[] = [];
  const seen = new Set<string>();

  if (reply.title) {
    pushUniqueLine(lines, seen, reply.title, { blankAfter: true });
  }

  pushUniqueSection(lines, seen, "Outcome", buildGroundedOutcomeItems(reply), {
    maxItems: 3,
  });

  pushUniqueSection(lines, seen, "Why", buildGroundedWhyItems(reply), {
    maxItems: 4,
  });

  pushUniqueSection(
    lines,
    seen,
    "Next action",
    buildGroundedNextActionItems(reply),
    {
      maxItems: 5,
    }
  );

  pushUniqueSection(lines, seen, "Evidence", buildGroundedEvidenceItems(reply), {
    maxItems: 6,
  });

  for (const section of reply.sections ?? []) {
    if (!shouldRenderGroundedSupportingSection(section)) continue;

    pushUniqueSection(lines, seen, section.title, section.items, {
      maxItems: MAX_VISIBLE_SECTION_ITEMS,
    });
  }

  pushUniqueSection(lines, seen, "Commands", reply.commands, {
    maxItems: LIMITS.maxCommands,
  });

  pushUniqueSection(lines, seen, "Risks", reply.risks, {
    maxItems: LIMITS.maxRisks,
  });

  return lines
    .join("\n")
    .split(/\r?\n/)
    .slice(0, MAX_VISIBLE_TEXT_LINES)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ================= DEFAULT TEXT RENDERING ================= */

function pushSection(lines: string[], title: string, items?: string[]): void {
  const cleanedItems = clampSectionItems(items);

  if (cleanedItems.length === 0) {
    return;
  }

  lines.push(title);
  for (const item of cleanedItems) {
    lines.push(`- ${item}`);
  }
  lines.push("");
}

function pushNumberedSection(
  lines: string[],
  title: string,
  items?: string[]
): void {
  const cleanedItems = clampSectionItems(items);

  if (cleanedItems.length === 0) {
    return;
  }

  lines.push(title);
  cleanedItems.forEach((item, index) => {
    lines.push(`${index + 1}. ${item}`);
  });
  lines.push("");
}

function pushExecutionSection(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  if (!reply.execution) {
    return;
  }

  const executionItems = compact([
    typeof reply.execution.stepIndex === "number"
      ? `Step: ${reply.execution.stepIndex + 1}`
      : "",
    reply.execution.stepText ? `Step text: ${reply.execution.stepText}` : "",
    reply.execution.phase ? `Phase: ${reply.execution.phase}` : "",
    typeof reply.execution.diffCount === "number"
      ? `Diff count: ${reply.execution.diffCount}`
      : "",
    typeof reply.execution.snapshotFileCount === "number"
      ? `Snapshot files: ${reply.execution.snapshotFileCount}`
      : "",
    reply.execution.resultSummary ? `Result: ${reply.execution.resultSummary}` : "",
    ...(reply.execution.logs ?? []).map((log) => `Log: ${log}`),
  ]);

  pushSection(lines, "Execution", executionItems);
}

function pushToolsSection(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  if (!reply.tools?.length) {
    return;
  }

  lines.push("Tools");
  for (const tool of reply.tools.slice(0, MAX_VISIBLE_TOOLS)) {
    lines.push(`- ${tool.name} (${tool.availability}): ${tool.description}`);
  }
  lines.push("");
}

function pushDiffsSection(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  if (!reply.diffs?.length) {
    return;
  }

  pushSection(
    lines,
    "Diffs",
    reply.diffs.map((diff) => diff.filePath)
  );
}

function pushSnapshotSection(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  if (!reply.snapshot) {
    return;
  }

  const items = [
    `File count: ${reply.snapshot.fileCount}`,
    ...reply.snapshot.sampledPaths
      .slice(0, LIMITS.maxSampledPaths)
      .map((path) => path),
  ];

  pushSection(lines, "Snapshot", items);
}

function splitReplySections(reply: CodexForgeStructuredReply): RenderBucket {
  const sections = (reply.sections ?? []).map((section): NormalizedSection => {
    const normalized = {
      title: section.title,
      items: section.items,
    };

    return {
      ...normalized,
      priority: classifySection(normalized),
    };
  });

  return bucketSections(dedupeSections(sections));
}

function pushCoreSections(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  const bucket = splitReplySections(reply);

  for (const section of bucket.heroSections) {
    pushSection(lines, section.title, section.items);
  }

  for (const section of bucket.primarySections) {
    pushSection(lines, section.title, section.items);
  }

  pushSection(lines, "Goal", reply.goal ? [reply.goal] : undefined);

  pushExecutionSection(lines, reply);

  pushNumberedSection(lines, "Next steps", reply.nextSteps);

  pushSection(lines, "Files", reply.files);
  pushSection(lines, "Commands", reply.commands);
  pushSection(lines, "Risks", reply.risks);

  for (const section of bucket.supportingSections) {
    pushSection(lines, section.title, section.items);
  }

  pushSection(lines, "Context", reply.context);
  pushSection(lines, "Understanding", reply.understanding);

  for (const section of bucket.diagnosticSections) {
    pushSection(lines, section.title, section.items);
  }

  pushToolsSection(lines, reply);
  pushDiffsSection(lines, reply);
  pushSnapshotSection(lines, reply);
  pushSection(lines, "Status", reply.status);
}

export function structuredToText(reply: CodexForgeStructuredReply): string {
  if (hasGroundedRepoSignal(reply)) {
    return renderGroundedRepoText(reply);
  }

  const lines: string[] = [];

  if (reply.title) lines.push(reply.title, "");
  if (reply.summary) lines.push(reply.summary, "");

  pushCoreSections(lines, reply);

  return lines
    .join("\n")
    .split(/\r?\n/)
    .slice(0, MAX_VISIBLE_TEXT_LINES)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}