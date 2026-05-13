param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name marker: $Needle" }
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

Write-Host "=== CodexForge brain quality gates smoke ==="
Write-Host "Base URL: $BaseUrl"

$qualityDir = "src\lib\codexforge\brain\runtime\quality"
$qualityFiles = @(
  "quality-types.ts",
  "graph-load-gates.ts",
  "snapshot-panel-gates.ts",
  "empty-state-gates.ts",
  "quality-fixtures.ts",
  "index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-graph-loading-state.tsx",
  "src\lib\codexforge\brain\components\brain-graph-empty-state.tsx",
  "src\lib\codexforge\brain\components\brain-graph-error-state.tsx",
  "src\lib\codexforge\brain\components\brain-quality-gate-strip.tsx"
)
$runtimeIndexPath = "src\lib\codexforge\brain\runtime\index.ts"
$qualityIndexPath = Join-Path $qualityDir "index.ts"
$pageClientPath = "src\app\brain\page-client.tsx"
$commandCenterPath = "src\lib\codexforge\brain\components\brain-command-center.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$graphViewPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"

Assert-DirectoryExists $qualityDir
foreach ($file in $qualityFiles) { Assert-FileExists (Join-Path $qualityDir $file) }
foreach ($file in $uiFiles) { Assert-FileExists $file }
Assert-FileExists $runtimeIndexPath
Assert-FileExists $pageClientPath
Assert-FileExists $commandCenterPath
Assert-FileExists $allSmokePath

$qualityRuntimeSource = ($qualityFiles | ForEach-Object { Get-Content -Raw (Join-Path $qualityDir $_) }) -join "`n"
$qualityUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$qualityIndexSource = Get-Content -Raw $qualityIndexPath
$runtimeIndexSource = Get-Content -Raw $runtimeIndexPath
$pageSource = Get-Content -Raw $pageClientPath
$commandCenterSource = Get-Content -Raw $commandCenterPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$graphViewSource = Get-Content -Raw $graphViewPath
$changedSource = $qualityRuntimeSource + "`n" + $qualityUiSource + "`n" + $pageSource + "`n" + $commandCenterSource + "`n" + $runtimeIndexSource

$requiredExports = @(
  "evaluateBrainGraphLoadState",
  "buildBrainGraphLoadGate",
  "summarizeBrainGraphLoadState",
  "normalizeBrainGraphLoadPhase",
  "evaluateBrainSnapshotPanelGates",
  "buildBrainSnapshotPanelGate",
  "summarizeBrainSnapshotPanelGates",
  "selectBlockedBrainPanels",
  "evaluateBrainEmptyState",
  "buildBrainEmptyStateRecoveryAction",
  "summarizeBrainEmptyState",
  "buildBrainQualityFixtureGraph",
  "buildBrainQualityFixtureSnapshot",
  "buildBrainQualityFixturePanelReadiness",
  "buildBrainQualityFixtureLoadStates",
  "buildBrainQualityFixtureSummary"
)

foreach ($exportName in $requiredExports) {
  Assert-Contains $qualityIndexSource $exportName "quality index export $exportName"
  Assert-Contains $runtimeIndexSource $exportName "runtime index export $exportName"
}

$requiredTypes = @(
  "CodexForgeBrainLoadPhase",
  "CodexForgeBrainLoadStatus",
  "CodexForgeBrainQualityGateSeverity",
  "CodexForgeBrainQualityGate",
  "CodexForgeBrainGraphLoadGateResult",
  "CodexForgeBrainSnapshotPanelGateResult",
  "CodexForgeBrainEmptyStateGateResult",
  "CodexForgeBrainQualitySummary"
)

foreach ($typeName in $requiredTypes) {
  Assert-Contains ($qualityIndexSource + $runtimeIndexSource) $typeName "exported type $typeName"
}

Assert-Contains $qualityUiSource "export function BrainGraphLoadingState" "BrainGraphLoadingState is exported"
Assert-Contains $qualityUiSource "export function BrainGraphEmptyState" "BrainGraphEmptyState is exported"
Assert-Contains $qualityUiSource "export function BrainGraphErrorState" "BrainGraphErrorState is exported"
Assert-Contains $qualityUiSource "export function BrainQualityGateStrip" "BrainQualityGateStrip is exported"

Assert-Contains $pageSource "loadPhase" "page-client uses explicit load phase/state"
Assert-Contains $pageSource "loadComplete" "page-client tracks load completion"
Assert-Contains $pageSource "evaluateBrainGraphLoadState" "page-client evaluates graph load state"
Assert-Contains $pageSource "BrainGraphLoadingState" "page-client renders BrainGraphLoadingState"
Assert-Contains $pageSource "BrainGraphEmptyState" "page-client renders BrainGraphEmptyState"
Assert-Contains $pageSource "BrainGraphErrorState" "page-client renders BrainGraphErrorState"
Assert-Contains $pageSource "BrainQualityGateStrip" "page-client renders BrainQualityGateStrip"
Assert-NotContains $pageSource "Loading brain graph'" "page-client loading typo removed"
Assert-Contains $pageSource "Loading brain graph" "page-client contains loading text without trailing apostrophe"
Assert-Contains $pageSource "next.nodes.length === 0 && next.edges.length === 0 ? `"empty`" : `"loaded`"" "page-client distinguishes empty graph from loading"
Assert-Contains $pageSource "setLoadPhase(`"error`")" "page-client handles loadBrainGraph catch path with visible error state"
Assert-Contains $pageSource "onCopyDiagnostic" "page-client exposes error diagnostics"

Assert-Contains $commandCenterSource "data-codexforge-brain-panel-data-integration" "command center preserves panel data integration marker"
Assert-Contains $commandCenterSource "BrainQualityGateStrip" "command center can render quality gate strip"
Assert-Contains $qualityUiSource "data-codexforge-brain-quality-gate-strip" "quality strip marker"
Assert-Contains $qualityUiSource "data-codexforge-brain-panel-gate-status" "panel gate status marker"

Assert-Contains $qualityRuntimeSource "CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS = 1767225600000" "quality fixtures use fixed timestamps"
foreach ($stateNeedle in @(
  "loading",
  "loadedEmpty",
  "loadedLive",
  "recoverableStorageError",
  "fixtureFallback",
  "blocked panel state",
  "mixed panel state"
)) {
  Assert-Contains $qualityRuntimeSource $stateNeedle "quality fixture supports $stateNeedle"
}

foreach ($actionNeedle in @(
  "refresh-graph",
  "open-workspace",
  "use-fixture-fallback"
)) {
  Assert-Contains $qualityRuntimeSource $actionNeedle "empty state recovery action $actionNeedle"
}

Assert-Contains $qualityRuntimeSource "readOnly: true" "quality actions are read-only by default"

Assert-NotContains $changedSource 'from "@/lib/codexforge/brain/graph/brain-graph' "legacy brain-graph import absent"
Assert-NotContains $changedSource 'from "./brain-graph"' "legacy brain-graph relative import absent"
Assert-NotContains $changedSource "from './brain-graph'" "legacy brain-graph single-quote import absent"
Assert-NotContains $changedSource "Math.random" "random behavior absent"
Assert-NotContains ($changedSource.Replace($graphViewSource, "")) "d3-force" "d3-force not added outside existing graph component"
Assert-NotContains $changedSource "vector database" "vector database dependency absent"
Assert-NotContains $changedSource "embedding" "embeddings dependency absent"

foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey", "api_key")) {
  Assert-NotContains $qualityRuntimeSource $needle "external network/API dependency absent in quality runtime: $needle"
}

foreach ($needle in @('from "fs"', "from 'fs'", 'from "path"', "from 'path'", "child_process")) {
  Assert-NotContains $qualityRuntimeSource $needle "direct platform dependency absent in quality runtime: $needle"
}

foreach ($needle in @("localStorage.setItem", "sessionStorage.setItem")) {
  Assert-NotContains $qualityUiSource $needle "browser storage write dependency absent in quality UI: $needle"
}

foreach ($needle in @("setInterval", "setTimeout")) {
  Assert-NotContains $qualityUiSource $needle "timer/background-job dependency absent in quality UI: $needle"
}

foreach ($needle in @("mutation", "mutate", "write storage", "saveBrainGraph")) {
  Assert-NotContains $qualityRuntimeSource $needle "graph/runtime state-change language absent in quality runtime: $needle"
}

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  [string][char]0x00E2,
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  Assert-NotContains $changedSource $needle "mojibake absent"
}

$qualitySuiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-quality-gates\.ps1")).Count
if ($qualitySuiteCount -ne 1) {
  throw "[FAIL] Managed smoke suite should include Brain quality gates exactly once; found $qualitySuiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain quality gates exactly once"

foreach ($scriptName in @(
  "smoke-codexforge-brain-panel-data-integration.ps1",
  "smoke-codexforge-brain-live-snapshot.ps1",
  "smoke-codexforge-brain-layout-polish.ps1",
  "smoke-codexforge-brain-command-palette.ps1",
  "smoke-codexforge-brain-focus-drilldown.ps1",
  "smoke-codexforge-brain-runtime-health-dashboard.ps1",
  "smoke-codexforge-brain-recommendations.ps1",
  "smoke-codexforge-brain-semantic-topology.ps1",
  "smoke-codexforge-brain-replay-lineage.ps1",
  "smoke-codexforge-brain-command-center.ps1",
  "smoke-codexforge-brain-graph-ui.ps1",
  "smoke-codexforge-brain-runtime.ps1"
)) {
  $count = ([regex]::Matches($allSmokeSource, [regex]::Escape($scriptName))).Count
  if ($count -gt 1) { throw "[FAIL] Smoke script duplicated: $scriptName found $count" }
  Write-Host "[PASS] smoke script not duplicated: $scriptName"
}

Write-Host "[OK] CodexForge brain quality gates smoke passed."
