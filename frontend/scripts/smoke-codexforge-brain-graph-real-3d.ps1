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

Write-Host "=== CodexForge brain graph real 3D smoke ==="
Write-Host "Base URL: $BaseUrl"

$packagePath = "package.json"
$graphViewPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"
$graph3DDir = "src\lib\codexforge\brain\components\brain-graph-3d"
$layoutPath = Join-Path $graph3DDir "brain-graph-3d-layout.ts"
$viewPath = Join-Path $graph3DDir "BrainGraph3DView.tsx"
$scenePath = Join-Path $graph3DDir "BrainGraph3DScene.tsx"
$hudPath = Join-Path $graph3DDir "BrainGraph3DHud.tsx"
$fallbackPath = Join-Path $graph3DDir "BrainGraph3DFallback.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $packagePath
Assert-FileExists $graphViewPath
Assert-FileExists $graph3DDir
Assert-FileExists $layoutPath
Assert-FileExists $viewPath
Assert-FileExists $scenePath
Assert-FileExists $hudPath
Assert-FileExists $fallbackPath
Assert-FileExists $allSmokePath

$packageSource = Get-Content -Raw $packagePath
$graphViewSource = Get-Content -Raw $graphViewPath
$layoutSource = Get-Content -Raw $layoutPath
$viewSource = Get-Content -Raw $viewPath
$sceneSource = Get-Content -Raw $scenePath
$hudSource = Get-Content -Raw $hudPath
$fallbackSource = Get-Content -Raw $fallbackPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$graph3DSource = (Get-ChildItem $graph3DDir -Recurse -Include *.ts,*.tsx | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$combinedSource = "$graphViewSource`n$graph3DSource"

Assert-Contains $packageSource '"three"' "three dependency"
Assert-Contains $packageSource '"@react-three/fiber"' "react three fiber dependency"
Assert-Contains $packageSource '"@react-three/drei"' "react three drei dependency"

Assert-Contains $viewSource "export function BrainGraph3DView" "BrainGraph3DView exists"
Assert-Contains $sceneSource "export function BrainGraph3DScene" "BrainGraph3DScene exists"
Assert-Contains $hudSource "export function BrainGraph3DHud" "BrainGraph3DHud exists"
Assert-Contains $fallbackSource "BrainGraph3DFallback" "BrainGraph3DFallback exists"
Assert-Contains $layoutSource "buildBrainGraph3DLayout" "3D layout helper exists"

foreach ($export in @(
  "buildBrainGraph3DLayout",
  "projectBrainGraphNode3D",
  "buildBrainGraph3DEdge",
  "buildBrainGraph3DSignalField",
  "createStableBrainGraph3DHash"
)) {
  Assert-Contains $layoutSource "export function $export" "expected export $export"
}

Assert-Contains $graphViewSource "BrainGraph3DView" "Brain graph view references BrainGraph3DView"
Assert-Contains $sceneSource "OrbitControls" "OrbitControls or equivalent"
Assert-Contains $combinedSource "3D / 2D toggle" "3D / 2D toggle"
Assert-Contains $combinedSource "Reset camera" "Reset camera"
Assert-Contains $combinedSource "Focus selected" "Focus selected"
Assert-Contains $combinedSource "createStableBrainGraph3DHash" "deterministic hash/layout"

Assert-NotContains $combinedSource "d3-force" "d3-force absent"
Assert-NotContains $graph3DSource "Math.random" "Math.random absent from real 3D graph"
Assert-NotContains $graph3DSource "Date.now" "Date.now absent from real 3D graph layout and IDs"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $combinedSource $needle "brain graph real 3D mojibake absent"
}

Assert-Contains $graphViewSource "data-codexforge-brain-graph-svg" "existing 2D fallback remains referenced"
Assert-Contains $graphViewSource 'graph.nodes.length' "real node count source"
Assert-Contains $graphViewSource 'graph.edges.length' "real edge count source"
Assert-Contains $viewSource 'props.graph.nodes.length' "3D real nodes count"
Assert-Contains $viewSource 'props.graph.edges.length' "3D real links count"
Assert-NotContains $viewSource "signalField.length" "signal field not counted as graph data"

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-graph-real-3d\.ps1")).Count
if ($suiteCount -ne 1) {
  throw "[FAIL] Managed smoke suite should include Brain Graph Real 3D exactly once; found $suiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain Graph Real 3D exactly once"

$legacyGraphUiCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-graph-ui\.ps1")).Count
if ($legacyGraphUiCount -ne 1) {
  throw "[FAIL] Existing Brain graph UI smoke should remain exactly once; found $legacyGraphUiCount"
}
Write-Host "[PASS] existing Brain graph UI smoke remains exactly once"

Write-Host "[OK] CodexForge brain graph real 3D smoke passed."
