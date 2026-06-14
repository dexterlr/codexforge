param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-regression-review"
$route = "src\app\daily-beta-1-regression-review"
$phaseMarkers = @(
  "Daily Beta 1 regression review",
  "Daily Beta 1 regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved regressions stay blocked",
  "Regression groups",
  "Rollout regression checklist"
)
$plainEnglish = @(
  "Daily Beta 1 regression identity",
  "Feedback regression checklist",
  "Provider/local/connector/automation regression checklist",
  "Approval/evidence/result/recovery regression checklist",
  "Denied regression actions",
  "Unresolved regression blockers",
  "Hardening pass route",
  "Documentation refresh route",
  "next recommended action"
)
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
  "/codexforge-daily-beta-1-release-candidate"
)
$params = @{
  PhaseName = "Phase 523 Daily Beta 1 Regression Review"
  ScriptFile = "smoke-codexforge-daily-beta-1-regression-review.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneRegressionReviewPanel"
  CommandLabel = "Go to Daily Beta 1 Regression Review"
  Modules = @("daily-beta-1-regression-review-types.ts", "daily-beta-1-regression-review-summary.ts", "index.ts")
  Components = @("DailyBetaOneRegressionReviewPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneRegressionReviewStableKey", "buildDailyBetaOneRegressionReview", "buildDailyBetaOneRegressionReviews", "buildDailyBetaOneRegressionReviewBoundary", "buildDailyBetaOneRegressionReviewModel", "summarizeDailyBetaOneRegressionReview", "DAILY_BETA_ONE_REGRESSION_REVIEW_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-regression-review"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 523 Daily Beta 1 regression review smoke passed."