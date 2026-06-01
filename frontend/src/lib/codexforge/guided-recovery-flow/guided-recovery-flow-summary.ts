import { buildDefaultRecoveryCases } from "./recovery-case";
import { buildRecoveryDiagnosis } from "./recovery-diagnosis";
import { buildRecoveryHandoff } from "./recovery-handoff";
import { buildRecoveryRetryPlan } from "./recovery-retry-plan";
import { buildRecoveryRollbackGuidance } from "./recovery-rollback-guidance";
import { buildRecoverySafeNextStep } from "./recovery-safe-next-step";
import { buildRecoveryValidationGuidance } from "./recovery-validation-guidance";
import type { GuidedRecoveryFlowSummary } from "./guided-recovery-flow-types";

export function buildGuidedRecoveryFlowSummary(): GuidedRecoveryFlowSummary {
  const cases = buildDefaultRecoveryCases();
  const recoveryCase = cases[0];
  const safeNextStep = buildRecoverySafeNextStep(recoveryCase);
  return { title: "Recovery flow", subtitle: "When something fails, follow a safe next step.", primaryAction: "Find safe next step", cases, diagnosis: buildRecoveryDiagnosis(recoveryCase), safeNextStep, retryPlan: buildRecoveryRetryPlan(), rollbackGuidance: buildRecoveryRollbackGuidance(), validationGuidance: buildRecoveryValidationGuidance(), handoff: buildRecoveryHandoff(safeNextStep) };
}
