param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-latency-cost-comparison"
$route = "src\app\provider-cost-latency-comparison"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Latency Cost Comparison" `
  -ScriptFile "smoke-codexforge-provider-latency-cost-comparison.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderLatencyCostComparisonPanel" `
  -CommandLabel "Go to Provider Cost and Latency" `
  -Modules @("provider-latency-cost-comparison-types.ts","provider-latency-cost-comparison-summary.ts","index.ts") `
  -Components @("ProviderLatencyCostComparisonPanel.tsx","index.ts") `
  -Exports @("buildProviderLatencyCostComparisonStableKey","buildProviderLatencyCostComparisonRow","buildProviderLatencyCostComparisonRows","buildProviderLatencyCostComparisonBoundary","buildProviderLatencyCostComparisonModel","summarizeProviderLatencyCostComparison","PROVIDER_LATENCY_COST_COMPARISON_LANGUAGE") `
  -PlainEnglish @("Provider latency cost comparison","Cost estimates are review aids, not billing truth","No live traffic is routed automatically","Do not auto-spend tokens","Local-vs-cloud classification","Confidence level","no automatic live test","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no localStorage API key storage","no process.env printing","no provider registry mutation") `
  -ExtraRoutes @("/provider-test-results","/router-recommendation-review","/token-router","/task-router","/model-capabilities")

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
  "Provider comparison row",
  "Latency summary",
  "Token estimate",
  "Cost estimate",
  "Quality note",
  "Local-vs-cloud classification",
  "Privacy note",
  "Confidence level",
  "Cost estimates are review aids, not billing truth",
  "No live traffic is routed automatically",
  "Do not auto-spend tokens"
)) {
  Assert-Contains $source $needle "latency/cost comparison includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|automaticLiveTestAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialStorageAllowed:\s*true|credentialDisplayAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no provider registry mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true"
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
Write-Host "[OK] CodexForge Provider Latency Cost Comparison smoke passed."
