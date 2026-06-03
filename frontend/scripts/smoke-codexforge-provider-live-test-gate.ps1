param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-live-test-gate"
$route = "src\app\provider-live-test-gate"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "AI Provider Live Test Gate" `
  -ScriptFile "smoke-codexforge-provider-live-test-gate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderLiveTestGatePanel" `
  -CommandLabel "Go to Provider Live Test Gate" `
  -Modules @("provider-live-test-gate-types.ts","provider-live-test-gate-summary.ts","index.ts") `
  -Components @("ProviderLiveTestGatePanel.tsx","index.ts") `
  -Exports @("buildProviderLiveTestGateStableKey","buildProviderLiveTestGateChecklist","buildProviderLiveTestGateChecklists","buildProviderLiveTestGateBoundary","buildProviderLiveTestGateModel","summarizeProviderLiveTestGate","PROVIDER_LIVE_TEST_GATE_SHARED_LANGUAGE") `
  -PlainEnglish @("AI provider live test gate","No live test runs automatically","Secrets are never displayed","Explicit approval required before network call","Spend and token limit","Prompts and files are not sent without approval","provider live-test gate language exists","approval-gated language exists","no automatic live test","no secrets displayed","no localStorage API key storage","no process.env printing","no automatic provider send","no arbitrary cloud call from UI","Execution remains behind the approved provider live-test boundary") `
  -ExtraRoutes @("/provider-tests","/openai-compatible-live-test","/claude-anthropic-live-test","/multi-provider-live-test","/credentials")

function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
foreach ($needle in @("Provider profile summary","Credential readiness","Test scope","Approved test prompt summary","Spend and token limit","Explicit approval required before network call","Privacy review","Expected response shape","Audit/handoff summary","Blocked reasons")) {
  Assert-Contains $source $needle "gate model includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|noAutomaticLiveTest:\s*false"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|credentialDisplayAllowed:\s*true|secretsDisplayedAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|promptOrFileAutoSendAllowed:\s*true|promptPayloadSentAllowed:\s*true"
  "no arbitrary cloud call from UI" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|arbitraryCloudCallsAllowed:\s*true"
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

Write-Host "[OK] CodexForge AI Provider Live Test Gate smoke passed."
