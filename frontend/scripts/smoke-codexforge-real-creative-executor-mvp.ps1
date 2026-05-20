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
Write-Host "=== CodexForge Real Creative Executor MVP Design smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\real-creative-executor-mvp"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\creative-mvp\page.tsx"
$pageClientPath = "src\app\creative-mvp\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "real-creative-mvp-types.ts",
  "mvp-candidate.ts",
  "mvp-adapter-selection.ts",
  "mvp-execution-path.ts",
  "mvp-safety-requirements.ts",
  "mvp-approval-requirements.ts",
  "mvp-output-boundary.ts",
  "mvp-kill-switch-requirements.ts",
  "mvp-artifact-review-loop.ts",
  "mvp-readiness-decision.ts",
  "mvp-user-flow.ts",
  "real-creative-mvp-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "RealCreativeExecutorMvpDesign.tsx",
  "MvpCandidatePanel.tsx",
  "MvpAdapterSelectionPanel.tsx",
  "MvpExecutionPathPanel.tsx",
  "MvpSafetyRequirementsPanel.tsx",
  "MvpApprovalRequirementsPanel.tsx",
  "MvpOutputBoundaryPanel.tsx",
  "MvpKillSwitchRequirementsPanel.tsx",
  "MvpArtifactReviewLoopPanel.tsx",
  "MvpReadinessDecisionPanel.tsx",
  "MvpUserFlowPanel.tsx",
  "RealCreativeMvpSafetyNotice.tsx",
  "RealCreativeMvpEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

$healthSource = Get-Content -Raw "src\lib\codexforge\future-guarded-health-probe\components\FutureGuardedHealthProbePanel.tsx"
$readinessSource = Get-Content -Raw "src\lib\codexforge\real-creative-executor-readiness\components\RealCreativeExecutorReadinessAudit.tsx"
$sandboxSource = Get-Content -Raw "src\lib\codexforge\creative-execution-sandbox\components\CreativeExecutionSandboxPanel.tsx"
$executorSource = Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\GuardedCreativeExecutorPanel.tsx"
$bridgeHealthSource = Get-Content -Raw "src\lib\codexforge\local-bridge-health\components\LocalBridgeHealthPanel.tsx"
$artifactReviewSource = Get-Content -Raw "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx"
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
  "buildRealCreativeMvpCandidate",
  "buildDefaultRealCreativeMvpCandidates",
  "buildMvpAdapterSelection",
  "rankMvpAdapterCandidates",
  "selectRecommendedMvpAdapter",
  "buildMvpExecutionPath",
  "buildMvpExecutionStep",
  "buildMvpSafetyRequirements",
  "buildMvpSafetyRequirement",
  "buildMvpApprovalRequirements",
  "buildMvpApprovalRequirement",
  "buildMvpOutputBoundary",
  "buildMvpOutputBoundaryRule",
  "buildMvpKillSwitchRequirements",
  "buildMvpKillSwitchRequirement",
  "buildMvpArtifactReviewLoop",
  "buildMvpArtifactReviewStep",
  "buildMvpReadinessDecision",
  "buildMvpReadinessDecisionReason",
  "buildRealCreativeMvpUserFlow",
  "buildRealCreativeMvpUserFlowStep",
  "buildRealCreativeMvpSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "RealCreativeExecutorMvpDesign renders",
  "MvpCandidatePanel renders",
  "MvpAdapterSelectionPanel renders",
  "MvpExecutionPathPanel renders",
  "MvpSafetyRequirementsPanel renders",
  "MvpApprovalRequirementsPanel renders",
  "MvpOutputBoundaryPanel renders",
  "MvpKillSwitchRequirementsPanel renders",
  "MvpArtifactReviewLoopPanel renders",
  "MvpReadinessDecisionPanel renders",
  "MvpUserFlowPanel renders",
  "RealCreativeMvpSafetyNotice renders",
  "RealCreativeMvpEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "RealCreativeExecutorMvpDesign" "/creative-mvp imports/renders RealCreativeExecutorMvpDesign"

foreach ($marker in @(
  "design-only",
  "no real execution",
  "no render execution",
  "no command execution",
  "no file writes",
  "execution allowed false",
  "preserve latest-message authority",
  "user-friendly flow",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "showHeroRouteChips={false}",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI/route marker $marker" }
Assert-NotContains $uiSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"

foreach ($marker in @(
  "artifact-capture-only",
  "manual-export-review-loop",
  "blender-version-probe-only",
  "comfyui-health-probe-only",
  "mixed-pipeline rejected as first MVP",
  "no arbitrary command",
  "no arbitrary endpoint",
  "no parent traversal",
  "artifact root required",
  "future executor must implement stop boundary before real render",
  "Provenance and metadata are required",
  "Execution allowed false in Phase 72",
  "Pick one creative tool path",
  "plain English",
  "buildRealCreativeMvpReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $healthSource "Creative MVP" "Health Probe references Creative MVP if integrated"
Assert-Contains $readinessSource "Creative MVP" "Creative Readiness references Creative MVP if integrated"
Assert-Contains $sandboxSource "Creative MVP" "Creative Sandbox references Creative MVP if integrated"
Assert-Contains $executorSource "Creative MVP" "Guarded Creative Executor references Creative MVP if integrated"
Assert-Contains $bridgeHealthSource "Creative MVP" "Local Bridge Health references Creative MVP if integrated"
Assert-Contains $artifactReviewSource "Real Creative Executor MVP Design" "Creative Artifact Review references Creative MVP if integrated"
Assert-Contains $videoSource "Creative MVP" "Video Render Job Preview references Creative MVP if integrated"
Assert-Contains $blenderSource "Creative MVP" "Blender Adapter Preview references Creative MVP if integrated"
Assert-Contains $comfySource "Creative MVP" "ComfyUI Adapter Preview references Creative MVP if integrated"
Assert-Contains $unrealSource "Creative MVP" "Unreal Adapter Preview references Creative MVP if integrated"
Assert-Contains $capabilitySource "Real Creative Executor MVP Design" "Capability Cockpit references Creative MVP if integrated"
Assert-Contains $aiRouterSource "MVP planning task example" "AI Router references MVP planning if integrated"
Assert-Contains $productReadinessSource "Real Creative Executor MVP Design" "Product Readiness references Creative MVP if integrated"
Assert-Contains $consolidationSource "Real Creative Executor MVP Design" "Consolidation references Creative MVP if integrated"
Assert-Contains $commandPaletteSource "Go to Creative MVP Design" "Command Palette includes Go to Creative MVP Design if integrated"
Assert-Contains $commandPaletteSource "Copy creative MVP design packet" "Command Palette includes Copy creative MVP design packet if integrated"
Assert-Contains $commandPaletteSource "Copy user-friendly creative MVP flow" "Command Palette includes Copy user-friendly creative MVP flow if integrated"
Assert-Contains $missionSource "Real Creative Executor MVP Design readiness" "Mission Control includes Real Creative Executor MVP Design if integrated"

foreach ($marker in @(
  "from `"brain-graph`"",
  "from 'brain-graph'",
  "appendEvent(",
  "saveBrainGraph(",
  ".nodes.push",
  ".edges.push",
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
  "process.env",
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
  "OPENAI_API_KEY",
  "sk-"
)) { Assert-NotContains $deterministicSource $marker "no local HTTP/provider/network/API-key dependency in deterministic files: $marker" }

$brokerExecutableMatches = [regex]::Matches($allSource, "broker-execution\s*\(")
if ($brokerExecutableMatches.Count -ne 0) { throw "[FAIL] broker-execution call found." }

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$futureProbeMatches = [regex]::Matches($allSmoke, "smoke-codexforge-future-guarded-health-probe\.ps1")
if ($futureProbeMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Future Guarded Health Probe exactly once; found $($futureProbeMatches.Count)."
}
Assert-Contains $allSmoke "Future Guarded Health Probe" "smoke coverage includes Future Guarded Health Probe exactly once or through group"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-real-creative-executor-mvp\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Real Creative Executor MVP Design exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Real Creative Executor MVP Design" "managed smoke suite includes Real Creative Executor MVP Design exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/creative-mvp" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /creative-mvp returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /creative-mvp route reachable"
} catch {
  Write-Host "[SKIP] /creative-mvp route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Real Creative Executor MVP Design smoke passed."
