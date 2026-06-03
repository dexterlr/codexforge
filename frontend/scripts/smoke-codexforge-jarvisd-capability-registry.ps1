param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\jarvisd-capability-registry"
$route = "src\app\jarvisd-capabilities"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Jarvisd Capability Registry" `
  -ScriptFile "smoke-codexforge-jarvisd-capability-registry.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "JarvisdCapabilityRegistryPanel" `
  -CommandLabel "Go to Jarvisd Capability Registry" `
  -Modules @("jarvisd-capability-registry-types.ts","jarvisd-capability-registry-summary.ts","index.ts") `
  -Components @("JarvisdCapabilityRegistryPanel.tsx","index.ts") `
  -Exports @("buildJarvisdCapabilityRegistryStableKey","buildJarvisdCapabilityRegistryItem","buildJarvisdCapabilityRegistryItems","buildJarvisdCapabilityRegistryBoundary","buildJarvisdCapabilityRegistryModel","summarizeJarvisdCapabilityRegistry","JARVISD_CAPABILITY_REGISTRY_LANGUAGE") `
  -PlainEnglish @("Jarvisd capability registry","Capabilities are not executed from this page","Disabled capabilities stay blocked","Capability identity","Capability category","Permission required","Local-only status","Risk level","Audit requirement","Disabled/blocked reason","Health dependency","Permission boundary route","Runbook handoff","project index read","file read preview","command plan preview","process status read","local model status read","artifact capture read","no automatic daemon call","no raw fetch from arbitrary UI","no provider APIs are called","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no arbitrary local file browsing","no file mutation","no shell command execution") `
  -ExtraRoutes @("/jarvisd-contract","/jarvisd-health","/jarvisd-permissions","/provider-runbook-generator","/capabilities")

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
  "Jarvisd capability registry",
  "Capabilities are not executed from this page",
  "Disabled capabilities stay blocked",
  "Permission required",
  "Local-only status",
  "Audit requirement",
  "project index read",
  "file read preview",
  "command plan preview",
  "process status read",
  "local model status read",
  "artifact capture read"
)) {
  Assert-Contains $source $needle "jarvisd capability registry includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no capability execution" = "capabilityExecutionAllowedFromUi:\s*true|disabledCapabilityExecutionAllowed:\s*true|executeCapability\s*\(|runCapability\s*\("
  "no automatic daemon call" = "automaticDaemonCallAllowed:\s*true|callJarvisd\s*\(|jarvisdClient\s*\(|connectJarvisd\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true|daemonFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|providerTestsRunAutomatically"
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValueDisplayAllowed:\s*true"
  "no provider registry/router mutation" = "providerRegistryMutationAllowed:\s*true|routerPolicyMutationAllowed:\s*true|mutateProviderRegistry\s*\(|applyRouterPolicy\s*\("
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
Write-Host "[OK] CodexForge Jarvisd Capability Registry smoke passed."
