param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\patch-apply-approval-boundary"
$route = "src\app\patch-apply-approval"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Patch Apply Approval Boundary" `
  -ScriptFile "smoke-codexforge-patch-apply-approval-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "PatchApplyApprovalBoundaryPanel" `
  -CommandLabel "Go to Patch Apply Approval Boundary" `
  -Modules @("patch-apply-approval-boundary-types.ts","patch-apply-approval-boundary-summary.ts","index.ts") `
  -Components @("PatchApplyApprovalBoundaryPanel.tsx","index.ts") `
  -Exports @("buildPatchApplyApprovalBoundaryStableKey","buildPatchApplyApproval","buildPatchApplyApprovals","buildPatchApplyApprovalBoundary","buildPatchApplyApprovalBoundaryModel","summarizePatchApplyApprovalBoundary","PATCH_APPLY_APPROVAL_BOUNDARY_LANGUAGE") `
  -PlainEnglish @("Patch apply approval boundary","Patches are not applied from this page","Applying requires explicit approval","Future execution remains behind approved local boundary","Patch identity","Preview status","File operation approval status","Workspace trust status","Risk/secrets status","Approval copy","Allowed scope","Denied scope","Rollback and recovery note","Blocked reasons","advanced approval details collapsed/secondary","approved local boundary required","nothing reads arbitrary files automatically","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no patch apply behavior","no direct Jarvisd call from arbitrary UI","no package install behavior","no provider APIs are called","no automatic provider send","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion") `
  -ExtraRoutes @("/patch-preview-workbench","/local-file-approval","/workspace-trust-policy","/jarvisd-permissions","/patch-result-capture")

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
  "Patch apply approval boundary",
  "Patches are not applied from this page",
  "Applying requires explicit approval",
  "Future execution remains behind approved local boundary",
  "Allowed scope",
  "Rollback and recovery note",
  "no direct Jarvisd call from arbitrary UI",
  "no patch apply behavior"
)) {
  Assert-Contains $source $needle "patch apply approval boundary includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenFilesAllowed:\s*true"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|applyPatchAutomatically"
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no patch apply behavior" = "patchesAppliedFromPageAllowed:\s*true|patchApplyAllowedFromUi:\s*true|patchApplicationAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no direct Jarvisd call from arbitrary UI" = "jarvisdDirectCallAllowedFromUi:\s*true|callJarvisd\s*\(|jarvisdClient\s*\.|executeJarvisdCapability\s*\("
  "no provider API calls or automatic provider send" = "providerApiCallsAllowedFromUi:\s*true|automaticProviderSendAllowed:\s*true|api\.openai|api\.anthropic|generativelanguage|sendFindingsToProvider\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
  "no localStorage API key storage" = "localStorage\.setItem|apiKeyStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|environmentValuesDisplayedAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no package install behavior" = "packageInstallAllowedFromUi:\s*true|npm\s+install|pnpm\s+add|yarn\s+add|bun\s+add|installPackage\s*\("
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}

foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  Assert-NotMatches $haystack $blockedPatterns[$name] $name
}

Assert-NotMatches $source "key=\{label\}|key=\{summary\}|key=\{item\}" "no obvious duplicate React key patterns"
Write-Host "[OK] CodexForge Patch Apply Approval Boundary smoke passed."
