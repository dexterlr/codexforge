import type { DisclosureSection, ProductSimplificationRoute, ProgressiveDisclosure } from "./product-simplification-types";
import { selectPrimaryActionForRoute } from "./primary-action-model";

export function buildDisclosureSection(input: DisclosureSection): DisclosureSection {
  return { ...input };
}

export function buildProgressiveDisclosure(input: ProgressiveDisclosure): ProgressiveDisclosure {
  return { ...input, sections: input.sections.map(buildDisclosureSection) };
}

export function buildDefaultProgressiveDisclosure(route: ProductSimplificationRoute): ProgressiveDisclosure {
  const action = selectPrimaryActionForRoute(route);
  return buildProgressiveDisclosure({
    route,
    level: "simple",
    essentials: ["Essentials first", action.label, "Compact safety badges stay visible"],
    nextAction: action.label,
    safetyBadges: ["Review first", "Approval required", "No auto-run"],
    sections: [
      {
        id: `${route}-advanced-details`,
        title: "Advanced details",
        summary: "Technical policy, raw packet, routing, and long requirement details.",
        level: "advanced",
        defaultOpen: false,
        items: ["Raw JSON stays hidden unless expanded", "Long policy lists stay collapsed", "Approval blockers stay visible when relevant"],
      },
      {
        id: `${route}-debug-details`,
        title: "Debug details",
        summary: "Developer-only route and smoke markers.",
        level: "debug",
        defaultOpen: false,
        items: ["Smoke markers are preserved", "No execution commands are exposed"],
      },
    ],
  });
}

export function summarizeProgressiveDisclosure(disclosure: ProgressiveDisclosure): string {
  return `${disclosure.route}: ${disclosure.level} view, ${disclosure.sections.length} collapsed detail sections, next action ${disclosure.nextAction}.`;
}
