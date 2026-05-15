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
Write-Host "=== CodexForge Step Runner Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\step-runner-preview"
$componentDir = Join-Path $domainDir "components"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "step-runner-preview-types.ts",
  "step-runner-input.ts",
  "step-runner-policy.ts",
  "step-runner-tool-plan.ts",
  "step-runner-approval-packet.ts",
  "step-runner-dry-run.ts",
  "step-runner-result-preview.ts",
  "step-runner-ledger.ts",
  "step-runner-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "StepRunnerPreviewPanel.tsx",
  "StepRunnerInputPanel.tsx",
  "StepRunnerPolicyPanel.tsx",
  "StepRunnerToolPlanPanel.tsx",
  "StepRunnerApprovalPacketPanel.tsx",
  "StepRunnerDryRunPanel.tsx",
  "StepRunnerResultPreviewPanel.tsx",
  "StepRunnerLedgerPanel.tsx",
  "StepRunnerSafetyNotice.tsx",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$tasksSource = Get-Content -Raw $tasksClientPath
$aiPageSource = Get-Content -Raw $aiPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$stepSource = $domainSource + "`n" + $uiSource + "`n" + $tasksSource
$allSource = $stepSource + "`n" + $aiPageSource + "`n" + $missionSource

foreach ($export in @(
  "buildStepRunnerInput",
  "validateStepRunnerInput",
  "buildStepRunnerPolicy",
  "isStepRunnerPreviewAllowed",
  "isStepRunBlocked",
  "buildStepRunnerToolPlan",
  "classifyStepRunnerTool",
  "buildStepRunnerApprovalPacket",
  "validateStepRunnerApprovalPacket",
  "buildStepRunnerDryRunPlan",
  "buildStepRunnerResultPreview",
  "buildStepRunnerLedger"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "StepRunnerPreviewPanel renders",
  "StepRunnerToolPlanPanel renders",
  "StepRunnerApprovalPacketPanel renders",
  "StepRunnerDryRunPanel renders",
  "StepRunnerResultPreviewPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "StepRunnerPreviewPanel" "/tasks imports/renders StepRunnerPreviewPanel"

foreach ($text in @(
  "No step execution in Phase 25",
  "Future run requires approval",
  "no file mutation",
  "dry run plan",
  "approval packet"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "broker-execution is always blocked" "policy blocks broker-execution"
foreach ($tool in @("write-file", "apply-diff", "run-command", "run-tests", "build-web-app")) {
  Assert-Contains $domainSource $tool "policy requires approval for $tool"
}
foreach ($tool in @("read-file", "list-files", "search-project")) {
  Assert-Contains $domainSource $tool "tool plan marks $tool read-only"
}

Assert-Contains $domainSource "No-run guarantee" "approval packet includes no-run guarantee"
Assert-Contains $domainSource "stop conditions" "dry run plan includes stop conditions"
Assert-Contains $domainSource "preview-only expected output" "result preview says preview-only or expected output"
Assert-Contains $aiPageSource "Step Runner Preview" "AI page references Step Runner Preview or /tasks"
Assert-Contains $missionSource "Step Runner Preview" "Mission Control references Step Runner Preview"

Assert-NotMatches $stepSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $stepSource 'from\s+["''][^"'']*write-file["'']' "no write-file execution/import from UI"
Assert-NotMatches $stepSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff execution/import from UI"
Assert-NotMatches $stepSource 'from\s+["''][^"'']*run-command["'']' "no run-command execution/import from UI"
Assert-NotMatches $stepSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $stepSource "Math.random" "no Math.random"
Assert-NotContains $stepSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $stepSource "d3-force" "no d3-force"
Assert-NotContains $stepSource "fetch(" "no external network dependency"
Assert-NotMatches $stepSource "https?://" "no external network dependency URL"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $stepSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic step-runner-preview files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $stepSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildStepRunnerPreviewStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-step-runner-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Step Runner Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Step Runner Preview" "managed smoke suite includes Step Runner Preview exactly once"

Write-Host "[OK] CodexForge Step Runner Preview smoke passed."
