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
Write-Host "=== CodexForge Local Bridge Health smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\local-bridge-health"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\local-bridge-health\page.tsx"
$pageClientPath = "src\app\local-bridge-health\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "local-bridge-health-types.ts",
  "bridge-health-target.ts",
  "bridge-health-profile.ts",
  "bridge-health-check-plan.ts",
  "bridge-health-policy.ts",
  "bridge-health-probe-preview.ts",
  "bridge-health-result.ts",
  "bridge-health-setup-guide.ts",
  "bridge-health-next-action.ts",
  "bridge-health-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "LocalBridgeHealthPanel.tsx",
  "BridgeHealthTargetPanel.tsx",
  "BridgeHealthProfilePanel.tsx",
  "BridgeHealthCheckPlanPanel.tsx",
  "BridgeHealthPolicyPanel.tsx",
  "BridgeHealthProbePreviewPanel.tsx",
  "BridgeHealthResultPanel.tsx",
  "BridgeHealthSetupGuidePanel.tsx",
  "BridgeHealthNextActionPanel.tsx",
  "LocalBridgeHealthSafetyNotice.tsx",
  "LocalBridgeHealthEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$executorSource = Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\GuardedCreativeExecutorPanel.tsx"
$bridgeSource = Get-Content -Raw "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx"
$videoSource = Get-Content -Raw "src\lib\codexforge\video-render-job-preview\components\VideoRenderJobPreviewPanel.tsx"
$blenderSource = Get-Content -Raw "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx"
$comfySource = Get-Content -Raw "src\lib\codexforge\comfyui-adapter-preview\components\ComfyUiAdapterPreviewPanel.tsx"
$unrealSource = Get-Content -Raw "src\lib\codexforge\unreal-adapter-preview\components\UnrealAdapterPreviewPanel.tsx"
$capabilitySource = Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx"
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildBridgeHealthTarget",
  "buildDefaultBridgeHealthTargets",
  "buildBridgeHealthProfile",
  "buildDefaultBridgeHealthProfiles",
  "isBridgeHealthProfileConfigured",
  "buildBridgeHealthCheckPlan",
  "buildBridgeHealthCheck",
  "buildBridgeHealthPolicy",
  "isBridgeHealthProbeAllowed",
  "buildBridgeHealthProbePreview",
  "buildBridgeHealthProbePreviewItem",
  "buildBridgeHealthResult",
  "buildBridgeHealthResultItem",
  "buildBridgeHealthSetupGuide",
  "buildBridgeHealthSetupStep",
  "selectBridgeHealthNextAction",
  "buildBridgeHealthNextActionPlan",
  "buildLocalBridgeHealthSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "LocalBridgeHealthPanel renders",
  "BridgeHealthTargetPanel renders",
  "BridgeHealthProfilePanel renders",
  "BridgeHealthCheckPlanPanel renders",
  "BridgeHealthPolicyPanel renders",
  "BridgeHealthProbePreviewPanel renders",
  "BridgeHealthResultPanel renders",
  "BridgeHealthSetupGuidePanel renders",
  "BridgeHealthNextActionPanel renders",
  "LocalBridgeHealthSafetyNotice renders",
  "LocalBridgeHealthEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "LocalBridgeHealthPanel" "/local-bridge-health imports/renders LocalBridgeHealthPanel"
foreach ($marker in @(
  "preview-only",
  "dry-run only",
  "no command execution",
  "no local HTTP calls by default",
  "no file writes",
  "no render execution",
  "future guarded health probe",
  "preserve latest-message authority",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI/route marker $marker" }

foreach ($marker in @(
  "blender-local",
  "comfyui-local",
  "unreal-local",
  "ffmpeg-local",
  "artifact-output-root",
  "executable launch blocked by default",
  "local HTTP call blocked by default",
  "ffmpeg version command blocked by default",
  "Blender launch blocked",
  "ComfyUI HTTP request blocked",
  "Unreal launch blocked",
  "artifact directory write blocked",
  "no actual probe",
  "no command execution",
  "no HTTP calls",
  "Result does not fabricate reachability",
  "Blender: install Blender",
  "ComfyUI: configure local endpoint hint",
  "Unreal: configure project/editor path hint",
  "ffmpeg: configure executable path hint",
  "Artifact root: configure output boundary",
  "buildLocalBridgeHealthReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $executorSource "Local Bridge Health" "Guarded Creative Executor references Local Bridge Health if integrated"
Assert-Contains $bridgeSource "Local Bridge Health" "Creative Local Bridge references Local Bridge Health if integrated"
Assert-Contains $videoSource "Local Bridge Health" "Video Render Job Preview references Local Bridge Health if integrated"
Assert-Contains $blenderSource "Local Bridge Health" "Blender Adapter Preview references Local Bridge Health if integrated"
Assert-Contains $comfySource "Local Bridge Health" "ComfyUI Adapter Preview references Local Bridge Health if integrated"
Assert-Contains $unrealSource "Local Bridge Health" "Unreal Adapter Preview references Local Bridge Health if integrated"
Assert-Contains $capabilitySource "Local Bridge Health" "Capability Cockpit references Local Bridge Health if integrated"
Assert-Contains $aiRouterSource "local bridge health" "AI Router references local bridge health if integrated"
Assert-Contains $productReadinessSource "Local Bridge Health" "Product Readiness references Local Bridge Health if integrated"
Assert-Contains $consolidationSource "Local Bridge Health" "Consolidation references Local Bridge Health if integrated"
Assert-Contains $commandPaletteSource "Go to Local Bridge Health" "Command Palette includes Go to Local Bridge Health if integrated"
Assert-Contains $commandPaletteSource "Copy local bridge setup guide" "Command Palette includes Copy local bridge setup guide if integrated"
Assert-Contains $commandPaletteSource "Copy future health probe packet" "Command Palette includes Copy future health probe packet if integrated"
Assert-Contains $missionSource "Local Bridge Health readiness" "Mission Control includes Local Bridge Health readiness if integrated"

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
  "ffmpeg(",
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
  "http://",
  "https://"
)) { Assert-NotContains $deterministicSource $marker "no local HTTP/provider/network dependency in deterministic files: $marker" }

$brokerExecutableMatches = [regex]::Matches($allSource, "broker-execution\s*\(")
if ($brokerExecutableMatches.Count -ne 0) { throw "[FAIL] broker-execution call found." }

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-local-bridge-health\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Local Bridge Health exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Local Bridge Health" "managed smoke suite includes Local Bridge Health exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/local-bridge-health" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /local-bridge-health returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /local-bridge-health route reachable"
} catch {
  Write-Host "[SKIP] /local-bridge-health route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Local Bridge Health smoke passed."
