import type { RecoveryRetryPlan } from "./guided-recovery-flow-types";

export function buildRecoveryRetryPlan(): RecoveryRetryPlan {
  return { title: "Copy retry plan", steps: ["Stop and review evidence.", "Choose one small correction.", "Preview any patch before apply review.", "Validate separately after approval."] };
}
