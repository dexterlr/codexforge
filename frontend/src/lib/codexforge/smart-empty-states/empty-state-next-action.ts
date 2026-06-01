import type { EmptyStateNextAction } from "./smart-empty-state-types";

export function buildEmptyStateNextAction(): EmptyStateNextAction {
  return { label: "Copy empty-state checklist", href: "/help-empty-states", copy: "For each empty state, explain what is missing, why it matters, what to do next, where to go, and what stays safe." };
}
