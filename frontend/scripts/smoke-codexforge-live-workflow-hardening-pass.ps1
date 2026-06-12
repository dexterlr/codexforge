param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\live-workflow-hardening-pass"
$route = "src\app\live-workflow-hardening-pass"
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
  "Live workflow hardening pass",
  "Live workflow hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening risks stay blocked",
  "Hardening groups",
  "Safety boundary checklist"
)

$plainEnglish = @(
  "live workflow hardening identity",
  "Hardening groups",
  "Safety boundary checklist",
  "evidence result feedback replay regression status",
  "denied hardening actions",
  "unresolved hardening risks",
  "provider live guard route",
  "local model live guard route",
  "next recommended action",
  "advanced hardening details collapsed/secondary",
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
  -PhaseName "Phase 457 Live Workflow Hardening Pass" `
  -ScriptFile "smoke-codexforge-live-workflow-hardening-pass.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LiveWorkflowHardeningPassPanel" `
  -CommandLabel "Go to Live Workflow Hardening Pass" `
  -Modules @("live-workflow-hardening-pass-types.ts","live-workflow-hardening-pass-summary.ts","index.ts") `
  -Components @("LiveWorkflowHardeningPassPanel.tsx","index.ts") `
  -Exports @("buildLiveWorkflowHardeningPassStableKey","buildLiveWorkflowHardeningPass","buildLiveWorkflowHardeningPassReviews","buildLiveWorkflowHardeningPassBoundary","buildLiveWorkflowHardeningPassModel","summarizeLiveWorkflowHardeningPass","LIVE_WORKFLOW_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/live-workflow-regression-matrix","/live-workflow-failure-patch-review","/provider-live-test-gate","/local-model-runtime-boundary-review")

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

Write-Host "[OK] CodexForge Live workflow hardening pass smoke passed."
