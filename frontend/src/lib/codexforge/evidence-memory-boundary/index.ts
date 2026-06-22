import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const EVIDENCE_MEMORY_BOUNDARY_LANGUAGE =
  "Evidence memory boundary | Evidence memory boundary does not persist memory from the UI | Evidence memory requires explicit operator approval before promotion | Evidence memory prepares reviewable run memory without hidden persistence | Denied evidence memory paths remain blocked | Evidence memory checklist | Go to Evidence Memory Boundary";

export function buildEvidenceMemoryBoundaryModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("evidence-memory-boundary");
}

export function summarizeEvidenceMemoryBoundary(model = buildEvidenceMemoryBoundaryModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
