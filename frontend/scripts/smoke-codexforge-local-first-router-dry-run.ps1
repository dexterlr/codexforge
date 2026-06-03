param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-first-router-dry-run"
$route = "src\app\local-first-router-dry-run"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local-First Router Dry Run" `
  -ScriptFile "smoke-codexforge-local-first-router-dry-run.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalFirstRouterDryRunPanel" `
  -CommandLabel "Go to Local-First Router Dry Run" `
  -Modules @("local-first-router-dry-run-types.ts","local-first-router-dry-run-summary.ts","index.ts") `
  -Components @("LocalFirstRouterDryRunPanel.tsx","index.ts") `
  -Exports @("buildLocalFirstRouterDryRunStableKey","buildLocalFirstRouterDryRunScenario","buildLocalFirstRouterDryRunScenarios","buildLocalFirstRouterDryRunBoundary","buildLocalFirstRouterDryRunModel","summarizeLocalFirstRouterDryRun","LOCAL_FIRST_ROUTER_DRY_RUN_LANGUAGE") `
  -PlainEnglish @("Local-first router dry run","Dry run sends no live traffic","Dry run does not spend tokens","Router config is not changed automatically","Task summary","Candidate local provider/model","Candidate cloud provider/model","Local-first decision","Privacy class","Budget guardrail result","Capability fit","Fallback route","Blocked reasons","Approval handoff","no automatic provider send","no auto-routing","no auto-spend","no provider APIs are called","no secrets displayed","no secrets exported","no localStorage API key storage","no process.env printing","no provider registry mutation","no router config mutation from UI","no settings auto-import","no arbitrary local file browsing","no shell command execution") `
  -ExtraRoutes @("/provider-policy-bundle","/provider-runbook-generator","/router-recommendation-review","/provider-budget-guardrails","/prompt-privacy-classifier")

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
  "Candidate local provider/model",
  "Candidate cloud provider/model",
  "Local-first decision",
  "Privacy class",
  "Budget guardrail result",
  "Capability fit",
  "Fallback route",
  "Blocked reasons",
  "Approval handoff",
  "Dry run sends no live traffic",
  "Dry run does not spend tokens",
  "Router config is not changed automatically"
)) {
  Assert-Contains $source $needle "local-first router dry run includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no live traffic" = "dryRunLiveTrafficAllowed:\s*true|routeLiveTraffic\s*\(|sendLiveTraffic\s*\("
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true|autoApplyRouterPolicy"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no router config mutation" = "mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true|applyRouterPolicy\s*\("
  "no provider registry mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|writeProviderRegistry\s*\("
  "no secrets displayed/exported" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|localStorage\.setItem|password\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no settings auto-import" = "settingsAutoImportAllowed:\s*true|autoImportSettings|importSettingsAutomatically"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true|input\s+type=.*file"
  "no shell command execution" = "shellCommandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Local-First Router Dry Run smoke passed."
