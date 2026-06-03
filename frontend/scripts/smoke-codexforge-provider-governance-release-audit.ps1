param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-governance-release-audit"
$route = "src\app\provider-governance-release-audit"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Provider Governance Release Audit" `
  -ScriptFile "smoke-codexforge-provider-governance-release-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderGovernanceReleaseAuditPanel" `
  -CommandLabel "Go to Provider Governance Release Audit" `
  -Modules @("provider-governance-release-audit-types.ts","provider-governance-release-audit-summary.ts","index.ts") `
  -Components @("ProviderGovernanceReleaseAuditPanel.tsx","index.ts") `
  -Exports @("buildProviderGovernanceReleaseAuditStableKey","buildProviderGovernanceReleaseAudit","buildProviderGovernanceReleaseAudits","buildProviderGovernanceReleaseAuditBoundary","buildProviderGovernanceReleaseAuditModel","summarizeProviderGovernanceReleaseAudit","PROVIDER_GOVERNANCE_RELEASE_AUDIT_LANGUAGE") `
  -PlainEnglish @("Provider governance release audit","Release audit does not deploy anything","Secrets are not inspected or displayed","Audit identity","Covered governance surfaces","Route readiness","Smoke readiness","Privacy readiness","Budget readiness","Audit-log readiness","Runbook readiness","Known gaps","Release decision","Ready with fixes","Handoff summary","no automatic provider send","no auto-routing","no auto-spend","no provider APIs are called","no secrets displayed","no secrets exported","no secrets inspected","no localStorage API key storage","no process.env printing","no provider registry mutation","no router config mutation from UI","no settings auto-export","no settings auto-import","no arbitrary local file browsing","no shell command execution") `
  -ExtraRoutes @("/provider-policy-bundle","/provider-runbook-generator","/local-first-router-dry-run","/provider-audit-log","/provider-settings-review")

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
  "Audit identity",
  "Covered governance surfaces",
  "Route readiness",
  "Smoke readiness",
  "Privacy readiness",
  "Budget readiness",
  "Audit-log readiness",
  "Runbook readiness",
  "Known gaps",
  "Release decision",
  "Ready with fixes",
  "Handoff summary",
  "Release audit does not deploy anything",
  "Secrets are not inspected or displayed"
)) {
  Assert-Contains $source $needle "provider governance release audit includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no deployment" = "releaseDeploymentAllowedFromUi:\s*true|deployRelease\s*\(|runDeployment\s*\(|automaticDeploymentAllowed:\s*true"
  "no provider API calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|providerApiCallsAllowedFromUi:\s*true"
  "no secrets inspected/displayed/exported" = "secretsInspectionAllowedFromUi:\s*true|secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|inspectSecrets\s*\(|displaySecrets\s*\(|localStorage\.setItem|password\s*[:=]"
  "no automatic provider send" = "sendPrompt\s*\(|sendToProvider\s*\(|automaticProviderSendAllowed:\s*true|providerSendAllowedFromUi:\s*true|promptOrFileAutoSendAllowed:\s*true"
  "no auto-routing" = "autoRoute\s*\(|autoRoute:\s*true|routeLiveTraffic\s*\(|automaticRoutingAllowed:\s*true|liveTrafficAutoRoutedAllowed:\s*true"
  "no auto-spend" = "autoSpend|spendTokens\s*\(|tokenSpendAllowedFromUi:\s*true"
  "no provider or router config mutation" = "mutateProviderRegistry\s*\(|providerRegistryMutationAllowed:\s*true|mutateRouterConfig\s*\(|routerConfigMutationAllowedFromUi:\s*true"
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
Write-Host "[OK] CodexForge Provider Governance Release Audit smoke passed."
