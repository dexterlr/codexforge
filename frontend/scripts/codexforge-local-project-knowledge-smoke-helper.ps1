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
  [string[]]$ExtraRoutes = @()
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

$localProjectSafetyMarkers = @(
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution",
  "no command execution",
  "no test execution from UI",
  "no file mutation",
  "no file write",
  "no runbook export/write behavior",
  "no patch apply behavior",
  "no file deletion",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no prompt/file/project data sending without approval",
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
  "no localStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName $PhaseName `
  -ScriptFile $ScriptFile `
  -Domain $Domain `
  -Route $Route `
  -MainPanel $MainPanel `
  -CommandLabel $CommandLabel `
  -Modules $Modules `
  -Components $Components `
  -Exports $Exports `
  -PlainEnglish @($PhaseMarkers + $PlainEnglish + $localProjectSafetyMarkers) `
  -ExtraRoutes $ExtraRoutes

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$packageSource = Get-Content -Raw "package.json"
$deterministicSource = $source

foreach ($marker in @($PhaseMarkers + $PlainEnglish + $localProjectSafetyMarkers + @(
  "no Date.now for deterministic layout/ids",
  "no obvious duplicate React key patterns"
))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

foreach ($needle in $PhaseMarkers) {
  Assert-Contains $source $needle "phase marker $needle"
}

foreach ($needle in $localProjectSafetyMarkers) {
  Assert-Contains $source $needle "local project safety marker $needle"
}

Assert-NotMatches $packageSource '"ruflo"|"@ruflo/|"odysseus"|"@odysseus/|"mcp"|"@modelcontextprotocol/' "no Ruflo/Odysseus/MCP dependency references in package manifest"

$blockedPatterns = @{
  "no arbitrary project scanning" = "arbitraryProjectScanningAllowed:\s*true|localProjectScanRunsFromPage:\s*true|scanArbitraryProject\s*\(|scanLocalProject\s*\(|startProjectScan\s*\("
  "no arbitrary local file browsing" = "arbitraryLocalFileBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\(|input\s+type=.*file"
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\(|walkPath\s*\(|glob\s*\("
  "no arbitrary file read/open from UI" = "arbitraryFileReadOpenAllowed:\s*true|readFile\s*\(|openFile\s*\(|FileReader"
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\(|gitCommand\s*\(|createCommit\s*\(|git\s+(log|show|status|diff|commit|push)"
  "no shell or command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\(|executeTests\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no runbook export/write behavior" = "runbookExportAllowedFromUi:\s*true|runbookFileWriteAllowedFromUi:\s*true|runbookFileWrittenFromPage:\s*true|exportRunbook\s*\(|writeRunbook\s*\(|downloadFile\s*\(|exportFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|callProviderApi\s*\("
  "no connector API calls" = "connectorApiCallsAllowedFromUi:\s*true|callConnectorApi\s*\(|readConnectorData\s*\(|syncConnectorData\s*\("
  "no web/search API calls" = "webSearchProviderCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callSearchProvider\s*\(|sendSearchRequest\s*\("
  "no prompt/file/project data sending without approval" = "promptFileProjectDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\("
  "no memory/RAG ingestion" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|timelineAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no Brain graph mutation" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no reminder creation" = "reminderCreationAllowedFromUi:\s*true|createReminder\s*\(|setReminder\s*\("
  "no task scheduling" = "taskSchedulingAllowedFromUi:\s*true|scheduleTask\s*\(|createScheduledTask\s*\("
  "no automation creation" = "automationCreationAllowedFromUi:\s*true|createAutomation\s*\(|runAutomation\s*\("
  "no background job creation" = "backgroundJobCreationAllowedFromUi:\s*true|createBackgroundJob\s*\(|startBackgroundJob\s*\("
  "no notification sending" = "notificationSendingAllowedFromUi:\s*true|sendNotification\s*\(|new\s+Notification\s*\("
  "no polling loops from UI" = "pollingLoopAllowedFromUi:\s*true|setInterval\s*\(|setTimeout\s*\(|startPolling\s*\("
  "no plugin execution" = "pluginExecutionAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\("
  "no tool execution" = "toolExecutionAllowedFromUi:\s*true|executeTool\s*\(|runTool\s*\("
  "no agent execution" = "agentExecutionAllowedFromUi:\s*true|executeAgent\s*\(|runAgent\s*\("
  "no extension runtime executor" = "extensionRuntimeExecutorCreated:\s*true|createExtensionRuntimeExecutor\s*\("
  "no MCP runtime" = "mcpRuntimeCreated:\s*true|createMcpServer\s*\(|createMcpClient\s*\("
  "no MCP tool calls" = "mcpToolCallsAllowedFromUi:\s*true|callMcpTool\s*\(|executeMcpTool\s*\("
  "no localStorage API key storage" = "localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env"
  "no API keys or secrets displayed" = "secretsDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|apiKeysDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no Ruflo/Odysseus vendoring" = "thirdPartyCodeVendoredOrCopied:\s*true|vendor[/\\](ruflo|odysseus)|third_party[/\\](ruflo|odysseus)|from\s+[`"'](?:ruflo|odysseus|@ruflo/|@odysseus/)|require\s*\(\s*[`"'](?:ruflo|odysseus|@ruflo/|@odysseus/)"
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
  "no obvious duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

$safePathSource = (
  Get-Content -Raw "src\lib\codexforge\server-safe-paths\server-project-path.ts"
) + "`n" + (
  Get-Content -Raw "src\lib\codexforge\server-safe-paths\bounded-workspace-path.ts"
) + "`n" + (
  Get-Content -Raw "src\app\api\codexforge\project\snapshot\route.ts"
)

foreach ($marker in @("import `"server-only`";","resolveCodexForgeProjectPath","isAbsolutePathInsideBase","Path traversal guard")) {
  Assert-Contains $safePathSource $marker "server-only path boundary marker $marker"
}
