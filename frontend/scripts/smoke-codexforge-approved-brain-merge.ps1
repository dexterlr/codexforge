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
Write-Host "=== CodexForge Approved Brain Merge smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\approved-brain-merge"
$componentDir = Join-Path $domainDir "components"
$memoryPagePath = "src\app\memory\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "approved-brain-merge-types.ts",
  "approved-merge-policy.ts",
  "approved-merge-request.ts",
  "approved-merge-executor.ts",
  "approved-merge-rollback.ts",
  "approved-merge-ledger.ts",
  "approved-merge-validation.ts",
  "approved-merge-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ApprovedBrainMergePanel.tsx",
  "ApprovedMergeRequestPanel.tsx",
  "ApprovedMergePolicyPanel.tsx",
  "ApprovedMergeValidationPanel.tsx",
  "ApprovedMergeExecutorPanel.tsx",
  "ApprovedMergeLedgerPanel.tsx",
  "ApprovedMergeRollbackPanel.tsx",
  "ApprovedMergeSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$memoryPageSource = Get-Content -Raw $memoryPagePath
$allSmoke = Get-Content -Raw $allSmokePath
$mergeSource = $domainSource + "`n" + $uiSource
$allSource = $mergeSource + "`n" + $memoryPageSource
$executorSource = Get-Content -Raw (Join-Path $domainDir "approved-merge-executor.ts")
$policySource = Get-Content -Raw (Join-Path $domainDir "approved-merge-policy.ts")
$validationSource = Get-Content -Raw (Join-Path $domainDir "approved-merge-validation.ts")

foreach ($export in @(
  "export function buildApprovedBrainMergePolicy(",
  "export function isApprovedBrainMergeAllowed(",
  "export function summarizeApprovedBrainMergePolicy(",
  "export function buildApprovedBrainMergeRequest(",
  "export function validateApprovedBrainMergeRequest(",
  "export function summarizeApprovedBrainMergeRequest(",
  "export function applyApprovedBrainGraphMerge(",
  "export function mergeBrainGraphNodes(",
  "export function mergeBrainGraphEdges(",
  "export function summarizeApprovedBrainGraphMerge(",
  "export function buildApprovedMergeRollbackPlan(",
  "export function summarizeApprovedMergeRollbackPlan(",
  "export function buildApprovedMergeLedger(",
  "export function buildApprovedMergeLedgerItem(",
  "export function summarizeApprovedMergeLedger(",
  "export function validateApprovedBrainMerge(",
  "export function validateApprovedBrainGraphResult(",
  "export function summarizeApprovedMergeValidation(",
  "export function summarizeApprovedBrainGraph("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $memoryPageSource "ApprovedBrainMergePanel" "Memory page imports/renders ApprovedBrainMergePanel"

foreach ($text in @(
  "explicit merge approval required",
  "no auto-merge",
  "before/after summary",
  "rollback plan",
  "canonical graph schema",
  "policy blocks unknown event types",
  "policy requires graph diff preview",
  "validation detects duplicate/conflict risk"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

Assert-Contains $executorSource "CODEXFORGE_BRAIN_GRAPH_VERSION" "executor uses canonical graph types"
Assert-Contains $executorSource "does not persist directly" "executor does not persist directly"
Assert-Contains $executorSource "preserve existing graph nodes" "executor preserves existing graph nodes"
Assert-Contains $executorSource "dedupes nodes/edges" "executor dedupes nodes/edges"
Assert-Contains $policySource "policy blocks unknown event types" "policy blocks unknown event types"
Assert-Contains $policySource "policy requires graph diff preview" "policy requires graph diff preview"
Assert-Contains $validationSource "duplicate/conflict risk" "validation detects duplicate/conflict risk"

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
Assert-Contains $domainSource "buildApprovedBrainMergeStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-approved-brain-merge\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Approved Brain Merge exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Approved Brain Merge" "managed smoke suite includes Approved Brain Merge exactly once"

Write-Host "[OK] CodexForge Approved Brain Merge smoke passed."
