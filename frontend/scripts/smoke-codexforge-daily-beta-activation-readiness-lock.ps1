param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-end-to-end-workflow-release-candidate",
  "/end-to-end-controlled-rollout-plan",
  "/end-to-end-controlled-rollout-review",
  "/end-to-end-rollout-feedback-inbox",
  "/end-to-end-rollout-regression-review",
  "/end-to-end-rollout-hardening-pass",
  "/live-execution-boundary-final-signoff",
  "/codexforge-end-to-end-daily-beta-candidate",
  "/end-to-end-daily-beta-operator-handoff",
  "/daily-beta-activation-checklist-review",
  "/daily-beta-activation-dry-run-review",
  "/daily-beta-activation-evidence-review",
  "/daily-beta-activation-result-review",
  "/daily-beta-activation-recovery-review",
  "/daily-beta-activation-hardening-pass",
  "/codexforge-daily-beta-activation-release-candidate",
  "/daily-beta-activation-operator-readiness-review",
  "/daily-beta-activation-final-gate",
  "/daily-beta-activation-controlled-operator-trial",
  "/daily-beta-activation-feedback-inbox",
  "/daily-beta-activation-regression-review",
  "/daily-beta-activation-final-hardening",
  "/codexforge-daily-beta-activation-candidate",
  "/daily-beta-activation-release-handoff",
  "/daily-beta-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 577 Daily Beta Activation Readiness Lock" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-readiness-lock.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-readiness-lock" `
  -Route "src\app\daily-beta-activation-readiness-lock" `
  -MainPanel "DailyBetaActivationReadinessLockPanel" `
  -CommandLabel "Go to Daily Beta Activation Readiness Lock" `
  -Modules @("daily-beta-activation-readiness-lock-types.ts", "daily-beta-activation-readiness-lock-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationReadinessLockPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationReadinessLockStableKey", "buildDailyBetaActivationReadinessLock", "buildDailyBetaActivationReadinessLocks", "buildDailyBetaActivationReadinessLockBoundary", "buildDailyBetaActivationReadinessLockModel", "summarizeDailyBetaActivationReadinessLock", "DAILY_BETA_ACTIVATION_READINESS_LOCK_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation readiness lock", "Daily Beta activation readiness lock does not lock readiness automatically", "Readiness lock requires explicit operator approval", "Unresolved readiness lock blockers stay blocked", "Lock criteria groups", "Rollback checklist") `
  -PlainEnglish @("Activation readiness lock identity", "Final gate checklist", "Trial/feedback/regression/hardening checklist", "Handoff checklist", "Denied readiness lock actions", "Unresolved readiness lock blockers", "Activation candidate route", "Checkpoint docs route", "Next recommended action", "no readiness lock automation", "no activation execution", "no Daily Beta activation from UI", "no file mutation", "no memory/RAG ingestion", "no final gate auto-pass", "no controlled operator trial execution", "no release handoff send behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-readiness-lock" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 577 Daily Beta activation readiness lock smoke passed."
