param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-feedback-triage-review"
$route = "src\app\daily-beta-1-feedback-triage-review"
$phaseMarkers = @(
  "Daily Beta 1 feedback triage review",
  "Daily Beta 1 feedback triage review does not auto-ingest feedback",
  "Triage decisions require explicit operator approval",
  "Unsafe triage shortcuts stay blocked",
  "Triage groups",
  "Severity priority checklist"
)
$plainEnglish = @(
  "Daily Beta 1 feedback triage identity",
  "Usability feedback queue",
  "Safety feedback queue",
  "Rollout feedback queue",
  "Release feedback queue",
  "Denied triage actions",
  "Unresolved triage blockers",
  "Regression review route",
  "Hardening pass route",
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
  PhaseName = "Phase 522 Daily Beta 1 Feedback Triage Review"
  ScriptFile = "smoke-codexforge-daily-beta-1-feedback-triage-review.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneFeedbackTriageReviewPanel"
  CommandLabel = "Go to Daily Beta 1 Feedback Triage Review"
  Modules = @("daily-beta-1-feedback-triage-review-types.ts", "daily-beta-1-feedback-triage-review-summary.ts", "index.ts")
  Components = @("DailyBetaOneFeedbackTriageReviewPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneFeedbackTriageReviewStableKey", "buildDailyBetaOneFeedbackTriageReview", "buildDailyBetaOneFeedbackTriageReviews", "buildDailyBetaOneFeedbackTriageReviewBoundary", "buildDailyBetaOneFeedbackTriageReviewModel", "summarizeDailyBetaOneFeedbackTriageReview", "DAILY_BETA_ONE_FEEDBACK_TRIAGE_REVIEW_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-feedback-triage-review"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 522 Daily Beta 1 feedback triage review smoke passed."