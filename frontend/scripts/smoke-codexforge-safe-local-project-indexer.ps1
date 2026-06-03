param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\safe-local-project-indexer"
$route = "src\app\safe-project-indexer"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Safe Local Project Indexer" `
  -ScriptFile "smoke-codexforge-safe-local-project-indexer.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "SafeLocalProjectIndexerPanel" `
  -CommandLabel "Go to Safe Local Project Indexer" `
  -Modules @("safe-local-project-indexer-types.ts","safe-local-project-indexer-summary.ts","index.ts") `
  -Components @("SafeLocalProjectIndexerPanel.tsx","index.ts") `
  -Exports @("buildSafeLocalProjectIndexerStableKey","buildSafeLocalProjectIndex","buildSafeLocalProjectIndexes","buildSafeLocalProjectIndexerBoundary","buildSafeLocalProjectIndexerModel","summarizeSafeLocalProjectIndexer","SAFE_LOCAL_PROJECT_INDEXER_LANGUAGE") `
  -PlainEnglish @("Safe local project indexer","Indexing remains behind approved local boundary","Arbitrary local file crawling is not allowed","Secrets are not read or displayed","Project identity","Trusted workspace status","Allowed roots summary","Denied roots summary","Index scope","File type summary","Excluded paths summary","Privacy/secrets policy","Audit note","Blocked reasons","approved local boundary required","nothing reads arbitrary files automatically","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no package install behavior","no provider APIs are called","no automatic provider send","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing") `
  -ExtraRoutes @("/workspace-trust-policy","/local-file-approval","/jarvisd-permissions","/project-file-search","/project-risk-secrets-scan")

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
  "Safe local project indexer",
  "Indexing remains behind approved local boundary",
  "Arbitrary local file crawling is not allowed",
  "Secrets are not read or displayed",
  "Allowed roots summary",
  "Excluded paths summary",
  "approved local boundary required",
  "nothing reads arbitrary files automatically"
)) {
  Assert-Contains $source $needle "safe local project indexer includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|arbitraryLocalFileCrawlingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenFilesAllowed:\s*true"
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|applyPatchAutomatically"
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no direct Jarvisd call from arbitrary UI" = "callJarvisd\s*\(|jarvisdClient\s*\.|executeJarvisdCapability\s*\("
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
Write-Host "[OK] CodexForge Safe Local Project Indexer smoke passed."
