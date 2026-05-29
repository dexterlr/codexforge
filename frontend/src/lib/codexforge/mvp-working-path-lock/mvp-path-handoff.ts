import type { MvpPathDefinition, MvpPathHandoff } from "./mvp-working-path-types";

export function buildMvpPathHandoff(definition: MvpPathDefinition): MvpPathHandoff {
  return { title: "Coding MVP path handoff", hrefs: definition.steps.map((step) => step.route), copyMap: definition.steps.map((step) => `${step.order}. ${step.route} - ${step.primaryAction}`).join("\n"), noUnsafeExecution: true };
}
