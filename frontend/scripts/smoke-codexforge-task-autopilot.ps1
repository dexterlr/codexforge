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
Write-Host "=== CodexForge Task Autopilot smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\task-autopilot"
$componentDir = Join-Path $domainDir "components"
$tasksPagePath = "src\app\tasks\page.tsx"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$brainPagePath = "src\app\brain\page-client.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$filesCommandPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "task-autopilot-types.ts",
  "task-signal-extractor.ts",
  "task-suggestion-engine.ts",
  "task-priority-ranker.ts",
  "task-risk-policy.ts",
  "task-plan-preview.ts",
  "task-review-queue.ts",
  "task-handoff.ts",
  "task-autopilot-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "TaskAutopilotPanel.tsx",
  "TaskSignalPanel.tsx",
  "TaskSuggestionQueue.tsx",
  "TaskSuggestionCard.tsx",
  "TaskPriorityPanel.tsx",
  "TaskRiskPolicyPanel.tsx",
  "TaskPlanPreviewPanel.tsx",
  "TaskReviewActionsPanel.tsx",
  "TaskHandoffPanel.tsx",
  "TaskAutopilotSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $tasksPagePath
Assert-FileExists $tasksClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$tasksPageSource = (Get-Content -Raw $tasksPagePath) + "`n" + (Get-Content -Raw $tasksClientPath)
$aiPageSource = Get-Content -Raw $aiPagePath
$brainPageSource = Get-Content -Raw $brainPagePath
$filesSource = (Get-Content -Raw $filesPagePath) + "`n" + (Get-Content -Raw $filesCommandPath)
$allSmoke = Get-Content -Raw $allSmokePath
$taskSource = $domainSource + "`n" + $uiSource + "`n" + $tasksPageSource
$allSource = $taskSource + "`n" + $aiPageSource + "`n" + $brainPageSource + "`n" + $filesSource

foreach ($export in @(
  "buildTaskSignals",
  "buildTaskSuggestions",
  "rankTaskSuggestions",
  "buildTaskAutopilotRiskPolicy",
  "buildTaskPlanPreview",
  "buildTaskReviewQueue",
  "buildTaskHandoff"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "TaskAutopilotPanel",
  "TaskSuggestionQueue",
  "TaskPlanPreviewPanel",
  "TaskRiskPolicyPanel",
  "TaskHandoffPanel"
)) {
  Assert-Contains $uiSource $render "$render renders"
}

foreach ($text in @(
  "review required",
  "no auto-run",
  "No file mutation without preview",
  "Inspect first",
  "memory as context, not proof"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "autoRunAllowed: false" "policy blocks auto-run"
Assert-Contains $domainSource "directGraphMutationAllowed: false" "policy blocks direct graph mutation"
Assert-Contains $domainSource "Patch tasks route to Safe Patch Preview" "policy routes patch tasks to Safe Patch Preview"
Assert-Contains $domainSource "Memory tasks route to Memory Review" "policy routes memory tasks to Memory Review"
Assert-Contains $domainSource "Verify current files" "handoff says verify current files"
Assert-Contains $domainSource "No command execution without approval" "handoff says no command execution without approval"
Assert-Contains $aiPageSource "Task Autopilot" "AI page references Task Autopilot"
Assert-Contains $brainPageSource "Task Autopilot" "Brain page references Task Autopilot"
Assert-Contains $filesSource "task suggestions" "Files page references task suggestions"

Assert-NotMatches $taskSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotContains $taskSource "write-file" "no write-file import"
Assert-NotMatches $taskSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $taskSource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $taskSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $taskSource "Math.random" "no Math.random"
Assert-NotContains $taskSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $taskSource "d3-force" "no d3-force"
Assert-NotMatches $taskSource "https?://" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $taskSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey")) {
  Assert-NotContains $taskSource $marker "no OpenAI/API-key dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $taskSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildTaskAutopilotStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-task-autopilot\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Task Autopilot exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Task Autopilot" "managed smoke suite includes Task Autopilot exactly once"

Write-Host "[OK] CodexForge Task Autopilot smoke passed."
