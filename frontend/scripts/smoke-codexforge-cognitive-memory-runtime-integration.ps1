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

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack -match $Pattern) {
    throw "[FAIL] Unexpected $Name pattern: $Pattern"
  }

  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge cognitive memory runtime integration smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime"
$contextPath = Join-Path $runtimeDir "context-assembler.ts"
$runtimePath = Join-Path $runtimeDir "runtime.ts"
$healthPath = Join-Path $runtimeDir "runtime-health.ts"
$diagnosticsPath = Join-Path $runtimeDir "runtime-diagnostics.ts"
$timelinePath = Join-Path $runtimeDir "runtime-timeline.ts"
$contractPath = Join-Path $runtimeDir "runtime-contract.ts"
$indexPath = Join-Path $runtimeDir "index.ts"
$typesPath = Join-Path $runtimeDir "runtime-types.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$cognitiveSmokePath = "scripts\smoke-codexforge-cognitive-memory.ps1"

foreach ($path in @(
  $contextPath,
  $runtimePath,
  $healthPath,
  $diagnosticsPath,
  $timelinePath,
  $contractPath,
  $indexPath,
  $typesPath,
  $allSmokePath,
  $cognitiveSmokePath
)) {
  Assert-FileExists $path
}

$contextSource = Get-Content -Raw $contextPath
$runtimeSource = Get-Content -Raw $runtimePath
$healthSource = Get-Content -Raw $healthPath
$diagnosticsSource = Get-Content -Raw $diagnosticsPath
$timelineSource = Get-Content -Raw $timelinePath
$contractSource = Get-Content -Raw $contractPath
$indexSource = Get-Content -Raw $indexPath
$typesSource = Get-Content -Raw $typesPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$runtimeIntegrationSource = @(
  $contextSource,
  $runtimeSource,
  $healthSource,
  $diagnosticsSource,
  $timelineSource,
  $contractSource,
  $indexSource,
  $typesSource
) -join "`n"

foreach ($apiName in @(
  "rankCognitiveMemory",
  "dedupeCognitiveMemory",
  "detectMemoryContradictions",
  "clusterMemorySignals",
  "summarizeMemoryCluster"
)) {
  Assert-Contains $contextSource $apiName "context assembler references $apiName"
}

foreach ($marker in @(
  "cognitiveMemory",
  "memoryClusters",
  "contradictionCandidates",
  "memorySummary"
)) {
  Assert-Contains $typesSource $marker "runtime context exposes $marker"
}

Assert-Contains $runtimeSource "buildCognitiveRuntimeContext" "runtime facade exposes memory-aware context helper"
Assert-Contains $indexSource "buildCognitiveRuntimeContext" "runtime index exports memory-aware context helper"

Assert-Contains $healthSource "cognitiveMemoryReady" "health contains cognitive memory readiness signal"
Assert-Contains $healthSource "no cognitive memory signals" "health warns on absent memory signals"
Assert-Contains $healthSource "contradiction candidates" "health reports contradiction candidates"
Assert-Contains $healthSource "Archived or stale memory dominates" "health reports archived memory dominance"
Assert-Contains $healthSource "duplicate memory clusters" "health reports duplicate memory clusters"

foreach ($marker in @(
  "cognitive-memory-api-readiness",
  "empty-memory-candidate-set",
  "duplicate-memory-fingerprints",
  "memory-contradiction-candidate-risk",
  "no-promotable-concepts",
  "unsafe-raw-memory-injection",
  "schema-drift-risk",
  "legacy-import-risk"
)) {
  Assert-Contains $diagnosticsSource $marker "diagnostics marker $marker"
}

Assert-Contains $timelineSource "memory.promoted" "timeline handles memory.promoted"
Assert-Contains $timelineSource "concept.synthesized" "timeline handles concept.synthesized"
Assert-Contains $timelineSource "failure.detected" "timeline handles failure.detected"
Assert-Contains $timelineSource "recovery.detected" "timeline handles recovery.detected"
Assert-Contains $timelineSource "memoryId" "timeline includes stable memory hint"
Assert-Contains $timelineSource "conceptId" "timeline includes stable concept hint"
Assert-Contains $timelineSource "failureId" "timeline includes stable failure hint"
Assert-Contains $timelineSource "recoveryId" "timeline includes stable recovery hint"

Assert-Contains $contractSource "Phase 2B" "contract references cognitive memory safe next steps"
Assert-Contains $contractSource "src/lib/codexforge/brain/graph/types.ts" "contract preserves canonical graph schema path"
Assert-Contains $contractSource "brain-graph" "contract preserves forbidden legacy import"

Assert-NotMatches $runtimeIntegrationSource 'from\s+["''][^"'']*brain-graph["'']' "legacy brain-graph import absent"
Assert-NotContains $runtimeIntegrationSource "Math.random" "random dependency absent"
Assert-NotContains $runtimeIntegrationSource "d3-force" "force dependency absent"

foreach ($marker in @("Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $runtimeIntegrationSource $marker "vector database marker absent: $marker"
}

foreach ($marker in @("embedding", "embeddings")) {
  Assert-NotContains $runtimeIntegrationSource $marker "embedding marker absent: $marker"
}

foreach ($marker in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $runtimeIntegrationSource $marker "external network/API marker absent: $marker"
}

foreach ($markerCode in @(0x00C3, 0x0192, 0x00C2, 0xFFFD)) {
  $marker = [string][char]$markerCode
  Assert-NotContains $runtimeIntegrationSource $marker "mojibake marker absent: U+$($markerCode.ToString("X4"))"
}

$integrationSuiteCount = ([regex]::Matches($allSmokeSource, 'Name\s*=\s*"Cognitive memory runtime integration"')).Count
if ($integrationSuiteCount -ne 1) {
  throw "[FAIL] Cognitive memory runtime integration suite entry count expected 1, found $integrationSuiteCount"
}
Write-Host "[PASS] managed smoke suite includes Cognitive memory runtime integration exactly once"

$brainRuntimeSuiteCount = ([regex]::Matches($allSmokeSource, 'Name\s*=\s*"Brain runtime"')).Count
if ($brainRuntimeSuiteCount -ne 1) {
  throw "[FAIL] Brain runtime smoke suite entry count expected 1, found $brainRuntimeSuiteCount"
}
Write-Host "[PASS] Brain runtime suite entry remains unique"

$cognitiveSuiteCount = ([regex]::Matches($allSmokeSource, 'Name\s*=\s*"Cognitive memory"')).Count
if ($cognitiveSuiteCount -ne 1) {
  throw "[FAIL] Cognitive memory smoke suite entry count expected 1, found $cognitiveSuiteCount"
}
Write-Host "[PASS] Cognitive memory suite entry remains unique"

& powershell -ExecutionPolicy Bypass -File $cognitiveSmokePath -BaseUrl $BaseUrl
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Existing cognitive memory smoke exited with code $LASTEXITCODE"
}
Write-Host "[PASS] existing cognitive memory smoke still passes"

Write-Host "[OK] CodexForge cognitive memory runtime integration smoke passed."
