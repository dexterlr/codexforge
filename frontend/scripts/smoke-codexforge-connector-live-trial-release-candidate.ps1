param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-live-trial-release-candidate"
$route = "src\app\connector-live-trial-release-candidate"
$phaseMarkers = @(
  "Connector live trial release candidate",
  "Connector live trial release candidate does not call connector APIs",
  "Connector live trial release requires explicit approval",
  "Unresolved connector blockers stay blocked",
  "Live access guard status",
  "Redaction privacy status"
)
$plainEnglish = @(
  "connector live trial candidate identity",
  "first connector trial status",
  "evidence capture status",
  "denied connector live paths",
  "unresolved connector blockers",
  "automation live guard route",
  "automation dry-run replay route",
  "next recommended action",
  "no connector permission persistence",
  "advanced candidate details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 469 Connector Live Trial Release Candidate" `
  -ScriptFile "smoke-codexforge-connector-live-trial-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorLiveTrialReleaseCandidatePanel" `
  -CommandLabel "Go to Connector Live Trial Release Candidate" `
  -Modules @("connector-live-trial-release-candidate-types.ts","connector-live-trial-release-candidate-summary.ts","index.ts") `
  -Components @("ConnectorLiveTrialReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildConnectorLiveTrialReleaseCandidateStableKey","buildConnectorLiveTrialReleaseCandidate","buildConnectorLiveTrialReleaseCandidates","buildConnectorLiveTrialReleaseCandidateBoundary","buildConnectorLiveTrialReleaseCandidateModel","summarizeConnectorLiveTrialReleaseCandidate","CONNECTOR_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/connector-live-access-guard-review","/first-connector-live-access-trial-review","/connector-live-evidence-capture-review","/automation-live-execution-guard-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/connector-live-trial-release-candidate")

Write-Host "[OK] CodexForge Connector Live Trial Release Candidate smoke passed."
