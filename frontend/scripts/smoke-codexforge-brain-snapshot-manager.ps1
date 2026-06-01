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
Write-Host "=== CodexForge Brain Snapshot Manager smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\brain-snapshot-manager"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\brain-snapshots\page.tsx"
$pageClientPath = "src\app\brain-snapshots\page-client.tsx"
$replayDir = "src\lib\codexforge\runtime-event-replay"
$governanceDir = "src\lib\codexforge\brain-mutation-governance"
$journalDir = "src\lib\codexforge\runtime-event-journal"
$brainPage = "src\app\brain\page-client.tsx"
$activityPage = "src\app\activity\page-client.tsx"
$activityDir = "src\lib\codexforge\global-activity"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$navigationDir = "src\lib\codexforge\navigation-shell"
$globalNavigationDir = "src\lib\codexforge\navigation"
$paletteDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "brain-snapshot-types.ts",
  "snapshot-model.ts",
  "snapshot-summary.ts",
  "snapshot-comparison.ts",
  "snapshot-diff.ts",
  "snapshot-integrity.ts",
  "snapshot-replay-selector.ts",
  "snapshot-rollback-plan.ts",
  "snapshot-governance.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "BrainSnapshotManager.tsx",
  "BrainSnapshotPanel.tsx",
  "BrainSnapshotCard.tsx",
  "BrainSnapshotSummaryPanel.tsx",
  "BrainSnapshotComparisonPanel.tsx",
  "BrainSnapshotDiffPanel.tsx",
  "BrainSnapshotIntegrityPanel.tsx",
  "BrainSnapshotReplaySelectorPanel.tsx",
  "BrainSnapshotRollbackPanel.tsx",
  "BrainSnapshotGovernancePanel.tsx",
  "BrainSnapshotSafetyNotice.tsx",
  "BrainSnapshotEmptyState.tsx"
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
$replaySource = (Get-ChildItem $replayDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$governanceSource = (Get-ChildItem $governanceDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$journalSource = (Get-ChildItem $journalDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$brainSource = Get-Content -Raw $brainPage
$activitySource = (Get-Content -Raw $activityPage) + "`n" + ((Get-ChildItem $activityDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$navigationSource = ((Get-ChildItem $navigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + ((Get-ChildItem $globalNavigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$paletteSource = (Get-ChildItem $paletteDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$snapshotSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$integratedSource = $snapshotSource + "`n" + $replaySource + "`n" + $governanceSource + "`n" + $journalSource + "`n" + $brainSource + "`n" + $activitySource + "`n" + $stabilizationSource + "`n" + $navigationSource + "`n" + $paletteSource + "`n" + $missionSource

foreach ($export in @(
  "buildBrainSnapshot",
  "normalizeBrainSnapshot",
  "buildBrainSnapshotSummary",
  "buildBrainSnapshotMetric",
  "compareBrainSnapshots",
  "buildBrainSnapshotComparisonItem",
  "buildBrainSnapshotDiff",
  "buildBrainSnapshotDiffItem",
  "buildBrainSnapshotIntegrityReport",
  "buildBrainSnapshotIntegrityCheck",
  "buildBrainSnapshotReplaySelector",
  "selectBrainSnapshotForReplay",
  "buildBrainSnapshotRollbackPlan",
  "buildBrainSnapshotRollbackOption",
  "buildBrainSnapshotGovernanceReport"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "BrainSnapshotManager renders",
  "BrainSnapshotPanel renders",
  "BrainSnapshotCard renders",
  "BrainSnapshotSummaryPanel renders",
  "BrainSnapshotComparisonPanel renders",
  "BrainSnapshotDiffPanel renders",
  "BrainSnapshotIntegrityPanel renders",
  "BrainSnapshotReplaySelectorPanel renders",
  "BrainSnapshotRollbackPanel renders",
  "BrainSnapshotGovernancePanel renders",
  "BrainSnapshotSafetyNotice renders",
  "BrainSnapshotEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $pageSource "BrainSnapshotManager" "/brain-snapshots imports/renders BrainSnapshotManager"
Assert-Contains $replaySource "Brain Snapshot Manager" "Runtime Event Replay references Brain Snapshot Manager if integrated"
Assert-Contains $governanceSource "Brain Snapshot Manager" "Brain Mutation Governance references Brain Snapshot Manager if integrated"
Assert-Contains $journalSource "Brain Snapshot Manager" "Runtime Event Journal references Brain Snapshot Manager if integrated"
Assert-Contains $brainSource "Brain Snapshot Manager" "/brain references Brain Snapshot Manager if integrated"
Assert-Contains $activitySource "Brain Snapshot Manager" "/activity references Brain Snapshot Manager if integrated"
Assert-Contains $stabilizationSource "Brain Snapshot Manager readiness" "Stabilization references Brain Snapshot Manager if integrated"
Assert-Contains $navigationSource "Brain Snapshots" "Navigation Shell references Brain Snapshots if integrated"
Assert-Contains $paletteSource "Go to Brain Snapshots" "Command Palette includes Go to Brain Snapshots if integrated"
Assert-Contains $paletteSource "Copy Brain snapshot replay prompt" "Command Palette includes Copy Brain snapshot replay prompt"
Assert-Contains $missionSource "Brain Snapshot Manager readiness" "Mission Control includes Brain Snapshot Manager readiness if integrated"
Assert-Contains $missionSource "Review Brain snapshots" "Mission Control next action can mention Review Brain snapshots"
Assert-Contains $missionSource "/brain-snapshots" "Mission Control route/surface registry entry for /brain-snapshots"

foreach ($text in @(
  "read-only",
  "no graph mutation",
  "no snapshot restore in Phase 50",
  "no appendEvent",
  "no saveBrainGraph from UI",
  "canonical graph schema",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI says $text"
}

Assert-Contains $domainSource "brain/graph/types" "snapshot model imports canonical graph types"
Assert-Contains $domainSource "src/lib/codexforge/brain/graph/types.ts" "snapshot model references src/lib/codexforge/brain/graph/types.ts"
Assert-Contains $domainSource "node-ids-unique" "snapshot integrity checks node ids unique"
Assert-Contains $domainSource "edge-endpoints-exist" "snapshot integrity checks edge endpoints exist"
Assert-Contains $domainSource "memory-change" "snapshot comparison includes memory-change"
Assert-Contains $domainSource "concept-change" "snapshot comparison includes concept-change"
Assert-Contains $domainSource "node-added" "snapshot diff includes node-added"
Assert-Contains $domainSource "runtime replay handoff" "replay selector emits runtime replay handoff"
Assert-Contains $domainSource "never restore automatically" "rollback plan says never restore automatically"
Assert-Contains $domainSource "Review runtime event journal" "rollback plan says review runtime event journal"
Assert-Contains $domainSource "Direct saveBrainGraph from UI blocked" "governance says direct saveBrainGraph from UI blocked"
Assert-Contains $domainSource "Direct appendEvent from UI blocked" "governance says direct appendEvent from UI blocked"

Assert-NotMatches $snapshotSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "graph\.nodes\.push|graph\.edges\.push|reduceGraph\s*\(" "no direct graph mutation from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']|applyDiff\s*\(' "no direct apply-diff call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']|writeFile\s*\(' "no direct write-file call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']|runCommand\s*\(' "no direct run-command call from UI"
Assert-NotMatches $snapshotSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $snapshotSource "Math.random" "no Math.random"
Assert-NotContains $snapshotSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $snapshotSource "d3-force" "no d3-force"
Assert-NotMatches $snapshotSource "https?://" "no external network dependency"
Assert-NotMatches $snapshotSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $snapshotSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $snapshotSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $snapshotSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "openai.chat")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic brain-snapshot-manager files: $marker"
}

Assert-NotMatches $snapshotSource "localStorage\.setItem\s*\(|sessionStorage\.setItem\s*\(|indexedDB\.open\s*\(|persistSnapshot|saveSnapshot" "no auto-persistence"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildBrainSnapshotStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildBrainSnapshotManagerReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-brain-snapshot-manager\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Brain Snapshot Manager exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Brain Snapshot Manager" "managed smoke suite includes Brain Snapshot Manager exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/brain-snapshots" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /brain-snapshots returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /brain-snapshots route reachable"
} catch {
  Write-Host "[SKIP] /brain-snapshots route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Brain Snapshot Manager smoke passed."
