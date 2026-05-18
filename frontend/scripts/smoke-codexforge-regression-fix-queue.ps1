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

function Assert-Matches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -notmatch $Pattern) { throw "[FAIL] Missing $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Regression Fix Queue smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\regression-fix-queue"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
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
  "regression-fix-queue-types.ts",
  "fix-queue-item-builder.ts",
  "fix-queue-policy.ts",
  "fix-queue-priority.ts",
  "fix-queue-readiness.ts",
  "fix-queue-router.ts",
  "fix-queue-handoff.ts",
  "fix-queue-ledger.ts",
  "fix-queue-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "RegressionFixQueuePanel.tsx",
  "RegressionFixQueueBoard.tsx",
  "RegressionFixQueueItemCard.tsx",
  "RegressionFixQueuePolicyPanel.tsx",
  "RegressionFixQueueReadinessPanel.tsx",
  "RegressionFixQueueRouterPanel.tsx",
  "RegressionFixQueueHandoffPanel.tsx",
  "RegressionFixQueueLedgerPanel.tsx",
  "RegressionFixQueueSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$queueSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$memorySource = Get-Content -Raw $memoryPagePath
$brainSource = Get-Content -Raw $brainPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $queueSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $memorySource + "`n" + $brainSource + "`n" + $missionSource

foreach ($export in @(
  "buildRegressionFixQueueItem",
  "buildRegressionFixQueueItems",
  "buildRegressionFixQueuePolicy",
  "isRegressionFixQueueAllowed",
  "scoreRegressionFixQueuePriority",
  "rankRegressionFixQueueItems",
  "buildRegressionFixQueueReadiness",
  "routeRegressionFixQueueItem",
  "buildRegressionFixQueueRoute",
  "buildRegressionFixQueueHandoff",
  "buildRegressionFixQueuePrompt",
  "buildRegressionFixQueuePatchPreviewInput",
  "buildRegressionFixQueueDiffComposerInput",
  "buildRegressionFixQueueLedger",
  "buildRegressionFixQueueSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "RegressionFixQueuePanel renders",
  "RegressionFixQueueBoard renders",
  "RegressionFixQueueItemCard renders",
  "RegressionFixQueuePolicyPanel renders",
  "RegressionFixQueueReadinessPanel renders",
  "RegressionFixQueueRouterPanel renders",
  "RegressionFixQueueHandoffPanel renders",
  "RegressionFixQueueLedgerPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $aiSource "RegressionFixQueuePanel" "/ai imports/renders RegressionFixQueuePanel if integrated"
Assert-Contains $filesSource "Regression Fix Queue" "/files references Regression Fix Queue if integrated"
Assert-Contains $tasksSource "Regression Fix Queue" "/tasks references Regression Fix Queue if integrated"
Assert-Contains $memorySource "Regression Fix Queue" "/memory references Regression Fix Queue if integrated"
Assert-Contains $brainSource "Regression Fix Queue waits for review before Brain merge" "/brain references regression fix queue review if integrated"
Assert-Contains $missionSource "Regression Fix Queue readiness" "Mission Control includes Regression Fix Queue readiness"
Assert-Contains $missionSource "Review regression fix queue" "Mission Control next action: Review regression fix queue"

foreach ($text in @(
  "no auto-fix",
  "no auto-rollback",
  "Safe Patch Preview",
  "Preview Diff Composer",
  "evidence is context, not proof",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "applyDiffBlocked: true" "policy blocks apply-diff"
Assert-Contains $domainSource "writeFileBlocked: true" "policy blocks write-file"
Assert-Contains $domainSource "runCommandBlocked: true" "policy blocks run-command"
Assert-Contains $domainSource "brokerExecutionBlocked: true" "policy blocks broker-execution"
Assert-Contains $domainSource "safePatchPreviewRequiredBeforeEdits: true" "policy requires Safe Patch Preview before edits"
Assert-Contains $domainSource "previewDiffComposerRequiredBeforePatchPackage: true" "policy requires Preview Diff Composer before patch package"
Assert-Contains $domainSource "rankRegressionFixQueueItems" "priority ranking is deterministic"
Assert-Contains $domainSource "id.localeCompare" "priority ranking tie-breaks by queue item id"
Assert-Contains $domainSource "rollback-advice-attached" "readiness includes rollback advice"
Assert-Contains $domainSource "suggested-smoke-scripts-attached" "readiness includes suggested smoke scripts"
Assert-Contains $domainSource '"Safe Patch Preview"' "router can route to Safe Patch Preview"
Assert-Contains $domainSource '"Preview Diff Composer"' "router can route to Preview Diff Composer"
Assert-Contains $domainSource '"Manual Investigation"' "router can route to Manual Investigation"
Assert-Contains $domainSource "Produce preview diff only" "handoff says preview diff only"
Assert-Contains $domainSource "No file writes without approval" "handoff says no file writes without approval"
Assert-Contains $domainSource "No command execution without approval" "handoff says no command execution without approval"
Assert-Contains $domainSource '"regression-detected"' "ledger includes regression-detected"
Assert-Contains $domainSource '"handoff-built"' "ledger includes handoff-built"

Assert-NotMatches $queueSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $queueSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $queueSource "Math.random" "no Math.random"
Assert-NotContains $queueSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $queueSource "d3-force" "no d3-force"
Assert-NotMatches $queueSource "https?://" "no external network dependency"
Assert-NotContains $queueSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $queueSource "axios" "no external network library dependency"
Assert-NotMatches $queueSource "fetch\s*\(" "no fetch dependency in deterministic regression-fix-queue files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $queueSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $queueSource $marker "no OpenAI/API-key dependency in deterministic regression-fix-queue files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildRegressionFixQueueStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-regression-fix-queue\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Regression Fix Queue exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Regression Fix Queue" "managed smoke suite includes Regression Fix Queue exactly once"

Write-Host "[OK] CodexForge Regression Fix Queue smoke passed."
