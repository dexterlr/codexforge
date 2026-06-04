param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-signed-request-contract"
$route = "src\app\jarvisd-signed-request"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Signed Request Contract" `
  -ScriptFile "smoke-codexforge-jarvisd-signed-request-contract.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdSignedRequestContractPanel" `
  -CommandLabel "Go to Jarvisd Signed Request" `
  -Modules @("jarvisd-signed-request-contract-types.ts","jarvisd-signed-request-contract-summary.ts","index.ts") `
  -Components @("JarvisdSignedRequestContractPanel.tsx","index.ts") `
  -Exports @("buildJarvisdSignedRequestContractStableKey","buildJarvisdSignedRequestContract","buildJarvisdSignedRequestContracts","buildJarvisdSignedRequestContractBoundary","buildJarvisdSignedRequestContractModel","summarizeJarvisdSignedRequestContract","JARVISD_SIGNED_REQUEST_CONTRACT_LANGUAGE") `
  -PlainEnglish @("Jarvisd signed request contract","Signing secrets are never displayed","Signing material is not stored in browser storage","Requests are not sent from this page","Replay protection note","Permission boundary reference","Request contract identity","Request purpose","Capability target","Nonce/challenge summary","Signature status","Expiry/timeout policy","Audit handoff","Blocked reasons","no real secret generation in UI","no browser-stored signing secrets","no session token localStorage storage","no Jarvisd capability execution from UI","no command execution","no raw fetch from arbitrary UI","no arbitrary local file browsing","no file mutation","no secrets displayed","no provider APIs are called","no GitHub API calls from UI") `
  -ExtraRoutes @("/jarvisd-daemon-mvp","/jarvisd-api-handshake","/jarvisd-session-consent","/jarvisd-permissions","/jarvisd-audit-log")

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
  "Jarvisd signed request contract",
  "Signing secrets are never displayed",
  "Signing material is not stored in browser storage",
  "Requests are not sent from this page",
  "Replay protection note",
  "Permission boundary reference"
)) {
  Assert-Contains $source $needle "signed request contract includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no request send from UI" = "requestSendAllowedFromUi:\s*true|sendJarvisdRequest\s*\(|callJarvisd\s*\(|fetch\s*\("
  "no signing secret display or generation" = "signingSecretDisplayAllowed:\s*true|signingSecretGenerationAllowedInBrowser:\s*true|generateSigningSecret\s*\(|displaySigningSecret\s*\("
  "no signing material or token browser storage" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorageTokenStorageAllowed:\s*true|localStorage\.setItem"
  "no daemon direct or capability execution" = "daemonDirectCallAllowedFromUi:\s*true|jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no automatic local action" = "automaticLocalActionAllowedFromUi:\s*true|runLocalAction\s*\(|executeLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "rawFetchAllowedFromUi:\s*true|XMLHttpRequest|axios|WebSocket\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation or deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no process env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|applyImportedSettings\s*\("
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
Write-Host "[OK] CodexForge Jarvisd Signed Request Contract smoke passed."
