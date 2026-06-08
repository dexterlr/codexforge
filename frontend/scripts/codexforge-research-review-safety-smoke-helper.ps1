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

Assert-NotMatches $packageSource '"ruflo"|"@ruflo/|"odysseus"|"@odysseus/|"mcp"|"@modelcontextprotocol/' "no Ruflo/Odysseus/MCP dependency references in package manifest"

$blockedPatterns = @{
  "no automatic web browsing" = "automaticWebBrowsingAllowed:\s*true|webBrowsingAllowedFromUi:\s*true|browseWeb\s*\("
  "no web/search/provider API calls" = "webSearchProviderCallsAllowedFromUi:\s*true|providerApiCallsAllowedFromUi:\s*true|rawFetchAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\(|callSearchProvider\s*\(|sendSearchRequest\s*\("
  "no automatic provider calls" = "automaticProviderCallsAllowed:\s*true|providerApiCallsAllowedFromUi:\s*true|callProviderApi\s*\("
  "no automatic provider send" = "automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no prompt/file/source sending without approval" = "promptFileSourceAutoSendAllowed:\s*true|sourceAutoSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendSource\s*\("
  "no auto-spend tokens" = "autoSpendTokensAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|spendTokens\s*\("
  "no provider retries automatically" = "providerRetryAllowedFromUi:\s*true|retryProviderRequest\s*\("
  "no source auto-fetching" = "sourceAutoFetchAllowed:\s*true|autoFetchSources\s*\(|fetchSource\s*\("
  "no source auto-ingestion" = "sourceAutoIngestionAllowed:\s*true|ingestSource\s*\("
  "no evidence auto-ingestion" = "evidenceAutoIngestionAllowed:\s*true|ingestEvidence\s*\("
  "no auto-cite" = "evidenceAutoCitationAllowed:\s*true|autoCiteEvidence\s*\("
  "no auto-citation finalization" = "citationAutoFinalizationAllowed:\s*true|citationFinalizationAllowedFromUi:\s*true|autoFinalizeCitation\s*\(|finalizeCitation\s*\("
  "no automatic report export" = "automaticReportExportAllowed:\s*true|reportAutoExportAllowed:\s*true|automaticCitationExportAllowed:\s*true|autoExportReport\s*\(|exportReport\s*\(|exportCitation\s*\("
  "no file export/write behavior" = "fileExportAllowedFromUi:\s*true|exportFile\s*\(|downloadFile\s*\(|downloadReport\s*\("
  "no memory/RAG ingestion" = "memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|evidenceAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no Brain graph mutation" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no API keys or secrets displayed" = "apiKeysDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+"
  "no plugin execution" = "pluginExecutionAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\("
  "no tool execution" = "toolExecutionAllowedFromUi:\s*true|executeTool\s*\(|runTool\s*\("
  "no agent execution" = "agentExecutionAllowedFromUi:\s*true|executeAgent\s*\(|runAgent\s*\("
  "no extension install behavior" = "extensionInstallAllowedFromUi:\s*true|extensionsInstalledAutomatically:\s*true|installExtension\s*\("
  "no extension runtime executor" = "extensionRuntimeExecutorCreated:\s*true|createExtensionRuntimeExecutor\s*\("
  "no MCP runtime" = "mcpRuntimeCreated:\s*true|mcpServerCreated:\s*true|mcpClientCreated:\s*true|createMcpServer\s*\(|createMcpClient\s*\("
  "no MCP tool calls" = "mcpToolCallsAllowedFromUi:\s*true|callMcpTool\s*\(|executeMcpTool\s*\("
  "no Jarvisd permission auto-grant" = "jarvisdPermissionAutoGrantAllowed:\s*true|grantJarvisdPermission\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\("
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\("
  "no arbitrary local endpoint calls from UI" = "arbitraryLocalEndpointCallsAllowedFromUi:\s*true|callLocalEndpoint\s*\("
  "no browser-stored signing secrets" = "signingMaterialStorageAllowedInBrowser:\s*true|generateSigningSecret\s*\("
  "no session token localStorage storage" = "sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no arbitrary local file browsing" = "arbitraryLocalBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\("
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\("
  "no arbitrary file read/open" = "arbitraryFileReadOpenAllowed:\s*true|readFile\s*\(|openFile\s*\("
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\("
  "no artifact deletion" = "artifactDeletionAllowed:\s*true|deleteArtifact\s*\("
  "no process kill/restart/shutdown from UI" = "processKillRestartShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Ruflo/Odysseus vendoring" = "thirdPartyCodeVendoredOrCopied:\s*true|vendor[/\\](ruflo|odysseus)|third_party[/\\](ruflo|odysseus)"
  "no Ruflo/Odysseus runtime integration" = "executeRuflo\s*\(|executeOdysseus\s*\(|connectRuflo\s*\(|connectOdysseus\s*\("
  "no Ruflo/Odysseus dependency references" = "from\s+[`"'](?:ruflo|odysseus|@ruflo/|@odysseus/)|require\s*\(\s*[`"'](?:ruflo|odysseus|@ruflo/|@odysseus/)"
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
