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

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path -PathType Container)) {
    throw "[FAIL] Missing directory: $Path"
  }

  Write-Host "[PASS] directory exists: $Path"
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

Write-Host "=== CodexForge brain panel data integration smoke ==="
Write-Host "Base URL: $BaseUrl"

$panelDir = "src\lib\codexforge\brain\runtime\panels"
$panelFiles = @(
  "panel-data-types.ts",
  "panel-data-adapters.ts",
  "panel-data-sources.ts",
  "panel-readiness-map.ts",
  "panel-integration-fixtures.ts",
  "index.ts"
)
$runtimeIndexPath = "src\lib\codexforge\brain\runtime\index.ts"
$snapshotIndexPath = "src\lib\codexforge\brain\runtime\snapshot\index.ts"
$commandTypesPath = "src\lib\codexforge\brain\components\brain-command-center-types.ts"
$commandCenterPath = "src\lib\codexforge\brain\components\brain-command-center.tsx"
$pageClientPath = "src\app\brain\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$graphViewPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"

Assert-DirectoryExists $panelDir
foreach ($file in $panelFiles) {
  Assert-FileExists (Join-Path $panelDir $file)
}
Assert-FileExists $snapshotIndexPath
Assert-FileExists $runtimeIndexPath
Assert-FileExists $commandTypesPath
Assert-FileExists $commandCenterPath
Assert-FileExists $pageClientPath
Assert-FileExists $allSmokePath

$panelSource = ($panelFiles | ForEach-Object { Get-Content -Raw (Join-Path $panelDir $_) }) -join "`n"
$panelIndexSource = Get-Content -Raw (Join-Path $panelDir "index.ts")
$runtimeIndexSource = Get-Content -Raw $runtimeIndexPath
$snapshotSource = Get-Content -Raw $snapshotIndexPath
$commandTypesSource = Get-Content -Raw $commandTypesPath
$commandCenterSource = Get-Content -Raw $commandCenterPath
$pageSource = Get-Content -Raw $pageClientPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$graphViewSource = Get-Content -Raw $graphViewPath

$requiredExports = @(
  "buildBrainPanelDataAdapters",
  "adaptBrainMemoryPanelData",
  "adaptBrainRiskPanelData",
  "adaptBrainPredictionPanelData",
  "adaptBrainAgentPanelData",
  "adaptBrainReplayPanelData",
  "adaptBrainLineagePanelData",
  "adaptBrainTopologyPanelData",
  "adaptBrainRecommendationPanelData",
  "adaptBrainHealthPanelData",
  "adaptBrainFocusPanelData",
  "classifyBrainPanelDataSource",
  "buildBrainPanelDataSignal",
  "summarizeBrainPanelDataSource",
  "mergePanelLiveAndFixtureSignals",
  "buildBrainPanelIntegrationReadinessMap",
  "scoreBrainPanelIntegrationReadiness",
  "summarizeBrainPanelIntegrationReadiness",
  "selectLiveBackedBrainPanels",
  "buildBrainPanelIntegrationFixtureSnapshot",
  "buildBrainPanelIntegrationFixtureAdapters",
  "buildBrainPanelIntegrationFixtureReadiness",
  "buildBrainPanelIntegrationFixtureSummary"
)

foreach ($exportName in $requiredExports) {
  Assert-Contains $panelIndexSource $exportName "panel index export $exportName"
  Assert-Contains $runtimeIndexSource $exportName "runtime index export $exportName"
}

$requiredTypes = @(
  "CodexForgeBrainPanelId",
  "CodexForgeBrainPanelDataSource",
  "CodexForgeBrainPanelDataStatus",
  "CodexForgeBrainPanelDataSignal",
  "CodexForgeBrainPanelDataAdapterResult",
  "CodexForgeBrainPanelDataReadiness",
  "CodexForgeBrainPanelIntegrationInput",
  "CodexForgeBrainPanelIntegrationSummary",
  "CodexForgeBrainRuntimeSnapshot"
)

foreach ($typeName in $requiredTypes) {
  Assert-Contains ($panelIndexSource + $runtimeIndexSource + $snapshotSource) $typeName "exported type $typeName"
}

Assert-Contains $commandTypesSource "panelData?" "command center types panel data prop"
Assert-Contains $commandTypesSource "panelReadiness?" "command center types readiness prop"
Assert-Contains $commandTypesSource "panelIntegrationSummary?" "command center types summary prop"
Assert-Contains $commandTypesSource "runtimeSnapshot?" "command center types runtime snapshot prop"

Assert-Contains $pageSource "buildCodexForgeBrainRuntimeSnapshot" "page builds runtime snapshot"
Assert-Contains $pageSource "buildBrainPanelDataAdapters" "page builds panel adapters"
Assert-Contains $pageSource "buildBrainPanelIntegrationReadinessMap" "page builds panel readiness"
Assert-Contains $pageSource "runtimeSnapshot={runtimeSnapshot}" "page passes runtime snapshot"
Assert-Contains $pageSource "panelData={panelData}" "page passes panel data"
Assert-Contains $pageSource "panelReadiness={panelReadiness}" "page passes panel readiness"

$markers = @(
  "data-codexforge-brain-panel-data-integration",
  "data-codexforge-brain-panel-readiness-summary",
  "data-codexforge-brain-panel-source-live",
  "data-codexforge-brain-panel-source-fixture",
  "data-codexforge-brain-panel-source-mixed"
)

foreach ($marker in $markers) {
  Assert-Contains $commandCenterSource $marker "command center marker $marker"
}

$highValuePanels = @{
  "src\lib\codexforge\brain\components\brain-memory-clusters-panel.tsx" = "data-codexforge-brain-memory-clusters"
  "src\lib\codexforge\brain\components\brain-risk-panel.tsx" = "data-codexforge-brain-risk"
  "src\lib\codexforge\brain\components\brain-recommendations-panel.tsx" = "data-codexforge-brain-recommendations-panel"
  "src\lib\codexforge\brain\components\brain-semantic-heatmap-panel.tsx" = "data-codexforge-brain-semantic-heatmap-panel"
  "src\lib\codexforge\brain\components\brain-runtime-health-panel.tsx" = "data-codexforge-brain-runtime-health-panel"
  "src\lib\codexforge\brain\components\brain-focus-mode-panel.tsx" = "data-codexforge-brain-focus-mode-panel"
  "src\lib\codexforge\brain\components\brain-live-snapshot-panel.tsx" = "data-codexforge-brain-live-snapshot-panel"
}

foreach ($entry in $highValuePanels.GetEnumerator()) {
  Assert-FileExists $entry.Key
  $source = Get-Content -Raw $entry.Key
  Assert-Contains $source "panelData" "$($entry.Key) panelData reference"
  Assert-Contains $source $entry.Value "$($entry.Key) existing marker preserved"
}

Assert-Contains $panelSource "CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS" "fixed timestamp constant"
Assert-NotContains $panelSource "Date.now" "Date.now absent from panel integration"
Assert-Contains $panelSource "Math.max(0, Math.min(1" "readiness scoring clamps between 0 and 1"
Assert-NotContains $panelSource "localStorage" "panel adapters do not read storage directly"
Assert-NotContains $panelSource "sessionStorage" "panel adapters do not read session storage"

foreach ($sourceLabel in @('"live"', '"fixture"', '"mixed"', '"unavailable"')) {
  Assert-Contains $panelSource $sourceLabel "adapter supports source $sourceLabel"
}

Assert-Contains $pageSource "buildBrainPanelIntegrationFixtureAdapters" "page uses fixture fallback adapters"
Assert-NotContains $pageSource "localStorage.setItem" "page-client panel integration localStorage writes absent"
Assert-NotContains $pageSource "sessionStorage.setItem" "page-client panel integration sessionStorage writes absent"

$changedSource = ($panelSource + "`n" + $snapshotSource + "`n" + $commandCenterSource + "`n" + $commandTypesSource + "`n" + $pageSource)

Assert-NotContains $changedSource 'from "@/lib/codexforge/brain/graph/brain-graph' "legacy brain-graph import absent"
Assert-NotContains $changedSource 'from "./brain-graph"' "legacy brain-graph relative import absent"
Assert-NotContains $changedSource "from './brain-graph'" "legacy brain-graph single-quote import absent"
Assert-NotContains $changedSource "Math.random" "random behavior absent"
Assert-NotContains ($changedSource.Replace($graphViewSource, "")) "d3-force" "d3-force not added outside graph component"
Assert-NotContains $changedSource "vector database" "vector database dependency absent"
Assert-NotContains $changedSource "embedding" "embeddings dependency absent"

$networkNeedles = @(
  "fetch(",
  "XMLHttpRequest",
  "WebSocket",
  "OpenAI",
  "API-key",
  "apiKey",
  "api_key"
)

foreach ($needle in $networkNeedles) {
  Assert-NotContains $panelSource $needle "external network/API dependency absent: $needle"
}

$platformNeedles = @(
  'from "fs"',
  "from 'fs'",
  'from "path"',
  "from 'path'",
  "child_process"
)

foreach ($needle in $platformNeedles) {
  Assert-NotContains $panelSource $needle "direct platform dependency absent: $needle"
}

$timerNeedles = @(
  "setInterval",
  "setTimeout",
  "requestAnimationFrame"
)

foreach ($needle in $timerNeedles) {
  Assert-NotContains $panelSource $needle "timer/background-job dependency absent: $needle"
}

$stateChangeNeedles = @(
  "mutation",
  "mutate",
  "write storage",
  "saveBrainGraph"
)

foreach ($needle in $stateChangeNeedles) {
  Assert-NotContains $panelSource $needle "state-change language absent in panel integration: $needle"
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

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-panel-data-integration\.ps1")).Count
if ($suiteCount -ne 1) {
  throw "[FAIL] Managed smoke suite should include Brain panel data integration exactly once; found $suiteCount"
}
Write-Host "[PASS] managed smoke suite includes Brain panel data integration exactly once"

$liveSnapshotCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-live-snapshot\.ps1")).Count
if ($liveSnapshotCount -gt 1) {
  throw "[FAIL] Brain live snapshot smoke is duplicated; found $liveSnapshotCount"
}
Write-Host "[PASS] Brain live snapshot smoke is not duplicated"

Write-Host "[OK] CodexForge brain panel data integration smoke passed."
