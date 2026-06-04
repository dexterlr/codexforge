param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-settings-export-import-review"
$route = "src\app\jarvisd-settings-review"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Settings Export Import Review" `
  -ScriptFile "smoke-codexforge-jarvisd-settings-export-import-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdSettingsExportImportReviewPanel" `
  -CommandLabel "Go to Jarvisd Settings Review" `
  -Modules @("jarvisd-settings-export-import-review-types.ts","jarvisd-settings-export-import-review-summary.ts","index.ts") `
  -Components @("JarvisdSettingsExportImportReviewPanel.tsx","index.ts") `
  -Exports @("buildJarvisdSettingsExportImportReviewStableKey","buildJarvisdSettingsReviewPackage","buildJarvisdSettingsReviewPackages","buildJarvisdSettingsReviewBoundary","buildJarvisdSettingsExportImportReviewModel","summarizeJarvisdSettingsExportImportReview","JARVISD_SETTINGS_EXPORT_IMPORT_REVIEW_LANGUAGE") `
  -PlainEnglish @("Jarvisd settings export import review","Secrets are never exported","Imports are not applied automatically","Settings packages are reviewed before use","Settings package identity","Included non-secret settings","Excluded secret fields","Redaction status","Compatibility notes","Import risk","Review checklist","Approval requirement","Rollback note","Release audit route","Jarvisd actions are not executed from arbitrary UI","Approved local boundary required","no settings auto-import","no settings auto-export","no imports applied automatically","no config mutation","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no secrets displayed","no secrets exported","no package install behavior") `
  -ExtraRoutes @("/jarvisd-audit-log","/jarvisd-recovery-console","/jarvisd-permissions","/jarvisd-contract","/jarvisd-release-audit")

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
  "Jarvisd settings export import review",
  "Secrets are never exported",
  "Imports are not applied automatically",
  "Settings packages are reviewed before use",
  "Settings package identity",
  "Included non-secret settings",
  "Excluded secret fields",
  "Redaction status",
  "Compatibility notes",
  "Import risk",
  "Review checklist",
  "Approval requirement",
  "Rollback note",
  "Release audit route"
)) {
  Assert-Contains $source $needle "jarvisd settings export/import review includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no secrets exported" = "secretsExportedAllowed:\s*true|exportSecrets\s*\(|includeSecretFields:\s*true"
  "no secrets displayed" = "secretsDisplayedAllowed:\s*true|localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]"
  "no automatic imports" = "importsAppliedAutomaticallyAllowed:\s*true|settingsAutoImportAllowed:\s*true|applyImportedSettings\s*\(|importSettingsAutomatically|autoImportSettings"
  "no auto-export settings" = "settingsAutoExportAllowed:\s*true|exportSettings\s*\(|autoExportSettings"
  "no config mutation" = "configMutationAllowedFromUi:\s*true|mutateConfig\s*\(|writeConfig\s*\("
  "no provider registry mutation" = "providerRegistryMutationAllowed:\s*true|mutateProviderRegistry\s*\(|writeProviderRegistry\s*\("
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no file mutation or deletion" = "fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no direct Jarvisd call or capability execution" = "jarvisdDirectCallAllowedFromUi:\s*true|jarvisdCapabilityExecutionAllowedFromUi:\s*true|callJarvisd\s*\(|jarvisdClient\s*\(|executeJarvisdCapability\s*\("
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
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
Write-Host "[OK] CodexForge Jarvisd Settings Export Import Review smoke passed."
