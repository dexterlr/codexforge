param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-model-live-call-guard-review"
$route = "src\app\local-model-live-call-guard-review"
$phaseMarkers = @(
  "Local model live call guard review",
  "Local model live call guard review does not call local models",
  "Local model calls require explicit operator approval",
  "Local endpoints stay private",
  "Local runtime guard groups",
  "Local bridge boundary checklist"
)
$plainEnglish = @(
  "local model live call guard identity",
  "Prompt privacy checklist",
  "approval gate checklist",
  "denied local live-call actions",
  "blocked local call risks",
  "first local model trial route",
  "local model output capture route",
  "next recommended action",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced guard details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 462 Local Model Live Call Guard Review" `
  -ScriptFile "smoke-codexforge-local-model-live-call-guard-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalModelLiveCallGuardReviewPanel" `
  -CommandLabel "Go to Local Model Live Call Guard Review" `
  -Modules @("local-model-live-call-guard-review-types.ts","local-model-live-call-guard-review-summary.ts","index.ts") `
  -Components @("LocalModelLiveCallGuardReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalModelLiveCallGuardReviewStableKey","buildLocalModelLiveCallGuardReview","buildLocalModelLiveCallGuardReviews","buildLocalModelLiveCallGuardReviewBoundary","buildLocalModelLiveCallGuardReviewModel","summarizeLocalModelLiveCallGuardReview","LOCAL_MODEL_LIVE_CALL_GUARD_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/provider-live-trial-release-candidate","/first-local-model-live-trial-review","/local-model-live-output-capture-review","/local-model-runtime-boundary-review")

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
  "no local model invocation bridge endpoint endpoint storage or output persistence" = "localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localEndpointStorageAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true|callLocalModel\s*\(|invokeLocalModel\s*\(|callLocalBridge\s*\(|storeLocalModelOutput\s*\(|ingestLocalModelOutput\s*\("
  "no provider connector or prompt traffic" = "providerApiCallsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|sendPrompt\s*\("
  "no approval persistence credentials or endpoints" = "approvalDecisionPersistenceAllowedFromUi:\s*true|credentialStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem"
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/local-model-live-call-guard-review")

Write-Host "[OK] CodexForge Local Model Live Call Guard Review smoke passed."
