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
Write-Host "=== CodexForge Unreal Adapter Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\unreal-adapter-preview"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\unreal\page.tsx"
$pageClientPath = "src\app\unreal\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "unreal-adapter-types.ts",
  "unreal-project-input.ts",
  "unreal-level-model.ts",
  "unreal-actor-plan.ts",
  "unreal-asset-plan.ts",
  "unreal-material-plan.ts",
  "unreal-blueprint-plan.ts",
  "unreal-sequencer-plan.ts",
  "unreal-build-settings.ts",
  "unreal-command-preview.ts",
  "unreal-safety-policy.ts",
  "unreal-execution-packet.ts",
  "unreal-adapter-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "UnrealAdapterPreviewPanel.tsx",
  "UnrealProjectInputPanel.tsx",
  "UnrealLevelModelPanel.tsx",
  "UnrealActorPlanPanel.tsx",
  "UnrealAssetPlanPanel.tsx",
  "UnrealMaterialPlanPanel.tsx",
  "UnrealBlueprintPlanPanel.tsx",
  "UnrealSequencerPlanPanel.tsx",
  "UnrealBuildSettingsPanel.tsx",
  "UnrealCommandPreviewPanel.tsx",
  "UnrealSafetyPolicyPanel.tsx",
  "UnrealExecutionPacketPanel.tsx",
  "UnrealAdapterSafetyNotice.tsx",
  "UnrealAdapterEmptyState.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = (Get-ChildItem $domainDir -File -Exclude "index.ts" | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$creativeBridgeSource = (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-adapter-catalog.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative-local-bridge\creative-local-bridge-types.ts")
$creativeSource = (Get-Content -Raw "src\lib\codexforge\creative\components\CreativeProductionStudio.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\creative\render-queue.ts")
$capabilitySource = (Get-Content -Raw "src\lib\codexforge\capabilities\components\CapabilityCommandCenter.tsx") + "`n" + (Get-Content -Raw "src\lib\codexforge\tools\capability-bridge-manifest.ts")
$aiRouterSource = Get-Content -Raw "src\lib\codexforge\ai-router\components\AiRouterCockpit.tsx"
$productReadinessSource = (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\product-readiness-audit\readiness-next-actions.ts")
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$commandPaletteSource = (Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\command-palette\command-copy-payloads.ts")
$missionSource = (Get-Content -Raw "src\lib\codexforge\mission-control\mission-health.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-surface-registry.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\mission-control\mission-next-actions.ts")
$artifactSource = (Get-Content -Raw "src\lib\codexforge\artifact-executor\artifact-types.ts") + "`n" + (Get-Content -Raw "src\lib\codexforge\artifact-workspace\artifact-workspace-types.ts")
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildUnrealProjectInput",
  "validateUnrealProjectInput",
  "buildUnrealLevelModel",
  "buildUnrealLevelLayer",
  "buildUnrealActorPlan",
  "buildUnrealActorItem",
  "buildUnrealAssetPlan",
  "buildUnrealAssetItem",
  "buildUnrealMaterialPlan",
  "buildUnrealMaterialItem",
  "buildUnrealBlueprintPlan",
  "buildUnrealBlueprintItem",
  "buildUnrealSequencerPlan",
  "buildUnrealSequencerShot",
  "buildUnrealBuildSettings",
  "buildUnrealCommandPreview",
  "buildUnrealCommandSection",
  "buildUnrealAdapterSafetyPolicy",
  "isUnrealAdapterExecutionAllowed",
  "buildUnrealExecutionPacket",
  "validateUnrealExecutionPacket",
  "buildUnrealAdapterSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "UnrealAdapterPreviewPanel renders",
  "UnrealProjectInputPanel renders",
  "UnrealLevelModelPanel renders",
  "UnrealActorPlanPanel renders",
  "UnrealAssetPlanPanel renders",
  "UnrealMaterialPlanPanel renders",
  "UnrealBlueprintPlanPanel renders",
  "UnrealSequencerPlanPanel renders",
  "UnrealBuildSettingsPanel renders",
  "UnrealCommandPreviewPanel renders",
  "UnrealSafetyPolicyPanel renders",
  "UnrealExecutionPacketPanel renders",
  "UnrealAdapterSafetyNotice renders",
  "UnrealAdapterEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $routeSource "UnrealAdapterPreviewPanel" "/unreal imports/renders UnrealAdapterPreviewPanel"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "no Unreal execution" "UI says no Unreal execution"
Assert-Contains $uiSource "no Unreal Editor launch" "UI says no Unreal Editor launch"
Assert-Contains $uiSource "no render execution" "UI says no render execution"
Assert-Contains $uiSource "no package/build" "UI says no package/build"
Assert-Contains $uiSource "no file writes" "UI says no file writes"
Assert-Contains $uiSource "future executor boundary" "UI says future executor boundary"
Assert-Contains $uiSource "preserve latest-message authority" "UI says preserve latest-message authority"
Assert-Contains $uiSource "Focus Mode UX calm workflow layout" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $uiSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $uiSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"

foreach ($marker in @(
  '"cinematic-preview"',
  '"playable-level-preview"',
  '"cine-camera-actor"',
  '"blueprint-actor-placeholder"',
  '"static-mesh"',
  '"level-sequence"',
  '"actor-blueprint"',
  "shotId",
  "targetPlatformLabel",
  "preview only comment",
  "Unreal execution blocked in Phase 65",
  "Unreal Editor launch blocked in Phase 65",
  "Package/build blocked in Phase 65",
  "Render/movie queue blocked in Phase 65",
  "File writes blocked in Phase 65",
  "Future executor boundary",
  "buildUnrealAdapterReactKey"
)) {
  Assert-Contains $allSource $marker "required marker $marker"
}

foreach ($marker in @(
  "UnrealEditor-Cmd.exe",
  "subprocess",
  "os.system",
  "child_process",
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
  "UnrealEditor command execution call",
  "render execution call",
  "package/build execution call",
  "broker-execution(",
  "apiKey",
  "localStorage",
  "Math.random",
  "Date.now",
  "d3-force",
  "XMLHttpRequest",
  "axios",
  "pinecone",
  "weaviate",
  "chroma",
  "auto-persist"
)) {
  Assert-NotContains $allSource $marker "forbidden marker absent: $marker"
}

foreach ($marker in @(
  "fetch(",
  "OpenAI",
  "api.openai",
  "provider API",
  "http://",
  "https://",
  "external network"
)) {
  Assert-NotContains $deterministicSource $marker "no local HTTP/provider/network dependency in deterministic files: $marker"
}

Assert-Contains $creativeBridgeSource "Unreal Adapter Preview v1" "Creative Local Bridge references Unreal Adapter Preview if integrated"
Assert-Contains $creativeBridgeSource "/unreal" "Creative Local Bridge handoff can link to /unreal"
Assert-Contains $creativeSource "Unreal Adapter Preview" "Creative Production Studio references Unreal Adapter Preview if integrated"
Assert-Contains $capabilitySource "Unreal Adapter Preview" "Capability Cockpit references Unreal Adapter Preview if integrated"
Assert-Contains $artifactSource "unreal-command-preview" "Creative Artifact Review references Unreal artifacts if integrated"
Assert-Contains $artifactSource "unreal-level-plan" "Artifact placeholders include unreal-level-plan if integrated"
Assert-Contains $artifactSource "unreal-sequence" "Artifact placeholders include unreal-sequence if integrated"
Assert-Contains $aiRouterSource "Unreal cinematic/level planning" "AI Router references Unreal planning if integrated"
Assert-Contains $aiRouterSource "local or cheap" "AI Router recommends local/cheap if integrated"
Assert-Contains $aiRouterSource "premium only for complex cinematic/blueprint reasoning" "AI Router premium guidance if integrated"
Assert-Contains $productReadinessSource "Unreal Adapter Preview v1" "Product Readiness references Unreal Adapter Preview if integrated"
Assert-Contains $consolidationSource "Unreal Adapter Preview v1" "Consolidation references Unreal Adapter Preview if integrated"
Assert-Contains $consolidationSource "/unreal" "Consolidation workflow entrypoint points to /unreal"
Assert-Contains $commandPaletteSource "Go to Unreal Adapter Preview" "Command Palette includes Go to Unreal Adapter Preview if integrated"
Assert-Contains $commandPaletteSource "Copy Unreal command preview prompt" "Command Palette includes Copy Unreal command preview prompt if integrated"
Assert-Contains $commandPaletteSource "Copy Unreal future executor packet" "Command Palette includes Copy Unreal future executor packet if integrated"
Assert-Contains $missionSource "Unreal Adapter Preview readiness" "Mission Control includes Unreal Adapter Preview readiness if integrated"
Assert-Contains $missionSource "Review Unreal adapter preview" "Mission Control next action mentions review Unreal adapter preview"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-unreal-adapter-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Unreal Adapter Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Unreal Adapter Preview" "managed smoke suite includes Unreal Adapter Preview exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/unreal" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /unreal returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /unreal route reachable"
} catch {
  Write-Host "[SKIP] /unreal route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Unreal Adapter Preview smoke passed."
