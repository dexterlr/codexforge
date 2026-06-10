param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\foundation-beta-candidate"
$route = "src\app\foundation-beta-candidate"
$protectedRoutes = @(
  "/dashboard-density-navigation-polish",
  "/cross-loop-search-review",
  "/local-first-privacy-audit",
  "/secrets-token-storage-regression-sweep",
  "/full-smoke-suite-stability-pass",
  "/foundation-beta-candidate",
  "/beta-trial-intake-review",
  "/beta-feedback-inbox",
  "/review-inbox",
  "/codexforge-foundation-release-candidate"
)

$phaseMarkers = @(
  "Foundation beta candidate",
  "Foundation beta candidate remains review-only",
  "Beta does not publish or invite users automatically",
  "Beta approval requires explicit operator sign-off",
  "Foundation readiness summary",
  "Release recommendation"
)

$betaReadinessSafetyMarkers = @(
  "review-only",
  "approval required",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no full smoke suite execution from UI",
  "no release/publish/invite behavior",
  "no invite sending",
  "no participant data collection",
  "no external feedback fetching",
  "no feedback ingestion automation",
  "no issue creation automation",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local tool launch behavior",
  "no prompt/file/project/connector/feedback data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no command execution",
  "no file mutation",
  "no file write",
  "no file export/write behavior",
  "no export/write behavior",
  "no patch apply behavior",
  "no file deletion",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no background job creation",
  "no notification sending",
  "no polling loops from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 383 Foundation Beta Candidate" `
  -ScriptFile "smoke-codexforge-foundation-beta-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FoundationBetaCandidatePanel" `
  -CommandLabel "Go to Foundation Beta Candidate" `
  -Modules @("foundation-beta-candidate-types.ts","foundation-beta-candidate-summary.ts","index.ts") `
  -Components @("FoundationBetaCandidatePanel.tsx","index.ts") `
  -Exports @("buildFoundationBetaCandidateStableKey","buildFoundationBetaCandidate","buildFoundationBetaCandidates","buildFoundationBetaCandidateBoundary","buildFoundationBetaCandidateModel","summarizeFoundationBetaCandidate","FOUNDATION_BETA_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Beta candidate identity","Safety readiness summary","Smoke stability summary","Operator cockpit readiness","Beta blockers","Beta trial intake route","Feedback inbox route","advanced beta candidate details collapsed/secondary") + $betaReadinessSafetyMarkers) `
  -ExtraRoutes @("/full-smoke-suite-stability-pass","/beta-trial-intake-review","/beta-feedback-inbox","/codexforge-foundation-release-candidate")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $betaReadinessSafetyMarkers + @("no Date.now for deterministic layout/ids","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action execution or approval automation" = "actionsApprovedFromUi:\s*true|actionsExecutedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runAction\s*\("
  "no workflow execution" = "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\("
  "no test build smoke or full smoke execution" = "testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|fullSmokeSuiteExecutionFromUiAllowed:\s*true|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|runFullSmokeSuite\s*\("
  "no release publish invite or participant collection" = "releasePublishAllowedFromUi:\s*true|inviteSendingAllowedFromUi:\s*true|participantDataCollectionAllowedFromUi:\s*true|publishRelease\s*\(|publishBeta\s*\(|sendInvite\s*\(|collectParticipantData\s*\("
  "no provider connector web local bridge or local tool calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\(|callConnectorApi\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\("
  "no external feedback ingestion or issue creation" = "externalFeedbackFetchAllowedFromUi:\s*true|feedbackIngestionAllowedFromUi:\s*true|issueCreationAllowedFromUi:\s*true|fetchFeedback\s*\(|ingestFeedback\s*\(|createIssue\s*\("
  "no prompt file project connector feedback data sending" = "promptFileProjectConnectorFeedbackDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendFeedbackData\s*\("
  "no arbitrary project scanning file browsing or path crawling" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\("
  "no git shell or command execution" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|runGit\s*\(|runCommand\s*\(|child_process|execSync|spawn\s*\("
  "no file mutation write export patch or deletion" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\("
  "no memory or Brain graph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\(|mutateBrainGraph\s*\(|promoteMemory\s*\("
  "no reminder schedule automation background notification or polling" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\("
  "no plugin tool agent extension or MCP runtime execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no token API key secret or env exposure" = "tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no route coverage removal vendoring or package install" = "routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|packageInstallAllowedFromUi:\s*true|removeRoute\s*\(|deleteRoute\s*\(|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Foundation Beta Candidate smoke passed."
