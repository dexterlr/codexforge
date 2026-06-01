import type { AssistedCodingHandoff, AssistedCodingNextAction } from "./assisted-coding-mode-types";

export function buildAssistedCodingHandoff(nextAction: AssistedCodingNextAction): AssistedCodingHandoff {
  return {
    title: "Assisted coding handoff",
    copyText: `Goal selected. Recommended next step: ${nextAction.label} at ${nextAction.href}. Safe because: ${nextAction.safeBecause}. Still manual: ${nextAction.stillManual}.`,
  };
}
