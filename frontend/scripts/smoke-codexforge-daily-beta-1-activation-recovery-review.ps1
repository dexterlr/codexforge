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
  -PhaseName "Phase 590 Daily Beta 1 Activation Recovery Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-recovery-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-recovery-review" `
  -Route "src\app\daily-beta-1-activation-recovery-review" `
  -MainPanel "DailyBetaOneActivationRecoveryReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Recovery Review" `
  -Modules @("daily-beta-1-activation-recovery-review-types.ts", "daily-beta-1-activation-recovery-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationRecoveryReviewStableKey", "buildDailyBetaOneActivationRecoveryReview", "buildDailyBetaOneActivationRecoveryReviews", "buildDailyBetaOneActivationRecoveryReviewBoundary", "buildDailyBetaOneActivationRecoveryReviewModel", "summarizeDailyBetaOneActivationRecoveryReview", "DAILY_BETA_ONE_ACTIVATION_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation recovery review", "Daily Beta 1 activation recovery review does not trigger recovery", "Daily Beta 1 recovery actions require explicit operator approval", "Unsafe recovery shortcuts stay blocked", "Recovery groups", "Activation failure categories") `
  -PlainEnglish @("Daily Beta 1 activation recovery identity", "Rollback checklist", "Escalation checklist", "Operator decision checklist", "Denied recovery actions", "Unresolved recovery blockers", "Hardening pass route", "Activation release candidate route", "Next recommended action", "no recovery trigger", "no workflow execution", "no file mutation", "no file write", "no notification sending", "no Daily Beta 1 activation execution", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-recovery-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 590 Daily Beta 1 activation recovery review smoke passed."
