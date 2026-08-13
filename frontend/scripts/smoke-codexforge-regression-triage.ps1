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
Write-Host "=== CodexForge Regression Triage smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\regression-triage"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$filesCenterPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$memoryPagePath = "src\app\memory\page-client.tsx"
$brainPagePath = "src\app\brain\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "regression-triage-types.ts",
  "regression-signal-normalizer.ts",
  "regression-classifier.ts",
  "regression-cause-model.ts",
  "regression-impact-map.ts",
  "regression-rollback-advisor.ts",
  "regression-fix-recommendation.ts",
  "regression-preview-handoff.ts",
  "regression-triage-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "RegressionTriagePanel.tsx",
  "RegressionSignalPanel.tsx",
  "RegressionClassifierPanel.tsx",
  "RegressionCausePanel.tsx",
  "RegressionImpactMapPanel.tsx",
  "RegressionRollbackAdvisorPanel.tsx",
  "RegressionFixRecommendationPanel.tsx",
  "RegressionPreviewHandoffPanel.tsx",
  "RegressionTriageSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$regressionSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = (Get-Content -Raw $filesPagePath) + "`n" + (Get-Content -Raw $filesCenterPath)
$tasksSource = Get-Content -Raw $tasksPagePath
$memorySource = Get-Content -Raw $memoryPagePath
$brainSource = Get-Content -Raw $brainPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $regressionSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $memorySource + "`n" + $brainSource + "`n" + $missionSource

foreach ($export in @(
  "normalizeRegressionSignals",
  "normalizeRegressionSignal",
  "classifyRegression",
  "classifyRegressionSignals",
  "buildRegressionSuspectedCause",
  "buildRegressionCauseCandidate",
  "buildRegressionImpactMap",
  "buildRegressionImpactItem",
  "buildRegressionRollbackAdvice",
  "buildRegressionRollbackOption",
  "buildRegressionFixRecommendation",
  "buildRegressionFixCandidate",
  "buildRegressionPreviewHandoff",
  "buildRegressionPatchPreviewPrompt",
  "buildRegressionTriageSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "RegressionTriagePanel renders",
  "RegressionSignalPanel renders",
  "RegressionClassifierPanel renders",
  "RegressionCausePanel renders",
  "RegressionImpactMapPanel renders",
  "RegressionRollbackAdvisorPanel renders",
  "RegressionFixRecommendationPanel renders",
  "RegressionPreviewHandoffPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $aiSource 'redirect("/jarvis")' "retired AI route redirects to canonical Jarvis"
Assert-NotContains $aiSource "RegressionTriagePanel" "retired AI redirect does not own Regression Triage UI"
Assert-Contains $filesSource "Regression Triage" "/files references Regression Triage if integrated"
Assert-Contains $tasksSource "Regression Triage status" "/tasks references Regression Triage if integrated"
Assert-Contains $memorySource "regression memory candidates" "/memory references regression memory candidates if integrated"
Assert-Contains $brainSource "Regression Triage waits for review before Brain merge" "/brain references regression triage review if integrated"
Assert-Contains $missionSource "Self-Healing Regression Triage readiness" "Mission Control includes Self-Healing Regression Triage readiness"
Assert-Contains $missionSource "Review regression triage" "Mission Control next action: Review regression triage"

foreach ($text in @(
  "no auto-fix",
  "no auto-rollback",
  "Safe Patch Preview",
  "evidence is context, not proof",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "duplicate-react-key" "classifier recognizes duplicate-react-key"
Assert-Contains $domainSource "smoke-failure" "classifier recognizes smoke-failure"
Assert-Contains $domainSource "build-failure" "classifier recognizes build-failure"
Assert-Contains $domainSource "React key generation / repeated display text" "cause model maps duplicate key warning to React key generation"
Assert-Contains $domainSource "encoding issue or copied special character issue" "cause model maps mojibake to encoding issue"
Assert-Contains $domainSource "Smoke expectation or export mismatch" "cause model maps smoke missing marker to smoke expectation or export mismatch"
Assert-Contains $domainSource "git restore" "rollback advisor mentions git restore"
Assert-Contains $domainSource "git revert" "rollback advisor mentions git revert"
Assert-Contains $domainSource "safePatchPreviewRequired: true" "fix recommendation requires Safe Patch Preview"
Assert-Contains $domainSource "Produce preview diff only" "handoff says preview diff only"
Assert-Contains $domainSource "No file writes without approval" "handoff says no file writes without approval"
Assert-Contains $domainSource "No command execution without approval" "handoff says no command execution without approval"

Assert-NotMatches $regressionSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $regressionSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $regressionSource "Math.random" "no Math.random"
Assert-NotContains $regressionSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $regressionSource "d3-force" "no d3-force"
Assert-NotMatches $regressionSource "https?://" "no external network dependency"
Assert-NotContains $regressionSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $regressionSource "axios" "no external network library dependency"
Assert-NotMatches $regressionSource "fetch\s*\(" "no fetch dependency in regression-triage files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $regressionSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $regressionSource $marker "no OpenAI/API-key dependency in deterministic regression-triage files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildRegressionTriageStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-regression-triage\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Regression Triage exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Regression Triage" "managed smoke suite includes Regression Triage exactly once"

Write-Host "[OK] CodexForge Regression Triage smoke passed."
