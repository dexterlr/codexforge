param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-model-failover-review"
$route = "src\app\local-model-failover-review"
$newRoutes = @(
  "/local-model-runtime-boundary-review",
  "/local-model-output-review-inbox",
  "/local-model-failover-review",
  "/local-model-integration-release-candidate"
)

$phaseMarkers = @(
  "Local model failover review",
  "Local model failover review does not switch runtimes",
  "Local model failover requires explicit operator approval",
  "Unsafe fallback shortcuts stay blocked",
  "Failure categories",
  "Fallback policy preview"
)

$localModelSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no local model calls",
  "no local model live connection tests",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local endpoint probes",
  "no local tool launching",
  "no local model traffic routing",
  "no runtime switching",
  "no model retry calls",
  "no prompt sending to models",
  "no prompt sending to providers",
  "no model output persistence",
  "no model output ingestion",
  "no output storage",
  "no provider connection behavior",
  "no provider API calls",
  "no OpenAI-compatible provider calls",
  "no provider live connection tests",
  "no provider traffic",
  "no provider traffic routing",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/endpoint/output data sending without approval",
  "no credential storage",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no command execution",
  "no test/build/smoke execution from UI",
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
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "advanced failover details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 424 Local Model Failover Review" `
  -ScriptFile "smoke-codexforge-local-model-failover-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalModelFailoverReviewPanel" `
  -CommandLabel "Go to Local Model Failover Review" `
  -Modules @("local-model-failover-review-types.ts","local-model-failover-review-summary.ts","index.ts") `
  -Components @("LocalModelFailoverReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalModelFailoverReviewStableKey","buildLocalModelFailoverReview","buildLocalModelFailoverReviews","buildLocalModelFailoverReviewBoundary","buildLocalModelFailoverReviewModel","summarizeLocalModelFailoverReview","LOCAL_MODEL_FAILOVER_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("local model failover identity","Retry/backoff review","Denied failover shortcuts","Validation evidence requirements","Blocked failover risks","Integration candidate route","Output inbox route","Next recommended action") + $localModelSafetyMarkers) `
  -ExtraRoutes @("/local-model-integration-release-candidate","/local-model-output-review-inbox","/local-model-runtime-boundary-review","/provider-failover-policy-review")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $localModelSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedUnsafePattern = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localEndpointProbeExecutionAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|localModelLiveConnectionTestsAllowedFromUi:\s*true|localModelTrafficRoutingAllowedFromUi:\s*true|runtimeSwitchingAllowedFromUi:\s*true|modelRetryCallsAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|modelOutputStorageAllowedFromUi:\s*true|modelOutputIngestionAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|openAICompatibleProviderApiCallsAllowedFromUi:\s*true|providerConnectionAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|promptFileProjectConnectorProviderModelEndpointOutputDataAutoSendAllowed:\s*true|credentialStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|processEnvDisplayAllowed:\s*true|secretsDisplayedAllowed:\s*true|packageInstallAllowedFromUi:\s*true|routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|callLocalModel\s*\(|runLocalModel\s*\(|callLocalBridge\s*\(|probeLocalEndpoint\s*\(|testLocalModelConnection\s*\(|launchLocalTool\s*\(|routeLocalModelTraffic\s*\(|switchRuntime\s*\(|retryModelCall\s*\(|sendPrompt\s*\(|storeModelOutput\s*\(|persistModelOutput\s*\(|ingestModelOutput\s*\(|callProviderApi\s*\(|callOpenAICompatibleProvider\s*\(|connectProvider\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|fetch\s*\(|XMLHttpRequest|axios|localStorage\.setItem|sessionStorage\.setItem|scanLocalProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\(|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\(|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\(|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\(|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|callMcpTool\s*\(|process\.env\.[A-Za-z0-9_]+|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add"
if ($source -match $blockedUnsafePattern) {
  throw "[FAIL] Local model failover review has unsafe execution, routing, retry, storage, or duplicate-key behavior"
}
if ($deterministicSource -match "Math\.random\s*\(|Date\.now\s*\(") {
  throw "[FAIL] Local model failover review has deterministic API misuse"
}
Write-Host "[PASS] no unsafe runtime switching retry routing execution or deterministic behavior"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Local Model Failover Review smoke passed."
