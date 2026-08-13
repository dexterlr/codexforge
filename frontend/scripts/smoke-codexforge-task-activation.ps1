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
Write-Host "=== CodexForge Reviewed Task Activation smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\task-activation"
$componentDir = Join-Path $domainDir "components"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "task-activation-types.ts",
  "task-activation-request.ts",
  "task-activation-policy.ts",
  "task-activation-plan.ts",
  "task-activation-reducer.ts",
  "task-activation-ledger.ts",
  "task-activation-handoff.ts",
  "task-activation-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "TaskActivationPanel.tsx",
  "TaskActivationRequestPanel.tsx",
  "TaskActivationPolicyPanel.tsx",
  "TaskActivationPlanPreview.tsx",
  "TaskActivationReviewActions.tsx",
  "TaskActivationLedgerPanel.tsx",
  "TaskActivationHandoffPanel.tsx",
  "TaskActivationSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$tasksSource = Get-Content -Raw $tasksClientPath
$aiPageSource = Get-Content -Raw $aiPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$taskSource = $domainSource + "`n" + $uiSource + "`n" + $tasksSource
$allSource = $taskSource + "`n" + $aiPageSource + "`n" + $missionSource

foreach ($export in @(
  "buildTaskActivationRequest",
  "validateTaskActivationRequest",
  "buildTaskActivationPolicy",
  "isTaskActivationAllowed",
  "buildActivatedTaskPlan",
  "reduceTaskActivationState",
  "buildTaskActivationLedger",
  "buildTaskActivationHandoff"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "TaskActivationPanel renders",
  "TaskActivationPlanPreview",
  "TaskActivationPolicyPanel",
  "TaskActivationHandoffPanel"
)) {
  Assert-Contains $uiSource $render "$render renders"
}

Assert-Contains $tasksSource "<TaskActivationPanel embedded />" "/tasks embeds Task Activation beneath its single page heading"

foreach ($text in @(
  "explicit review approval required",
  "no auto-run",
  "No file mutation without Safe Patch Preview",
  "use memory as context, not proof",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "Empty task steps block activation" "policy blocks empty steps"
Assert-Contains $domainSource "Blocked suggestions cannot activate" "policy blocks blocked suggestions"
Assert-Contains $domainSource "Patch/fix tasks must route through Safe Patch Preview" "policy routes patch tasks to Safe Patch Preview"
Assert-Contains $domainSource "inspect first" "handoff says inspect first"
Assert-Contains $domainSource "verify current files" "handoff says verify current files"
Assert-Contains $domainSource "no command execution without approval" "handoff says no command execution without approval"
Assert-Contains $aiPageSource 'redirect("/jarvis")' "retired AI route redirects to canonical Jarvis"
Assert-Contains $domainSource 'targetHref: "/jarvis"' "task activation handoff targets canonical Jarvis"
Assert-NotContains $domainSource 'targetHref: "/ai"' "task activation handoff does not target retired AI route"
Assert-Contains $missionSource "Reviewed Task Activation" "Mission Control references Reviewed Task Activation"

Assert-NotMatches $taskSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $taskSource 'from\s+["''][^"'']*write-file["'']' "no write-file import"
Assert-NotMatches $taskSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $taskSource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $taskSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $taskSource "Math.random" "no Math.random"
Assert-NotContains $taskSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $taskSource "d3-force" "no d3-force"
Assert-NotContains $taskSource "fetch(" "no external network dependency"
Assert-NotMatches $taskSource "https?://" "no external network dependency URL"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $taskSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $taskSource $marker "no OpenAI/API-key dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $taskSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildTaskActivationStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-task-activation\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Reviewed Task Activation exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Reviewed Task Activation" "managed smoke suite includes Reviewed Task Activation exactly once"

Write-Host "[OK] CodexForge Reviewed Task Activation smoke passed."
