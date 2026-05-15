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
Write-Host "=== CodexForge Brain Merge smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\brain-merge"
$componentDir = Join-Path $domainDir "components"
$memoryPagePath = "src\app\memory\page-client.tsx"
$brainPagePath = "src\app\brain\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "brain-merge-types.ts",
  "brain-event-loader.ts",
  "brain-merge-plan.ts",
  "brain-graph-diff.ts",
  "brain-merge-policy.ts",
  "brain-merge-validation.ts",
  "brain-merge-ledger.ts",
  "brain-merge-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "BrainMergeReviewPanel.tsx",
  "BrainEventQueuePanel.tsx",
  "BrainMergePlanPanel.tsx",
  "BrainGraphDiffPanel.tsx",
  "BrainMergePolicyPanel.tsx",
  "BrainMergeValidationPanel.tsx",
  "BrainMergeLedgerPanel.tsx",
  "BrainMergeSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$memoryPageSource = Get-Content -Raw $memoryPagePath
$brainPageSource = Get-Content -Raw $brainPagePath
$allSource = $domainSource + "`n" + $uiSource + "`n" + $memoryPageSource + "`n" + $brainPageSource
$mergeSource = $domainSource + "`n" + $uiSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export function buildBrainEventQueue(",
  "export function normalizePersistedMemoryEvent(",
  "export function summarizeBrainEventQueue(",
  "export function buildBrainMergePlan(",
  "export function buildBrainMergePlanStep(",
  "export function summarizeBrainMergePlan(",
  "export function selectBrainMergeNextAction(",
  "export function buildBrainGraphDiffPreview(",
  "export function buildBrainGraphNodeDiff(",
  "export function buildBrainGraphEdgeDiff(",
  "export function summarizeBrainGraphDiffPreview(",
  "export function buildBrainMergePolicy(",
  "export function isBrainMergeAllowed(",
  "export function summarizeBrainMergePolicy(",
  "export function validateBrainMergePlan(",
  "export function validateBrainGraphDiff(",
  "export function summarizeBrainMergeValidation(",
  "export function buildBrainMergeLedger(",
  "export function buildBrainMergeLedgerItem(",
  "export function summarizeBrainMergeLedger(",
  "export function buildBrainMergeReviewModel(",
  "export function summarizeBrainMergeReview("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $memoryPageSource "BrainMergeReviewPanel" "Memory page imports/renders BrainMergeReviewPanel"
Assert-Contains $brainPageSource "Review Brain event merge" "Brain page references merge review"

foreach ($text in @(
  "Preview only",
  "No Brain graph mutation",
  "explicit merge approval required",
  "memory.promoted",
  "graph diff preview",
  "blocked if unknown event types exist",
  "policy requires approved persisted memory events",
  "Validation detects duplicate/conflict risk"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

Assert-NotMatches $mergeSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotContains $mergeSource "write-file" "no write-file import"
Assert-NotContains $mergeSource "apply-diff" "no apply-diff import"
Assert-NotContains $mergeSource "run-command" "no run-command import"
Assert-NotContains $allSource "broker-execution" "no broker-execution call"
Assert-NotContains $mergeSource "Math.random" "no Math.random"
Assert-NotContains $mergeSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $mergeSource "d3-force" "no d3-force"
Assert-NotMatches $mergeSource "https?://" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $mergeSource $marker "no vector database dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $mergeSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildBrainMergeStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-brain-merge\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Brain Merge exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Brain Merge" "managed smoke suite includes Brain Merge exactly once"

Write-Host "[OK] CodexForge Brain Merge smoke passed."
