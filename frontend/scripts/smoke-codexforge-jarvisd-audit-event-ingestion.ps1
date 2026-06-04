param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-audit-event-ingestion"
$route = "src\app\jarvisd-audit-ingestion"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Audit Event Ingestion" `
  -ScriptFile "smoke-codexforge-jarvisd-audit-event-ingestion.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdAuditEventIngestionPanel" `
  -CommandLabel "Go to Jarvisd Audit Ingestion" `
  -Modules @("jarvisd-audit-event-ingestion-types.ts","jarvisd-audit-event-ingestion-summary.ts","index.ts") `
  -Components @("JarvisdAuditEventIngestionPanel.tsx","index.ts") `
  -Exports @("buildJarvisdAuditEventIngestionStableKey","buildJarvisdAuditEventIngestionReview","buildJarvisdAuditEventIngestionReviews","buildJarvisdAuditEventIngestionBoundary","buildJarvisdAuditEventIngestionModel","summarizeJarvisdAuditEventIngestion","JARVISD_AUDIT_EVENT_INGESTION_LANGUAGE") `
  -PlainEnglish @("Jarvisd audit event ingestion","Audit events are validated before ingestion","Audit ingestion does not expose secrets","UI does not mutate audit logs directly","Duplicate and replay guard","Retention policy","Runtime controls are reviewed before use","Approved local boundary required","Secrets and signing material are never displayed or stored in browser storage","Ingestion identity","Source capability","Source session","Event category","Redaction status","Validation status","Audit log route","Blocked reasons","no raw fetch from arbitrary UI","no live handshake from arbitrary UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no settings auto-import","no audit log mutation from UI","no direct appendEvent call from UI","no Jarvisd capability execution from UI","no command execution","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no provider APIs are called","no GitHub API calls from UI","no localStorage API key storage","no process.env printing","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no package install behavior") `
  -ExtraRoutes @("/jarvisd-audit-log","/jarvisd-runtime-enforcement","/jarvisd-execution-registry","/jarvisd-kill-switch","/jarvisd-recovery-console")

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
  "Jarvisd audit event ingestion",
  "Audit events are validated before ingestion",
  "Audit ingestion does not expose secrets",
  "UI does not mutate audit logs directly",
  "Duplicate and replay guard",
  "Retention policy"
)) {
  Assert-Contains $source $needle "audit ingestion includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no auto-ingest or audit mutation" = "auditAutoIngestionAllowedFromUi:\s*true|auditLogMutationAllowedFromUi:\s*true|mutateAuditLog\s*\(|autoIngestAuditEvent\s*\("
  "no appendEvent from UI" = "appendEventAllowedFromUi:\s*true|appendEvent\s*\("
  "no live log fetch or raw fetch" = "liveLogFetchAllowedFromUi:\s*true|rawFetchAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|WebSocket\s*\("
  "no live handshake or daemon process creation" = "liveHandshakeAllowedFromUi:\s*true|connectJarvisd\s*\(|createDaemon\s*\(|startDaemon\s*\(|listen\s*\("
  "no capability execution" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no daemon direct call" = "daemonDirectCallAllowedFromUi:\s*true|callJarvisd\s*\(|jarvisdClient\s*\("
  "no signing material or token browser storage" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|applyImportedSettings\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no process kill/restart/shutdown" = "processKillAllowedFromUi:\s*true|processRestartAllowedFromUi:\s*true|processShutdownAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|shutdownProcess\s*\("
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation or deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
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
Write-Host "[OK] CodexForge Jarvisd Audit Event Ingestion smoke passed."
