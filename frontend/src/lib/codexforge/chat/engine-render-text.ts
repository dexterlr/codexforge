// src/lib/codexforge/chat/engine-render-text.ts

import type {
  CodexForgeStructuredReply,
} from "../types";

import {
  LIMITS,
  clampText,
} from "./engine-shared";

/* ================= TYPES ================= */

type StructuredSection = NonNullable<CodexForgeStructuredReply["sections"]>[number];

type SectionPriority = "hero" | "primary" | "supporting" | "diagnostic";

type NormalizedSection = StructuredSection & {
  priority?: SectionPriority;
};

type MaybeString = string | undefined | null | false;

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

function clampSectionItems(items: string[] | undefined): string[] {
  return dedupeStrings(items ?? [])
    .map((item) => clampText(item, LIMITS.maxSummaryText))
    .slice(0, MAX_VISIBLE_SECTION_ITEMS);
}

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

function collectDiffPreviewText(reply: CodexForgeStructuredReply): string[] {
  const previewItems =
    reply.diffPreviews?.flatMap((preview) =>
      compact([
        `Diff preview: ${preview.filePath}`,
        preview.summary,
        `Diff preview status: ${preview.status}`,
        preview.approvalRequired ? "Approval required before apply-diff." : "",
      ])
    ) ?? [];

  const approvalItems =
    reply.approvals?.flatMap((approval) =>
      compact([
        `Approval: ${approval.label}`,
        `Approval state: ${approval.state}`,
        approval.reason,
      ])
    ) ?? [];

  return [...previewItems, ...approvalItems];
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
    ...collectDiffPreviewText(reply),
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
        / -> [A-Za-z0-9_]+\(\.\.\.\)/,
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

function buildDiffPreviewItems(reply: CodexForgeStructuredReply): string[] {
  const previewItems =
    reply.diffPreviews?.map((preview) => {
      const approvalState = preview.approval?.state ?? "pending";
      return `${preview.filePath} - ${preview.status}; approval ${approvalState}; dry-run ${
        preview.dryRun ? "yes" : "no"
      }`;
    }) ?? [];

  const batchItems = reply.diffPreviewBatch
    ? [
        `${reply.diffPreviewBatch.title ?? "Diff preview batch"} - ${
          reply.diffPreviewBatch.status
        }; ${reply.diffPreviewBatch.previews.length} preview${
          reply.diffPreviewBatch.previews.length === 1 ? "" : "s"
        }.`,
      ]
    : [];

  return dedupeStrings([...batchItems, ...previewItems]);
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

  pushUniqueSection(lines, seen, "Diff previews", buildDiffPreviewItems(reply), {
    maxItems: MAX_VISIBLE_DIFF_PREVIEWS,
  });

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
    typeof reply.execution.diffPreviewCount === "number"
      ? `Diff previews: ${reply.execution.diffPreviewCount}`
      : "",
    typeof reply.execution.pendingApprovalCount === "number"
      ? `Pending approvals: ${reply.execution.pendingApprovalCount}`
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

function pushDiffPreviewsSection(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  pushSection(lines, "Diff previews", buildDiffPreviewItems(reply));
}

function buildApprovalItems(reply: CodexForgeStructuredReply): string[] {
  return dedupeStrings(
    reply.approvals?.map((approval) =>
      compact([
        `${approval.label} - ${approval.state}`,
        approval.reason,
      ]).join("; ")
    ) ?? []
  );
}

function pushApprovalsSection(
  lines: string[],
  reply: CodexForgeStructuredReply
): void {
  pushSection(lines, "Approvals", buildApprovalItems(reply));
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
  pushDiffPreviewsSection(lines, reply);
  pushApprovalsSection(lines, reply);
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

