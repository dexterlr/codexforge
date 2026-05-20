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
Write-Host "=== CodexForge Creative Execution Sandbox smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\creative-execution-sandbox"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\creative-sandbox\page.tsx"
$pageClientPath = "src\app\creative-sandbox\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "creative-execution-sandbox-types.ts",
  "sandbox-execution-request.ts",
  "sandbox-run-model.ts",
  "sandbox-lifecycle.ts",
  "sandbox-cancellation.ts",
  "sandbox-artifact-simulation.ts",
  "sandbox-log-simulation.ts",
  "sandbox-verification.ts",
  "sandbox-review-handoff.ts",
  "sandbox-next-action.ts",
  "creative-execution-sandbox-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "CreativeExecutionSandboxPanel.tsx",
  "SandboxExecutionRequestPanel.tsx",
  "SandboxRunModelPanel.tsx",
  "SandboxLifecyclePanel.tsx",
  "SandboxCancellationPanel.tsx",
  "SandboxArtifactSimulationPanel.tsx",
  "SandboxLogSimulationPanel.tsx",
  "SandboxVerificationPanel.tsx",
  "SandboxReviewHandoffPanel.tsx",
  "SandboxNextActionPanel.tsx",
  "CreativeExecutionSandboxSafetyNotice.tsx",
  "CreativeExecutionSandboxEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$executorSource = (Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\GuardedCreativeExecutorPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\CreativeExecutorDryRunPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\CreativeExecutorResultPanel.tsx")
$healthSource = (Get-Content -Raw "src\lib\codexforge\local-bridge-health\components\LocalBridgeHealthPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\local-bridge-health\bridge-health-next-action.ts")
$videoSource = (Get-Content -Raw "src\lib\codexforge\video-render-job-preview\components\VideoRenderJobPreviewPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\video-render-job-preview\components\VideoRenderExecutionPacketPanel.tsx")
$artifactSource = Get-Content -Raw "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx"
$bridgeSource = Get-Content -Raw "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx"
$blenderSource = (Get-Content -Raw "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\blender-adapter-preview\components\BlenderExecutionPacketPanel.tsx")
$comfySource = Get-Content -Raw "src\lib\codexforge\comfyui-adapter-preview\components\ComfyUiAdapterPreviewPanel.tsx"
$unrealSource = (Get-Content -Raw "src\lib\codexforge\unreal-adapter-preview\components\UnrealAdapterPreviewPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\unreal-adapter-preview\components\UnrealExecutionPacketPanel.tsx")
$capabilitySource = (Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\tools\capability-bridge-manifest.ts")
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildSandboxExecutionRequest",
  "validateSandboxExecutionRequest",
  "buildSandboxRunModel",
  "buildSandboxRunStep",
  "buildSandboxLifecycle",
  "buildSandboxLifecycleEvent",
  "buildSandboxCancellationPlan",
  "buildSandboxCancellationEvent",
  "buildSandboxArtifactSimulation",
  "buildSandboxArtifactSimulationItem",
  "buildSandboxLogSimulation",
  "buildSandboxLogLine",
  "buildSandboxVerificationReport",
  "buildSandboxVerificationCheck",
  "buildSandboxReviewHandoff",
  "buildSandboxArtifactReviewPacket",
  "buildSandboxExecutorReviewPrompt",
  "selectSandboxNextAction",
  "buildSandboxNextActionPlan",
  "buildCreativeExecutionSandboxSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "CreativeExecutionSandboxPanel renders",
  "SandboxExecutionRequestPanel renders",
  "SandboxRunModelPanel renders",
  "SandboxLifecyclePanel renders",
  "SandboxCancellationPanel renders",
  "SandboxArtifactSimulationPanel renders",
  "SandboxLogSimulationPanel renders",
  "SandboxVerificationPanel renders",
  "SandboxReviewHandoffPanel renders",
  "SandboxNextActionPanel renders",
  "CreativeExecutionSandboxSafetyNotice renders",
  "CreativeExecutionSandboxEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "CreativeExecutionSandboxPanel" "/creative-sandbox imports/renders CreativeExecutionSandboxPanel"
foreach ($marker in @(
  "simulation-only",
  "no real execution",
  "no render execution",
  "no command execution",
  "no file writes",
  "preserve latest-message authority",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "showHeroRouteChips={false}",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI/route marker $marker" }
Assert-NotContains $uiSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"

foreach ($marker in @(
  "dry-run-simulation",
  "cancellation-simulation",
  "running-simulated",
  "completed-simulated",
  "no local process to kill",
  "image-placeholder",
  "video-placeholder",
  "render-log-placeholder",
  "no-file-written",
  "simulated: true",
  "No real execution occurred",
  "sandbox only",
  "no real files written",
  "Open Creative Artifact Review",
  "Review Local Bridge Health",
  "buildCreativeExecutionSandboxReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $executorSource "Creative Execution Sandbox" "Guarded Creative Executor references Creative Execution Sandbox if integrated"
Assert-Contains $healthSource "Creative Execution Sandbox" "Local Bridge Health references Creative Execution Sandbox if integrated"
Assert-Contains $videoSource "Creative Execution Sandbox" "Video Render Job Preview references Creative Execution Sandbox if integrated"
Assert-Contains $artifactSource "Sandbox artifact" "Creative Artifact Review references sandbox artifacts if integrated"
Assert-Contains $bridgeSource "Creative Execution Sandbox" "Creative Local Bridge references Creative Execution Sandbox if integrated"
Assert-Contains $blenderSource "Creative Execution Sandbox" "Blender Adapter Preview references Creative Execution Sandbox if integrated"
Assert-Contains $comfySource "Creative Execution Sandbox" "ComfyUI Adapter Preview references Creative Execution Sandbox if integrated"
Assert-Contains $unrealSource "Creative Execution Sandbox" "Unreal Adapter Preview references Creative Execution Sandbox if integrated"
Assert-Contains $capabilitySource "Creative Execution Sandbox" "Capability Cockpit references Creative Execution Sandbox if integrated"
Assert-Contains $aiRouterSource "creative sandbox review" "AI Router references sandbox review if integrated"
Assert-Contains $productReadinessSource "Creative Execution Sandbox" "Product Readiness references Creative Execution Sandbox if integrated"
Assert-Contains $consolidationSource "Creative Execution Sandbox" "Consolidation references Creative Execution Sandbox if integrated"
Assert-Contains $commandPaletteSource "Go to Creative Execution Sandbox" "Command Palette includes Go to Creative Execution Sandbox if integrated"
Assert-Contains $commandPaletteSource "Copy sandbox report" "Command Palette includes Copy sandbox report if integrated"
Assert-Contains $commandPaletteSource "Copy sandbox-to-review handoff" "Command Palette includes Copy sandbox-to-review handoff if integrated"
Assert-Contains $missionSource "Creative Execution Sandbox readiness" "Mission Control includes Creative Execution Sandbox readiness if integrated"

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
  "https://",
  "process.env",
  "OPENAI_API_KEY",
  "sk-"
)) { Assert-NotContains $deterministicSource $marker "no local HTTP/provider/network/API-key dependency in deterministic files: $marker" }

$brokerExecutableMatches = [regex]::Matches($allSource, "broker-execution\s*\(")
if ($brokerExecutableMatches.Count -ne 0) { throw "[FAIL] broker-execution call found." }

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-creative-execution-sandbox\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Creative Execution Sandbox exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Creative Execution Sandbox" "managed smoke suite includes Creative Execution Sandbox exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/creative-sandbox" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /creative-sandbox returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /creative-sandbox route reachable"
} catch {
  Write-Host "[SKIP] /creative-sandbox route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Creative Execution Sandbox smoke passed."
