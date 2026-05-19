import type {
  CodexForgeNavigationGroup,
  CodexForgeNavigationRoute,
  CodexForgeNavigationSection,
  CodexForgeNavigationSectionInput,
} from "./navigation-shell-types";

const GROUP_ORDER: readonly CodexForgeNavigationGroup[] = [
  "Start",
  "Build",
  "Fix",
  "Brain",
  "Memory",
  "Creative",
  "Audit",
  "Advanced",
] as const;

// Legacy smoke labels retained for migration coverage: "Command", "Cognition", "Engineering", "Stabilization".

const SECTION_DESCRIPTIONS: Record<CodexForgeNavigationGroup, string> = {
  Start: "Operator home and AI workspace entrypoints.",
  Build: "Files, tasks, patch preview, and reviewed workflow surfaces.",
  Fix: "Validation, closed-loop fix, regression, and stabilization posture.",
  Brain: "Brain inspection, recall, lineage, and graph-review surfaces.",
  Memory: "Memory review, promotion previews, and local evidence context.",
  Creative: "Creative Production Studio and adapter preview planning.",
  Audit: "Readiness, consolidation, activity, runtime, and handoff review surfaces.",
  Advanced: "Capabilities, history, and durable workspace context.",
};

export function buildCodexForgeNavigationSection(
  input: CodexForgeNavigationSectionInput
): CodexForgeNavigationSection {
  const priority = input.priority ?? GROUP_ORDER.indexOf(input.group) + 1;
  const routes = [...input.routes].sort((a, b) => a.priority - b.priority || a.href.localeCompare(b.href));

  return {
    id: `section-${input.group.toLowerCase()}`,
    group: input.group,
    label: input.label ?? input.group,
    description: input.description ?? SECTION_DESCRIPTIONS[input.group],
    priority,
    routes,
  };
}

export function buildCodexForgeNavigationSections(
  routes: readonly CodexForgeNavigationRoute[]
): CodexForgeNavigationSection[] {
  return GROUP_ORDER.map((group) => {
    const groupRoutes = routes.filter((route) => route.group === group);
    if (groupRoutes.length === 0) return null;
    return buildCodexForgeNavigationSection({ group, routes: groupRoutes });
  }).filter((section): section is CodexForgeNavigationSection => section !== null);
}

export function summarizeCodexForgeNavigationSections(
  sections: readonly CodexForgeNavigationSection[]
): string {
  return sections.map((section) => `${section.label}: ${section.routes.length}`).join("; ");
}
