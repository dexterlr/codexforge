import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const DENIED_MEMORY_BOUNDARY_LANGUAGE =
  "Denied memory boundary | Denied memory boundary does not mutate memory state | Denied memory boundary requires explicit operator approval before promotion | Denied memory boundary blocks secrets environment values credentials tokens private keys arbitrary files hidden approvals hidden memory provider payloads connector payloads and automatic promotion | Denied memory paths remain blocked | Denied memory checklist | Go to Denied Memory Boundary";

export function buildDeniedMemoryBoundaryModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("denied-memory-boundary");
}

export function summarizeDeniedMemoryBoundary(model = buildDeniedMemoryBoundaryModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
