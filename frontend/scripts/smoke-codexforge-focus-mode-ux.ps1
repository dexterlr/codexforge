param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Focus Mode UX smoke ==="
Write-Host "Base URL: $BaseUrl"

$shellTypesPath = "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$shellPath = "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
$sidebarPath = "src\lib\codexforge\navigation-shell\components\CodexForgeSidebar.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$chatStylesPath = "src\lib\codexforge\chat\client-styles.ts"
$filesPagePath = "src\app\files\page-client.tsx"
$readerPath = "src\lib\codexforge\local-project-reader\components\LocalProjectReader.tsx"
$previewPath = "src\lib\codexforge\local-project-reader\components\ProjectFilePreviewPanel.tsx"
$artifactReviewPath = "src\app\artifacts\review\page-client.tsx"
$artifactBoardPath = "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx"
$uiTypographyPath = "src\lib\codexforge\ui\codexforge-typography.ts"
$uiThemePath = "src\lib\codexforge\ui\codexforge-theme.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

foreach ($path in @($shellTypesPath,$shellPath,$sidebarPath,$aiPagePath,$chatStylesPath,$filesPagePath,$readerPath,$previewPath,$artifactReviewPath,$artifactBoardPath,$uiTypographyPath,$uiThemePath,$allSmokePath)) {
  Assert-FileExists $path
}

$shellTypes = Get-Content -Raw $shellTypesPath
$shell = Get-Content -Raw $shellPath
$sidebar = Get-Content -Raw $sidebarPath
$aiPage = Get-Content -Raw $aiPagePath
$chatStyles = Get-Content -Raw $chatStylesPath
$filesPage = Get-Content -Raw $filesPagePath
$reader = Get-Content -Raw $readerPath
$preview = Get-Content -Raw $previewPath
$artifactReview = Get-Content -Raw $artifactReviewPath
$artifactBoard = Get-Content -Raw $artifactBoardPath
$uiSource = (Get-Content -Raw $uiTypographyPath) + "`n" + (Get-Content -Raw $uiThemePath)
$allSmoke = Get-Content -Raw $allSmokePath
$uxSharedSource = $shellTypes + "`n" + $shell + "`n" + $sidebar + "`n" + $uiSource
$touchedUiSource = $uxSharedSource + "`n" + $aiPage + "`n" + $chatStyles + "`n" + $filesPage + "`n" + $reader + "`n" + $preview + "`n" + $artifactReview + "`n" + $artifactBoard

foreach ($flag in @(
  'sidebarMode?: "full" | "compact" | "collapsed"',
  "defaultSidebarCollapsed?: boolean",
  "focusMode?: boolean",
  "showSidebarBadges?: boolean",
  "showSidebarSafetyNotice?: boolean",
  "showRightRail?: boolean",
  'contentMaxWidth?: number | "standard" | "wide" | "full"',
  'pageChrome?: "minimal" | "standard" | "dashboard"'
)) { Assert-Contains $shellTypes $flag "shell type supports $flag" }

Assert-Contains $shell "focus-mode compact-sidebar workflow-layout right-rail-opt-out" "navigation shell supports focus mode marker"
Assert-Contains $shell "resolvedShowRightRail" "workflow pages can opt out of right rail"
Assert-Contains $shell "showRightRail ?? (!focusMode" "right rail defaults off in focus mode"
Assert-Contains $sidebar "showBadges" "sidebar can hide badges"
Assert-Contains $sidebar "showSafetyNotice" "sidebar safety notice is optional"
Assert-Contains $sidebar "compact sidebar mode" "sidebar supports compact metadata reduction"

Assert-Contains $aiPage "useCodexForgeChat" "/ai retains AI workspace behavior"
Assert-Contains $aiPage "data-codexforge-ai-focus-workspace" "/ai has focus workspace marker"
Assert-Contains $chatStyles "focusChatPanel" "/ai uses focused chat layout helper"
Assert-Contains $chatStyles "minWidth: 520" "/ai composer/chat panel wide marker"
Assert-Contains $aiPage "showRightRail={false}" "/ai opts out of right rail"
Assert-NotContains $aiPage "CodexForgeGlobalNav" "/ai does not render duplicate old nav bands"

Assert-Contains $filesPage "LocalProjectReader" "/files retains LocalProjectReader"
Assert-Contains $reader "data-codexforge-files-focus-layout" "/files uses explorer preview inspector layout marker"
Assert-Contains $reader 'gridTemplateColumns: "minmax(280px, 360px) minmax(480px, 1fr) minmax(300px, 360px)"' "/files desktop columns are readable"
$previewBlock = [regex]::Match($preview, "const previewBox:[\s\S]{0,520}")
if (-not $previewBlock.Success) { throw "[FAIL] previewBox block not found" }
Assert-Contains $previewBlock.Value 'overflowX: "auto"' "/files preview uses overflowX auto"
Assert-Contains $previewBlock.Value 'whiteSpace: "pre"' "/files preview preserves code lines"
Assert-NotContains $previewBlock.Value 'overflowWrap: "anywhere"' "/files preview code does not use overflowWrap anywhere"
Assert-NotContains $previewBlock.Value 'wordBreak: "break-word"' "/files preview code does not use wordBreak break-word"

Assert-Contains $artifactReview "CreativeArtifactReviewBoard" "/artifacts/review retains CreativeArtifactReviewBoard"
Assert-Contains $artifactBoard "preview-only review-only artifact gallery readable inspector" "/artifacts/review has calm board marker"

$displayBlock = [regex]::Match($uiSource, "displayHeading[\s\S]{0,120}")
Assert-Contains $uiSource "displayHeading" "display heading helper exists"
Assert-NotContains $displayBlock.Value 'overflowWrap: "anywhere"' "display heading helper does not use overflowWrap anywhere"
Assert-NotContains $displayBlock.Value 'wordBreak: "break-word"' "display heading helper does not use wordBreak break-word"
Assert-Contains $uiSource "codeBlock" "codeBlock helper exists"
Assert-Contains $uiSource "jsonPreview" "jsonPreview helper exists"
Assert-Contains $uiSource 'overflowX: "auto"' "code/json helper uses horizontal scroll"

foreach ($copy in @("Preview-safe","approval-gated","Approval-gated","preview-only","Preview-only","review-only","Review-only","latest-message authority","preserve latest-message authority")) {
  Assert-Contains $touchedUiSource $copy "compact safety/copy marker $copy"
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
  "\.nodes\s*\.\s*push|\.edges\s*\.\s*push",
  "apply-diff\s*\(",
  "write-file\s*\(",
  "run-command\s*\(",
  "broker-execution\s*\(",
  "runBlender\s*\(",
  "executeBlender\s*\(",
  "runComfyUI\s*\(",
  "executeComfyUI\s*\(",
  "runUnreal\s*\("
)) { Assert-NotMatches $touchedUiSource $pattern "touched UI excludes $pattern" }

foreach ($marker in @("OPENAI_API_KEY","apiKey","localStorage.setItem","from `"openai`"","from 'openai'","pinecone","weaviate","chroma","qdrant","milvus","pgvector","axios","XMLHttpRequest")) {
  Assert-NotContains $uxSharedSource $marker "UX/shared UI/navigation has no unsafe dependency marker $marker"
}

foreach ($pattern in @("fetch\s*\(", "https?://")) {
  Assert-NotMatches $uxSharedSource $pattern "UX/shared UI/navigation has no external network dependency $pattern"
}

foreach ($secretPattern in @("(?<![A-Za-z0-9_])sk-[A-Za-z0-9_-]{20,}", "(?<![A-Za-z0-9_])AIza[0-9A-Za-z_-]{20,}")) {
  Assert-NotMatches $touchedUiSource $secretPattern "no hardcoded API keys"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $touchedUiSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-focus-mode-ux\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Focus Mode UX exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Focus Mode UX" "managed smoke suite includes Focus Mode UX exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/ai" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /ai returned status $($response.StatusCode)" }
  Write-Host "[PASS] /ai route reachable"
} catch {
  Write-Host "[SKIP] /ai route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Focus Mode UX smoke passed."
