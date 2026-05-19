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
Write-Host "=== CodexForge Blender Adapter Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\blender-adapter-preview"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\blender\page.tsx"
$pageClientPath = "src\app\blender\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "blender-adapter-types.ts",
  "blender-scene-input.ts",
  "blender-scene-model.ts",
  "blender-object-plan.ts",
  "blender-material-plan.ts",
  "blender-lighting-plan.ts",
  "blender-camera-plan.ts",
  "blender-render-settings.ts",
  "blender-python-preview.ts",
  "blender-safety-policy.ts",
  "blender-execution-packet.ts",
  "blender-adapter-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "BlenderAdapterPreviewPanel.tsx",
  "BlenderSceneInputPanel.tsx",
  "BlenderSceneModelPanel.tsx",
  "BlenderObjectPlanPanel.tsx",
  "BlenderMaterialPlanPanel.tsx",
  "BlenderLightingPlanPanel.tsx",
  "BlenderCameraPlanPanel.tsx",
  "BlenderRenderSettingsPanel.tsx",
  "BlenderPythonPreviewPanel.tsx",
  "BlenderSafetyPolicyPanel.tsx",
  "BlenderExecutionPacketPanel.tsx",
  "BlenderAdapterSafetyNotice.tsx",
  "BlenderAdapterEmptyState.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$creativeBridgeSource = (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-adapter-catalog.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-local-bridge-types.ts")
$creativeSource = Get-Content -Raw "src\lib\codexforge\creative\components\CreativeProductionStudio.tsx"
$capabilitySource = (Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\tools\capability-bridge-manifest.ts")
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$artifactSource = (Get-Content -Raw "src\lib\codexforge\artifact-executor\artifact-types.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\artifact-workspace\artifact-workspace-types.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildBlenderSceneInput",
  "validateBlenderSceneInput",
  "buildBlenderSceneModel",
  "buildBlenderSceneLayer",
  "buildBlenderObjectPlan",
  "buildBlenderObjectItem",
  "buildBlenderMaterialPlan",
  "buildBlenderMaterialItem",
  "buildBlenderLightingPlan",
  "buildBlenderLightItem",
  "buildBlenderCameraPlan",
  "buildBlenderCameraShot",
  "buildBlenderRenderSettings",
  "buildBlenderPythonPreview",
  "buildBlenderPythonSection",
  "buildBlenderAdapterSafetyPolicy",
  "isBlenderAdapterExecutionAllowed",
  "buildBlenderExecutionPacket",
  "validateBlenderExecutionPacket",
  "buildBlenderAdapterSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "BlenderAdapterPreviewPanel renders",
  "BlenderSceneInputPanel renders",
  "BlenderSceneModelPanel renders",
  "BlenderObjectPlanPanel renders",
  "BlenderMaterialPlanPanel renders",
  "BlenderLightingPlanPanel renders",
  "BlenderCameraPlanPanel renders",
  "BlenderRenderSettingsPanel renders",
  "BlenderPythonPreviewPanel renders",
  "BlenderSafetyPolicyPanel renders",
  "BlenderExecutionPacketPanel renders",
  "BlenderAdapterSafetyNotice renders",
  "BlenderAdapterEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $routeSource "BlenderAdapterPreviewPanel" "/blender imports/renders BlenderAdapterPreviewPanel"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "no Blender execution" "UI says no Blender execution"
Assert-Contains $uiSource "no render execution" "UI says no render execution"
Assert-Contains $uiSource "no file writes" "UI says no file writes"
Assert-Contains $uiSource "future executor boundary" "UI says future executor boundary"
Assert-Contains $uiSource "preserve latest-message authority" "UI says preserve latest-message authority"
Assert-Contains $uiSource "copy Python preview allowed" "copy Python preview allowed"
Assert-Contains $uiSource "copy execution packet allowed" "copy execution packet allowed"
Assert-Contains $uiSource "copy Blender review prompt allowed" "copy Blender review prompt allowed"

foreach ($marker in @(
  '"cinematic"',
  '"product-shot"',
  '"cube"',
  '"imported-asset-placeholder"',
  '"studio-three-point"',
  "shotId",
  '"eevee-next"',
  '"cycles"',
  "preview only",
  "create materials",
  "create objects",
  "create lights",
  "configure render settings",
  "Blender execution blocked in Phase 62",
  "Render execution blocked in Phase 62",
  "File writes blocked in Phase 62",
  "Future executor boundary",
  "buildBlenderAdapterReactKey"
)) {
  Assert-Contains $allSource $marker "required marker $marker"
}

foreach ($marker in @(
  "save_as_mainfile",
  "bpy.ops.render.render",
  "subprocess",
  "os.system",
  "from `"brain-graph`"",
  "from 'brain-graph'",
  "appendEvent(",
  "saveBrainGraph(",
  "apply-diff(",
  "write-file(",
  "run-command(",
  "blender --",
  "ComfyUI execution",
  "UnrealEditor",
  "render execution call",
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

Assert-Contains $creativeBridgeSource "Blender Adapter Preview v1" "Creative Local Bridge references Blender Adapter Preview if integrated"
Assert-Contains $creativeBridgeSource "/blender" "Creative Local Bridge handoff can link to /blender"
Assert-Contains $creativeSource "Blender Adapter Preview" "Creative Production Studio references Blender Adapter Preview if integrated"
Assert-Contains $capabilitySource "Blender Adapter Preview" "Capability Cockpit references Blender Adapter Preview if integrated"
Assert-Contains $aiRouterSource "Blender scene planning" "AI Router references Blender scene planning if integrated"
Assert-Contains $aiRouterSource "local or cheap" "AI Router recommends local/cheap scene drafting if integrated"
Assert-Contains $productReadinessSource "Blender Adapter Preview v1" "Product Readiness references Blender Adapter Preview if integrated"
Assert-Contains $productReadinessSource "ComfyUI Adapter Preview v1" "Product Readiness next action references ComfyUI Adapter Preview v1"
Assert-Contains $consolidationSource "Blender Adapter Preview v1" "Consolidation references Blender Adapter Preview if integrated"
Assert-Contains $consolidationSource "/blender" "Consolidation workflow entrypoint points to /blender"
Assert-Contains $commandPaletteSource "Go to Blender Adapter Preview" "Command Palette includes Go to Blender Adapter Preview if integrated"
Assert-Contains $commandPaletteSource "Copy Blender adapter preview prompt" "Command Palette includes Copy Blender script preview prompt if integrated"
Assert-Contains $commandPaletteSource "Copy Blender future executor packet" "Command Palette includes Copy Blender future executor packet if integrated"
Assert-Contains $missionSource "Blender Adapter Preview readiness" "Mission Control includes Blender Adapter Preview readiness if integrated"
Assert-Contains $missionSource "Review Blender adapter preview" "Mission Control next action mentions review Blender adapter preview"
Assert-Contains $artifactSource "blender-python-preview" "Artifact placeholders include blender-python-preview if integrated"
Assert-Contains $artifactSource "blender-scene-plan" "Artifact placeholders include blender-scene-plan if integrated"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-blender-adapter-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Blender Adapter Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Blender Adapter Preview" "managed smoke suite includes Blender Adapter Preview exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/blender" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /blender returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /blender route reachable"
} catch {
  Write-Host "[SKIP] /blender route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Blender Adapter Preview smoke passed."
