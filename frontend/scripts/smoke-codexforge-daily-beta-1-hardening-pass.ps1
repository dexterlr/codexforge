param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-hardening-pass"
$route = "src\app\daily-beta-1-hardening-pass"
$phaseMarkers = @(
  "Daily Beta 1 hardening pass",
  "Daily Beta 1 hardening pass does not apply changes",
  "Daily Beta 1 hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Feedback triage status"
)
$plainEnglish = @(
  "Daily Beta 1 hardening identity",
  "Regression status",
  "Rollout status",
  "Safety readiness checklist",
  "Denied hardening actions",
  "Unresolved hardening blockers",
  "Documentation refresh route",
  "Release notes review route",
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
  PhaseName = "Phase 524 Daily Beta 1 Hardening Pass"
  ScriptFile = "smoke-codexforge-daily-beta-1-hardening-pass.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneHardeningPassPanel"
  CommandLabel = "Go to Daily Beta 1 Hardening Pass"
  Modules = @("daily-beta-1-hardening-pass-types.ts", "daily-beta-1-hardening-pass-summary.ts", "index.ts")
  Components = @("DailyBetaOneHardeningPassPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneHardeningPassStableKey", "buildDailyBetaOneHardeningPass", "buildDailyBetaOneHardeningPasss", "buildDailyBetaOneHardeningPassBoundary", "buildDailyBetaOneHardeningPassModel", "summarizeDailyBetaOneHardeningPass", "DAILY_BETA_ONE_HARDENING_PASS_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-hardening-pass"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 524 Daily Beta 1 hardening pass smoke passed."