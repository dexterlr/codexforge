// src/lib/codexforge/chat/premium-response-composer.ts

import type { CodexForgeStructuredReply } from "../types";

/* ================= TYPES ================= */

type StructuredSection = NonNullable<CodexForgeStructuredReply["sections"]>[number];

type PremiumComposerMode = "standard" | "execution" | "diagnostic";

export type CodexForgeResponseProfile =
  | "product-plan"
  | "runtime-policy"
  | "diagnostic"
  | "execution"
  | "grounded-inspection";

export type PremiumResponseComposerInput = {
  structured?: CodexForgeStructuredReply;
  executionMode?: boolean;
  diagnosticMode?: boolean;
  responseProfile?: CodexForgeResponseProfile;
};

/* ================= CONSTANTS ================= */

const PREMIUM_VISIBLE_SECTION_LIMIT = 8;
const PREMIUM_VISIBLE_RUNTIME_POLICY_SECTION_LIMIT = 14;
const PREMIUM_VISIBLE_ITEM_LIMIT = 8;

const PREMIUM_ALWAYS_HIDE_SECTION_TITLES = new Set(
  [
    "agent operating mode",
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
    "execution posture",
    "engine trace",
    "response quality",
    "automatic repo inspection",
    "auto inspection: read-file",
    "auto inspection: search-project",
    "auto inspection: list-files",
    "follow-up inspection: read-file",
    "follow-up inspection: search-project",
    "follow-up inspection: list-files",
    "grounding and inspection",
    "grounding evidence",
    "available actions",
  ].map((title) => title.toLowerCase())
);

const PREMIUM_RUNTIME_POLICY_SECTION_TITLES = new Set(
  [
    "agent runtime policy",
    "runtime rules",
    "safety rules",
    "quality gates",
    "preferred output sections",
  ].map((title) => title.toLowerCase())
);

const PREMIUM_PLANNING_SECTION_ORDER = [
  "outcome",
  "goal",
  "pages",
  "components",
  "data",
  "first three implementation steps",
  "next steps",
  "files to change",
  "files",
  "risks",
  "commands",
  "next action",
];

const PREMIUM_PRODUCT_PLAN_SECTION_ORDER = [
  "pages",
  "components",
  "data",
  "first three implementation steps",
  "outcome",
  "goal",
  "risks",
  "next action",
];

const PREMIUM_RUNTIME_POLICY_SECTION_ORDER = [
  "agent safety and approval gates",
  "agent-directed planning",
  "agent runtime policy",
  "runtime rules",
  "safety rules",
  "quality gates",
  "preferred output sections",
];

const PREMIUM_GROUNDED_SECTION_ORDER = [
  "outcome",
  "why",
  "next action",
  "evidence",
  "goal",
  "files to change",
  "files",
  "risks",
  "commands",
];

const PREMIUM_EXECUTION_SECTION_ORDER = [
  "outcome",
  "execution",
  "next action",
  "diff previews",
  "approvals",
  "snapshot",
  "risks",
  "commands",
];

/* ================= HELPERS ================= */

function normalizeKey(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function uniqueStrings(values: readonly string[]): string[] {
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

function sectionKey(section: StructuredSection): string {
  return normalizeKey(section.title);
}

function getStructuredDomain(structured: CodexForgeStructuredReply): string {
  const rawDomain = structured.domain ?? structured.plan?.domain ?? "general";
  return normalizeKey(rawDomain);
}

function inferResponseProfile(args: {
  input: PremiumResponseComposerInput;
  mode: PremiumComposerMode;
  domain: string;
}): CodexForgeResponseProfile {
  if (args.input.responseProfile) {
    return args.input.responseProfile;
  }

  if (args.mode === "diagnostic") {
    return "diagnostic";
  }

  if (args.mode === "execution") {
    return "execution";
  }

  if (args.domain === "web") {
    return "product-plan";
  }

  if (args.domain !== "general") {
    return "runtime-policy";
  }

  return "product-plan";
}

function shouldExposeRuntimePolicySections(profile: CodexForgeResponseProfile): boolean {
  return profile === "runtime-policy" || profile === "diagnostic" || profile === "execution";
}

function cleanSection(section: StructuredSection): StructuredSection | null {
  const title = section.title.trim();
  const items = uniqueStrings((section.items ?? []).filter(isNonEmptyString)).slice(
    0,
    PREMIUM_VISIBLE_ITEM_LIMIT
  );

  if (!title || items.length === 0) {
    return null;
  }

  return {
    ...section,
    title,
    items,
  };
}

function shouldKeepPremiumSection(
  section: StructuredSection,
  mode: PremiumComposerMode,
  profile: CodexForgeResponseProfile
): boolean {
  const title = sectionKey(section);

  if (profile === "diagnostic") {
    return true;
  }

  if (PREMIUM_RUNTIME_POLICY_SECTION_TITLES.has(title)) {
    return shouldExposeRuntimePolicySections(profile);
  }

  if (mode !== "execution" && title === "execution") {
    return false;
  }

  if (PREMIUM_ALWAYS_HIDE_SECTION_TITLES.has(title)) {
    return false;
  }

  if (title.startsWith("auto inspection:")) {
    return false;
  }

  if (title.startsWith("follow-up inspection:")) {
    return false;
  }

  if (title.includes("engine trace")) {
    return false;
  }

  if (title.includes("response quality")) {
    return false;
  }

  if (title.includes("execution posture")) {
    return false;
  }

  return true;
}

function rankSection(section: StructuredSection, order: readonly string[]): number {
  const title = sectionKey(section);
  const exact = order.indexOf(title);

  if (exact >= 0) {
    return exact;
  }

  const fuzzy = order.findIndex((orderedTitle) => title.includes(orderedTitle));

  if (fuzzy >= 0) {
    return fuzzy;
  }

  return order.length + 100;
}

function getBaseSectionOrder(args: {
  sections: StructuredSection[];
  mode: PremiumComposerMode;
  profile: CodexForgeResponseProfile;
}): readonly string[] {
  if (args.profile === "product-plan") {
    return PREMIUM_PRODUCT_PLAN_SECTION_ORDER;
  }

  if (args.profile === "grounded-inspection") {
    return PREMIUM_GROUNDED_SECTION_ORDER;
  }

  if (args.profile === "execution" || args.mode === "execution") {
    return PREMIUM_EXECUTION_SECTION_ORDER;
  }

  if (
    args.sections.some((section) =>
      ["outcome", "why", "evidence"].includes(sectionKey(section))
    )
  ) {
    return PREMIUM_GROUNDED_SECTION_ORDER;
  }

  return PREMIUM_PLANNING_SECTION_ORDER;
}

function sortPremiumSections(
  sections: StructuredSection[],
  mode: PremiumComposerMode,
  profile: CodexForgeResponseProfile
): StructuredSection[] {
  const baseOrder = getBaseSectionOrder({ sections, mode, profile });

  const order =
    profile === "runtime-policy"
      ? [...PREMIUM_RUNTIME_POLICY_SECTION_ORDER, ...baseOrder]
      : shouldExposeRuntimePolicySections(profile)
        ? [...baseOrder, ...PREMIUM_RUNTIME_POLICY_SECTION_ORDER]
        : baseOrder;

  return [...sections].sort((a, b) => {
    const ranked = rankSection(a, order) - rankSection(b, order);
    if (ranked !== 0) return ranked;

    return a.title.localeCompare(b.title);
  });
}

function dedupeSections(sections: StructuredSection[]): StructuredSection[] {
  const seen = new Set<string>();
  const output: StructuredSection[] = [];

  for (const section of sections) {
    const cleaned = cleanSection(section);
    if (!cleaned) continue;

    const key = `${sectionKey(cleaned)}::${cleaned.items
      .map((item) => normalizeKey(item))
      .join("|")}`;

    if (seen.has(key)) continue;

    seen.add(key);
    output.push(cleaned);
  }

  return output;
}

function getComposerMode(input: PremiumResponseComposerInput): PremiumComposerMode {
  if (input.responseProfile === "diagnostic" || input.diagnosticMode) {
    return "diagnostic";
  }

  if (input.responseProfile === "execution" || input.executionMode || input.structured?.execution) {
    return "execution";
  }

  return "standard";
}

function getVisibleSectionLimit(profile: CodexForgeResponseProfile): number {
  return shouldExposeRuntimePolicySections(profile)
    ? PREMIUM_VISIBLE_RUNTIME_POLICY_SECTION_LIMIT
    : PREMIUM_VISIBLE_SECTION_LIMIT;
}

/* ================= PUBLIC API ================= */

export function composePremiumCodexForgeResponse(
  input: PremiumResponseComposerInput
): CodexForgeStructuredReply | undefined {
  const structured = input.structured;

  if (!structured) {
    return undefined;
  }

  const mode = getComposerMode(input);

  if (mode === "diagnostic") {
    return structured;
  }

  const domain = getStructuredDomain(structured);
  const responseProfile = inferResponseProfile({
    input,
    mode,
    domain,
  });

  const cleanedSections = sortPremiumSections(
    dedupeSections(
      (structured.sections ?? []).filter((section) =>
        shouldKeepPremiumSection(section, mode, responseProfile)
      )
    ),
    mode,
    responseProfile
  ).slice(0, getVisibleSectionLimit(responseProfile));

  return {
    ...structured,
    sections: cleanedSections,
    tools: undefined,
    status: undefined,
    context: undefined,
    understanding: undefined,
    snapshot: mode === "execution" ? structured.snapshot : undefined,
    approvals: mode === "execution" ? structured.approvals : undefined,
    diffPreviews: mode === "execution" ? structured.diffPreviews : undefined,
    diffPreviewBatch: mode === "execution" ? structured.diffPreviewBatch : undefined,
  };
}
