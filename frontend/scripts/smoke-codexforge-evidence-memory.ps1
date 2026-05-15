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
Write-Host "=== CodexForge Evidence Memory smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\evidence-memory"
$componentDir = Join-Path $domainDir "components"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$memoryClientPath = "src\app\memory\page-client.tsx"
$brainClientPath = "src\app\brain\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "evidence-memory-types.ts",
  "evidence-normalizer.ts",
  "evidence-memory-candidate.ts",
  "evidence-confidence.ts",
  "evidence-source-trace.ts",
  "evidence-review-policy.ts",
  "evidence-brain-merge.ts",
  "evidence-memory-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "EvidenceMemoryPanel.tsx",
  "EvidenceSummaryPanel.tsx",
  "EvidenceMemoryCandidatePanel.tsx",
  "EvidenceConfidencePanel.tsx",
  "EvidenceSourceTracePanel.tsx",
  "EvidenceReviewPolicyPanel.tsx",
  "EvidenceBrainMergePanel.tsx",
  "EvidenceMemorySafetyNotice.tsx",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$tasksSource = Get-Content -Raw $tasksClientPath
$memorySource = Get-Content -Raw $memoryClientPath
$brainSource = Get-Content -Raw $brainClientPath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$evidenceMemorySource = $domainSource + "`n" + $uiSource
$allSource = $evidenceMemorySource + "`n" + $tasksSource + "`n" + $memorySource + "`n" + $brainSource + "`n" + $missionSource

foreach ($export in @(
  "normalizeReadOnlyExecutionEvidence",
  "normalizeEvidenceItem",
  "summarizeNormalizedEvidence",
  "buildEvidenceMemoryCandidates",
  "buildEvidenceMemoryCandidate",
  "scoreEvidenceConfidence",
  "scoreEvidenceImportance",
  "explainEvidenceConfidence",
  "buildEvidenceSourceTrace",
  "buildEvidenceSourceTraceItem",
  "buildEvidenceMemoryReviewPolicy",
  "isEvidenceMemoryPromotionAllowed",
  "buildEvidenceBrainMergeCandidate",
  "buildEvidenceBrainMergeEventPreview",
  "buildEvidenceMemorySummary",
  "summarizeEvidenceLearningSession"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "EvidenceMemoryPanel renders",
  "EvidenceSummaryPanel renders",
  "EvidenceMemoryCandidatePanel renders",
  "EvidenceConfidencePanel renders",
  "EvidenceSourceTracePanel renders",
  "EvidenceReviewPolicyPanel renders",
  "EvidenceBrainMergePanel renders",
  "EvidenceMemorySafetyNotice renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "EvidenceMemoryPanel" "/tasks imports/renders EvidenceMemoryPanel"
Assert-Contains $memorySource "EvidenceMemoryPanel" "/memory references Evidence Memory or execution evidence review"
Assert-Contains $brainSource "Evidence Memory" "/brain references Evidence Memory or Brain merge review"
Assert-Contains $missionSource "Review read-only evidence memory" "Mission Control references Evidence to Memory next action"

foreach ($text in @(
  "Review required before memory promotion",
  "no graph mutation",
  "memory is context, not authority",
  "Brain merge review required"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "autoPromotionAllowed: false" "policy blocks automatic memory promotion"
Assert-Contains $domainSource "userReviewRequired: true" "policy requires user review"
Assert-Contains $domainSource "brainMergeReviewRequired: true" "policy requires Brain merge review"
Assert-Contains $domainSource "previewOnly: true" "Brain merge candidate is preview-only"
Assert-Contains $domainSource "Preview only; Brain merge review required" "Brain merge candidate preview-only boundary"
Assert-Contains $uiSource "source trace connects task step execution evidence memory" "source trace connects task/step/execution/evidence/memory"
Assert-Contains $domainSource "buildEvidenceMemoryStableKey" "stable key helper or stable key patterns exist"

Assert-NotMatches $evidenceMemorySource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $evidenceMemorySource 'from\s+["''][^"'']*write-file["'']' "no write-file import"
Assert-NotMatches $evidenceMemorySource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $evidenceMemorySource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $evidenceMemorySource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $evidenceMemorySource "Math.random" "no Math.random"
Assert-NotContains $evidenceMemorySource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $evidenceMemorySource "d3-force" "no d3-force"
Assert-NotMatches $evidenceMemorySource "https?://" "no external network dependency"
Assert-NotContains $evidenceMemorySource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $evidenceMemorySource "axios" "no external network library dependency"
Assert-NotMatches $evidenceMemorySource "fetch\s*\(" "no fetch dependency in evidence-memory files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $evidenceMemorySource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic evidence-memory files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-evidence-memory\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Evidence Memory exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Evidence Memory" "managed smoke suite includes Evidence Memory exactly once"

Write-Host "[OK] CodexForge Evidence Memory smoke passed."
