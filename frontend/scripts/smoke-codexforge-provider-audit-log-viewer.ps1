param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-audit-log-viewer"
$route = "src\app\provider-audit-log"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Audit Log Viewer" `
  -ScriptFile "smoke-codexforge-provider-audit-log-viewer.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderAuditLogViewerPanel" `
  -CommandLabel "Go to Provider Audit Log" `
  -Modules @("provider-audit-log-viewer-types.ts","provider-audit-log-viewer-summary.ts","index.ts") `
  -Components @("ProviderAuditLogViewerPanel.tsx","index.ts") `
  -Exports @("buildProviderAuditLogViewerStableKey","buildProviderAuditLogEvent","buildProviderAuditLogEvents","buildProviderAuditLogBoundary","buildProviderAuditLogViewerModel","summarizeProviderAuditLogViewer","PROVIDER_AUDIT_LOG_VIEWER_LANGUAGE") `
  -PlainEnglish @("Provider audit log viewer","Audit logs are redacted","Secrets are never shown","Redacted details","Retention note","Does not mutate logs from UI","Event summary","Provider affected","Action type","Approval status","Privacy class","Budget guardrail status","Result/recovery route","Export review route","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no secrets exported","no localStorage API key storage","no process.env printing","no provider registry mutation","no settings auto-import","no arbitrary local file browsing") `
  -ExtraRoutes @("/provider-test-results","/provider-budget-guardrails","/prompt-privacy-classifier","/provider-failure-recovery","/provider-settings-review")

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
  "Event summary",
  "Provider affected",
  "Action type",
  "Approval status",
  "Privacy class",
  "Budget guardrail status",
  "Result/recovery route",
  "Redacted details",
  "Retention note",
  "Export review route",
  "Audit logs are redacted",
  "Secrets are never shown",
  "Does not mutate logs from UI",
  "not an immutable compliance system"
)) {
  Assert-Contains $source $needle "provider audit log viewer includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no audit log mutation" = "mutateLogs\s*\(|logMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets displayed or exported" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true|secretsDisplayedAllowed:\s*true|apiKeysDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no provider or router config mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true"
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no settings auto-import" = "autoImportSettings|importSettingsAutomatically|settingsAutoImportAllowed:\s*true"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Provider Audit Log Viewer smoke passed."
