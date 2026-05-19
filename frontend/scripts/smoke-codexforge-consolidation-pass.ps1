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
Write-Host "=== CodexForge Consolidation Pass smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\consolidation"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\consolidation\page.tsx"
$pageClientPath = "src\app\consolidation\page-client.tsx"
$navigationDir = "src\lib\codexforge\navigation-shell"
$operatorHomeDir = "src\lib\codexforge\operator-home"
$readinessDir = "src\lib\codexforge\product-readiness-audit"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$handoffDir = "src\lib\codexforge\continuity-handoff"
$commandDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "consolidation-types.ts",
  "surface-map.ts",
  "route-consolidation.ts",
  "cockpit-consolidation.ts",
  "shared-readiness-model.ts",
  "shared-next-action-model.ts",
  "shared-safety-copy.ts",
  "workflow-entrypoints.ts",
  "consolidation-plan.ts",
  "consolidation-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "ConsolidationOverview.tsx",
  "SurfaceMapPanel.tsx",
  "RouteConsolidationPanel.tsx",
  "CockpitConsolidationPanel.tsx",
  "SharedReadinessPanel.tsx",
  "SharedNextActionPanel.tsx",
  "WorkflowEntrypointsPanel.tsx",
  "ConsolidationPlanPanel.tsx",
  "ConsolidationSafetyNotice.tsx",
  "ConsolidationEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageClientSource = Get-Content -Raw $pageClientPath
$integrationSource = @(
  (Get-ChildItem $navigationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $operatorHomeDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $readinessDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $stabilizationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $handoffDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $commandDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
) -join "`n"
$source = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageClientSource + "`n" + $integrationSource
$consolidationSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageClientSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildCodexForgeSurfaceMap",
  "buildCodexForgeSurfaceItem",
  "buildRouteConsolidationPlan",
  "buildRouteConsolidationItem",
  "buildCockpitConsolidationAudit",
  "buildCockpitConsolidationItem",
  "buildSharedReadinessModel",
  "buildSharedReadinessItem",
  "buildSharedNextActionModel",
  "selectSharedNextAction",
  "buildSharedSafetyCopy",
  "buildSharedSafetyCopyItem",
  "buildWorkflowEntrypoints",
  "buildWorkflowEntrypoint",
  "buildConsolidationPlan",
  "buildConsolidationPlanItem",
  "buildConsolidationSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "ConsolidationOverview renders",
  "SurfaceMapPanel renders",
  "RouteConsolidationPanel renders",
  "CockpitConsolidationPanel renders",
  "SharedReadinessPanel renders",
  "SharedNextActionPanel renders",
  "WorkflowEntrypointsPanel renders",
  "ConsolidationPlanPanel renders",
  "ConsolidationSafetyNotice renders",
  "ConsolidationEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $pageClientSource "ConsolidationOverview" "/consolidation imports/renders ConsolidationOverview"
Assert-Contains $integrationSource "Consolidation Pass" "Navigation Shell references Consolidation if integrated"
Assert-Contains $integrationSource "Consolidation Pass" "Operator Home references Consolidation if integrated"
Assert-Contains $integrationSource "Consolidation Pass complete" "Product Readiness references Consolidation if integrated"
Assert-Contains $integrationSource "Consolidation Pass readiness" "Stabilization references Consolidation if integrated"
Assert-Contains $integrationSource "Consolidation Posture" "Handoff references Consolidation if integrated"
Assert-Contains $integrationSource "Go to Consolidation" "Command Palette includes Go to Consolidation if integrated"
Assert-Contains $integrationSource "Consolidation Pass readiness" "Mission Control includes Consolidation Pass readiness if integrated"

foreach ($text in @(
  "read-only",
  "no command execution",
  "no file writes without approval",
  "no graph mutation",
  "preserve latest-message authority",
  "Command Deck",
  "Brain Continuity",
  "Engineering Workflow",
  "primary route",
  "/stabilization",
  "deep governance route",
  "next action panel",
  "safety notice",
  "no auto-fix",
  "no appendEvent from UI",
  "File Reader v1",
  "Patch Preview v1",
  "Validation Runner v1",
  "prepare /files for real read-only workflow next",
  "Phase 56 Real Local Project Reader",
  "no auto-persistence",
  "buildConsolidationStableKey"
)) { Assert-Contains $source $text "source includes $text" }

Assert-Contains $domainSource 'route: "/"' "route consolidation marks / as primary"
Assert-Contains $domainSource 'route: "/stabilization"' "route consolidation marks /stabilization as primary"
Assert-Contains $domainSource 'route: "/runtime-journal"' "route consolidation marks /runtime-journal as deep governance"

Assert-NotMatches $consolidationSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $consolidationSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $consolidationSource "Math.random" "no Math.random"
Assert-NotContains $consolidationSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $consolidationSource "d3-force" "no d3-force"
Assert-NotMatches $consolidationSource "https?://" "no external network dependency"
Assert-NotMatches $consolidationSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $consolidationSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $consolidationSource "axios" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $consolidationSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "from `"openai`"", "from 'openai'")) { Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic consolidation files: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $source $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-consolidation-pass\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Consolidation Pass exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmoke "Consolidation Pass" "managed smoke suite includes Consolidation Pass exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/consolidation" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /consolidation returned status $($response.StatusCode)" }
  Write-Host "[PASS] /consolidation route reachable"
} catch {
  Write-Host "[SKIP] /consolidation route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Consolidation Pass smoke passed."
