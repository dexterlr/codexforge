param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-live-trial-release-candidate"
$route = "src\app\provider-live-trial-release-candidate"
$phaseMarkers = @(
  "Provider live trial release candidate",
  "Provider live trial release candidate does not route live provider traffic",
  "Provider live trial release requires explicit approval",
  "Unresolved provider blockers stay blocked",
  "Live call guard status",
  "Cost rate safety status"
)
$plainEnglish = @(
  "provider live trial candidate identity",
  "first provider trial status",
  "response capture status",
  "denied provider live paths",
  "unresolved provider blockers",
  "local model live guard route",
  "local model trial route",
  "next recommended action",
  "no provider settings persistence",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced candidate details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 461 Provider Live Trial Release Candidate" `
  -ScriptFile "smoke-codexforge-provider-live-trial-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderLiveTrialReleaseCandidatePanel" `
  -CommandLabel "Go to Provider Live Trial Release Candidate" `
  -Modules @("provider-live-trial-release-candidate-types.ts","provider-live-trial-release-candidate-summary.ts","index.ts") `
  -Components @("ProviderLiveTrialReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildProviderLiveTrialReleaseCandidateStableKey","buildProviderLiveTrialReleaseCandidate","buildProviderLiveTrialReleaseCandidates","buildProviderLiveTrialReleaseCandidateBoundary","buildProviderLiveTrialReleaseCandidateModel","summarizeProviderLiveTrialReleaseCandidate","PROVIDER_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/provider-live-call-guard-review","/first-provider-live-call-trial-review","/provider-live-response-capture-review","/local-model-live-call-guard-review")

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}
$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$blockedPatterns = @{
  "no provider traffic routing calls output storage or settings persistence" = "providerTrafficRoutingAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|providerResponseIngestionAllowedFromUi:\s*true|settingsPersistenceAllowedFromUi:\s*true|routeLiveProviderTraffic\s*\(|callProviderApi\s*\(|storeProviderOutput\s*\(|persistSettings\s*\("
  "no local model bridge or local output persistence" = "localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true"
  "no approval automation or blocker clearing" = "approvalAutomationAllowedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(|clearBlockers\s*\("
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/provider-live-trial-release-candidate")

Write-Host "[OK] CodexForge Provider Live Trial Release Candidate smoke passed."
