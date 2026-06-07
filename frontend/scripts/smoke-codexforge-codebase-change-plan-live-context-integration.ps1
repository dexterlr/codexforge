param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codebase-change-plan-live-context-integration"
$route = "src\app\change-plan-live-context"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 284 Codebase Change Plan Live Context Integration" `
  -ScriptFile "smoke-codexforge-codebase-change-plan-live-context-integration.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodebaseChangePlanLiveContextIntegrationPanel" `
  -CommandLabel "Go to Change Plan Live Context" `
  -Modules @("codebase-change-plan-live-context-integration-types.ts","codebase-change-plan-live-context-integration-summary.ts","index.ts") `
  -Components @("CodebaseChangePlanLiveContextIntegrationPanel.tsx","index.ts") `
  -Exports @("buildCodebaseChangePlanLiveContextIntegrationStableKey","buildCodebaseChangePlanLiveContextIntegration","buildCodebaseChangePlanLiveContextIntegrations","buildCodebaseChangePlanLiveContextBoundary","buildCodebaseChangePlanLiveContextIntegrationModel","summarizeCodebaseChangePlanLiveContextIntegration","CODEBASE_CHANGE_PLAN_LIVE_CONTEXT_INTEGRATION_LANGUAGE") `
  -PlainEnglish @("Codebase change plan live context integration","Live context improves planning but does not modify files","Arbitrary local browsing remains blocked","Secret values stay redacted","Relevant files modules summary","Patch preview route","Integration identity","Source project intelligence result","Change request summary","Dependency/risk context","Secrets redaction status","Non-goals","Planning confidence","Blocked reasons","live context does not mutate files","advanced context details collapsed/secondary","server-only path boundary markers remain intact","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no test execution from UI","no git command execution from UI","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary path crawling","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no patch apply behavior","no live patch generation from UI","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no GitHub API calls from UI","no localStorage API key storage","no process.env printing","no audit log mutation from UI","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no process kill/restart/shutdown from UI","no package install behavior") `
  -ExtraRoutes @("/project-intelligence-result","/project-intelligence-recovery","/codebase-change-plan","/patch-preview-live-context","/review-inbox")

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
  "Codebase change plan live context integration",
  "Live context improves planning but does not modify files",
  "Arbitrary local browsing remains blocked",
  "Secret values stay redacted",
  "Relevant files modules summary",
  "Patch preview route"
)) {
  Assert-Contains $source $needle "change plan live context includes $needle"
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
  "no arbitrary local file browsing or path crawling" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|arbitraryPathCrawlingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open or auto-open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\("
  "no file mutation write delete" = "liveContextModifiesFilesAllowed:\s*true|fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no patch apply or live patch generation" = "patchApplyAllowedFromUi:\s*true|livePatchGenerationAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\(|generatePatch\s*\("
  "no secret value display" = "secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\(|rawSecretDisplayAllowed:\s*true|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no automatic provider send or provider APIs" = "automaticProviderSendAllowed:\s*true|providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|sendToProvider\s*\(|sendContextToProvider\s*\("
  "no GitHub API calls from UI" = "githubApiCallsAllowedFromUi:\s*true|api\.github\.com|Octokit"
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|console\.(log|warn|error)\s*\([^\r\n]*process\.env|processEnvDisplayAllowed:\s*true"
  "no audit mutation or appendEvent" = "auditLogMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true|appendEvent\s*\(|mutateAuditLog\s*\("
  "no direct saveBrainGraph or graph mutation" = "saveBrainGraph\s*\(|saveBrainGraphAllowedFromUi:\s*true|mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no process kill restart shutdown" = "processKillRestartShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
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
Write-Host "[OK] CodexForge Codebase Change Plan Live Context Integration smoke passed."
