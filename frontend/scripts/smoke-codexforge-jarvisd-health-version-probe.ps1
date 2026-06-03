param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-health-version-probe"
$route = "src\app\jarvisd-health"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Health and Version Probe" `
  -ScriptFile "smoke-codexforge-jarvisd-health-version-probe.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdHealthVersionProbePanel" `
  -CommandLabel "Go to Jarvisd Health and Version Probe" `
  -Modules @("jarvisd-health-version-probe-types.ts","jarvisd-health-version-probe-summary.ts","index.ts") `
  -Components @("JarvisdHealthVersionProbePanel.tsx","index.ts") `
  -Exports @("buildJarvisdHealthVersionProbeStableKey","buildJarvisdHealthVersionProbe","buildJarvisdHealthVersionProbes","buildJarvisdHealthVersionProbeBoundary","buildJarvisdHealthVersionProbeModel","summarizeJarvisdHealthVersionProbe","JARVISD_HEALTH_VERSION_PROBE_LANGUAGE") `
  -PlainEnglish @("Jarvisd health and version probe","No probe runs automatically","Live probing remains behind approved local boundary","Daemon endpoint summary","Localhost-only policy","Version requirement","Health status","Timeout policy","Retry policy","Capability registry dependency","Permission boundary dependency","Audit handoff","Blocked reasons","no automatic daemon call","no raw fetch from arbitrary UI","no provider APIs are called","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no arbitrary local file browsing","no file mutation","no shell command execution") `
  -ExtraRoutes @("/jarvisd-contract","/jarvisd-capabilities","/jarvisd-permissions","/local-bridge-health","/health-probe")

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
  "Jarvisd health and version probe",
  "No probe runs automatically",
  "Live probing remains behind approved local boundary",
  "Localhost-only policy",
  "Version requirement",
  "Timeout policy",
  "Retry policy",
  "Audit handoff"
)) {
  Assert-Contains $source $needle "jarvisd health probe includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic probe" = "automaticProbeAllowed:\s*true|runHealthProbe\s*\(|executeHealthProbe\s*\(|probeJarvisd\s*\(|autoProbe"
  "no automatic daemon call" = "automaticDaemonCallAllowed:\s*true|callJarvisd\s*\(|jarvisdClient\s*\(|connectJarvisd\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true|daemonFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|providerTestsRunAutomatically"
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValueDisplayAllowed:\s*true"
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
Write-Host "[OK] CodexForge Jarvisd Health and Version Probe smoke passed."
