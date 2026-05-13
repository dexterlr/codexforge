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

Write-Host "=== CodexForge brain command palette smoke ==="
Write-Host "Base URL: $BaseUrl"

$commandDir = "src\lib\codexforge\brain\components\commands"
$commandFiles = @(
  "$commandDir\brain-command-types.ts",
  "$commandDir\brain-command-registry.ts",
  "$commandDir\brain-command-search.ts",
  "$commandDir\brain-command-shortcuts.ts",
  "$commandDir\index.ts"
)
$uiFiles = @(
  "src\lib\codexforge\brain\components\brain-command-palette.tsx",
  "src\lib\codexforge\brain\components\brain-keyboard-shortcuts-panel.tsx",
  "src\lib\codexforge\brain\components\brain-command-status-bar.tsx",
  "src\lib\codexforge\brain\components\brain-quick-jump-panel.tsx"
)

if (-not (Test-Path $commandDir)) { throw "[FAIL] Missing command package directory: $commandDir" }
Write-Host "[PASS] command package directory exists"
foreach ($file in $commandFiles + $uiFiles) { Assert-FileExists $file }

$typesSource = Get-Content -Raw "$commandDir\brain-command-types.ts"
$registrySource = Get-Content -Raw "$commandDir\brain-command-registry.ts"
$searchSource = Get-Content -Raw "$commandDir\brain-command-search.ts"
$shortcutsSource = Get-Content -Raw "$commandDir\brain-command-shortcuts.ts"
$indexSource = Get-Content -Raw "$commandDir\index.ts"
$paletteSource = Get-Content -Raw $uiFiles[0]
$shortcutsPanelSource = Get-Content -Raw $uiFiles[1]
$statusBarSource = Get-Content -Raw $uiFiles[2]
$quickJumpSource = Get-Content -Raw $uiFiles[3]
$commandCenterSource = Get-Content -Raw "src\lib\codexforge\brain\components\brain-command-center.tsx"
$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$combinedCommandSource = ($commandFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedUiSource = ($uiFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$combinedNewSource = "$combinedCommandSource`n$combinedUiSource"

$indexApis = @(
  "CodexForgeBrainCommandKind",
  "CodexForgeBrainCommandCategory",
  "CodexForgeBrainCommandSafety",
  "CodexForgeBrainCommand",
  "CodexForgeBrainCommandGroup",
  "CodexForgeBrainCommandShortcut",
  "CodexForgeBrainCommandSearchResult",
  "CodexForgeBrainCommandRegistryInput",
  "CodexForgeBrainCommandPaletteState",
  "buildBrainCommandRegistry",
  "buildBrainModeCommands",
  "buildBrainFocusCommands",
  "buildBrainInspectionCommands",
  "groupBrainCommands",
  "searchBrainCommands",
  "scoreBrainCommandMatch",
  "normalizeBrainCommandQuery",
  "sortBrainCommandResults",
  "getBrainKeyboardShortcuts",
  "matchBrainKeyboardShortcut",
  "formatBrainKeyboardShortcut",
  "summarizeBrainKeyboardShortcuts"
)
foreach ($api in $indexApis) { Assert-Contains $indexSource $api "command package index exports $api" }

Assert-Contains $paletteSource "export function BrainCommandPalette" "BrainCommandPalette export"
Assert-Contains $shortcutsPanelSource "export function BrainKeyboardShortcutsPanel" "BrainKeyboardShortcutsPanel export"
Assert-Contains $statusBarSource "export function BrainCommandStatusBar" "BrainCommandStatusBar export"
Assert-Contains $quickJumpSource "export function BrainQuickJumpPanel" "BrainQuickJumpPanel export"

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
  Assert-Contains $registrySource "mode: `"$mode`"" "command registry includes mode $mode"
}

foreach ($kind in @(
  "switch-mode",
  "open-panel",
  "focus-target",
  "open-drilldown",
  "inspect-health",
  "inspect-recommendation",
  "inspect-insight",
  "inspect-topology",
  "inspect-lineage",
  "inspect-replay",
  "inspect-agent",
  "inspect-file",
  "inspect-memory",
  "inspect-risk",
  "show-shortcuts",
  "close-palette"
)) {
  Assert-Contains $typesSource "| `"$kind`"" "command kind $kind"
}

foreach ($category in @(
  "navigation",
  "focus",
  "graph",
  "replay",
  "lineage",
  "topology",
  "recommendations",
  "health",
  "agents",
  "files",
  "memory",
  "safety",
  "help"
)) {
  Assert-Contains $typesSource "| `"$category`"" "command category $category"
}

foreach ($safety in @("read-only", "approval-required", "unavailable")) {
  Assert-Contains $typesSource "| `"$safety`"" "command safety $safety"
}

foreach ($shortcut in @("Ctrl+K", "Cmd+K", "Escape", "G then G", "G then F", "G then H", "G then S")) {
  Assert-Contains $shortcutsSource $shortcut "shortcut $shortcut"
}

foreach ($component in @(
  "BrainCommandPalette",
  "BrainCommandStatusBar",
  "BrainQuickJumpPanel",
  "BrainKeyboardShortcutsPanel"
)) {
  Assert-Contains $commandCenterSource $component "command center imports/renders $component"
  Assert-Contains $commandCenterSource "<$component" "command center renders $component"
}

foreach ($marker in @(
  "data-codexforge-brain-command-palette",
  "data-codexforge-brain-command-search",
  "data-codexforge-brain-command-result",
  "data-codexforge-brain-command-category",
  "data-codexforge-brain-command-safety",
  "data-codexforge-brain-keyboard-shortcuts-panel",
  "data-codexforge-brain-keyboard-shortcut",
  "data-codexforge-brain-command-status-bar",
  "data-codexforge-brain-command-readonly",
  "data-codexforge-brain-active-mode",
  "data-codexforge-brain-quick-jump-panel",
  "data-codexforge-brain-quick-jump-command"
)) {
  Assert-Contains ($combinedUiSource + $commandCenterSource) $marker "marker $marker"
}

Assert-Contains $searchSource "Math.min(1, Math.max(0" "command search scoring clamps between 0 and 1"
Assert-Contains $paletteSource 'command.safety === "read-only"' "command palette enforces read-only activation"
Assert-Contains $paletteSource "data-codexforge-brain-command-safety" "command palette marks safety state"
Assert-Contains $registrySource '"approval-required"' "registry includes approval-required safety label"
Assert-Contains $registrySource '"unavailable"' "registry includes unavailable safety label"

Assert-NotContains $combinedNewSource "brain-graph" "legacy brain-graph import absent"
Assert-NotContains $combinedNewSource "Math.random" "random behavior absent"
Assert-NotContains $combinedNewSource "d3-force" "d3-force not added outside graph component"
Assert-NotContains $combinedNewSource "vector database" "vector database dependency absent"
Assert-NotContains $combinedNewSource "embedding" "embeddings dependency absent"
foreach ($needle in @("fetch(", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key")) {
  Assert-NotContains $combinedNewSource $needle "external network dependency absent: $needle"
}
foreach ($needle in @('from "fs', "from 'fs", 'from "path', "from 'path", "child_process")) {
  Assert-NotContains $combinedNewSource $needle "filesystem dependency absent: $needle"
}
foreach ($needle in @("localStorage", "sessionStorage", "setInterval", "setTimeout")) {
  Assert-NotContains $combinedNewSource $needle "storage or timer dependency absent: $needle"
}
foreach ($needle in @("write-file", "apply-diff", "run-command")) {
  Assert-NotContains $combinedNewSource $needle "executable mutation command absent: $needle"
}

$forbiddenMojibake = @([string][char]0x00C3, [string][char]0x00C2, [string][char]0x00E2, [string][char]0xFFFD)
foreach ($needle in $forbiddenMojibake) { Assert-NotContains $combinedNewSource $needle "mojibake absent" }

$suiteCount = ([regex]::Matches($allSmokeSource, "smoke-codexforge-brain-command-palette\.ps1")).Count
if ($suiteCount -ne 1) { throw "[FAIL] Managed smoke suite should include Brain command palette exactly once; found $suiteCount" }
Write-Host "[PASS] managed smoke suite includes Brain command palette exactly once"

foreach ($suite in @(
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

Write-Host "[OK] CodexForge brain command palette smoke passed."

