param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\project-risk-secrets-scanner"
$route = "src\app\project-risk-secrets-scan"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Project Risk Secrets Scanner" `
  -ScriptFile "smoke-codexforge-project-risk-secrets-scanner.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProjectRiskSecretsScannerPanel" `
  -CommandLabel "Go to Project Risk Secrets Scanner" `
  -Modules @("project-risk-secrets-scanner-types.ts","project-risk-secrets-scanner-summary.ts","index.ts") `
  -Components @("ProjectRiskSecretsScannerPanel.tsx","index.ts") `
  -Exports @("buildProjectRiskSecretsScannerStableKey","buildProjectRiskSecretsScan","buildProjectRiskSecretsScans","buildProjectRiskSecretsScannerBoundary","buildProjectRiskSecretsScannerModel","summarizeProjectRiskSecretsScanner","PROJECT_RISK_SECRETS_SCANNER_LANGUAGE") `
  -PlainEnglish @("Project risk secrets scanner","Suspected secrets are redacted","Scanning remains behind approved local boundary","Arbitrary local scanning is not allowed","Do not display secret values","Scan scope summary","Trusted workspace dependency","Risk categories","Suspected secret indicator","Redaction status","Severity","Recommended action","Approval route","Audit note","Blocked reasons","approved local boundary required","nothing reads arbitrary files automatically","nothing executes from arbitrary UI","no automatic local action","no raw fetch from arbitrary UI","no command execution","no shell command execution","no arbitrary local file browsing","no arbitrary file read/open","no file mutation","no file deletion","no package install behavior","no provider APIs are called","no automatic provider send","no secrets displayed","no secrets exported","no secrets included","no localStorage API key storage","no process.env printing") `
  -ExtraRoutes @("/safe-project-indexer","/project-file-search","/project-dependency-map","/local-file-approval","/local-command-approval")

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
  "Project risk secrets scanner",
  "Suspected secrets are redacted",
  "Scanning remains behind approved local boundary",
  "Arbitrary local scanning is not allowed",
  "Do not display secret values",
  "Recommended action",
  "approved local boundary required",
  "no automatic provider send"
)) {
  Assert-Contains $source $needle "project risk secrets scanner includes $needle"
}

$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now for deterministic layout/ids", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no automatic local action" = "automaticLocalActionAllowed:\s*true|localActionsWithoutReviewAllowed:\s*true|executeLocalAction\s*\(|runLocalAction\s*\("
  "no raw fetch from arbitrary UI" = "fetch\s*\(|XMLHttpRequest|axios|rawFetchAllowedFromUi:\s*true"
  "no command execution" = "commandExecutionAllowedFromUi:\s*true|shellExecutionAllowedFromUi:\s*true|child_process|execSync|spawn\s*\(|runCommand\s*\(|brokerExecution\s*\(|Start-Process|Invoke-Expression"
  "no arbitrary local file browsing" = "showOpenFilePicker|browseLocalFiles\s*\(|arbitraryLocalBrowsingAllowed:\s*true|input\s+type=.*file"
  "no arbitrary file read/open" = "readFile\s*\(|openFile\s*\(|arbitraryFileReadOpenAllowed:\s*true|autoOpenFilesAllowed:\s*true"
  "no arbitrary local scanning" = "arbitraryLocalScanningAllowed:\s*true|scanArbitraryLocalFiles\s*\(|scanLocalMachine\s*\("
  "no file mutation" = "fileMutationAllowedFromUi:\s*true|writeFile\s*\(|mutateFiles\s*\(|applyPatchAutomatically"
  "no file deletion" = "fileDeletionAllowedFromUi:\s*true|deleteFile\s*\(|unlink\s*\(|Remove-Item"
  "no provider API calls or automatic provider send" = "providerApiCallsAllowedFromUi:\s*true|automaticProviderSendAllowed:\s*true|api\.openai|api\.anthropic|generativelanguage|sendFindingsToProvider\s*\("
  "no secrets displayed/exported/included" = "secretsDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretValuesDisplayedAllowed:\s*true|secretsExportedAllowed:\s*true|secretsIncludedAllowed:\s*true|localStorage\.setItem|password\s*[:=]|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}"
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
Write-Host "[OK] CodexForge Project Risk Secrets Scanner smoke passed."
