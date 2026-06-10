param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-loop-real-world-trial-review"
$route = "src\app\connector-loop-real-world-trial-review"
$protectedRoutes = @(
  "/connector-release-candidate",
  "/connector-loop-real-world-trial-review",
  "/automation-loop-real-world-trial-review",
  "/review-inbox"
)

$phaseMarkers = @(
  "Connector loop real-world trial review",
  "Connector trial review does not read connector data",
  "Gmail Calendar and Contacts access require explicit approval",
  "Tokens and private values are never displayed",
  "Connector access plan",
  "Privacy redaction checklist"
)

$sharedRealWorldSafetyMarkers = @(
  "real-world trial review",
  "review-only",
  "approval required",
  "real evidence is reviewed before use",
  "Memory promotion remains blocked until approved",
  "no action execution from UI",
  "no workflow execution",
  "no coding task execution",
  "no test/build/smoke execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no test execution from UI",
  "no patch apply behavior",
  "no commit creation from UI",
  "no provider API calls",
  "no connector API calls",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no web/search API calls",
  "no source fetching/browsing",
  "no OAuth request flow",
  "no connector authorization behavior",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no automatic email/calendar/contact reads",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no background job creation",
  "no notification sending",
  "no polling loops from UI",
  "no prompt/file/project data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution",
  "no command execution",
  "no file mutation",
  "no file write",
  "no file export/write behavior",
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
  "no process.env printing",
  "no API keys or secrets displayed",
  "No route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 364 Connector Loop Real-World Trial Review" `
  -ScriptFile "smoke-codexforge-connector-loop-real-world-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorLoopRealWorldTrialReviewPanel" `
  -CommandLabel "Go to Connector Loop Real-World Trial Review" `
  -Modules @("connector-loop-real-world-trial-review-types.ts","connector-loop-real-world-trial-review-summary.ts","index.ts") `
  -Components @("ConnectorLoopRealWorldTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildConnectorLoopRealWorldTrialReviewStableKey","buildConnectorLoopRealWorldTrialReview","buildConnectorLoopRealWorldTrialReviews","buildConnectorLoopRealWorldTrialReviewBoundary","buildConnectorLoopRealWorldTrialReviewModel","summarizeConnectorLoopRealWorldTrialReview","CONNECTOR_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("Connector trial identity","Source connector release candidate","Operator connector scenario","Gmail/Calendar/Contacts boundaries","Evidence capture review","Blocked real actions","Trial outcome notes","Next loop route","advanced connector trial details collapsed/secondary") + $sharedRealWorldSafetyMarkers) `
  -ExtraRoutes @("/connector-release-candidate","/connector-privacy-redaction-review","/connector-evidence-capture-review","/automation-loop-real-world-trial-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

$blockedPatterns = @{
  "no action execution from UI" = "actionsExecutedFromUi:\s*true|executeAction\s*\(|runRealAction\s*\("
  "no workflow or coding task execution" = "workflowExecutionAllowedFromUi:\s*true|codingTaskExecutionAllowedFromUi:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(|executeCodingTask\s*\("
  "no test build or smoke execution from UI" = "testExecutionFromUiAllowed:\s*true|buildExecutionFromUiAllowed:\s*true|smokeExecutionFromUiAllowed:\s*true|runTests\s*\(|runBuild\s*\(|runSmoke\s*\("
  "no patch apply or commit creation" = "patchApplyAllowedFromUi:\s*true|commitCreationAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\(|createCommit\s*\(|git\s+commit"
  "no provider connector or Google API calls" = "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|gmailApiCallsAllowedFromUi:\s*true|calendarApiCallsAllowedFromUi:\s*true|contactsApiCallsAllowedFromUi:\s*true|googleApiCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|readConnectorData\s*\(|googleapis|gapi"
  "no web search or source fetching" = "webSearchProviderCallsAllowedFromUi:\s*true|webBrowsingAllowedFromUi:\s*true|sourceAutoFetchAllowed:\s*true|fetch\s*\(|XMLHttpRequest|axios|callSearchProvider\s*\(|browseWeb\s*\(|searchWeb\s*\("
  "no OAuth connector authorization or token storage" = "oauthRequestFlowAllowedFromUi:\s*true|connectorAuthorizationAllowedFromUi:\s*true|tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|requestOAuth\s*\(|authorizeConnector\s*\(|localStorage\.setItem|sessionStorage\.setItem"
  "no file mutation export or deletion" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|downloadFile\s*\(|exportFile\s*\(|deleteFile\s*\("
  "no automations background jobs or notifications" = "reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|automationCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|createReminder\s*\(|scheduleTask\s*\(|createAutomation\s*\(|sendNotification\s*\(|setInterval\s*\(|setTimeout\s*\("
  "no memory or Brain graph mutation" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|ingestMemory\s*\(|autoPromoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin tool agent or MCP execution" = "pluginExecutionAllowedFromUi:\s*true|toolExecutionAllowedFromUi:\s*true|agentExecutionAllowedFromUi:\s*true|mcpRuntimeCreated:\s*true|mcpToolCallsAllowedFromUi:\s*true|executePlugin\s*\(|executeTool\s*\(|executeAgent\s*\(|createMcpServer\s*\(|callMcpTool\s*\("
  "no secrets or env values displayed" = "processEnvDisplayAllowed:\s*true|secretsDisplayedAllowed:\s*true|process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
}

foreach ($name in $blockedPatterns.Keys) {
  Assert-NotMatches $source $blockedPatterns[$name] $name
}

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Connector Loop Real-World Trial Review smoke passed."
