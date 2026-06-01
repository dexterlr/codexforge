import type { RecoveryCase, RecoveryDiagnosis } from "./guided-recovery-flow-types";

export function buildRecoveryDiagnosis(recoveryCase?: RecoveryCase): RecoveryDiagnosis {
  return { title: recoveryCase?.title ?? "Recovery needed", explanation: recoveryCase?.detail ?? "Stop, review evidence, and choose one safe next step." };
}
