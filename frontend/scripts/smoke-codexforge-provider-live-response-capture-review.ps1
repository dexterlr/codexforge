param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-live-response-capture-review"
$route = "src\app\provider-live-response-capture-review"
$phaseMarkers = @(
  "Provider live response capture review",
  "Provider live response capture review does not store provider outputs",
  "Provider responses require operator review before use",
  "Unsafe provider responses remain blocked",
  "Response capture groups",
  "Safety review checklist"
)
$plainEnglish = @(
  "provider live response capture identity",
  "redaction checklist",
  "cost/rate-limit record checklist",
  "denied response actions",
  "blocked response risks",
  "provider release candidate route",
  "local model live guard route",
  "next recommended action",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced capture details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 460 Provider Live Response Capture Review" `
  -ScriptFile "smoke-codexforge-provider-live-response-capture-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderLiveResponseCaptureReviewPanel" `
  -CommandLabel "Go to Provider Live Response Capture Review" `
  -Modules @("provider-live-response-capture-review-types.ts","provider-live-response-capture-review-summary.ts","index.ts") `
  -Components @("ProviderLiveResponseCaptureReviewPanel.tsx","index.ts") `
  -Exports @("buildProviderLiveResponseCaptureReviewStableKey","buildProviderLiveResponseCaptureReview","buildProviderLiveResponseCaptureReviews","buildProviderLiveResponseCaptureReviewBoundary","buildProviderLiveResponseCaptureReviewModel","summarizeProviderLiveResponseCaptureReview","PROVIDER_LIVE_RESPONSE_CAPTURE_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-provider-live-call-trial-review","/provider-live-trial-release-candidate","/local-model-live-call-guard-review","/provider-response-review-inbox")

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
  "no provider output storage response ingestion or follow-up calls" = "providerOutputStorageAllowedFromUi:\s*true|providerResponseIngestionAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|storeProviderOutput\s*\(|ingestProviderResponse\s*\(|callProviderApi\s*\(|sendPrompt\s*\("
  "no local model bridge or local output persistence" = "localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true"
  "no file memory or approval persistence" = "approvalDecisionPersistenceAllowedFromUi:\s*true|fileMutationAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|brainGraphMutationAllowed:\s*true|writeFile\s*\(|ingestMemory\s*\("
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/provider-live-response-capture-review")

Write-Host "[OK] CodexForge Provider Live Response Capture Review smoke passed."
