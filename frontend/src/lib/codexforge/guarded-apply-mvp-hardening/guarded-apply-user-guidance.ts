import { buildGuardedApplyMvpHardeningItem } from "./guarded-apply-hardening-types";
import type { GuardedApplyMvpHardeningItem } from "./guarded-apply-hardening-types";

export function buildGuardedApplyUserGuidance(): GuardedApplyMvpHardeningItem {
  return buildGuardedApplyMvpHardeningItem("guarded-apply-user-guidance", "Harden guarded apply", "blocked reasons; approval messaging; one-file/one-diff explanation; rollback checklist; validation stays separate; result handoff to /apply-evidence; no fake apply success; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}
