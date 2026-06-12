param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-selection-ux-polish"
$route = "src\app\provider-selection-ux-polish"
$newRoutes = @(
  "/provider-selection-ux-polish",
  "/provider-permission-presets",
  "/provider-audit-trail-review",
  "/provider-integration-hardening-pass"
)

$phaseMarkers = @(
  "Provider selection UX polish",
  "Provider selection polish does not switch live providers",
  "Provider choice requires explicit operator approval",
  "Provider selections are preview-only here",
  "Provider choice groups",
  "Provider capability labels"
)

$providerReviewSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no provider selection persistence",
  "no provider switching",
  "no provider permission persistence",
  "no provider permission grant",
  "no permission grant persistence",
  "no provider configuration changes",
  "no provider settings persistence",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no provider output ingestion",
  "no provider output storage",
  "no output storage",
  "no provider response ingestion",
  "no audit event persistence",
  "no provider trial data persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local tool launching",
  "no creative asset generation",
  "no research execution",
  "no evidence ingestion automation",
  "no coding workflow execution",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit data sending without approval",
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
  "no credential storage",
  "no provider key storage",
  "no connector token storage",
  "no token storage",
  "no endpoint storage",
  "no localStorage writes",
  "no sessionStorage writes",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
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
  "advanced selection details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 430 Provider Selection UX Polish" `
  -ScriptFile "smoke-codexforge-provider-selection-ux-polish.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderSelectionUxPolishPanel" `
  -CommandLabel "Go to Provider Selection UX Polish" `
  -Modules @("provider-selection-ux-polish-types.ts","provider-selection-ux-polish-summary.ts","index.ts") `
  -Components @("ProviderSelectionUxPolishPanel.tsx","index.ts") `
  -Exports @("buildProviderSelectionUxPolishStableKey","buildProviderSelectionUxPolish","buildProviderSelectionUxPolishes","buildProviderSelectionUxPolishBoundary","buildProviderSelectionUxPolishModel","summarizeProviderSelectionUxPolish","PROVIDER_SELECTION_UX_POLISH_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("provider selection identity","Recommended-use hints","Denied selection actions","Selection safety checklist","Blocked selection risks","Permission presets route","Audit trail route","Next recommended action") + $providerReviewSafetyMarkers) `
  -ExtraRoutes @("/provider-permission-presets","/provider-audit-trail-review","/provider-routing-readiness-audit","/cross-provider-result-comparison")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $providerReviewSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no provider selection persistence or switching" = "providerSelectionPersistenceAllowedFromUi:\s*true|liveProviderSwitchingAllowedFromUi:\s*true|persistProviderSelection\s*\(|saveProviderSelection\s*\(|switchProvider\s*\(|selectLiveProvider\s*\("
  "no provider permission persistence grant or configuration changes" = "providerPermissionPresetPersistenceAllowedFromUi:\s*true|providerPermissionGrantAllowedFromUi:\s*true|permissionGrantPersistenceAllowedFromUi:\s*true|providerConfigurationChangesAllowedFromUi:\s*true|providerSettingsPersistenceAllowedFromUi:\s*true|grantProviderPermission\s*\(|persistProviderPermission\s*\(|saveProviderPreset\s*\(|changeProviderConfiguration\s*\(|saveProviderSettings\s*\("
  "no provider API connection traffic routing prompt or output behavior" = "providerApiCallsAllowedFromUi:\s*true|providerConnectionAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|providerOutputIngestionAllowedFromUi:\s*true|outputStorageAllowed:\s*true|callProviderApi\s*\(|connectProvider\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendProviderTraffic\s*\(|sendPrompt\s*\(|storeProviderOutput\s*\(|persistProviderOutput\s*\(|ingestProviderOutput\s*\("
  "no audit event or provider trial persistence" = "auditEventPersistenceAllowedFromUi:\s*true|providerAuditEventPersistenceAllowedFromUi:\s*true|providerTrialDataPersistenceAllowedFromUi:\s*true|persistAuditEvent\s*\(|appendAuditEvent\s*\(|persistProviderTrialData\s*\("
  "no local model bridge tool connector web search or GitHub calls" = "localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callLocalModel\s*\(|runLocalModel\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|fetch\s*\(|XMLHttpRequest|axios"
  "no action workflow approval execution" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|executeAction\s*\(|approveAction\s*\(|autoApprove\s*\(|runWorkflow\s*\(|executeWorkflow\s*\("
  "no file git shell test build smoke or patch behavior" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|readFile\s*\(|openFile\s*\(|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\(|child_process|execSync|spawn\s*\("
  "no memory Brain automation polling plugin tool agent or MCP behavior" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\(|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no credential endpoint token browser storage env print or displayed secret" = "credentialStorageAllowed:\s*true|providerCredentialsStorageAllowedFromUi:\s*true|endpointStorageAllowed:\s*true|tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}"
  "no package install route removal vendoring or duplicate keys" = "packageInstallAllowedFromUi:\s*true|routeCoverageRemovalAllowed:\s*true|thirdPartyCodeVendoredOrCopied:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|vendor[/\\](ruflo|odysseus)|key=\{label\}|key=\{summary\}|key=\{item\}|key=\{index\}|key=\{i\}"
  "no deterministic API misuse" = "Math\.random\s*\(|Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no deterministic API misuse") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Provider Selection UX Polish smoke passed."
