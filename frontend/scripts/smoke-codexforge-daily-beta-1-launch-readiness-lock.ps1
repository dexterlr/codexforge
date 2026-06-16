param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-readiness-lock-audit",
  "/daily-beta-release-candidate-summary",
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate",
  "/daily-beta-1-activation-final-gate",
  "/daily-beta-1-activation-controlled-trial",
  "/daily-beta-1-activation-feedback-review",
  "/daily-beta-1-activation-regression-review",
  "/daily-beta-1-activation-recovery-review",
  "/daily-beta-1-activation-hardening-pass",
  "/codexforge-daily-beta-1-activation-release-candidate",
  "/daily-beta-1-activation-readiness-lock",
  "/daily-beta-1-activation-lock-audit",
  "/daily-beta-1-release-handoff-final-review",
  "/daily-beta-1-launch-readiness-summary",
  "/daily-beta-1-launch-dry-run-review",
  "/daily-beta-1-launch-evidence-review",
  "/daily-beta-1-launch-result-review",
  "/codexforge-daily-beta-1-launch-candidate",
  "/daily-beta-1-launch-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 601 Daily Beta 1 Launch Readiness Lock" `
  -ScriptFile "smoke-codexforge-daily-beta-1-launch-readiness-lock.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-launch-readiness-lock" `
  -Route "src\app\daily-beta-1-launch-readiness-lock" `
  -MainPanel "DailyBetaOneLaunchReadinessLockPanel" `
  -CommandLabel "Go to Daily Beta 1 Launch Readiness Lock" `
  -Modules @("daily-beta-1-launch-readiness-lock-types.ts", "daily-beta-1-launch-readiness-lock-summary.ts", "index.ts") `
  -Components @("DailyBetaOneLaunchReadinessLockPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneLaunchReadinessLockStableKey", "buildDailyBetaOneLaunchReadinessLock", "buildDailyBetaOneLaunchReadinessLocks", "buildDailyBetaOneLaunchReadinessLockBoundary", "buildDailyBetaOneLaunchReadinessLockModel", "summarizeDailyBetaOneLaunchReadinessLock", "DAILY_BETA_ONE_LAUNCH_READINESS_LOCK_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 launch readiness lock", "Daily Beta 1 launch readiness lock does not lock launch readiness automatically", "Launch readiness lock requires explicit operator approval", "Unresolved launch readiness lock blockers stay blocked", "Lock criteria groups", "Launch candidate checklist") `
  -PlainEnglish @("Launch readiness lock identity", "Launch readiness summary checklist", "Dry-run/evidence/result checklist", "Rollback checklist", "Denied readiness lock actions", "Unresolved launch readiness lock blockers", "Launch candidate route", "Checkpoint docs route", "Next recommended action", "no launch readiness lock automation", "no Daily Beta 1 launch execution", "no launch approval automation", "no launch dry-run execution", "no evidence ingestion", "no result persistence", "no handoff send behavior", "no go-live behavior", "no file mutation", "no memory/RAG ingestion", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-launch-readiness-lock" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 601 Daily Beta 1 launch readiness lock smoke passed."
