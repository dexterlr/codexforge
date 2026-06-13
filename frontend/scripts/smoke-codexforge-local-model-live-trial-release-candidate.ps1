param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-model-live-trial-release-candidate"
$route = "src\app\local-model-live-trial-release-candidate"
$phaseMarkers = @(
  "Local model live trial release candidate",
  "Local model live trial release candidate does not route live local-model traffic",
  "Local model live trial release requires explicit approval",
  "Unresolved local model blockers stay blocked",
  "Local endpoint privacy status",
  "Denied local model live paths"
)
$plainEnglish = @(
  "local model live trial candidate identity",
  "live call guard status",
  "first local model trial status",
  "output capture status",
  "unresolved local model blockers",
  "connector live access route",
  "automation live guard route",
  "next recommended action",
  "no provider settings persistence",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced candidate details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 465 Local Model Live Trial Release Candidate" `
  -ScriptFile "smoke-codexforge-local-model-live-trial-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalModelLiveTrialReleaseCandidatePanel" `
  -CommandLabel "Go to Local Model Live Trial Release Candidate" `
  -Modules @("local-model-live-trial-release-candidate-types.ts","local-model-live-trial-release-candidate-summary.ts","index.ts") `
  -Components @("LocalModelLiveTrialReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildLocalModelLiveTrialReleaseCandidateStableKey","buildLocalModelLiveTrialReleaseCandidate","buildLocalModelLiveTrialReleaseCandidates","buildLocalModelLiveTrialReleaseCandidateBoundary","buildLocalModelLiveTrialReleaseCandidateModel","summarizeLocalModelLiveTrialReleaseCandidate","LOCAL_MODEL_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/local-model-live-call-guard-review","/first-local-model-live-trial-review","/local-model-live-output-capture-review","/connector-live-permission-trial-review","/automation-schedule-safety-review")

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
  "no local model traffic calls invocation bridge or output persistence" = "localModelTrafficRoutingAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true|routeLocalModelTraffic\s*\(|invokeLocalModel\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|storeLocalModelOutput\s*\("
  "no endpoint storage settings persistence or approval automation" = "localEndpointStorageAllowedFromUi:\s*true|settingsPersistenceAllowedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|localStorage\.setItem|sessionStorage\.setItem"
  "no connector automation provider or file memory mutation" = "connectorApiCallsAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|fileMutationAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|callConnectorApi\s*\(|createAutomation\s*\(|callProviderApi\s*\(|writeFile\s*\(|ingestMemory\s*\("
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/local-model-live-trial-release-candidate")

Write-Host "[OK] CodexForge Local Model Live Trial Release Candidate smoke passed."
