import type { FinishingStep } from "./video-finishing-types";

export function buildFinishingStep(input: Partial<FinishingStep> = {}): FinishingStep {
  return {
    id: input.id ?? "finishing-step-select-best-draft",
    label: input.label ?? "select best draft",
    plainEnglish: input.plainEnglish ?? "Choose the draft that best matches the goal before spending more local GPU time.",
    status: input.status ?? "manual-review",
  };
}

export function buildDefaultFinishingSteps(): FinishingStep[] {
  return [
    buildFinishingStep({
      id: "finishing-step-select-best-draft",
      label: "select best draft",
      plainEnglish: "Pick the best reviewed draft before polishing it.",
    }),
    buildFinishingStep({
      id: "finishing-step-review-artifacts",
      label: "review artifacts",
      plainEnglish: "Check notes, package handoffs, and artifact destination before final planning.",
    }),
    buildFinishingStep({
      id: "finishing-step-decide-upscale",
      label: "decide upscale",
      plainEnglish: "Choose whether higher resolution is worth the extra local GPU time.",
      status: "planned",
    }),
    buildFinishingStep({
      id: "finishing-step-decide-interpolation",
      label: "decide interpolation",
      plainEnglish: "Choose whether smoother motion helps, or whether it may add flicker or artifacts.",
      status: "planned",
    }),
    buildFinishingStep({
      id: "finishing-step-plan-export",
      label: "plan final export",
      plainEnglish: "Name the format, destination, and review notes before a future final render.",
      status: "planned",
    }),
    buildFinishingStep({
      id: "finishing-step-capture-handoff",
      label: "capture final handoff",
      plainEnglish: "Copy the final checklist so future approved execution has clear boundaries.",
      status: "blocked-until-approved",
    }),
    buildFinishingStep({
      id: "finishing-step-archive-version-note",
      label: "archive/version note",
      plainEnglish: "Record which draft and settings became the final candidate.",
      status: "planned",
    }),
  ];
}
