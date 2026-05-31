import { buildGuardedApplyMvpHardeningItem } from "./guarded-apply-hardening-types";
import type { GuardedApplyMvpHardeningSummary } from "./guarded-apply-hardening-types";

export function buildGuardedApplyHardeningSummary(): GuardedApplyMvpHardeningSummary {
  return {
    title: "Harden guarded apply",
    status: "review",
    primaryAction: "Review hardening",
    nextRoute: "/guarded-apply-mvp/hardening",
    items: [buildGuardedApplyMvpHardeningItem("summary-01", "Harden guarded apply", "blocked reasons; approval messaging; one-file/one-diff explanation; rollback checklist; validation stays separate; result handoff to /apply-evidence; no fake apply success; no auto-apply; no auto-run; approval required; preserve latest-message authority")]
  };
}
