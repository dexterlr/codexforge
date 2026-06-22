import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const CONTROLLED_EVIDENCE_MEMORY_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled evidence memory release candidate | Controlled evidence memory release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit promote memory or write browser storage from the frontend | Controlled evidence memory release requires explicit operator approval | Release candidate prepares CodexForge for backend-owned evidence memory without hidden persistence | Denied controlled evidence memory paths remain blocked | Controlled evidence memory release checklist | Go to Controlled Evidence Memory Release Candidate";

export function buildControlledEvidenceMemoryReleaseCandidateModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("controlled-evidence-memory-release-candidate");
}

export function summarizeControlledEvidenceMemoryReleaseCandidate(
  model = buildControlledEvidenceMemoryReleaseCandidateModel()
): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
