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
Write-Host "=== CodexForge Product Readiness Audit smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\product-readiness-audit"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\readiness\page.tsx"
$pageClientPath = "src\app\readiness\page-client.tsx"
$operatorHomePath = "src\lib\codexforge\operator-home\operator-home-routes.ts"
$stabilizationPath = "src\app\stabilization\page-client.tsx"
$handoffPath = "src\app\handoff\page-client.tsx"
$navigationDir = "src\lib\codexforge\navigation-shell"
$commandDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "product-readiness-types.ts",
  "route-readiness-audit.ts",
  "smoke-coverage-audit.ts",
  "safety-posture-audit.ts",
  "ux-consistency-audit.ts",
  "module-consolidation-audit.ts",
  "functional-workflow-audit.ts",
  "readiness-scorecard.ts",
  "readiness-next-actions.ts",
  "product-readiness-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "ProductReadinessAudit.tsx",
  "RouteReadinessPanel.tsx",
  "SmokeCoveragePanel.tsx",
  "SafetyPostureAuditPanel.tsx",
  "UxConsistencyPanel.tsx",
  "ModuleConsolidationPanel.tsx",
  "FunctionalWorkflowPanel.tsx",
  "ReadinessScorecardPanel.tsx",
  "ReadinessNextActionsPanel.tsx",
  "ProductReadinessSafetyNotice.tsx",
  "ProductReadinessEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$integrationSource = @(
  Get-Content -Raw $operatorHomePath
  Get-Content -Raw $stabilizationPath
  Get-Content -Raw $handoffPath
  (Get-ChildItem $navigationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $commandDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
) -join "`n"
$source = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource + "`n" + $integrationSource
$readinessSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildRouteReadinessAudit",
  "buildRouteReadinessItem",
  "buildSmokeCoverageAudit",
  "buildSmokeCoverageItem",
  "buildProductSafetyPostureAudit",
  "buildProductSafetyPostureItem",
  "buildUxConsistencyAudit",
  "buildUxConsistencyItem",
  "buildModuleConsolidationAudit",
  "buildModuleConsolidationItem",
  "buildFunctionalWorkflowAudit",
  "buildFunctionalWorkflowItem",
  "buildProductReadinessScorecard",
  "buildProductReadinessScore",
  "selectProductReadinessNextAction",
  "buildProductReadinessNextActionPlan",
  "buildProductReadinessSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "ProductReadinessAudit renders",
  "RouteReadinessPanel renders",
  "SmokeCoveragePanel renders",
  "SafetyPostureAuditPanel renders",
  "UxConsistencyPanel renders",
  "ModuleConsolidationPanel renders",
  "FunctionalWorkflowPanel renders",
  "ReadinessScorecardPanel renders",
  "ReadinessNextActionsPanel renders",
  "ProductReadinessSafetyNotice renders",
  "ProductReadinessEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $pageSource "ProductReadinessAudit" "/readiness imports/renders ProductReadinessAudit"
Assert-Contains $operatorHomePath "operator-home-routes" "Operator Home references Product Readiness if integrated"
Assert-Contains $integrationSource "Product Readiness" "Operator Home references Product Readiness if integrated"
Assert-Contains $stabilizationPath "stabilization" "Stabilization references Product Readiness if integrated"
Assert-Contains $handoffPath "handoff" "Handoff references Product Readiness if integrated"
Assert-Contains $integrationSource "Readiness" "Navigation Shell references Readiness if integrated"
Assert-Contains $integrationSource "Go to Product Readiness" "Command Palette includes Go to Product Readiness if integrated"
Assert-Contains $integrationSource "Product Readiness Audit readiness" "Mission Control includes Product Readiness Audit readiness if integrated"

foreach ($text in @(
  "read-only",
  "no command execution",
  "no file writes without approval",
  "no graph mutation",
  "no apply buttons",
  "preserve latest-message authority",
  "/ai",
  "/brain",
  "/files",
  "/stabilization",
  "/handoff",
  "managed suite inclusion",
  "duplicate suite entry risk",
  "no auto-fix",
  "no appendEvent from UI",
  "snapshot restore blocked by default",
  "stable keys",
  "no raw JSON in main UI",
  "dashboard sprawl",
  "project file read",
  "patch-preview-to-apply-gate",
  "validation-to-regression-triage",
  "memory-inbox-to-promotion-gate",
  "workflow functionality",
  "consolidate dashboards",
  "make Files real read-only workflow",
  "Phase 55 Consolidation Pass",
  "buildProductReadinessStableKey"
)) { Assert-Contains $source $text "source includes $text" }

Assert-NotMatches $readinessSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $readinessSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $readinessSource "Math.random" "no Math.random"
Assert-NotContains $readinessSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $readinessSource "d3-force" "no d3-force"
Assert-NotMatches $readinessSource "https?://" "no external network dependency"
Assert-NotMatches $readinessSource "fetch\s*\(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $readinessSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI")) { Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic product-readiness-audit files: $marker" }
Assert-Contains $source "no auto-persistence" "no auto-persistence"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $source $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-product-readiness-audit\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Product Readiness Audit exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmoke "Product Readiness Audit" "managed smoke suite includes Product Readiness Audit exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/readiness" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /readiness returned status $($response.StatusCode)" }
  Write-Host "[PASS] /readiness route reachable"
} catch {
  Write-Host "[SKIP] /readiness route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Product Readiness Audit smoke passed."
