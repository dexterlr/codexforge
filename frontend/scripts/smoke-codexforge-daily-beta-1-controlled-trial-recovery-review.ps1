param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox",
  "/daily-beta-1-feedback-triage-review",
  "/daily-beta-1-regression-review",
  "/daily-beta-1-hardening-pass",
  "/daily-beta-1-documentation-refresh",
  "/daily-beta-1-release-notes-review",
  "/daily-beta-1-operator-handoff-packet",
  "/daily-beta-1-final-safety-review",
  "/codexforge-daily-beta-1-release-candidate",
  "/daily-beta-1-controlled-trial-result-review",
  "/daily-beta-1-controlled-trial-recovery-review",
  "/daily-beta-1-controlled-trial-hardening",
  "/live-backend-boundary-inventory",
  "/provider-execution-boundary-readiness-review",
  "/local-model-execution-boundary-readiness-review",
  "/connector-execution-boundary-readiness-review",
  "/automation-execution-boundary-readiness-review"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 531 Daily Beta 1 Controlled Trial Recovery Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-trial-recovery-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-controlled-trial-recovery-review" `
  -Route "src\app\daily-beta-1-controlled-trial-recovery-review" `
  -MainPanel "DailyBetaOneControlledTrialRecoveryReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Trial Recovery Review" `
  -Modules @("daily-beta-1-controlled-trial-recovery-review-types.ts", "daily-beta-1-controlled-trial-recovery-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneControlledTrialRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneControlledTrialRecoveryReviewStableKey", "buildDailyBetaOneControlledTrialRecoveryReview", "buildDailyBetaOneControlledTrialRecoveryReviews", "buildDailyBetaOneControlledTrialRecoveryReviewBoundary", "buildDailyBetaOneControlledTrialRecoveryReviewModel", "summarizeDailyBetaOneControlledTrialRecoveryReview", "DAILY_BETA_ONE_CONTROLLED_TRIAL_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 controlled trial recovery review", "Daily Beta 1 controlled trial recovery review does not trigger recovery", "Recovery actions require explicit operator approval", "Unsafe recovery shortcuts stay blocked", "Recovery groups", "Failure categories") `
  -PlainEnglish @("Controlled trial recovery review identity", "Rollback checklist", "Escalation checklist", "Operator decision checklist", "Denied recovery actions", "Unresolved recovery blockers", "Hardening route", "Backend boundary inventory route", "next recommended action") `
  -RouteHref "/daily-beta-1-controlled-trial-recovery-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 531 Daily Beta 1 controlled trial recovery review smoke passed."
