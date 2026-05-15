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
Write-Host "=== CodexForge Patch Preview Queue smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\patch-preview-queue"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$memoryPagePath = "src\app\memory\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "patch-preview-queue-types.ts",
  "queue-item-builder.ts",
  "queue-policy.ts",
  "queue-priority.ts",
  "queue-readiness.ts",
  "queue-ledger.ts",
  "queue-handoff.ts",
  "queue-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "PatchPreviewQueuePanel.tsx",
  "PatchPreviewQueueBoard.tsx",
  "PatchPreviewQueueItemCard.tsx",
  "PatchPreviewQueuePolicyPanel.tsx",
  "PatchPreviewQueueReadinessPanel.tsx",
  "PatchPreviewQueueLedgerPanel.tsx",
  "PatchPreviewQueueHandoffPanel.tsx",
  "PatchPreviewQueueSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$queueSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$memorySource = Get-Content -Raw $memoryPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $queueSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $memorySource + "`n" + $missionSource

foreach ($export in @(
  "buildPatchPreviewQueueItem",
  "buildPatchPreviewQueueItems",
  "buildPatchPreviewQueuePolicy",
  "isPatchPreviewQueueAllowed",
  "scorePatchPreviewQueuePriority",
  "rankPatchPreviewQueueItems",
  "buildPatchPreviewQueueReadiness",
  "buildPatchPreviewQueueLedger",
  "buildPatchPreviewQueueHandoff",
  "buildPatchPreviewQueuePrompt",
  "buildPatchPreviewQueuePatchInput",
  "buildPatchPreviewQueueSummary"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "PatchPreviewQueuePanel renders",
  "PatchPreviewQueueBoard renders",
  "PatchPreviewQueueItemCard renders",
  "PatchPreviewQueuePolicyPanel renders",
  "PatchPreviewQueueReadinessPanel renders",
  "PatchPreviewQueueHandoffPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $aiSource "PatchPreviewQueuePanel" "/ai imports/renders PatchPreviewQueuePanel if integrated"
Assert-Contains $filesSource "Patch Preview Queue" "/files references Patch Preview Queue if integrated"
Assert-Contains $tasksSource "Patch Preview Queue" "/tasks references Patch Preview Queue if integrated"
Assert-Contains $memorySource "Patch Preview Queue" "/memory references Patch Preview Queue if integrated"
Assert-Contains $missionSource "Patch Preview Queue readiness" "Mission Control includes Patch Preview Queue readiness"
Assert-Contains $missionSource "Review queued patch preview" "Mission Control next action: Review queued patch preview"

foreach ($text in @(
  "Safe Patch Preview",
  "preview diff only",
  "evidence is context, not proof",
  "verify current files",
  "no file writes without approval",
  "no command execution without approval",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "applyBlocked: true" "policy blocks apply"
Assert-Contains $domainSource "mutationBlocked: true" "policy blocks mutation"
Assert-Contains $domainSource "reviewedFixRecommendationRequired: true" "policy requires reviewed fix recommendation"
Assert-Contains $domainSource "targetFileRequired: true" "policy requires target file"
Assert-Matches $domainSource "investigation-needed|blocked" "policy marks low confidence as investigation-needed or blocked"
Assert-Contains $domainSource "current-file-verification-required" "readiness includes current file verification"
Assert-Contains $domainSource "suggested-tests-available" "readiness includes suggested tests"
Assert-Contains $domainSource "rollback-note-available" "readiness includes rollback note"
Assert-Contains $domainSource "Inspect first" "handoff says inspect first"
Assert-Contains $domainSource "Produce preview diff only" "handoff says produce preview diff only"
Assert-Contains $domainSource "priorityScore" "priority ranking is deterministic"
Assert-Contains $domainSource "buildPatchPreviewQueueStableKey" "stable key helper or stable key patterns exist"

Assert-NotMatches $queueSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $queueSource 'from\s+["''][^"'']*write-file["'']' "no write-file import"
Assert-NotMatches $queueSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $queueSource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $queueSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $queueSource "Math.random" "no Math.random"
Assert-NotContains $queueSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $queueSource "d3-force" "no d3-force"
Assert-NotMatches $queueSource "https?://" "no external network dependency"
Assert-NotContains $queueSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $queueSource "axios" "no external network library dependency"
Assert-NotMatches $queueSource "fetch\s*\(" "no fetch dependency in deterministic patch-preview-queue files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $queueSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $queueSource $marker "no OpenAI/API-key dependency in deterministic patch-preview-queue files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-patch-preview-queue\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Patch Preview Queue exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Patch Preview Queue" "managed smoke suite includes Patch Preview Queue exactly once"

Write-Host "[OK] CodexForge Patch Preview Queue smoke passed."
