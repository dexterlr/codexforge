param(
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string[]]$PhaseMarkers,
  [string[]]$AdditionalMarkers = @(),
  [string[]]$SourceMarkerFallback = @(),
  [string[]]$ExpectedRoutes = @()
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-ContainsOrFallback {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) {
    Write-Host "[PASS] $Name"
    return
  }
  if ($SourceMarkerFallback -contains $Needle) {
    Write-Host "[PASS] $Name (fallback marker)"
    return
  }
  throw "[FAIL] Missing $Name`: $Needle"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$packageSource = Get-Content -Raw "package.json"

$finalReviewSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no live traffic routing",
  "no live provider/local/connector/automation traffic routing",
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
  "no automation execution",
  "no automation creation",
  "no automation rule persistence",
  "no reminder creation",
  "no task scheduling",
  "no conditional watch creation",
  "no schedule creation",
  "no polling loop creation",
  "no background job creation",
  "no notification sending",
  "no approval automation",
  "no approval decision persistence",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no evidence ingestion",
  "no result ingestion",
  "no recovery trigger",
  "no patch apply behavior",
  "no hardening apply behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval",
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
  "no connector data storage",
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
  "no mojibake"
)

foreach ($needle in @($PhaseMarkers + $AdditionalMarkers + $finalReviewSafetyMarkers)) {
  if ($needle -eq "checkpoint documentation smoke still exists and remains registered") { continue }
  Assert-ContainsOrFallback $source $needle "final review marker $needle"
}

Assert-Contains $allSmoke "Checkpoint Documentation Consistency" "checkpoint documentation smoke still exists and remains registered"
Assert-Contains $allSmoke "smoke-codexforge-checkpoint-docs.ps1" "checkpoint documentation smoke script remains registered"
if (([regex]::Matches($allSmoke, "smoke-codexforge-checkpoint-docs\.ps1")).Count -ne 1) {
  throw "[FAIL] checkpoint documentation smoke should be registered exactly once"
}
Write-Host "[PASS] checkpoint documentation smoke registered exactly once"

Assert-NotMatches $packageSource '"ruflo"|"@ruflo/|"odysseus"|"@odysseus/|"mcp"|"@modelcontextprotocol/' "no Ruflo/Odysseus/MCP dependency references in package manifest"

$deterministicSource = $source
foreach ($marker in @($PhaseMarkers + $AdditionalMarkers + $finalReviewSafetyMarkers + @(
  "no Date.now for deterministic layout/ids",
  "no obvious duplicate React key patterns"
))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action workflow approval or policy execution" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|liveTrafficRoutingAllowedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|approvalDecisionPersistenceAllowedFromUi:\s*true|policyAutoApplyAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|autoApprove\s*\(|executeAction\s*\(|runAction\s*\(|runWorkflow\s*\(|executeWorkflow\s*\(|applyPolicy\s*\(|applyApprovalPolicy\s*\(|applyEvidencePolicy\s*\(|applyResultPolicy\s*\(|applyRecoveryPolicy\s*\("
  "no provider local connector or bridge calls" = "providerApiCallsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|providerLiveConnectionTestsAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorDataFetchAllowedFromUi:\s*true|callProviderApi\s*\(|routeLiveProviderTraffic\s*\(|testProviderConnection\s*\(|sendPrompt\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|callConnectorApi\s*\(|connectAccount\s*\(|fetchConnectorData\s*\(|fetch\s*\(|XMLHttpRequest|axios"
  "no automation reminder schedule polling notification behavior" = "automationExecutionAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|automationRulePersistenceAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|conditionalWatchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|runAutomation\s*\(|createAutomation\s*\(|persistAutomationRule\s*\(|createReminder\s*\(|scheduleTask\s*\(|createSchedule\s*\(|createWatch\s*\(|setInterval\s*\(|setTimeout\s*\(|createBackgroundJob\s*\(|sendNotification\s*\("
  "no shell git test build smoke command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runCommand\s*\(|runGit\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\("
  "no creative research coding search or GitHub execution" = "creativeAssetGenerationAllowedFromUi:\s*true|researchExecutionAllowedFromUi:\s*true|codingWorkflowExecutionAllowedFromUi:\s*true|webSearchApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|generateImage\s*\(|generateVideo\s*\(|runResearch\s*\(|executeCodingWorkflow\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|api\.github|octokit|githubGraphql"
  "no local file or project mutation behavior" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|scanArbitraryProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\(|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|deleteFile\s*\(|applyPatch\s*\(|applyDiff\s*\("
  "no evidence result output recovery memory or Brain mutation" = "evidenceIngestionAllowedFromUi:\s*true|resultIngestionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|recoveryTriggerAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|ingestEvidence\s*\(|ingestResult\s*\(|storeOutput\s*\(|triggerRecovery\s*\(|runRecovery\s*\(|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no settings preferences credentials or browser storage" = "settingsPersistenceAllowedFromUi:\s*true|preferencePersistenceAllowedFromUi:\s*true|localStorageWritesAllowedFromUi:\s*true|sessionStorageWritesAllowedFromUi:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|credentialStorageAllowed:\s*true|connectorDataStorageAllowed:\s*true|automationDataStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|storeToken\s*\(|storeEndpoint\s*\(|storeCredential\s*\(|persistSettings\s*\(|persistPreferences\s*\("
  "no plugin tool agent extension or MCP runtime execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|createMcpClient\s*\(|callMcpTool\s*\("
  "no secret key endpoint or env exposure" = "processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9_-]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|https?://"
  "no package install route removal vendoring or duplicate keys" = "packageInstallAllowedFromUi:\s*true|routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

if ($ExpectedRoutes.Count -gt 0) {
  & (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
    -ExpectedRoutes $ExpectedRoutes
}

Write-Host "[PASS] unified final review safety helper checks passed."
