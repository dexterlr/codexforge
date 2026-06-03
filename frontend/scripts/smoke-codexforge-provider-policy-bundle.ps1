param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-policy-bundle"
$route = "src\app\provider-policy-bundle"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Policy Bundle" `
  -ScriptFile "smoke-codexforge-provider-policy-bundle.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderPolicyBundlePanel" `
  -CommandLabel "Go to Provider Policy Bundle" `
  -Modules @("provider-policy-bundle-types.ts","provider-policy-bundle-summary.ts","index.ts") `
  -Components @("ProviderPolicyBundlePanel.tsx","index.ts") `
  -Exports @("buildProviderPolicyBundleStableKey","buildProviderPolicyBundle","buildProviderPolicyBundles","buildProviderPolicyBundleBoundary","buildProviderPolicyBundleModel","summarizeProviderPolicyBundle","PROVIDER_POLICY_BUNDLE_LANGUAGE") `
  -PlainEnglish @("Provider policy bundle","Policy bundles are not auto-applied","Secrets are never included","Budget guardrail summary","Privacy classifier summary","Audit log policy summary","Settings export/import policy","Router recommendation policy","Approval requirements","Excluded secret fields","Review handoff","nothing is applied automatically","no automatic provider send","no auto-routing","no auto-spend","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no provider registry mutation","no router config mutation from UI","no settings auto-export","no settings auto-import","no arbitrary local file browsing","no shell command execution") `
  -ExtraRoutes @("/provider-budget-guardrails","/prompt-privacy-classifier","/provider-audit-log","/provider-settings-review","/router-recommendation-review")

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
  "Bundle identity",
  "Covered providers",
  "Budget guardrail summary",
  "Privacy classifier summary",
  "Audit log policy summary",
  "Settings export/import policy",
  "Router recommendation policy",
  "Approval requirements",
  "Excluded secret fields",
  "Review handoff",
  "Policy bundles are not auto-applied",
  "Secrets are never included",
  "nothing is applied automatically"
)) {
  Assert-Contains $source $needle "provider policy bundle includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no policy auto-apply" = "policyBundlesAutoAppliedAllowed:\s*true|applyPolicyBundle\s*\(|autoApplyPolicyBundle|autoApplyRouterPolicy"
  "no provider registry mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|writeProviderRegistry\s*\("
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no secrets included/displayed/exported" = "secretsIncludedAllowed:\s*true|secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|includeSecrets\s*\(|localStorage\.setItem|password\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|envValueDisplayAllowed:\s*true"
  "no settings auto-export/import" = "settingsAutoExportAllowed:\s*true|settingsAutoImportAllowed:\s*true|autoExportSettings|autoImportSettings|importSettingsAutomatically"
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
Write-Host "[OK] CodexForge Provider Policy Bundle smoke passed."
