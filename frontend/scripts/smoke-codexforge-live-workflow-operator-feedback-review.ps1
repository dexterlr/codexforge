param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\live-workflow-operator-feedback-review"
$route = "src\app\live-workflow-operator-feedback-review"
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
  "Live workflow operator feedback review",
  "Live workflow operator feedback review does not auto-promote memory",
  "Operator feedback requires review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Friction categories"
)

$plainEnglish = @(
  "live workflow feedback identity",
  "Feedback groups",
  "Friction categories",
  "safety feedback checklist",
  "denied feedback actions",
  "memory promotion boundary notes",
  "blocked feedback risks",
  "release candidate route",
  "replay route",
  "next recommended action",
  "advanced feedback details collapsed/secondary",
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
  -PhaseName "Phase 452 Live Workflow Operator Feedback Review" `
  -ScriptFile "smoke-codexforge-live-workflow-operator-feedback-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LiveWorkflowOperatorFeedbackReviewPanel" `
  -CommandLabel "Go to Live Workflow Operator Feedback Review" `
  -Modules @("live-workflow-operator-feedback-review-types.ts","live-workflow-operator-feedback-review-summary.ts","index.ts") `
  -Components @("LiveWorkflowOperatorFeedbackReviewPanel.tsx","index.ts") `
  -Exports @("buildLiveWorkflowOperatorFeedbackReviewStableKey","buildLiveWorkflowOperatorFeedbackReview","buildLiveWorkflowOperatorFeedbackReviewReviews","buildLiveWorkflowOperatorFeedbackReviewBoundary","buildLiveWorkflowOperatorFeedbackReviewModel","summarizeLiveWorkflowOperatorFeedbackReview","LIVE_WORKFLOW_OPERATOR_FEEDBACK_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/live-workflow-result-review-inbox","/controlled-live-workflow-release-candidate","/first-controlled-live-workflow-replay","/first-controlled-live-workflow-trial")

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

Write-Host "[OK] CodexForge Live workflow operator feedback review smoke passed."
