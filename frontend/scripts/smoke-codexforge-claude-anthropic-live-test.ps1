param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\claude-anthropic-live-test"
$route = "src\app\claude-anthropic-live-test"
$gateDomain = "src\lib\codexforge\provider-live-test-gate"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Claude Anthropic Live Test" `
  -ScriptFile "smoke-codexforge-claude-anthropic-live-test.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ClaudeAnthropicLiveTestPanel" `
  -CommandLabel "Go to Claude Anthropic Live Test" `
  -Modules @("claude-anthropic-live-test-types.ts","claude-anthropic-live-test-summary.ts","index.ts") `
  -Components @("ClaudeAnthropicLiveTestPanel.tsx","index.ts") `
  -Exports @("buildClaudeAnthropicLiveTestStableKey","buildClaudeAnthropicLiveTestPlan","buildClaudeAnthropicLiveTestPlans","buildClaudeAnthropicLiveTestBoundary","buildClaudeAnthropicLiveTestModel","summarizeClaudeAnthropicLiveTest") `
  -PlainEnglish @("Claude Anthropic live test","Claude and Anthropic provider readiness","Privacy review required","Do not call Anthropic APIs from arbitrary UI","Live-test gate status","Result handoff","provider live-test gate language exists","approval-gated language exists","no automatic live test","no secrets displayed","no localStorage API key storage","no process.env printing","no automatic provider send","no arbitrary cloud call from UI") `
  -ExtraRoutes @("/provider-live-test-gate","/provider-adapters","/provider-setup","/credentials","/token-router")

function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = (Get-ChildItem -Recurse -File $gateDomain | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
foreach ($needle in @("Provider profile","Model family","Credential readiness","Approved test prompt summary","Privacy review required","Spend/token limit","Expected response shape","Live-test gate status","Result handoff","Blocked reasons","No live test runs automatically","Secrets are never displayed")) {
  Assert-Contains ($source + $gateSource) $needle "Claude/Anthropic live-test includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|noAutomaticLiveTest:\s*false"
  "no Anthropic API calls from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|api\.anthropic|anthropicApiCallsAllowedFromUi:\s*true"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|promptPayloadSentAllowed:\s*true"
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

Write-Host "[OK] CodexForge Claude Anthropic Live Test smoke passed."
