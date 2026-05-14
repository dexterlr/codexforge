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

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
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
Write-Host "=== CodexForge Creative Production Studio smoke ==="
Write-Host "Base URL: $BaseUrl"

$creativeDir = "src\lib\codexforge\creative"
$componentDir = Join-Path $creativeDir "components"
$routePath = "src\app\creative\page.tsx"
$pageClientPath = "src\app\creative\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $creativeDir
Assert-DirectoryExists $componentDir
Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainFiles = @(
  "creative-types.ts",
  "creative-brief.ts",
  "production-plan.ts",
  "storyboard.ts",
  "scene-plan.ts",
  "comfyui-plan.ts",
  "unreal-plan.ts",
  "render-queue.ts",
  "artifact-gallery.ts",
  "creative-safety.ts",
  "creative-context.ts",
  "creative-patch-handoff.ts",
  "index.ts"
)

foreach ($file in $domainFiles) {
  Assert-FileExists (Join-Path $creativeDir $file)
}

$componentFiles = @(
  "CreativeProductionStudio.tsx",
  "CreativeBriefPanel.tsx",
  "ProductionPlanBoard.tsx",
  "StoryboardPanel.tsx",
  "BlenderScenePlanPanel.tsx",
  "ComfyUIWorkflowPanel.tsx",
  "UnrealLevelPlanPanel.tsx",
  "RenderQueuePreview.tsx",
  "ArtifactGalleryPanel.tsx",
  "CreativeApprovalBoundary.tsx",
  "CreativePatchHandoffPanel.tsx"
)

foreach ($file in $componentFiles) {
  Assert-FileExists (Join-Path $componentDir $file)
}

$domainSource = (Get-ChildItem $creativeDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "CreativeProductionStudio",
  "CreativeBriefPanel",
  "ProductionPlanBoard",
  "StoryboardPanel",
  "BlenderScenePlanPanel",
  "ComfyUIWorkflowPanel",
  "UnrealLevelPlanPanel",
  "RenderQueuePreview",
  "ArtifactGalleryPanel",
  "CreativeApprovalBoundary",
  "CreativePatchHandoffPanel"
)) {
  Assert-Contains $uiSource $marker "$marker renders"
}

foreach ($export in @(
  "export function buildCreativeProductionPlan",
  "export function buildCreativeProductionStage",
  "export function summarizeCreativeProductionPlan",
  "export function selectNextCreativeProductionAction",
  "export function buildStoryboard",
  "export function buildStoryboardShot",
  "export function summarizeStoryboard",
  "export function buildBlenderScenePlan",
  "export function summarizeBlenderScenePlan",
  "export function buildComfyUIWorkflowPlan",
  "export function summarizeComfyUIWorkflowPlan",
  "export function buildUnrealLevelPlan",
  "export function summarizeUnrealLevelPlan",
  "export function buildRenderQueuePreview",
  "export function summarizeRenderQueuePreview",
  "export function buildCreativeArtifactGallery",
  "export function summarizeCreativeArtifacts",
  "export function buildCreativeApprovalBoundary",
  "export function summarizeCreativeSafety",
  "export function classifyCreativeSideEffectRisk",
  "export function buildCreativePatchHandoff",
  "export function summarizeCreativePatchHandoff",
  "export function buildCreativePatchPreviewPrompt"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $routeSource "buildCreativeContext" "/creative route builds context"
Assert-Contains $routeSource "CreativeProductionStudio" "page-client renders CreativeProductionStudio"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "approval required before execution" "UI says approval required before execution"
Assert-Contains $uiSource "No render execution" "UI says no render execution"
Assert-Contains $uiSource "No Blender execution" "UI says no Blender execution"
Assert-Contains $uiSource "No Unreal execution" "UI says no Unreal execution"
Assert-Contains $uiSource "No ComfyUI execution" "UI says no ComfyUI execution"
Assert-Contains $uiSource "Safe Patch Preview handoff" "UI references Safe Patch Preview handoff"

foreach ($marker in @("from `"write-file`"", "from 'write-file'", "from `"apply-diff`"", "from 'apply-diff'", "from `"run-command`"", "from 'run-command'")) {
  Assert-NotContains $uiSource $marker "UI mutation import absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch", "broker-execution")) {
  Assert-NotContains $uiSource $marker "UI mutation tool call absent: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force", "fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI", "pinecone", "weaviate", "chroma")) {
  Assert-NotContains $allSource $marker "determinism or external dependency absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildCreativeReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildCreativeReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-creative-production-studio\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Creative Production Studio exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Creative Production Studio" "managed smoke suite includes Creative Production Studio exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/creative" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /creative returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /creative route reachable"
} catch {
  Write-Host "[SKIP] /creative route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Creative Production Studio smoke passed."
