import type { MvpPathSafetyLock } from "./mvp-working-path-types";

export function buildMvpPathSafetyLock(): MvpPathSafetyLock {
  return { noAutoApply: true, noAutoRun: true, approvalRequired: true, commandWriteApplySeparate: true, latestMessageAuthority: true };
}
