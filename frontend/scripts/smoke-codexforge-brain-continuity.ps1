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
Write-Host "=== CodexForge Brain Continuity Dashboard smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\brain-continuity"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\brain-continuity\page.tsx"
$pageClientPath = "src\app\brain-continuity\page-client.tsx"
$snapshotRestorePath = "src\app\snapshot-restore\page-client.tsx"
$brainSnapshotsPath = "src\app\brain-snapshots\page-client.tsx"
$runtimeReplayPath = "src\app\runtime-replay\page-client.tsx"
$brainGovernancePath = "src\app\brain-governance\page-client.tsx"
$runtimeJournalPath = "src\app\runtime-journal\page-client.tsx"
$brainPath = "src\app\brain\page-client.tsx"
$activityPath = "src\app\activity\page-client.tsx"
$stabilizationPath = "src\app\stabilization\page-client.tsx"
$navigationDir = "src\lib\codexforge\navigation-shell"
$commandDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "brain-continuity-types.ts",
  "continuity-signal-model.ts",
  "memory-growth-model.ts",
  "event-journal-health.ts",
  "snapshot-continuity.ts",
  "replay-continuity.ts",
  "restore-continuity-risk.ts",
  "governance-continuity.ts",
  "continuity-next-action.ts",
  "continuity-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "BrainContinuityDashboard.tsx",
  "ContinuitySignalPanel.tsx",
  "MemoryGrowthPanel.tsx",
  "EventJournalHealthPanel.tsx",
  "SnapshotContinuityPanel.tsx",
  "ReplayContinuityPanel.tsx",
  "RestoreContinuityRiskPanel.tsx",
  "GovernanceContinuityPanel.tsx",
  "ContinuityNextActionPanel.tsx",
  "BrainContinuitySafetyNotice.tsx",
  "BrainContinuityEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$integrationSource = @(
  Get-Content -Raw $snapshotRestorePath
  Get-Content -Raw $brainSnapshotsPath
  Get-Content -Raw $runtimeReplayPath
  Get-Content -Raw $brainGovernancePath
  Get-Content -Raw $runtimeJournalPath
  Get-Content -Raw $brainPath
  Get-Content -Raw $activityPath
  Get-Content -Raw $stabilizationPath
  (Get-ChildItem $navigationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $commandDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
) -join "`n"
$source = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource + "`n" + $integrationSource
$continuitySource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "buildBrainContinuitySignals",
  "buildBrainContinuitySignal",
  "buildMemoryGrowthModel",
  "buildMemoryGrowthMetric",
  "buildRuntimeEventJournalHealth",
  "buildRuntimeEventJournalHealthCheck",
  "buildBrainSnapshotContinuity",
  "buildBrainSnapshotContinuityItem",
  "buildRuntimeReplayContinuity",
  "buildRuntimeReplayContinuityCheck",
  "buildSnapshotRestoreContinuityRisk",
  "buildSnapshotRestoreContinuityRiskItem",
  "buildBrainGovernanceContinuity",
  "buildBrainGovernanceContinuityCheck",
  "selectBrainContinuityNextAction",
  "buildBrainContinuityNextActionPlan",
  "buildBrainContinuitySummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "BrainContinuityDashboard renders",
  "ContinuitySignalPanel renders",
  "MemoryGrowthPanel renders",
  "EventJournalHealthPanel renders",
  "SnapshotContinuityPanel renders",
  "ReplayContinuityPanel renders",
  "RestoreContinuityRiskPanel renders",
  "GovernanceContinuityPanel renders",
  "ContinuityNextActionPanel renders",
  "BrainContinuitySafetyNotice renders",
  "BrainContinuityEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $pageSource "BrainContinuityDashboard" "/brain-continuity imports/renders BrainContinuityDashboard"

foreach ($text in @(
  "Brain Continuity Dashboard link/readiness",
  "Brain Continuity Dashboard readiness",
  "Brain Continuity Dashboard source/link",
  "Review Brain continuity",
  "Go to Brain Continuity",
  "Copy Brain continuity prompt"
)) { Assert-Contains $integrationSource $text "integration includes $text" }

foreach ($text in @(
  "read-only",
  "no graph mutation",
  "no snapshot restore",
  "no appendEvent",
  "no saveBrainGraph from UI",
  "preserve latest-message authority",
  "duplicate risk",
  "contradiction risk",
  "append-only semantics",
  "snapshot restore blocked by default",
  "preview-only",
  "data-loss-risk",
  "direct-saveBrainGraph-risk",
  "canonical schema",
  "legacy brain-graph import blocked",
  "direct UI graph mutation blocked",
  "review Brain snapshots",
  "review snapshot restore gate",
  "commit clean checkpoint"
)) { Assert-Contains $source $text "source includes $text" }

Assert-NotMatches $source 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $source "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $continuitySource "Math.random" "no Math.random"
Assert-NotContains $continuitySource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $continuitySource "d3-force" "no d3-force"
Assert-NotMatches $continuitySource "https?://" "no external network dependency"
Assert-NotContains $continuitySource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $continuitySource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI")) { Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic brain-continuity files: $marker" }
Assert-Contains $source "no auto-persistence" "no auto-persistence"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $source $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildBrainContinuityStableKey" "stable key helper or stable key patterns exist"
Assert-Contains $uiSource "buildBrainContinuityStableKey" "stable key patterns exist in UI"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-brain-continuity\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Brain Continuity exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmoke "Brain Continuity" "managed smoke suite includes Brain Continuity exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/brain-continuity" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /brain-continuity returned status $($response.StatusCode)" }
  Write-Host "[PASS] /brain-continuity route reachable"
} catch {
  Write-Host "[SKIP] /brain-continuity route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Brain Continuity Dashboard smoke passed."
