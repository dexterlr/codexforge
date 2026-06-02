import type { DraftToFinalPipeline } from "./draft-to-final-types";

export function buildDraftToFinalPipeline(input: Partial<DraftToFinalPipeline> = {}): DraftToFinalPipeline {
  return {
    id: input.id ?? "local-draft-to-final-pipeline",
    stages:
      input.stages ??
      [
        "review draft",
        "compare drafts if more than one exists",
        "plan upscale if resolution needs polish",
        "plan interpolation if motion needs smoothing",
        "pass finishing quality gates",
        "capture final render handoff",
      ],
    localFirstPosture: input.localFirstPosture ?? "Draft-to-final stays local-first, reviewed, and blocked until future approved execution exists.",
    approvalRequired: input.approvalRequired ?? true,
    noAutoRun: input.noAutoRun ?? true,
  };
}

export function buildDefaultDraftToFinalPipeline(): DraftToFinalPipeline {
  return buildDraftToFinalPipeline();
}
