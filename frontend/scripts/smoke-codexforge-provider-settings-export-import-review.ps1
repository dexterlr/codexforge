param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-settings-export-import-review"
$route = "src\app\provider-settings-review"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Settings Export Import Review" `
  -ScriptFile "smoke-codexforge-provider-settings-export-import-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderSettingsExportImportReviewPanel" `
  -CommandLabel "Go to Provider Settings Review" `
  -Modules @("provider-settings-export-import-review-types.ts","provider-settings-export-import-review-summary.ts","index.ts") `
  -Components @("ProviderSettingsExportImportReviewPanel.tsx","index.ts") `
  -Exports @("buildProviderSettingsExportImportReviewStableKey","buildProviderSettingsReviewPackage","buildProviderSettingsReviewPackages","buildProviderSettingsReviewBoundary","buildProviderSettingsExportImportReviewModel","summarizeProviderSettingsExportImportReview","PROVIDER_SETTINGS_EXPORT_IMPORT_REVIEW_LANGUAGE") `
  -PlainEnglish @("Provider settings export import review","Secrets are never exported","Imports are not applied automatically","Excluded secret fields","Review checklist","Apply handoff","Settings package summary","Included non-secret settings","Redaction status","Compatibility notes","Import risk","Approval requirement","Rollback note","no auto-export settings","no settings auto-import","no imports applied automatically","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no secrets exported","no localStorage API key storage","no process.env printing","no provider registry mutation","no provider registry write from UI","no arbitrary local file browsing") `
  -ExtraRoutes @("/provider-audit-log","/provider-budget-guardrails","/prompt-privacy-classifier","/ai-providers","/credentials")

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
  "Settings package summary",
  "Included non-secret settings",
  "Excluded secret fields",
  "Redaction status",
  "Compatibility notes",
  "Import risk",
  "Review checklist",
  "Approval requirement",
  "Apply handoff",
  "Rollback note",
  "Secrets are never exported",
  "Imports are not applied automatically"
)) {
  Assert-Contains $source $needle "provider settings export/import review includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no secrets exported" = "secretsExportedAllowed:\s*true|exportSecrets\s*\(|includeSecretFields:\s*true"
  "no automatic imports" = "importsAppliedAutomaticallyAllowed:\s*true|settingsAutoImportAllowed:\s*true|applyImportedSettings\s*\(|importSettingsAutomatically|autoImportSettings"
  "no auto-export settings" = "settingsAutoExportAllowed:\s*true|exportSettings\s*\(|autoExportSettings"
  "no provider registry write" = "providerRegistryWriteAllowedFromUi:\s*true|providerRegistryMutationAllowed:\s*true|mutateProviderRegistry\s*\(|writeProviderRegistry\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true|input\s+type=.*file"
  "no upload settings" = "uploadSettings\s*\(|settingsUploadAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
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
Write-Host "[OK] CodexForge Provider Settings Export Import Review smoke passed."
