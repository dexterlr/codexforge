param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-workspace-trust-policy"
$route = "src\app\workspace-trust-policy"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Workspace Trust Policy" `
  -ScriptFile "smoke-codexforge-local-workspace-trust-policy.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalWorkspaceTrustPolicyPanel" `
  -CommandLabel "Go to Local Workspace Trust Policy" `
  -Modules @("local-workspace-trust-policy-types.ts","local-workspace-trust-policy-summary.ts","index.ts") `
  -Components @("LocalWorkspaceTrustPolicyPanel.tsx","index.ts") `
  -Exports @("buildLocalWorkspaceTrustPolicyStableKey","buildLocalWorkspaceTrustPolicy","buildLocalWorkspaceTrustPolicies","buildLocalWorkspaceTrustPolicyBoundary","buildLocalWorkspaceTrustPolicyModel","summarizeLocalWorkspaceTrustPolicy","LOCAL_WORKSPACE_TRUST_POLICY_LANGUAGE") `
  -PlainEnglish @("Local workspace trust policy","Trust policy does not grant permissions automatically","Workspace trust must be reviewed before local actions","Secrets are not inspected or displayed","Workspace identity","Trust status","Allowed roots summary","Denied roots summary","Capability scope","File operation policy","Command execution policy","Process monitor policy","Audit requirement","Revocation guidance","Blocked reasons","approved local boundary required","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no file mutation","no file deletion","no process kill restart mutation","no provider APIs are called","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing") `
  -ExtraRoutes @("/local-file-approval","/local-command-approval","/local-process-monitor","/jarvisd-permissions","/provider-governance-release-audit")

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
  "Local workspace trust policy",
  "Trust policy does not grant permissions automatically",
  "Workspace trust must be reviewed before local actions",
  "Secrets are not inspected or displayed",
  "Allowed roots summary",
  "Revocation guidance",
  "approved local boundary required",
  "nothing executes from arbitrary UI"
)) {
  Assert-Contains $source $needle "local workspace trust includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic permission grant" = "trustGrantsPermissionsAutomatically:\s*true|grantPermission\s*\(|autoGrant"
  "no automatic local action" = "localActionsWithoutReviewAllowed:\s*true|automaticLocalActionAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryFileBrowsingAllowed:\s*true|input\s+type=.*file"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|deleteFile\s*\(|unlink\s*\(|mutateFiles\s*\("
  "no process kill/restart/mutation" = "processMutationAllowedFromUi:\s*true|processKillAllowedFromUi:\s*true|processRestartAllowedFromUi:\s*true|killProcess\s*\(|restartProcess\s*\(|Stop-Process"
  "no provider API calls" = "providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|providerTestsRunAutomatically"
  "no secrets inspected/displayed/exported/included" = "secretsInspectedAllowed:\s*true|secretsDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]"
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
Write-Host "[OK] CodexForge Local Workspace Trust Policy smoke passed."
