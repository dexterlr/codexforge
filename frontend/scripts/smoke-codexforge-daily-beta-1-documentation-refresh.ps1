param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-documentation-refresh"
$route = "src\app\daily-beta-1-documentation-refresh"
$phaseMarkers = @(
  "Daily Beta 1 documentation refresh",
  "Daily Beta 1 documentation refresh does not publish documentation automatically",
  "Documentation changes require explicit operator approval",
  "Stale documentation blockers stay blocked",
  "Documentation groups",
  "Release notes handoff checklist"
)
$plainEnglish = @(
  "Daily Beta 1 documentation refresh identity",
  "Operator runbook checklist",
  "Checkpoint docs checklist",
  "Safety wording checklist",
  "Denied documentation shortcuts",
  "Unresolved documentation blockers",
  "Release notes review route",
  "Operator handoff packet route",
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
  PhaseName = "Phase 525 Daily Beta 1 Documentation Refresh"
  ScriptFile = "smoke-codexforge-daily-beta-1-documentation-refresh.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneDocumentationRefreshPanel"
  CommandLabel = "Go to Daily Beta 1 Documentation Refresh"
  Modules = @("daily-beta-1-documentation-refresh-types.ts", "daily-beta-1-documentation-refresh-summary.ts", "index.ts")
  Components = @("DailyBetaOneDocumentationRefreshPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneDocumentationRefreshStableKey", "buildDailyBetaOneDocumentationRefresh", "buildDailyBetaOneDocumentationRefreshs", "buildDailyBetaOneDocumentationRefreshBoundary", "buildDailyBetaOneDocumentationRefreshModel", "summarizeDailyBetaOneDocumentationRefresh", "DAILY_BETA_ONE_DOCUMENTATION_REFRESH_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-documentation-refresh"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 525 Daily Beta 1 documentation refresh smoke passed."