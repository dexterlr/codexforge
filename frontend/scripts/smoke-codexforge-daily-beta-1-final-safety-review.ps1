param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-final-safety-review"
$route = "src\app\daily-beta-1-final-safety-review"
$phaseMarkers = @(
  "Daily Beta 1 final safety review",
  "Daily Beta 1 final safety review does not sign off release automatically",
  "Final safety signoff requires explicit operator approval",
  "Unresolved final safety blockers stay blocked",
  "Safety groups",
  "Rollback recovery checklist"
)
$plainEnglish = @(
  "Daily Beta 1 final safety identity",
  "Approval boundary checklist",
  "Data/privacy checklist",
  "Live capability checklist",
  "Denied safety shortcuts",
  "Unresolved safety blockers",
  "Daily Beta 1 release candidate route",
  "Release readiness dashboard route",
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
  PhaseName = "Phase 528 Daily Beta 1 Final Safety Review"
  ScriptFile = "smoke-codexforge-daily-beta-1-final-safety-review.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneFinalSafetyReviewPanel"
  CommandLabel = "Go to Daily Beta 1 Final Safety Review"
  Modules = @("daily-beta-1-final-safety-review-types.ts", "daily-beta-1-final-safety-review-summary.ts", "index.ts")
  Components = @("DailyBetaOneFinalSafetyReviewPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneFinalSafetyReviewStableKey", "buildDailyBetaOneFinalSafetyReview", "buildDailyBetaOneFinalSafetyReviews", "buildDailyBetaOneFinalSafetyReviewBoundary", "buildDailyBetaOneFinalSafetyReviewModel", "summarizeDailyBetaOneFinalSafetyReview", "DAILY_BETA_ONE_FINAL_SAFETY_REVIEW_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-final-safety-review"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 528 Daily Beta 1 final safety review smoke passed."