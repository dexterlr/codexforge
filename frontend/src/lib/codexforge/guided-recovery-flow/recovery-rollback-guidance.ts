import type { RecoveryRollbackGuidance } from "./guided-recovery-flow-types";

export function buildRecoveryRollbackGuidance(): RecoveryRollbackGuidance {
  return { title: "Copy rollback guide", guidance: "Do not roll back automatically. Identify the changed file, confirm the approved diff, and use the runbook before any manual rollback." };
}
