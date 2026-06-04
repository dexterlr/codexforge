param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-local-session-consent"
$route = "src\app\jarvisd-session-consent"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Local Session Consent" `
  -ScriptFile "smoke-codexforge-jarvisd-local-session-consent.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdLocalSessionConsentPanel" `
  -CommandLabel "Go to Jarvisd Session Consent" `
  -Modules @("jarvisd-local-session-consent-types.ts","jarvisd-local-session-consent-summary.ts","index.ts") `
  -Components @("JarvisdLocalSessionConsentPanel.tsx","index.ts") `
  -Exports @("buildJarvisdLocalSessionConsentStableKey","buildJarvisdLocalSessionConsent","buildJarvisdLocalSessionConsents","buildJarvisdLocalSessionConsentBoundary","buildJarvisdLocalSessionConsentModel","summarizeJarvisdLocalSessionConsent","JARVISD_LOCAL_SESSION_CONSENT_LANGUAGE") `
  -PlainEnglish @("Jarvisd local session consent","Consent does not grant permissions automatically","No local action runs without explicit approval","Sessions expire and can be revoked","Allowed session scope","Consent copy","Session identity","Operator intent","Workspace trust dependency","Requested capabilities","Denied session scope","Expiry policy","Revocation guidance","Audit requirement","Blocked reasons","no live session creation from UI","no automatic permission grant","no session token localStorage storage","no command execution","no arbitrary local file browsing","no file mutation","no settings auto-import","no secrets displayed","no Jarvisd capability execution from UI","no provider APIs are called","no GitHub API calls from UI") `
  -ExtraRoutes @("/jarvisd-daemon-mvp","/jarvisd-api-handshake","/jarvisd-signed-request","/workspace-trust-policy","/jarvisd-audit-log")

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
  "Jarvisd local session consent",
  "Consent does not grant permissions automatically",
  "No local action runs without explicit approval",
  "Sessions expire and can be revoked",
  "Allowed session scope",
  "Consent copy"
)) {
  Assert-Contains $source $needle "session consent includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no live session creation from UI" = "liveSessionCreationAllowedFromUi:\s*true|createLiveSession\s*\(|startSession\s*\("
  "no automatic permission grant" = "automaticPermissionGrantAllowed:\s*true|grantPermissionAutomatically\s*\(|grantJarvisdPermission\s*\("
  "no local action without approval" = "localActionAllowedWithoutApproval:\s*true|runLocalAction\s*\(|executeLocalAction\s*\("
  "no session token localStorage storage" = "sessionTokenStorageAllowedInBrowser:\s*true|localStorageSessionTokenAllowed:\s*true|localStorage\.setItem"
  "no daemon direct or capability execution" = "daemonDirectCallAllowedFromUi:\s*true|jarvisdCapabilityExecutionAllowedFromUi:\s*true|callJarvisd\s*\(|executeJarvisdCapability\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|WebSocket\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation or deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|applyImportedSettings\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\("
  "no signing material browser storage" = "signingMaterialStorageAllowedInBrowser:\s*true"
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no process env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no provider registry/router mutation or spend" = "providerRegistryMutationAllowed:\s*true|automaticRoutingAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|mutateProviderRegistry\s*\(|autoRoute\s*\(|spendTokens\s*\("
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Jarvisd Local Session Consent smoke passed."
