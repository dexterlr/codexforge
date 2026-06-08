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
  "no email draft/send behavior",
  "no calendar event create/update/delete behavior",
  "no contact create/update/delete behavior",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no automatic provider calls",
  "no provider API calls",
  "no prompt/file/source/connector data sending without approval",
  "no localStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no source auto-fetching",
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
  Assert-Contains $source $needle "connector safety marker $needle"
}

Assert-NotMatches $packageSource '"googleapis"|"@google/' "no Google API dependency added"

$blockedPatterns = @{
  "no OAuth request flow" = "oauthRequestFlowAllowedFromUi:\s*true|requestOAuth\s*\(|startOAuth\s*\(|createOAuthFlow\s*\(|oauth2|client_id|redirect_uri"
  "no connector authorization behavior" = "connectorAuthorizationAllowedFromUi:\s*true|gmailAuthorizationAllowedFromUi:\s*true|calendarAuthorizationAllowedFromUi:\s*true|contactsAuthorizationAllowedFromUi:\s*true|authorizeConnector\s*\(|requestConnectorAuthorization\s*\(|authorizeGmail\s*\(|authorizeCalendar\s*\(|authorizeContacts\s*\("
  "no connector API calls" = "connectorApiCallsAllowedFromUi:\s*true|callConnectorApi\s*\(|readConnectorData\s*\(|syncConnectorData\s*\("
  "no Gmail API calls" = "gmailApiCallsAllowedFromUi:\s*true|gmail\.users|gmail\.|GmailApp|callGmailApi\s*\(|readEmail\s*\(|searchMailbox\s*\("
  "no Calendar API calls" = "calendarApiCallsAllowedFromUi:\s*true|calendar\.events|GoogleCalendar|callCalendarApi\s*\(|readCalendarEvent\s*\("
  "no Contacts API calls" = "contactsApiCallsAllowedFromUi:\s*true|people\.connections|GoogleContacts|callContactsApi\s*\(|readContacts\s*\("
  "no Google API calls" = "googleApiCallsAllowedFromUi:\s*true|googleapis|gapi\.|google\.auth|google\.calendar|google\.contacts|google\.gmail"
  "no connector data reads" = "connectorDataReadFromPageAllowed:\s*true|automaticConnectorReadsAllowed:\s*true|readConnectorData\s*\(|syncConnectorData\s*\("
  "no automatic email reads" = "automaticEmailReadsAllowed:\s*true|readEmail\s*\(|searchMailbox\s*\("
  "no automatic calendar reads" = "automaticCalendarReadsAllowed:\s*true|readCalendarEvent\s*\(|readCalendarEvents\s*\("
  "no automatic contact reads" = "automaticContactReadsAllowed:\s*true|readContacts\s*\(|lookupContacts\s*\("
  "no email draft/send behavior" = "emailDraftSendAllowedFromUi:\s*true|emailDraftCreationAllowedFromUi:\s*true|emailSendAllowedFromUi:\s*true|createDraft\s*\(|sendEmail\s*\("
  "no calendar event create/update/delete behavior" = "calendarEventMutationAllowedFromUi:\s*true|calendarEventCreateAllowedFromUi:\s*true|calendarEventUpdateAllowedFromUi:\s*true|calendarEventDeleteAllowedFromUi:\s*true|createCalendarEvent\s*\(|updateCalendarEvent\s*\(|deleteCalendarEvent\s*\("
  "no contact create/update/delete behavior" = "contactMutationAllowedFromUi:\s*true|contactCreateAllowedFromUi:\s*true|contactUpdateAllowedFromUi:\s*true|contactDeleteAllowedFromUi:\s*true|createContact\s*\(|updateContact\s*\(|deleteContact\s*\("
  "no token storage" = "connectorTokenStorageAllowedFromUi:\s*true|gmailTokenStorageAllowedFromUi:\s*true|calendarTokenStorageAllowedFromUi:\s*true|contactTokenStorageAllowedFromUi:\s*true|browserTokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem|accessToken\s*[:=]|refreshToken\s*[:=]"
  "no token or secret display" = "tokensDisplayedAllowed:\s*true|gmailTokensDisplayedAllowed:\s*true|calendarTokensDisplayedAllowed:\s*true|contactTokensDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|messageContentsDisplayedAllowed:\s*true|privateEventDetailsDisplayedAllowed:\s*true|privateContactDetailsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no automatic provider calls" = "automaticProviderCallsAllowed:\s*true|providerApiCallsAllowedFromUi:\s*true|callProviderApi\s*\("
  "no provider data send" = "automaticProviderSendAllowed:\s*true|promptFileSourceConnectorAutoSendAllowed:\s*true|sendConnectorData\s*\(|sendFindingsToProvider\s*\("
  "no source auto-fetching" = "sourceAutoFetchAllowed:\s*true|autoFetchSources\s*\(|fetchSource\s*\("
  "no memory/RAG ingestion" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|connectorEvidenceAutoIngestionAllowed:\s*true|ingestMemory\s*\(|ingestRag\s*\(|ingestConnectorEvidence\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|connectorEvidenceAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no Brain graph mutation" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no plugin execution" = "pluginExecutionAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\("
  "no tool execution" = "toolExecutionAllowedFromUi:\s*true|executeTool\s*\(|runTool\s*\("
  "no agent execution" = "agentExecutionAllowedFromUi:\s*true|executeAgent\s*\(|runAgent\s*\("
  "no extension runtime executor" = "extensionRuntimeExecutorCreated:\s*true|createExtensionRuntimeExecutor\s*\("
  "no MCP runtime" = "mcpRuntimeCreated:\s*true|createMcpServer\s*\(|createMcpClient\s*\("
  "no MCP tool calls" = "mcpToolCallsAllowedFromUi:\s*true|callMcpTool\s*\(|executeMcpTool\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\("
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\("
  "no browser-stored signing secrets" = "signingMaterialStorageAllowedInBrowser:\s*true|generateSigningSecret\s*\("
  "no arbitrary local file browsing" = "arbitraryLocalBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\("
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\("
  "no arbitrary file read/open" = "arbitraryFileReadOpenAllowed:\s*true|readFile\s*\(|openFile\s*\("
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
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
