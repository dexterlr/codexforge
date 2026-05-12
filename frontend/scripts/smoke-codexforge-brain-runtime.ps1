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

Assert-Contains $indexSource "appendEvent" "index exports appendEvent"
Assert-Contains $indexSource "reduceGraph" "index exports reduceGraph"
Assert-Contains $indexSource "assembleContext" "index exports assembleContext"
Assert-Contains $indexSource "rankMemory" "index exports rankMemory"
Assert-Contains $indexSource "createEpisode" "index exports createEpisode"
Assert-Contains $indexSource "synthesizeConcepts" "index exports synthesizeConcepts"

Assert-Contains $runtimeSource "brain/graph/types" "runtime imports canonical graph types"
Assert-Contains $allRuntimeSource "brain/graph/types" "runtime layer imports canonical graph types"
Assert-NotContains $allRuntimeSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $allRuntimeSource "Math.random(" "random layout dependency absent"
Assert-NotContains $allRuntimeSource "d3-force" "external force simulation dependency absent"

$pageClientPath = "src\app\brain\page-client.tsx"
Assert-FileExists $pageClientPath
$pageSource = Get-Content -Raw $pageClientPath
Assert-Contains $pageSource 'brain-graph-view' "brain page imports graph view"
Assert-Contains $pageSource '<BrainGraphView' "brain page renders graph view"

Write-Host "[OK] CodexForge brain runtime smoke passed."
