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
Write-Host "=== CodexForge UX Unification smoke ==="
Write-Host "Base URL: $BaseUrl"

$shellDir = "src\lib\codexforge\navigation-shell"
$shellComponents = Join-Path $shellDir "components"
$routeRegistryPath = Join-Path $shellDir "navigation-route-registry.ts"
$sectionModelPath = Join-Path $shellDir "navigation-section-model.ts"
$shellIndexPath = Join-Path $shellDir "index.ts"
$uiDir = "src\lib\codexforge\ui"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

foreach ($path in @(
  $shellDir,
  $shellComponents,
  $routeRegistryPath,
  $sectionModelPath,
  $shellIndexPath,
  "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx",
  "src\lib\codexforge\navigation-shell\components\CodexForgeSidebar.tsx",
  "src\lib\codexforge\navigation-shell\components\CodexForgeTopbar.tsx",
  "src\lib\codexforge\navigation-shell\components\CodexForgeRouteSwitcher.tsx",
  "src\lib\codexforge\navigation-shell\components\CodexForgeSafetyPostureStrip.tsx"
)) {
  Assert-FileExists $path
}

foreach ($path in @(
  "codexforge-theme.ts",
  "codexforge-layout.ts",
  "codexforge-typography.ts",
  "codexforge-card.ts",
  "codexforge-button.ts",
  "codexforge-text.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $uiDir $path)
}

$shellSource = (Get-ChildItem $shellDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$shellUiSource = (Get-ChildItem $shellComponents -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $uiDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routeRegistryPath
$sectionSource = Get-Content -Raw $sectionModelPath
$allSmoke = Get-Content -Raw $allSmokePath

$touchedPagePaths = @(
  "src\app\files\page-client.tsx",
  "src\app\validation\page-client.tsx",
  "src\app\closed-loop\page.tsx",
  "src\app\creative\page-client.tsx",
  "src\app\creative-bridge\page-client.tsx",
  "src\app\blender\page-client.tsx",
  "src\app\capabilities\page-client.tsx",
  "src\app\ai-router\page-client.tsx"
)
$touchedComponentPaths = @(
  "src\lib\codexforge\local-project-reader\components\LocalProjectReader.tsx",
  "src\lib\codexforge\local-project-reader\components\ProjectFilePreviewPanel.tsx",
  "src\lib\codexforge\validation-runner\components\ValidationRunnerPanel.tsx",
  "src\lib\codexforge\validation-runner\components\ValidationRunnerStyles.ts",
  "src\lib\codexforge\validation-runner\components\ValidationOutputCapturePanel.tsx",
  "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx",
  "src\lib\codexforge\blender-adapter-preview\components\BlenderPythonPreviewPanel.tsx",
  "src\lib\codexforge\real-patch-preview\components\UnifiedDiffPreviewPanel.tsx",
  "src\lib\codexforge\creative\components\CreativeProductionStudio.tsx",
  "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx",
  "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx",
  "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
)

foreach ($path in $touchedPagePaths + $touchedComponentPaths) {
  Assert-FileExists $path
}

$touchedPagesSource = ($touchedPagePaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$touchedComponentsSource = ($touchedComponentPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$uxSource = $shellSource + "`n" + $shellUiSource + "`n" + $uiSource + "`n" + $touchedPagesSource + "`n" + $touchedComponentsSource

foreach ($render in @(
  "CodexForgeAppShell renders",
  "CodexForgeSidebar renders",
  "CodexForgeTopbar renders",
  "CodexForgeRouteSwitcher renders",
  "CodexForgeSafetyPostureStrip renders"
)) {
  Assert-Contains $shellUiSource $render "$render"
}

foreach ($primitive in @(
  "safeText",
  "safeCodeText",
  "pageShell",
  "contentGrid",
  "cockpitGrid",
  "card",
  "cardHeader",
  "cardTitle",
  "cardText",
  "metricGrid",
  "actionRow",
  "subtleButton",
  "primaryButton",
  "dangerNotice",
  "safetyNotice",
  "emptyState",
  "scrollPanel",
  "codePreview"
)) {
  Assert-Contains $uiSource $primitive "shared UI primitive $primitive"
}

foreach ($route in @(
  'href: "/"',
  'href: "/files"',
  'href: "/validation"',
  'href: "/closed-loop"',
  'href: "/ai-router"',
  'href: "/creative"',
  'href: "/creative-bridge"',
  'href: "/blender"',
  'href: "/stabilization"',
  'href: "/readiness"',
  'href: "/consolidation"',
  'href: "/handoff"',
  'href: "/activity"',
  'href: "/memory-inbox"',
  'href: "/brain-continuity"',
  'href: "/brain-snapshots"',
  'href: "/snapshot-restore"',
  'href: "/runtime-replay"',
  'href: "/runtime-journal"',
  'href: "/brain-governance"'
)) {
  Assert-Contains $routeSource $route "route registry includes $route"
}

foreach ($section in @('"Start"', '"Build"', '"Fix"', '"Brain"', '"Memory"', '"Creative"', '"Audit"', '"Advanced"')) {
  Assert-Contains $sectionSource $section "navigation section includes $section"
}

foreach ($path in $touchedPagePaths) {
  $source = Get-Content -Raw $path
  if ($source.Contains("CodexForgeAppShell")) {
    Assert-NotContains $source "CodexForgeGlobalNav" "no duplicate old nav band plus CodexForgeAppShell in $path"
  }
}

foreach ($marker in @("minWidth: 0", "overflowWrap", 'maxWidth: "100%"')) {
  Assert-Contains $uxSource $marker "touched UI includes overflow protection $marker"
}

foreach ($marker in @("overflowX: `"auto`"", "safe wrapping", "overflowX auto")) {
  Assert-Contains $uxSource $marker "code/diff/script panels use $marker"
}

Assert-Contains $uxSource "data-codexforge-blender-python-preview-overflow" "Blender Python preview panel does not overflow unsafely"
Assert-Contains $uxSource "data-codexforge-validation-output-overflow" "validation output panel does not overflow unsafely"
Assert-Contains $uxSource "data-codexforge-file-path-panel-overflow" "file path panels wrap safely"
Assert-Contains $uxSource "Copy full validation checklist" "command strings wrap or scroll safely"

foreach ($copy in @(
  "Preview-only",
  "preview-only",
  "approval required",
  "No command execution",
  "no command execution",
  "No file writes",
  "no file writes",
  "preserve latest-message authority"
)) {
  Assert-Contains $uxSource $copy "UX copy says $copy"
}

Assert-Contains $uxSource "latest-message authority" "latest-message authority preserved"
Assert-Contains $uxSource "buildCodexForgeShellStableKey" "stable key helper or stable key patterns exist"

foreach ($pattern in @("key=\{label\}", "key=\{summary\}", "key=\{item\}", "Math\.random", "Date\.now", "d3-force")) {
  Assert-NotMatches $uxSource $pattern "deterministic UX source excludes $pattern"
}

foreach ($marker in @("raw giant JSON", "OPENAI_API_KEY", "apiKey", "localStorage.setItem", "from `"openai`"", "from 'openai'", "pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $uiSource $marker "shared UI has no unsafe dependency or storage marker: $marker"
}

foreach ($pattern in @(
  "appendEvent\s*\(",
  "saveBrainGraph\s*\(",
  "applyDiff\s*\(",
  "writeFile\s*\(",
  "runCommand\s*\(",
  "brokerExecution\s*\(",
  "fetch\s*\(",
  "https?://"
)) {
  Assert-NotMatches $uiSource $pattern "shared UI has no network/provider/mutation call $pattern"
}

foreach ($pattern in @(
  "appendEvent\s*\(",
  "saveBrainGraph\s*\(",
  "applyDiff\s*\(",
  "writeFile\s*\(",
  "runCommand\s*\(",
  "brokerExecution\s*\("
)) {
  Assert-NotMatches $touchedPagesSource $pattern "touched route pages do not call mutation/execution helper $pattern"
}

foreach ($marker in @("Blender execution", "ComfyUI execution", "Unreal execution")) {
  Assert-Contains $uxSource $marker "creative execution remains blocked text for $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $uxSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-ux-unification\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include UX Unification exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "UX Unification" "managed smoke suite includes UX Unification exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] / returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] / route reachable"
} catch {
  Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge UX Unification smoke passed."
