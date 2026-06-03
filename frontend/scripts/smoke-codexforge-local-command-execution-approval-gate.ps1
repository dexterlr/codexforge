param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-command-execution-approval-gate"
$route = "src\app\local-command-approval"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Command Execution Approval Gate" `
  -ScriptFile "smoke-codexforge-local-command-execution-approval-gate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalCommandExecutionApprovalGatePanel" `
  -CommandLabel "Go to Local Command Execution Approval Gate" `
  -Modules @("local-command-execution-approval-gate-types.ts","local-command-execution-approval-gate-summary.ts","index.ts") `
  -Components @("LocalCommandExecutionApprovalGatePanel.tsx","index.ts") `
  -Exports @("buildLocalCommandExecutionApprovalGateStableKey","buildLocalCommandExecutionApproval","buildLocalCommandExecutionApprovals","buildLocalCommandExecutionApprovalBoundary","buildLocalCommandExecutionApprovalGateModel","summarizeLocalCommandExecutionApprovalGate","LOCAL_COMMAND_EXECUTION_APPROVAL_GATE_LANGUAGE") `
  -PlainEnglish @("Local command execution approval gate","Commands are not executed from this page","Shell execution requires explicit approval","Env values and secrets are never displayed","Command identity","Command intent","Command preview text","Working directory scope","Allowed scope","Denied scope","Risk level","Environment and secrets safety note","Approval copy","Audit note","Blocked reasons","approved local boundary required","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no file mutation","no file deletion","no provider APIs are called","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing") `
  -ExtraRoutes @("/local-file-approval","/local-process-monitor","/workspace-trust-policy","/jarvisd-permissions","/runbook")

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
  "Local command execution approval gate",
  "Commands are not executed from this page",
  "Shell execution requires explicit approval",
  "Env values and secrets are never displayed",
  "Working directory scope",
  "Approval copy",
  "approved local boundary required",
  "nothing executes from arbitrary UI"
)) {
  Assert-Contains $source $needle "local command approval includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromPage:\s*true|commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no local executor APIs" = "runCommandCallAllowedFromUi:\s*true|brokerExecutionCallAllowedFromUi:\s*true|localExecutorApiCallAllowedFromUi:\s*true|localExecutorApi\s*\("
  "no shell execution without approval" = "shellExecutionWithoutApprovalAllowed:\s*true|executeShell\s*\(|shellExecute\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no process kill/restart/mutation" = "processKillAllowedFromUi:\s*true|processRestartAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|Stop-Process"
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
Write-Host "[OK] CodexForge Local Command Execution Approval Gate smoke passed."
