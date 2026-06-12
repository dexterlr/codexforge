param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-controlled-live-workflow-replay"
$route = "src\app\first-controlled-live-workflow-replay"
$newRoutes = @(
  "/live-workflow-evidence-capture-review",
  "/live-workflow-result-review-inbox",
  "/live-workflow-operator-feedback-review",
  "/controlled-live-workflow-release-candidate",
  "/first-controlled-live-workflow-replay",
  "/live-workflow-regression-matrix",
  "/live-workflow-failure-patch-review",
  "/live-workflow-hardening-pass"
)

$phaseMarkers = @(
  "First controlled live workflow replay",
  "Controlled live workflow replay does not rerun live actions",
  "Replay review requires operator approval before reuse",
  "Unsafe replay shortcuts stay blocked",
  "Replay stages",
  "Expected actual comparison groups"
)

$plainEnglish = @(
  "live workflow replay identity",
  "Replay stages",
  "Expected actual comparison groups",
  "validation evidence checklist",
  "denied replay actions",
  "blocked replay risks",
  "regression matrix route",
  "failure patch route",
  "next recommended action",
  "advanced replay details collapsed/secondary",
  "no evidence auto-ingestion",
  "no result auto-ingestion",
  "no feedback auto-ingestion",
  "no memory auto-promotion",
  "no recovery auto-trigger",
  "no replay execution",
  "no test execution",
  "no patch apply behavior",
  "no hardening apply behavior"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 454 First Controlled Live Workflow Replay" `
  -ScriptFile "smoke-codexforge-first-controlled-live-workflow-replay.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstControlledLiveWorkflowReplayPanel" `
  -CommandLabel "Go to First Controlled Live Workflow Replay" `
  -Modules @("first-controlled-live-workflow-replay-types.ts","first-controlled-live-workflow-replay-summary.ts","index.ts") `
  -Components @("FirstControlledLiveWorkflowReplayPanel.tsx","index.ts") `
  -Exports @("buildFirstControlledLiveWorkflowReplayStableKey","buildFirstControlledLiveWorkflowReplay","buildFirstControlledLiveWorkflowReplayReviews","buildFirstControlledLiveWorkflowReplayBoundary","buildFirstControlledLiveWorkflowReplayModel","summarizeFirstControlledLiveWorkflowReplay","FIRST_CONTROLLED_LIVE_WORKFLOW_REPLAY_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/controlled-live-workflow-release-candidate","/live-workflow-regression-matrix","/live-workflow-failure-patch-review","/first-controlled-live-workflow-trial")

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
  "no live workflow launch action or replay execution" = "liveWorkflowLaunchAllowedFromUi:\s*true|liveActionExecutionAllowedFromUi:\s*true|replayExecutionAllowedFromUi:\s*true|launchLiveWorkflow\s*\(|executeLiveAction\s*\(|runLiveAction\s*\(|executeReplay\s*\(|rerunWorkflow\s*\("
  "no approval automation auto approval or approval decision persistence" = "approvalAutomationAllowedFromUi:\s*true|autoApprovalAllowedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|autoApprove\s*\(|persistApprovalDecision\s*\("
  "no evidence result feedback ingestion or memory promotion" = "evidenceAutoIngestionAllowedFromUi:\s*true|resultAutoIngestionAllowedFromUi:\s*true|feedbackAutoIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|ingestEvidence\s*\(|ingestResult\s*\(|ingestFeedback\s*\(|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no recovery auto trigger" = "recoveryAutoTriggerAllowedFromUi:\s*true|triggerRecovery\s*\(|autoTriggerRecovery\s*\("
  "no provider local connector or automation calls" = "providerApiCallsAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|callProviderApi\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|callConnectorApi\s*\(|createAutomation\s*\("
  "no test build smoke command shell or git execution" = "testBuildSmokeExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|runCommand\s*\(|runGit\s*\("
  "no patch hardening file output memory or credential storage" = "patchApplyAllowedFromUi:\s*true|hardeningApplyAllowedFromUi:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|outputStorageAllowed:\s*true|credentialStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|applyPatch\s*\(|applyDiff\s*\(|applyHardening\s*\(|writeFile\s*\(|storeOutput\s*\(|localStorage\.setItem|sessionStorage\.setItem"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge First controlled live workflow replay smoke passed."
