param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-test-result-capture"
$route = "src\app\provider-test-results"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Test Result Capture" `
  -ScriptFile "smoke-codexforge-provider-test-result-capture.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderTestResultCapturePanel" `
  -CommandLabel "Go to Provider Test Results" `
  -Modules @("provider-test-result-capture-types.ts","provider-test-result-capture-summary.ts","index.ts") `
  -Components @("ProviderTestResultCapturePanel.tsx","index.ts") `
  -Exports @("buildProviderTestResultCaptureStableKey","buildProviderTestResultCaptureRecord","buildProviderTestResultCaptureRecords","buildProviderTestResultCaptureBoundary","buildProviderTestResultCaptureModel","summarizeProviderTestResultCapture","PROVIDER_TEST_RESULT_CAPTURE_LANGUAGE") `
  -PlainEnglish @("Provider test result capture","Do not claim success without reviewed result evidence","Raw response details stay secondary","No secrets are captured","Reviewed prompt summary","Result handoff copy","no automatic live test","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no localStorage API key storage","no process.env printing","no provider registry mutation","no memory auto-promotion") `
  -ExtraRoutes @("/provider-live-test-gate","/openai-compatible-live-test","/multi-provider-live-test","/provider-cost-latency-comparison","/provider-failure-recovery")

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
  "Live-test gate reference",
  "Test scope",
  "Reviewed prompt summary",
  "Result status",
  "Response summary",
  "Latency summary",
  "Token and cost estimate summary",
  "Privacy notes",
  "Next recommended route",
  "Result handoff copy",
  "Raw response details stay secondary"
)) {
  Assert-Contains $source $needle "result capture model includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|autoRunLiveTest:\s*true|automaticLiveTestAllowed:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets displayed" = "localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]|apiKeysDisplayedAllowed:\s*true|credentialDisplayAllowed:\s*true|secretsCapturedAllowed:\s*true"
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
Write-Host "[OK] CodexForge Provider Test Result Capture smoke passed."
