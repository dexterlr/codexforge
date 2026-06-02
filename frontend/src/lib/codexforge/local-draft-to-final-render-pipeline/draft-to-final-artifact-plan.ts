import type { DraftToFinalArtifactPlan } from "./draft-to-final-types";

export function buildDraftToFinalArtifactPlan(input: Partial<DraftToFinalArtifactPlan> = {}): DraftToFinalArtifactPlan {
  return {
    id: input.id ?? "draft-to-final-artifact-plan",
    artifactDestination: input.artifactDestination ?? "planned local final-candidate folder",
    versionNote: input.versionNote ?? "version note should name the draft, upscale plan, interpolation plan, and finishing checklist",
    recoveryPath: input.recoveryPath ?? "send failed or confusing final work to video recovery",
  };
}
