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

Write-Host "=== CodexForge brain runtime smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime"
$requiredFiles = @(
  "runtime-types.ts",
  "event-store.ts",
  "graph-reducer.ts",
  "context-assembler.ts",
  "memory-ranker.ts",
  "episode-manager.ts",
  "concept-synthesizer.ts",
  "execution-lineage.ts",
  "semantic-links.ts",
  "runtime-contract.ts",
  "runtime-health.ts",
  "runtime-timeline.ts",
  "runtime-diagnostics.ts",
  "runtime.ts",
  "index.ts"
)

if (-not (Test-Path $runtimeDir -PathType Container)) {
  throw "[FAIL] Missing runtime directory: $runtimeDir"
}

Write-Host "[PASS] runtime directory exists"

foreach ($file in $requiredFiles) {
  Assert-FileExists (Join-Path $runtimeDir $file)
}

$indexSource = Get-Content -Raw (Join-Path $runtimeDir "index.ts")
$runtimeSource = Get-Content -Raw (Join-Path $runtimeDir "runtime.ts")
$allRuntimeSource = ($requiredFiles | ForEach-Object {
  Get-Content -Raw (Join-Path $runtimeDir $_)
}) -join "`n"
$selfAwarenessFiles = @(
  "runtime-contract.ts",
  "runtime-health.ts",
  "runtime-timeline.ts",
  "runtime-diagnostics.ts"
)
$selfAwarenessSource = ($selfAwarenessFiles | ForEach-Object {
  Get-Content -Raw (Join-Path $runtimeDir $_)
}) -join "`n"
$contractSource = Get-Content -Raw (Join-Path $runtimeDir "runtime-contract.ts")
$healthSource = Get-Content -Raw (Join-Path $runtimeDir "runtime-health.ts")
$timelineSource = Get-Content -Raw (Join-Path $runtimeDir "runtime-timeline.ts")
$diagnosticsSource = Get-Content -Raw (Join-Path $runtimeDir "runtime-diagnostics.ts")

Assert-Contains $indexSource "appendEvent" "index exports appendEvent"
Assert-Contains $indexSource "reduceGraph" "index exports reduceGraph"
Assert-Contains $indexSource "assembleContext" "index exports assembleContext"
Assert-Contains $indexSource "rankMemory" "index exports rankMemory"
Assert-Contains $indexSource "createEpisode" "index exports createEpisode"
Assert-Contains $indexSource "synthesizeConcepts" "index exports synthesizeConcepts"
Assert-Contains $indexSource "getCodexForgeBrainRuntimeContract" "index exports getCodexForgeBrainRuntimeContract"
Assert-Contains $indexSource "evaluateBrainRuntimeHealth" "index exports evaluateBrainRuntimeHealth"
Assert-Contains $indexSource "summarizeBrainRuntimeHealth" "index exports summarizeBrainRuntimeHealth"
Assert-Contains $indexSource "buildRuntimeTimeline" "index exports buildRuntimeTimeline"
Assert-Contains $indexSource "summarizeRuntimeTimeline" "index exports summarizeRuntimeTimeline"
Assert-Contains $indexSource "runBrainRuntimeDiagnostics" "index exports runBrainRuntimeDiagnostics"
Assert-Contains $indexSource "summarizeBrainRuntimeDiagnostics" "index exports summarizeBrainRuntimeDiagnostics"

Assert-Contains $runtimeSource "brain/graph/types" "runtime imports canonical graph types"
Assert-Contains $allRuntimeSource "brain/graph/types" "runtime layer imports canonical graph types"
Assert-NotMatches $allRuntimeSource 'from\s+["''][^"'']*brain-graph["'']' "legacy brain-graph import absent"
Assert-NotContains $allRuntimeSource "Math.random(" "random layout dependency absent"
Assert-NotContains $allRuntimeSource "d3-force" "external force simulation dependency absent"

Assert-Contains $contractSource "src/lib/codexforge/brain/graph/types.ts" "contract canonical graph schema path"
Assert-Contains $contractSource "brain-graph" "contract forbids brain-graph import"
foreach ($apiName in @("appendEvent", "reduceGraph", "assembleContext", "rankMemory", "createEpisode", "synthesizeConcepts")) {
  Assert-Contains $contractSource $apiName "contract includes required API $apiName"
}

Assert-Contains $healthSource "nextSafeSteps" "health report includes nextSafeSteps"
Assert-Contains $diagnosticsSource "Schema drift risk" "diagnostics mention schema drift risk"
Assert-Contains $diagnosticsSource "Legacy import risk" "diagnostics mention legacy import risk"
Assert-Contains $timelineSource "b.timestamp - a.timestamp || a.id.localeCompare(b.id)" "timeline sorts events deterministically"

Assert-NotContains $selfAwarenessSource "Math.random" "self-awareness random dependency absent"
Assert-NotContains $selfAwarenessSource "d3-force" "self-awareness force dependency absent"
foreach ($marker in @("Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $selfAwarenessSource $marker "self-awareness vector database marker absent: $marker"
}
foreach ($marker in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $selfAwarenessSource $marker "self-awareness external network/API marker absent: $marker"
}
foreach ($marker in @("â", "Ã", "Â", "�")) {
  Assert-NotContains $selfAwarenessSource $marker "self-awareness mojibake marker absent: $marker"
}

$pageClientPath = "src\app\brain\page-client.tsx"
$commandComponentPath = "src\lib\codexforge\brain\components\brain-command-center.tsx"
Assert-FileExists $pageClientPath
$pageSource = Get-Content -Raw $pageClientPath
$commandSource = if (Test-Path $commandComponentPath) { Get-Content -Raw $commandComponentPath } else { "" }

if ($pageSource.Contains('brain-graph-view')) {
  Assert-Contains $pageSource 'brain-graph-view' "brain page imports graph view"
} else {
  Assert-Contains $commandSource 'brain-graph-view' "command center imports graph view"
}

if ($pageSource.Contains('<BrainGraphView')) {
  Assert-Contains $pageSource '<BrainGraphView' "brain page renders graph view"
} else {
  Assert-Contains $commandSource '<BrainGraphView' "command center renders graph view"
}

Write-Host "[OK] CodexForge brain runtime smoke passed."
