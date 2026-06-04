param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-local-daemon-mvp-scaffold"
$route = "src\app\jarvisd-daemon-mvp"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Local Daemon MVP Scaffold" `
  -ScriptFile "smoke-codexforge-jarvisd-local-daemon-mvp-scaffold.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdLocalDaemonMvpScaffoldPanel" `
  -CommandLabel "Go to Jarvisd Daemon MVP" `
  -Modules @("jarvisd-local-daemon-mvp-scaffold-types.ts","jarvisd-local-daemon-mvp-scaffold-summary.ts","index.ts") `
  -Components @("JarvisdLocalDaemonMvpScaffoldPanel.tsx","index.ts") `
  -Exports @("buildJarvisdLocalDaemonMvpScaffoldStableKey","buildJarvisdLocalDaemonMvpScaffold","buildJarvisdLocalDaemonMvpScaffolds","buildJarvisdLocalDaemonMvpScaffoldBoundary","buildJarvisdLocalDaemonMvpScaffoldModel","summarizeJarvisdLocalDaemonMvpScaffold","JARVISD_LOCAL_DAEMON_MVP_SCAFFOLD_LANGUAGE") `
  -PlainEnglish @("Jarvisd local daemon MVP scaffold","Frontend does not start the daemon","Daemon setup remains manual","Local actions require explicit approved boundaries","Local-only endpoint policy","Unsupported actions","Daemon scaffold identity","Lifecycle status","Required operator setup","Supported MVP surfaces","Audit dependency","Permission dependency","Recovery dependency","Next recommended route","Blocked reasons","approved local boundary required","no automatic local action","no raw fetch from arbitrary UI","no daemon process creation from frontend","no Jarvisd capability execution from UI","no command execution","no arbitrary local file browsing","no file mutation","no settings auto-import","no browser-stored signing secrets","no session token localStorage storage","no provider APIs are called","no GitHub API calls from UI","no package install behavior") `
  -ExtraRoutes @("/jarvisd-api-handshake","/jarvisd-signed-request","/jarvisd-session-consent","/jarvisd-audit-log","/jarvisd-permissions","/jarvisd-recovery-console")

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
  "Jarvisd local daemon MVP scaffold",
  "Frontend does not start the daemon",
  "Daemon setup remains manual",
  "Local actions require explicit approved boundaries",
  "Local-only endpoint policy",
  "Unsupported actions"
)) {
  Assert-Contains $source $needle "daemon MVP scaffold includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|daemonStartupAllowedFromFrontend:\s*true|daemonInstallAllowedFromFrontend:\s*true|createDaemonProcess\s*\(|startDaemon\s*\(|installDaemon\s*\(|listen\s*\("
  "no automatic local action" = "automaticLocalActionAllowedFromUi:\s*true|runLocalAction\s*\(|executeLocalAction\s*\("
  "no raw fetch or sockets" = "fetch\s*\(|XMLHttpRequest|axios|WebSocket\s*\(|EventSource\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no Jarvisd direct or capability execution" = "daemonDirectCallAllowedFromUi:\s*true|jarvisdCapabilityExecutionAllowedFromUi:\s*true|callJarvisd\s*\(|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation or deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no settings auto-import/export secrets" = "settingsAutoImportAllowed:\s*true|settingsAutoExportSecretsAllowed:\s*true|autoImportSettings|applyImportedSettings\s*\("
  "no browser-stored signing secrets or session tokens" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no process env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no process kill/restart/reset" = "killProcess\s*\(|restartProcess\s*\(|resetProcess\s*\("
  "no provider registry/router mutation or spend" = "providerRegistryMutationAllowed:\s*true|automaticRoutingAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|mutateProviderRegistry\s*\(|autoRoute\s*\(|spendTokens\s*\("
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
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
Write-Host "[OK] CodexForge Jarvisd Local Daemon MVP Scaffold smoke passed."
