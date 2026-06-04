param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-local-api-handshake"
$route = "src\app\jarvisd-api-handshake"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Local API Handshake" `
  -ScriptFile "smoke-codexforge-jarvisd-local-api-handshake.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdLocalApiHandshakePanel" `
  -CommandLabel "Go to Jarvisd API Handshake" `
  -Modules @("jarvisd-local-api-handshake-types.ts","jarvisd-local-api-handshake-summary.ts","index.ts") `
  -Components @("JarvisdLocalApiHandshakePanel.tsx","index.ts") `
  -Exports @("buildJarvisdLocalApiHandshakeStableKey","buildJarvisdLocalApiHandshake","buildJarvisdLocalApiHandshakes","buildJarvisdLocalApiHandshakeBoundary","buildJarvisdLocalApiHandshakeModel","summarizeJarvisdLocalApiHandshake","JARVISD_LOCAL_API_HANDSHAKE_LANGUAGE") `
  -PlainEnglish @("Jarvisd local API handshake","No handshake runs automatically","Live handshake remains behind approved local boundary","Localhost-only policy","Protocol version","Timeout policy","Handshake identity","Daemon endpoint summary","Version requirement","Nonce/challenge placeholder shape","Retry policy","Health/version dependency","Blocked reasons","endpoint secrets are not stored in browser storage","approved local boundary required","no raw fetch from arbitrary UI","no live handshake from arbitrary UI","no polling loop","no command execution","no Jarvisd capability execution from UI","no arbitrary local file browsing","no file mutation","no secrets displayed","no provider APIs are called","no GitHub API calls from UI","no process.env printing") `
  -ExtraRoutes @("/jarvisd-daemon-mvp","/jarvisd-signed-request","/jarvisd-session-consent","/jarvisd-health","/jarvisd-permissions")

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
  "Jarvisd local API handshake",
  "No handshake runs automatically",
  "Live handshake remains behind approved local boundary",
  "Localhost-only policy",
  "Protocol version",
  "Timeout policy"
)) {
  Assert-Contains $source $needle "local API handshake includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic or live handshake" = "automaticHandshakeAllowedFromUi:\s*true|liveHandshakeAllowedFromArbitraryUi:\s*true|runHandshake\s*\(|startHandshake\s*\("
  "no raw fetch or polling loop" = "rawFetchAllowedFromUi:\s*true|pollingLoopAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|setInterval\s*\(|setTimeout\s*\(|WebSocket\s*\("
  "no endpoint secret browser storage" = "endpointSecretStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|signingMaterialStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no daemon direct or capability execution" = "daemonDirectCallAllowedFromUi:\s*true|jarvisdCapabilityExecutionAllowedFromUi:\s*true|callJarvisd\s*\(|executeJarvisdCapability\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no process env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|applyImportedSettings\s*\("
  "no provider registry/router mutation or spend" = "providerRegistryMutationAllowed:\s*true|automaticRoutingAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|mutateProviderRegistry\s*\(|autoRoute\s*\(|spendTokens\s*\("
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no daemon process creation" = "createDaemonProcess\s*\(|startDaemon\s*\(|listen\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Jarvisd Local API Handshake smoke passed."
