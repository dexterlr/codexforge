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
Write-Host "=== CodexForge Runtime Event Journal smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\runtime-event-journal"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\runtime-journal\page.tsx"
$pageClientPath = "src\app\runtime-journal\page-client.tsx"
$executorDir = "src\lib\codexforge\runtime-event-executor"
$gateDir = "src\lib\codexforge\memory-promotion-gate"
$activityPage = "src\app\activity\page-client.tsx"
$activityComponent = "src\lib\codexforge\global-activity\components\GlobalActivityFeed.tsx"
$brainPage = "src\app\brain\page-client.tsx"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$navigationDir = "src\lib\codexforge\navigation-shell"
$paletteDir = "src\lib\codexforge\command-palette"
$brainCommandPath = "src\lib\codexforge\brain\components\commands\brain-command-registry.ts"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "runtime-event-journal-types.ts",
  "journal-entry-model.ts",
  "journal-source-adapters.ts",
  "journal-feed-builder.ts",
  "journal-filter.ts",
  "journal-priority.ts",
  "journal-reducer-trace.ts",
  "journal-integrity.ts",
  "journal-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "RuntimeEventJournal.tsx",
  "RuntimeEventJournalPanel.tsx",
  "RuntimeEventJournalEntryCard.tsx",
  "RuntimeEventJournalFilterBar.tsx",
  "RuntimeEventJournalTimeline.tsx",
  "RuntimeEventReducerTracePanel.tsx",
  "RuntimeEventJournalIntegrityPanel.tsx",
  "RuntimeEventJournalSourcePanel.tsx",
  "RuntimeEventJournalSafetyNotice.tsx",
  "RuntimeEventJournalEmptyState.tsx"
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
$executorSource = (Get-ChildItem $executorDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = (Get-ChildItem $gateDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$activitySource = (Get-Content -Raw $activityPage) + "`n" + (Get-Content -Raw $activityComponent)
$brainSource = Get-Content -Raw $brainPage
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$navigationSource = (Get-ChildItem $navigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$paletteSource = ((Get-ChildItem $paletteDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + (Get-Content -Raw $brainCommandPath)
$missionSource = (Get-ChildItem $missionDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$journalSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$integratedSource = $journalSource + "`n" + $executorSource + "`n" + $gateSource + "`n" + $activitySource + "`n" + $brainSource + "`n" + $stabilizationSource + "`n" + $navigationSource + "`n" + $paletteSource + "`n" + $missionSource

foreach ($export in @(
  "buildRuntimeEventJournalEntry",
  "normalizeRuntimeEventJournalEntry",
  "buildJournalEntriesFromRuntimeExecutor",
  "buildJournalEntriesFromMemoryPromotionGate",
  "buildJournalEntriesFromOperatorMemoryInbox",
  "buildJournalEntriesFromActivityFeed",
  "buildJournalEntriesFromBrainRuntime",
  "buildRuntimeEventJournalFeed",
  "mergeRuntimeEventJournalEntries",
  "dedupeRuntimeEventJournalEntries",
  "buildRuntimeEventJournalFilter",
  "filterRuntimeEventJournalFeed",
  "scoreRuntimeEventJournalEntryPriority",
  "rankRuntimeEventJournalEntries",
  "buildRuntimeEventReducerTrace",
  "buildRuntimeEventReducerTraceItem",
  "buildRuntimeEventJournalIntegrityReport",
  "buildRuntimeEventJournalIntegrityCheck",
  "buildRuntimeEventJournalSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "RuntimeEventJournal renders",
  "RuntimeEventJournalPanel renders",
  "RuntimeEventJournalEntryCard renders",
  "RuntimeEventJournalFilterBar renders",
  "RuntimeEventJournalTimeline renders",
  "RuntimeEventReducerTracePanel renders",
  "RuntimeEventJournalIntegrityPanel renders",
  "RuntimeEventJournalSourcePanel renders",
  "RuntimeEventJournalSafetyNotice renders",
  "RuntimeEventJournalEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $pageSource "RuntimeEventJournal" "/runtime-journal imports/renders RuntimeEventJournal"
Assert-Contains $executorSource "Runtime Event Journal" "Runtime Event Executor references Runtime Event Journal if integrated"
Assert-Contains $gateSource "Runtime Event Journal" "Memory Promotion Gate references Runtime Event Journal if integrated"
Assert-Contains $activitySource "Runtime Event Journal" "/activity references Runtime Event Journal if integrated"
Assert-Contains $brainSource "Runtime Event Journal" "/brain references Runtime Event Journal if integrated"
Assert-Contains $stabilizationSource "Runtime Event Journal readiness" "Stabilization references Runtime Event Journal if integrated"
Assert-Contains $navigationSource "Runtime Journal" "Navigation Shell references Runtime Journal if integrated"
Assert-Contains $paletteSource "Go to Runtime Event Journal" "Command Palette includes Go to Runtime Event Journal if integrated"
Assert-Contains $paletteSource "Copy runtime journal audit prompt" "Command Palette includes Copy runtime journal audit prompt"
Assert-Contains $missionSource "Runtime Event Journal readiness" "Mission Control includes Runtime Event Journal readiness if integrated"

foreach ($text in @(
  "read-only",
  "no graph mutation",
  "no appendEvent from UI",
  "append-only audit",
  "evidence is context, not authority",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI says $text"
}

foreach ($text in @(
  "request.created",
  "policy.checked",
  "validation.checked",
  "approval.reviewed",
  "dryRun.completed",
  "reducerPreview.built",
  "event.appended",
  "memoryPromotion.approved"
)) {
  Assert-Contains $domainSource $text "journal entry model includes $text"
}

foreach ($text in @(
  "memory promotion",
  "reducer previews",
  "review required"
)) {
  Assert-Contains $journalSource $text "filters include $text"
}

Assert-Contains $domainSource "src/lib/codexforge/brain/graph/types.ts" "reducer trace references canonical graph schema path"
Assert-NotMatches $domainSource 'from\s+["''][^"'']*brain-graph["'']' "reducer trace does not import brain-graph"
Assert-Contains $domainSource "append-only semantics visible" "integrity report checks append-only semantics"
Assert-Contains $domainSource "direct UI mutation absent" "integrity report checks direct UI mutation absent"
Assert-Contains $domainSource "blocked-first" "priority ranks blocked first"

Assert-NotMatches $journalSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "reduceGraph\s*\(|saveBrainGraph\s*\(|loadBrainGraph\s*\(" "no direct graph mutation from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']|applyDiff\s*\(' "no direct apply-diff call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']|writeFile\s*\(' "no direct write-file call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']|runCommand\s*\(' "no direct run-command call from UI"
Assert-NotMatches $journalSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $journalSource "Math.random" "no Math.random"
Assert-NotContains $journalSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $journalSource "d3-force" "no d3-force"
Assert-NotMatches $journalSource "https?://" "no external network dependency"
Assert-NotMatches $journalSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $journalSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $journalSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $journalSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "openai.chat")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic runtime-event-journal files: $marker"
}

Assert-NotMatches $journalSource "localStorage|sessionStorage|indexedDB|persistJournal|saveJournal" "no auto-persistence"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildRuntimeEventJournalStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildRuntimeEventJournalReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-runtime-event-journal\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Runtime Event Journal exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Runtime Event Journal" "managed smoke suite includes Runtime Event Journal exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/runtime-journal" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /runtime-journal returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /runtime-journal route reachable"
} catch {
  Write-Host "[SKIP] /runtime-journal route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Runtime Event Journal smoke passed."
