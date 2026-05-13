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

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern)) { throw "[FAIL] Unexpected $Name pattern: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge brain layout polish smoke ==="
Write-Host "Base URL: $BaseUrl"

$uiDir = "src\lib\codexforge\brain\components\ui"
$uiFiles = @(
  "$uiDir\brain-ui-primitives.tsx",
  "$uiDir\brain-ui-tokens.ts",
  "$uiDir\brain-responsive-shell.tsx",
  "$uiDir\brain-panel-frame.tsx",
  "$uiDir\brain-density-controls.tsx",
  "$uiDir\index.ts"
)

$componentFiles = @(
  "src\lib\codexforge\brain\components\brain-command-center.tsx",
  "src\lib\codexforge\brain\components\brain-mode-tabs.tsx",
  "src\lib\codexforge\brain\components\brain-command-palette.tsx",
  "src\lib\codexforge\brain\components\brain-command-status-bar.tsx",
  "src\lib\codexforge\brain\components\brain-quick-jump-panel.tsx",
  "src\lib\codexforge\brain\components\brain-runtime-health-panel.tsx",
  "src\lib\codexforge\brain\components\brain-recommendations-panel.tsx",
  "src\lib\codexforge\brain\components\brain-focus-mode-panel.tsx",
  "src\lib\codexforge\brain\components\brain-semantic-heatmap-panel.tsx",
  "src\lib\codexforge\brain\components\brain-knowledge-topology-panel.tsx"
)

$preservedFiles = @(
  "src\app\brain\page-client.tsx",
  "src\lib\codexforge\brain\components\brain-replay-panel.tsx",
  "src\lib\codexforge\brain\components\brain-lineage-panel.tsx",
  "src\lib\codexforge\brain\components\brain-graph-view.tsx"
)

if (-not (Test-Path $uiDir)) { throw "[FAIL] Missing brain UI polish package directory: $uiDir" }
Write-Host "[PASS] brain UI polish package directory exists"

foreach ($file in $uiFiles + $componentFiles + $preservedFiles) {
  Assert-FileExists $file
}

$indexSource = Get-Content -Raw "$uiDir\index.ts"
$tokensSource = Get-Content -Raw "$uiDir\brain-ui-tokens.ts"
$primitivesSource = Get-Content -Raw "$uiDir\brain-ui-primitives.tsx"
$responsiveSource = Get-Content -Raw "$uiDir\brain-responsive-shell.tsx"
$panelFrameSource = Get-Content -Raw "$uiDir\brain-panel-frame.tsx"
$densitySource = Get-Content -Raw "$uiDir\brain-density-controls.tsx"
$commandCenterSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$tabsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-mode-tabs.tsx"
$paletteSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-palette.tsx"
$statusBarSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-status-bar.tsx"
$quickJumpSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-quick-jump-panel.tsx"
$recommendationsSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-recommendations-panel.tsx"
$healthSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-runtime-health-panel.tsx"
$topologySource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-knowledge-topology-panel.tsx"
$heatmapSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-semantic-heatmap-panel.tsx"
$focusSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-focus-mode-panel.tsx"
$replaySource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-replay-panel.tsx"
$lineageSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-lineage-panel.tsx"
$graphSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-graph-view.tsx"
$pageSource = Get-Content -Raw "src\app\brain\page-client.tsx"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedPolishSource = (($uiFiles + $componentFiles) | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

$requiredIndexExports = @(
  "BRAIN_UI_TOKENS",
  "BRAIN_PANEL_SURFACE_STYLES",
  "BRAIN_PANEL_TEXT_STYLES",
  "BRAIN_PANEL_BADGE_STYLES",
  "getBrainSeverityTone",
  "getBrainStatusTone",
  "BrainResponsiveShell",
  "BrainPanelFrame",
  "BrainDensityControls",
  "BrainSectionHeader",
  "BrainMetricPill",
  "BrainStatusBadge",
  "BrainSignalList",
  "BrainEmptyState",
  "BrainReadOnlyBadge"
)

foreach ($api in $requiredIndexExports) {
  Assert-Contains $indexSource $api "brain UI index exports $api"
}

foreach ($api in @(
  "export function BrainResponsiveShell",
  "export function BrainPanelFrame",
  "export function BrainDensityControls"
)) {
  Assert-Contains ($responsiveSource + $panelFrameSource + $densitySource) $api "shared UI export $api"
}

foreach ($api in @(
  "export function BrainSectionHeader",
  "export function BrainMetricPill",
  "export function BrainStatusBadge",
  "export function BrainSignalList",
  "export function BrainEmptyState",
  "export function BrainReadOnlyBadge"
)) {
  Assert-Contains $primitivesSource $api "primitive export $api"
}

foreach ($api in @(
  "BRAIN_UI_TOKENS",
  "BRAIN_PANEL_SURFACE_STYLES",
  "BRAIN_PANEL_TEXT_STYLES",
  "BRAIN_PANEL_BADGE_STYLES",
  "getBrainSeverityTone",
  "getBrainStatusTone"
)) {
  Assert-Contains $tokensSource $api "token export $api"
}

Assert-Contains $commandCenterSource "BrainResponsiveShell" "command center imports BrainResponsiveShell"
Assert-Contains $commandCenterSource "<BrainResponsiveShell" "command center renders BrainResponsiveShell"
Assert-Contains $commandCenterSource "data-codexforge-brain-command-center-polished" "command center polish marker"
Assert-Contains $commandCenterSource "BrainDensityControls" "command center includes density controls"
Assert-Contains ($commandCenterSource + $densitySource) "data-codexforge-brain-density-controls" "density controls marker reachable through import"

foreach ($mode in @(
  "graph",
  "memory",
  "risk",
  "prediction",
  "agents",
  "replay",
  "lineage",
  "semantic-heatmap",
  "knowledge-topology",
  "recommendations",
  "insight-queue",
  "runtime-health",
  "system-status",
  "focus-mode",
  "drilldown"
)) {
  Assert-Contains $tabsSource "id: `"$mode`"" "mode tabs preserve mode $mode"
}

foreach ($marker in @(
  "data-codexforge-brain-mode-tabs",
  "data-codexforge-brain-mode-tab",
  "data-codexforge-brain-mode-tab-active"
)) {
  Assert-Contains $tabsSource $marker "mode tab marker $marker"
}

foreach ($marker in @(
  "data-codexforge-brain-command-palette",
  "data-codexforge-brain-command-search",
  "data-codexforge-brain-command-result",
  "data-codexforge-brain-command-category",
  "data-codexforge-brain-command-safety"
)) {
  Assert-Contains $paletteSource $marker "command palette marker $marker"
}

Assert-Contains $paletteSource "aria-label=`"Search read-only Brain commands`"" "command palette input aria-label"
Assert-Contains $statusBarSource "data-codexforge-brain-command-readonly" "command status bar read-only marker"
Assert-Contains $quickJumpSource "data-codexforge-brain-quick-jump-panel" "quick jump panel marker"
Assert-Contains $quickJumpSource "data-codexforge-brain-quick-jump-command" "quick jump command marker"

foreach ($marker in @(
  "data-codexforge-brain-section-header",
  "data-codexforge-brain-metric-pill",
  "data-codexforge-brain-status-badge",
  "data-codexforge-brain-readonly-badge",
  "data-codexforge-brain-responsive-shell",
  "data-codexforge-brain-panel-frame",
  "data-codexforge-brain-density-controls",
  "data-codexforge-brain-density-option"
)) {
  Assert-Contains $combinedUiSource $marker "shared UI marker $marker"
}

$markerSources = "$combinedUiSource`n$commandCenterSource`n$paletteSource`n$statusBarSource`n$quickJumpSource`n$recommendationsSource`n$healthSource`n$topologySource`n$heatmapSource`n$focusSource`n$replaySource`n$lineageSource`n$graphSource`n$pageSource"

foreach ($marker in @(
  "data-codexforge-brain-command-center",
  "data-codexforge-brain-responsive-shell",
  "data-codexforge-brain-density-controls",
  "data-codexforge-brain-command-center-polished",
  "data-codexforge-brain-command-palette",
  "data-codexforge-brain-command-status-bar",
  "data-codexforge-brain-command-readonly",
  "data-codexforge-brain-quick-jump-panel",
  "data-codexforge-brain-recommendations-panel",
  "data-codexforge-brain-recommendations-summary",
  "data-codexforge-brain-recommendation-next-action",
  "data-codexforge-brain-approval-boundary",
  "data-codexforge-brain-runtime-health-panel",
  "data-codexforge-brain-runtime-health-score",
  "data-codexforge-brain-runtime-health-signal",
  "data-codexforge-brain-runtime-health-next-action",
  "data-codexforge-brain-knowledge-topology-panel",
  "data-codexforge-brain-topology-node",
  "data-codexforge-brain-topology-edge",
  "data-codexforge-brain-topology-hotspot",
  "data-codexforge-brain-semantic-heatmap-panel",
  "data-codexforge-brain-heatmap-cell",
  "data-codexforge-brain-focus-mode-panel",
  "data-codexforge-brain-focus-summary",
  "data-codexforge-brain-focus-next-drilldown",
  "data-codexforge-brain-replay-panel",
  "data-codexforge-brain-replay-frame",
  "data-codexforge-brain-lineage-panel",
  "data-codexforge-brain-lineage-node",
  "data-codexforge-brain-graph-preserved",
  "data-codexforge-brain-graph-view",
  "data-codexforge-brain-graph-insight-panel"
)) {
  Assert-Contains $markerSources $marker "preserved marker $marker"
}

Assert-NotMatches $combinedPolishSource "from\s+[`"'][^`"']*brain-graph[`"']" "legacy brain-graph import absent"
Assert-NotContains $combinedPolishSource "Math.random" "random behavior absent"
Assert-NotContains $combinedPolishSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedPolishSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedPolishSource "embedding" "dependency absent: embedding"

foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key")) {
  Assert-NotContains $combinedUiSource $needle "external network dependency absent in polish files: $needle"
}
foreach ($needle in @("from `"fs", "from 'fs", "from `"path", "from 'path", "child_process")) {
  Assert-NotContains $combinedUiSource $needle "direct filesystem dependency absent in polish files: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage")) {
  Assert-NotContains $combinedUiSource $needle "browser storage absent in polish files: $needle"
}
foreach ($needle in @("setInterval", "setTimeout")) {
  Assert-NotContains $combinedUiSource $needle "timer dependency absent in polish files: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedPolishSource $needle "mojibake absent" }

$layoutSuiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-layout-polish\.ps1")).Count
if ($layoutSuiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain layout polish exactly once; found $layoutSuiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain layout polish exactly once"

foreach ($suite in @(
  "smoke-codexforge-brain-command-palette\.ps1",
  "smoke-codexforge-brain-focus-drilldown\.ps1",
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

Write-Host "[OK] CodexForge brain layout polish smoke passed."
