import type { AssistedSafetyQuality } from "./assisted-quality-types";

export function buildAssistedSafetyQuality(): AssistedSafetyQuality {
  return { title: "Safety quality", preserved: ["No auto-apply", "No auto-run", "Approval required", "Validation separate", "Latest-message authority", "No hidden mutation"] };
}
