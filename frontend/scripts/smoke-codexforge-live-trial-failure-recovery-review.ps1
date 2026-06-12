param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\live-trial-failure-recovery-review"
$route = "src\app\live-trial-failure-recovery-review"
$newRoutes = @(
  "/first-live-trial-runbook-review",
  "/live-trial-operator-checklist",
  "/live-trial-failure-recovery-review",
  "/first-controlled-live-workflow-trial"
)

$phaseMarkers = @(
  "Live trial failure recovery review",
  "Live trial failure recovery review does not trigger recovery automatically",
  "Recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts remain blocked",
  "Failure categories",
  "Recovery action groups"
)

$plainEnglish = @(
  "live trial failure recovery identity",
  "rollback checklist",
  "denied recovery shortcuts",
  "escalation checklist",
  "blocked recovery risks",
  "controlled live workflow route",
  "live trial runbook route",
  "next recommended action",
  "advanced recovery details collapsed/secondary",
  "no live action execution",
  "no recovery auto-trigger",
  "no rollback execution"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 448 Live Trial Failure Recovery Review" `
  -ScriptFile "smoke-codexforge-live-trial-failure-recovery-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LiveTrialFailureRecoveryReviewPanel" `
  -CommandLabel "Go to Live Trial Failure Recovery Review" `
  -Modules @("live-trial-failure-recovery-review-types.ts","live-trial-failure-recovery-review-summary.ts","index.ts") `
  -Components @("LiveTrialFailureRecoveryReviewPanel.tsx","index.ts") `
  -Exports @("buildLiveTrialFailureRecoveryReviewStableKey","buildLiveTrialFailureRecoveryReview","buildLiveTrialFailureRecoveryReviews","buildLiveTrialFailureRecoveryReviewBoundary","buildLiveTrialFailureRecoveryReviewModel","summarizeLiveTrialFailureRecoveryReview","LIVE_TRIAL_FAILURE_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-live-trial-runbook-review","/live-trial-operator-checklist","/first-controlled-live-workflow-trial","/failure-recovery-playbook-finalization")

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
  "no recovery auto-trigger or rollback execution" = "recoveryAutoTriggerAllowedFromUi:\s*true|rollbackExecutionAllowedFromUi:\s*true|triggerRecovery\s*\(|autoTriggerRecovery\s*\(|executeRollback\s*\(|runRollback\s*\("
  "no live workflow launch or live action execution" = "liveWorkflowLaunchAllowedFromUi:\s*true|liveActionExecutionAllowedFromUi:\s*true|launchLiveWorkflow\s*\(|executeLiveAction\s*\(|runLiveAction\s*\("
  "no approval automation or approval decision persistence" = "approvalAutomationAllowedFromUi:\s*true|autoApprovalAllowedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(|persistApprovalDecision\s*\("
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

Write-Host "[OK] CodexForge Live Trial Failure Recovery Review smoke passed."
