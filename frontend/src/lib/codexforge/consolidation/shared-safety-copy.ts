import type { SharedSafetyCopy, SharedSafetyCopyItem } from "./consolidation-types";
import { buildConsolidationStableKey } from "./consolidation-types";

const ITEMS: readonly Omit<SharedSafetyCopyItem, "id">[] = [
  { label: "local-first", copy: "CodexForge consolidation is local-first and deterministic.", posture: "enforced" },
  { label: "operator-safe", copy: "Operator-safe review surfaces expose context and links only.", posture: "enforced" },
  { label: "no auto-fix", copy: "No auto-fix, no auto-rollback, and no automatic repair is triggered.", posture: "enforced" },
  { label: "no command execution without approval", copy: "No command execution without approval; consolidation UI does not run commands.", posture: "enforced" },
  { label: "no file writes without approval", copy: "No file writes without approval; consolidation UI does not mutate source files.", posture: "enforced" },
  { label: "no graph mutation from UI", copy: "No graph mutation from UI; Brain graph behavior is preserved.", posture: "enforced" },
  { label: "no appendEvent from UI", copy: "No appendEvent from UI; runtime event append remains outside this cockpit.", posture: "enforced" },
  { label: "no saveBrainGraph from UI", copy: "No saveBrainGraph from UI; graph persistence is not available here.", posture: "enforced" },
  { label: "no snapshot restore by default", copy: "No snapshot restore by default; restore remains preview and approval gated elsewhere.", posture: "review-required" },
  { label: "evidence is context, not authority", copy: "Evidence is context, not authority; current files and latest operator instruction remain authoritative.", posture: "operator-visible" },
  { label: "preserve latest-message authority", copy: "Preserve latest-message authority whenever instructions conflict.", posture: "enforced" },
  { label: "no auto-persistence", copy: "No auto-persistence from consolidation summaries or copy payloads.", posture: "enforced" },
];

export function buildSharedSafetyCopyItem(input: Omit<SharedSafetyCopyItem, "id">): SharedSafetyCopyItem {
  return { id: buildConsolidationStableKey("safety-copy", input.label), ...input };
}

export function buildSharedSafetyCopy(): SharedSafetyCopy {
  const items = ITEMS.map(buildSharedSafetyCopyItem);
  return {
    id: "shared-safety-copy",
    items,
    summary: summarizeSharedSafetyCopy({ items }),
  };
}

export function summarizeSharedSafetyCopy(copy: Pick<SharedSafetyCopy, "items">): string[] {
  return [
    `${copy.items.length} shared safety copy items are visible.`,
    "Safety copy covers local-first, operator-safe, no auto-fix, no command execution, no file writes, no graph mutation, no appendEvent from UI, no saveBrainGraph from UI, evidence context, and latest-message authority.",
  ];
}
