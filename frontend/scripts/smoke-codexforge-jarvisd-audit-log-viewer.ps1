param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-audit-log-viewer"
$route = "src\app\jarvisd-audit-log"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Audit Log Viewer" `
  -ScriptFile "smoke-codexforge-jarvisd-audit-log-viewer.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdAuditLogViewerPanel" `
  -CommandLabel "Go to Jarvisd Audit Log Viewer" `
  -Modules @("jarvisd-audit-log-viewer-types.ts","jarvisd-audit-log-viewer-summary.ts","index.ts") `
  -Components @("JarvisdAuditLogViewerPanel.tsx","index.ts") `
  -Exports @("buildJarvisdAuditLogViewerStableKey","buildJarvisdAuditLogEvent","buildJarvisdAuditLogEvents","buildJarvisdAuditLogBoundary","buildJarvisdAuditLogViewerModel","summarizeJarvisdAuditLogViewer","JARVISD_AUDIT_LOG_VIEWER_LANGUAGE") `
  -PlainEnglish @("Jarvisd audit log viewer","Audit logs are read-only from this page","Secrets are never shown","Audit entries are redacted before review","Audit event identity","Event category","Requested capability","Permission boundary reference","Approval status","Result status","Redaction status","Retention note","Recovery console route","Blocked reasons","Jarvisd actions are not executed from arbitrary UI","Approved local boundary required","no automatic local action","no raw fetch from arbitrary UI","no live log fetching from arbitrary UI","no audit log mutation from UI","no Jarvisd capability execution from UI","no command execution","no secrets displayed","no secrets exported","no secrets included","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no provider APIs are called","no GitHub API calls from UI","no settings auto-import","no package install behavior") `
  -ExtraRoutes @("/jarvisd-permissions","/jarvisd-capabilities","/jarvisd-recovery-console","/jarvisd-settings-review","/jarvisd-release-audit")

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
  "Jarvisd audit log viewer",
  "Audit logs are read-only from this page",
  "Secrets are never shown",
  "Audit entries are redacted before review",
  "Audit event identity",
  "Event category",
  "Requested capability",
  "Permission boundary reference",
  "Approval status",
  "Result status",
  "Redaction status",
  "Retention note",
  "Recovery console route",
  "Blocked reasons"
)) {
  Assert-Contains $source $needle "jarvisd audit log viewer includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|runLocalAction\s*\(|executeLocalAction\s*\("
  "no raw fetch or live log fetching" = "fetch\s*\(|XMLHttpRequest|axios|liveLogFetchAllowedFromUi:\s*true|fetchLiveLogs\s*\(|readLiveLogs\s*\("
  "no audit log mutation" = "logMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true|mutateLogs\s*\(|appendEvent\s*\("
  "no Jarvisd capability execution" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no direct daemon call" = "daemonCallAllowedFromUi:\s*true|callJarvisd\s*\(|jarvisdClient\s*\(|connectJarvisd\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation or deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|importSettingsAutomatically|applyImportedSettings\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|includeSecretFields:\s*true|localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValueDisplayAllowed:\s*true|envValueDisplayAllowed:\s*true"
  "no provider registry/router mutation" = "providerRegistryMutationAllowed:\s*true|routerConfigMutationAllowedFromUi:\s*true|mutateProviderRegistry\s*\(|applyRouterPolicy\s*\("
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
Write-Host "[OK] CodexForge Jarvisd Audit Log Viewer smoke passed."
