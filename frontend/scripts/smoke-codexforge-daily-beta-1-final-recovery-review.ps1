param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 583 Daily Beta 1 Final Recovery Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-final-recovery-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-final-recovery-review" `
  -Route "src\app\daily-beta-1-final-recovery-review" `
  -MainPanel "DailyBetaOneFinalRecoveryReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Final Recovery Review" `
  -Modules @("daily-beta-1-final-recovery-review-types.ts", "daily-beta-1-final-recovery-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneFinalRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneFinalRecoveryReviewStableKey", "buildDailyBetaOneFinalRecoveryReview", "buildDailyBetaOneFinalRecoveryReviews", "buildDailyBetaOneFinalRecoveryReviewBoundary", "buildDailyBetaOneFinalRecoveryReviewModel", "summarizeDailyBetaOneFinalRecoveryReview", "DAILY_BETA_ONE_FINAL_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 final recovery review", "Daily Beta 1 final recovery review does not trigger recovery", "Final recovery actions require explicit operator approval", "Unsafe final recovery shortcuts stay blocked", "Recovery groups", "Activation failure categories") `
  -PlainEnglish @("Final recovery review identity", "Rollback checklist", "Escalation checklist", "Operator decision checklist", "Denied recovery actions", "Unresolved final recovery blockers", "Final hardening route", "Daily Beta 1 activation candidate route", "Next recommended action", "no recovery trigger", "no workflow execution", "no file mutation", "no hardening apply behavior", "no Daily Beta 1 activation execution", "no approval automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-final-recovery-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 583 Daily Beta 1 final recovery review smoke passed."
