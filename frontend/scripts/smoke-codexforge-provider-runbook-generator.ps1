param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-runbook-generator"
$route = "src\app\provider-runbook-generator"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Runbook Generator" `
  -ScriptFile "smoke-codexforge-provider-runbook-generator.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderRunbookGeneratorPanel" `
  -CommandLabel "Go to Provider Runbook Generator" `
  -Modules @("provider-runbook-generator-types.ts","provider-runbook-generator-summary.ts","index.ts") `
  -Components @("ProviderRunbookGeneratorPanel.tsx","index.ts") `
  -Exports @("buildProviderRunbookGeneratorStableKey","buildProviderRunbook","buildProviderRunbooks","buildProviderRunbookGeneratorBoundary","buildProviderRunbookGeneratorModel","summarizeProviderRunbookGenerator","PROVIDER_RUNBOOK_GENERATOR_LANGUAGE") `
  -PlainEnglish @("Provider runbook generator","Runbooks do not include secrets","Commands are manual-only","Credential safety checklist","Live-test gate checklist","Provider setup checklist","Privacy classifier step","Budget guardrail step","Failure recovery step","Audit review step","Manual-only commands/handoff","Excluded secrets note","no automatic live test","no automatic provider send","no auto-routing","no auto-spend","no provider APIs are called","no secrets displayed","no secrets exported","no API keys exported","no localStorage API key storage","no process.env printing","no provider registry mutation","no settings auto-export","no settings auto-import","no arbitrary local file browsing","no shell command execution") `
  -ExtraRoutes @("/provider-policy-bundle","/provider-setup","/provider-live-test-gate","/provider-failure-recovery","/provider-audit-log")

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
  "Runbook identity",
  "Provider setup checklist",
  "Credential safety checklist",
  "Live-test gate checklist",
  "Privacy classifier step",
  "Budget guardrail step",
  "Failure recovery step",
  "Audit review step",
  "Manual-only commands/handoff",
  "Excluded secrets note",
  "Runbooks do not include secrets",
  "Commands are manual-only"
)) {
  Assert-Contains $source $needle "provider runbook generator includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no shell command execution" = "shellCommandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no automatic live test" = "runLiveTest\s*\(|executeLiveTest\s*\(|automaticLiveTestAllowed:\s*true|autoRunLiveTest:\s*true"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets included/displayed/exported" = "runbooksIncludeSecretsAllowed:\s*true|secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|localStorage\.setItem|password\s*[:=]"
  "no API key export" = "apiKeyExportAllowed:\s*true|exportApiKey\s*\(|exportAPIKey\s*\("
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no provider or router config mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true"
  "no settings auto-export/import" = "settingsAutoExportAllowed:\s*true|settingsAutoImportAllowed:\s*true|autoExportSettings|autoImportSettings|importSettingsAutomatically"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true|input\s+type=.*file"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Provider Runbook Generator smoke passed."
