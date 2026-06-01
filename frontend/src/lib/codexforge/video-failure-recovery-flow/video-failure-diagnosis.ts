import type { VideoFailureDiagnosis } from "./video-failure-recovery-types";

export function buildVideoFailureDiagnosis(input: Partial<VideoFailureDiagnosis> = {}): VideoFailureDiagnosis {
  return {
    id: input.id ?? "video-failure-diagnosis-missing-model",
    caseId: input.caseId ?? "video-failure-case-missing-model",
    likelyCause: input.likelyCause ?? "The workflow references a local asset that has not been confirmed.",
    confidence: input.confidence ?? "medium",
  };
}
