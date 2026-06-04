param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-kill-switch-safe-shutdown"
$route = "src\app\jarvisd-kill-switch"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Kill Switch and Safe Shutdown" `
  -ScriptFile "smoke-codexforge-jarvisd-kill-switch-safe-shutdown.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdKillSwitchSafeShutdownPanel" `
  -CommandLabel "Go to Jarvisd Kill Switch" `
  -Modules @("jarvisd-kill-switch-safe-shutdown-types.ts","jarvisd-kill-switch-safe-shutdown-summary.ts","index.ts") `
  -Components @("JarvisdKillSwitchSafeShutdownPanel.tsx","index.ts") `
  -Exports @("buildJarvisdKillSwitchSafeShutdownStableKey","buildJarvisdKillSwitchShutdownReview","buildJarvisdKillSwitchShutdownReviews","buildJarvisdKillSwitchSafeShutdownBoundary","buildJarvisdKillSwitchSafeShutdownModel","summarizeJarvisdKillSwitchSafeShutdown","JARVISD_KILL_SWITCH_SAFE_SHUTDOWN_LANGUAGE") `
  -PlainEnglish @("Jarvisd kill switch and safe shutdown","Kill switch actions are not executed from this page","Shutdown restart requires explicit approved local boundary","No local process is killed or restarted from UI","Required confirmation copy","Safe shutdown checklist","Runtime controls are reviewed before use","Approved local boundary required","Secrets and signing material are never displayed or stored in browser storage","Shutdown request identity","Trigger reason","Active session summary","In-flight capability summary","Artifact/operation retention note","Recovery console route","Audit handoff","Blocked reasons","no raw fetch from arbitrary UI","no live handshake from arbitrary UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no settings auto-import","no audit log mutation from UI","no direct appendEvent call from UI","no Jarvisd capability execution from UI","no command execution","no process kill/restart/shutdown from UI","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no provider APIs are called","no GitHub API calls from UI","no localStorage API key storage","no process.env printing","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no package install behavior") `
  -ExtraRoutes @("/jarvisd-recovery-console","/jarvisd-audit-ingestion","/jarvisd-runtime-enforcement","/jarvisd-execution-registry","/jarvisd-session-consent")

function Assert-Contains {
  param([string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($needle in @(
  "Jarvisd kill switch and safe shutdown",
  "Kill switch actions are not executed from this page",
  "Shutdown restart requires explicit approved local boundary",
  "No local process is killed or restarted from UI",
  "Required confirmation copy",
  "Safe shutdown checklist"
)) {
  Assert-Contains $source $needle "kill switch includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no kill switch or shutdown execution" = "killSwitchExecutionAllowedFromUi:\s*true|safeShutdownExecutionAllowedFromUi:\s*true|executeKillSwitch\s*\(|executeShutdown\s*\("
  "no process kill/restart/shutdown" = "processKillAllowedFromUi:\s*true|processRestartAllowedFromUi:\s*true|processShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no daemon restart/shutdown" = "daemonRestartAllowedFromUi:\s*true|daemonShutdownAllowedFromUi:\s*true|restartDaemon\s*\(|shutdownDaemon\s*\("
  "no local state mutation" = "localStateMutationAllowedFromUi:\s*true|mutateLocalState\s*\("
  "no raw fetch or live handshake" = "rawFetchAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|WebSocket\s*\(|liveHandshakeAllowedFromUi:\s*true|connectJarvisd\s*\("
  "no daemon process creation" = "daemonProcessCreationAllowed:\s*true|createDaemon\s*\(|startDaemon\s*\(|listen\s*\("
  "no capability execution" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no audit log mutation or appendEvent" = "auditLogMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true|mutateAuditLog\s*\(|appendEvent\s*\("
  "no signing material or token browser storage" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|applyImportedSettings\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation, deletion, or artifact deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|artifactDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|deleteArtifact\s*\(|unlink\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|includeSecretFields:\s*true|displaySecrets\s*\(|exportSecrets\s*\("
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no provider registry/router mutation or spend" = "providerRegistryMutationAllowed:\s*true|automaticRoutingAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|mutateProviderRegistry\s*\(|autoRoute\s*\(|spendTokens\s*\("
  "no direct saveBrainGraph calls from UI" = "saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no package install behavior" = "npm\s+install|pnpm\s+add|yarn\s+add|packageInstallAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Jarvisd Kill Switch and Safe Shutdown smoke passed."
