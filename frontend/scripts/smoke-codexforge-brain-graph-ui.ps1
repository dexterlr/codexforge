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
    [Parameter(Mandatory = $true)][string]$Haystack,
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
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name absent"
}

Write-Host "=== CodexForge brain graph UI smoke ==="
Write-Host "Base URL: $BaseUrl"

$pagePath = "src\app\brain\page-client.tsx"
$componentPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"

Assert-FileExists $pagePath
Assert-FileExists $componentPath

$page = Get-Content -Raw $pagePath
$component = Get-Content -Raw $componentPath

Assert-Contains $page "BrainGraphView" "brain page imports graph view"
Assert-Contains $page "<BrainGraphView" "brain page renders graph view"
Assert-Contains $page "onSelectNode={setSelectedNodeId}" "graph selection updates inspector"

Assert-Contains $component "data-codexforge-brain-graph-view" "graph root marker"
Assert-Contains $component "data-codexforge-brain-graph-svg" "graph svg marker"
Assert-Contains $component "data-codexforge-brain-graph-node" "graph node marker"
Assert-Contains $component "data-codexforge-brain-graph-edge" "graph edge marker"
Assert-Contains $component "data-codexforge-brain-graph-insight-panel" "insight panel marker"
Assert-Contains $component "data-codexforge-brain-graph-next-action" "next action marker"
Assert-Contains $component "Obsidian graph mode" "obsidian graph heading"
Assert-Contains $component "Visual brain constellation" "visual constellation heading"
Assert-Contains $component "MAX_VISIBLE_NODES" "node cap"
Assert-Contains $component "MAX_VISIBLE_EDGES" "edge cap"

Assert-NotContains $component "Math.random()" "random layout"
Assert-NotContains $component "forceSimulation" "external force simulation dependency"

Write-Host "[OK] CodexForge brain graph UI smoke passed."
