import type { AssistedCodingSafetyState } from "./assisted-coding-mode-types";

export function buildAssistedCodingSafetyState(): AssistedCodingSafetyState {
  return {
    status: "safe-guide",
    promises: ["no auto-apply", "no auto-run", "approval required", "validation stays separate", "preserve latest-message authority"],
  };
}
