import type { MvpPathDefinition, MvpWorkingPathSummary } from "./mvp-working-path-types";

export function buildMvpWorkingPathSummary(definition: MvpPathDefinition): MvpWorkingPathSummary {
  return { title: "MVP working path locked", stepCount: definition.steps.length, nextAction: "Open Coding MVP Path", safety: "one canonical path, advanced routes secondary, no auto-apply, no auto-run" };
}
