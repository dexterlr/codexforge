import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const FIRST_EVIDENCE_MEMORY_CANDIDATE_LANGUAGE =
  "First evidence memory candidate | First evidence memory candidate does not persist memory automatically | First evidence memory candidate requires explicit operator approval | Candidate combines goal context plan diff command approval evidence result recovery audit denied memory and promotion review | Denied first evidence memory paths remain blocked | First evidence memory checklist | Go to First Evidence Memory Candidate";

export function buildFirstEvidenceMemoryCandidateModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("first-evidence-memory-candidate");
}

export function summarizeFirstEvidenceMemoryCandidate(model = buildFirstEvidenceMemoryCandidateModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
