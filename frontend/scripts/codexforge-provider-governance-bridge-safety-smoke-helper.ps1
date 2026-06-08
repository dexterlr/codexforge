param(
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

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
$deterministicSource = $source
foreach ($marker in @("no Math.random", "no Date.now for deterministic layout/ids", "no Date.now")) {
  $deterministicSource = $deterministicSource.Replace($marker, "")
}

$blockedPatterns = @{
  "no automatic provider calls" = "providerApiCallsAllowedFromUi:\s*true|anthropicApiCallsAllowedFromUi:\s*true|openAiCompatibleApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|sendToProvider\s*\(|callProviderApi\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|callProviderApi\s*\(|providerRequestSentFromPageAllowed:\s*true"
  "no provider tests automatically" = "automaticLiveTestAllowed:\s*true|runProviderTest\s*\(|executeProviderTest\s*\("
  "no retry provider requests automatically" = "retryAutomaticAllowed:\s*true|providerRetryAllowedFromUi:\s*true|retryProvider\s*\(|sendRetryRequest\s*\("
  "no automatic provider send" = "automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendContextToProvider\s*\("
  "no prompt/file sending without approval" = "promptOrFileAutoSendAllowed:\s*true|promptPayloadSentAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no auto-spend tokens" = "autoSpendTokensAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|spendTokens\s*\("
  "no auto-route live provider traffic" = "autoRouteLiveProviderTrafficAllowed:\s*true|routerMetadataAutoRoutesLiveTrafficAllowed:\s*true|liveRoutingWithoutApprovalAllowed:\s*true|routeLiveTraffic\s*\("
  "no auto-apply router recommendations" = "routerRecommendationsAutoAppliedAllowed:\s*true|autoApplyRouterRecommendations\s*\(|applyRouterRecommendation\s*\("
  "no silent provider registry mutation" = "silentProviderRegistryMutationAllowed:\s*true|providerRegistryMutationAllowed:\s*true|mutateProviderRegistry\s*\("
  "no API key export" = "apiKeyExportAllowed:\s*true|exportApiKey\s*\("
  "no secret export" = "secretExportAllowed:\s*true|exportSecret\s*\("
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|processEnvDisplayAllowed:\s*true"
  "no API keys or secrets displayed" = "apiKeysDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|secretDisplayAllowed:\s*true|displaySecrets\s*\(|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no ComfyUI job submission" = "comfyUiJobSubmissionAllowedFromPage:\s*true|queueSubmitAllowed:\s*true|submitComfyUiJob\s*\(|queue_prompt|ComfyUIQueueSubmit\s*\("
  "no arbitrary local endpoint calls from UI" = "arbitraryLocalEndpointCallsAllowedFromUi:\s*true|callLocalEndpoint\s*\(|localEndpointFetch\s*\(|fetch\s*\("
  "no raw polling loops" = "rawComfyUiPollingLoopsAllowedFromUi:\s*true|setInterval\s*\(|pollComfyUi\s*\(|while\s*\(\s*true\s*\)"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no shell command execution" = "shellExecutionAllowedFromUi:\s*true|shellExecutionWithoutApprovalAllowed:\s*true"
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\(|gitCommand\s*\("
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\(|executeTests\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\(|listen\s*\("
  "no browser-stored signing secrets" = "signingMaterialStorageAllowedInBrowser:\s*true|generateSigningSecret\s*\("
  "no session token localStorage storage" = "sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlPath\s*\("
  "no arbitrary file read/open from UI" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true"
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|localFileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no process kill/restart/shutdown from UI" = "processKillRestartShutdownAllowedFromUi:\s*true|localProcessMutationAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Ruflo/Odysseus vendoring or dependency references" = "(?i)ruflo|odysseus"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
  "no obvious duplicate React key patterns" = "key=\{label\}|key=\{summary\}|key=\{item\}"
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
