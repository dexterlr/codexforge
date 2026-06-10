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

$dailyUseSafetyMarkers = @(
  "review-only",
  "approval required",
  "daily onboarding",
  "operator preferences",
  "workspace personalization",
  "saved views",
  "no settings mutation",
  "no preference persistence",
  "no personalization persistence",
  "no saved view persistence",
  "no localStorage writes",
  "no sessionStorage writes",
  "no action execution from UI",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local tool launch behavior",
  "no prompt/file/project/connector/preference data sending without approval",
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
  -PlainEnglish @($PlainEnglish + $dailyUseSafetyMarkers) `
  -ExtraRoutes $ExtraRoutes

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($PhaseMarkers + $PlainEnglish + $dailyUseSafetyMarkers + @(
  "no Date.now for deterministic layout/ids",
  "no obvious duplicate React key patterns"
))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

foreach ($needle in @($PhaseMarkers + $dailyUseSafetyMarkers)) {
  Assert-Contains $source $needle "daily-use review marker $needle"
}

$blockedPatterns = @{
  "no settings preference personalization or view persistence" = "settingsMutationAllowedFromUi:\s*true|preferencePersistenceAllowedFromUi:\s*true|personalizationPersistenceAllowedFromUi:\s*true|savedViewPersistenceAllowedFromUi:\s*true|localStorageWritesAllowedFromUi:\s*true|sessionStorageWritesAllowedFromUi:\s*true|savePreferences\s*\(|persistPreferences\s*\(|persistLayout\s*\(|saveLayout\s*\(|saveView\s*\(|saveReviewView\s*\(|writeStorage\s*\(|localStorage\.|sessionStorage\."
  "no action execution or approval automation" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runAction\s*\("
  "no workflow execution" = "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\("
  "no provider connector web GitHub local bridge or local tool calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|api\.github|octokit|githubGraphql|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\("
  "no prompt file project connector preference data sending" = "promptFileProjectConnectorPreferenceDataAutoSendAllowed:\s*true|promptFileProjectConnectorDataAutoSendAllowed:\s*true|promptFileProjectDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendPreferenceData\s*\("
  "no arbitrary project scanning file browsing or path crawling" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|scanArbitraryProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|walkPath\s*\(|readFile\s*\(|openFile\s*\(|FileReader|showOpenFilePicker"
  "no git shell command test build or smoke execution" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runGit\s*\(|runCommand\s*\(|child_process|execSync|spawn\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\("
  "no file mutation write export patch or deletion" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no memory or Brain graph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\(|mutateBrainGraph\s*\(|promoteMemory\s*\(|ingestMemory\s*\(|ingestRag\s*\("
  "no reminder schedule automation background notification or polling" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|createReminder\s*\(|setReminder\s*\(|scheduleTask\s*\(|createScheduledTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|new\s+Notification\s*\(|setInterval\s*\(|setTimeout\s*\(|startPolling\s*\("
  "no plugin tool agent extension or MCP runtime execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\(|executeTool\s*\(|runTool\s*\(|executeAgent\s*\(|runAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|createMcpClient\s*\(|callMcpTool\s*\(|executeMcpTool\s*\("
  "no token API key secret or env exposure" = "tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|secretsDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|apiKeysDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no route coverage removal vendoring or package install" = "routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|packageInstallAllowedFromUi:\s*true|removeRoute\s*\(|deleteRoute\s*\(|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)|third_party[/\\](ruflo|odysseus)"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
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
