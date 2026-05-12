param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
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

Write-Host "=== CodexForge Predictive context UX smoke ==="
Write-Host "Base URL: $BaseUrl"

$panelPath = "src\lib\codexforge\files\components\predictive-context-panel.tsx"
$commandCenterPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$helperPath = "src\lib\codexforge\files\server\predictive-file-context.ts"
$brainPagePath = "src\app\brain\page-client.tsx"
$brainGraphPath = "src\lib\codexforge\brain\components\brain-graph-view.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $panelPath
Assert-FileExists $commandCenterPath
Assert-FileExists $helperPath
Assert-FileExists $brainPagePath
Assert-FileExists $brainGraphPath

$panelSource = Get-Content -Raw $panelPath
$commandCenterSource = Get-Content -Raw $commandCenterPath
$helperSource = Get-Content -Raw $helperPath
$brainPageSource = Get-Content -Raw $brainPagePath
$brainGraphSource = Get-Content -Raw $brainGraphPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$newPredictiveSources = @($panelSource, $helperSource) -join "`n"

Assert-Contains $commandCenterSource "PredictiveContextPanel" "FilesCommandCenter imports/renders predictive panel"
Assert-Matches $commandCenterSource "<PredictiveContextPanel" "FilesCommandCenter renders predictive panel"

foreach ($marker in @(
  "data-codexforge-predictive-context-panel",
  "Predictive context",
  "Context confidence",
  "Related files",
  "Risk hints",
  "Next safe action"
)) {
  Assert-Contains $panelSource $marker "predictive panel marker $marker"
}

Assert-Contains $helperSource "buildPredictiveContext" "server helper imports runtime context APIs"
Assert-Contains $helperSource "@/lib/codexforge/brain/runtime" "server helper uses runtime barrel"
Assert-NotContains $helperSource "brain-graph" "server helper avoids legacy brain-graph"

Assert-Contains $brainPageSource "data-codexforge-brain-runtime-readiness" "/brain exposes runtime readiness marker"
Assert-Contains $brainPageSource "data-codexforge-predictive-context-readiness" "/brain exposes predictive context readiness marker"
Assert-Contains $brainPageSource "Predictive context readiness" "/brain labels predictive context readiness"
Assert-Contains $brainGraphSource "data-codexforge-brain-graph-view" "brain graph view marker remains"

foreach ($marker in @("Math.random", "d3-force", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector", "embedding", "embeddings")) {
  Assert-NotContains $newPredictiveSources $marker "banned predictive UX/runtime marker absent: $marker"
}

foreach ($marker in @("fetch", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $newPredictiveSources $marker "network/API marker absent: $marker"
}

foreach ($marker in @("ÃƒÂ¢", "ÃƒÆ’", "Ãƒâ€š", "Ã¯Â¿Â½")) {
  Assert-NotContains ($newPredictiveSources + $brainPageSource) $marker "mojibake marker absent: $marker"
}

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-predictive-context-ux\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Predictive context UX exactly once; found $($suiteMatches.Count)."
}

$runtimeSuiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-predictive-context\.ps1")
if ($runtimeSuiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must keep Predictive context runtime exactly once; found $($runtimeSuiteMatches.Count)."
}

$filesUxMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-files-ux\.ps1")
if ($filesUxMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must keep Files UX exactly once; found $($filesUxMatches.Count)."
}

Assert-Contains $allSmokeSource 'Name = "Predictive context UX"' "managed smoke suite names Predictive context UX"

Write-Host "[OK] CodexForge Predictive context UX smoke passed."
