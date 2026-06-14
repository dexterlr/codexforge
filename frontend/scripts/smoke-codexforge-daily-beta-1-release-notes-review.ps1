param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-release-notes-review"
$route = "src\app\daily-beta-1-release-notes-review"
$phaseMarkers = @(
  "Daily Beta 1 release notes review",
  "Daily Beta 1 release notes review does not publish release notes",
  "Release notes require explicit operator approval",
  "Unresolved release note blockers stay blocked",
  "Release note groups",
  "Known blocker checklist"
)
$plainEnglish = @(
  "Daily Beta 1 release notes identity",
  "User-visible change checklist",
  "Safety limitation checklist",
  "Validation evidence checklist",
  "Denied release note actions",
  "Unresolved release note blockers",
  "Operator handoff packet route",
  "Final safety review route",
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
  PhaseName = "Phase 526 Daily Beta 1 Release Notes Review"
  ScriptFile = "smoke-codexforge-daily-beta-1-release-notes-review.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneReleaseNotesReviewPanel"
  CommandLabel = "Go to Daily Beta 1 Release Notes Review"
  Modules = @("daily-beta-1-release-notes-review-types.ts", "daily-beta-1-release-notes-review-summary.ts", "index.ts")
  Components = @("DailyBetaOneReleaseNotesReviewPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneReleaseNotesReviewStableKey", "buildDailyBetaOneReleaseNotesReview", "buildDailyBetaOneReleaseNotesReviews", "buildDailyBetaOneReleaseNotesReviewBoundary", "buildDailyBetaOneReleaseNotesReviewModel", "summarizeDailyBetaOneReleaseNotesReview", "DAILY_BETA_ONE_RELEASE_NOTES_REVIEW_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-release-notes-review"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 526 Daily Beta 1 release notes review smoke passed."