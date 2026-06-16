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
  -PhaseName "Phase 589 Daily Beta 1 Activation Regression Review" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-regression-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-regression-review" `
  -Route "src\app\daily-beta-1-activation-regression-review" `
  -MainPanel "DailyBetaOneActivationRegressionReviewPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Regression Review" `
  -Modules @("daily-beta-1-activation-regression-review-types.ts", "daily-beta-1-activation-regression-review-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationRegressionReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationRegressionReviewStableKey", "buildDailyBetaOneActivationRegressionReview", "buildDailyBetaOneActivationRegressionReviews", "buildDailyBetaOneActivationRegressionReviewBoundary", "buildDailyBetaOneActivationRegressionReviewModel", "summarizeDailyBetaOneActivationRegressionReview", "DAILY_BETA_ONE_ACTIVATION_REGRESSION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation regression review", "Daily Beta 1 activation regression review does not run tests", "Daily Beta 1 activation regression fixes require explicit operator approval", "Unresolved Daily Beta 1 activation regressions stay blocked", "Regression groups", "Controlled trial regression checklist") `
  -PlainEnglish @("Daily Beta 1 activation regression identity", "Activation regression checklist", "Provider/local/connector/automation regression checklist", "Feedback regression checklist", "Denied regression actions", "Unresolved regression blockers", "Recovery review route", "Hardening pass route", "Next recommended action", "no regression/test execution from UI", "no test execution from UI", "no workflow execution", "no fix application", "no patch apply behavior", "no Daily Beta 1 activation execution", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-regression-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 589 Daily Beta 1 activation regression review smoke passed."
