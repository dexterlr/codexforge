import type { FinishingQualityGate } from "./video-finishing-types";

export function buildFinishingQualityGate(input: Partial<FinishingQualityGate> = {}): FinishingQualityGate {
  return {
    id: input.id ?? "finishing-quality-gate-prompt",
    label: input.label ?? "prompt matches goal",
    passed: input.passed ?? false,
    plainEnglish: input.plainEnglish ?? "The final candidate should still match the original goal before polishing continues.",
  };
}

export function buildDefaultFinishingQualityGates(): FinishingQualityGate[] {
  return [
    buildFinishingQualityGate({ id: "finishing-quality-gate-prompt", label: "prompt matches goal" }),
    buildFinishingQualityGate({ id: "finishing-quality-gate-motion", label: "motion acceptable" }),
    buildFinishingQualityGate({ id: "finishing-quality-gate-artifacts", label: "no severe artifacts" }),
    buildFinishingQualityGate({ id: "finishing-quality-gate-resolution", label: "resolution good enough" }),
    buildFinishingQualityGate({ id: "finishing-quality-gate-duration", label: "duration correct" }),
    buildFinishingQualityGate({ id: "finishing-quality-gate-style", label: "style consistent" }),
    buildFinishingQualityGate({ id: "finishing-quality-gate-export", label: "export target known" }),
  ];
}
