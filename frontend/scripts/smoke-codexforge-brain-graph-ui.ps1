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

Write-Host "=== CodexForge brain graph UI smoke ==="
Write-Host "Base URL: $BaseUrl"

$pageClientPath = "src\app\brain\page-client.tsx"
$graphComponentPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"

Assert-FileExists $pageClientPath
Assert-FileExists $graphComponentPath

$pageSource = Get-Content -Raw $pageClientPath
$graphSource = Get-Content -Raw $graphComponentPath

if ([string]::IsNullOrWhiteSpace($pageSource)) {
  throw "[FAIL] brain page source was empty"
}

if ([string]::IsNullOrWhiteSpace($graphSource)) {
  throw "[FAIL] brain graph component source was empty"
}

Assert-Contains $pageSource 'brain-graph-view' "brain page imports graph view"
Assert-Contains $pageSource '<BrainGraphView' "brain page renders graph view"
Assert-Contains $pageSource 'onSelectNode={setSelectedNodeId}' "graph selection updates inspector"

Assert-Contains $graphSource 'data-codexforge-brain-graph-view' "graph root marker"
Assert-Contains $graphSource 'data-codexforge-brain-graph-svg' "graph svg marker"
Assert-Contains $graphSource 'data-codexforge-brain-graph-node' "graph node marker"
Assert-Contains $graphSource 'data-codexforge-brain-graph-edge' "graph edge marker"
Assert-Contains $graphSource 'data-codexforge-brain-graph-insight-panel' "insight panel marker"
Assert-Contains $graphSource 'data-codexforge-brain-graph-next-action' "next action marker"

Assert-Contains $graphSource 'data-codexforge-brain-neural-canvas' "neural canvas marker"
Assert-Contains $graphSource 'data-codexforge-brain-focus-node' "focus node marker"
Assert-Contains $graphSource 'data-codexforge-brain-cluster-map' "cluster map marker"
Assert-Contains $graphSource 'data-codexforge-brain-signal-panel' "signal panel marker"
Assert-Contains $graphSource 'data-codexforge-brain-action-queue' "action queue marker"

Assert-Contains $graphSource 'Neural memory net' "neural net heading"
Assert-Contains $graphSource 'CodexForge neural constellation' "neural constellation heading"
Assert-Contains $graphSource 'MAX_VISIBLE_NODES' "node cap"
Assert-Contains $graphSource 'MAX_VISIBLE_EDGES' "edge cap"

Assert-NotContains $graphSource 'Math.random(' "random layout absent"
Assert-NotContains $graphSource 'd3-force' "external force simulation dependency absent"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $pageSource $needle "brain page mojibake removed"
}

Write-Host "[OK] CodexForge brain graph UI smoke passed."
