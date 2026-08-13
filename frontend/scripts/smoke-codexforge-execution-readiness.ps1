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
Write-Host "=== CodexForge Execution Readiness smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\execution-readiness"
$componentDir = Join-Path $domainDir "components"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "execution-readiness-types.ts",
  "execution-readiness-input.ts",
  "execution-readiness-policy.ts",
  "execution-step-preflight.ts",
  "execution-tool-readiness.ts",
  "execution-risk-readiness.ts",
  "execution-test-readiness.ts",
  "execution-approval-readiness.ts",
  "execution-readiness-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ExecutionReadinessPanel.tsx",
  "ExecutionReadinessInputPanel.tsx",
  "ExecutionStepPreflightPanel.tsx",
  "ExecutionToolReadinessPanel.tsx",
  "ExecutionRiskReadinessPanel.tsx",
  "ExecutionTestReadinessPanel.tsx",
  "ExecutionApprovalReadinessPanel.tsx",
  "ExecutionReadinessSummaryPanel.tsx",
  "ExecutionReadinessSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$tasksSource = Get-Content -Raw $tasksClientPath
$aiPageSource = Get-Content -Raw $aiPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$readinessSource = $domainSource + "`n" + $uiSource + "`n" + $tasksSource
$allSource = $readinessSource + "`n" + $aiPageSource + "`n" + $missionSource

foreach ($export in @(
  "buildExecutionReadinessInput",
  "validateExecutionReadinessInput",
  "buildExecutionReadinessPolicy",
  "isExecutionReadinessAllowed",
  "buildExecutionStepPreflight",
  "buildExecutionToolReadiness",
  "buildExecutionRiskReadiness",
  "buildExecutionTestReadiness",
  "buildExecutionApprovalReadiness"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "ExecutionReadinessPanel renders",
  "ExecutionStepPreflightPanel renders",
  "ExecutionToolReadinessPanel renders",
  "ExecutionRiskReadinessPanel renders",
  "ExecutionTestReadinessPanel renders",
  "ExecutionApprovalReadinessPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "ExecutionReadinessPanel" "/tasks imports/renders ExecutionReadinessPanel"

foreach ($text in @(
  "execution blocked until approval",
  "no auto-run",
  "Safe Patch Preview",
  "command execution requires approval",
  "file mutation requires approval"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "broker-execution is blocked by policy" "policy blocks broker-execution"
Assert-Contains $domainSource "write-file" "policy requires approval for write-file"
Assert-Contains $domainSource "apply-diff" "policy requires approval for apply-diff"
Assert-Contains $domainSource "run-command" "policy requires approval for run-command"
Assert-Contains $domainSource "read-file" "tool readiness marks read-file read-only"
Assert-Contains $domainSource "list-files" "tool readiness marks list-files read-only"
Assert-Contains $domainSource "search-project" "tool readiness marks search-project read-only"
Assert-Contains $domainSource "npm run build" "test readiness suggests npm run build"
Assert-Contains $domainSource "git diff --check" "test readiness suggests git diff --check"
Assert-Contains $domainSource "ready-for-future-execution-approval" "approval readiness includes ready-for-future-execution-approval"
Assert-Contains $tasksSource "<ExecutionReadinessPanel embedded />" "/tasks embeds Execution Readiness beneath its single page heading"
Assert-Contains $aiPageSource 'redirect("/jarvis")' "/ai redirects to canonical Jarvis"
Assert-NotContains $aiPageSource "ExecutionReadinessPanel" "/ai mounts no competing Execution Readiness panel"
Assert-Contains $missionSource "Execution Readiness" "Mission Control references Execution Readiness"

Assert-NotMatches $readinessSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $readinessSource 'from\s+["''][^"'']*write-file["'']' "no write-file execution/import from UI"
Assert-NotMatches $readinessSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff execution/import from UI"
Assert-NotMatches $readinessSource 'from\s+["''][^"'']*run-command["'']' "no run-command execution/import from UI"
Assert-NotMatches $readinessSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $readinessSource "Math.random" "no Math.random"
Assert-NotContains $readinessSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $readinessSource "d3-force" "no d3-force"
Assert-NotContains $readinessSource "fetch(" "no external network dependency"
Assert-NotMatches $readinessSource "https?://" "no external network dependency URL"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $readinessSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $readinessSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildExecutionReadinessStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-execution-readiness\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Execution Readiness exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Execution Readiness" "managed smoke suite includes Execution Readiness exactly once"

Write-Host "[OK] CodexForge Execution Readiness smoke passed."
