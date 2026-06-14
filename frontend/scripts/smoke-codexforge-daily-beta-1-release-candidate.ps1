param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\codexforge-daily-beta-1-release-candidate"
$route = "src\app\codexforge-daily-beta-1-release-candidate"
$phaseMarkers = @(
  "CodexForge Daily Beta 1 release candidate",
  "CodexForge Daily Beta 1 release candidate does not go live",
  "Daily Beta 1 release requires explicit operator approval",
  "Unresolved release candidate blockers stay blocked",
  "Daily Beta 1 release candidate identity",
  "Final safety status"
)
$plainEnglish = @(
  "Feedback triage status",
  "Regression status",
  "Hardening status",
  "Documentation/release notes/handoff status",
  "Denied release candidate actions",
  "Unresolved release candidate blockers",
  "Next rollout milestone route",
  "Checkpoint docs route",
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
  PhaseName = "Phase 529 CodexForge Daily Beta 1 Release Candidate"
  ScriptFile = "smoke-codexforge-daily-beta-1-release-candidate.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "CodexForgeDailyBetaOneReleaseCandidatePanel"
  CommandLabel = "Go to CodexForge Daily Beta 1 Release Candidate"
  Modules = @("codexforge-daily-beta-1-release-candidate-types.ts", "codexforge-daily-beta-1-release-candidate-summary.ts", "index.ts")
  Components = @("CodexForgeDailyBetaOneReleaseCandidatePanel.tsx", "index.ts")
  Exports = @("buildCodexForgeDailyBetaOneReleaseCandidateStableKey", "buildCodexForgeDailyBetaOneReleaseCandidate", "buildCodexForgeDailyBetaOneReleaseCandidates", "buildCodexForgeDailyBetaOneReleaseCandidateBoundary", "buildCodexForgeDailyBetaOneReleaseCandidateModel", "summarizeCodexForgeDailyBetaOneReleaseCandidate", "CODEXFORGE_DAILY_BETA_ONE_RELEASE_CANDIDATE_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/codexforge-daily-beta-1-release-candidate"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 529 CodexForge Daily Beta 1 release candidate smoke passed."
