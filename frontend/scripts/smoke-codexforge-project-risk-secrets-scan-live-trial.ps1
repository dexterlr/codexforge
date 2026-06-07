param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\project-risk-secrets-scan-live-trial"
$route = "src\app\project-risk-scan-live-trial"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 281 Project Risk Secrets Scan Live Trial" `
  -ScriptFile "smoke-codexforge-project-risk-secrets-scan-live-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProjectRiskSecretsScanLiveTrialPanel" `
  -CommandLabel "Go to Project Risk Scan Live Trial" `
  -Modules @("project-risk-secrets-scan-live-trial-types.ts","project-risk-secrets-scan-live-trial-summary.ts","index.ts") `
  -Components @("ProjectRiskSecretsScanLiveTrialPanel.tsx","index.ts") `
  -Exports @("buildProjectRiskSecretsScanLiveTrialStableKey","buildProjectRiskSecretsScanLiveTrial","buildProjectRiskSecretsScanLiveTrials","buildProjectRiskSecretsScanLiveTrialBoundary","buildProjectRiskSecretsScanLiveTrialModel","summarizeProjectRiskSecretsScanLiveTrial","PROJECT_RISK_SECRETS_SCAN_LIVE_TRIAL_LANGUAGE") `
  -PlainEnglish @("Project risk secrets scan live trial","Suspected secrets are redacted","Arbitrary local scanning is not allowed","Findings are not sent to providers automatically","Scan trial identity","Source index/search/dependency trial","Approved scan scope","Risk categories","Suspected secret indicator","Redaction status","Severity summary","Recommended action","Result review route","Audit handoff","Blocked reasons","scan remains behind approved bounded workspace data","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary local scanning","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no GitHub API calls from UI","no localStorage API key storage","no process.env printing","no audit log mutation from UI","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior","no weakened safe path checks","no removed server-only boundaries") `
  -ExtraRoutes @("/project-indexer-live-trial","/project-search-live-trial","/project-dependency-live-trial","/review-inbox","/jarvisd-secrets-redaction")

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
  "Project risk secrets scan live trial",
  "Suspected secrets are redacted",
  "Arbitrary local scanning is not allowed",
  "Findings are not sent to providers automatically",
  "Severity summary",
  "Recommended action"
)) {
  Assert-Contains $source $needle "project risk secrets scan live trial includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true|setInterval\s*\(|EventSource|WebSocket"
  "no command or shell execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|localExecutorApiCallAllowedFromUi:\s*true|Start-Process|Invoke-Expression"
  "no test execution from UI" = "testExecutionFromUiAllowed:\s*true|runTests\s*\(|executeTests\s*\("
  "no git command execution from UI" = "gitCommandExecutionAllowedFromUi:\s*true|runGit\s*\(|gitCommand\s*\(|createCommit\s*\("
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|directJarvisdCallAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\(|listen\s*\("
  "no browser-stored signing secrets or session tokens" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no arbitrary local browsing scanning or path crawling" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|arbitraryLocalScanningAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|scanArbitraryLocalFiles\s*\(|scanLocalMachine\s*\(|input\s+type=.*file"
  "no arbitrary file read/open or auto-open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation write delete" = "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no secret value display" = "secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\(|rawSecretDisplayAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no automatic provider send or provider APIs" = "automaticProviderSendAllowed:\s*true|providerApiCallsAllowedFromUi:\s*true|findingsSentToProvidersAutomaticallyAllowed:\s*true|api\.openai|api\.anthropic|generativelanguage|sendToProvider\s*\(|sendFindingsToProvider\s*\("
  "no GitHub API calls from UI" = "githubApiCallsAllowedFromUi:\s*true|api\.github\.com|Octokit"
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|processEnvDisplayAllowed:\s*true"
  "no audit mutation or appendEvent" = "auditLogMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true|appendEvent\s*\(|mutateAuditLog\s*\("
  "no direct saveBrainGraph or graph mutation" = "saveBrainGraph\s*\(|saveBrainGraphAllowedFromUi:\s*true|mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no process kill restart shutdown" = "processKillRestartShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
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
  Get-Content -Raw "src\app\api\codexforge\project\snapshot\route.ts"
) + "`n" + (
  Get-Content -Raw "src\app\api\codexforge\project\search\route.ts"
)
foreach ($marker in @("import `"server-only`";","resolveCodexForgeProjectPath","isAbsolutePathInsideBase","Path traversal guard","file size cap","binary guard","no command execution","no writes")) {
  Assert-Contains $safePathSource $marker "server-only path boundary marker $marker"
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Project Risk Secrets Scan Live Trial smoke passed."
