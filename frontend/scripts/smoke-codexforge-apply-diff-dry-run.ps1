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
Write-Host "=== CodexForge Apply-Diff Dry Run smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\apply-diff-dry-run"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "apply-dry-run-types.ts",
  "dry-run-input.ts",
  "dry-run-policy.ts",
  "dry-run-simulator.ts",
  "dry-run-file-impact.ts",
  "dry-run-conflict-check.ts",
  "dry-run-result.ts",
  "dry-run-ledger.ts",
  "dry-run-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ApplyDiffDryRunPanel.tsx",
  "DryRunInputPanel.tsx",
  "DryRunPolicyPanel.tsx",
  "DryRunSimulatorPanel.tsx",
  "DryRunFileImpactPanel.tsx",
  "DryRunConflictCheckPanel.tsx",
  "DryRunResultPanel.tsx",
  "DryRunLedgerPanel.tsx",
  "ApplyDiffDryRunSafetyNotice.tsx",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$dryRunSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $dryRunSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $missionSource

foreach ($export in @(
  "buildApplyDiffDryRunInput",
  "validateApplyDiffDryRunInput",
  "buildApplyDiffDryRunPolicy",
  "isApplyDiffDryRunAllowed",
  "simulateApplyDiffDryRun",
  "simulateApplyDiffFileOperation",
  "buildApplyDryRunFileImpact",
  "buildApplyDryRunConflictCheck",
  "buildApplyDryRunResult",
  "normalizeApplyDryRunResult",
  "buildApplyDryRunLedger",
  "buildApplyDiffDryRunSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "ApplyDiffDryRunPanel renders",
  "DryRunPolicyPanel renders",
  "DryRunSimulatorPanel renders",
  "DryRunFileImpactPanel renders",
  "DryRunConflictCheckPanel renders",
  "DryRunResultPanel renders",
  "DryRunLedgerPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $aiSource "ApplyDiffDryRunPanel" "/ai imports/renders ApplyDiffDryRunPanel if integrated"
Assert-Contains $filesSource "Apply-Diff Dry Run" "/files references Apply-Diff Dry Run if integrated"
Assert-Contains $filesSource "Simulate apply-diff dry run" "/files references Simulate apply-diff dry run if integrated"
Assert-Contains $tasksSource "Apply-Diff Dry Run" "/tasks references Apply-Diff Dry Run if integrated"
Assert-Contains $missionSource "Apply-Diff Dry Run readiness" "Mission Control includes Apply-Diff Dry Run readiness"
Assert-Contains $missionSource "Review dry-run result" "Mission Control next action: Review dry-run result"

foreach ($text in @(
  "simulation only",
  "no mutation",
  "actual apply-diff remains blocked",
  "pseudo diff alone is not applyable",
  "current file verification required",
  "rollback plan required",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "realApplyDiffCallBlocked: true" "policy blocks real apply-diff"
Assert-Contains $domainSource "writeFileBlocked: true" "policy blocks write-file"
Assert-Contains $domainSource "runCommandBlocked: true" "policy blocks run-command"
Assert-Contains $domainSource "brokerExecutionBlocked: true" "policy blocks broker-execution"
Assert-Contains $domainSource "Explicit approval packet required." "policy requires explicit approval packet"
Assert-Contains $domainSource "Rollback plan required." "policy requires rollback plan"
Assert-Contains $domainSource "Verification plan required." "policy requires verification plan"
Assert-Contains $domainSource "Simulator refuses pseudo-only patch for real apply." "simulator refuses pseudo-only patch for real apply"
Assert-Contains $domainSource "ready-for-real-patch-review" "simulator reports ready-for-real-patch-review"
Assert-Contains $domainSource '"missing-real-patch"' "conflict check includes missing real patch"
Assert-Contains $domainSource '"stale-evidence"' "conflict check includes stale evidence"
Assert-Contains $domainSource '"blocked"' "result supports blocked"
Assert-Contains $domainSource '"dry-run-complete"' "result supports dry-run-complete"
Assert-Contains $domainSource '"policy-checked"' "ledger includes policy-checked"
Assert-Contains $domainSource '"dry-run-complete"' "ledger includes dry-run-complete"
Assert-Contains $domainSource "buildApplyDiffDryRunStableKey" "stable key helper or stable key patterns exist"

Assert-NotMatches $dryRunSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $dryRunSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $dryRunSource "Math.random" "no Math.random"
Assert-NotContains $dryRunSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $dryRunSource "d3-force" "no d3-force"
Assert-NotMatches $dryRunSource "https?://" "no external network dependency"
Assert-NotContains $dryRunSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $dryRunSource "axios" "no external network library dependency"
Assert-NotMatches $dryRunSource "fetch\s*\(" "no fetch dependency in deterministic apply-diff-dry-run files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $dryRunSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $dryRunSource $marker "no OpenAI/API-key dependency in deterministic apply-diff-dry-run files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-apply-diff-dry-run\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Apply-Diff Dry Run exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Apply-Diff Dry Run" "managed smoke suite includes Apply-Diff Dry Run exactly once"

Write-Host "[OK] CodexForge Apply-Diff Dry Run smoke passed."
