param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\multi-provider-live-test"
$route = "src\app\multi-provider-live-test"
$gateDomain = "src\lib\codexforge\provider-live-test-gate"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Gemini / DeepSeek / OpenRouter Live Test" `
  -ScriptFile "smoke-codexforge-multi-provider-live-test.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MultiProviderLiveTestPanel" `
  -CommandLabel "Go to Multi-Provider Live Test" `
  -Modules @("multi-provider-live-test-types.ts","multi-provider-live-test-summary.ts","index.ts") `
  -Components @("MultiProviderLiveTestPanel.tsx","index.ts") `
  -Exports @("buildMultiProviderLiveTestStableKey","buildMultiProviderLiveTestPlan","buildMultiProviderLiveTestPlans","buildMultiProviderLiveTestBoundary","buildMultiProviderLiveTestModel","summarizeMultiProviderLiveTest") `
  -PlainEnglish @("Gemini DeepSeek OpenRouter live test","Multi-provider readiness","Provider-specific blocked reasons","Do not call provider APIs from arbitrary UI","Endpoint and network policy","Live-test gate status","provider live-test gate language exists","approval-gated language exists","no automatic live test","no secrets displayed","no localStorage API key storage","no process.env printing","no automatic provider send","no arbitrary cloud call from UI") `
  -ExtraRoutes @("/provider-live-test-gate","/provider-adapters","/model-capabilities","/task-router","/token-router")

function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = (Get-ChildItem -Recurse -File $gateDomain | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
foreach ($needle in @("Selected provider","Model/runtime identity","Credential readiness","Endpoint and network policy","Approved test prompt summary","Spend/token limit","Privacy review","Expected response shape","Live-test gate status","Provider-specific blocked reasons","Result handoff","No live test runs automatically","Secrets are never displayed")) {
  Assert-Contains ($source + $gateSource) $needle "multi-provider live-test includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|noAutomaticLiveTest:\s*false"
  "no provider API calls from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|promptPayloadSentAllowed:\s*true"
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

Write-Host "[OK] CodexForge Gemini / DeepSeek / OpenRouter Live Test smoke passed."
