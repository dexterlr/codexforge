import type { MvpPathRegressionLock } from "./mvp-working-path-types";

export function buildMvpPathRegressionLock(): MvpPathRegressionLock {
  return { smokeScripts: ["smoke-codexforge-coding-flow-live-manual-trial.ps1", "smoke-codexforge-mvp-working-path-lock.ps1", "smoke-codexforge-release-readiness-smoke-pack.ps1"], protectedRoutes: ["/start", "/code-flow/live-run", "/files", "/guarded-apply-mvp", "/apply-evidence", "/validation-results", "/workflow-results", "/run-history", "/closed-loop", "/code-flow/release-audit"] };
}
