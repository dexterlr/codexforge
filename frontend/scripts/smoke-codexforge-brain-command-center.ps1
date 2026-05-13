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

Write-Host "=== CodexForge brain command center smoke ==="
Write-Host "Base URL: $BaseUrl"

$pageClientPath = "src\app\brain\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$graphComponentPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"
$newFiles = @(
  "src\lib\codexforge\brain\components\brain-command-center.tsx",
  "src\lib\codexforge\brain\components\brain-command-center-types.ts",
  "src\lib\codexforge\brain\components\brain-mode-tabs.tsx",
  "src\lib\codexforge\brain\components\brain-runtime-health-panel.tsx",
  "src\lib\codexforge\brain\components\brain-memory-clusters-panel.tsx",
  "src\lib\codexforge\brain\components\brain-agent-activity-panel.tsx",
  "src\lib\codexforge\brain\components\brain-prediction-panel.tsx",
  "src\lib\codexforge\brain\components\brain-risk-panel.tsx",
  "src\lib\codexforge\brain\components\brain-timeline-panel.tsx"
)

Assert-FileExists $pageClientPath
Assert-FileExists $allSmokePath
Assert-FileExists $graphComponentPath

foreach ($file in $newFiles) {
  Assert-FileExists $file
}

$pageSource = Get-Content -Raw $pageClientPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$graphSource = Get-Content -Raw $graphComponentPath
$commandSource = Get-Content -Raw $newFiles[0]
$tabsSource = Get-Content -Raw $newFiles[2]
$combinedNewSource = ($newFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

Assert-Contains $commandSource "export function BrainCommandCenter" "BrainCommandCenter export"
Assert-Contains $tabsSource "export function BrainModeTabs" "BrainModeTabs export"
Assert-Contains $tabsSource "BRAIN_COMMAND_CENTER_MODES" "BRAIN_COMMAND_CENTER_MODES export"

$requiredModes = @(
  "memory",
  "tasks",
  "concepts",
  "executions",
  "architecture",
  "timeline",
  "risks",
  "agent-activity",
  "prediction",
  "knowledge-clusters",
  "runtime-health",
  "graph"
)

foreach ($mode in $requiredModes) {
  Assert-Contains $tabsSource "id: `"$mode`"" "mode $mode"
}

$panelExports = @{
  "brain-runtime-health-panel.tsx" = "export function BrainRuntimeHealthPanel"
  "brain-memory-clusters-panel.tsx" = "export function BrainMemoryClustersPanel"
  "brain-agent-activity-panel.tsx" = "export function BrainAgentActivityPanel"
  "brain-prediction-panel.tsx" = "export function BrainPredictionPanel"
  "brain-risk-panel.tsx" = "export function BrainRiskPanel"
  "brain-timeline-panel.tsx" = "export function BrainTimelinePanel"
}

foreach ($entry in $panelExports.GetEnumerator()) {
  $path = "src\lib\codexforge\brain\components\$($entry.Key)"
  $source = Get-Content -Raw $path
  Assert-Contains $source $entry.Value "$($entry.Key) component export"
}

Assert-Contains $pageSource "brain-command-center" "page imports BrainCommandCenter"
Assert-Contains $pageSource "<BrainCommandCenter" "page renders BrainCommandCenter"
Assert-Contains $commandSource "brain-graph-view" "command center imports preserved BrainGraphView"
Assert-Contains $commandSource "<BrainGraphView" "command center renders preserved BrainGraphView"
Assert-Contains $graphSource "data-codexforge-brain-graph-insight-panel" "graph inspector insight marker remains"
Assert-Contains $pageSource "data-codexforge-brain-inspector-preserved" "graph inspector preserved marker remains"

$markers = @(
  "data-codexforge-brain-command-center",
  "data-codexforge-brain-mode-tabs",
  "data-codexforge-brain-runtime-health",
  "data-codexforge-brain-memory-clusters",
  "data-codexforge-brain-agent-activity",
  "data-codexforge-brain-prediction",
  "data-codexforge-brain-risk",
  "data-codexforge-brain-timeline",
  "data-codexforge-brain-graph-preserved",
  "data-codexforge-brain-inspector-preserved"
)

foreach ($marker in $markers) {
  Assert-Contains ($combinedNewSource + $pageSource) $marker "marker $marker"
}

Assert-Contains $combinedNewSource "Runtime Health" "Runtime Health marker"
Assert-Contains $combinedNewSource "Agent Activity" "Agent Activity marker"
Assert-Contains $combinedNewSource "Prediction" "Prediction marker"
Assert-Contains $combinedNewSource "Risk" "Risk marker"
Assert-Contains $combinedNewSource "Timeline" "Timeline marker"

Assert-NotContains $combinedNewSource "brain-graph`"" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "brain-graph'" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains ($combinedNewSource.Replace($graphSource, "")) "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embedding" "embeddings dependency absent"
Assert-NotContains $combinedNewSource "fetch(" "fetch absent"
Assert-NotContains $combinedNewSource "XMLHttpRequest" "XMLHttpRequest absent"
Assert-NotContains $combinedNewSource "WebSocket" "WebSocket absent"
Assert-NotContains $combinedNewSource "OpenAI" "OpenAI dependency absent"
Assert-NotContains $combinedNewSource "API-key" "API key dependency absent"
Assert-NotContains $combinedNewSource "from `"fs" "fs import absent"
Assert-NotContains $combinedNewSource "from `"path" "path import absent"
Assert-NotContains $combinedNewSource "child_process" "child_process import absent"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $combinedNewSource $needle "new command center mojibake absent"
}

$commandCenterSuiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-command-center\.ps1")).Count
if ($commandCenterSuiteCount -ne 1) {
  throw "[FAIL] Managed smoke suite should include Brain command center exactly once; found $commandCenterSuiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain command center exactly once"

Write-Host "[OK] CodexForge brain command center smoke passed."
