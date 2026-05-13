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

Write-Host "=== CodexForge brain replay lineage smoke ==="
Write-Host "Base URL: $BaseUrl"

$runtimeDir = "src\lib\codexforge\brain\runtime\replay"
$runtimeFiles = @(
  "$runtimeDir\replay-types.ts",
  "$runtimeDir\replay-builder.ts",
  "$runtimeDir\lineage-builder.ts",
  "$runtimeDir\replay-summarizer.ts",
  "$runtimeDir\replay-fixtures.ts",
  "$runtimeDir\index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-replay-panel.tsx",
  "src\lib\codexforge\brain\components\brain-lineage-panel.tsx",
  "src\lib\codexforge\brain\components\brain-replay-controls.tsx",
  "src\lib\codexforge\brain\components\brain-lineage-inspector.tsx"
)

if (-not (Test-Path $runtimeDir)) { throw "[FAIL] Missing replay runtime directory: $runtimeDir" }
Write-Host "[PASS] replay runtime directory exists"

foreach ($file in $runtimeFiles + $uiFiles) { Assert-FileExists $file }

$runtimeIndex = Get-Content -Raw "$runtimeDir\index.ts"
$mainRuntimeIndex = Get-Content -Raw "src\lib\codexforge\brain\runtime\index.ts"
$builderSource = Get-Content -Raw "$runtimeDir\replay-builder.ts"
$lineageSource = Get-Content -Raw "$runtimeDir\lineage-builder.ts"
$fixtureSource = Get-Content -Raw "$runtimeDir\replay-fixtures.ts"
$commandSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$tabsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-mode-tabs.tsx"
$typesSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center-types.ts"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedNewSource = (($runtimeFiles + $uiFiles) | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

$requiredApis = @(
  "buildBrainRuntimeReplay",
  "buildBrainReplayFrame",
  "groupReplayEventsByLane",
  "buildBrainRuntimeLineage",
  "buildExecutionLineageView",
  "buildMemoryLineageView",
  "buildAgentLineageView",
  "summarizeBrainRuntimeReplay",
  "summarizeBrainRuntimeLineage",
  "selectReplayHighlights",
  "buildBrainReplayFixtureEvents",
  "buildBrainReplayFixtureGraph",
  "buildBrainReplayFixtureLineage"
)

foreach ($api in $requiredApis) {
  Assert-Contains $runtimeIndex $api "replay index exports $api"
  Assert-Contains $mainRuntimeIndex $api "main runtime index exports $api"
}

Assert-Contains (Get-Content -Raw $uiFiles[0]) "export function BrainReplayPanel" "BrainReplayPanel export"
Assert-Contains (Get-Content -Raw $uiFiles[1]) "export function BrainLineagePanel" "BrainLineagePanel export"
Assert-Contains (Get-Content -Raw $uiFiles[2]) "export function BrainReplayControls" "BrainReplayControls export"
Assert-Contains (Get-Content -Raw $uiFiles[3]) "export function BrainLineageInspector" "BrainLineageInspector export"

Assert-Contains $commandSource "brain-replay-panel" "command center imports BrainReplayPanel"
Assert-Contains $commandSource "brain-lineage-panel" "command center imports BrainLineagePanel"
Assert-Contains $commandSource "<BrainReplayPanel" "command center renders BrainReplayPanel"
Assert-Contains $commandSource "<BrainLineagePanel" "command center renders BrainLineagePanel"
Assert-Contains $tabsSource "id: `"replay`"" "mode tabs include replay"
Assert-Contains $tabsSource "id: `"lineage`"" "mode tabs include lineage"
Assert-Contains $typesSource '| "replay"' "types include replay"
Assert-Contains $typesSource '| "lineage"' "types include lineage"

$markers = @(
  "data-codexforge-brain-replay-panel",
  "data-codexforge-brain-replay-frame",
  "data-codexforge-brain-replay-lane",
  "data-codexforge-brain-replay-highlight",
  "data-codexforge-brain-replay-summary",
  "data-codexforge-brain-replay-controls",
  "data-codexforge-brain-lineage-panel",
  "data-codexforge-brain-lineage-node",
  "data-codexforge-brain-lineage-edge",
  "data-codexforge-brain-lineage-inspector",
  "data-codexforge-brain-execution-lineage",
  "data-codexforge-brain-memory-lineage",
  "data-codexforge-brain-agent-lineage"
)
foreach ($marker in $markers) { Assert-Contains ($combinedNewSource + $commandSource) $marker "marker $marker" }

Assert-Contains $fixtureSource "CODEXFORGE_BRAIN_REPLAY_FIXTURE_TS" "fixture fixed timestamp constant"
Assert-NotContains $fixtureSource "Date.now" "fixture Date.now absent"
Assert-NotContains $fixtureSource "Math.random" "fixture random absent"
Assert-Contains $builderSource ".sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id))" "replay builder sorts by timestamp then id"

foreach ($needle in @('"task"', '"execution"', '"diff"', '"failure"', '"recovery"', '"memory"', '"concept"', '"agent"')) {
  Assert-Contains $lineageSource $needle "lineage builder includes $needle"
}
Assert-Contains $combinedNewSource "read-only" "replay panels are read-only"

Assert-NotContains $combinedNewSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains $combinedNewSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embedding" "embeddings dependency absent"
foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "from `"fs", "from `"path", "child_process")) {
  Assert-NotContains $combinedNewSource $needle "forbidden dependency absent: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage")) {
  Assert-NotContains (($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n") $needle "browser storage absent: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedNewSource $needle "mojibake absent" }

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-replay-lineage\.ps1")).Count
if ($suiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain replay lineage exactly once; found $suiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain replay lineage exactly once"

$commandCenterCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-command-center\.ps1")).Count
if ($commandCenterCount -ne 1) { throw "[FAIL] Brain command center should remain exactly once; found $commandCenterCount" }
Write-Host "[PASS] Brain command center remains exactly once"

Write-Host "[OK] CodexForge brain replay lineage smoke passed."
