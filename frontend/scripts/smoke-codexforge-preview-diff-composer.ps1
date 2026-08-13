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
Write-Host "=== CodexForge Preview Diff Composer smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\preview-diff-composer"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "preview-diff-composer-types.ts",
  "diff-composition-input.ts",
  "diff-intent-model.ts",
  "pseudo-diff-builder.ts",
  "diff-change-plan.ts",
  "diff-verification-plan.ts",
  "diff-rollback-plan.ts",
  "diff-approval-boundary.ts",
  "diff-composer-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "PreviewDiffComposerPanel.tsx",
  "DiffCompositionInputPanel.tsx",
  "DiffIntentPanel.tsx",
  "PseudoDiffPreviewPanel.tsx",
  "DiffChangePlanPanel.tsx",
  "DiffVerificationPlanPanel.tsx",
  "DiffRollbackPlanPanel.tsx",
  "DiffApprovalBoundaryPanel.tsx",
  "PreviewDiffComposerSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$composerSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $composerSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $missionSource

foreach ($export in @(
  "buildDiffCompositionInput",
  "validateDiffCompositionInput",
  "buildDiffIntentModel",
  "buildDiffIntentChange",
  "buildPseudoDiffPreview",
  "buildPseudoDiffFile",
  "buildPseudoDiffHunk",
  "buildDiffChangePlan",
  "buildDiffVerificationPlan",
  "selectDiffVerificationChecks",
  "buildDiffRollbackPlan",
  "buildDiffApprovalBoundary",
  "isPreviewDiffApplyBlocked",
  "buildPreviewDiffComposerSummary"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "PreviewDiffComposerPanel renders",
  "DiffCompositionInputPanel renders",
  "DiffIntentPanel renders",
  "PseudoDiffPreviewPanel renders",
  "DiffChangePlanPanel renders",
  "DiffVerificationPlanPanel renders",
  "DiffRollbackPlanPanel renders",
  "DiffApprovalBoundaryPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "<PreviewDiffComposerPanel compact />" "/tasks imports/renders PreviewDiffComposerPanel"
Assert-Contains $aiSource 'redirect("/jarvis")' "/ai redirects to canonical Jarvis"
Assert-NotContains $aiSource "PreviewDiffComposerPanel" "/ai mounts no competing Preview Diff Composer panel"
Assert-Contains $filesSource "Preview Diff Composer" "/files references Preview Diff Composer if integrated"
Assert-Contains $tasksSource "Preview Diff Composer" "/tasks references Preview Diff Composer if integrated"
Assert-Contains $missionSource "Preview Diff Composer readiness" "Mission Control includes Preview Diff Composer readiness"
Assert-Contains $missionSource "Compose preview diff" "Mission Control next action: Compose preview diff"

foreach ($text in @(
  "preview-only",
  "not an applyable patch",
  "current file content is authority",
  "evidence is context, not proof",
  "no file writes without approval",
  "Safe Patch Preview",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "previewOnly: true" "pseudo diff builder marks output as preview-only"
Assert-Contains $domainSource "No exact source lines are invented by this pseudo diff." "pseudo diff builder avoids fake exact source edits unless supplied"
Assert-Contains $domainSource "npm run build" "verification plan suggests npm run build"
Assert-Contains $domainSource "git diff --check" "verification plan suggests git diff --check"
Assert-Contains $domainSource "applyBlocked: true" "approval boundary blocks apply"
Assert-Contains $domainSource "writeBlocked: true" "approval boundary blocks write"
Assert-Contains $domainSource "commandExecutionBlocked: true" "approval boundary blocks command execution"
Assert-Contains $domainSource "git restore" "rollback plan mentions git restore"
Assert-Contains $domainSource "git revert" "rollback plan mentions git revert"
Assert-Contains $domainSource "buildPreviewDiffComposerStableKey" "stable key helper or stable key patterns exist"

Assert-NotMatches $composerSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $composerSource 'from\s+["''][^"'']*write-file["'']' "no write-file import"
Assert-NotMatches $composerSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $composerSource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $composerSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $composerSource "Math.random" "no Math.random"
Assert-NotContains $composerSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $composerSource "d3-force" "no d3-force"
Assert-NotMatches $composerSource "https?://" "no external network dependency"
Assert-NotContains $composerSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $composerSource "axios" "no external network library dependency"
Assert-NotMatches $composerSource "fetch\s*\(" "no fetch dependency in deterministic preview-diff-composer files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $composerSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $composerSource $marker "no OpenAI/API-key dependency in deterministic preview-diff-composer files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-preview-diff-composer\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Preview Diff Composer exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Preview Diff Composer" "managed smoke suite includes Preview Diff Composer exactly once"

Write-Host "[OK] CodexForge Preview Diff Composer smoke passed."
