// src/lib/codexforge/chat/engine-render-sections.ts

import type {
  CodexForgeStructuredReply,
} from "../types";

import type {
  CodexForgeEnginePlan,
} from "./contracts";

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

const MAX_VISIBLE_SECTION_ITEMS = 12;

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

export function buildCleanSections(plan: CodexForgeEnginePlan): StructuredSection[] {
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
