import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const COCKPIT_EVIDENCE_MEMORY_SUMMARY_LANGUAGE =
  "Cockpit evidence memory summary | Cockpit evidence memory summary keeps the cockpit as the normal user surface | Cockpit evidence memory summary does not persist memory from the cockpit | Cockpit evidence memory summary shows remembered goal context plan files commands approval evidence result recovery audit and denied memory | Phase pages remain dev test diagnostics only | Cockpit evidence memory checklist | Go to Cockpit Evidence Memory Summary";

export function buildCockpitEvidenceMemorySummaryModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("cockpit-evidence-memory-summary");
}

export function summarizeCockpitEvidenceMemorySummary(model = buildCockpitEvidenceMemorySummaryModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
