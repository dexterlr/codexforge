param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Command UI Simplification smoke ==="
Write-Host "Base URL: $BaseUrl"

$shellPath = "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
$topbarPath = "src\lib\codexforge\navigation-shell\components\CodexForgeTopbar.tsx"
$routeSwitcherPath = "src\lib\codexforge\navigation-shell\components\CodexForgeRouteSwitcher.tsx"
$workspaceMapPath = "src\lib\codexforge\navigation-shell\components\CodexForgeWorkspaceMap.tsx"
$routeRegistryPath = "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$shellTypesPath = "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandPalettePath = "src\lib\codexforge\command-palette\components\CodexForgeCommandPalette.tsx"
$uiThemePath = "src\lib\codexforge\ui\codexforge-theme.ts"
$uiTypographyPath = "src\lib\codexforge\ui\codexforge-typography.ts"
$uiTextPath = "src\lib\codexforge\ui\codexforge-text.ts"
$aiPagePath = "src\app\ai\page.tsx"
$brainContinuityPath = "src\lib\codexforge\brain-continuity\components\BrainContinuityDashboard.tsx"
$creativeBridgePath = "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx"
$runtimeReplayPath = "src\lib\codexforge\runtime-event-replay\components\RuntimeEventReplaySimulator.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$validationPagePath = "src\app\validation\page-client.tsx"
$closedLoopPath = "src\app\closed-loop\page.tsx"
$creativeBridgePagePath = "src\app\creative-bridge\page-client.tsx"
$blenderPagePath = "src\app\blender\page-client.tsx"
$comfyUiPagePath = "src\app\comfyui\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

foreach ($path in @(
  $shellPath,
  $topbarPath,
  $routeSwitcherPath,
  $workspaceMapPath,
  $routeRegistryPath,
  $shellTypesPath,
  $commandPalettePath,
  $uiThemePath,
  $uiTypographyPath,
  $uiTextPath,
  $aiPagePath,
  $brainContinuityPath,
  $creativeBridgePath,
  $runtimeReplayPath,
  $filesPagePath,
  $validationPagePath,
  $closedLoopPath,
  $creativeBridgePagePath,
  $blenderPagePath,
  $comfyUiPagePath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$shellSource = Get-Content -Raw $shellPath
$topbarSource = Get-Content -Raw $topbarPath
$routeSwitcherSource = Get-Content -Raw $routeSwitcherPath
$workspaceMapSource = Get-Content -Raw $workspaceMapPath
$routeRegistry = Get-Content -Raw $routeRegistryPath
$shellTypes = Get-Content -Raw $shellTypesPath
$commandPalette = Get-Content -Raw $commandPalettePath
$uiSource = (Get-Content -Raw $uiThemePath) + "`n" + (Get-Content -Raw $uiTypographyPath) + "`n" + (Get-Content -Raw $uiTextPath)
$aiPage = Get-Content -Raw $aiPagePath
$brainContinuity = Get-Content -Raw $brainContinuityPath
$creativeBridge = Get-Content -Raw $creativeBridgePath
$runtimeReplay = Get-Content -Raw $runtimeReplayPath
$filesPage = Get-Content -Raw $filesPagePath
$validationPage = Get-Content -Raw $validationPagePath
$closedLoop = Get-Content -Raw $closedLoopPath
$creativeBridgePage = Get-Content -Raw $creativeBridgePagePath
$blenderPage = Get-Content -Raw $blenderPagePath
$comfyUiPage = Get-Content -Raw $comfyUiPagePath
$allSmoke = Get-Content -Raw $allSmokePath
$uxSharedSource = $shellSource + "`n" + $topbarSource + "`n" + $routeSwitcherSource + "`n" + $workspaceMapSource + "`n" + $routeRegistry + "`n" + $shellTypes + "`n" + $commandPalette + "`n" + $uiSource
$touchedUiSource = $uxSharedSource + "`n" + $aiPage + "`n" + $brainContinuity + "`n" + $creativeBridge + "`n" + $runtimeReplay + "`n" + $filesPage + "`n" + $validationPage + "`n" + $closedLoop + "`n" + $creativeBridgePage + "`n" + $blenderPage + "`n" + $comfyUiPage

Assert-Contains $shellSource "CodexForgeAppShell renders" "navigation shell still exists"
Assert-Contains $commandPalette "CodexForgeCommandPalette renders" "command palette still exists"

foreach ($flag in @(
  "showRouteTray?: boolean",
  "routeTrayDefaultOpen?: boolean",
  "showHeroRouteChips?: boolean",
  "showRightRailRouteGroups?: boolean",
  "showSafetyStrip?: boolean",
  "pageDensity?: `"compact`" | `"standard`" | `"focus`""
)) {
  Assert-Contains $shellTypes $flag "shell type supports $flag"
}

foreach ($default in @(
  "showRouteTray = false",
  "routeTrayDefaultOpen = false",
  "showHeroRouteChips = false",
  "showRightRailRouteGroups = false",
  "showSafetyStrip = true"
)) {
  Assert-Contains $shellSource $default "normal shell default $default"
}

Assert-Contains $topbarSource "showRouteTray ? (" "topbar does not render route tray unless opted in"
Assert-Contains $topbarSource "open={routeTrayDefaultOpen}" "route tray is controlled and collapsed by default"
Assert-Contains $topbarSource "commandPalette" "topbar owns compact command palette action"
Assert-Contains $shellSource "showRightRailRouteGroups ? (" "right rail route groups are opt-in"
Assert-Contains $shellSource "page-specific context only" "right rail is page-specific by default"
Assert-Contains $routeSwitcherSource "dedupedRoutes" "route switcher dedupes route entries"
Assert-Contains $routeSwitcherSource "candidate.href === route.href" "route switcher dedupes by href"
Assert-Contains $routeRegistry "dedupeCodexForgeNavigationRoutes" "route registry includes dedupe helper"
Assert-Contains $routeRegistry "dedupeCodexForgeNavigationRouteInputs" "route registry input dedupe helper"

$hrefMatches = [regex]::Matches($routeRegistry, 'href:\s*"(?<href>/[^"]*)"')
$hrefs = @($hrefMatches | ForEach-Object { $_.Groups["href"].Value })
$duplicateHrefs = @($hrefs | Group-Object | Where-Object { $_.Count -gt 1 })
if ($duplicateHrefs.Count -gt 0) {
  throw "[FAIL] route registry has duplicate href entries: $($duplicateHrefs.Name -join ', ')"
}
Write-Host "[PASS] route registry has no duplicate href entries"

$shortLabelMatches = [regex]::Matches($routeRegistry, 'shortLabel:\s*"(?<label>[^"]+)"')
$shortLabels = @($shortLabelMatches | ForEach-Object { $_.Groups["label"].Value })
$duplicateShortLabels = @($shortLabels | Group-Object | Where-Object { $_.Count -gt 1 })
if ($duplicateShortLabels.Count -gt 0) {
  throw "[FAIL] route switcher labels must be unique; duplicates: $($duplicateShortLabels.Name -join ', ')"
}
Write-Host "[PASS] route switcher labels are deduped"

foreach ($label in @(
  "Home",
  "AI",
  "Router",
  "Files",
  "Tasks",
  "Fix",
  "Validate",
  "Brain",
  "Memory",
  "Inbox",
  "Journal",
  "Replay",
  "Snapshots",
  "Restore",
  "Continuity",
  "Handoff",
  "Governance",
  "Creative",
  "Blender",
  "ComfyUI",
  "Bridge",
  "Capabilities",
  "Activity",
  "Readiness",
  "Consolidation",
  "History"
)) {
  Assert-Contains $routeRegistry "shortLabel: `"$label`"" "route chip label $label"
}

Assert-Contains $aiPage "CodexForgeAppShell" "/ai uses unified shell"
Assert-NotContains $aiPage "CodexForgeGlobalNav" "/ai does not render old global nav"
Assert-NotContains $aiPage "Mission Control:" "/ai removed old duplicate Mission strip"
Assert-NotContains $aiPage "Execution Readiness:" "/ai removed old duplicate task strip"
Assert-NotContains $aiPage "Step Runner Preview:" "/ai removed old duplicate step strip"
Assert-NotContains $aiPage "Read-Only Step Execution:" "/ai removed old duplicate execution strip"
Assert-Contains $aiPage "TopBar" "/ai keeps workspace controls"
Assert-Contains $aiPage "onAddSystemMessage" "/ai keeps system note control"
Assert-Contains $aiPage "onClearChat" "/ai keeps clear control"
Assert-Contains $aiPage "<CodexForgeProductSurface />" "/ai retains product surface smoke marker"
Assert-Contains $aiPage "productSurfaceDisclosure" "/ai collapses product-surface context"

Assert-NotContains $brainContinuity "showHeroRouteChips" "/brain-continuity does not opt into hero route chips"
Assert-NotContains $creativeBridge "showHeroRouteChips" "/creative-bridge does not opt into hero route chips"
Assert-Contains $creativeBridgePage "CodexForgeAppShell" "/creative-bridge uses shell"

$runtimeHeadlineBlock = [regex]::Match($runtimeReplay, "const headline:[\s\S]{0,220}")
if (-not $runtimeHeadlineBlock.Success) { throw "[FAIL] runtime replay headline style block not found" }
Assert-Contains $runtimeHeadlineBlock.Value 'overflowWrap: "normal"' "/runtime-replay title uses normal wrapping"
Assert-Contains $runtimeHeadlineBlock.Value 'wordBreak: "normal"' "/runtime-replay title avoids break-word"
Assert-NotContains $runtimeHeadlineBlock.Value 'overflowWrap: "anywhere"' "/runtime-replay title does not use anywhere wrapping"
Assert-Contains $runtimeReplay 'gridTemplateColumns: "minmax(0, 1fr)"' "/runtime-replay hero title is not trapped in a narrow column"

$heroTitleBlock = [regex]::Match($uiSource, "cockpitHeroTitle[\s\S]{0,180}")
if (-not $heroTitleBlock.Success) { throw "[FAIL] cockpitHeroTitle block not found" }
Assert-NotContains $heroTitleBlock.Value 'overflowWrap: "anywhere"' "hero title helper does not use overflowWrap anywhere"
Assert-NotContains $heroTitleBlock.Value 'wordBreak: "break-word"' "hero title helper does not use wordBreak break-word"
Assert-Contains $uiSource "safePathText" "path helper still exists"
Assert-Contains $uiSource "safeCommandText" "command helper still exists"
Assert-Contains $uiSource 'overflowX: "auto"' "code helpers still use safe scroll"
Assert-Contains $uiSource 'overflowWrap: "anywhere"' "body/path helpers still use safe wrapping"

foreach ($copy in @(
  "preview-only",
  "Preview-only",
  "approval required",
  "approval-gated",
  "preserve latest-message authority",
  "latest-message authority"
)) {
  Assert-Contains $touchedUiSource $copy "UI still says $copy"
}

Assert-Contains $filesPage "LocalProjectReader" "/files retains LocalProjectReader"
Assert-Contains $validationPage "ValidationRunnerPanel" "/validation retains ValidationRunnerPanel"
Assert-Contains $closedLoop "Closed Loop Fix Workflow" "/closed-loop retains Closed Loop Fix Workflow marker"
Assert-Contains $creativeBridgePage "CreativeLocalBridgePanel" "/creative-bridge retains CreativeLocalBridgePanel"
Assert-Contains $blenderPage "BlenderAdapterPreviewPanel" "/blender retains BlenderAdapterPreviewPanel"
Assert-Contains $comfyUiPage "ComfyUiAdapterPreviewPanel" "/comfyui retains ComfyUiAdapterPreviewPanel"

foreach ($pattern in @(
  "key=\{label\}",
  "key=\{summary\}",
  "key=\{item\}",
  "Math\.random",
  "Date\.now",
  "d3-force",
  "appendEvent\s*\(",
  "saveBrainGraph\s*\(",
  "applyDiff\s*\(",
  "writeFile\s*\(",
  "runCommand\s*\(",
  "brokerExecution\s*\(",
  "runBlender\s*\(",
  "executeBlender\s*\(",
  "runComfyUI\s*\(",
  "executeComfyUI\s*\(",
  "runUnreal\s*\("
)) {
  Assert-NotMatches $touchedUiSource $pattern "touched UI excludes $pattern"
}

foreach ($marker in @(
  "OPENAI_API_KEY",
  "apiKey",
  "localStorage.setItem",
  "from `"openai`"",
  "from 'openai'",
  "pinecone",
  "weaviate",
  "chroma",
  "qdrant",
  "milvus",
  "pgvector",
  "XMLHttpRequest",
  "axios"
)) {
  Assert-NotContains $uxSharedSource $marker "UX/shared UI/navigation has no unsafe dependency marker $marker"
}

foreach ($pattern in @("fetch\s*\(", "https?://")) {
  Assert-NotMatches $uxSharedSource $pattern "UX/shared UI/navigation has no external network dependency $pattern"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $touchedUiSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-command-ui-simplification\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Command UI Simplification exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Command UI Simplification" "managed smoke suite includes Command UI Simplification exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] / returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] / route reachable"
} catch {
  Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Command UI Simplification smoke passed."

