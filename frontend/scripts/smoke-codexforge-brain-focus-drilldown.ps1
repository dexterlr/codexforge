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

Write-Host "=== CodexForge brain focus drilldown smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime\focus"
$runtimeFiles = @(
  "$runtimeDir\focus-types.ts",
  "$runtimeDir\focus-engine.ts",
  "$runtimeDir\drilldown-navigation.ts",
  "$runtimeDir\focus-breadcrumbs.ts",
  "$runtimeDir\focus-neighborhood.ts",
  "$runtimeDir\focus-fixtures.ts",
  "$runtimeDir\index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-focus-mode-panel.tsx",
  "src\lib\codexforge\brain\components\brain-drilldown-panel.tsx",
  "src\lib\codexforge\brain\components\brain-focus-breadcrumbs.tsx",
  "src\lib\codexforge\brain\components\brain-focus-inspector.tsx",
  "src\lib\codexforge\brain\components\brain-focus-lens-card.tsx"
)

if (-not (Test-Path $runtimeDir)) { throw "[FAIL] Missing focus runtime directory: $runtimeDir" }
Write-Host "[PASS] focus runtime directory exists"
foreach ($file in $runtimeFiles + $uiFiles) { Assert-FileExists $file }

$runtimeIndex = Get-Content -Raw "$runtimeDir\index.ts"
$mainRuntimeIndex = Get-Content -Raw "src\lib\codexforge\brain\runtime\index.ts"
$engineSource = Get-Content -Raw "$runtimeDir\focus-engine.ts"
$drilldownSource = Get-Content -Raw "$runtimeDir\drilldown-navigation.ts"
$neighborhoodSource = Get-Content -Raw "$runtimeDir\focus-neighborhood.ts"
$fixtureSource = Get-Content -Raw "$runtimeDir\focus-fixtures.ts"
$commandSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$tabsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-mode-tabs.tsx"
$typesSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center-types.ts"
$breadcrumbsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-focus-breadcrumbs.tsx"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedRuntimeSource = ($runtimeFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedNewSource = "$combinedRuntimeSource`n$combinedUiSource"

$requiredApis = @(
  "buildBrainFocusModel",
  "buildBrainFocusTarget",
  "buildBrainFocusSignal",
  "summarizeBrainFocusTarget",
  "buildBrainDrilldownPaths",
  "buildBrainDrilldownStep",
  "selectNextDrilldownSteps",
  "summarizeBrainDrilldownPath",
  "buildBrainFocusBreadcrumbs",
  "buildBrainFocusBreadcrumb",
  "summarizeBrainFocusBreadcrumbs",
  "buildBrainFocusNeighborhood",
  "groupFocusSignalsByKind",
  "selectFocusNeighborhoodHighlights",
  "recommendFocusNextSafeDrilldown",
  "buildBrainFocusFixtureGraph",
  "buildBrainFocusFixtureEvents",
  "buildBrainFocusFixtureMemory",
  "buildBrainFocusFixtureContext",
  "buildBrainFocusFixtureTopology",
  "buildBrainFocusFixtureRecommendations",
  "buildBrainFocusFixtureHealth",
  "buildBrainFocusFixtureAgents",
  "buildBrainFocusFixtureModel"
)

foreach ($api in $requiredApis) {
  Assert-Contains $runtimeIndex $api "focus index exports $api"
  Assert-Contains $mainRuntimeIndex $api "main runtime index exports $api"
}

Assert-Contains (Get-Content -Raw $uiFiles[0]) "export function BrainFocusModePanel" "BrainFocusModePanel export"
Assert-Contains (Get-Content -Raw $uiFiles[1]) "export function BrainDrilldownPanel" "BrainDrilldownPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[2]) "export function BrainFocusBreadcrumbs" "BrainFocusBreadcrumbs export"
Assert-Contains (Get-Content -Raw $uiFiles[3]) "export function BrainFocusInspector" "BrainFocusInspector export"
Assert-Contains (Get-Content -Raw $uiFiles[4]) "export function BrainFocusLensCard" "BrainFocusLensCard export"

Assert-Contains $commandSource "brain-focus-mode-panel" "command center imports BrainFocusModePanel"
Assert-Contains $commandSource "brain-drilldown-panel" "command center imports BrainDrilldownPanel"
Assert-Contains $commandSource "<BrainFocusModePanel" "command center renders BrainFocusModePanel"
Assert-Contains $commandSource "<BrainDrilldownPanel" "command center renders BrainDrilldownPanel"
Assert-Contains $tabsSource "id: `"focus-mode`"" "mode tabs include focus-mode"
Assert-Contains $tabsSource "id: `"drilldown`"" "mode tabs include drilldown"
Assert-Contains $typesSource '| "focus-mode"' "types include focus-mode"
Assert-Contains $typesSource '| "drilldown"' "types include drilldown"

$markers = @(
  "data-codexforge-brain-focus-lens-card",
  "data-codexforge-brain-focus-lens-kind",
  "data-codexforge-brain-focus-lens-relevance",
  "data-codexforge-brain-focus-lens-next-drilldown",
  "data-codexforge-brain-focus-breadcrumbs",
  "data-codexforge-brain-focus-inspector",
  "data-codexforge-brain-focus-mode-panel",
  "data-codexforge-brain-focus-summary",
  "data-codexforge-brain-focus-neighborhood",
  "data-codexforge-brain-focus-next-drilldown",
  "data-codexforge-brain-focus-readonly",
  "data-codexforge-brain-drilldown-panel",
  "data-codexforge-brain-drilldown-path",
  "data-codexforge-brain-drilldown-step",
  "data-codexforge-brain-drilldown-related-surface",
  "data-codexforge-brain-drilldown-readonly"
)
foreach ($marker in $markers) { Assert-Contains ($combinedNewSource + $commandSource) $marker "marker $marker" }

Assert-Contains $fixtureSource "CODEXFORGE_BRAIN_FOCUS_FIXTURE_TS = 1767225600000" "fixture fixed timestamp constant"
Assert-NotContains $fixtureSource "Date.now" "fixture Date.now absent"
Assert-Contains $engineSource "Math.min(1, Math.max(0" "focus relevance scoring clamps between 0 and 1"

foreach ($needle in @(
  "memory->concept",
  "task->execution",
  "risk->recommendation",
  "file->architecture",
  "agent->handoff",
  "subsystem->health",
  "heatmap->topology"
)) {
  Assert-Contains $drilldownSource $needle "drilldown path includes $needle"
}

foreach ($kind in @(
  '"memory"',
  '"concept"',
  '"task"',
  '"execution"',
  '"risk"',
  '"file"',
  '"architecture"',
  '"agent"',
  '"recommendation"',
  '"insight"',
  '"health"',
  '"topology"',
  '"replay"',
  '"lineage"',
  '"context"',
  '"approval-boundary"'
)) {
  Assert-Contains $neighborhoodSource $kind "focus neighborhood references $kind"
}

foreach ($needle in @("readOnly: true", "data-codexforge-brain-focus-readonly=`"true`"", "data-codexforge-brain-drilldown-readonly=`"true`"")) {
  Assert-Contains $combinedNewSource $needle "focus UI/runtime is read-only: $needle"
}

Assert-NotContains $combinedNewSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains $combinedNewSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embeddings" "embeddings dependency absent"
foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key")) {
  Assert-NotContains $combinedNewSource $needle "external network dependency absent: $needle"
}
foreach ($needle in @("from `"fs", "from `"path", "child_process")) {
  Assert-NotContains $combinedRuntimeSource $needle "runtime dependency absent: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage", "setInterval", "setTimeout")) {
  Assert-NotContains $combinedUiSource $needle "UI dependency absent: $needle"
}
foreach ($needle in @("useRouter", "router.", "window.location")) {
  Assert-NotContains $breadcrumbsSource $needle "router mutation dependency absent: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedNewSource $needle "mojibake absent" }

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-focus-drilldown\.ps1")).Count
if ($suiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain focus drilldown exactly once; found $suiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain focus drilldown exactly once"

foreach ($suite in @(
  "smoke-codexforge-brain-runtime-health-dashboard\.ps1",
  "smoke-codexforge-brain-recommendations\.ps1",
  "smoke-codexforge-brain-semantic-topology\.ps1",
  "smoke-codexforge-brain-replay-lineage\.ps1",
  "smoke-codexforge-brain-command-center\.ps1",
  "smoke-codexforge-brain-graph-ui\.ps1",
  "smoke-codexforge-brain-runtime\.ps1"
)) {
  $count = ([regex]::Matches($allSmokeSource, $suite)).Count
  if ($count -ne 1) { throw "[FAIL] Existing brain smoke should remain exactly once: $suite found $count" }
  Write-Host "[PASS] existing brain smoke remains exactly once: $suite"
}

Write-Host "[OK] CodexForge brain focus drilldown smoke passed."
