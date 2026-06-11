param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\openai-compatible-provider-trial-review"
$route = "src\app\openai-compatible-provider-trial-review"
$newRoutes = @(
  "/openai-compatible-provider-trial-review",
  "/remote-provider-credential-boundary-review",
  "/provider-failover-policy-review",
  "/multi-provider-routing-release-candidate"
)

$phaseMarkers = @(
  "OpenAI-compatible provider trial review",
  "OpenAI-compatible provider trial does not send provider traffic",
  "Provider trial requires explicit operator approval",
  "Credentials and endpoints stay private",
  "Provider lane groups",
  "Endpoint compatibility notes"
)

$remoteProviderSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no provider connection behavior",
  "no provider API calls",
  "no OpenAI-compatible provider calls",
  "no provider live connection tests",
  "no provider traffic",
  "no provider traffic routing",
  "no provider switching",
  "no provider retry calls",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/credential data sending without approval",
  "no prompt/file/project/connector/provider/model data sending without approval",
  "no credential storage",
  "no provider key storage",
  "no connector token storage",
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
  "no example real key/token values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "advanced provider trial details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 414 OpenAI-Compatible Provider Trial Review" `
  -ScriptFile "smoke-codexforge-openai-compatible-provider-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "OpenAICompatibleProviderTrialReviewPanel" `
  -CommandLabel "Go to OpenAI-Compatible Provider Trial Review" `
  -Modules @("openai-compatible-provider-trial-review-types.ts","openai-compatible-provider-trial-review-summary.ts","index.ts") `
  -Components @("OpenAICompatibleProviderTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildOpenAICompatibleProviderTrialReviewStableKey","buildOpenAICompatibleProviderTrialReview","buildOpenAICompatibleProviderTrialReviews","buildOpenAICompatibleProviderTrialReviewBoundary","buildOpenAICompatibleProviderTrialReviewModel","summarizeOpenAICompatibleProviderTrialReview","OPENAI_COMPATIBLE_PROVIDER_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("OpenAI-compatible provider trial identity","model capability preview","approval gate checklist","denied provider actions","blocked trial risks","credential boundary route","failover policy route","next recommended action") + $remoteProviderSafetyMarkers) `
  -ExtraRoutes @("/remote-provider-credential-boundary-review","/provider-failover-policy-review","/controlled-provider-integration-plan","/local-model-provider-trial-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $remoteProviderSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action execution workflow execution or approval automation" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runWorkflow\s*\(|executeWorkflow\s*\("
  "no provider connection traffic API OpenAI-compatible calls or live tests" = "providerApiCallsAllowedFromUi:\s*true|openAICompatibleProviderApiCallsAllowedFromUi:\s*true|providerConnectionAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|callProviderApi\s*\(|callOpenAICompatibleProvider\s*\(|connectProvider\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendProviderTraffic\s*\("
  "no provider switching retry calls or local model calls" = "providerSwitchingAllowedFromUi:\s*true|providerRetryCallsAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|switchProvider\s*\(|retryProviderCall\s*\(|callLocalModel\s*\(|runLocalModel\s*\("
  "no credential token endpoint or browser storage" = "credentialStorageAllowed:\s*true|providerKeyStorageAllowedFromUi:\s*true|providerTokenStorageAllowedFromUi:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|storeCredential\s*\(|storeProviderKey\s*\(|storeProviderToken\s*\(|storeEndpoint\s*\(|localStorage\.setItem|sessionStorage\.setItem"
  "no local bridge connector web search or GitHub API calls" = "localBridgeEndpointCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callLocalBridge\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|fetch\s*\(|XMLHttpRequest|axios"
  "no prompt file project connector provider model or credential data sends" = "promptFileProjectConnectorProviderModelCredentialDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendProviderData\s*\(|sendModelData\s*\(|sendCredentialData\s*\("
  "no arbitrary project scanning local file browsing path crawling or file open" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\("
  "no git shell command test build or smoke execution" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\("
  "no file mutation write export patch deletion or package install" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|packageInstallAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\(|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add"
  "no memory RAG Brain graph appendEvent or saveBrainGraph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no reminder schedule automation background notification or polling" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\("
  "no plugin tool agent extension or MCP execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no env secret display or example real keys" = "processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}"
  "no route coverage removal vendoring or duplicate keys" = "routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|vendor[/\\](ruflo|odysseus)|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge OpenAI-Compatible Provider Trial Review smoke passed."
