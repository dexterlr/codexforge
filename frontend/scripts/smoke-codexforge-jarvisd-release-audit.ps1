param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-release-audit"
$route = "src\app\jarvisd-release-audit"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Release Audit" `
  -ScriptFile "smoke-codexforge-jarvisd-release-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdReleaseAuditPanel" `
  -CommandLabel "Go to Jarvisd Release Audit" `
  -Modules @("jarvisd-release-audit-types.ts","jarvisd-release-audit-summary.ts","index.ts") `
  -Components @("JarvisdReleaseAuditPanel.tsx","index.ts") `
  -Exports @("buildJarvisdReleaseAuditStableKey","buildJarvisdReleaseAudit","buildJarvisdReleaseAudits","buildJarvisdReleaseAuditBoundary","buildJarvisdReleaseAuditModel","summarizeJarvisdReleaseAudit","JARVISD_RELEASE_AUDIT_LANGUAGE") `
  -PlainEnglish @("Jarvisd release audit","Release audit does not deploy Jarvisd","No daemon action runs from this page","Secrets are not inspected or displayed","Release audit identity","Covered Jarvisd surfaces","Contract readiness","Health/version readiness","Capability registry readiness","Permission boundary readiness","Audit log readiness","Recovery readiness","Settings review readiness","Known gaps","Release decision","Next recommended route","Jarvisd actions are not executed from arbitrary UI","Approved local boundary required","no command execution","no local state mutation","no arbitrary local file browsing","no secrets inspected","no secrets displayed","no settings auto-import","no settings auto-export","no package install behavior") `
  -ExtraRoutes @("/jarvisd-contract","/jarvisd-health","/jarvisd-capabilities","/jarvisd-audit-log","/jarvisd-recovery-console","/jarvisd-settings-review")

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
  "Jarvisd release audit",
  "Release audit does not deploy Jarvisd",
  "No daemon action runs from this page",
  "Secrets are not inspected or displayed",
  "Release audit identity",
  "Covered Jarvisd surfaces",
  "Contract readiness",
  "Health/version readiness",
  "Capability registry readiness",
  "Permission boundary readiness",
  "Audit log readiness",
  "Recovery readiness",
  "Settings review readiness",
  "Known gaps",
  "Release decision",
  "Next recommended route"
)) {
  Assert-Contains $source $needle "jarvisd release audit includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no Jarvisd deployment" = "jarvisdDeploymentAllowedFromUi:\s*true|deployJarvisd\s*\(|deployRelease\s*\(|runDeployment\s*\("
  "no daemon action or direct call" = "daemonActionAllowedFromUi:\s*true|jarvisdDirectCallAllowedFromUi:\s*true|callJarvisd\s*\(|jarvisdClient\s*\(|connectJarvisd\s*\("
  "no Jarvisd capability execution" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no local state or file mutation" = "localStateMutationAllowedFromUi:\s*true|mutateLocalState\s*\(|fileMutationAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\("
  "no arbitrary local file browsing or read/open" = "showOpenFilePicker|browseLocalFiles\s*\(|readFile\s*\(|openFile\s*\(|arbitraryFileBrowsingAllowed:\s*true|arbitraryFileReadOpenAllowed:\s*true|input\s+type=.*file"
  "no secrets inspected/displayed/exported" = "secretsInspectionAllowedFromUi:\s*true|secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|inspectSecrets\s*\(|displaySecrets\s*\(|localStorage\.setItem|password\s*[:=]|token\s*[:=]|secret\s*[:=]"
  "no provider or GitHub API calls" = "providerApiCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|fetch\s*\(|XMLHttpRequest|axios|api\.openai|api\.anthropic|generativelanguage|api\.github\.com|Octokit"
  "no settings auto-export/import" = "settingsAutoExportAllowed:\s*true|settingsAutoImportAllowed:\s*true|autoExportSettings|autoImportSettings|importSettingsAutomatically|applyImportedSettings\s*\("
  "no provider registry mutation" = "providerRegistryMutationAllowed:\s*true|mutateProviderRegistry\s*\("
  "no auto-routing or auto-spend" = "automaticRoutingAllowed:\s*true|tokenSpendAllowedFromUi:\s*true|autoRoute\s*\(|routeLiveTraffic\s*\(|autoSpend|spendTokens\s*\("
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValueDisplayAllowed:\s*true|envValueDisplayAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no package install behavior" = "npm\s+install|pnpm\s+add|yarn\s+add|packageInstallAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Jarvisd Release Audit smoke passed."
