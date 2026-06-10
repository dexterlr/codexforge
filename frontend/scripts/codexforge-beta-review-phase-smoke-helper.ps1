param(
  [Parameter(Mandatory = $true)][string]$PhaseName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$MainPanel,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string[]]$Modules,
  [Parameter(Mandatory = $true)][string[]]$Components,
  [Parameter(Mandatory = $true)][string[]]$Exports,
  [Parameter(Mandatory = $true)][string[]]$PhaseMarkers,
  [Parameter(Mandatory = $true)][string[]]$PlainEnglish,
  [string[]]$ExtraRoutes = @(),
  [string[]]$ProtectedRoutes = @()
)

$ErrorActionPreference = "Stop"

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$betaReviewSafetyMarkers = @(
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
  "no issue creation automation",
  "no ticket creation automation",
  "no GitHub API calls from UI",
  "no fix application",
  "no patch apply behavior",
  "no commit creation from UI",
  "no regression replay execution",
  "no release notes publishing",
  "no file export/write behavior",
  "no runbook export/write behavior",
  "no external feedback fetching",
  "no feedback ingestion automation",
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
  -PhaseName $PhaseName `
  -ScriptFile $ScriptFile `
  -Domain $Domain `
  -Route $Route `
  -MainPanel $MainPanel `
  -CommandLabel $CommandLabel `
  -Modules $Modules `
  -Components $Components `
  -Exports $Exports `
  -PhaseMarkers $PhaseMarkers `
  -PlainEnglish @($PlainEnglish + $betaReviewSafetyMarkers) `
  -ExtraRoutes $ExtraRoutes

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($PhaseMarkers + $PlainEnglish + $betaReviewSafetyMarkers + @("no Date.now for deterministic layout/ids","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

foreach ($needle in @($PhaseMarkers + $betaReviewSafetyMarkers)) {
  Assert-Contains $source $needle "beta review marker $needle"
}

$blockedPatterns = @{
  "no action execution or approval automation" = "actionsApprovedFromUi:\s*true|actionsExecutedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runAction\s*\("
  "no workflow execution" = "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\("
  "no issue or ticket creation automation" = "issueCreationAllowedFromUi:\s*true|ticketCreationAllowedFromUi:\s*true|createIssue\s*\(|openIssue\s*\(|createTicket\s*\(|openTicket\s*\("
  "no GitHub API calls from UI" = "githubApiCallsAllowedFromUi:\s*true|api\.github|octokit|githubGraphql|callGithubApi\s*\("
  "no fix application patch apply or file mutation" = "fixApplicationAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|applyFix\s*\("
  "no commit creation from UI" = "commitCreationAllowedFromUi:\s*true|createCommit\s*\(|git\s+commit"
  "no regression replay execution" = "regressionReplayExecutionAllowedFromUi:\s*true|runRegressionReplay\s*\(|executeRegressionReplay\s*\(|replayRegressions\s*\("
  "no test build smoke or full smoke execution" = "testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|fullSmokeSuiteExecutionFromUiAllowed:\s*true|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|runFullSmokeSuite\s*\("
  "no release notes publishing export or file writes" = "releaseNotesPublishAllowedFromUi:\s*true|releaseNotesExportAllowedFromUi:\s*true|releasePublishAllowedFromUi:\s*true|publishReleaseNotes\s*\(|publishRelease\s*\(|exportReleaseNotes\s*\(|downloadFile\s*\(|exportFile\s*\(|writeFile\s*\("
  "no provider connector web local bridge or local tool calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\("
  "no external feedback fetching or ingestion" = "externalFeedbackFetchAllowedFromUi:\s*true|feedbackIngestionAllowedFromUi:\s*true|fetchFeedback\s*\(|ingestFeedback\s*\("
  "no prompt file project connector feedback data sending" = "promptFileProjectConnectorFeedbackDataAutoSendAllowed:\s*true|promptFileProjectConnectorDataAutoSendAllowed:\s*true|promptFileProjectDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendFeedbackData\s*\("
  "no arbitrary project scanning file browsing or path crawling" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\("
  "no git shell or command execution" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|runGit\s*\(|runCommand\s*\(|child_process|execSync|spawn\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
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

if ($ProtectedRoutes.Count -gt 0) {
  & (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
    -ExpectedRoutes $ProtectedRoutes
}

Write-Host "[OK] $PhaseName smoke passed."
