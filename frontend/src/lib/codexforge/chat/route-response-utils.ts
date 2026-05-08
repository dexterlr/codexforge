/*
 * Route response utilities are intentionally kept pure and framework-light.
 * Keep request parsing, orchestration, model selection, and tool execution
 * outside this module.
 */

export function scrubProductionOnlyVisibleText(text: string): string {
  const blockedLineTerms = [
    "src\\",
    "src/",
    ".ts",
    ".tsx",
    "use-codexforge-chat",
    "engine.ts",
    "engine-render",
    "engine-analysis",
    "route.ts",
    "types.ts",
    "read-file",
    "list-files",
    "search-project",
    "safe tool",
    "grounded function",
    "grounded file",
    "grounding confidence",
    "best next edit point",
    "open src",
    "repo path",
    "codebase",
    "implementation file",
    "frontend and backend drift",
    "npm run",
  ];

  const blockedSectionTitles = new Set([
    "Outcome",
    "Why",
    "Next action",
    "Evidence",
    "Execution posture",
    "Engine trace",
    "Response quality",
  ]);

  const lines = text.split(/\r?\n/);
  const kept: string[] = [];
  let skippingBlockedSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const normalized = trimmed.toLowerCase();

    if (blockedSectionTitles.has(trimmed)) {
      skippingBlockedSection = true;
      continue;
    }

    if (skippingBlockedSection && trimmed.length > 0 && !line.startsWith("-")) {
      skippingBlockedSection = false;
    }

    if (skippingBlockedSection) {
      continue;
    }

    if (
      blockedLineTerms.some((term) =>
        normalized.includes(term.toLowerCase())
      )
    ) {
      continue;
    }

    kept.push(line);
  }

  return kept
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function isProductionOnlyPlanningRequest(text: string): boolean {
  const normalized = text.toLowerCase();

  return (
    normalized.includes("do not edit codexforge source files") ||
    normalized.includes("do not edit source files") ||
    normalized.includes("give me a production plan") ||
    normalized.includes("production plan, not a codebase implementation plan") ||
    normalized.includes("not a codebase implementation plan")
  );
}

export function boolHeader(value: boolean): "true" | "false" {
  return value ? "true" : "false";
}

export function buildJsonHeaders(extra?: HeadersInit): HeadersInit {
  return {
    "Cache-Control": "no-store",
    ...extra,
  };
}
