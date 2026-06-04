param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\file-operation-result-capture"
$route = "src\app\file-operation-result"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "File Operation Result Capture" `
  -ScriptFile "smoke-codexforge-file-operation-result-capture.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FileOperationResultCapturePanel" `
  -CommandLabel "Go to File Operation Result" `
  -Modules @("file-operation-result-capture-types.ts","file-operation-result-capture-summary.ts","index.ts") `
  -Components @("FileOperationResultCapturePanel.tsx","index.ts") `
  -Exports @("buildFileOperationResultCaptureStableKey","buildFileOperationResult","buildFileOperationResults","buildFileOperationResultCaptureBoundary","buildFileOperationResultCaptureModel","summarizeFileOperationResultCapture","FILE_OPERATION_RESULT_CAPTURE_LANGUAGE") `
  -PlainEnglish @("File operation result capture","Results are reviewed before promotion","Failed operations are retained for recovery","Memory is not auto-promoted","Affected files summary","Review inbox handoff","Result identity","Source trial gate","Operation status","Validation summary","Risk/secrets follow-up","Rollback status","Recovery route","Blocked reasons","advanced result details collapsed/secondary","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no direct Jarvisd call from arbitrary UI","no Jarvisd capability execution from UI","no daemon process creation from frontend","no browser-stored signing secrets","no session token localStorage storage","no arbitrary local file browsing","no arbitrary file read/open","no auto-open local files","no file mutation","no file write","no file deletion","no patch apply behavior","no secret value display","no automatic provider send","no provider APIs are called","no GitHub API calls from UI","no localStorage API key storage","no process.env printing","no audit log mutation from UI","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no package install behavior") `
  -ExtraRoutes @("/file-write-patch-trial","/review-inbox","/file-operation-recovery","/validation-results","/run-history")

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
  "File operation result capture",
  "Results are reviewed before promotion",
  "Failed operations are retained for recovery",
  "Memory is not auto-promoted",
  "Affected files summary",
  "Review inbox handoff"
)) {
  Assert-Contains $source $needle "file operation result includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no Jarvisd capability execution from UI" = "jarvisdCapabilityExecutionAllowedFromUi:\s*true|jarvisdDirectCallAllowedFromUi:\s*true|executeJarvisdCapability\s*\(|runJarvisdCapability\s*\("
  "no daemon process creation from frontend" = "daemonProcessCreationAllowedFromFrontend:\s*true|createDaemon\s*\(|startDaemon\s*\(|listen\s*\("
  "no browser-stored signing secrets or session tokens" = "signingMaterialStorageAllowedInBrowser:\s*true|sessionTokenStorageAllowedInBrowser:\s*true|localStorage\.setItem"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true"
  "no auto-open local files" = "autoOpenLocalFilesAllowed:\s*true|autoOpenLocalFile\s*\(|openLocalFile\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\("
  "no file write" = "fileWriteAllowedFromUi:\s*true|writeFile\s*\("
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
  "no secret value display" = "secretValuesDisplayedAllowed:\s*true|secretsDisplayedAllowed:\s*true|displaySecrets\s*\(|exportSecrets\s*\(|rawSecretDisplayAllowed:\s*true"
  "no automatic provider send or provider APIs" = "automaticProviderSendAllowed:\s*true|providerApiCallsAllowedFromUi:\s*true|api\.openai|api\.anthropic|generativelanguage|sendToProvider\s*\("
  "no GitHub API calls from UI" = "githubApiCallsAllowedFromUi:\s*true|api\.github\.com|Octokit"
  "no localStorage API key storage" = "apiKeyLocalStorageAllowed:\s*true|localStorageApiKeyStorageAllowed:\s*true|localStorage\.setItem"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+|processEnvDisplayAllowed:\s*true"
  "no audit mutation or appendEvent" = "auditLogMutationAllowedFromUi:\s*true|appendEventAllowedFromUi:\s*true|appendEvent\s*\(|mutateAuditLog\s*\("
  "no direct saveBrainGraph or graph mutation" = "saveBrainGraph\s*\(|saveBrainGraphAllowedFromUi:\s*true|mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
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
Write-Host "[OK] CodexForge File Operation Result Capture smoke passed."
