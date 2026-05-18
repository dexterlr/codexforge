import type {
  CodexForgeNavigationGroup,
  CodexForgeNavigationRoute,
  CodexForgeNavigationSection,
  CodexForgeNavigationSectionInput,
} from "./navigation-shell-types";

const GROUP_ORDER: readonly CodexForgeNavigationGroup[] = [
  "Command",
  "Cognition",
  "Engineering",
  "Stabilization",
  "Creative",
  "Memory",
  "History",
] as const;

const SECTION_DESCRIPTIONS: Record<CodexForgeNavigationGroup, string> = {
  Command: "Operator overview, AI Workspace, Mission posture, and Capability Cockpit routes.",
  Cognition: "Brain inspection, recall, lineage, and graph-review surfaces.",
  Engineering: "Files, tasks, patch preview, and reviewed workflow surfaces.",
  Stabilization: "Build, smoke, regression, safety, and apply-gate posture.",
  Creative: "Creative Production Studio and artifact production planning.",
  Memory: "Memory review, promotion previews, and local evidence context.",
  History: "Local activity timeline and durable workspace context.",
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

