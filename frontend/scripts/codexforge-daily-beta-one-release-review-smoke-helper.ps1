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

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-CountExactly { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [int]$Expected, [string]$Name) $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count; if ($count -ne $Expected) { throw "[FAIL] $Name expected $Expected found $count" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$shared = "src\lib\codexforge\daily-beta-1-release-review-kit"
Assert-DirectoryExists $Domain
Assert-DirectoryExists (Join-Path $Domain "components")
Assert-DirectoryExists $Route
Assert-DirectoryExists $shared
foreach ($module in $Modules) { Assert-FileExists (Join-Path $Domain $module) }
foreach ($component in $Components) { Assert-FileExists (Join-Path (Join-Path $Domain "components") $component) }
Assert-FileExists (Join-Path $Route "page.tsx")
Assert-FileExists (Join-Path $Route "page-client.tsx")
Assert-FileExists (Join-Path $shared "daily-beta-1-release-review-safety-markers.ts")
Assert-FileExists (Join-Path $shared "DailyBetaOneReleaseReviewSurface.tsx")

$domainSource = ((Get-ChildItem -Recurse -File $Domain) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = ((Get-ChildItem -Recurse -File $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$additionalSharedRoots = @(
  "src\lib\codexforge\universal-execution-review-kit",
  "src\lib\codexforge\controlled-builder-dry-run-review-kit",
  "src\lib\codexforge\first-controlled-execution-trial-kit",
  "src\lib\codexforge\execution-adapter-contract-review-kit",
  "src\lib\codexforge\adapter-backed-execution-preview-kit",
  "src\lib\codexforge\bounded-adapter-implementation-plan-kit",
  "src\lib\codexforge\bounded-adapter-implementation-slice-kit",
  "src\lib\codexforge\adapter-implementation-review-kit",
  "src\lib\codexforge\adapter-execution-beta-boundary-kit",
  "src\lib\codexforge\backend-adapter-boundary-contract-kit",
  "src\lib\codexforge\backend-adapter-implementation-preview-kit",
  "src\lib\codexforge\backend-dry-run-model-router-preview-kit",
  "src\lib\codexforge\model-router-provider-readiness-review-kit",
  "src\lib\codexforge\first-real-adapter-mvp-design-kit",
  "src\lib\codexforge\project-builder-mvp-preview-kit",
  "src\lib\codexforge\universal-game-builder-preview-kit",
  "src\lib\codexforge\universal-project-builder-preview-kit",
  "src\lib\codexforge\universal-builder-cockpit-preview-kit",
  "src\lib\codexforge\guided-build-workflow-preview-kit",
  "src\lib\codexforge\build-plan-bundle-preview-kit"
) | Where-Object { Test-Path $_ }
$sharedSource = ((Get-ChildItem -Recurse -File $shared) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$additionalSharedSourceParts = @()
$additionalSharedSourceParts += ($additionalSharedRoots | ForEach-Object { Get-ChildItem -Recurse -File $_ } | ForEach-Object { Get-Content -Raw $_.FullName })
foreach ($sharedFile in @("src\lib\codexforge\video-foundation-ui.tsx")) {
  if (Test-Path $sharedFile) { $additionalSharedSourceParts += Get-Content -Raw $sharedFile }
}
$additionalSharedSource = $additionalSharedSourceParts -join "`n"
$source = @($domainSource, $routeSource, $sharedSource, $additionalSharedSource) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $Domain "index.ts")
$componentIndexSource = Get-Content -Raw (Join-Path (Join-Path $Domain "components") "index.ts")
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"

Assert-Contains $indexSource "export * from" "index uses re-export style"
foreach ($export in $Exports) { Assert-Contains $domainSource $export "domain export $export" }
Assert-Contains $componentIndexSource $MainPanel "component export $MainPanel"
Assert-Contains $routeSource $MainPanel "route imports/renders the main panel"
Assert-Contains $routeSource $RouteHref "route active path $RouteHref"
Assert-Contains $commandRegistry $CommandLabel "command label $CommandLabel"
Assert-Contains $commandRegistry $RouteHref "command route $RouteHref"
Assert-CountExactly $allSmoke $ScriptFile 1 "all-smoke includes $ScriptFile exactly once"
Assert-CountExactly $allSmoke $PhaseName 1 "all-smoke includes $PhaseName exactly once"

$requiredSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no trial launch",
  "no Daily Beta 1 launch",
  "no rollout execution",
  "no rollout auto-proceed",
  "no go-live behavior",
  "no release signoff automation",
  "no final safety signoff automation",
  "no release approval automation",
  "no regression/test execution from UI",
  "no documentation publish behavior",
  "no release notes publish behavior",
  "no handoff send behavior",
  "no feedback auto-ingestion",
  "no provider API calls",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no connector data persistence",
  "no automation execution",
  "no automation creation",
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
  "no patch apply behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release data sending without approval",
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
  "no mojibake",
  "no obvious duplicate React key patterns"
)
foreach ($needle in @($PhaseMarkers + $PlainEnglish + $requiredSafetyMarkers)) { Assert-Contains $source $needle "required marker $needle" }
Assert-Contains $allSmoke "Checkpoint Documentation Consistency" "checkpoint documentation smoke still exists and remains registered"
Assert-Contains $allSmoke "smoke-codexforge-checkpoint-docs.ps1" "checkpoint documentation smoke script remains registered"
$deterministicSource = $source
foreach ($marker in @($PhaseMarkers + $PlainEnglish + $requiredSafetyMarkers + @("no Date.now for deterministic layout/ids", "no direct appendEvent call from UI", "no direct saveBrainGraph call from UI", "no direct apply-diff call from UI", "no direct write-file call from UI", "no direct run-command call from UI"))) { $deterministicSource = $deterministicSource.Replace($marker, "") }
$blockedPatterns = @{
  "no action workflow approval or signoff execution" = "actionsExecutedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|rolloutExecutionAllowedFromUi:\s*true|goLiveAllowedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|releaseSignoffAutomationAllowedFromUi:\s*true|finalSafetySignoffAutomationAllowedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runAction\s*\(|runWorkflow\s*\(|executeWorkflow\s*\(|goLive\s*\("
  "no provider local connector or bridge calls" = "providerApiCallsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|connectorDataFetchAllowedFromUi:\s*true|callProviderApi\s*\(|sendPrompt\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|callConnectorApi\s*\(|fetchConnectorData\s*\(|fetch\s*\(|XMLHttpRequest|axios|api\.github|octokit"
  "no automation schedule reminder watch polling notification behavior" = "automationExecutionAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|conditionalWatchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|createReminder\s*\(|scheduleTask\s*\(|createSchedule\s*\(|createWatch\s*\(|setInterval\s*\(|setTimeout\s*\(|createBackgroundJob\s*\(|sendNotification\s*\("
  "no shell git test build smoke command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|gitCommandExecutionAllowedFromUi:\s*true|regressionTestExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runCommand\s*\(|runGit\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\("
  "no file output docs notes handoff memory or Brain mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|documentationPublishAllowedFromUi:\s*true|releaseNotesPublishAllowedFromUi:\s*true|handoffSendAllowedFromUi:\s*true|feedbackIngestionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|memoryMutationAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|writeFile\s*\(|deleteFile\s*\(|publishDocumentation\s*\(|publishReleaseNotes\s*\(|sendHandoff\s*\(|ingestFeedback\s*\(|storeOutput\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin tool agent extension or MCP runtime execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createExtensionRuntimeExecutor\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no credentials tokens endpoints browser storage or env exposure" = "localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|credentialStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9_-]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}"
  "no package install vendoring or duplicate key patterns" = "packageInstallAllowedFromUi:\s*true|routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{constraint\}|key=\{badge\}|key=\{title\}|key=\{entry\}|key=\{step\}|key=\{phase\}|key=\{route\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\(|crypto\.randomUUID\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}
foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") {
    $deterministicSource
  } elseif ($name -eq "no credentials tokens endpoints browser storage or env exposure") {
    $source.Replace("model-task-classification-matrix", "model task classification matrix").Replace("model-privacy-risk-score-preview", "model privacy risk score preview").Replace("build-plan-risk-manifest-packet", "build plan risk manifest packet")
  } else {
    $source
  }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}
& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") -ExpectedRoutes $ProtectedRoutes
Write-Host "[OK] $PhaseName smoke passed."
