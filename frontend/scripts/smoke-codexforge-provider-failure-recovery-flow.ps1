param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-failure-recovery-flow"
$route = "src\app\provider-failure-recovery"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Failure Recovery Flow" `
  -ScriptFile "smoke-codexforge-provider-failure-recovery-flow.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderFailureRecoveryFlowPanel" `
  -CommandLabel "Go to Provider Failure Recovery" `
  -Modules @("provider-failure-recovery-flow-types.ts","provider-failure-recovery-flow-summary.ts","index.ts") `
  -Components @("ProviderFailureRecoveryFlowPanel.tsx","index.ts") `
  -Exports @("buildProviderFailureRecoveryStableKey","buildProviderFailureRecoveryCase","buildProviderFailureRecoveryCases","buildProviderFailureRecoveryBoundary","buildProviderFailureRecoveryModel","summarizeProviderFailureRecovery","PROVIDER_FAILURE_RECOVERY_LANGUAGE") `
  -PlainEnglish @("Provider failure recovery flow","No automatic retry","No cloud fallback without approval","Safe retry checklist","Spend and token guard","Local fallback suggestion","no automatic live test","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no localStorage API key storage","no process.env printing","no provider registry mutation") `
  -ExtraRoutes @("/provider-test-results","/provider-cost-latency-comparison","/router-recommendation-review","/provider-live-test-gate","/credentials")

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
  "Failure summary",
  "Provider affected",
  "Likely cause category",
  "Safe retry checklist",
  "Blocked retry reasons",
  "Privacy/secrets check",
  "Spend and token guard",
  "Alternate provider suggestion",
  "Local fallback suggestion",
  "Recovery handoff",
  "No automatic retry",
  "No cloud fallback without approval"
)) {
  Assert-Contains $source $needle "provider failure recovery includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|automaticLiveTestAllowed:\s*true"
  "no automatic retry" = "automaticRetryAllowed:\s*true|retryAutomatically\s*\(|autoRetry|retryLoop\s*\("
  "no cloud fallback without approval" = "cloudFallbackWithoutApprovalAllowed:\s*true|cloudFallbackAuto|fallbackToCloud\s*\("
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
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
Write-Host "[OK] CodexForge Provider Failure Recovery Flow smoke passed."
