import type { DraftToFinalReadiness, DraftToFinalReadinessCheck } from "./draft-to-final-types";

function buildDraftToFinalReadinessCheck(input: DraftToFinalReadinessCheck): DraftToFinalReadinessCheck {
  return input;
}

export function buildDraftToFinalReadiness(input: Partial<DraftToFinalReadiness> = {}): DraftToFinalReadiness {
  return {
    id: input.id ?? "draft-to-final-readiness",
    checks:
      input.checks ??
      [
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-draft-selected",
          label: "draft selected",
          ready: false,
          plainEnglish: "A specific reviewed draft must be chosen before final planning.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-review-complete",
          label: "review complete",
          ready: false,
          plainEnglish: "The review inbox should confirm the draft is worth polishing.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-comparison-complete",
          label: "comparison complete if multiple drafts",
          ready: false,
          plainEnglish: "Compare drafts when there is more than one reasonable candidate.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-upscale-plan",
          label: "upscale plan ready",
          ready: false,
          plainEnglish: "Resolution choices need a safe plan before final-quality work.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-interpolation-plan",
          label: "interpolation plan ready if needed",
          ready: false,
          plainEnglish: "Motion smoothing needs an FPS and risk plan only when it helps the draft.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-quality-gates",
          label: "finishing quality gates passed",
          ready: false,
          plainEnglish: "Prompt, motion, artifacts, resolution, duration, style, and export target should be checked.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-artifact-destination",
          label: "artifact destination planned",
          ready: false,
          plainEnglish: "The final candidate needs a planned local destination before a future render.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-recovery",
          label: "recovery path known",
          ready: false,
          plainEnglish: "The operator should know where to go if future final work fails.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-approval",
          label: "approval required",
          ready: true,
          plainEnglish: "Future final render work remains approval-gated.",
        }),
        buildDraftToFinalReadinessCheck({
          id: "draft-to-final-readiness-no-auto-run",
          label: "no-auto-run guarantee",
          ready: true,
          plainEnglish: "This page does not start rendering, ComfyUI, providers, upscale, or interpolation.",
        }),
      ],
  };
}
