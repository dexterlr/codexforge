param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-first-privacy-audit"
$route = "src\app\local-first-privacy-audit"
$protectedRoutes = @(
  "/daily-operator-home",
  "/global-review-inbox",
  "/approval-queue",
  "/result-history",
  "/safety-boundary-matrix-finalization",
  "/failure-recovery-playbook-finalization",
  "/novice-mode-guided-flow-polish",
  "/expert-mode-fast-path-review",
  "/dashboard-density-navigation-polish",
  "/cross-loop-search-review",
  "/local-first-privacy-audit",
  "/secrets-token-storage-regression-sweep"
)

$phaseMarkers = @(
  "Local-first privacy audit",
  "Local-first privacy audit does not scan local files",
  "Private data is not sent automatically",
  "Unresolved privacy risks stay blocked",
  "Local-first guarantee summary",
  "Memory boundary audit"
)

$dailyCockpitSafetyMarkers = @(
  "review-only",
  "approval required",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no action execution from UI",
  "no search execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no prompt/file/project/connector data sending without approval",
  "no prompt/file/project data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no local file scans",
  "no local file reads",
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
  "No route coverage removal",
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
  -PhaseName "Phase 380 Local-First Privacy Audit" `
  -ScriptFile "smoke-codexforge-local-first-privacy-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalFirstPrivacyAuditPanel" `
  -CommandLabel "Go to Local-First Privacy Audit" `
  -Modules @("local-first-privacy-audit-types.ts","local-first-privacy-audit-summary.ts","index.ts") `
  -Components @("LocalFirstPrivacyAuditPanel.tsx","index.ts") `
  -Exports @("buildLocalFirstPrivacyAuditStableKey","buildLocalFirstPrivacyAudit","buildLocalFirstPrivacyAudits","buildLocalFirstPrivacyAuditBoundary","buildLocalFirstPrivacyAuditModel","summarizeLocalFirstPrivacyAudit","LOCAL_FIRST_PRIVACY_AUDIT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Privacy audit identity","File boundary audit","Connector boundary audit","Provider boundary audit","Automation boundary audit","Unresolved privacy risks","Secrets regression route","Next recommended route","advanced privacy details collapsed/secondary") + $dailyCockpitSafetyMarkers) `
  -ExtraRoutes @("/cross-loop-search-review","/secrets-token-storage-regression-sweep","/dashboard-density-navigation-polish","/safety-boundary-matrix-finalization")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $dailyCockpitSafetyMarkers + @("no Date.now for deterministic layout/ids","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action approval or execution from UI" = "actionsApprovedFromUi:\s*true|actionsExecutedFromUi:\s*true|approveAction\s*\(|grantApproval\s*\(|executeAction\s*\(|runAction\s*\("
  "no local file scan or read from UI" = "localFileScanAllowedFromUi:\s*true|localFileReadAllowedFromUi:\s*true|scanLocalFiles\s*\(|readLocalFiles\s*\("
  "no search execution from UI" = "searchExecutionAllowedFromUi:\s*true|runSearch\s*\(|executeSearch\s*\(|callSearchProvider\s*\("
  "no workflow execution or approval automation" = "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|approvalAutomationAllowedFromUi:\s*true|runWorkflow\s*\(|executeWorkflow\s*\("
  "no provider connector web or local bridge calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\(|callConnectorApi\s*\(|callLocalBridge\s*\("
  "no prompt file project connector data sending" = "promptFileProjectConnectorDataAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\("
  "no arbitrary project scanning file browsing or path crawling" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|scanLocalProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\("
  "no git shell command test build or smoke execution" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\("
  "no file mutation write export patch or deletion" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\("
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

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Local-First Privacy Audit smoke passed."
