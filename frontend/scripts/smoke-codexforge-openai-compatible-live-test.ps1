param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\openai-compatible-live-test"
$route = "src\app\openai-compatible-live-test"
$gateDomain = "src\lib\codexforge\provider-live-test-gate"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "OpenAI-Compatible Live Test" `
  -ScriptFile "smoke-codexforge-openai-compatible-live-test.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "OpenAiCompatibleLiveTestPanel" `
  -CommandLabel "Go to OpenAI-Compatible Live Test" `
  -Modules @("openai-compatible-live-test-types.ts","openai-compatible-live-test-summary.ts","index.ts") `
  -Components @("OpenAiCompatibleLiveTestPanel.tsx","index.ts") `
  -Exports @("buildOpenAiCompatibleLiveTestStableKey","buildOpenAiCompatibleLiveTestPlan","buildOpenAiCompatibleLiveTestPlans","buildOpenAiCompatibleLiveTestBoundary","buildOpenAiCompatibleLiveTestModel","summarizeOpenAiCompatibleLiveTest") `
  -PlainEnglish @("OpenAI-compatible live test","OpenAI-compatible provider readiness","Local-vs-cloud classification","Do not claim success without a provided result","Live-test gate status","Token and spend limit","provider live-test gate language exists","approval-gated language exists","no automatic live test","no secrets displayed","no localStorage API key storage","no process.env printing","no automatic provider send","no arbitrary cloud call from UI") `
  -ExtraRoutes @("/provider-live-test-gate","/provider-adapters","/lm-studio-runtime-planner","/credentials","/token-router")

function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = (Get-ChildItem -Recurse -File $gateDomain | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
foreach ($needle in @("Provider/runtime identity","Endpoint policy","Model selection","Credential readiness","Approved test prompt summary","Token and spend limit","Expected response shape","Live-test gate status","Local-vs-cloud classification","Result handoff","No live test runs automatically","Secrets are never displayed")) {
  Assert-Contains ($source + $gateSource) $needle "OpenAI-compatible live-test includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|noAutomaticLiveTest:\s*false"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|promptPayloadSentAllowed:\s*true"
  "no arbitrary cloud call from UI" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
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

Write-Host "[OK] CodexForge OpenAI-Compatible Live Test smoke passed."
