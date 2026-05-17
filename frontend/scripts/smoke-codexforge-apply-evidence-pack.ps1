param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Apply Evidence Pack smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\apply-evidence-pack"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$groupSuitePaths = @(
  "scripts\smoke-codexforge-core.ps1",
  "scripts\smoke-codexforge-ui.ps1",
  "scripts\smoke-codexforge-brain-suite.ps1",
  "scripts\smoke-codexforge-memory-suite.ps1",
  "scripts\smoke-codexforge-files-suite.ps1",
  "scripts\smoke-codexforge-execution-suite.ps1",
  "scripts\smoke-codexforge-artifacts-suite.ps1",
  "scripts\smoke-codexforge-creative-suite.ps1"
)

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "apply-evidence-pack-types.ts",
  "apply-evidence-input.ts",
  "apply-evidence-current-file.ts",
  "apply-evidence-risk.ts",
  "apply-evidence-tests.ts",
  "apply-evidence-rollback.ts",
  "apply-evidence-approval.ts",
  "apply-evidence-firewall.ts",
  "apply-evidence-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ApplyEvidencePackPanel.tsx",
  "ApplyEvidenceInputPanel.tsx",
  "CurrentFileVerificationPanel.tsx",
  "ApplyEvidenceRiskPanel.tsx",
  "ApplyEvidenceTestPlanPanel.tsx",
  "ApplyEvidenceRollbackPanel.tsx",
  "ApplyEvidenceApprovalPanel.tsx",
  "ApplyEvidenceFirewallPanel.tsx",
  "ApplyEvidenceSummaryPanel.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $aiPagePath
Assert-FileExists $filesPagePath
Assert-FileExists $allSmokePath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = if (Test-Path $tasksPagePath) { Get-Content -Raw $tasksPagePath } else { "" }
$missionSource = if (Test-Path $missionDir) { (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n" } else { "" }
$allSmoke = Get-Content -Raw $allSmokePath
$groupSources = ($groupSuitePaths | ForEach-Object {
  Assert-FileExists $_
  Get-Content -Raw $_
}) -join "`n"
$allSource = $domainSource + "`n" + $uiSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $missionSource

foreach ($export in @(
  "buildApplyEvidencePack",
  "validateApplyEvidencePack",
  "summarizeApplyEvidencePack",
  "buildApplyEvidenceInput",
  "verifyApplyEvidenceCurrentFile",
  "buildApplyEvidenceRisk",
  "buildApplyEvidenceTestPlan",
  "buildApplyEvidenceRollbackPlan",
  "buildApplyEvidenceApproval",
  "buildApplyEvidenceFirewall",
  "buildApplyEvidenceSummary",
  "buildApplyEvidencePackStableKey"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

foreach ($render in @(
  "ApplyEvidencePackPanel renders",
  "ApplyEvidenceInputPanel renders",
  "CurrentFileVerificationPanel renders",
  "ApplyEvidenceRiskPanel renders",
  "ApplyEvidenceTestPlanPanel renders",
  "ApplyEvidenceRollbackPanel renders",
  "ApplyEvidenceApprovalPanel renders",
  "ApplyEvidenceFirewallPanel renders",
  "ApplyEvidenceSummaryPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $aiSource "ApplyEvidencePackPanel" "/ai imports/renders ApplyEvidencePackPanel"
Assert-Contains $filesSource "Apply Evidence Pack" "/files references Apply Evidence Pack"
if (Test-Path $tasksPagePath) {
  Assert-Contains $tasksSource "Apply Evidence Pack" "/tasks references Apply Evidence Pack"
}
if (Test-Path $missionDir) {
  Assert-Contains $missionSource "Apply Evidence Pack readiness" "Mission Control includes Apply Evidence Pack readiness"
}

foreach ($text in @(
  "evidence pack does not apply changes",
  "future guarded apply only",
  "current file verification required",
  "rollback plan required",
  "test plan required",
  "operator approval note required",
  "mutation firewall active"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-NotMatches $allSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $allSource "apply-diff\s*\(" "no apply-diff call"
Assert-NotMatches $allSource "write-file\s*\(" "no write-file call"
Assert-NotMatches $allSource "run-command\s*\(" "no run-command call"
Assert-NotMatches $allSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $allSource "Math.random" "no Math.random"
Assert-NotContains $allSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $allSource "d3-force" "no d3-force"
Assert-NotMatches $allSource "https?://" "no external network URL dependency"
Assert-NotContains $allSource "fetch(" "no fetch dependency"
Assert-NotContains $allSource "XMLHttpRequest" "no XMLHttpRequest dependency"
Assert-NotContains $allSource "axios" "no axios dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $allSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $allSource $marker "no OpenAI/API-key dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0x00E2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildApplyEvidencePackStableKey" "stable key helper exists"

$groupApplyEvidenceMatches = [regex]::Matches($groupSources, "smoke-codexforge-apply-evidence-pack\.ps1")
if ($groupApplyEvidenceMatches.Count -ne 1) {
  throw "[FAIL] Grouped smoke suites must include Apply Evidence Pack exactly once; found $($groupApplyEvidenceMatches.Count)."
}
Write-Host "[PASS] grouped smoke suites include Apply Evidence Pack exactly once"

foreach ($groupFile in @(
  "smoke-codexforge-core.ps1",
  "smoke-codexforge-ui.ps1",
  "smoke-codexforge-brain-suite.ps1",
  "smoke-codexforge-memory-suite.ps1",
  "smoke-codexforge-files-suite.ps1",
  "smoke-codexforge-execution-suite.ps1",
  "smoke-codexforge-artifacts-suite.ps1",
  "smoke-codexforge-creative-suite.ps1"
)) {
  $matches = [regex]::Matches($allSmoke, [regex]::Escape($groupFile))
  if ($matches.Count -ne 1) {
    throw "[FAIL] all-smoke must include grouped suite $groupFile exactly once; found $($matches.Count)."
  }
  Write-Host "[PASS] all-smoke includes grouped suite $groupFile exactly once"
}

Write-Host "[OK] CodexForge Apply Evidence Pack smoke passed."
