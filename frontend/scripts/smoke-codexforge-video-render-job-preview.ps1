param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Video Render Job Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\video-render-job-preview"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\video-render\page.tsx"
$pageClientPath = "src\app\video-render\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "video-render-job-types.ts",
  "video-render-input.ts",
  "video-render-timeline.ts",
  "video-render-shot-plan.ts",
  "video-render-provider-plan.ts",
  "video-render-queue-preview.ts",
  "video-render-artifact-plan.ts",
  "video-render-approval.ts",
  "video-render-policy.ts",
  "video-render-execution-packet.ts",
  "video-render-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "VideoRenderJobPreviewPanel.tsx",
  "VideoRenderInputPanel.tsx",
  "VideoRenderTimelinePanel.tsx",
  "VideoRenderShotPlanPanel.tsx",
  "VideoRenderProviderPlanPanel.tsx",
  "VideoRenderQueuePreviewPanel.tsx",
  "VideoRenderArtifactPlanPanel.tsx",
  "VideoRenderApprovalPanel.tsx",
  "VideoRenderPolicyPanel.tsx",
  "VideoRenderExecutionPacketPanel.tsx",
  "VideoRenderSafetyNotice.tsx",
  "VideoRenderEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$creativeBridgeSource = (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-adapter-catalog.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-bridge-profile.ts")
$creativeSource = (Get-Content -Raw "src\lib\codexforge\creative\components\CreativeProductionStudio.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative\render-queue.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative\production-plan.ts")
$blenderSource = Get-Content -Raw "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx"
$comfySource = Get-Content -Raw "src\lib\codexforge\comfyui-adapter-preview\components\ComfyUiAdapterPreviewPanel.tsx"
$unrealSource = Get-Content -Raw "src\lib\codexforge\unreal-adapter-preview\components\UnrealAdapterPreviewPanel.tsx"
$artifactSource = (Get-Content -Raw "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\artifact-executor\artifact-types.ts")
$capabilitySource = (Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\tools\capability-bridge-manifest.ts")
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildVideoRenderInput",
  "validateVideoRenderInput",
  "buildVideoRenderTimeline",
  "buildVideoRenderTimelineSegment",
  "buildVideoRenderShotPlan",
  "buildVideoRenderShot",
  "buildVideoRenderProviderPlan",
  "buildVideoRenderProviderItem",
  "buildVideoRenderQueuePreview",
  "buildVideoRenderQueueItem",
  "buildVideoRenderArtifactPlan",
  "buildVideoRenderArtifactItem",
  "buildVideoRenderApprovalPacket",
  "validateVideoRenderApprovalPacket",
  "buildVideoRenderPolicy",
  "isVideoRenderExecutionAllowed",
  "buildVideoRenderExecutionPacket",
  "validateVideoRenderExecutionPacket",
  "buildVideoRenderSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "VideoRenderJobPreviewPanel renders",
  "VideoRenderInputPanel renders",
  "VideoRenderTimelinePanel renders",
  "VideoRenderShotPlanPanel renders",
  "VideoRenderProviderPlanPanel renders",
  "VideoRenderQueuePreviewPanel renders",
  "VideoRenderArtifactPlanPanel renders",
  "VideoRenderApprovalPanel renders",
  "VideoRenderPolicyPanel renders",
  "VideoRenderExecutionPacketPanel renders",
  "VideoRenderSafetyNotice renders",
  "VideoRenderEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "VideoRenderJobPreviewPanel" "/video-render imports/renders VideoRenderJobPreviewPanel"
foreach ($marker in @(
  "preview-only",
  "no render execution",
  "no command execution",
  "no ffmpeg execution",
  "no file writes",
  "future executor boundary",
  "preserve latest-message authority",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI/route marker $marker" }

foreach ($marker in @(
  "blender-animation-preview",
  "comfyui-image-sequence-preview",
  "unreal-sequencer-preview",
  '"blender"',
  '"comfyui"',
  '"unreal"',
  '"ffmpeg"',
  "queue preview includes no-execution guarantee",
  '"video"',
  '"image-sequence"',
  '"render-log"',
  "approved: input.approved ?? false",
  "Render execution blocked in Phase 66",
  "Blender execution blocked in Phase 66",
  "ComfyUI execution blocked in Phase 66",
  "Unreal execution blocked in Phase 66",
  "ffmpeg execution blocked in Phase 66",
  "Artifact file writes blocked from UI",
  "future executor boundary",
  "buildVideoRenderReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $creativeBridgeSource "Video Render Job Preview v1" "Creative Local Bridge references Video Render Job Preview if integrated"
Assert-Contains $creativeSource "Video Render Job Preview" "Creative Production Studio references Video Render Job Preview if integrated"
Assert-Contains $blenderSource "Video Render Job Preview" "Blender Adapter Preview references Video Render Job Preview if integrated"
Assert-Contains $comfySource "Video Render Job Preview" "ComfyUI Adapter Preview references Video Render Job Preview if integrated"
Assert-Contains $unrealSource "Video Render Job Preview" "Unreal Adapter Preview references Video Render Job Preview if integrated"
Assert-Contains $artifactSource "Video render queue" "Creative Artifact Review references Video Render artifacts if integrated"
Assert-Contains $capabilitySource "Video Render Job Preview" "Capability Cockpit references Video Render Job Preview if integrated"
Assert-Contains $aiRouterSource "video render planning" "AI Router references video render planning if integrated"
Assert-Contains $productReadinessSource "Video Render Job Preview v1" "Product Readiness references Video Render Job Preview if integrated"
Assert-Contains $consolidationSource "Video Render Job Preview v1" "Consolidation references Video Render Job Preview if integrated"
Assert-Contains $commandPaletteSource "Go to Video Render Job Preview" "Command Palette includes Go to Video Render Job Preview if integrated"
Assert-Contains $commandPaletteSource "Copy video render plan" "Command Palette includes Copy video render plan if integrated"
Assert-Contains $commandPaletteSource "Copy video future executor packet" "Command Palette includes Copy video future executor packet if integrated"
Assert-Contains $missionSource "Video Render Job Preview readiness" "Mission Control includes Video Render Job Preview readiness if integrated"
Assert-Contains $missionSource "Review video render job preview" "Mission Control includes review video render job preview if integrated"

foreach ($marker in @(
  "from `"brain-graph`"",
  "from 'brain-graph'",
  "appendEvent(",
  "saveBrainGraph(",
  "apply-diff(",
  "write-file(",
  "run-command(",
  "Blender execution call",
  "ComfyUI execution call",
  "Unreal execution call",
  "ffmpeg execution call",
  "render execution call",
  "package/build execution call",
  "apiKey",
  "localStorage",
  "Math.random",
  "Date.now",
  "d3-force",
  "pinecone",
  "weaviate",
  "chroma",
  "auto-persist"
)) { Assert-NotContains $allSource $marker "forbidden marker absent: $marker" }

foreach ($marker in @(
  "fetch(",
  "XMLHttpRequest",
  "axios",
  "OpenAI",
  "api.openai",
  "provider API",
  "http://",
  "https://",
  "external network"
)) { Assert-NotContains $deterministicSource $marker "no local HTTP/provider/network dependency in deterministic files: $marker" }

$brokerExecutableMatches = [regex]::Matches($allSource, "broker-execution\s*\(")
if ($brokerExecutableMatches.Count -ne 0) { throw "[FAIL] broker-execution call found." }

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-video-render-job-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Video Render Job Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Video Render Job Preview" "managed smoke suite includes Video Render Job Preview exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/video-render" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /video-render returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /video-render route reachable"
} catch {
  Write-Host "[SKIP] /video-render route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Video Render Job Preview smoke passed."
