param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-local-model-live-trial-review"
$route = "src\app\first-local-model-live-trial-review"
$phaseMarkers = @(
  "First local model live trial review",
  "First local model live trial review does not invoke local models",
  "Local model trial requires explicit operator approval",
  "Unapproved local model calls remain blocked",
  "Runtime readiness checklist",
  "Prompt privacy checklist"
)
$plainEnglish = @(
  "first local model live trial identity",
  "Trial stages",
  "approval gate checklist",
  "denied local trial actions",
  "blocked local trial risks",
  "local output capture route",
  "local release candidate route",
  "next recommended action",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced trial details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 463 First Local Model Live Trial Review" `
  -ScriptFile "smoke-codexforge-first-local-model-live-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstLocalModelLiveTrialReviewPanel" `
  -CommandLabel "Go to First Local Model Live Trial Review" `
  -Modules @("first-local-model-live-trial-review-types.ts","first-local-model-live-trial-review-summary.ts","index.ts") `
  -Components @("FirstLocalModelLiveTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildFirstLocalModelLiveTrialReviewStableKey","buildFirstLocalModelLiveTrialReview","buildFirstLocalModelLiveTrialReviews","buildFirstLocalModelLiveTrialReviewBoundary","buildFirstLocalModelLiveTrialReviewModel","summarizeFirstLocalModelLiveTrialReview","FIRST_LOCAL_MODEL_LIVE_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/local-model-live-call-guard-review","/local-model-live-output-capture-review","/local-model-live-trial-release-candidate","/local-model-runtime-boundary-review")

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
  "no local model invocation bridge endpoint prompt or output persistence" = "localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true|invokeLocalModel\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|sendPrompt\s*\(|storeLocalModelOutput\s*\("
  "no provider or connector fallback calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\("
  "no approval persistence endpoint storage or credentials" = "approvalDecisionPersistenceAllowedFromUi:\s*true|localEndpointStorageAllowedFromUi:\s*true|credentialStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem"
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/first-local-model-live-trial-review")

Write-Host "[OK] CodexForge First Local Model Live Trial Review smoke passed."
