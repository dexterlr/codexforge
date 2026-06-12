param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-live-trial-runbook-review"
$route = "src\app\first-live-trial-runbook-review"
$newRoutes = @(
  "/first-live-trial-runbook-review",
  "/live-trial-operator-checklist",
  "/live-trial-failure-recovery-review",
  "/first-controlled-live-workflow-trial"
)

$phaseMarkers = @(
  "First live trial runbook review",
  "Live trial runbook review does not run workflows",
  "Live trial execution requires explicit operator approval",
  "Stop conditions remain operator-controlled",
  "Runbook sections",
  "Rollback and stop conditions"
)

$plainEnglish = @(
  "first live trial runbook identity",
  "preflight checklist",
  "required approval gates",
  "denied runbook actions",
  "blocked runbook risks",
  "operator checklist route",
  "failure recovery route",
  "next recommended action",
  "advanced runbook details collapsed/secondary",
  "no live action execution",
  "no recovery auto-trigger"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 446 First Live Trial Runbook Review" `
  -ScriptFile "smoke-codexforge-first-live-trial-runbook-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstLiveTrialRunbookReviewPanel" `
  -CommandLabel "Go to First Live Trial Runbook Review" `
  -Modules @("first-live-trial-runbook-review-types.ts","first-live-trial-runbook-review-summary.ts","index.ts") `
  -Components @("FirstLiveTrialRunbookReviewPanel.tsx","index.ts") `
  -Exports @("buildFirstLiveTrialRunbookReviewStableKey","buildFirstLiveTrialRunbookReview","buildFirstLiveTrialRunbookReviews","buildFirstLiveTrialRunbookReviewBoundary","buildFirstLiveTrialRunbookReviewModel","summarizeFirstLiveTrialRunbookReview","FIRST_LIVE_TRIAL_RUNBOOK_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/live-trial-operator-checklist","/live-trial-failure-recovery-review","/first-controlled-live-workflow-trial","/codexforge-live-integration-release-candidate")

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
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $plainEnglish + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no live workflow launch or live action execution" = "liveWorkflowLaunchAllowedFromUi:\s*true|liveActionExecutionAllowedFromUi:\s*true|launchLiveWorkflow\s*\(|executeLiveAction\s*\(|runLiveAction\s*\("
  "no approval automation or approval decision persistence" = "approvalAutomationAllowedFromUi:\s*true|autoApprovalAllowedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(|persistApprovalDecision\s*\(|storeApprovalDecision\s*\("
  "no recovery auto-trigger" = "recoveryAutoTriggerAllowedFromUi:\s*true|triggerRecovery\s*\(|autoTriggerRecovery\s*\("
  "no provider local connector or automation calls" = "providerApiCallsAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|callProviderApi\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|callConnectorApi\s*\(|createAutomation\s*\("
  "no output file memory or credential storage" = "outputStorageAllowed:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|credentialStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|memoryAutoPromotionAllowed:\s*true|storeOutput\s*\(|writeFile\s*\(|localStorage\.setItem|sessionStorage\.setItem|promoteMemory\s*\("
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge First Live Trial Runbook Review smoke passed."
