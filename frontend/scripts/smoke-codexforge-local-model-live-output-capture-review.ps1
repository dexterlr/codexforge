param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-model-live-output-capture-review"
$route = "src\app\local-model-live-output-capture-review"
$phaseMarkers = @(
  "Local model live output capture review",
  "Local model live output capture review does not store model outputs",
  "Local model outputs require operator review before use",
  "Unsafe local model outputs remain blocked",
  "Output capture groups",
  "Operator review checklist"
)
$plainEnglish = @(
  "local model output capture identity",
  "redaction checklist",
  "safety review checklist",
  "denied output actions",
  "blocked output risks",
  "local release candidate route",
  "provider live trial route",
  "next recommended action",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced output details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 464 Local Model Live Output Capture Review" `
  -ScriptFile "smoke-codexforge-local-model-live-output-capture-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalModelLiveOutputCaptureReviewPanel" `
  -CommandLabel "Go to Local Model Live Output Capture Review" `
  -Modules @("local-model-live-output-capture-review-types.ts","local-model-live-output-capture-review-summary.ts","index.ts") `
  -Components @("LocalModelLiveOutputCaptureReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalModelLiveOutputCaptureReviewStableKey","buildLocalModelLiveOutputCaptureReview","buildLocalModelLiveOutputCaptureReviews","buildLocalModelLiveOutputCaptureReviewBoundary","buildLocalModelLiveOutputCaptureReviewModel","summarizeLocalModelLiveOutputCaptureReview","LOCAL_MODEL_LIVE_OUTPUT_CAPTURE_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-local-model-live-trial-review","/local-model-live-trial-release-candidate","/provider-live-trial-release-candidate","/local-model-output-review-inbox")

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
  "no local model output storage ingestion or model invocation" = "localModelOutputStorageAllowedFromUi:\s*true|localModelOutputIngestionAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|storeLocalModelOutput\s*\(|ingestLocalModelOutput\s*\(|invokeLocalModel\s*\(|callLocalModel\s*\("
  "no bridge endpoint prompt or provider calls" = "localBridgeEndpointCallsAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|callLocalBridge\s*\(|sendPrompt\s*\(|callProviderApi\s*\("
  "no file memory or approval persistence" = "approvalDecisionPersistenceAllowedFromUi:\s*true|fileMutationAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|brainGraphMutationAllowed:\s*true|writeFile\s*\(|ingestMemory\s*\("
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/local-model-live-output-capture-review")

Write-Host "[OK] CodexForge Local Model Live Output Capture Review smoke passed."
