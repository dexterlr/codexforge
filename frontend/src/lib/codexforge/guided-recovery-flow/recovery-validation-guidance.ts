import type { RecoveryValidationGuidance } from "./guided-recovery-flow-types";

export function buildRecoveryValidationGuidance(): RecoveryValidationGuidance {
  return { title: "Validation guidance", guidance: "Validation remains manual and separate. Capture output in /validation-results before deciding pass, failed, or unknown." };
}
