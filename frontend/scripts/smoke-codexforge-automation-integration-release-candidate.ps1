param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\automation-integration-release-candidate"
$route = "src\app\automation-integration-release-candidate"
$newRoutes = @(
  "/automation-dry-run-trial-review",
  "/automation-approval-queue-review",
  "/automation-schedule-safety-review",
  "/automation-integration-release-candidate"
)

$phaseMarkers = @(
  "Automation integration release candidate",
  "Automation integration release candidate does not run automations",
  "Live automation requires explicit approval",
  "Denied automation paths remain blocked",
  "Automation family matrix",
  "Schedule safety status"
)

$automationReadinessSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no approval decision persistence",
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
  "no connector API calls",
  "no connector account connection",
  "no connector data fetch",
  "no connector data persistence",
  "no connector data storage",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local tool launching",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no patch apply behavior",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation data sending without approval",
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
  "advanced release candidate details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 441 Automation Integration Release Candidate" `
  -ScriptFile "smoke-codexforge-automation-integration-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "AutomationIntegrationReleaseCandidatePanel" `
  -CommandLabel "Go to Automation Integration Release Candidate" `
  -Modules @("automation-integration-release-candidate-types.ts","automation-integration-release-candidate-summary.ts","index.ts") `
  -Components @("AutomationIntegrationReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildAutomationIntegrationReleaseCandidateStableKey","buildAutomationIntegrationReleaseCandidate","buildAutomationIntegrationReleaseCandidates","buildAutomationIntegrationReleaseCandidateBoundary","buildAutomationIntegrationReleaseCandidateModel","summarizeAutomationIntegrationReleaseCandidate","AUTOMATION_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("automation integration candidate identity","dry-run status","approval queue status","denied automation paths","blocked integration risks","daily operator home route","global review inbox route","next recommended action") + $automationReadinessSafetyMarkers) `
  -ExtraRoutes @("/automation-dry-run-trial-review","/automation-approval-queue-review","/automation-schedule-safety-review","/daily-operator-home","/global-review-inbox")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $automationReadinessSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no action workflow approval execution" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|executeAction\s*\(|approveAction\s*\(|autoApprove\s*\(|runWorkflow\s*\(|executeWorkflow\s*\("
  "no approval or automation persistence" = "approvalDecisionPersistenceAllowedFromUi:\s*true|automationRulePersistenceAllowedFromUi:\s*true|persistApprovalDecision\s*\(|storeApprovalDecision\s*\(|persistAutomationRule\s*\(|storeAutomationRule\s*\("
  "no automation schedule reminder watch polling notification behavior" = "automationCreationAllowedFromUi:\s*true|automationExecutionAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|conditionalWatchCreationAllowedFromUi:\s*true|watchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|runAutomation\s*\(|createAutomation\s*\(|createReminder\s*\(|scheduleTask\s*\(|createSchedule\s*\(|createWatch\s*\(|createBackgroundJob\s*\(|setInterval\s*\(|setTimeout\s*\(|sendNotification\s*\("
  "no connector provider local model bridge search or GitHub calls" = "connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorDataFetchAllowedFromUi:\s*true|connectorDataStorageAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|providerLiveConnectionTestsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|webSearchApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|connectAccount\s*\(|callConnectorApi\s*\(|fetchConnectorData\s*\(|storeConnectorData\s*\(|callProviderApi\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(|storeProviderOutput\s*\(|callLocalModel\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\(|fetch\s*\(|XMLHttpRequest|axios|callGithubApi\s*\("
  "no file memory Brain plugin tool agent or MCP behavior" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|evidenceAutoIngestionAllowedFromUi:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|deleteFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|ingestEvidence\s*\(|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no local project file git shell test build smoke behavior" = "arbitraryProjectScanningAllowed:\s*true|arbitraryLocalFileBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testBuildSmokeExecutionAllowedFromUi:\s*true|scanArbitraryProject\s*\(|browseLocalFiles\s*\(|crawlPath\s*\(|readFile\s*\(|openFile\s*\(|autoOpenLocalFile\s*\(|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|child_process|execSync|spawn\s*\("
  "no credential endpoint token output or automation storage" = "localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|tokenStorageAllowed:\s*true|endpointStorageAllowed:\s*true|credentialStorageAllowed:\s*true|outputStorageAllowed:\s*true|automationDataStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}"
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

Write-Host "[OK] CodexForge Automation Integration Release Candidate smoke passed."
