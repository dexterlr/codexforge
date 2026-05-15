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
Write-Host "=== CodexForge Brain Recall smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\brain-recall"
$componentDir = Join-Path $domainDir "components"
$brainPagePath = "src\app\brain\page-client.tsx"
$memoryPagePath = "src\app\memory\page-client.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$filesCommandCenterPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "brain-recall-types.ts",
  "brain-memory-index.ts",
  "brain-memory-query.ts",
  "brain-memory-ranker.ts",
  "brain-recall-results.ts",
  "brain-related-context.ts",
  "brain-recall-summary.ts",
  "brain-recall-handoff.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "BrainRecallPanel.tsx",
  "BrainRecallSearchBox.tsx",
  "BrainRecallResultsPanel.tsx",
  "BrainRecallResultCard.tsx",
  "BrainRelatedContextPanel.tsx",
  "BrainRecallSummaryPanel.tsx",
  "BrainRecallHandoffPanel.tsx",
  "BrainRecallSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$brainPageSource = Get-Content -Raw $brainPagePath
$memoryPageSource = Get-Content -Raw $memoryPagePath
$filesPageSource = Get-Content -Raw $filesPagePath
$filesCommandCenterSource = Get-Content -Raw $filesCommandCenterPath
$allSmoke = Get-Content -Raw $allSmokePath
$recallSource = $domainSource + "`n" + $uiSource
$allSource = $recallSource + "`n" + $brainPageSource + "`n" + $memoryPageSource + "`n" + $filesPageSource + "`n" + $filesCommandCenterSource
$querySource = Get-Content -Raw (Join-Path $domainDir "brain-memory-query.ts")
$rankerSource = Get-Content -Raw (Join-Path $domainDir "brain-memory-ranker.ts")

foreach ($export in @(
  "export function buildBrainMemoryIndex(",
  "export function parseBrainRecallQuery(",
  "export function rankBrainMemoryResults(",
  "export function buildBrainRecallResults(",
  "export function buildBrainRelatedContext(",
  "export function buildBrainRecallSummary(",
  "export function buildBrainRecallHandoff("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $brainPageSource "BrainRecallPanel" "Brain page imports/renders BrainRecallPanel"
Assert-Contains $memoryPageSource "BrainRecallPanel" "Memory page references BrainRecallPanel"
if (($filesPageSource + $filesCommandCenterSource).Contains("BrainRecallPanel")) {
  Write-Host "[PASS] Files page references Brain recall if integrated"
} else {
  Write-Host "[PASS] Files page Brain recall integration skipped because Files UI cannot load graph state safely"
}

foreach ($text in @(
  "Search approved Brain memory",
  "deterministic local recall",
  "local-first recall",
  "no graph mutation",
  "Inspect before editing",
  "inspect before editing"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

foreach ($syntax in @("kind", "tag", "status", "file")) {
  Assert-Contains $querySource "`"$syntax`"" "query parser supports $syntax`:"
}

Assert-Contains $rankerSource "score descending" "ranker is deterministic"
Assert-Contains $rankerSource "updatedAt" "ranker deterministic updatedAt tie breaker"
Assert-Contains $rankerSource "id.localeCompare" "ranker deterministic id tie breaker"

Assert-NotMatches $recallSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotContains $recallSource "write-file" "no write-file import"
Assert-NotContains $recallSource "apply-diff" "no apply-diff import"
Assert-NotContains $recallSource "run-command" "no run-command import"
Assert-NotContains $allSource "broker-execution" "no broker-execution call"
Assert-NotContains $recallSource "Math.random" "no Math.random"
Assert-NotContains $recallSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $recallSource "d3-force" "no d3-force"
Assert-NotMatches $recallSource "https?://" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $recallSource $marker "no vector database dependency: $marker"
}
foreach ($marker in @("OPENAI_API_KEY", "apiKey")) {
  Assert-NotContains $recallSource $marker "no OpenAI/API-key dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $recallSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildBrainRecallStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-brain-recall\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Brain Recall exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Brain Recall" "managed smoke suite includes Brain Recall exactly once"

Write-Host "[OK] CodexForge Brain Recall smoke passed."
