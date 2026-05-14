param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack -notmatch $Pattern) {
    throw "[FAIL] Missing expected $Name pattern: $Pattern"
  }

  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge brain memory ingestion smoke ==="
Write-Host "Base URL: $BaseUrl"

$ingestionDir = "src\lib\codexforge\brain\runtime\ingestion"
$pageClientPath = "src\app\brain\page-client.tsx"
$runtimeIndexPath = "src\lib\codexforge\brain\runtime\index.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$requiredFiles = @(
  "brain-memory-ingestion-types.ts",
  "brain-memory-ids.ts",
  "brain-memory-dedupe.ts",
  "brain-memory-sources.ts",
  "brain-memory-ingestion.ts",
  "index.ts"
)

if (-not (Test-Path $ingestionDir -PathType Container)) {
  throw "[FAIL] Missing ingestion directory: $ingestionDir"
}

Write-Host "[PASS] ingestion directory exists"

foreach ($file in $requiredFiles) {
  Assert-FileExists (Join-Path $ingestionDir $file)
}

Assert-FileExists $pageClientPath
Assert-FileExists $runtimeIndexPath
Assert-FileExists $allSmokePath

$indexSource = Get-Content -Raw (Join-Path $ingestionDir "index.ts")
$ingestionSource = Get-Content -Raw (Join-Path $ingestionDir "brain-memory-ingestion.ts")
$sourceSource = Get-Content -Raw (Join-Path $ingestionDir "brain-memory-sources.ts")
$idsSource = Get-Content -Raw (Join-Path $ingestionDir "brain-memory-ids.ts")
$dedupeSource = Get-Content -Raw (Join-Path $ingestionDir "brain-memory-dedupe.ts")
$typesSource = Get-Content -Raw (Join-Path $ingestionDir "brain-memory-ingestion-types.ts")
$runtimeIndexSource = Get-Content -Raw $runtimeIndexPath
$pageSource = Get-Content -Raw $pageClientPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$allIngestionSource = ($requiredFiles | ForEach-Object {
  Get-Content -Raw (Join-Path $ingestionDir $_)
}) -join "`n"

foreach ($apiName in @(
  "buildBrainMemoryIngestionPlan",
  "buildBrainMemorySeedGraph",
  "mergeBrainMemoryIngestion",
  "summarizeBrainMemoryIngestion",
  "buildBrainMemorySourceNodes",
  "buildBrainMemorySourceEdges",
  "createStableBrainMemoryId",
  "dedupeBrainMemoryGraph"
)) {
  Assert-Contains $indexSource $apiName "ingestion index exports $apiName"
  Assert-Contains $runtimeIndexSource $apiName "runtime index exports $apiName"
}

foreach ($typeName in @(
  "CodexForgeBrainMemoryIngestionSummary",
  "CodexForgeBrainMemoryIngestionPlan",
  "CodexForgeBrainMemorySourceNode",
  "CodexForgeBrainMemorySourceEdge",
  "CodexForgeBrainMemoryActivityEntry"
)) {
  Assert-Contains $typesSource $typeName "ingestion type exists $typeName"
  Assert-Contains $indexSource $typeName "ingestion index exports type $typeName"
}

Assert-Contains $idsSource "createStableBrainMemoryId" "stable ID helper exists"
Assert-Contains $dedupeSource "dedupeBrainMemoryGraph" "dedupe helper exists"
Assert-Contains $ingestionSource "mergeBrainMemoryIngestion" "merge helper exists"
Assert-Contains $ingestionSource "buildBrainMemorySeedGraph" "seed graph builder exists"
Assert-Contains $ingestionSource "skippedNodes" "merge tracks skipped nodes"
Assert-Contains $ingestionSource "skippedEdges" "merge tracks skipped edges"
Assert-Contains $sourceSource 'createStableBrainMemoryId("workspace", "codexforge")' "workspace root source seeded"
Assert-Contains $sourceSource 'createStableBrainMemoryId("route", "/brain")' "brain route source seeded"
Assert-Contains $sourceSource 'createStableBrainMemoryId("subsystem", "brain-runtime")' "brain runtime source seeded"
Assert-Contains $sourceSource "scripts/smoke-codexforge-all.ps1" "smoke suite source seeded"
Assert-Contains $sourceSource "history-entry" "activity entry source support exists"
Assert-Contains $sourceSource "CODEXFORGE_PHASE_1_CANONICAL_BRAIN_RUNTIME.md" "canonical doc source seeded"

Assert-NotContains $allIngestionSource "Math.random" "random dependency absent from ingestion modules"
Assert-NotContains $allIngestionSource "Date.now" "Date.now absent from deterministic ingestion modules"

foreach ($marker in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "apiKey", "API-key")) {
  Assert-NotContains $allIngestionSource $marker "external network/API marker absent: $marker"
}

foreach ($marker in @("d3-force", "uuid", "nanoid", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $allIngestionSource $marker "external dependency marker absent: $marker"
}

Assert-Contains $pageSource "mergeBrainMemoryIngestion" "Brain page imports/uses ingestion merge"
Assert-Contains $pageSource "buildBrainMemoryIngestionPlan" "Brain page builds ingestion plan"
if (-not ($pageSource.Contains("Seed real memory") -or $pageSource.Contains("Ingest project memory"))) {
  throw "[FAIL] Brain page missing Seed real memory or Ingest project memory action"
}
Write-Host "[PASS] Brain page exposes memory ingestion action"
Assert-Contains $pageSource "saveBrainGraph(result.graph)" "Brain page persists through existing saveBrainGraph path"
Assert-Contains $pageSource "Skipped" "Brain page reports skipped existing memories"
Assert-Contains $pageSource "Idempotent merge" "repeated ingestion is described as idempotent"
Assert-Contains $pageSource "stable source IDs" "repeat-safe stable ID behavior described"
Assert-Contains $pageSource "data-codexforge-brain-memory-ingestion-panel" "memory source summary panel marker"
Assert-Contains $pageSource "data-codexforge-brain-readonly-source-safe" "read-only source-safe badge marker"

$suiteCount = ([regex]::Matches($allSmokeSource, 'Name\s*=\s*"Brain memory ingestion"')).Count
if ($suiteCount -ne 1) {
  throw "[FAIL] Brain memory ingestion smoke suite entry count expected 1, found $suiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain memory ingestion exactly once"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $allIngestionSource $needle "ingestion mojibake marker absent"
}

Write-Host "[OK] CodexForge brain memory ingestion smoke passed."
