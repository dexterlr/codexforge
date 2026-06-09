param(
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string[]]$PhaseMarkers
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

$source = ((Get-ChildItem -Recurse -File $Domain, $Route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$packageSource = Get-Content -Raw "package.json"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "").Replace("no Date.now for deterministic layout/ids", "")

foreach ($needle in $PhaseMarkers) {
  Assert-Contains $source $needle "phase marker $needle"
}

$requiredSafetyMarkers = @(
  "no OAuth request flow",
  "no connector authorization behavior",
  "no connector API calls",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no connector data reads",
  "no automatic email reads",
  "no automatic calendar reads",
  "no automatic contact reads",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no private connector values displayed",
  "no notifications sent",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no background job creation",
  "no background work runs from UI",
  "no cron/interval/polling loops from UI",
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no provider API calls",
  "no source auto-fetching",
  "no source auto-refreshing",
  "no freshness auto-recheck",
  "no evidence auto-update",
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
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no browser-stored signing secrets",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake"
)

foreach ($needle in $requiredSafetyMarkers) {
  Assert-Contains $source $needle "automation boundary safety marker $needle"
}

Assert-NotMatches $packageSource '"googleapis"|"@google/|"mcp"|"@modelcontextprotocol/|"ruflo"|"@ruflo/|"odysseus"|"@odysseus/' "no Google, MCP, Ruflo, or Odysseus dependency added"

$blockedPatterns = @{
  "no reminder creation" = "reminderCreationAllowedFromUi:\s*true|createReminder\s*\(|setReminder\s*\("
  "no task scheduling" = "taskSchedulingAllowedFromUi:\s*true|scheduleCreationAllowedFromUi:\s*true|scheduleTask\s*\(|scheduleResearch\s*\(|createScheduledTask\s*\("
  "no automation creation" = "automationCreationAllowedFromUi:\s*true|createAutomation\s*\(|runAutomation\s*\("
  "no watch activation" = "watchCreationAllowedFromUi:\s*true|watchActivationAllowedFromUi:\s*true|activateWatch\s*\(|createWatch\s*\("
  "no background job creation" = "backgroundJobCreationAllowedFromUi:\s*true|backgroundWorkAllowedFromUi:\s*true|backgroundCheckAllowedFromUi:\s*true|createBackgroundJob\s*\(|startBackgroundJob\s*\(|runBackgroundCheck\s*\("
  "no cron interval polling loops" = "setInterval\s*\(|setTimeout\s*\(|cron\.|node-cron|pollingLoop\s*\(|startPolling\s*\(|pollSources\s*\("
  "no notifications sent" = "notificationSendAllowedFromUi:\s*true|notificationDeliveryAllowedFromUi:\s*true|sendNotification\s*\(|deliverNotification\s*\(|new\s+Notification\s*\("
  "no OAuth request flow" = "oauthRequestFlowAllowedFromUi:\s*true|requestOAuth\s*\(|startOAuth\s*\(|createOAuthFlow\s*\(|oauth2|client_id|redirect_uri"
  "no connector authorization behavior" = "connectorAuthorizationAllowedFromUi:\s*true|authorizeConnector\s*\(|requestConnectorAuthorization\s*\("
  "no connector API calls" = "connectorApiCallsAllowedFromUi:\s*true|callConnectorApi\s*\(|readConnectorData\s*\(|syncConnectorData\s*\("
  "no Gmail API calls" = "gmailApiCallsAllowedFromUi:\s*true|gmail\.users|gmail\.|GmailApp|callGmailApi\s*\(|readEmail\s*\(|searchMailbox\s*\("
  "no Calendar API calls" = "calendarApiCallsAllowedFromUi:\s*true|calendar\.events|GoogleCalendar|callCalendarApi\s*\(|readCalendarEvent\s*\("
  "no Contacts API calls" = "contactsApiCallsAllowedFromUi:\s*true|people\.connections|GoogleContacts|callContactsApi\s*\(|readContacts\s*\("
  "no Google API calls" = "googleApiCallsAllowedFromUi:\s*true|googleapis|gapi\.|google\.auth|google\.calendar|google\.contacts|google\.gmail"
  "no connector data reads" = "connectorDataReadFromPageAllowed:\s*true|automaticConnectorReadsAllowed:\s*true|readConnectorData\s*\(|syncConnectorData\s*\("
  "no automatic email/calendar/contact reads" = "automaticEmailReadsAllowed:\s*true|automaticCalendarReadsAllowed:\s*true|automaticContactReadsAllowed:\s*true|readEmail\s*\(|readCalendarEvent\s*\(|readContacts\s*\("
  "no token storage" = "connectorTokenStorageAllowedFromUi:\s*true|browserTokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|accessToken\s*[:=]|refreshToken\s*[:=]"
  "no token or secret display" = "tokensDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|privateConnectorValuesDisplayedAllowed:\s*true|apiKeysDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no automatic web browsing" = "automaticWebBrowsingAllowed:\s*true|webBrowsingAllowedFromUi:\s*true|browseWeb\s*\("
  "no web/search/provider API calls" = "webSearchProviderCallsAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|rawFetchAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\(|callSearchProvider\s*\(|sendSearchRequest\s*\("
  "no automatic provider send" = "automaticProviderCallsAllowed:\s*true|automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|promptFileSourceAutoSendAllowed:\s*true|promptFileSourceConnectorAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendSource\s*\(|sendFindingsToProvider\s*\("
  "no source auto-fetching" = "sourceAutoFetchAllowed:\s*true|autoFetchSources\s*\(|fetchSource\s*\("
  "no source auto-refreshing" = "sourceAutoRefreshAllowed:\s*true|sourceRefreshAllowedFromUi:\s*true|refreshSource\s*\("
  "no freshness auto-recheck" = "freshnessAutoRecheckAllowed:\s*true|autoRecheckFreshness\s*\(|recheckFreshness\s*\("
  "no evidence auto-update" = "evidenceAutoUpdateAllowed:\s*true|autoUpdateEvidence\s*\(|updateEvidence\s*\("
  "no evidence auto-ingestion" = "evidenceAutoIngestionAllowed:\s*true|ingestEvidence\s*\("
  "no memory/RAG ingestion" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no Brain graph mutation" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin execution" = "pluginExecutionAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\("
  "no tool execution" = "toolExecutionAllowedFromUi:\s*true|executeTool\s*\(|runTool\s*\("
  "no agent execution" = "agentExecutionAllowedFromUi:\s*true|executeAgent\s*\(|runAgent\s*\("
  "no extension runtime executor" = "extensionRuntimeExecutorCreated:\s*true|createExtensionRuntimeExecutor\s*\("
  "no MCP runtime" = "mcpRuntimeCreated:\s*true|mcpServerCreated:\s*true|mcpClientCreated:\s*true|createMcpServer\s*\(|createMcpClient\s*\("
  "no MCP tool calls" = "mcpToolCallsAllowedFromUi:\s*true|callMcpTool\s*\(|executeMcpTool\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\("
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\("
  "no arbitrary local endpoint calls from UI" = "arbitraryLocalEndpointCallsAllowedFromUi:\s*true|callLocalEndpoint\s*\("
  "no browser-stored signing secrets" = "signingMaterialStorageAllowedInBrowser:\s*true|generateSigningSecret\s*\("
  "no arbitrary local file browsing" = "arbitraryLocalBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\("
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\("
  "no arbitrary file read/open" = "arbitraryFileReadOpenAllowed:\s*true|readFile\s*\(|openFile\s*\("
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no artifact deletion" = "artifactDeletionAllowed:\s*true|deleteArtifact\s*\("
  "no process kill/restart/shutdown from UI" = "processKillRestartShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no third-party vendoring" = "thirdPartyCodeVendoredOrCopied:\s*true|vendor[/\\](ruflo|odysseus)|third_party[/\\](ruflo|odysseus)"
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
