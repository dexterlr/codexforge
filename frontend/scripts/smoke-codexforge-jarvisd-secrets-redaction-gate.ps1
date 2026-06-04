param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-secrets-redaction-gate"
$route = "src\app\jarvisd-secrets-redaction"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Secrets Redaction Gate" `
  -ScriptFile "smoke-codexforge-jarvisd-secrets-redaction-gate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdSecretsRedactionGatePanel" `
  -CommandLabel "Go to Jarvisd Secrets Redaction" `
  -Modules @("jarvisd-secrets-redaction-gate-types.ts","jarvisd-secrets-redaction-gate-summary.ts","index.ts") `
  -Components @("JarvisdSecretsRedactionGatePanel.tsx","index.ts") `
  -Exports @("buildJarvisdSecretsRedactionGateStableKey","buildJarvisdSecretsRedactionGate","buildJarvisdSecretsRedactionGates","buildJarvisdSecretsRedactionGateBoundary","buildJarvisdSecretsRedactionGateModel","summarizeJarvisdSecretsRedactionGate","JARVISD_SECRETS_REDACTION_GATE_LANGUAGE") `
  -PlainEnglish @("Jarvisd secrets redaction gate","Secret values are never displayed","Redaction happens before review","Redaction does not approve provider or file sending","Allowed display fields","Denied display fields","Approved local boundary required","Redaction gate identity","Source capability","Finding category","Redaction status","Sensitive indicator summary","Approval requirement","Audit handoff","Blocked reasons","no automatic local action","no raw fetch from arbitrary UI","no live handshake from arbitrary UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no audit log mutation from UI","no direct appendEvent call from UI","no Jarvisd capability execution from UI","no command execution","no arbitrary local file browsing","no arbitrary file read/open","no auto-open local files","no live search from arbitrary UI","no arbitrary path crawling","no file mutation","no file deletion","no secret value display","no automatic provider send","no provider APIs are called","no GitHub API calls from UI","no localStorage API key storage","no process.env printing","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no package install behavior") `
  -ExtraRoutes @("/jarvisd-file-preview-bridge","/jarvisd-file-search-bridge","/jarvisd-index-sync","/project-risk-secrets-scan","/local-file-approval","/jarvisd-audit-ingestion")

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
  "Jarvisd secrets redaction gate",
  "Secret values are never displayed",
  "Redaction happens before review",
  "Redaction does not approve provider or file sending",
  "Allowed display fields",
  "Denied display fields"
)) {
  Assert-Contains $source $needle "secrets redaction gate includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "localActionsWithoutReviewAllowed:\s*true|automaticLocalActionAllowed:\s*true|executeLocalAction\s*\("
  "no raw fetch or live handshake" = "rawFetchAllowedFromUi:\s*true|liveHandshakeAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|WebSocket\s*\(|connectJarvisd\s*\("
  "no daemon process creation" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\(|listen\s*\("
  "no browser-stored signing secrets or session tokens" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|jarvisdDirectCallAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no audit mutation or appendEvent" = "auditLogMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true|appendEvent\s*\(|mutateAuditLog\s*\("
  "no arbitrary file browsing or read open" = "arbitraryLocalBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\("
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\(|openLocalFile\s*\("
  "no live search from arbitrary UI" = "liveSearchAllowedFromUi:\s*true|runLiveSearch\s*\(|executeSearch\s*\("
  "no arbitrary path crawling" = "arbitraryPathCrawlingAllowed:\s*true|crawlArbitraryPaths\s*\(|crawlPath\s*\("
  "no file mutation deletion or patches" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|applyPatch\s*\("
  "no secret value display or export" = "secretValuesDisplayedAllowed:\s*true|rawSecretDisplayAllowed:\s*true|secretsExportedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\(|includeSecretFields:\s*true|rawSecretValue|fullCredentialValue"
  "no provider or file sending approval by redaction" = "automaticProviderSendAllowed:\s*true|providerApiCallsAllowedFromUi:\s*true|fileSendingApprovedByRedaction:\s*true|providerSendingApprovedByRedaction:\s*true|sendToProvider\s*\(|sendFile\s*\("
  "no provider APIs" = "api\.openai|api\.anthropic|generativelanguage|cloudProviderCall\s*\("
  "no GitHub API calls from UI" = "githubApiCallsAllowedFromUi:\s*true|api\.github\.com|Octokit"
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no graph mutation or memory auto-promotion" = "saveBrainGraph\s*\(|mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true|autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no package install behavior" = "npm\s+install|pnpm\s+add|yarn\s+add|packageInstallAllowedFromUi:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Jarvisd Secrets Redaction Gate smoke passed."
