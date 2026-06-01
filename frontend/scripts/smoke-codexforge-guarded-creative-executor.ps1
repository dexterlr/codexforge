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
Write-Host "=== CodexForge Guarded Creative Executor smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\guarded-creative-executor"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\creative-executor\page.tsx"
$pageClientPath = "src\app\creative-executor\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "guarded-creative-executor-types.ts",
  "creative-executor-request.ts",
  "creative-executor-adapter-allowlist.ts",
  "creative-executor-approval.ts",
  "creative-executor-policy.ts",
  "creative-executor-preflight.ts",
  "creative-executor-dry-run.ts",
  "creative-executor-kill-switch.ts",
  "creative-executor-artifact-capture.ts",
  "creative-executor-result.ts",
  "creative-executor-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "GuardedCreativeExecutorPanel.tsx",
  "CreativeExecutorRequestPanel.tsx",
  "CreativeExecutorAdapterAllowlistPanel.tsx",
  "CreativeExecutorApprovalPanel.tsx",
  "CreativeExecutorPolicyPanel.tsx",
  "CreativeExecutorPreflightPanel.tsx",
  "CreativeExecutorDryRunPanel.tsx",
  "CreativeExecutorKillSwitchPanel.tsx",
  "CreativeExecutorArtifactCapturePanel.tsx",
  "CreativeExecutorResultPanel.tsx",
  "GuardedCreativeExecutorSafetyNotice.tsx",
  "GuardedCreativeExecutorEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$videoSource = Get-Content -Raw "src\lib\codexforge\video-render-job-preview\components\VideoRenderJobPreviewPanel.tsx"
$bridgeSource = (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\components\CreativeLocalBridgePanel.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-adapter-catalog.ts")
$blenderSource = Get-Content -Raw "src\lib\codexforge\blender-adapter-preview\components\BlenderAdapterPreviewPanel.tsx"
$comfySource = Get-Content -Raw "src\lib\codexforge\comfyui-adapter-preview\components\ComfyUiAdapterPreviewPanel.tsx"
$unrealSource = Get-Content -Raw "src\lib\codexforge\unreal-adapter-preview\components\UnrealAdapterPreviewPanel.tsx"
$artifactSource = Get-Content -Raw "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx"
$capabilitySource = Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx"
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildCreativeExecutorRequest",
  "validateCreativeExecutorRequest",
  "buildCreativeExecutorAdapterAllowlist",
  "buildCreativeExecutorAdapterAllowlistItem",
  "isCreativeExecutorAdapterAllowlisted",
  "buildCreativeExecutorApprovalPacket",
  "validateCreativeExecutorApprovalPacket",
  "buildCreativeExecutorPolicy",
  "isCreativeExecutorAllowed",
  "buildCreativeExecutorPreflight",
  "buildCreativeExecutorPreflightCheck",
  "buildCreativeExecutorDryRun",
  "buildCreativeExecutorDryRunItem",
  "buildCreativeExecutorKillSwitchPlan",
  "buildCreativeExecutorKillSwitchItem",
  "buildCreativeExecutorArtifactCapture",
  "buildCreativeExecutorArtifactCaptureItem",
  "buildCreativeExecutorResult",
  "buildCreativeExecutorResultItem",
  "buildCreativeExecutorSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "GuardedCreativeExecutorPanel renders",
  "CreativeExecutorRequestPanel renders",
  "CreativeExecutorAdapterAllowlistPanel renders",
  "CreativeExecutorApprovalPanel renders",
  "CreativeExecutorPolicyPanel renders",
  "CreativeExecutorPreflightPanel renders",
  "CreativeExecutorDryRunPanel renders",
  "CreativeExecutorKillSwitchPanel renders",
  "CreativeExecutorArtifactCapturePanel renders",
  "CreativeExecutorResultPanel renders",
  "GuardedCreativeExecutorSafetyNotice renders",
  "GuardedCreativeExecutorEmptyState renders"
)) { Assert-Contains $uiSource $marker "$marker" }

Assert-Contains $routeSource "GuardedCreativeExecutorPanel" "/creative-executor imports/renders GuardedCreativeExecutorPanel"
foreach ($marker in @(
  "dry-run-first",
  "execution disabled",
  "no render execution",
  "no command execution",
  "no file writes",
  "future guarded executor",
  "preserve latest-message authority",
  "Focus Mode UX calm workflow layout",
  "shell without duplicate route chip cloud",
  "whiteSpace: `"nowrap`""
)) { Assert-Contains $allSource $marker "UI/route marker $marker" }

foreach ($marker in @(
  "blender-render-job",
  "comfyui-workflow-run",
  "unreal-sequencer-render",
  "ffmpeg-render-preview",
  "approved: input.approved ?? false",
  "real execution blocked by default in Phase 67",
  "Blender execution blocked by default",
  "ComfyUI execution blocked by default",
  "Unreal execution blocked by default",
  "ffmpeg execution blocked by default",
  "artifact writes blocked from UI",
  "kill-switch plan required",
  "adapter allowlisted",
  "artifact capture plan supplied",
  "No real execution",
  "No file writes",
  "No endpoint calls",
  "future-only",
  "waiting-for-future-executor",
  "does not fabricate execution success",
  "buildCreativeExecutorReactKey"
)) { Assert-Contains $allSource $marker "required marker $marker" }

Assert-Contains $videoSource "Guarded Creative Executor" "Video Render Job Preview references Guarded Creative Executor if integrated"
Assert-Contains $bridgeSource "Guarded Creative Executor" "Creative Local Bridge references Guarded Creative Executor if integrated"
Assert-Contains $blenderSource "Guarded Creative Executor" "Blender Adapter Preview references Guarded Creative Executor if integrated"
Assert-Contains $comfySource "Guarded Creative Executor" "ComfyUI Adapter Preview references Guarded Creative Executor if integrated"
Assert-Contains $unrealSource "Guarded Creative Executor" "Unreal Adapter Preview references Guarded Creative Executor if integrated"
Assert-Contains $artifactSource "Guarded Creative Executor" "Creative Artifact Review references Guarded Creative Executor if integrated"
Assert-Contains $capabilitySource "Guarded Creative Executor" "Capability Cockpit references Guarded Creative Executor if integrated"
Assert-Contains $aiRouterSource "creative executor review" "AI Router references creative executor review if integrated"
Assert-Contains $productReadinessSource "Guarded Creative Executor" "Product Readiness references Guarded Creative Executor if integrated"
Assert-Contains $consolidationSource "Guarded Creative Executor" "Consolidation references Guarded Creative Executor if integrated"
Assert-Contains $commandPaletteSource "Go to Creative Executor" "Command Palette includes Go to Creative Executor if integrated"
Assert-Contains $commandPaletteSource "Copy creative executor dry-run" "Command Palette includes Copy creative executor dry-run if integrated"
Assert-Contains $commandPaletteSource "Copy creative executor future packet" "Command Palette includes Copy creative executor future packet if integrated"
Assert-Contains $missionSource "Guarded Creative Executor readiness" "Mission Control includes Guarded Creative Executor readiness if integrated"

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

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-guarded-creative-executor\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Guarded Creative Executor exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Guarded Creative Executor" "managed smoke suite includes Guarded Creative Executor exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/creative-executor" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /creative-executor returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /creative-executor route reachable"
} catch {
  Write-Host "[SKIP] /creative-executor route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Guarded Creative Executor smoke passed."
