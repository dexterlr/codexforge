param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 582 Daily Beta 1 Final Regression Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-final-regression-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-final-regression-review" `
  -Route "src\app\daily-beta-1-final-regression-review" `
  -MainPanel "DailyBetaOneFinalRegressionReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Final Regression Review" `
  -Modules @("daily-beta-1-final-regression-review-types.ts", "daily-beta-1-final-regression-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneFinalRegressionReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneFinalRegressionReviewStableKey", "buildDailyBetaOneFinalRegressionReview", "buildDailyBetaOneFinalRegressionReviews", "buildDailyBetaOneFinalRegressionReviewBoundary", "buildDailyBetaOneFinalRegressionReviewModel", "summarizeDailyBetaOneFinalRegressionReview", "DAILY_BETA_ONE_FINAL_REGRESSION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 final regression review", "Daily Beta 1 final regression review does not run tests", "Final regression fixes require explicit operator approval", "Unresolved final regressions stay blocked", "Regression groups", "File test regression checklist") `
  -PlainEnglish @("Final regression review identity", "Activation regression checklist", "Operator readiness regression checklist", "Provider/local/connector/automation regression checklist", "Denied regression actions", "Unresolved final regression blockers", "Final recovery review route", "Final hardening route", "Next recommended action", "no final regression/test execution", "no regression/test execution from UI", "no test/build/smoke execution from UI", "no workflow execution", "no fix application", "no patch apply behavior", "no recovery trigger", "no hardening apply behavior", "no Daily Beta 1 activation execution", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-final-regression-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 582 Daily Beta 1 final regression review smoke passed."
