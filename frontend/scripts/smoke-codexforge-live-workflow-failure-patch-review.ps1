param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\live-workflow-failure-patch-review"
$route = "src\app\live-workflow-failure-patch-review"
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
  "Live workflow failure patch review",
  "Live workflow failure patch review does not apply patches",
  "Candidate patches require explicit operator approval",
  "Unsafe patch shortcuts stay blocked",
  "Failure groups",
  "Candidate patch categories"
)

$plainEnglish = @(
  "live workflow failure patch identity",
  "Failure groups",
  "Candidate patch categories",
  "validation requirements",
  "denied patch actions",
  "rollback checklist",
  "blocked patch risks",
  "hardening pass route",
  "release candidate route",
  "next recommended action",
  "advanced patch details collapsed/secondary",
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
  -PhaseName "Phase 456 Live Workflow Failure Patch Review" `
  -ScriptFile "smoke-codexforge-live-workflow-failure-patch-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LiveWorkflowFailurePatchReviewPanel" `
  -CommandLabel "Go to Live Workflow Failure Patch Review" `
  -Modules @("live-workflow-failure-patch-review-types.ts","live-workflow-failure-patch-review-summary.ts","index.ts") `
  -Components @("LiveWorkflowFailurePatchReviewPanel.tsx","index.ts") `
  -Exports @("buildLiveWorkflowFailurePatchReviewStableKey","buildLiveWorkflowFailurePatchReview","buildLiveWorkflowFailurePatchReviewReviews","buildLiveWorkflowFailurePatchReviewBoundary","buildLiveWorkflowFailurePatchReviewModel","summarizeLiveWorkflowFailurePatchReview","LIVE_WORKFLOW_FAILURE_PATCH_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/live-workflow-regression-matrix","/live-workflow-hardening-pass","/controlled-live-workflow-release-candidate","/first-controlled-live-workflow-replay")

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

Write-Host "[OK] CodexForge Live workflow failure patch review smoke passed."
