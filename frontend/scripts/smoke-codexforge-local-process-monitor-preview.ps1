param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-process-monitor-preview"
$route = "src\app\local-process-monitor"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Process Monitor Preview" `
  -ScriptFile "smoke-codexforge-local-process-monitor-preview.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalProcessMonitorPreviewPanel" `
  -CommandLabel "Go to Local Process Monitor Preview" `
  -Modules @("local-process-monitor-preview-types.ts","local-process-monitor-preview-summary.ts","index.ts") `
  -Components @("LocalProcessMonitorPreviewPanel.tsx","index.ts") `
  -Exports @("buildLocalProcessMonitorPreviewStableKey","buildLocalProcessMonitorPreview","buildLocalProcessMonitorPreviews","buildLocalProcessMonitorPreviewBoundary","buildLocalProcessMonitorPreviewModel","summarizeLocalProcessMonitorPreview","LOCAL_PROCESS_MONITOR_PREVIEW_LANGUAGE") `
  -PlainEnglish @("Local process monitor preview","Process data is read-only","Live monitoring remains behind approved local boundary","Cannot kill restart or mutate processes","Process group summary","Process status summary","Source capability","Read-only scope","Refresh policy","Health dependency","Permission dependency","Blocked reasons","Recovery route","Audit note","approved local boundary required","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no file mutation","no file deletion","no process kill restart mutation","no provider APIs are called","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing") `
  -ExtraRoutes @("/local-command-approval","/workspace-trust-policy","/jarvisd-health","/jarvisd-permissions","/local-bridge-health")

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
  "Local process monitor preview",
  "Process data is read-only",
  "Live monitoring remains behind approved local boundary",
  "Cannot kill restart or mutate processes",
  "Refresh policy",
  "Permission dependency",
  "approved local boundary required",
  "nothing executes from arbitrary UI"
)) {
  Assert-Contains $source $needle "local process monitor includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no polling from arbitrary UI" = "pollingFromArbitraryUiAllowed:\s*true|setInterval\s*\(|pollProcess\s*\(|refreshLoop"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no process kill/restart/mutation" = "processKillAllowedFromUi:\s*true|processRestartAllowedFromUi:\s*true|processDataMutationAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|mutateProcess\s*\(|Stop-Process"
  "no local state mutation" = "localStateMutationAllowedFromUi:\s*true|mutateLocalState\s*\("
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|providerTestsRunAutomatically"
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValuesDisplayedAllowed:\s*true"
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
Write-Host "[OK] CodexForge Local Process Monitor Preview smoke passed."
