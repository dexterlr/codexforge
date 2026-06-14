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
  -PhaseName "Phase 530 Daily Beta 1 Controlled Trial Result Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-trial-result-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-controlled-trial-result-review" `
  -Route "src\app\daily-beta-1-controlled-trial-result-review" `
  -MainPanel "DailyBetaOneControlledTrialResultReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Trial Result Review" `
  -Modules @("daily-beta-1-controlled-trial-result-review-types.ts", "daily-beta-1-controlled-trial-result-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneControlledTrialResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneControlledTrialResultReviewStableKey", "buildDailyBetaOneControlledTrialResultReview", "buildDailyBetaOneControlledTrialResultReviews", "buildDailyBetaOneControlledTrialResultReviewBoundary", "buildDailyBetaOneControlledTrialResultReviewModel", "summarizeDailyBetaOneControlledTrialResultReview", "DAILY_BETA_ONE_CONTROLLED_TRIAL_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 controlled trial result review", "Daily Beta 1 controlled trial result review does not store live outputs", "Controlled trial results require explicit operator review before use", "Unsafe trial results remain blocked", "Result groups", "Trial evidence checklist") `
  -PlainEnglish @("Controlled trial result review identity", "Result acceptance checklist", "Result rejection checklist", "Result reuse checklist", "Denied result actions", "Unresolved result blockers", "Recovery review route", "Hardening route", "next recommended action") `
  -RouteHref "/daily-beta-1-controlled-trial-result-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 530 Daily Beta 1 controlled trial result review smoke passed."
