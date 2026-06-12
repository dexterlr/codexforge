param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-controlled-live-workflow-trial"
$route = "src\app\first-controlled-live-workflow-trial"
$newRoutes = @(
  "/first-live-trial-runbook-review",
  "/live-trial-operator-checklist",
  "/live-trial-failure-recovery-review",
  "/first-controlled-live-workflow-trial"
)

$phaseMarkers = @(
  "First controlled live workflow trial",
  "First controlled live workflow trial does not execute live actions",
  "Controlled live actions require explicit operator approval",
  "Denied live action paths remain blocked",
  "Controlled workflow stages",
  "Validation evidence checklist"
)

$plainEnglish = @(
  "first controlled live workflow trial identity",
  "provider/local/connector/automation handoff preview",
  "approval gate checklist",
  "denied live action paths",
  "blocked live trial risks",
  "live trial runbook route",
  "failure recovery route",
  "next recommended action",
  "advanced live trial details collapsed/secondary",
  "no live action execution",
  "no recovery auto-trigger",
  "no output storage"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 449 First Controlled Live Workflow Trial" `
  -ScriptFile "smoke-codexforge-first-controlled-live-workflow-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstControlledLiveWorkflowTrialPanel" `
  -CommandLabel "Go to First Controlled Live Workflow Trial" `
  -Modules @("first-controlled-live-workflow-trial-types.ts","first-controlled-live-workflow-trial-summary.ts","index.ts") `
  -Components @("FirstControlledLiveWorkflowTrialPanel.tsx","index.ts") `
  -Exports @("buildFirstControlledLiveWorkflowTrialStableKey","buildFirstControlledLiveWorkflowTrial","buildFirstControlledLiveWorkflowTrials","buildFirstControlledLiveWorkflowTrialBoundary","buildFirstControlledLiveWorkflowTrialModel","summarizeFirstControlledLiveWorkflowTrial","FIRST_CONTROLLED_LIVE_WORKFLOW_TRIAL_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/first-live-trial-runbook-review","/live-trial-operator-checklist","/live-trial-failure-recovery-review","/codexforge-live-integration-release-candidate")

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
  "no approval automation or approval decision persistence" = "approvalAutomationAllowedFromUi:\s*true|autoApprovalAllowedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(|persistApprovalDecision\s*\("
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

Write-Host "[OK] CodexForge First Controlled Live Workflow Trial smoke passed."
