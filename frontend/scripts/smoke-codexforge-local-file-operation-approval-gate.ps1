param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-file-operation-approval-gate"
$route = "src\app\local-file-approval"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local File Operation Approval Gate" `
  -ScriptFile "smoke-codexforge-local-file-operation-approval-gate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalFileOperationApprovalGatePanel" `
  -CommandLabel "Go to Local File Operation Approval Gate" `
  -Modules @("local-file-operation-approval-gate-types.ts","local-file-operation-approval-gate-summary.ts","index.ts") `
  -Components @("LocalFileOperationApprovalGatePanel.tsx","index.ts") `
  -Exports @("buildLocalFileOperationApprovalGateStableKey","buildLocalFileOperationApproval","buildLocalFileOperationApprovals","buildLocalFileOperationApprovalBoundary","buildLocalFileOperationApprovalGateModel","summarizeLocalFileOperationApprovalGate","LOCAL_FILE_OPERATION_APPROVAL_GATE_LANGUAGE") `
  -PlainEnglish @("Local file operation approval gate","No file operation runs automatically","Arbitrary local browsing is not allowed","Delete requests require separate explicit review","Operation identity","Operation type","Target scope summary","Allowed scope","Denied scope","Risk level","Approval copy","Audit note","Rollback and recovery note","Blocked reasons","approved local boundary required","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no arbitrary local file browsing","no file mutation","no file deletion","no provider APIs are called","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing") `
  -ExtraRoutes @("/local-command-approval","/workspace-trust-policy","/jarvisd-permissions","/jarvisd-capabilities","/local-bridge-health")

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
  "Local file operation approval gate",
  "No file operation runs automatically",
  "Arbitrary local browsing is not allowed",
  "Delete requests require separate explicit review",
  "Allowed scope",
  "Rollback and recovery note",
  "approved local boundary required",
  "nothing executes from arbitrary UI"
)) {
  Assert-Contains $source $needle "local file approval includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "fileOperationAutoRunAllowed:\s*true|automaticLocalActionAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|applyPatchAutomatically"
  "no file deletion" = "deleteRequestPerformedHereAllowed:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
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
Write-Host "[OK] CodexForge Local File Operation Approval Gate smoke passed."
