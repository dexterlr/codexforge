param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-live-call-guard-review"
$route = "src\app\provider-live-call-guard-review"
$phaseMarkers = @(
  "Provider live call guard review",
  "Provider live call guard review does not call providers",
  "Provider live calls require explicit operator approval",
  "Provider credentials stay private",
  "Live call guard groups",
  "Credential boundary checklist"
)
$plainEnglish = @(
  "provider live call guard identity",
  "prompt sending checklist",
  "approval gate checklist",
  "denied provider live-call actions",
  "blocked live-call risks",
  "first provider live call trial route",
  "provider response capture route",
  "next recommended action",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced guard details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 458 Provider Live Call Guard Review" `
  -ScriptFile "smoke-codexforge-provider-live-call-guard-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderLiveCallGuardReviewPanel" `
  -CommandLabel "Go to Provider Live Call Guard Review" `
  -Modules @("provider-live-call-guard-review-types.ts","provider-live-call-guard-review-summary.ts","index.ts") `
  -Components @("ProviderLiveCallGuardReviewPanel.tsx","index.ts") `
  -Exports @("buildProviderLiveCallGuardReviewStableKey","buildProviderLiveCallGuardReview","buildProviderLiveCallGuardReviews","buildProviderLiveCallGuardReviewBoundary","buildProviderLiveCallGuardReviewModel","summarizeProviderLiveCallGuardReview","PROVIDER_LIVE_CALL_GUARD_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-provider-live-call-trial-review","/provider-live-response-capture-review","/provider-integration-hardening-pass","/provider-audit-trail-review")

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
  "no provider live calls prompts routing or output persistence" = "providerApiCallsAllowedFromUi:\s*true|providerLiveConnectionTestsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|providerResponseIngestionAllowedFromUi:\s*true|callProviderApi\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(|storeProviderOutput\s*\(|ingestProviderResponse\s*\("
  "no local model invocation bridge endpoint or output persistence" = "localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localEndpointStorageAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true|callLocalModel\s*\(|invokeLocalModel\s*\(|callLocalBridge\s*\(|storeLocalModelOutput\s*\(|ingestLocalModelOutput\s*\("
  "no approval persistence settings storage or credentials" = "approvalDecisionPersistenceAllowedFromUi:\s*true|settingsPersistenceAllowedFromUi:\s*true|credentialStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem"
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/provider-live-call-guard-review")

Write-Host "[OK] CodexForge Provider Live Call Guard Review smoke passed."
