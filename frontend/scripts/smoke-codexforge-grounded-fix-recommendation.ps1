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
Write-Host "=== CodexForge Grounded Fix Recommendation smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\grounded-fix"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$filesCenterPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$memoryPagePath = "src\app\memory\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "grounded-fix-types.ts",
  "fix-signal-normalizer.ts",
  "fix-candidate-builder.ts",
  "fix-risk-model.ts",
  "fix-confidence.ts",
  "fix-file-impact.ts",
  "fix-preview-handoff.ts",
  "fix-recommendation-policy.ts",
  "fix-recommendation-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "GroundedFixRecommendationPanel.tsx",
  "FixSignalPanel.tsx",
  "FixCandidatePanel.tsx",
  "FixRiskPanel.tsx",
  "FixConfidencePanel.tsx",
  "FixFileImpactPanel.tsx",
  "FixPreviewHandoffPanel.tsx",
  "FixRecommendationPolicyPanel.tsx",
  "GroundedFixSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = (Get-Content -Raw $filesPagePath) + "`n" + (Get-Content -Raw $filesCenterPath)
$tasksSource = Get-Content -Raw $tasksPagePath
$memorySource = Get-Content -Raw $memoryPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$groundedSource = $domainSource + "`n" + $uiSource
$allSource = $groundedSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $memorySource + "`n" + $missionSource

foreach ($export in @(
  "normalizeFixSignals",
  "buildGroundedFixCandidates",
  "buildGroundedFixCandidate",
  "scoreGroundedFixRisk",
  "classifyGroundedFixRisk",
  "buildGroundedFixRiskBoard",
  "scoreGroundedFixConfidence",
  "rankGroundedFixCandidates",
  "buildGroundedFixFileImpact",
  "buildGroundedFixPreviewHandoff",
  "buildGroundedFixPatchPreviewInput",
  "buildGroundedFixPrompt",
  "buildGroundedFixRecommendationPolicy",
  "isGroundedFixRecommendationAllowed",
  "buildGroundedFixRecommendationSummary"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "GroundedFixRecommendationPanel renders",
  "FixSignalPanel renders",
  "FixCandidatePanel renders",
  "FixRiskPanel renders",
  "FixConfidencePanel renders",
  "FixFileImpactPanel renders",
  "FixPreviewHandoffPanel renders",
  "FixRecommendationPolicyPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "<GroundedFixRecommendationPanel" "/tasks imports/renders GroundedFixRecommendationPanel"
Assert-Contains $aiSource 'redirect("/jarvis")' "/ai redirects to canonical Jarvis"
Assert-NotContains $aiSource "GroundedFixRecommendationPanel" "/ai mounts no competing Grounded Fix Recommendation panel"
Assert-Contains $filesSource "Grounded Fix Recommendation" "/files references Grounded Fix Recommendation if integrated"
Assert-Contains $tasksSource "Grounded Fix Recommendation" "/tasks references Grounded Fix Recommendation if integrated"
Assert-Contains $memorySource "Use in fix recommendation" "/memory references Use in fix recommendation if integrated"
Assert-Contains $missionSource "Grounded Fix Recommendation readiness" "Mission Control includes Grounded Fix Recommendation readiness"
Assert-Contains $missionSource "Review grounded fix recommendation" "Mission Control next action: Review grounded fix recommendation"

foreach ($text in @(
  "evidence is context, not proof",
  "Verify current files",
  "preview diff only",
  "Safe Patch Preview",
  "no file writes without approval",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "applyBlocked: true" "policy blocks apply"
Assert-Contains $domainSource "mutationBlocked: true" "policy blocks mutation"
Assert-Contains $domainSource "commandExecutionBlocked: true" "policy blocks command execution"
Assert-Contains $domainSource "fileEditsRequireSafePatchPreview: true" "policy requires Safe Patch Preview for edits"
Assert-Contains $domainSource "investigation-needed" "policy marks low confidence as investigation-needed"
Assert-Contains $domainSource "Inspect first" "handoff says inspect first"
Assert-Contains $domainSource "No command execution without approval" "handoff says no command execution without approval"

foreach ($factor in @("route/API file", "policy file", "runtime/readiness file", "memory/merge file", "chat route/hook", "smoke script")) {
  Assert-Contains $domainSource $factor "risk model includes $factor"
}

Assert-Contains $domainSource "confidence descending" "confidence model ranks deterministically"
Assert-Contains $domainSource "suggestedSmokeScripts" "file impact suggests smoke scripts"

Assert-NotMatches $groundedSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $groundedSource 'from\s+["''][^"'']*write-file["'']' "no write-file import"
Assert-NotMatches $groundedSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $groundedSource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $groundedSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $groundedSource "Math.random" "no Math.random"
Assert-NotContains $groundedSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $groundedSource "d3-force" "no d3-force"
Assert-NotMatches $groundedSource "https?://" "no external network dependency"
Assert-NotContains $groundedSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $groundedSource "axios" "no external network library dependency"
Assert-NotMatches $groundedSource "fetch\s*\(" "no fetch dependency in grounded-fix files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $groundedSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $groundedSource $marker "no OpenAI/API-key dependency in deterministic grounded-fix files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildGroundedFixStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-grounded-fix-recommendation\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Grounded Fix Recommendation exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Grounded Fix Recommendation" "managed smoke suite includes Grounded Fix Recommendation exactly once"

Write-Host "[OK] CodexForge Grounded Fix Recommendation smoke passed."
