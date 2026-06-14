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
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string[]]$ProtectedRoutes
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") `
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
  -PlainEnglish $PlainEnglish `
  -RouteHref $RouteHref `
  -ProtectedRoutes $ProtectedRoutes

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

$shared = "src\lib\codexforge\daily-beta-1-release-review-kit"
$sourceParts = @()
foreach ($scanRoot in @($Domain, $Route, $shared)) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$packageSource = Get-Content -Raw "package.json"

$extendedBoundaryMarkers = @(
  "no boundary probe execution",
  "no controlled trial execution",
  "no controlled trial data persistence",
  "no workflow execution",
  "no trial launch",
  "no Daily Beta 1 launch",
  "no rollout execution",
  "no go-live behavior",
  "no provider API calls",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no connector data persistence",
  "no connector data storage",
  "no automation execution",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no conditional watch creation",
  "no schedule creation",
  "no watch creation",
  "no polling loop creation",
  "no polling loops from UI",
  "no background job creation",
  "no notification sending",
  "no approval automation",
  "no approval decision persistence",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no patch apply behavior",
  "no hardening apply behavior",
  "no recovery trigger",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no export/write behavior",
  "no file deletion",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no output storage",
  "no automation data storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
  "no obvious duplicate React key patterns"
)

foreach ($needle in $extendedBoundaryMarkers) {
  Assert-Contains $source $needle "extended boundary marker $needle"
}

$deterministicSource = $source
foreach ($marker in @($PhaseMarkers + $PlainEnglish + $extendedBoundaryMarkers + @(
  "no Date.now for deterministic layout/ids",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI"
))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no controlled trial boundary probe recovery or hardening execution" = "boundaryProbeExecutionAllowedFromUi:\s*true|controlledTrialExecutionAllowedFromUi:\s*true|resultStorageAllowedFromUi:\s*true|resultAcceptanceAutomationAllowedFromUi:\s*true|recoveryTriggerAllowedFromUi:\s*true|hardeningApplyAllowedFromUi:\s*true|backendCallsAllowedFromUi:\s*true|liveExecutionProofClaimedByUi:\s*true|executeBoundaryProbe\s*\(|runBoundaryProbe\s*\(|callBackend\s*\(|executeControlledTrial\s*\(|storeTrialResult\s*\(|acceptTrialResult\s*\(|triggerRecovery\s*\(|applyHardening\s*\("
  "no action workflow approval signoff or launch execution" = "actionsExecutedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|dailyBetaOneLaunchAllowedFromUi:\s*true|rolloutExecutionAllowedFromUi:\s*true|goLiveAllowedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runAction\s*\(|runWorkflow\s*\(|executeWorkflow\s*\(|launchDailyBetaOne\s*\(|goLive\s*\("
  "no provider local connector bridge or prompt behavior" = "providerApiCallsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|providerCredentialStorageAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localModelOutputStorageAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorDataFetchAllowedFromUi:\s*true|connectorDataStorageAllowedFromUi:\s*true|callProviderApi\s*\(|routeProviderTraffic\s*\(|sendPrompt\s*\(|storeProviderOutput\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|callConnectorApi\s*\(|connectAccount\s*\(|fetchConnectorData\s*\(|storeConnectorData\s*\(|fetch\s*\(|XMLHttpRequest|axios|api\.github|octokit"
  "no automation schedule reminder watch polling notification behavior" = "automationExecutionAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|conditionalWatchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|runAutomation\s*\(|createAutomation\s*\(|persistAutomationRule\s*\(|createReminder\s*\(|scheduleTask\s*\(|createSchedule\s*\(|createWatch\s*\(|setInterval\s*\(|setTimeout\s*\(|createBackgroundJob\s*\(|sendNotification\s*\("
  "no shell git test build smoke command or project browsing behavior" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|testBuildSmokeExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|runCommand\s*\(|runGit\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|scanArbitraryProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\(|child_process|execSync|spawn\s*\("
  "no file output evidence memory or Brain mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|memoryMutationAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|deleteFile\s*\(|storeOutput\s*\(|ingestEvidence\s*\(|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin tool agent extension or MCP execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|createMcpClient\s*\(|callMcpTool\s*\("
  "no browser storage credential token endpoint output exposure" = "localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|credentialStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|accessToken\s*[:=]|refreshToken\s*[:=]|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9_-]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}"
  "no package install vendoring or duplicate React key patterns" = "packageInstallAllowedFromUi:\s*true|routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)|key=\{label\}|key=\{summary\}|key=\{item\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $packageSource '"ruflo"|"@ruflo/|"odysseus"|"@odysseus/|"@modelcontextprotocol/' "no Ruflo/Odysseus/MCP dependency references in package manifest"

Write-Host "[PASS] controlled trial and execution boundary safety helper checks passed."
