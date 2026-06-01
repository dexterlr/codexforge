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
Write-Host "=== CodexForge Global Activity Feed smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\global-activity"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\activity\page.tsx"
$pageClientPath = "src\app\activity\page-client.tsx"
$navDir = "src\lib\codexforge\navigation-shell"
$homeDir = "src\lib\codexforge\operator-home"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$missionDir = "src\lib\codexforge\mission-control"
$paletteDir = "src\lib\codexforge\command-palette"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "global-activity-types.ts",
  "activity-event-model.ts",
  "activity-source-adapters.ts",
  "activity-feed-builder.ts",
  "activity-feed-filter.ts",
  "activity-feed-priority.ts",
  "activity-feed-timeline.ts",
  "activity-next-action.ts",
  "activity-feed-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "GlobalActivityFeed.tsx",
  "GlobalActivityPanel.tsx",
  "GlobalActivityEventCard.tsx",
  "GlobalActivityTimeline.tsx",
  "GlobalActivityFilterBar.tsx",
  "GlobalActivityPriorityBoard.tsx",
  "GlobalActivitySourcePanel.tsx",
  "GlobalActivityNextActionPanel.tsx",
  "GlobalActivitySafetyNotice.tsx",
  "GlobalActivityEmptyState.tsx"
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
$navSource = (Get-ChildItem $navDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$homeSource = (Get-ChildItem $homeDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$paletteSource = (Get-ChildItem $paletteDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$activitySource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSource = $activitySource + "`n" + $navSource + "`n" + $homeSource + "`n" + $stabilizationSource + "`n" + $missionSource + "`n" + $paletteSource

foreach ($export in @(
  "buildGlobalActivityEvent",
  "normalizeGlobalActivityEvent",
  "buildActivityEventsFromVerification",
  "buildActivityEventsFromRegressionTriage",
  "buildActivityEventsFromRegressionFixQueue",
  "buildActivityEventsFromPatchQueue",
  "buildActivityEventsFromApplyGate",
  "buildActivityEventsFromMemoryReview",
  "buildActivityEventsFromCreative",
  "buildActivityEventsFromStabilization",
  "buildGlobalActivityFeed",
  "mergeGlobalActivityEvents",
  "dedupeGlobalActivityEvents",
  "filterGlobalActivityFeed",
  "buildGlobalActivityFeedFilter",
  "scoreGlobalActivityEventPriority",
  "rankGlobalActivityEvents",
  "buildGlobalActivityTimeline",
  "buildGlobalActivityTimelineGroup",
  "selectGlobalActivityNextAction",
  "buildGlobalActivityNextActionPlan",
  "buildGlobalActivityFeedSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "GlobalActivityFeed renders",
  "GlobalActivityPanel renders",
  "GlobalActivityEventCard renders",
  "GlobalActivityTimeline renders",
  "GlobalActivityFilterBar renders",
  "GlobalActivityPriorityBoard renders",
  "GlobalActivitySourcePanel renders",
  "GlobalActivityNextActionPanel renders",
  "GlobalActivitySafetyNotice renders",
  "GlobalActivityEmptyState renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $pageSource "GlobalActivityFeed" "/activity imports/renders GlobalActivityFeed"
Assert-Contains $navSource "Global Activity Feed" "Navigation Shell references Activity if integrated"
Assert-Contains $homeSource "Activity Feed" "Operator Home references Activity Feed if integrated"
Assert-Contains $stabilizationSource "Activity Feed" "Stabilization references Activity Feed if integrated"
Assert-Contains $missionSource "Global Activity Feed readiness" "Mission Control includes Global Activity Feed readiness if integrated"
Assert-Contains $paletteSource "Go to Activity Feed" "Command Palette includes Go to Activity Feed if integrated"

foreach ($text in @(
  "read-only",
  "no command execution without approval",
  "no file writes without approval",
  "no graph mutation",
  "evidence is context, not proof",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

foreach ($text in @(
  "verification.failed",
  "regression.triaged",
  "patch.previewQueued",
  "apply.dryRunSimulated",
  "memory.candidateCreated",
  "creative.planCreated"
)) {
  Assert-Contains $domainSource $text "event model includes $text"
}

foreach ($text in @(
  "blockers",
  "review required",
  "patch workflow",
  "Needs attention",
  "Regression workflow",
  "Patch workflow",
  "review blocker",
  "commit clean checkpoint"
)) {
  Assert-Contains $activitySource $text "activity source includes $text"
}

Assert-NotMatches $activitySource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $activitySource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $activitySource "Math.random" "no Math.random"
Assert-NotContains $activitySource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $activitySource "d3-force" "no d3-force"
Assert-NotMatches $activitySource "https?://" "no external network dependency"
Assert-NotContains $activitySource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $activitySource "axios" "no external network library dependency"
Assert-NotMatches $activitySource "fetch\s*\(" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $activitySource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic global-activity files: $marker"
}

foreach ($marker in @("localStorage", "sessionStorage", "indexedDB", "persistActivity", "saveActivity")) {
  Assert-NotContains $activitySource $marker "no auto-persistence: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildGlobalActivityStableKey" "stable key helper or stable key patterns exist"
Assert-Contains $uiSource "buildGlobalActivityStableKey" "stable key patterns exist in UI"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-global-activity-feed\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Global Activity Feed exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Global Activity Feed" "managed smoke suite includes Global Activity Feed exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/activity" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /activity returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /activity route reachable"
} catch {
  Write-Host "[SKIP] /activity route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Global Activity Feed smoke passed."
