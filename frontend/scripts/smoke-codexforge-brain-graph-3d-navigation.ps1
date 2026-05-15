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

  if ([regex]::IsMatch($Haystack, $Pattern)) {
    throw "[FAIL] Unexpected $Name pattern: $Pattern"
  }

  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge brain graph 3D navigation smoke ==="
Write-Host "Base URL: $BaseUrl"

$graphComponentPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"
$layoutHelperPath = "src\lib\codexforge\brain\components\brain-graph-3d-layout.ts"
$hudHelperPath = "src\lib\codexforge\brain\components\BrainGraphNavigationHud.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $graphComponentPath
Assert-FileExists $allSmokePath

$graphSource = Get-Content -Raw $graphComponentPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$optionalHelperSource = ""

if (Test-Path $layoutHelperPath) {
  $optionalHelperSource += Get-Content -Raw $layoutHelperPath
  Write-Host "[PASS] optional 3D layout helper exists"
}

if (Test-Path $hudHelperPath) {
  $optionalHelperSource += "`n"
  $optionalHelperSource += Get-Content -Raw $hudHelperPath
  Write-Host "[PASS] optional navigation HUD helper exists"
}

$combinedSource = "$graphSource`n$optionalHelperSource"

Assert-Contains $combinedSource "BrainGraphViewMode" "3D/flat mode type"
Assert-Contains $combinedSource "projectPoint3d" "perspective projection function"
Assert-Contains $combinedSource "PERSPECTIVE_DEPTH" "perspective projection depth"
Assert-Contains $combinedSource "yaw" "yaw camera control"
Assert-Contains $combinedSource "pitch" "pitch camera control"
Assert-Contains $combinedSource "zoom" "zoom camera control"
Assert-Contains $combinedSource "Reset view" "Reset view control"
Assert-Contains $combinedSource "Zoom in" "Zoom in control"
Assert-Contains $combinedSource "Zoom out" "Zoom out control"
Assert-Contains $combinedSource "Focus selected" "Focus selected control"
Assert-Contains $combinedSource "Prev node" "node navigation control"
Assert-Contains $combinedSource "Next neighbor" "neighbor navigation control"
Assert-Contains $combinedSource "Focus neighbors" "focus neighbors action"
Assert-Contains $combinedSource "data-codexforge-brain-graph-mini-map" "mini-map marker"
Assert-Contains $combinedSource "data-codexforge-brain-graph-radar" "radar marker"
Assert-Contains $combinedSource "data-codexforge-brain-graph-orientation-aid" "orientation aid marker"
Assert-Contains $combinedSource "data-codexforge-brain-graph-navigation-hud" "navigation HUD marker"
Assert-Contains $combinedSource "data-codexforge-brain-graph-search" "search focus input"
Assert-Contains $combinedSource "data-codexforge-brain-graph-cluster-jump" "cluster jump buttons"
Assert-Contains $combinedSource "buildProjectedNodes" "projected node layout"
Assert-Contains $combinedSource "buildProjectedClusters" "projected cluster layout"
Assert-Contains $combinedSource "zSort" "depth sorting"
Assert-Contains $combinedSource "selected ? 10000" "selected node visual pull forward"

Assert-Contains $graphSource "data-codexforge-brain-graph-view" "graph root marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-graph-svg" "graph svg marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-graph-node" "graph node marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-graph-edge" "graph edge marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-graph-insight-panel" "insight panel marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-graph-next-action" "next action marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-neural-canvas" "neural canvas marker preserved"
Assert-Contains $graphSource "data-codexforge-brain-cluster-map" "cluster map marker preserved"

Assert-Contains $graphSource "graph.nodes.length" "real node count source"
Assert-Contains $graphSource "graph.edges.length" "real edge count source"
Assert-Contains $graphSource "visibleEdges.length" "visible link count source"
Assert-Contains $graphSource "layoutNodes.length" "visible node count source"
Assert-NotContains $graphSource "signalField.points.length" "decorative signal points not counted as real graph data"
Assert-NotContains $graphSource "signalField.rays.length" "decorative signal rays not counted as real graph data"

Assert-NotMatches $combinedSource "from\s+[`"'][^`"']*three[^`"']*[`"']" "three import absent"
Assert-NotMatches $combinedSource "from\s+[`"'][^`"']*@react-three/fiber[^`"']*[`"']" "@react-three/fiber import absent"
Assert-NotContains $combinedSource "d3-force" "d3-force import absent"
Assert-NotContains $combinedSource "Math.random" "Math.random absent"
Assert-NotContains $combinedSource "Date.now" "Date.now absent"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $combinedSource $needle "brain graph 3D navigation mojibake absent"
}

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-graph-3d-navigation\.ps1")).Count
if ($suiteCount -ne 1) {
  throw "[FAIL] Managed smoke suite should include Brain Graph 3D Navigation exactly once; found $suiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain Graph 3D Navigation exactly once"

$legacyGraphUiCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-graph-ui\.ps1")).Count
if ($legacyGraphUiCount -ne 1) {
  throw "[FAIL] Existing Brain graph UI smoke should remain exactly once; found $legacyGraphUiCount"
}
Write-Host "[PASS] existing Brain graph UI smoke remains exactly once"

Write-Host "[OK] CodexForge brain graph 3D navigation smoke passed."
