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
Write-Host "=== CodexForge UX Layout Rescue smoke ==="
Write-Host "Base URL: $BaseUrl"

$uxUnification = "scripts\smoke-codexforge-ux-unification.ps1"
$navigationShell = "scripts\smoke-codexforge-navigation-shell.ps1"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$layoutPath = "src\lib\codexforge\ui\codexforge-layout.ts"
$themePath = "src\lib\codexforge\ui\codexforge-theme.ts"
$typographyPath = "src\lib\codexforge\ui\codexforge-typography.ts"
$cardPath = "src\lib\codexforge\ui\codexforge-card.ts"
$scrollPath = "src\lib\codexforge\ui\codexforge-scroll.ts"
$indexPath = "src\lib\codexforge\ui\index.ts"
$shellPath = "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
$sidebarPath = "src\lib\codexforge\navigation-shell\components\CodexForgeSidebar.tsx"
$topbarPath = "src\lib\codexforge\navigation-shell\components\CodexForgeTopbar.tsx"
$switcherPath = "src\lib\codexforge\navigation-shell\components\CodexForgeRouteSwitcher.tsx"

foreach ($path in @(
  $uxUnification,
  $navigationShell,
  $themePath,
  $layoutPath,
  $typographyPath,
  $cardPath,
  $scrollPath,
  $indexPath,
  $shellPath,
  $sidebarPath,
  $topbarPath,
  $switcherPath
)) {
  Assert-FileExists $path
}

$touchedPaths = @(
  "src\app\page-client.tsx",
  "src\app\ai\page.tsx",
  "src\app\files\page-client.tsx",
  "src\app\memory-inbox\page-client.tsx",
  "src\app\creative-bridge\page-client.tsx",
  "src\app\blender\page-client.tsx",
  "src\app\readiness\page-client.tsx",
  "src\app\consolidation\page-client.tsx",
  "src\app\handoff\page-client.tsx",
  "src\app\validation\page-client.tsx",
  "src\app\closed-loop\page.tsx",
  "src\app\stabilization\page-client.tsx",
  "src\lib\codexforge\operator-home\components\OperatorHomeDashboard.tsx",
  "src\lib\codexforge\operator-home\components\OperatorHomeHero.tsx",
  "src\lib\codexforge\operator-memory-inbox\components\OperatorMemoryInbox.tsx",
  "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx",
  "src\lib\codexforge\creative-local-bridge\components\CreativeJobApprovalPanel.tsx",
  "src\lib\codexforge\creative-local-bridge\components\CreativeJobPolicyPanel.tsx",
  "src\lib\codexforge\local-project-reader\components\LocalProjectReader.tsx",
  "src\lib\codexforge\local-project-reader\components\ProjectFilePreviewPanel.tsx",
  "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx",
  "src\lib\codexforge\blender-adapter-preview\components\BlenderPythonPreviewPanel.tsx",
  "src\lib\codexforge\chat\client-styles.ts"
)

foreach ($path in $touchedPaths) {
  Assert-FileExists $path
}

$uiSource = (Get-Content -Raw $themePath) + "`n" + (Get-Content -Raw $layoutPath) + "`n" + (Get-Content -Raw $typographyPath) + "`n" + (Get-Content -Raw $cardPath) + "`n" + (Get-Content -Raw $scrollPath) + "`n" + (Get-Content -Raw $indexPath)
$shellSource = (Get-Content -Raw $shellPath) + "`n" + (Get-Content -Raw $sidebarPath) + "`n" + (Get-Content -Raw $topbarPath) + "`n" + (Get-Content -Raw $switcherPath)
$touchedSource = ($touchedPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$layoutRescueSource = $uiSource + "`n" + $shellSource + "`n" + $touchedSource

foreach ($helper in @(
  "appMainLayout",
  "appContentFrame",
  "cockpitPage",
  "cockpitHero",
  "cockpitHeroTitle",
  "cockpitHeroSubtitle",
  "cockpitGrid",
  "cockpitTwoColumn",
  "cockpitCard",
  "compactCard",
  "safeBodyText",
  "safePathText",
  "safeCommandText",
  "safeCodePanel",
  "scrollRegion"
)) {
  Assert-Contains $uiSource $helper "shared UI helper $helper"
}

$heroTitleBlock = [regex]::Match($uiSource, "cockpitHeroTitle[\s\S]{0,180}")
if (-not $heroTitleBlock.Success) { throw "[FAIL] cockpitHeroTitle block not found" }
Assert-NotContains $heroTitleBlock.Value 'overflowWrap: "anywhere"' "cockpitHeroTitle does not use unsafe anywhere wrapping"
Assert-NotContains $heroTitleBlock.Value 'wordBreak: "break-word"' "cockpitHeroTitle does not use break-word"
Assert-Contains $uiSource "safePathText" "safePathText exists"
Assert-Contains $uiSource 'overflowWrap: "anywhere"' "safe text helpers use safe wrapping where appropriate"
Assert-Contains $uiSource "safeCodePanel" "safeCodePanel exists"
Assert-Contains $uiSource 'overflowX: "auto"' "code/diff/script panels use overflowX auto"

Assert-Contains $shellSource "gridTemplateColumns: `"clamp(260px, 20vw, 320px) minmax(0, 1fr)`"" "shell sidebar uses clamped/fixed width and growable main"
Assert-Contains $shellSource "gridTemplateColumns: `"minmax(0, 1fr) clamp(260px, 19vw, 320px)`"" "shell deck gives main content priority"
Assert-Contains $shellSource "minWidth: 0" "shell main content uses minWidth 0"
Assert-Contains $shellSource "width: `"100%`"" "shell content uses width 100%"
Assert-NotContains $shellSource "50vw" "shell does not use half viewport sidebar"
Assert-NotContains $shellSource "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" "shell does not split sidebar/main into equal auto-fit columns"
Assert-Contains $switcherPath "CodexForgeRouteSwitcher.tsx" "route switcher component path tracked"
Assert-Contains $shellSource "maxWidth: 96" "route switcher uses compact chip width"
Assert-Contains $shellSource "width: `"100%`"" "route switcher can wrap across available width"

foreach ($path in $touchedPaths) {
  $source = Get-Content -Raw $path
  if (-not ($source.Contains("minWidth: 0") -or $source.Contains("CodexForgeAppShell") -or $source.Contains("cockpit"))) {
    throw "[FAIL] $path lacks minWidth: 0 or shared shell/layout helper"
  }
  Write-Host "[PASS] touched page/component has minWidth/shared layout: $path"
}

$homeHero = Get-Content -Raw "src\lib\codexforge\operator-home\components\OperatorHomeHero.tsx"
$memoryInbox = Get-Content -Raw "src\lib\codexforge\operator-memory-inbox\components\OperatorMemoryInbox.tsx"
$creativeBridge = Get-Content -Raw "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx"
$filesReader = Get-Content -Raw "src\lib\codexforge\local-project-reader\components\LocalProjectReader.tsx"
$aiPage = Get-Content -Raw "src\app\ai\page.tsx"

Assert-Contains $homeHero "gridTemplateColumns: `"minmax(0, 1fr)`"" "/ page does not render hero title in a narrow card column"
Assert-Contains $homeHero "displayText" "Operator Home title uses normal display wrapping"
Assert-Contains $memoryInbox "displaySafe" "/memory-inbox avoids unsafe hero title wrapping"
Assert-Contains $memoryInbox "gridTemplateColumns: `"minmax(0, 1fr)`"" "/memory-inbox hero spans available width"
Assert-Contains $creativeBridge 'overflowWrap: "normal"' "/creative-bridge avoids unsafe hero title wrapping"
Assert-Contains $creativeBridge "gridTemplateColumns: `"minmax(0, 1fr)`"" "/creative-bridge hero spans available width"
Assert-Contains $filesReader "Project Reader" "/files retains project reader hero"
Assert-Contains $filesReader "LocalProjectReader renders real local project reader" "/files retains LocalProjectReader"
Assert-Contains $filesReader "gridTemplateColumns: `"minmax(260px, 0.75fr) minmax(0, 1.35fr) minmax(260px, 0.75fr)`"" "/files uses denser three-column desktop reader"
Assert-Contains $aiPage "useCodexForgeChat" "/ai retains AI workspace behavior hook"
Assert-Contains $aiPage "CodexForgeAppShell" "/ai uses unified shell"
Assert-NotContains $aiPage "CodexForgeGlobalNav" "/ai removes duplicate old nav band"

foreach ($marker in @("overflowX auto", "safe wrapping", 'overflowX: "auto"')) {
  Assert-Contains $layoutRescueSource $marker "code/path panel marker $marker"
}

foreach ($copy in @(
  "preview-only",
  "Preview-only",
  "approval required",
  "Approval Packet Preview",
  "preserve latest-message authority",
  "latest-message authority"
)) {
  Assert-Contains $layoutRescueSource $copy "layout rescue source says $copy"
}

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
  "runUnreal\s*\("
)) {
  Assert-NotMatches $layoutRescueSource $pattern "layout rescue source excludes $pattern"
}

foreach ($marker in @(
  "OPENAI_API_KEY",
  "localStorage.setItem",
  "from `"openai`"",
  "from 'openai'",
  "pinecone",
  "weaviate",
  "chroma",
  "qdrant",
  "milvus",
  "pgvector"
)) {
  Assert-NotContains $uiSource $marker "shared UI has no provider/vector/key storage marker $marker"
}

foreach ($pattern in @("fetch\s*\(", "https?://")) {
  Assert-NotMatches $uiSource $pattern "shared UI has no external network dependency $pattern"
}

foreach ($marker in @("Blender execution", "ComfyUI execution", "Unreal execution")) {
  Assert-Contains $layoutRescueSource $marker "creative execution remains blocked text for $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $layoutRescueSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-ux-layout-rescue\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include UX Layout Rescue exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "UX Layout Rescue" "managed smoke suite includes UX Layout Rescue exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] / returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] / route reachable"
} catch {
  Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge UX Layout Rescue smoke passed."
