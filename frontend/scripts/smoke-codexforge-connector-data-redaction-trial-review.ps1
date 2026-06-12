param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-data-redaction-trial-review"
$route = "src\app\connector-data-redaction-trial-review"
$newRoutes = @(
  "/connector-live-permission-trial-review",
  "/connector-data-redaction-trial-review",
  "/connector-evidence-handoff-review",
  "/connector-integration-release-candidate"
)

$phaseMarkers = @(
  "Connector data redaction trial review",
  "Connector data redaction trial does not fetch connector data",
  "Private connector details stay redacted",
  "Redaction rules require operator review",
  "Redaction groups",
  "Redaction checklist"
)

$connectorReadinessSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no connector account connection",
  "no Gmail connection",
  "no Calendar connection",
  "no Contacts connection",
  "no GitHub connection",
  "no Drive connection",
  "no connector permission persistence",
  "no permission grant persistence",
  "no connector API calls",
  "no OAuth request flow",
  "no connector authorization behavior",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no connector data fetch",
  "no connector data storage",
  "no real private connector data display",
  "no connector evidence auto-ingestion",
  "no evidence sent to providers",
  "no memory/RAG ingestion",
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
  "no prompt/file/project/connector/provider/model/output/audit/evidence data sending without approval",
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
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no output storage",
  "no connector data storage",
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
  "advanced redaction details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 435 Connector Data Redaction Trial Review" `
  -ScriptFile "smoke-codexforge-connector-data-redaction-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorDataRedactionTrialReviewPanel" `
  -CommandLabel "Go to Connector Data Redaction Trial Review" `
  -Modules @("connector-data-redaction-trial-review-types.ts","connector-data-redaction-trial-review-summary.ts","index.ts") `
  -Components @("ConnectorDataRedactionTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildConnectorDataRedactionTrialReviewStableKey","buildConnectorDataRedactionTrialReview","buildConnectorDataRedactionTrialReviews","buildConnectorDataRedactionTrialReviewBoundary","buildConnectorDataRedactionTrialReviewModel","summarizeConnectorDataRedactionTrialReview","CONNECTOR_DATA_REDACTION_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("connector data redaction identity","private field examples","denied redaction shortcuts","data handling boundary notes","blocked redaction risks","evidence handoff route","connector release candidate route","next recommended action") + $connectorReadinessSafetyMarkers) `
  -ExtraRoutes @("/connector-live-permission-trial-review","/connector-evidence-handoff-review","/connector-integration-release-candidate","/connector-privacy-redaction-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source
foreach ($marker in @($phaseMarkers + $connectorReadinessSafetyMarkers + @("no Date.now","no Date.now for deterministic layout/ids","no Math.random","no obvious duplicate React key patterns"))) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no connector connection API fetch storage or permission persistence" = "connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorDataFetchAllowedFromUi:\s*true|connectorDataStorageAllowedFromUi:\s*true|permissionGrantPersistenceAllowedFromUi:\s*true|connectAccount\s*\(|connectGmail\s*\(|connectCalendar\s*\(|connectContacts\s*\(|connectGithub\s*\(|connectDrive\s*\(|callConnectorApi\s*\(|fetchConnectorData\s*\(|readConnectorData\s*\(|syncConnectorData\s*\(|storeConnectorData\s*\(|persistPermissionGrant\s*\("
  "no OAuth named connector or Google API behavior" = "oauthRequestFlowAllowedFromUi:\s*true|connectorAuthorizationAllowedFromUi:\s*true|gmailApiCallsAllowedFromUi:\s*true|calendarApiCallsAllowedFromUi:\s*true|contactsApiCallsAllowedFromUi:\s*true|googleApiCallsAllowedFromUi:\s*true|requestOAuth\s*\(|startOAuth\s*\(|authorizeConnector\s*\(|callGmailApi\s*\(|callCalendarApi\s*\(|callContactsApi\s*\(|googleapis|gapi\.|GmailApp"
  "no provider prompt output or evidence send behavior" = "providerApiCallsAllowedFromUi:\s*true|providerTrafficRoutingAllowedFromUi:\s*true|promptSendingAllowedFromUi:\s*true|providerOutputStorageAllowedFromUi:\s*true|evidenceSentToProvidersAllowedFromUi:\s*true|callProviderApi\s*\(|testProviderConnection\s*\(|routeLiveProviderTraffic\s*\(|sendPrompt\s*\(|sendConnectorData\s*\(|sendEvidenceToProvider\s*\(|storeProviderOutput\s*\("
  "no local model bridge tool web search or GitHub API calls" = "localModelCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|webSearchApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|callLocalModel\s*\(|callLocalBridge\s*\(|launchLocalTool\s*\(|fetch\s*\(|XMLHttpRequest|axios|callSearchProvider\s*\(|callGithubApi\s*\("
  "no action workflow approval execution" = "actionsExecutedFromUi:\s*true|actionsApprovedFromUi:\s*true|approvalAutomationAllowedFromUi:\s*true|workflowExecutionAllowedFromUi:\s*true|executeAction\s*\(|approveAction\s*\(|autoApprove\s*\(|runWorkflow\s*\(|executeWorkflow\s*\("
  "no file git shell test build smoke or patch behavior" = "gitCommandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|commandExecutionAllowedFromUi:\s*true|testBuildSmokeExecutionAllowedFromUi:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|patchApplyAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|runGit\s*\(|runCommand\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|readFile\s*\(|openFile\s*\(|writeFile\s*\(|exportFile\s*\(|downloadFile\s*\(|applyPatch\s*\(|applyDiff\s*\(|deleteFile\s*\(|child_process|execSync|spawn\s*\("
  "no evidence memory Brain automation polling plugin tool agent or MCP behavior" = "evidenceAutoIngestionAllowedFromUi:\s*true|connectorEvidenceAutoIngestionAllowed:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|extensionRuntimeExecutorCreated:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|ingestEvidence\s*\(|ingestMemory\s*\(|ingestRag\s*\(|promoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\(|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no credential endpoint token browser storage env print or secret display" = "credentialStorageAllowed:\s*true|endpointStorageAllowed:\s*true|tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|sessionStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|secretsDisplayedAllowed:\s*true|privateConnectorDetailsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}"
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

Write-Host "[OK] CodexForge Connector Data Redaction Trial Review smoke passed."
