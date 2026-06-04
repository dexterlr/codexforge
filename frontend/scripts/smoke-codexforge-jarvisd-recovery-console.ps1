param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-recovery-console"
$route = "src\app\jarvisd-recovery-console"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Recovery Console" `
  -ScriptFile "smoke-codexforge-jarvisd-recovery-console.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdRecoveryConsolePanel" `
  -CommandLabel "Go to Jarvisd Recovery Console" `
  -Modules @("jarvisd-recovery-console-types.ts","jarvisd-recovery-console-summary.ts","index.ts") `
  -Components @("JarvisdRecoveryConsolePanel.tsx","index.ts") `
  -Exports @("buildJarvisdRecoveryConsoleStableKey","buildJarvisdRecoveryCase","buildJarvisdRecoveryCases","buildJarvisdRecoveryConsoleBoundary","buildJarvisdRecoveryConsoleModel","summarizeJarvisdRecoveryConsole","JARVISD_RECOVERY_CONSOLE_LANGUAGE") `
  -PlainEnglish @("Jarvisd recovery console","Recovery actions are reviewed not executed","Restart kill reset actions require future approved local boundary","No local process is mutated from this page","Recovery identity","Source event/failure","Failure category","Safe recovery checklist","Blocked recovery reasons","Permission dependency","Audit dependency","Manual handoff","Escalation route","Next recommended route","Jarvisd actions are not executed from arbitrary UI","Approved local boundary required","no automatic local action","no raw fetch from arbitrary UI","no Jarvisd capability execution from UI","no command execution","no local process mutation","no file mutation","no arbitrary local file browsing","no secrets displayed","no settings auto-import","no package install behavior") `
  -ExtraRoutes @("/jarvisd-audit-log","/jarvisd-permissions","/jarvisd-health","/jarvisd-settings-review","/jarvisd-release-audit")

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
  "Jarvisd recovery console",
  "Recovery actions are reviewed not executed",
  "Restart kill reset actions require future approved local boundary",
  "No local process is mutated from this page",
  "Recovery identity",
  "Source event/failure",
  "Failure category",
  "Safe recovery checklist",
  "Blocked recovery reasons",
  "Permission dependency",
  "Audit dependency",
  "Manual handoff",
  "Escalation route",
  "Next recommended route"
)) {
  Assert-Contains $source $needle "jarvisd recovery console includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no recovery execution" = "recoveryExecutionAllowedFromUi:\s*true|executeRecovery\s*\(|runRecovery\s*\("
  "no process restart kill reset" = "processRestartAllowedFromUi:\s*true|processKillAllowedFromUi:\s*true|daemonResetAllowedFromUi:\s*true|restartProcess\s*\(|killProcess\s*\(|resetDaemon\s*\(|process\.kill\s*\("
  "no local process mutation" = "localProcessMutationAllowedFromUi:\s*true|mutateLocalProcess\s*\(|controlProcess\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no direct Jarvisd call or capability execution" = "jarvisdDirectCallAllowedFromUi:\s*true|jarvisdCapabilityExecutionAllowedFromUi:\s*true|callJarvisd\s*\(|jarvisdClient\s*\(|executeJarvisdCapability\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|importSettingsAutomatically|applyImportedSettings\s*\("
  "no secrets displayed/exported" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValueDisplayAllowed:\s*true|envValueDisplayAllowed:\s*true"
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
Write-Host "[OK] CodexForge Jarvisd Recovery Console smoke passed."
