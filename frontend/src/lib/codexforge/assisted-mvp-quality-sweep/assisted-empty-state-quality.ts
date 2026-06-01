import type { AssistedEmptyStateQuality } from "./assisted-quality-types";

export function buildAssistedEmptyStateQuality(): AssistedEmptyStateQuality {
  return { title: "Empty-state quality", covered: ["goal", "file", "preview", "approval", "evidence", "validation", "review", "history", "recovery", "demo"] };
}
