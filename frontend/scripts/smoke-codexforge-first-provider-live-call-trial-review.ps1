param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-provider-live-call-trial-review"
$route = "src\app\first-provider-live-call-trial-review"
$phaseMarkers = @(
  "First provider live call trial review",
  "First provider live call trial review does not send provider requests",
  "Provider requests require explicit operator approval",
  "Unapproved provider calls remain blocked",
  "Trial stages",
  "Cost rate-limit checklist"
)
$plainEnglish = @(
  "first provider live call trial identity",
  "provider request review checklist",
  "approval gate checklist",
  "denied provider trial actions",
  "blocked provider trial risks",
  "provider response capture route",
  "provider release candidate route",
  "next recommended action",
  "no local model invocation",
  "no local endpoint storage",
  "no local model output persistence",
  "no local model output ingestion",
  "advanced trial details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 459 First Provider Live Call Trial Review" `
  -ScriptFile "smoke-codexforge-first-provider-live-call-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstProviderLiveCallTrialReviewPanel" `
  -CommandLabel "Go to First Provider Live Call Trial Review" `
  -Modules @("first-provider-live-call-trial-review-types.ts","first-provider-live-call-trial-review-summary.ts","index.ts") `
  -Components @("FirstProviderLiveCallTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildFirstProviderLiveCallTrialReviewStableKey","buildFirstProviderLiveCallTrialReview","buildFirstProviderLiveCallTrialReviews","buildFirstProviderLiveCallTrialReviewBoundary","buildFirstProviderLiveCallTrialReviewModel","summarizeFirstProviderLiveCallTrialReview","FIRST_PROVIDER_LIVE_CALL_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/provider-live-call-guard-review","/provider-live-response-capture-review","/provider-live-trial-release-candidate","/provider-cost-rate-limit-review")

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
  "no provider request send call routing or output persistence" = "providerApiCallsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|providerResponseIngestionAllowedFromUi:\s*true|callProviderApi\s*\(|sendProviderRequest\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(|storeProviderOutput\s*\("
  "no local model or bridge fallback behavior" = "localModelCallsAllowedFromUi:\s*true|localModelInvocationAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callLocalModel\s*\(|invokeLocalModel\s*\(|callLocalBridge\s*\("
  "no approval or credential persistence" = "approvalDecisionPersistenceAllowedFromUi:\s*true|credentialStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem"
}
foreach ($name in $blockedPatterns.Keys) { Assert-NotMatches $source $blockedPatterns[$name] $name }

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes @("/first-provider-live-call-trial-review")

Write-Host "[OK] CodexForge First Provider Live Call Trial Review smoke passed."
