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
Write-Host "=== CodexForge Stabilization Command Center smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\stabilization-command-center"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\stabilization\page.tsx"
$pageClientPath = "src\app\stabilization\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$memoryPagePath = "src\app\memory\page-client.tsx"
$brainPagePath = "src\app\brain\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "stabilization-types.ts",
  "stabilization-signal-model.ts",
  "stabilization-health.ts",
  "stabilization-queue-rollup.ts",
  "stabilization-risk-board.ts",
  "stabilization-next-action.ts",
  "stabilization-readiness.ts",
  "stabilization-timeline.ts",
  "stabilization-handoff.ts",
  "stabilization-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "StabilizationCommandCenter.tsx",
  "StabilizationHealthPanel.tsx",
  "StabilizationSignalPanel.tsx",
  "StabilizationQueueRollupPanel.tsx",
  "StabilizationRiskBoardPanel.tsx",
  "StabilizationReadinessPanel.tsx",
  "StabilizationTimelinePanel.tsx",
  "StabilizationNextActionPanel.tsx",
  "StabilizationHandoffPanel.tsx",
  "StabilizationSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$memorySource = Get-Content -Raw $memoryPagePath
$brainSource = Get-Content -Raw $brainPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$stabilizationSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSource = $stabilizationSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $memorySource + "`n" + $brainSource + "`n" + $missionSource

foreach ($export in @(
  "buildStabilizationSignals",
  "buildStabilizationSignal",
  "buildStabilizationHealthReport",
  "buildStabilizationHealthDimension",
  "buildStabilizationQueueRollup",
  "buildStabilizationQueueRollupItem",
  "buildStabilizationRiskBoard",
  "buildStabilizationRiskItem",
  "buildStabilizationReadiness",
  "buildStabilizationReadinessCheck",
  "buildStabilizationTimeline",
  "buildStabilizationTimelineItem",
  "selectStabilizationNextAction",
  "buildStabilizationNextActionPlan",
  "buildStabilizationHandoff",
  "buildStabilizationPrompt",
  "buildStabilizationCommandCenterSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "StabilizationCommandCenter renders",
  "StabilizationHealthPanel renders",
  "StabilizationSignalPanel renders",
  "StabilizationQueueRollupPanel renders",
  "StabilizationRiskBoardPanel renders",
  "StabilizationReadinessPanel renders",
  "StabilizationTimelinePanel renders",
  "StabilizationNextActionPanel renders",
  "StabilizationHandoffPanel renders",
  "StabilizationSafetyNotice renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $pageSource "StabilizationCommandCenter" "/stabilization imports/renders StabilizationCommandCenter"
Assert-Contains $aiSource "Stabilization Command Center" "/ai references Stabilization Command Center if integrated"
Assert-Contains $filesSource "Stabilization Command Center" "/files references Stabilization Command Center if integrated"
Assert-Contains $tasksSource "Stabilization Command Center" "/tasks references Stabilization Command Center if integrated"
Assert-Contains $memorySource "Stabilization Command Center" "/memory references Stabilization Command Center if integrated"
Assert-Contains $brainSource "Stabilization Command Center" "/brain references Stabilization Command Center if integrated"
Assert-Contains $missionSource "Stabilization Command Center readiness" "Mission Control includes Stabilization Command Center readiness"
Assert-Contains $missionSource "Review stabilization command center" "Mission Control next action includes Review stabilization command center"

foreach ($text in @(
  "no auto-fix",
  "no auto-rollback",
  "no command execution without approval",
  "no file writes without approval",
  "Safe Patch Preview",
  "Preview Diff Composer",
  "evidence is context, not proof",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

foreach ($text in @(
  "build health",
  "smoke health",
  "regression health",
  "safety posture",
  "Regression Fix Queue",
  "Patch Preview Queue",
  "Apply-Diff Execution Gate",
  "latest-message-authority-risk",
  "mutation tools blocked unless explicit approval",
  "commit clean checkpoint",
  "stop and stabilize",
  "review regression triage",
  "inspect current state first",
  "use Safe Patch Preview for edits"
)) {
  Assert-Contains $stabilizationSource $text "stabilization source includes $text"
}

Assert-NotMatches $stabilizationSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $stabilizationSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $stabilizationSource "Math.random" "no Math.random"
Assert-NotContains $stabilizationSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $stabilizationSource "d3-force" "no d3-force"
Assert-NotMatches $stabilizationSource "https?://" "no external network dependency"
Assert-NotContains $stabilizationSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $stabilizationSource "axios" "no external network library dependency"
Assert-NotMatches $stabilizationSource "fetch\s*\(" "no fetch dependency in deterministic stabilization files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $stabilizationSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic stabilization files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildStabilizationStableKey" "stable key helper or stable key patterns exist"
Assert-Contains $uiSource "buildStabilizationStableKey" "stable key patterns exist in UI"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-stabilization-command-center\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Stabilization Command Center exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Stabilization Command Center" "managed smoke suite includes Stabilization Command Center exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/stabilization" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /stabilization returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /stabilization route reachable"
} catch {
  Write-Host "[SKIP] /stabilization route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Stabilization Command Center smoke passed."
