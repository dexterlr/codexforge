import type { RecoveryCase, RecoverySafeNextStep } from "./guided-recovery-flow-types";

export function buildRecoverySafeNextStep(recoveryCase?: RecoveryCase): RecoverySafeNextStep {
  const href = recoveryCase?.route ?? "/assist";
  return { label: "Open safe next step", href, reason: recoveryCase?.detail ?? "Use assisted mode if the failure is unclear." };
}
