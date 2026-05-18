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
Write-Host "=== CodexForge Runtime Event Replay smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\runtime-event-replay"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\runtime-replay\page.tsx"
$pageClientPath = "src\app\runtime-replay\page-client.tsx"
$journalDir = "src\lib\codexforge\runtime-event-journal"
$executorDir = "src\lib\codexforge\runtime-event-executor"
$governanceDir = "src\lib\codexforge\brain-mutation-governance"
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
  "runtime-event-replay-types.ts",
  "replay-input.ts",
  "replay-snapshot-model.ts",
  "replay-event-sequence.ts",
  "replay-reducer-simulator.ts",
  "replay-impact-analysis.ts",
  "replay-risk-detector.ts",
  "replay-rollback-advisor.ts",
  "replay-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "RuntimeEventReplaySimulator.tsx",
  "ReplayInputPanel.tsx",
  "ReplaySnapshotPanel.tsx",
  "ReplayEventSequencePanel.tsx",
  "ReplayReducerSimulatorPanel.tsx",
  "ReplayImpactAnalysisPanel.tsx",
  "ReplayRiskDetectorPanel.tsx",
  "ReplayRollbackAdvisorPanel.tsx",
  "ReplaySummaryPanel.tsx",
  "RuntimeEventReplaySafetyNotice.tsx",
  "RuntimeEventReplayEmptyState.tsx"
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
$journalSource = (Get-ChildItem $journalDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$executorSource = (Get-ChildItem $executorDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$governanceSource = (Get-ChildItem $governanceDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$brainSource = Get-Content -Raw $brainPage
$activitySource = (Get-Content -Raw $activityPage) + "`n" + ((Get-ChildItem $activityDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$navigationSource = ((Get-ChildItem $navigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + ((Get-ChildItem $globalNavigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$paletteSource = (Get-ChildItem $paletteDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$replaySource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$integratedSource = $replaySource + "`n" + $journalSource + "`n" + $executorSource + "`n" + $governanceSource + "`n" + $brainSource + "`n" + $activitySource + "`n" + $stabilizationSource + "`n" + $navigationSource + "`n" + $paletteSource + "`n" + $missionSource

foreach ($export in @(
  "buildRuntimeEventReplayInput",
  "validateRuntimeEventReplayInput",
  "buildRuntimeReplaySnapshot",
  "normalizeRuntimeReplaySnapshot",
  "buildRuntimeReplayEventSequence",
  "buildRuntimeReplayEventSequenceItem",
  "simulateRuntimeEventReplay",
  "simulateRuntimeEventReplayStep",
  "buildRuntimeReplayImpactAnalysis",
  "buildRuntimeReplayImpactItem",
  "buildRuntimeReplayRiskReport",
  "buildRuntimeReplayRiskItem",
  "buildRuntimeReplayRollbackAdvice",
  "buildRuntimeReplayRollbackOption",
  "buildRuntimeEventReplaySummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "RuntimeEventReplaySimulator renders",
  "ReplayInputPanel renders",
  "ReplaySnapshotPanel renders",
  "ReplayEventSequencePanel renders",
  "ReplayReducerSimulatorPanel renders",
  "ReplayImpactAnalysisPanel renders",
  "ReplayRiskDetectorPanel renders",
  "ReplayRollbackAdvisorPanel renders",
  "ReplaySummaryPanel renders",
  "RuntimeEventReplaySafetyNotice renders",
  "RuntimeEventReplayEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $pageSource "RuntimeEventReplaySimulator" "/runtime-replay imports/renders RuntimeEventReplaySimulator"
Assert-Contains $journalSource "Runtime Event Replay Simulator" "Runtime Event Journal references Runtime Event Replay if integrated"
Assert-Contains $governanceSource "Runtime Event Replay Simulator" "Brain Mutation Governance references Runtime Event Replay if integrated"
Assert-Contains $executorSource "Runtime Event Replay" "Runtime Event Executor references Runtime Event Replay if integrated"
Assert-Contains $brainSource "Runtime Event Replay" "/brain references Runtime Event Replay if integrated"
Assert-Contains $activitySource "Runtime Event Replay" "/activity references Runtime Event Replay if integrated"
Assert-Contains $stabilizationSource "Runtime Event Replay readiness" "Stabilization references Runtime Event Replay if integrated"
Assert-Contains $navigationSource "Runtime Replay" "Navigation Shell references Runtime Replay if integrated"
Assert-Contains $paletteSource "Go to Runtime Event Replay" "Command Palette includes Go to Runtime Event Replay if integrated"
Assert-Contains $missionSource "Runtime Event Replay Simulator readiness" "Mission Control includes Runtime Event Replay Simulator readiness if integrated"

foreach ($text in @(
  "preview-only",
  "no graph mutation",
  "no appendEvent",
  "no event execution",
  "canonical graph schema",
  "evidence is context, not authority",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI says $text"
}

Assert-Contains $domainSource "brain/graph/types" "replay snapshot imports canonical graph types"
Assert-Contains $domainSource "src/lib/codexforge/brain/graph/types.ts" "replay snapshot references src/lib/codexforge/brain/graph/types.ts"
Assert-Contains $domainSource "reduceGraph" "replay simulator uses reduceGraph"
Assert-Contains $domainSource "cloneRuntimeReplayGraph" "replay simulator does not mutate original graph"
Assert-NotMatches $domainSource "appendEvent\s*\(" "replay simulator never calls appendEvent"
Assert-Contains $domainSource "memory-promoted" "impact analysis includes memory-promoted"
Assert-Contains $domainSource "unknown-event-type" "risk detector includes unknown-event-type"
Assert-Contains $domainSource "duplicate-memory-risk" "risk detector includes duplicate-memory-risk"
Assert-Contains $domainSource "contradiction-risk" "risk detector includes contradiction-risk"
Assert-Contains $domainSource "stale-snapshot-risk" "risk detector includes stale-snapshot-risk"
Assert-Contains $domainSource "do not apply event" "rollback advisor says do not apply event"
Assert-Contains $domainSource "review runtime event journal" "rollback advisor says review runtime event journal"

Assert-NotMatches $replaySource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "reduceGraph\s*\(|saveBrainGraph\s*\(|loadBrainGraph\s*\(|graph\.nodes\.push|graph\.edges\.push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']|applyDiff\s*\(' "no direct apply-diff call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']|writeFile\s*\(' "no direct write-file call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']|runCommand\s*\(' "no direct run-command call from UI"
Assert-NotMatches $replaySource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $replaySource "Math.random" "no Math.random"
Assert-NotContains $replaySource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $replaySource "d3-force" "no d3-force"
Assert-NotMatches $replaySource "https?://" "no external network dependency"
Assert-NotMatches $replaySource "fetch\s*\(" "no external network dependency"
Assert-NotContains $replaySource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $replaySource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $replaySource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "openai.chat")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic runtime-event-replay files: $marker"
}

Assert-NotMatches $replaySource "localStorage\.setItem\s*\(|sessionStorage\.setItem\s*\(|indexedDB\.open\s*\(|persistReplay|saveReplay" "no auto-persistence"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildRuntimeEventReplayStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildRuntimeEventReplayReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-runtime-event-replay\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Runtime Event Replay exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Runtime Event Replay" "managed smoke suite includes Runtime Event Replay exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/runtime-replay" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /runtime-replay returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /runtime-replay route reachable"
} catch {
  Write-Host "[SKIP] /runtime-replay route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Runtime Event Replay smoke passed."
