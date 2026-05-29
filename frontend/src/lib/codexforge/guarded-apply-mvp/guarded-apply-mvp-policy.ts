import type { GuardedApplyMvpPolicy, GuardedApplyMvpRequest } from "./guarded-apply-mvp-types";
import { validateGuardedApplyMvpRequest } from "./guarded-apply-mvp-request";

export function buildGuardedApplyMvpPolicy(request: GuardedApplyMvpRequest): GuardedApplyMvpPolicy {
  const validation = validateGuardedApplyMvpRequest(request);
  const safetyRules = [
    "one file only",
    "one diff only",
    "preview diff required",
    "exact approval required",
    "approval invalidated if file/diff/request changes",
    "no multi-file diff",
    "no binary patch",
    "no package/lock/config/tool-policy/brain-runtime edits for first MVP",
    "no direct UI apply-diff",
    "no direct UI write-file",
    "no direct UI run-command",
    "no combined apply+validate button",
    "validation remains separate",
    "rollback guidance required",
    "preserve latest-message authority",
  ];
  return {
    decision: validation.ok ? "allowed" : "blocked",
    allowed: validation.ok,
    allowedReasons: validation.ok ? ["Request is one file, one diff, previewed, approved separately, and validation remains separate."] : [],
    blockedReasons: validation.blockedReasons,
    safetyRules,
  };
}

export function isGuardedApplyMvpAllowed(policy: GuardedApplyMvpPolicy): boolean {
  return policy.allowed;
}
