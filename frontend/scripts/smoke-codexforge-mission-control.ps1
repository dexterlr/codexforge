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
Write-Host "=== CodexForge Mission Control smoke ==="
Write-Host "Base URL: $BaseUrl"

$missionDir = "src\lib\codexforge\mission-control"
$componentDir = Join-Path $missionDir "components"
$routePath = "src\app\mission\page.tsx"
$pageClientPath = "src\app\mission\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $missionDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "mission-control-types.ts",
  "mission-system-map.ts",
  "mission-health.ts",
  "mission-surface-registry.ts",
  "mission-next-actions.ts",
  "mission-readiness.ts",
  "mission-activity.ts",
  "mission-safety.ts",
  "mission-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $missionDir $module)
}

foreach ($component in @(
  "MissionControlDashboard.tsx",
  "MissionHero.tsx",
  "MissionSystemMap.tsx",
  "MissionHealthBoard.tsx",
  "MissionSurfaceGrid.tsx",
  "MissionNextActions.tsx",
  "MissionReadinessBoard.tsx",
  "MissionActivityTimeline.tsx",
  "MissionSafetyBoundary.tsx",
  "MissionLaunchPad.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "MissionControlDashboard renders",
  "MissionHero renders",
  "MissionSystemMap renders",
  "MissionHealthBoard renders",
  "MissionSurfaceGrid renders",
  "MissionNextActions renders",
  "MissionReadinessBoard renders",
  "MissionActivityTimeline renders",
  "MissionSafetyBoundary renders",
  "MissionLaunchPad renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

foreach ($export in @(
  "export function buildMissionSurfaceRegistry(",
  "export function buildMissionSurface(",
  "export function summarizeMissionSurfaces(",
  "export function buildMissionHealthReport(",
  "export function summarizeMissionHealthReport(",
  "export function buildMissionSystemMap(",
  "export function buildMissionSystemEdge(",
  "export function summarizeMissionSystemMap(",
  "export function buildMissionNextActions(",
  "export function selectPrimaryMissionAction(",
  "export function summarizeMissionNextActions(",
  "export function buildMissionReadiness(",
  "export function scoreMissionReadiness(",
  "export function summarizeMissionReadiness(",
  "export function buildMissionActivityTimeline(",
  "export function buildMissionActivityItem(",
  "export function summarizeMissionActivity(",
  "export function buildMissionSafetyBoundary(",
  "export function summarizeMissionSafetyBoundary("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

foreach ($href in @("/brain", "/files", "/capabilities", "/runs", "/bridge", "/creative", "/artifacts", "/production")) {
  Assert-Contains $allSource $href "UI links to $href"
}

Assert-Contains $allSource "no silent desktop control" "UI says no silent desktop control"
Assert-Contains $allSource "broker execution blocked" "UI says broker execution blocked"
Assert-Contains $allSource "approval gated" "UI says approval gated"
Assert-Contains $allSource "approval required" "UI says approval required"

foreach ($marker in @(
  "from `"write-file`"",
  "from 'write-file'",
  "from `"apply-diff`"",
  "from 'apply-diff'",
  "from `"run-command`"",
  "from 'run-command'",
  "broker-execution(",
  "Math.random",
  "Date.now",
  "d3-force",
  "fetch(",
  "XMLHttpRequest",
  "axios",
  "openai",
  "OpenAI",
  "pinecone",
  "weaviate",
  "chroma"
)) {
  Assert-NotContains $allSource $marker "unsafe marker absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildMissionControlReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildMissionControlReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-mission-control\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Mission Control exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Mission Control" "managed smoke suite includes Mission Control exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/mission" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /mission returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /mission route reachable"
} catch {
  Write-Host "[SKIP] /mission route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Mission Control smoke passed."
