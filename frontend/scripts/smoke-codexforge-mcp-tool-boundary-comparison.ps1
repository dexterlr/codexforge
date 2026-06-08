param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\mcp-tool-boundary-comparison"
$route = "src\app\mcp-tool-boundary-comparison"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 315 MCP Tool Boundary Comparison" `
  -ScriptFile "smoke-codexforge-mcp-tool-boundary-comparison.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "McpToolBoundaryComparisonPanel" `
  -CommandLabel "Go to MCP Tool Boundary Comparison" `
  -Modules @("mcp-tool-boundary-comparison-types.ts","mcp-tool-boundary-comparison-summary.ts","index.ts") `
  -Components @("McpToolBoundaryComparisonPanel.tsx","index.ts") `
  -Exports @("buildMcpToolBoundaryComparisonStableKey","buildMcpToolBoundaryComparison","buildMcpToolBoundaryComparisons","buildMcpToolBoundaryComparisonBoundary","buildMcpToolBoundaryComparisonModel","summarizeMcpToolBoundaryComparison","MCP_TOOL_BOUNDARY_COMPARISON_LANGUAGE") `
  -PlainEnglish @("MCP tool boundary comparison","MCP tools are not executed from this page","MCP support is review-only in this spike","Future MCP adoption requires explicit permission boundaries","Permission boundary mapping","Denied tool scope","MCP boundaries are review-only","Source plugin registry comparison","MCP capability categories","Signed request/audit mapping","Local/remote tool risk split","Approval requirement","Memory/RAG route","Blocked reasons","no automatic provider calls","no provider API calls","no automatic provider send","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no API key export","no secret export","no localStorage API key storage","no process.env printing","no API keys or secrets displayed","no plugin execution","no tool execution","no agent execution","no MCP runtime","no MCP tool calls","no memory/RAG ingestion","no Brain graph mutation","no appendEvent/saveBrainGraph calls from UI","no Ruflo/Odysseus vendoring","no Ruflo/Odysseus runtime integration","no Ruflo/Odysseus dependency references","future adoption requires license/security review","no ComfyUI job submission","no ComfyUI request sent from UI","no arbitrary local endpoint calls from UI","no uncontrolled polling loops","no render job start/cancel/hold/retry behavior","no command execution","no shell command execution","no git command execution from UI","no test execution from UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no artifact deletion","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","server-only path boundary markers remain intact","advanced MCP boundary details collapsed/secondary","plain English","no duplicate route chip cloud","hero title does not vertically wrap","no giant raw JSON above fold","advanced details collapsed/secondary","no unsafe execution buttons","no real video generation","no image generation","no upscale execution","no frame interpolation execution","no ComfyUI workflow run","no job queue execution","no hardware/system command","no prompt payload sent to providers","no cloud provider API calls","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no hardcoded API keys","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no direct apply-diff call from UI","no direct write-file call from UI","no direct run-command call from UI","no broker-execution call except blocked-policy text","no Math.random","no Date.now for deterministic layout/ids","no d3-force","no mojibake","no obvious duplicate React key patterns") `
  -ExtraRoutes @("/agent-plugin-registry-comparison","/agent-memory-rag-pattern-review","/jarvisd-permissions","/jarvisd-signed-request","/jarvisd-audit-ingestion")

function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$packageSource = Get-Content -Raw "package.json"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "").Replace("no Date.now for deterministic layout/ids", "")

foreach ($needle in @(
  "MCP tool boundary comparison",
  "MCP tools are not executed from this page",
  "MCP support is review-only in this spike",
  "Future MCP adoption requires explicit permission boundaries",
  "Permission boundary mapping",
  "Denied tool scope"
)) {
  Assert-Contains $source $needle "phase marker $needle"
}

Assert-NotMatches $packageSource '"ruflo"|"@ruflo/|"odysseus"|"@odysseus/|"mcp"|"@modelcontextprotocol/' "no Ruflo/Odysseus/MCP dependency references in package manifest"

$blockedPatterns = @{
  "no automatic provider calls" = "providerApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|callProviderApi\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|callProviderApi\s*\("
  "no automatic provider send" = "automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no prompt/file sending without approval" = "promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no auto-spend tokens" = "autoSpendTokensAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|spendTokens\s*\("
  "no auto-route live provider traffic" = "autoRouteLiveProviderTrafficAllowed:\s*true|routeLiveTraffic\s*\("
  "no API key export" = "apiKeyExportAllowed:\s*true|exportApiKey\s*\("
  "no secret export" = "secretExportAllowed:\s*true|exportSecret\s*\("
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "processEnvDisplayAllowed:\s*true|process\.env\.[A-Za-z0-9_]+"
  "no API keys or secrets displayed" = "apiKeysDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no plugin execution" = "pluginExecutionAllowedFromUi:\s*true|executePlugin\s*\(|runPlugin\s*\("
  "no tool execution" = "toolExecutionAllowedFromUi:\s*true|externalToolsExecutedFromUi:\s*true|executeTool\s*\(|runTool\s*\("
  "no agent execution" = "agentExecutionAllowedFromUi:\s*true|executeAgent\s*\(|runAgent\s*\("
  "no MCP runtime" = "mcpRuntimeCreated:\s*true|mcpServerCreated:\s*true|mcpClientCreated:\s*true|createMcpServer\s*\(|createMcpClient\s*\("
  "no MCP tool calls" = "mcpToolCallsAllowedFromUi:\s*true|mcpToolsExecutedFromPage:\s*true|callMcpTool\s*\(|executeMcpTool\s*\("
  "no memory/RAG ingestion" = "memoryRagIngestionAllowedFromUi:\s*true|memoryRagAutoIngestionAllowed:\s*true|memoryIngestionAllowedFromUi:\s*true|ragIngestionAllowedFromUi:\s*true|ingestMemory\s*\(|ingestRag\s*\("
  "no Brain graph mutation" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no Ruflo/Odysseus vendoring" = "thirdPartyCodeVendoredOrCopied:\s*true|vendor[/\\](ruflo|odysseus)|third_party[/\\](ruflo|odysseus)"
  "no Ruflo/Odysseus runtime integration" = "executeRuflo\s*\(|executeOdysseus\s*\(|connectRuflo\s*\(|connectOdysseus\s*\("
  "no Ruflo/Odysseus dependency references" = "from\s+[`"'](?:ruflo|odysseus|@ruflo/|@odysseus/|@[^/`"']+/(?:ruflo|odysseus))|require\s*\(\s*[`"'](?:ruflo|odysseus|@ruflo/|@odysseus/)"
  "future adoption requires license/security review" = "licenseSecurityReviewRequired:\s*false|thirdPartyLicenseSecurityReviewRequired:\s*false"
  "no ComfyUI job submission" = "comfyUiJobSubmissionAllowedFromPage:\s*true|queue_prompt|submitComfyUiJob\s*\("
  "no ComfyUI request sent from UI" = "comfyUiRequestSentFromPageAllowed:\s*true|queue_prompt|ComfyUIQueueSubmit\s*\("
  "no arbitrary local endpoint calls from UI" = "arbitraryLocalEndpointCallsAllowedFromUi:\s*true|callLocalEndpoint\s*\(|localEndpointFetch\s*\(|fetch\s*\("
  "no uncontrolled polling loops" = "setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no render job start/cancel/hold/retry behavior" = "renderJobMutationAllowedFromUi:\s*true|startRenderJob\s*\(|cancelRenderJob\s*\(|holdRenderJob\s*\(|retryRenderJob\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|localCommandsExecutedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true|localCommandsExecutedFromUi:\s*true"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\("
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\("
  "no browser-stored signing secrets" = "signingMaterialStorageAllowedInBrowser:\s*true|generateSigningSecret\s*\("
  "no session token localStorage storage" = "sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no arbitrary local file browsing" = "arbitraryLocalBrowsingAllowed:\s*true|arbitraryFileBrowsingAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\("
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\("
  "no arbitrary file read/open from UI" = "arbitraryFileReadOpenAllowed:\s*true|readFile\s*\(|openFile\s*\("
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\("
  "no artifact deletion" = "artifactDeletionAllowed:\s*true|deleteArtifact\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no process kill/restart/shutdown from UI" = "processKillRestartShutdownAllowedFromUi:\s*true|localProcessMutationAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
  "no obvious duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Write-Host "[OK] CodexForge MCP Tool Boundary Comparison smoke passed."
