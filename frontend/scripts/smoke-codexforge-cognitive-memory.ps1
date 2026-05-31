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

Write-Host "=== CodexForge cognitive memory smoke ==="
Write-Host "Base URL: $BaseUrl"

$memoryDir = "src\lib\codexforge\brain\runtime\memory"
$runtimeIndexPath = "src\lib\codexforge\brain\runtime\index.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$memoryFiles = @(
  "memory-aging.ts",
  "confidence-engine.ts",
  "semantic-dedupe.ts",
  "concept-promoter.ts",
  "contradiction-detector.ts",
  "memory-clusters.ts",
  "memory-fixtures.ts",
  "index.ts"
)

if (-not (Test-Path $memoryDir -PathType Container)) {
  throw "[FAIL] Missing memory directory: $memoryDir"
}

Write-Host "[PASS] memory directory exists"

foreach ($file in $memoryFiles) {
  Assert-FileExists (Join-Path $memoryDir $file)
}

Assert-FileExists $runtimeIndexPath
Assert-FileExists $allSmokePath

$memoryIndexSource = Get-Content -Raw (Join-Path $memoryDir "index.ts")
$runtimeIndexSource = Get-Content -Raw $runtimeIndexPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$memorySource = ($memoryFiles | ForEach-Object {
  Get-Content -Raw (Join-Path $memoryDir $_)
}) -join "`n"
$confidenceSource = Get-Content -Raw (Join-Path $memoryDir "confidence-engine.ts")
$dedupeSource = Get-Content -Raw (Join-Path $memoryDir "semantic-dedupe.ts")
$conceptSource = Get-Content -Raw (Join-Path $memoryDir "concept-promoter.ts")
$contradictionSource = Get-Content -Raw (Join-Path $memoryDir "contradiction-detector.ts")
$clusterSource = Get-Content -Raw (Join-Path $memoryDir "memory-clusters.ts")
$fixtureSource = Get-Content -Raw (Join-Path $memoryDir "memory-fixtures.ts")

$requiredApis = @(
  "calculateMemoryAgeScore",
  "calculateMemoryRecency",
  "calculateMemoryDecay",
  "calculateMemoryConfidence",
  "calculateMemoryImportance",
  "buildCognitiveMemoryScoreBreakdown",
  "rankCognitiveMemory",
  "normalizeMemoryFingerprint",
  "dedupeCognitiveMemory",
  "findPromotableConcepts",
  "promoteConceptCandidate",
  "scoreContradictionRisk",
  "detectMemoryContradictions",
  "clusterMemorySignals",
  "summarizeMemoryCluster",
  "buildCognitiveMemoryFixtureNodes",
  "buildCognitiveMemoryFixtureEvents"
)

foreach ($apiName in $requiredApis) {
  Assert-Contains $memoryIndexSource $apiName "memory index exports $apiName"
  Assert-Contains $runtimeIndexSource $apiName "runtime index exports $apiName"
}

foreach ($typeName in @(
  "CodexForgeCognitiveMemoryAgeInput",
  "CodexForgeCognitiveMemoryAgeScore",
  "CodexForgeCognitiveMemoryConfidenceInput",
  "CodexForgeCognitiveMemoryScore",
  "CodexForgeCognitiveMemoryScoreBreakdown",
  "CodexForgeCognitiveMemoryDedupeGroup",
  "CodexForgePromotableConcept",
  "CodexForgeConceptPromotionResult",
  "CodexForgeMemoryContradiction",
  "CodexForgeContradictionSignal",
  "CodexForgeMemoryCluster",
  "CodexForgeMemoryClusterSummary"
)) {
  Assert-Contains $memoryIndexSource $typeName "memory index exports type $typeName"
  Assert-Contains $runtimeIndexSource $typeName "runtime index exports type $typeName"
}

Assert-Contains $memorySource "brain/graph/types" "memory modules import canonical graph types"
Assert-Contains $memorySource "../runtime-types" "memory modules import canonical runtime types"
Assert-NotContains $memorySource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $memorySource "Math.random" "random dependency absent"
Assert-NotContains $memorySource "d3-force" "force dependency absent"

foreach ($marker in @("Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $memorySource $marker "vector database marker absent: $marker"
}

foreach ($marker in @("embedding", "embeddings")) {
  Assert-NotContains $memorySource $marker "embedding marker absent: $marker"
}

foreach ($marker in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $memorySource $marker "external network/API marker absent: $marker"
}

foreach ($markerCode in @(0x00C3, 0x0192, 0x00C2, 0xFFFD)) {
  $marker = [string][char]$markerCode
  Assert-NotContains $memorySource $marker "mojibake marker absent: U+$($markerCode.ToString("X4"))"
}

foreach ($marker in @(
  "blocked/allowed",
  "should/should not",
  "can/cannot",
  "pass/fail",
  "safe/unsafe",
  "required/optional",
  "exists/missing"
)) {
  Assert-Contains $contradictionSource $marker "contradiction heuristic $marker"
}

Assert-Contains $dedupeSource "normalizeMemoryFingerprint" "semantic dedupe normalizer"
Assert-Contains $confidenceSource "buildCognitiveMemoryScoreBreakdown" "confidence explainable breakdown"
Assert-Contains $conceptSource "concept.synthesized" "concept promoter event reference"
Assert-Contains $clusterSource "summarizeMemoryCluster" "memory cluster summary"

Assert-Contains $fixtureSource "FIXTURE_NOW" "fixture fixed timestamp constant"
Assert-NotContains $fixtureSource "Date.now" "fixture Date.now absent"
foreach ($marker in @("duplicate", "contradiction", "stale", "pinned")) {
  Assert-Contains $fixtureSource $marker "fixture case marker: $marker"
}

$cognitiveSuiteCount = ([regex]::Matches($allSmokeSource, 'Name\s*=\s*"Cognitive memory"')).Count
if ($cognitiveSuiteCount -ne 1) {
  throw "[FAIL] Cognitive memory smoke suite entry count expected 1, found $cognitiveSuiteCount"
}
Write-Host "[PASS] managed smoke suite includes Cognitive memory exactly once"

$brainRuntimeSuiteCount = ([regex]::Matches($allSmokeSource, 'Name\s*=\s*"Brain runtime"')).Count
if ($brainRuntimeSuiteCount -ne 1) {
  throw "[FAIL] Brain runtime smoke suite entry count expected 1, found $brainRuntimeSuiteCount"
}
Write-Host "[PASS] Brain runtime suite entry remains unique"

Assert-Matches $contradictionSource 'riskScore:\s*Math\.min\(0\.92' "contradiction candidates avoid certainty"
Assert-Matches $confidenceSource 'score: breakdown\.score' "confidence score object exposes clamped score"

Write-Host "[OK] CodexForge cognitive memory smoke passed."
