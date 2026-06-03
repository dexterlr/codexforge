param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\router-auto-recommendation-review"
$route = "src\app\router-recommendation-review"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Router Auto-Recommendation Review" `
  -ScriptFile "smoke-codexforge-router-auto-recommendation-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RouterAutoRecommendationReviewPanel" `
  -CommandLabel "Go to Router Recommendation Review" `
  -Modules @("router-auto-recommendation-review-types.ts","router-auto-recommendation-review-summary.ts","index.ts") `
  -Components @("RouterAutoRecommendationReviewPanel.tsx","index.ts") `
  -Exports @("buildRouterAutoRecommendationReviewStableKey","buildRouterAutoRecommendationReviewItem","buildRouterAutoRecommendationReviewItems","buildRouterAutoRecommendationReviewBoundary","buildRouterAutoRecommendationReviewModel","summarizeRouterAutoRecommendationReview","ROUTER_AUTO_RECOMMENDATION_REVIEW_LANGUAGE") `
  -PlainEnglish @("Router auto-recommendation review","Recommendations are not auto-applied","No live traffic is routed automatically","Approval required before router changes","Local-first preference","Apply handoff","no automatic live test","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no localStorage API key storage","no process.env printing","no provider registry mutation") `
  -ExtraRoutes @("/task-router","/token-router","/provider-cost-latency-comparison","/provider-test-results","/provider-failure-recovery")

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
  "Task summary",
  "Candidate provider/model",
  "Recommendation rationale",
  "Local-first preference",
  "Cost/latency/quality tradeoff",
  "Privacy review",
  "Blocked reasons",
  "Approval requirement",
  "Apply handoff",
  "Fallback route",
  "Recommendations are not auto-applied",
  "No live traffic is routed automatically"
)) {
  Assert-Contains $source $needle "router recommendation review includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|automaticLiveTestAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no router config mutation" = "mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true|recommendationsAutoAppliedAllowed:\s*true"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true"
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
Write-Host "[OK] CodexForge Router Auto-Recommendation Review smoke passed."
