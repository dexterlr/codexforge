param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\multi-provider-live-test-trial"
$route = "src\app\multi-provider-live-test-trial"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 291 Multi-Provider Live Test Trial" `
  -ScriptFile "smoke-codexforge-multi-provider-live-test-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MultiProviderLiveTestTrialPanel" `
  -CommandLabel "Go to Multi-Provider Live Test Trial" `
  -Modules @("multi-provider-live-test-trial-types.ts","multi-provider-live-test-trial-summary.ts","index.ts") `
  -Components @("MultiProviderLiveTestTrialPanel.tsx","index.ts") `
  -Exports @("buildMultiProviderLiveTestTrialStableKey","buildMultiProviderLiveTestTrial","buildMultiProviderLiveTestTrials","buildMultiProviderLiveTestTrialBoundary","buildMultiProviderLiveTestTrialModel","summarizeMultiProviderLiveTestTrial","MULTI_PROVIDER_LIVE_TEST_TRIAL_LANGUAGE") `
  -PlainEnglish @("Multi-provider live test trial","Multi-provider tests require explicit approval per provider","No provider request is sent from this page","No tokens are spent automatically","Selected provider profiles","Result persistence route","Multi-provider trial identity","Model/endpoint summary","Payload privacy classification","Budget/cost guardrail","Routing/comparison intent","Approval status per provider","Expected response shape","Blocked reasons","provider tests require explicit approval","advanced comparison details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no Anthropic API calls","no OpenAI-compatible API calls","no API request sent","no prompt/file sending without approval","no auto-spend tokens","no auto-route live provider traffic","no silent provider registry mutation","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior") `
  -ExtraRoutes @("/anthropic-live-test-trial","/openai-compatible-live-test-trial","/provider-live-test-runner-boundary","/provider-test-result-persistence","/provider-budget-guardrails")

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

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($needle in @(
  "Multi-provider live test trial",
  "Multi-provider tests require explicit approval per provider",
  "No provider request is sent from this page",
  "No tokens are spent automatically",
  "Selected provider profiles",
  "Result persistence route",
  "Routing/comparison intent",
  "Approval status per provider"
)) {
  Assert-Contains $source $needle "multi-provider live test trial includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic provider calls" = "providerApiCallsAllowedFromUi:\s*true|anthropicApiCallsAllowedFromUi:\s*true|openAiCompatibleApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|sendToProvider\s*\(|callProviderApi\s*\("
  "no Anthropic API calls" = "anthropicApiCallsAllowedFromUi:\s*true|api\.anthropic|callAnthropic\s*\(|anthropicRequest\s*\("
  "no OpenAI-compatible API calls" = "openAiCompatibleApiCallsAllowedFromUi:\s*true|callOpenAiCompatible\s*\(|openAiCompatibleRequest\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|callProviderApi\s*\(|providerRequestSentFromPageAllowed:\s*true"
  "no automatic provider send" = "automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\(|sendContextToProvider\s*\("
  "no prompt/file sending without approval" = "promptOrFileAutoSendAllowed:\s*true|promptPayloadSentAllowed:\s*true|sendPrompt\s*\(|sendFiles\s*\("
  "no auto-spend tokens" = "autoSpendTokensAllowed:\s*true|spendTokens\s*\("
  "no auto-route live provider traffic" = "autoRouteLiveProviderTrafficAllowed:\s*true|autoRouteLiveProviderTraffic\s*\(|routeLiveTraffic\s*\("
  "no silent provider registry mutation" = "silentProviderRegistryMutationAllowed:\s*true|providerRegistryMutationAllowed:\s*true|mutateProviderRegistry\s*\("
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|processEnvDisplayAllowed:\s*true"
  "no API keys or secrets displayed" = "apiKeysDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|displaySecrets\s*\(|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
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
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true"
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "brainGraphMutationAllowed:\s*true|mutateBrainGraph\s*\("
  "no memory auto-promotion" = "memoryAutoPromotionAllowed:\s*true|autoPromoteMemory\s*\(|promoteMemory\s*\("
  "no process kill/restart/shutdown from UI" = "processKillRestartShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Ruflo/Odysseus vendoring or dependency references" = "(?i)ruflo|odysseus"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
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

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Multi-Provider Live Test Trial smoke passed."
