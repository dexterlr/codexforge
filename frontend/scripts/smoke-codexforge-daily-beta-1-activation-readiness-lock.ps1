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
  "/daily-beta-1-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 593 Daily Beta 1 Activation Readiness Lock" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-readiness-lock.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-readiness-lock" `
  -Route "src\app\daily-beta-1-activation-readiness-lock" `
  -MainPanel "DailyBetaOneActivationReadinessLockPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Readiness Lock" `
  -Modules @("daily-beta-1-activation-readiness-lock-types.ts", "daily-beta-1-activation-readiness-lock-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationReadinessLockPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationReadinessLockStableKey", "buildDailyBetaOneActivationReadinessLock", "buildDailyBetaOneActivationReadinessLocks", "buildDailyBetaOneActivationReadinessLockBoundary", "buildDailyBetaOneActivationReadinessLockModel", "summarizeDailyBetaOneActivationReadinessLock", "DAILY_BETA_ONE_ACTIVATION_READINESS_LOCK_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation readiness lock", "Daily Beta 1 activation readiness lock does not lock readiness automatically", "Daily Beta 1 readiness lock requires explicit operator approval", "Unresolved Daily Beta 1 readiness lock blockers stay blocked", "Lock criteria groups", "Controlled trial checklist") `
  -PlainEnglish @("Daily Beta 1 activation readiness lock identity", "Final gate checklist", "Feedback/regression/recovery/hardening checklist", "Release candidate checklist", "Denied readiness lock actions", "Unresolved readiness lock blockers", "Activation release candidate route", "Release readiness dashboard route", "Next recommended action", "no readiness lock automation", "no Daily Beta 1 activation execution", "no go-live behavior", "no workflow execution", "no file mutation", "no memory/RAG ingestion", "no settings persistence", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-readiness-lock" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 593 Daily Beta 1 activation readiness lock smoke passed."
