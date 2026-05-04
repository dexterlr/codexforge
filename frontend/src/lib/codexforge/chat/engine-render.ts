// src/lib/codexforge/chat/engine-render.ts

import type {
  CodexForgeChatContext,
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
import { buildDiffPreviewBundle, getDiffs } from "./engine-render-diff-preview";

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
    "approvals",
    "diff preview batch",
  ].map((title) => title.toLowerCase())
);

const MAX_VISIBLE_TEXT_LINES = 220;
const MAX_VISIBLE_SECTION_ITEMS = 12;
const MAX_VISIBLE_TOOLS = 8;
const MAX_VISIBLE_DIFF_PREVIEWS = 8;

/* ================= GENERIC HELPERS ================= */

function compact(values: MaybeString[]): string[] {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is string => value.length > 0);
}

function clampItems<T>(items: T[] | undefined, max: number): T[] {
  return Array.isArray(items) ? items.slice(0, max) : [];
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
    .replace(/[â€¢\-â€“â€”:;.]+$/g, "")
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

function safeSlug(value: string): string {
  const slug = value
    .replace(/\\/g, "/")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);

  return slug || "target";
}

function getFileName(filePath: string): string {
  const parts = filePath.replace(/\\/g, "/").split("/").filter(Boolean);
  return parts[parts.length - 1] ?? filePath;
}

function createStableId(prefix: string, filePath: string, index: number): string {
  return `${prefix}-${index + 1}-${safeSlug(filePath)}`;
}

function countPatchChanges(patch: string): { additions: number; deletions: number } {
  let additions = 0;
  let deletions = 0;

  for (const line of patch.split(/\r?\n/)) {
    if (line.startsWith("+++") || line.startsWith("---")) continue;
    if (line.startsWith("+")) additions += 1;
    if (line.startsWith("-")) deletions += 1;
  }

  return { additions, deletions };
}

function summarizePatch(filePath: string, patch: string): string {
  const { additions, deletions } = countPatchChanges(patch);
  const fileName = getFileName(filePath);

  if (additions === 0 && deletions === 0) {
    return `Reviewable diff preview for ${fileName}.`;
  }

  return `Reviewable diff preview for ${fileName}: +${additions} / -${deletions}.`;
}

/* ================= SUMMARY ================= */

function buildExecutionSummary(context: CodexForgeChatContext): string {
  const request = getExecutionRequest(context);
  const phase = resolveExecutionPhase(context);
  const diffCount = getExecutionDiffCount(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);
  const pendingDiffPreviews = context.pendingDiffPreviews?.length ?? 0;
  const pendingApprovals = context.pendingApprovals?.length ?? 0;

  const parts = compact([
    request?.stepText
      ? `Processed step "${request.stepText}"`
      : "Processed execution step",
    `phase ${phase}`,
    typeof diffCount === "number"
      ? `${diffCount} diff preview${diffCount === 1 ? "" : "s"}`
      : "",
    pendingDiffPreviews > 0
      ? `${pendingDiffPreviews} pending preview${
          pendingDiffPreviews === 1 ? "" : "s"
        }`
      : "",
    pendingApprovals > 0
      ? `${pendingApprovals} pending approval${
          pendingApprovals === 1 ? "" : "s"
        }`
      : "",
    typeof snapshotFileCount === "number"
      ? `${snapshotFileCount} snapshot file${
          snapshotFileCount === 1 ? "" : "s"
        }`
      : "",
  ]);

  return clampText(parts.join(" â€¢ "), LIMITS.maxSummaryText);
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
  const pendingApprovalCount = context.pendingApprovals?.length ?? 0;
  const diffPreviewCount = context.pendingDiffPreviews?.length ?? 0;

  const hasExecution =
    request?.mode === "execute-task-step" ||
    !!context.execution?.enginePhase ||
    typeof diffCount === "number" ||
    typeof snapshotFileCount === "number" ||
    pendingApprovalCount > 0 ||
    diffPreviewCount > 0;

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
            diffPreviewCount > 0 ? `Diff previews: ${diffPreviewCount}` : "",
            pendingApprovalCount > 0
              ? `Pending approvals: ${pendingApprovalCount}`
              : "",
            typeof snapshotFileCount === "number"
              ? `Snapshot files: ${snapshotFileCount}`
              : "",
          ]),
          6
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
    ...(pendingApprovalCount > 0 ? { pendingApprovalCount } : {}),
    ...(diffPreviewCount > 0 ? { diffPreviewCount } : {}),
    resultSummary: buildExecutionSummary(context),
    ...(logs?.length ? { logs } : {}),
  };
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
    ...(context.pendingApprovals?.length
      ? {
          approvals: clampItems(
            context.pendingApprovals,
            MAX_VISIBLE_DIFF_PREVIEWS
          ),
        }
      : {}),
    ...(context.pendingDiffPreviews?.length
      ? {
          diffPreviews: clampItems(
            context.pendingDiffPreviews,
            MAX_VISIBLE_DIFF_PREVIEWS
          ),
        }
      : {}),
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
  const now = Date.now();
  const execution = buildExecution(context);
  const snapshotFileCount = getExecutionSnapshotFileCount(context);
  const sections = buildCleanSections(plan);
  const diffPreviewBundle = buildDiffPreviewBundle(context, now);

  const contextItems = clampOptionalList(
    dedupeStrings(plan.contextNotes ?? []),
    LIMITS.maxContextItems
  );

  const understandingItems = clampOptionalList(
    dedupeStrings(buildUnderstandingItems(analysis, context, plan)),
    LIMITS.maxUnderstandingItems
  );

  const statusItems = clampOptionalList(
    dedupeStrings([
      ...(plan.status ?? []),
      ...(diffPreviewBundle.diffPreviews?.length
        ? [
            "Approval-required diff previews are available.",
            "Diff previews are dry-run by default.",
          ]
        : []),
    ]),
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

    ...(diffPreviewBundle.diffPreviews?.length
      ? { diffPreviews: diffPreviewBundle.diffPreviews }
      : {}),
    ...(diffPreviewBundle.diffPreviewBatch
      ? { diffPreviewBatch: diffPreviewBundle.diffPreviewBatch }
      : {}),
    ...(diffPreviewBundle.approvals?.length
      ? { approvals: diffPreviewBundle.approvals }
      : {}),
  };
}

/* ================= GROUNDED TEXT RENDERING ================= */
/* ================= TEXT RENDER EXPORT ================= */

export { structuredToText } from "./engine-render-text";


