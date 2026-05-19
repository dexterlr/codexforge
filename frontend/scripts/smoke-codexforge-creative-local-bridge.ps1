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
Write-Host "=== CodexForge Creative Local Bridge smoke ==="
Write-Host "Base URL: $BaseUrl"

$bridgeDir = "src\lib\codexforge\creative-local-bridge"
$componentDir = Join-Path $bridgeDir "components"
$routePath = "src\app\creative-bridge\page.tsx"
$pageClientPath = "src\app\creative-bridge\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $bridgeDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "creative-local-bridge-types.ts",
  "creative-bridge-profile.ts",
  "creative-adapter-catalog.ts",
  "creative-bridge-health.ts",
  "creative-job-request.ts",
  "creative-job-approval.ts",
  "creative-job-policy.ts",
  "creative-artifact-capture-plan.ts",
  "creative-bridge-handoff.ts",
  "creative-local-bridge-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $bridgeDir $module)
}

foreach ($component in @(
  "CreativeLocalBridgePanel.tsx",
  "CreativeBridgeProfilePanel.tsx",
  "CreativeAdapterCatalogPanel.tsx",
  "CreativeBridgeHealthPanel.tsx",
  "CreativeJobRequestPanel.tsx",
  "CreativeJobApprovalPanel.tsx",
  "CreativeJobPolicyPanel.tsx",
  "CreativeArtifactCapturePanel.tsx",
  "CreativeBridgeHandoffPanel.tsx",
  "CreativeLocalBridgeSafetyNotice.tsx",
  "CreativeLocalBridgeEmptyState.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $bridgeDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $bridgeDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$creativeSource = Get-Content -Raw "src\lib\codexforge\creative\components\CreativeProductionStudio.tsx"
$capabilitySource = Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx"
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$artifactWorkspaceSource = Get-Content -Raw "src\lib\codexforge\artifact-workspace\components\ArtifactWorkspacePanel.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export function buildCreativeBridgeProfile",
  "export function buildDefaultCreativeBridgeProfiles",
  "export function buildCreativeAdapterCatalog",
  "export function buildCreativeAdapterCatalogItem",
  "export function buildCreativeBridgeHealthReport",
  "export function buildCreativeBridgeHealthCheck",
  "export function buildCreativeJobRequest",
  "export function validateCreativeJobRequest",
  "export function buildCreativeJobApprovalPacket",
  "export function validateCreativeJobApprovalPacket",
  "export function buildCreativeJobPolicy",
  "export function isCreativeJobAllowed",
  "export function buildCreativeArtifactCapturePlan",
  "export function buildCreativeArtifactCaptureItem",
  "export function buildCreativeBridgeHandoff",
  "export function buildCreativeBridgeExecutionPrompt",
  "export function buildCreativeLocalBridgeSummary"
)) {
  Assert-Contains $domainSource $export "domain export $export"
}

foreach ($indexExport in @(
  "creative-bridge-profile",
  "creative-adapter-catalog",
  "creative-bridge-health",
  "creative-job-request",
  "creative-job-approval",
  "creative-job-policy",
  "creative-artifact-capture-plan",
  "creative-bridge-handoff",
  "creative-local-bridge-summary"
)) {
  Assert-Contains $indexSource $indexExport "index exports $indexExport"
}

foreach ($marker in @(
  "CreativeLocalBridgePanel renders",
  "CreativeBridgeProfilePanel renders",
  "CreativeAdapterCatalogPanel renders",
  "CreativeBridgeHealthPanel renders",
  "CreativeJobRequestPanel renders",
  "CreativeJobApprovalPanel renders",
  "CreativeJobPolicyPanel renders",
  "CreativeArtifactCapturePanel renders",
  "CreativeBridgeHandoffPanel renders",
  "CreativeLocalBridgeSafetyNotice renders",
  "CreativeLocalBridgeEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $routeSource "CreativeLocalBridgePanel" "/creative-bridge imports/renders CreativeLocalBridgePanel"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "No render execution" "UI says no render execution"
Assert-Contains $uiSource "No command execution" "UI says no command execution"
Assert-Contains $uiSource "No file writes" "UI says no file writes"
Assert-Contains $uiSource "future guarded executor" "UI says future guarded executor"
Assert-Contains $uiSource "Preserve latest-message authority" "UI says preserve latest-message authority"

foreach ($marker in @(
  "blender-local",
  "comfyui-local",
  "unreal-local",
  "blender-python-preview",
  "comfyui-workflow-preview",
  "unreal-editor-command-preview",
  "Blender execution blocked in Phase 61",
  "ComfyUI execution blocked in Phase 61",
  "Unreal execution blocked in Phase 61",
  "video render execution blocked in Phase 61",
  "approved: false",
  '"image"',
  '"video"',
  '"blender-file"',
  "Inspect first.",
  "No render execution without future guarded executor"
)) {
  Assert-Contains $allSource $marker "required marker $marker"
}

Assert-Contains $creativeSource "Creative Local Bridge" "Creative Production Studio references Creative Local Bridge if integrated"
Assert-Contains $capabilitySource "Creative Local Bridge" "Capability Cockpit references Creative Local Bridge if integrated"
Assert-Contains $aiRouterSource "storyboard planning" "AI Router references creative planning tasks if integrated"
Assert-Contains $artifactWorkspaceSource "artifact capture plan" "Artifact Workspace references artifact capture plan if integrated"
Assert-Contains $productReadinessSource "Creative Local Bridge v1" "Product Readiness references Creative Local Bridge if integrated"
Assert-Contains $consolidationSource "/creative-bridge" "Consolidation references Creative Local Bridge if integrated"
Assert-Contains $commandPaletteSource "Go to Creative Local Bridge" "Command Palette includes Go to Creative Local Bridge if integrated"
Assert-Contains $commandPaletteSource "Copy creative bridge handoff" "Command Palette includes Copy creative bridge handoff if integrated"
Assert-Contains $commandPaletteSource "Copy Blender adapter preview prompt" "Command Palette includes Copy Blender adapter preview prompt if integrated"
Assert-Contains $missionSource "Creative Local Bridge readiness" "Mission Control includes Creative Local Bridge readiness if integrated"

foreach ($marker in @(
  "from `"brain-graph`"",
  "from 'brain-graph'",
  "appendEvent(",
  "saveBrainGraph(",
  "apply-diff(",
  "write-file(",
  "run-command(",
  "blender --",
  "UnrealEditor",
  "comfyui-workflow-run(",
  "video-render(",
  "broker-execution(",
  "apiKey",
  "localStorage",
  "Math.random",
  "Date.now",
  "d3-force",
  "fetch(",
  "XMLHttpRequest",
  "axios",
  "OpenAI",
  "pinecone",
  "weaviate",
  "chroma",
  "auto-persist"
)) {
  Assert-NotContains $allSource $marker "forbidden marker absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildCreativeLocalBridgeReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildCreativeLocalBridgeReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-creative-local-bridge\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Creative Local Bridge exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Creative Local Bridge" "managed smoke suite includes Creative Local Bridge exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/creative-bridge" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /creative-bridge returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /creative-bridge route reachable"
} catch {
  Write-Host "[SKIP] /creative-bridge route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Creative Local Bridge smoke passed."
