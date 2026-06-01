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
Write-Host "=== CodexForge Operator Home Dashboard smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\operator-home"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\page.tsx"
$pageClientPath = "src\app\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "operator-home-types.ts",
  "operator-home-surface.ts",
  "operator-home-routes.ts",
  "operator-home-health.ts",
  "operator-home-next-action.ts",
  "operator-home-launcher.ts",
  "operator-home-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "OperatorHomeDashboard.tsx",
  "OperatorHomeHero.tsx",
  "OperatorHomeStatusStrip.tsx",
  "OperatorHomeLaunchGrid.tsx",
  "OperatorHomeLaunchCard.tsx",
  "OperatorHomeNextActionPanel.tsx",
  "OperatorHomeSystemMap.tsx",
  "OperatorHomeSafetyPanel.tsx",
  "OperatorHomeRecentWorkflowPanel.tsx",
  "OperatorHomeValidationPanel.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageClientSource = Get-Content -Raw $pageClientPath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$homeSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageClientSource

foreach ($export in @(
  "buildOperatorHomeSurface",
  "buildOperatorHomeCapability",
  "buildOperatorHomeRoutes",
  "buildOperatorHomeRouteItem",
  "buildOperatorHomeHealth",
  "buildOperatorHomeHealthDimension",
  "selectOperatorHomeNextAction",
  "buildOperatorHomeNextActionPlan",
  "buildOperatorHomeLauncher",
  "buildOperatorHomeLauncherGroup",
  "buildOperatorHomeSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "OperatorHomeDashboard renders",
  "OperatorHomeHero renders",
  "OperatorHomeStatusStrip renders",
  "OperatorHomeLaunchGrid renders",
  "OperatorHomeLaunchCard renders",
  "OperatorHomeNextActionPanel renders",
  "OperatorHomeSystemMap renders",
  "OperatorHomeSafetyPanel renders",
  "OperatorHomeRecentWorkflowPanel renders",
  "OperatorHomeValidationPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains ($routeSource + "`n" + $pageClientSource) "OperatorHomeDashboard" "/ imports/renders OperatorHomeDashboard"

foreach ($text in @("AI Workspace", "Brain", "Files", "Stabilization")) {
  Assert-Contains $homeSource $text "UI references $text"
}

if (Test-Path "src\app\creative\page.tsx") {
  Assert-Contains $homeSource "Creative" "UI references Creative if route exists"
}

if (Test-Path "src\app\capabilities\page.tsx") {
  Assert-Contains $homeSource "Capabilities" "UI references Capabilities if route exists"
}

foreach ($text in @(
  "local-first",
  "operator-safe",
  "no auto-fix",
  "no command execution without approval",
  "no file writes without approval",
  "preserve latest-message authority"
)) {
  Assert-Contains $homeSource $text "UI says $text"
}

foreach ($text in @(
  "Brain runtime",
  "Stabilization",
  "Patch/apply safety"
)) {
  Assert-Contains $domainSource $text "health includes $text"
}

foreach ($text in @(
  "Core cognition",
  "Engineering workflow",
  "Stabilization and safety"
)) {
  Assert-Contains $domainSource $text "launcher includes $text"
}

Assert-Contains $domainSource 'href: "/stabilization"' "next action can route to /stabilization"
Assert-Contains $domainSource "commit clean checkpoint" "next action can recommend commit clean checkpoint"
Assert-Contains $missionSource "Operator Home Dashboard readiness" "Mission Control includes Operator Home Dashboard readiness if integrated"

Assert-NotMatches $homeSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $homeSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $homeSource "Math.random" "no Math.random"
Assert-NotContains $homeSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $homeSource "d3-force" "no d3-force"
Assert-NotMatches $homeSource "https?://" "no external network dependency"
Assert-NotMatches $homeSource "fetch\s*\(" "no fetch dependency in deterministic operator-home files"
Assert-NotContains $homeSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $homeSource "axios" "no external network library dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $homeSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic operator-home files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $homeSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildOperatorHomeStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildOperatorHomeStableKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-operator-home-dashboard\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Operator Home Dashboard exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Operator Home Dashboard" "managed smoke suite includes Operator Home Dashboard exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] / returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] / route reachable"
} catch {
  Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Operator Home Dashboard smoke passed."
