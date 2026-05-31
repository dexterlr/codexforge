param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

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

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge Predictive context smoke ==="
Write-Host "Base URL: $BaseUrl"

$contextDir = "src\lib\codexforge\brain\runtime\context"
$contextIndexPath = Join-Path $contextDir "index.ts"
$runtimeIndexPath = "src\lib\codexforge\brain\runtime\index.ts"
$filesRoutePath = "src\app\api\codexforge\files\route.ts"
$filesRuntimeContextPath = "src\lib\codexforge\files\server\runtime-file-context.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $contextDir

$requiredFiles = @(
  "predictive-context.ts",
  "relevance-engine.ts",
  "semantic-routing.ts",
  "task-focus.ts",
  "risk-prioritizer.ts",
  "architectural-retrieval.ts",
  "context-fixtures.ts",
  "index.ts"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists (Join-Path $contextDir $file)
}

$contextIndex = Get-Content -Raw $contextIndexPath
$runtimeIndex = Get-Content -Raw $runtimeIndexPath
$predictiveSource = Get-Content -Raw (Join-Path $contextDir "predictive-context.ts")
$relevanceSource = Get-Content -Raw (Join-Path $contextDir "relevance-engine.ts")
$routingSource = Get-Content -Raw (Join-Path $contextDir "semantic-routing.ts")
$taskSource = Get-Content -Raw (Join-Path $contextDir "task-focus.ts")
$riskSource = Get-Content -Raw (Join-Path $contextDir "risk-prioritizer.ts")
$architectureSource = Get-Content -Raw (Join-Path $contextDir "architectural-retrieval.ts")
$fixturesSource = Get-Content -Raw (Join-Path $contextDir "context-fixtures.ts")
$filesRouteSource = if (Test-Path $filesRoutePath) { Get-Content -Raw $filesRoutePath } else { "" }
$filesRuntimeContextSource = if (Test-Path $filesRuntimeContextPath) { Get-Content -Raw $filesRuntimeContextPath } else { "" }
$allSmokeSource = Get-Content -Raw $allSmokePath
$contextSources = (Get-ChildItem $contextDir -Filter "*.ts" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($api in @(
  "buildPredictiveContext",
  "summarizePredictiveContext",
  "calculateRelevanceScore",
  "rankContextSignals",
  "inferSemanticRoute",
  "routeContextFocus",
  "deriveTaskFocus",
  "summarizeTaskFocus",
  "prioritizeContextRisks",
  "summarizePrioritizedRisks",
  "retrieveArchitecturalContext",
  "summarizeArchitecturalContext",
  "buildPredictiveContextFixture",
  "buildPredictiveContextFixtureGraph",
  "buildPredictiveContextFixtureEvents",
  "buildPredictiveContextFixtureFiles"
)) {
  Assert-Contains $contextIndex $api "context index exports $api"
  Assert-Contains $runtimeIndex $api "runtime index exports $api"
}

Assert-Contains $predictiveSource "export function buildPredictiveContext" "predictive module exports buildPredictiveContext"
Assert-Contains $predictiveSource "export function summarizePredictiveContext" "predictive module exports summarizePredictiveContext"
Assert-Contains $relevanceSource "export function calculateRelevanceScore" "relevance engine exports calculateRelevanceScore"
Assert-Contains $relevanceSource "export function rankContextSignals" "relevance engine exports rankContextSignals"
Assert-Contains $routingSource "export function inferSemanticRoute" "semantic routing exports inferSemanticRoute"
Assert-Contains $routingSource "export function routeContextFocus" "semantic routing exports routeContextFocus"
Assert-Contains $taskSource "export function deriveTaskFocus" "task focus exports deriveTaskFocus"
Assert-Contains $taskSource "export function summarizeTaskFocus" "task focus exports summarizeTaskFocus"
Assert-Contains $riskSource "export function prioritizeContextRisks" "risk prioritizer exports prioritizeContextRisks"
Assert-Contains $riskSource "export function summarizePrioritizedRisks" "risk prioritizer exports summarizePrioritizedRisks"
Assert-Contains $architectureSource "export function retrieveArchitecturalContext" "architectural retrieval exports retrieveArchitecturalContext"
Assert-Contains $architectureSource "export function summarizeArchitecturalContext" "architectural retrieval exports summarizeArchitecturalContext"

Assert-Contains $fixturesSource "CODEXFORGE_PREDICTIVE_CONTEXT_FIXED_TS" "fixtures use named fixed timestamp"
Assert-NotContains $fixturesSource "Date.now" "fixtures avoid Date.now"
Assert-NotContains $fixturesSource "Math.random" "fixtures avoid Math.random"

Assert-Contains ($filesRouteSource + $filesRuntimeContextSource) "buildPredictiveContext" "Files API/server references predictive context"
Assert-Contains ($filesRouteSource + $filesRuntimeContextSource) "predictive" "Files integration exposes predictive context"

Assert-NotMatches $contextSources 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotContains $contextSources "Math.random" "no Math.random"
Assert-NotContains $contextSources "d3-force" "no d3-force"

foreach ($marker in @("Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector", "embedding", "embeddings")) {
  Assert-NotContains $contextSources $marker "no vector/embedding dependency $marker"
}

foreach ($marker in @("fetch", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $contextSources $marker "no external network/API marker $marker"
}

Assert-NotMatches $contextSources 'from\s+["'']node:(fs|path)["'']|from\s+["''](fs|path)["'']' "no fs/path imports in runtime context modules"

foreach ($marker in @("writeFile", "appendFile", "unlink", "rm(", "rmdir", "mkdir", "spawn", "exec(", "execFile", "child_process")) {
  Assert-NotContains $contextSources $marker "no mutation/process marker $marker"
}

foreach ($markerCode in @(0x00C3, 0x0192, 0x00C2, 0xFFFD)) {
  $marker = [string][char]$markerCode
  Assert-NotContains $contextSources $marker "no mojibake marker $marker"
}

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-predictive-context\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Predictive context exactly once; found $($suiteMatches.Count)."
}

Write-Host "[OK] CodexForge Predictive context smoke passed."
