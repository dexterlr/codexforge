param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing expected $Name marker: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name marker: $Needle" }
  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge brain semantic topology smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime\topology"
$runtimeFiles = @(
  "$runtimeDir\topology-types.ts",
  "$runtimeDir\semantic-heatmap.ts",
  "$runtimeDir\knowledge-topology.ts",
  "$runtimeDir\topology-layout.ts",
  "$runtimeDir\topology-summarizer.ts",
  "$runtimeDir\topology-fixtures.ts",
  "$runtimeDir\index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-semantic-heatmap-panel.tsx",
  "src\lib\codexforge\brain\components\brain-knowledge-topology-panel.tsx",
  "src\lib\codexforge\brain\components\brain-topology-inspector.tsx",
  "src\lib\codexforge\brain\components\brain-topology-legend.tsx"
)

if (-not (Test-Path $runtimeDir)) { throw "[FAIL] Missing topology runtime directory: $runtimeDir" }
Write-Host "[PASS] topology runtime directory exists"
foreach ($file in $runtimeFiles + $uiFiles) { Assert-FileExists $file }

$runtimeIndex = Get-Content -Raw "$runtimeDir\index.ts"
$mainRuntimeIndex = Get-Content -Raw "src\lib\codexforge\brain\runtime\index.ts"
$heatmapSource = Get-Content -Raw "$runtimeDir\semantic-heatmap.ts"
$layoutSource = Get-Content -Raw "$runtimeDir\topology-layout.ts"
$fixtureSource = Get-Content -Raw "$runtimeDir\topology-fixtures.ts"
$commandSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$tabsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-mode-tabs.tsx"
$typesSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center-types.ts"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedRuntimeSource = ($runtimeFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedNewSource = "$combinedRuntimeSource`n$combinedUiSource"

$requiredApis = @(
  "buildSemanticHeatmap",
  "buildSemanticHeatmapLayer",
  "scoreSemanticHeatmapCell",
  "normalizeHeatmapIntensity",
  "buildKnowledgeTopology",
  "buildKnowledgeClusterNode",
  "buildKnowledgeClusterEdges",
  "groupTopologySignals",
  "buildDeterministicTopologyLayout",
  "positionTopologyCluster",
  "sortTopologyClusters",
  "normalizeTopologyWeight",
  "summarizeSemanticHeatmap",
  "summarizeKnowledgeTopology",
  "selectTopologyHotspots",
  "recommendTopologyNextAction",
  "buildSemanticTopologyFixtureGraph",
  "buildSemanticTopologyFixtureEvents",
  "buildSemanticTopologyFixtureMemory",
  "buildSemanticTopologyFixtureContext",
  "buildSemanticTopologyFixtureTopology"
)

foreach ($api in $requiredApis) {
  Assert-Contains $runtimeIndex $api "topology index exports $api"
  Assert-Contains $mainRuntimeIndex $api "main runtime index exports $api"
}

Assert-Contains (Get-Content -Raw $uiFiles[0]) "export function BrainSemanticHeatmapPanel" "BrainSemanticHeatmapPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[1]) "export function BrainKnowledgeTopologyPanel" "BrainKnowledgeTopologyPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[2]) "export function BrainTopologyInspector" "BrainTopologyInspector export"
Assert-Contains (Get-Content -Raw $uiFiles[3]) "export function BrainTopologyLegend" "BrainTopologyLegend export"

Assert-Contains $commandSource "brain-semantic-heatmap-panel" "command center imports BrainSemanticHeatmapPanel"
Assert-Contains $commandSource "brain-knowledge-topology-panel" "command center imports BrainKnowledgeTopologyPanel"
Assert-Contains $commandSource "<BrainSemanticHeatmapPanel" "command center renders BrainSemanticHeatmapPanel"
Assert-Contains $commandSource "<BrainKnowledgeTopologyPanel" "command center renders BrainKnowledgeTopologyPanel"
Assert-Contains $tabsSource "id: `"semantic-heatmap`"" "mode tabs include semantic-heatmap"
Assert-Contains $tabsSource "id: `"knowledge-topology`"" "mode tabs include knowledge-topology"
Assert-Contains $typesSource '| "semantic-heatmap"' "types include semantic-heatmap"
Assert-Contains $typesSource '| "knowledge-topology"' "types include knowledge-topology"

$markers = @(
  "data-codexforge-brain-topology-legend",
  "data-codexforge-brain-topology-inspector",
  "data-codexforge-brain-semantic-heatmap-panel",
  "data-codexforge-brain-heatmap-layer",
  "data-codexforge-brain-heatmap-cell",
  "data-codexforge-brain-heatmap-hotspot",
  "data-codexforge-brain-heatmap-summary",
  "data-codexforge-brain-knowledge-topology-panel",
  "data-codexforge-brain-topology-node",
  "data-codexforge-brain-topology-edge",
  "data-codexforge-brain-topology-hotspot",
  "data-codexforge-brain-topology-summary"
)
foreach ($marker in $markers) { Assert-Contains ($combinedNewSource + $commandSource) $marker "marker $marker" }

Assert-Contains $fixtureSource "CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS" "fixture fixed timestamp constant"
Assert-NotContains $fixtureSource "Date.now" "fixture Date.now absent"
Assert-NotContains $fixtureSource "Math.random" "fixture random absent"
Assert-Contains $heatmapSource "Math.min(1, Math.max(0, value))" "heatmap scoring clamps intensity between 0 and 1"
Assert-Contains $layoutSource "buildDeterministicTopologyLayout" "topology layout is deterministic"
Assert-NotContains $layoutSource "Math.random" "topology layout random absent"

foreach ($needle in @('"memory"', '"concept"', '"task"', '"execution"', '"risk"', '"file"', '"architecture"', '"agent"', '"prediction"', '"contradiction"', '"recovery"')) {
  Assert-Contains $combinedRuntimeSource $needle "topology signal kind includes $needle"
}
foreach ($needle in @('"memory-density"', '"risk-intensity"', '"concept-strength"', '"execution-activity"', '"agent-activity"', '"prediction-relevance"', '"architecture-hotspots"', '"contradiction-pressure"')) {
  Assert-Contains $heatmapSource $needle "semantic heatmap includes layer $needle"
}

Assert-NotContains $combinedNewSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains $combinedNewSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embedding" "embeddings dependency absent"
foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "from `"fs", "from `"path", "child_process")) {
  Assert-NotContains $combinedNewSource $needle "forbidden dependency absent: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage")) {
  Assert-NotContains $combinedUiSource $needle "browser storage absent: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedNewSource $needle "mojibake absent" }

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-semantic-topology\.ps1")).Count
if ($suiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain semantic topology exactly once; found $suiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain semantic topology exactly once"

foreach ($suite in @("smoke-codexforge-brain-replay-lineage\.ps1", "smoke-codexforge-brain-command-center\.ps1", "smoke-codexforge-brain-graph-ui\.ps1", "smoke-codexforge-brain-runtime\.ps1")) {
  $count = ([regex]::Matches($allSmokeSource, $suite)).Count
  if ($count -ne 1) { throw "[FAIL] Existing brain smoke should remain exactly once: $suite found $count" }
  Write-Host "[PASS] existing brain smoke remains exactly once: $suite"
}

Write-Host "[OK] CodexForge brain semantic topology smoke passed."
