import type {
  CodexForgeBrainDrilldownPath,
  CodexForgeBrainDrilldownStep,
  CodexForgeBrainFocusBreadcrumb,
  CodexForgeBrainFocusTarget,
} from "./focus-types";

export function buildBrainFocusBreadcrumb(input: {
  step: CodexForgeBrainDrilldownStep;
  pathId: string;
}): CodexForgeBrainFocusBreadcrumb {
  return {
    id: `${input.pathId}:breadcrumb:${input.step.depth}:${input.step.targetId}`,
    label: input.step.label,
    kind: input.step.kind,
    targetId: input.step.targetId,
    depth: input.step.depth,
    summary: input.step.summary,
    readOnly: true,
  };
}

export function buildBrainFocusBreadcrumbs(input: {
  focusTarget: CodexForgeBrainFocusTarget;
  paths?: readonly CodexForgeBrainDrilldownPath[];
}): CodexForgeBrainFocusBreadcrumb[] {
  const root: CodexForgeBrainFocusBreadcrumb = {
    id: `focus-root:${input.focusTarget.id}`,
    label: input.focusTarget.label,
    kind: input.focusTarget.kind,
    targetId: input.focusTarget.id,
    depth: 0,
    summary: input.focusTarget.summary,
    readOnly: true,
  };
  const path = [...(input.paths ?? [])].sort((a, b) => a.id.localeCompare(b.id))[0];
  if (!path) return [root];

  return [
    root,
    ...path.steps.map((step) =>
      buildBrainFocusBreadcrumb({ step: { ...step, depth: step.depth + 1 }, pathId: path.id })
    ),
  ].sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.id.localeCompare(b.id);
  });
}

export function summarizeBrainFocusBreadcrumbs(
  breadcrumbs: readonly CodexForgeBrainFocusBreadcrumb[]
): string {
  if (breadcrumbs.length === 0) {
    return "No drilldown breadcrumbs available.";
  }

  return [...breadcrumbs]
    .sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return a.id.localeCompare(b.id);
    })
    .map((breadcrumb) => breadcrumb.label)
    .join(" -> ");
}
