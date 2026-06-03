param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-budget-guardrails"
$route = "src\app\provider-budget-guardrails"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Budget Guardrails" `
  -ScriptFile "smoke-codexforge-provider-budget-guardrails.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderBudgetGuardrailsPanel" `
  -CommandLabel "Go to Provider Budget Guardrails" `
  -Modules @("provider-budget-guardrails-types.ts","provider-budget-guardrails-summary.ts","index.ts") `
  -Components @("ProviderBudgetGuardrailsPanel.tsx","index.ts") `
  -Exports @("buildProviderBudgetGuardrailsStableKey","buildProviderBudgetGuardrailRecord","buildProviderBudgetGuardrailRecords","buildProviderBudgetGuardrailBoundary","buildProviderBudgetGuardrailsModel","summarizeProviderBudgetGuardrails","PROVIDER_BUDGET_GUARDRAILS_LANGUAGE") `
  -PlainEnglish @("Provider budget guardrails","No tokens are spent automatically","Budget estimates are review aids, not billing truth","Spend limit","Token limit","Approval required before spend","Budget scope","Per-test guardrail","Per-day/per-session guardrail","Warning threshold","Blocked reason","Review handoff","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no secrets exported","no localStorage API key storage","no process.env printing","no provider registry mutation","no settings auto-import","no arbitrary local file browsing") `
  -ExtraRoutes @("/provider-live-test-gate","/provider-cost-latency-comparison","/router-recommendation-review","/provider-failure-recovery","/token-router")

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
  "Provider profile summary",
  "Budget scope",
  "Token limit",
  "Spend limit",
  "Per-test guardrail",
  "Per-day/per-session guardrail",
  "Warning threshold",
  "Blocked reason",
  "Approval requirement",
  "Review handoff",
  "No tokens are spent automatically",
  "Budget estimates are review aids, not billing truth",
  "Approval required before spend"
)) {
  Assert-Contains $source $needle "budget guardrails includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|automaticLiveTestAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "budget estimates are not billing truth" = "budgetEstimateBillingTruthAllowed:\s*true|costEstimateBillingTruthAllowed:\s*true"
  "no secrets displayed or exported" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialStorageAllowed:\s*true|credentialDisplayAllowed:\s*true|secretsExportedAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no provider or router config mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
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
Write-Host "[OK] CodexForge Provider Budget Guardrails smoke passed."
