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
Write-Host "=== CodexForge Real Creative Executor Readiness smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\real-creative-executor-readiness"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\creative-readiness\page.tsx"
$pageClientPath = "src\app\creative-readiness\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "real-creative-readiness-types.ts",
  "readiness-input.ts",
  "bridge-readiness-audit.ts",
  "adapter-allowlist-audit.ts",
  "path-boundary-audit.ts",
  "artifact-output-audit.ts",
  "dry-run-evidence-audit.ts",
  "approval-readiness-audit.ts",
  "kill-switch-readiness-audit.ts",
  "executor-readiness-scorecard.ts",
  "real-creative-readiness-next-action.ts",
  "real-creative-readiness-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "RealCreativeExecutorReadinessAudit.tsx",
  "ReadinessInputPanel.tsx",
  "BridgeReadinessAuditPanel.tsx",
  "AdapterAllowlistAuditPanel.tsx",
  "PathBoundaryAuditPanel.tsx",
  "ArtifactOutputAuditPanel.tsx",
  "DryRunEvidenceAuditPanel.tsx",
  "ApprovalReadinessAuditPanel.tsx",
  "KillSwitchReadinessAuditPanel.tsx",
  "ExecutorReadinessScorecardPanel.tsx",
  "RealCreativeReadinessNextActionPanel.tsx",
  "RealCreativeReadinessSafetyNotice.tsx",
  "RealCreativeReadinessEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$sandboxSource = Get-Content -Raw "src\lib\codexforge\creative-execution-sandbox\components\CreativeExecutionSandboxPanel.tsx"
$executorSource = Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\GuardedCreativeExecutorPanel.tsx"
$healthSource = (Get-Content -Raw "src\lib\codexforge\local-bridge-health\components\LocalBridgeHealthPanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\local-bridge-health\bridge-health-next-action.ts")
$videoSource = Get-Content -Raw "src\lib\codexforge\video-render-job-preview\components\VideoRenderJobPreviewPanel.tsx"
$artifactSource = Get-Content -Raw "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx"
$blenderSource = Get-Content -Raw "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx"
$comfySource = Get-Content -Raw "src\lib\codexforge\comfyui-adapter-preview\components\ComfyUiAdapterPreviewPanel.tsx"
$unrealSource = Get-Content -Raw "src\lib\codexforge\unreal-adapter-preview\components\UnrealAdapterPreviewPanel.tsx"
$capabilitySource = (Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\tools\capability-bridge-manifest.ts")
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildRealCreativeReadinessInput",
  "validateRealCreativeReadinessInput",
  "buildBridgeReadinessAudit",
  "buildBridgeReadinessAuditItem",
  "buildAdapterAllowlistAudit",
  "buildAdapterAllowlistAuditItem",
  "buildPathBoundaryAudit",
  "buildPathBoundaryAuditItem",
  "buildArtifactOutputAudit",
  "buildArtifactOutputAuditItem",
  "buildDryRunEvidenceAudit",
  "buildDryRunEvidenceItem",
  "buildApprovalReadinessAudit",
  "buildApprovalReadinessItem",
  "buildKillSwitchReadinessAudit",
  "buildKillSwitchReadinessItem",
  "buildExecutorReadinessScorecard",
  "buildExecutorReadinessScore",
  "selectRealCreativeReadinessNextAction",
  "buildRealCreativeReadinessNextActionPlan",
  "buildRealCreativeReadinessSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "RealCreativeExecutorReadinessAudit renders",
  "ReadinessInputPanel renders",
  "BridgeReadinessAuditPanel renders",
  "AdapterAllowlistAuditPanel renders",
  "PathBoundaryAuditPanel renders",
  "ArtifactOutputAuditPanel renders",
  "DryRunEvidenceAuditPanel renders",
  "ApprovalReadinessAuditPanel renders",
  "KillSwitchReadinessAuditPanel renders",
  "ExecutorReadinessScorecardPanel renders",
  "RealCreativeReadinessNextActionPanel renders",
  "RealCreativeReadinessSafetyNotice renders",
  "RealCreativeReadinessEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "RealCreativeExecutorReadinessAudit" "/creative-readiness imports/renders RealCreativeExecutorReadinessAudit"
foreach ($marker in @(
  "audit-only",
  "no real execution",
  "no render execution",
  "no command execution",
  "no file writes",
  "execution allowed false",
  "preserve latest-message authority",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "showHeroRouteChips={false}",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI/route marker $marker" }
Assert-NotContains $uiSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"

foreach ($marker in @(
  "blender",
  "comfyui",
  "unreal",
  "ffmpeg",
  "artifact boundary visible",
  "no broad wildcard adapters",
  "no arbitrary command adapter",
  "parent directory traversal",
  "output root boundary",
  "generated-vs-placeholder distinction",
  "no real execution occurred",
  "cancellation limits acknowledged",
  "future executor kill-switch required",
  "executionAllowed false in Phase 70",
  "mvp-candidate",
  "Phase 71 Future Guarded Health Probe",
  "buildRealCreativeReadinessReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $sandboxSource "Creative Readiness" "Creative Execution Sandbox references Creative Readiness if integrated"
Assert-Contains $executorSource "Creative Readiness" "Guarded Creative Executor references Creative Readiness if integrated"
Assert-Contains $healthSource "Creative Readiness" "Local Bridge Health references Creative Readiness if integrated"
Assert-Contains $videoSource "Creative Readiness" "Video Render Job Preview references Creative Readiness if integrated"
Assert-Contains $artifactSource "Real Creative Executor Readiness" "Creative Artifact Review references Creative Readiness if integrated"
Assert-Contains $blenderSource "Creative Readiness" "Blender Adapter Preview references Creative Readiness if integrated"
Assert-Contains $comfySource "Creative Readiness" "ComfyUI Adapter Preview references Creative Readiness if integrated"
Assert-Contains $unrealSource "Creative Readiness" "Unreal Adapter Preview references Creative Readiness if integrated"
Assert-Contains $capabilitySource "Real Creative Executor Readiness" "Capability Cockpit references Creative Readiness if integrated"
Assert-Contains $aiRouterSource "real creative executor readiness audit" "AI Router references creative readiness if integrated"
Assert-Contains $productReadinessSource "Real Creative Executor Readiness" "Product Readiness references Creative Readiness if integrated"
Assert-Contains $consolidationSource "Real Creative Executor Readiness" "Consolidation references Creative Readiness if integrated"
Assert-Contains $commandPaletteSource "Go to Creative Readiness" "Command Palette includes Go to Creative Readiness if integrated"
Assert-Contains $missionSource "Real Creative Executor Readiness" "Mission Control includes Real Creative Executor Readiness if integrated"

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

Assert-NotMatches $allSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-real-creative-executor-readiness\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Real Creative Executor Readiness exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Real Creative Executor Readiness" "managed smoke suite includes Real Creative Executor Readiness exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/creative-readiness" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /creative-readiness returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /creative-readiness route reachable"
} catch {
  Write-Host "[SKIP] /creative-readiness route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Real Creative Executor Readiness smoke passed."
