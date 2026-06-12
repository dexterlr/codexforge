param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codexforge-live-integration-release-candidate"
$route = "src\app\codexforge-live-integration-release-candidate"
$newRoutes = @(
  "/unified-live-integration-readiness-review",
  "/first-end-to-end-dry-run-review",
  "/end-to-end-approval-flow-review",
  "/codexforge-live-integration-release-candidate"
)

$phaseMarkers = @(
  "CodexForge live integration release candidate",
  "Live integration release candidate does not go live",
  "Going live requires explicit operator approval",
  "Denied live paths remain blocked",
  "Provider local connector automation matrix",
  "Safety boundary status"
)

$plainEnglish = @(
  "live integration release candidate identity",
  "provider/local/connector/automation matrix",
  "dry-run status",
  "approval flow status",
  "denied live paths",
  "unresolved launch blockers",
  "operator home route",
  "live trial runbook route",
  "next recommended action",
  "advanced release candidate details collapsed/secondary",
  "no release/publish behavior",
  "no release publishing"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 445 CodexForge Live Integration Release Candidate" `
  -ScriptFile "smoke-codexforge-live-integration-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodexForgeLiveIntegrationReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Live Integration Release Candidate" `
  -Modules @("codexforge-live-integration-release-candidate-types.ts","codexforge-live-integration-release-candidate-summary.ts","index.ts") `
  -Components @("CodexForgeLiveIntegrationReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildCodexForgeLiveIntegrationReleaseCandidateStableKey","buildCodexForgeLiveIntegrationReleaseCandidate","buildCodexForgeLiveIntegrationReleaseCandidates","buildCodexForgeLiveIntegrationReleaseCandidateBoundary","buildCodexForgeLiveIntegrationReleaseCandidateModel","summarizeCodexForgeLiveIntegrationReleaseCandidate","CODEXFORGE_LIVE_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/unified-live-integration-readiness-review","/first-end-to-end-dry-run-review","/end-to-end-approval-flow-review","/daily-operator-home","/foundation-release-runbook-finalization")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Live Integration Release Candidate smoke passed."
