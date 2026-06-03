param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\test-command-planner"
$route = "src\app\test-command-planner"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Test Command Planner" `
  -ScriptFile "smoke-codexforge-test-command-planner.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "TestCommandPlannerPanel" `
  -CommandLabel "Go to Test Command Planner" `
  -Modules @("test-command-planner-types.ts","test-command-planner-summary.ts","index.ts") `
  -Components @("TestCommandPlannerPanel.tsx","index.ts") `
  -Exports @("buildTestCommandPlannerStableKey","buildTestCommandPlan","buildTestCommandPlans","buildTestCommandPlannerBoundary","buildTestCommandPlannerModel","summarizeTestCommandPlanner","TEST_COMMAND_PLANNER_LANGUAGE") `
  -PlainEnglish @("Test command planner","Test commands are not run from this page","Shell execution requires explicit approval","Env values and secrets are never displayed","Test plan identity","Source change plan / patch result","Recommended command summary","Working directory scope","Expected duration/risk","Environment/secrets safety note","Required approval","Command approval route","Execution approval route","Blocked reasons","advanced command details collapsed/secondary","approved local boundary required","tests are not run automatically","no test execution from UI","nothing reads arbitrary files automatically","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no patch apply behavior","no package install behavior","no direct Jarvisd call from arbitrary UI","no provider APIs are called","no automatic provider send","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion") `
  -ExtraRoutes @("/codebase-change-plan","/patch-preview-workbench","/patch-result-capture","/local-command-approval","/test-execution-approval")

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
  "Test command planner",
  "Test commands are not run from this page",
  "Shell execution requires explicit approval",
  "Env values and secrets are never displayed",
  "Recommended command summary",
  "Execution approval route",
  "no test execution from UI",
  "no arbitrary file read/open"
)) {
  Assert-Contains $source $needle "test command planner includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no test execution from UI" = "testsRunFromPageAllowed:\s*true|testsExecutedFromPageAllowed:\s*true|testExecutionFromUiAllowed:\s*true|runTests\s*\(|executeTests\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenFilesAllowed:\s*true"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|applyPatchAutomatically"
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no patch apply behavior" = "patchApplyAllowedFromUi:\s*true|patchApplicationAllowedFromUi:\s*true|applyPatch\s*\(|applyDiff\s*\("
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
Write-Host "[OK] CodexForge Test Command Planner smoke passed."
