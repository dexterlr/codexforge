param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\live-trial-operator-checklist"
$route = "src\app\live-trial-operator-checklist"
$newRoutes = @(
  "/first-live-trial-runbook-review",
  "/live-trial-operator-checklist",
  "/live-trial-failure-recovery-review",
  "/first-controlled-live-workflow-trial"
)

$phaseMarkers = @(
  "Live trial operator checklist",
  "Live trial operator checklist does not approve actions",
  "Every go/no-go decision requires explicit operator approval",
  "Denied checklist shortcuts remain blocked",
  "Operator decision groups",
  "Go no-go checklist"
)

$plainEnglish = @(
  "live trial operator checklist identity",
  "required evidence checklist",
  "denied checklist shortcuts",
  "escalation checklist",
  "blocked checklist risks",
  "failure recovery route",
  "controlled live workflow route",
  "next recommended action",
  "advanced checklist details collapsed/secondary",
  "no live action execution",
  "no recovery auto-trigger"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 447 Live Trial Operator Checklist" `
  -ScriptFile "smoke-codexforge-live-trial-operator-checklist.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LiveTrialOperatorChecklistPanel" `
  -CommandLabel "Go to Live Trial Operator Checklist" `
  -Modules @("live-trial-operator-checklist-types.ts","live-trial-operator-checklist-summary.ts","index.ts") `
  -Components @("LiveTrialOperatorChecklistPanel.tsx","index.ts") `
  -Exports @("buildLiveTrialOperatorChecklistStableKey","buildLiveTrialOperatorChecklist","buildLiveTrialOperatorChecklists","buildLiveTrialOperatorChecklistBoundary","buildLiveTrialOperatorChecklistModel","summarizeLiveTrialOperatorChecklist","LIVE_TRIAL_OPERATOR_CHECKLIST_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-live-trial-runbook-review","/live-trial-failure-recovery-review","/first-controlled-live-workflow-trial","/end-to-end-approval-flow-review")

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
  "no action approval automation or approval persistence" = "actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|autoApprovalAllowedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|autoApprove\s*\(|persistApprovalDecision\s*\("
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

Write-Host "[OK] CodexForge Live Trial Operator Checklist smoke passed."
