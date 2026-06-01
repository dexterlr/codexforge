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
Write-Host "=== CodexForge Future Guarded Health Probe smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\future-guarded-health-probe"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\health-probe\page.tsx"
$pageClientPath = "src\app\health-probe\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "future-health-probe-types.ts",
  "health-probe-target.ts",
  "health-probe-request.ts",
  "health-probe-allowlist.ts",
  "health-probe-approval.ts",
  "health-probe-policy.ts",
  "health-probe-preflight.ts",
  "health-probe-execution-bridge.ts",
  "health-probe-result.ts",
  "health-probe-readiness-update.ts",
  "future-health-probe-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "FutureGuardedHealthProbePanel.tsx",
  "HealthProbeTargetPanel.tsx",
  "HealthProbeRequestPanel.tsx",
  "HealthProbeAllowlistPanel.tsx",
  "HealthProbeApprovalPanel.tsx",
  "HealthProbePolicyPanel.tsx",
  "HealthProbePreflightPanel.tsx",
  "HealthProbeExecutionBridgePanel.tsx",
  "HealthProbeResultPanel.tsx",
  "HealthProbeReadinessUpdatePanel.tsx",
  "FutureHealthProbeSafetyNotice.tsx",
  "FutureHealthProbeEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$bridgeHealthSource = Get-Content -Raw "src\lib\codexforge\local-bridge-health\components\LocalBridgeHealthPanel.tsx"
$creativeReadinessSource = Get-Content -Raw "src\lib\codexforge\real-creative-executor-readiness\components\RealCreativeExecutorReadinessAudit.tsx"
$executorSource = Get-Content -Raw "src\lib\codexforge\guarded-creative-executor\components\GuardedCreativeExecutorPanel.tsx"
$sandboxSource = Get-Content -Raw "src\lib\codexforge\creative-execution-sandbox\components\CreativeExecutionSandboxPanel.tsx"
$videoSource = Get-Content -Raw "src\lib\codexforge\video-render-job-preview\components\VideoRenderJobPreviewPanel.tsx"
$creativeBridgeSource = Get-Content -Raw "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx"
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
  "buildHealthProbeTarget",
  "buildDefaultHealthProbeTargets",
  "buildHealthProbeRequest",
  "validateHealthProbeRequest",
  "buildHealthProbeAllowlist",
  "buildHealthProbeAllowlistItem",
  "isHealthProbeAllowlisted",
  "buildHealthProbeApprovalPacket",
  "validateHealthProbeApprovalPacket",
  "buildHealthProbePolicy",
  "isHealthProbeAllowed",
  "buildHealthProbePreflight",
  "buildHealthProbePreflightCheck",
  "buildHealthProbeExecutionBridge",
  "executeHealthProbeRequest",
  "buildHealthProbeResult",
  "buildHealthProbeResultItem",
  "buildHealthProbeReadinessUpdate",
  "buildHealthProbeReadinessUpdateItem",
  "buildFutureHealthProbeSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "FutureGuardedHealthProbePanel renders",
  "HealthProbeTargetPanel renders",
  "HealthProbeRequestPanel renders",
  "HealthProbeAllowlistPanel renders",
  "HealthProbeApprovalPanel renders",
  "HealthProbePolicyPanel renders",
  "HealthProbePreflightPanel renders",
  "HealthProbeExecutionBridgePanel renders",
  "HealthProbeResultPanel renders",
  "HealthProbeReadinessUpdatePanel renders",
  "FutureHealthProbeSafetyNotice renders",
  "FutureHealthProbeEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "FutureGuardedHealthProbePanel" "/health-probe imports/renders FutureGuardedHealthProbePanel"

foreach ($marker in @(
  "metadata-only",
  "manual-first",
  "no creative job execution",
  "no render execution",
  "no arbitrary command",
  "no arbitrary endpoint",
  "no file writes",
  "preserve latest-message authority",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI marker $marker" }

foreach ($marker in @(
  "blender-version",
  "comfyui-health-endpoint",
  "unreal-editor-path-presence",
  "ffmpeg-version",
  "artifact-output-boundary",
  "no wildcard allowlist",
  "arbitrary commands allowed: false",
  "arbitrary endpoints allowed: false",
  "approved: input.approved ?? false",
  "command probes blocked by default",
  "local HTTP probes blocked by default",
  "executable launches blocked",
  "render/job execution blocked",
  "artifact writes blocked",
  "broker execution blocked",
  "no arbitrary command",
  "no arbitrary endpoint",
  "manual-only/request-ready/blocked by default",
  "No fabricated completed success",
  "Result does not fabricate readiness",
  "Readiness update does not persist automatically",
  "buildFutureHealthProbeReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $bridgeHealthSource "Health Probe" "Local Bridge Health references Health Probe if integrated"
Assert-Contains $creativeReadinessSource "Health Probe" "Creative Readiness references Health Probe if integrated"
Assert-Contains $executorSource "Health Probe" "Guarded Creative Executor references Health Probe if integrated"
Assert-Contains $sandboxSource "Health Probe" "Creative Execution Sandbox references Health Probe if integrated"
Assert-Contains $videoSource "Health Probe" "Video Render Job Preview references Health Probe if integrated"
Assert-Contains $creativeBridgeSource "Health Probe" "Creative Local Bridge references Health Probe if integrated"
Assert-Contains $blenderSource "Health Probe" "Blender Adapter Preview references Health Probe if integrated"
Assert-Contains $comfySource "Health Probe" "ComfyUI Adapter Preview references Health Probe if integrated"
Assert-Contains $unrealSource "Health Probe" "Unreal Adapter Preview references Health Probe if integrated"
Assert-Contains $capabilitySource "Future Guarded Health Probe" "Capability Cockpit references Health Probe if integrated"
Assert-Contains $aiRouterSource "health probe review task example" "AI Router references health probe if integrated"
Assert-Contains $productReadinessSource "Future Guarded Health Probe" "Product Readiness references Health Probe if integrated"
Assert-Contains $consolidationSource "Future Guarded Health Probe" "Consolidation references Health Probe if integrated"
Assert-Contains $commandPaletteSource "Go to Health Probe" "Command Palette includes Go to Health Probe if integrated"
Assert-Contains $commandPaletteSource "Copy future health probe packet" "Command Palette includes Copy health probe packet if integrated"
Assert-Contains $commandPaletteSource "Copy local bridge setup guide" "Command Palette includes Copy local setup checklist if integrated"
Assert-Contains $missionSource "Future Guarded Health Probe readiness" "Mission Control includes Future Guarded Health Probe if integrated"

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
  "https://"
)) { Assert-NotContains $deterministicSource $marker "no local HTTP/provider/network dependency in deterministic files: $marker" }

Assert-NotContains $allSource "broker-execution(" "no broker-execution call"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-future-guarded-health-probe\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Future Guarded Health Probe exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Future Guarded Health Probe" "managed smoke suite includes Future Guarded Health Probe exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/health-probe" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /health-probe returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /health-probe route reachable"
} catch {
  Write-Host "[SKIP] /health-probe route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Future Guarded Health Probe smoke passed."
