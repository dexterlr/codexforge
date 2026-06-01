import type { RecoveryHandoff, RecoverySafeNextStep } from "./guided-recovery-flow-types";

export function buildRecoveryHandoff(nextStep: RecoverySafeNextStep): RecoveryHandoff {
  return { title: "Copy recovery handoff", copyText: `Recovery handoff: ${nextStep.reason}. Next safe route: ${nextStep.href}. No automatic retry, no automatic rollback, validation separate.` };
}
