param(
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string[]]$PhaseMarkers,
  [string[]]$AdditionalMarkers = @()
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

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

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$packageSource = Get-Content -Raw "package.json"

$liveIntegrationSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no live workflow launch",
  "no go-live action",
  "no live provider/local/connector/automation traffic routing",
  "no approval automation",
  "no auto-approval",
  "no approval is granted",
  "no action approval from UI",
  "no approval decision persistence",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no connector API calls",
  "no connector account connection",
  "no connector data fetch",
  "no connector data persistence",
  "no connector data storage",
  "no automation execution",
  "no automation creation",
  "no automation rule persistence",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no scheduled task creation",
  "no conditional watch creation",
  "no watch creation",
  "no background job creation",
  "no polling loop creation",
  "no polling loops from UI",
  "no background jobs",
  "no notification sending",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no patch apply behavior",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval",
  "no prompt/file/project/connector/provider/model/output data sending without approval",
  "no prompt/file/project/connector/provider/model data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no prompt/file/project data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no command execution",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no file mutation",
  "no file write",
  "no file export/write behavior",
  "no export/write behavior",
  "no runbook export/write behavior",
  "no file deletion",
  "no evidence ingestion automation",
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
  "no localStorage writes",
  "no sessionStorage writes",
  "no localStorage/sessionStorage token storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "plain English",
  "no duplicate route chip cloud",
  "hero title does not vertically wrap",
  "no giant raw JSON above fold",
  "advanced details collapsed/secondary",
  "no unsafe execution buttons",
  "no automatic local action",
  "no raw fetch from arbitrary UI",
  "no real video generation",
  "no image generation",
  "no upscale execution",
  "no frame interpolation execution",
  "no ComfyUI workflow run",
  "no job queue execution",
  "no hardware/system command",
  "no prompt payload sent to providers",
  "no cloud provider API calls",
  "no password storage",
  "no API key localStorage",
  "no raw secret display",
  "no process.env value printed in UI",
  "no hardcoded API keys",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct graph mutation from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text",
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no d3-force",
  "no mojibake",
  "no obvious duplicate React key patterns"
)

foreach ($needle in @($PhaseMarkers + $AdditionalMarkers + $liveIntegrationSafetyMarkers)) {
  Assert-Contains $source $needle "live integration marker $needle"
}

Assert-NotMatches $packageSource '"ruflo"|"@ruflo/|"odysseus"|"@odysseus/|"mcp"|"@modelcontextprotocol/' "no Ruflo/Odysseus/MCP dependency references in package manifest"

$deterministicSource = $source
foreach ($marker in @($PhaseMarkers + $AdditionalMarkers + $liveIntegrationSafetyMarkers)) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action workflow approval execution" = "actionsExecutedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|liveWorkflowLaunchAllowedFromUi:\s*true|liveTrafficRoutingAllowedFromUi:\s*true|goLiveAllowedFromUi:\s*true|executeAction\s*\(|approveAction\s*\(|autoApprove\s*\(|approveAll\s*\(|runWorkflow\s*\(|executeWorkflow\s*\(|runEndToEndWorkflow\s*\(|launchLiveWorkflow\s*\(|goLive\s*\("
  "no approval persistence or release publishing" = "approvalDecisionPersistenceAllowedFromUi:\s*true|releasePublishingAllowedFromUi:\s*true|persistApprovalDecision\s*\(|storeApprovalDecision\s*\(|publishRelease\s*\(|publishLiveRelease\s*\("
  "no provider local connector calls or live traffic" = "providerApiCallsAllowedFromUi:\s*true|providerLiveConnectionTestsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorDataFetchAllowedFromUi:\s*true|connectorDataStorageAllowedFromUi:\s*true|callProviderApi\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(|storeProviderOutput\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\(|connectAccount\s*\(|callConnectorApi\s*\(|fetchConnectorData\s*\(|storeConnectorData\s*\(|fetch\s*\(|XMLHttpRequest|axios|callGithubApi\s*\("
  "no automation schedule reminder watch polling notification behavior" = "automationExecutionAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|automationRulePersistenceAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|conditionalWatchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|runAutomation\s*\(|createAutomation\s*\(|persistAutomationRule\s*\(|storeAutomationRule\s*\(|createReminder\s*\(|scheduleTask\s*\(|createSchedule\s*\(|createWatch\s*\(|createBackgroundJob\s*\(|setInterval\s*\(|setTimeout\s*\(|sendNotification\s*\("
  "no creative research coding search or patch execution" = "creativeAssetGenerationAllowedFromUi:\s*true|researchExecutionAllowedFromUi:\s*true|codingWorkflowExecutionAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|webSearchApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|generateImage\s*\(|generateVideo\s*\(|runResearch\s*\(|executeCodingWorkflow\s*\(|applyPatch\s*\(|applyDiff\s*\(|callSearchProvider\s*\(|sendSearchRequest\s*\("
  "no local project file git shell test build smoke behavior" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testBuildSmokeExecutionAllowedFromUi:\s*true|scanArbitraryProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\(|autoOpenLocalFile\s*\(|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\("
  "no file output evidence memory Brain behavior" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|evidenceAutoIngestionAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|deleteFile\s*\(|storeOutput\s*\(|ingestEvidence\s*\(|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin tool agent extension or MCP behavior" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|createMcpClient\s*\(|callMcpTool\s*\("
  "no credential endpoint token output connector automation storage" = "localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|credentialStorageAllowed:\s*true|connectorDataStorageAllowed:\s*true|automationDataStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|accessToken\s*[:=]|refreshToken\s*[:=]|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}"
  "no package install route removal vendoring or duplicate keys" = "packageInstallAllowedFromUi:\s*true|routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Write-Host "[PASS] live integration review safety helper checks passed."
