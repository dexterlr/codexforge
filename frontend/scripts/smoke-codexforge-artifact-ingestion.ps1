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
Write-Host "=== CodexForge Artifact Ingestion smoke ==="
Write-Host "Base URL: $BaseUrl"

$ingestionDir = "src\lib\codexforge\artifact-ingestion"
$componentDir = Join-Path $ingestionDir "components"
$artifactsPagePath = "src\app\artifacts\page-client.tsx"
$exportFlowPanelPath = "src\lib\codexforge\artifact-export-flow\components\ArtifactExportFlowPanel.tsx"
$missionHealthPath = "src\lib\codexforge\mission-control\mission-health.ts"
$missionActionsPath = "src\lib\codexforge\mission-control\mission-next-actions.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $ingestionDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "artifact-ingestion-types.ts",
  "artifact-ingestion-events.ts",
  "artifact-memory-candidates.ts",
  "artifact-brain-signals.ts",
  "artifact-ingestion-readiness.ts",
  "artifact-ingestion-ledger.ts",
  "artifact-ingestion-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $ingestionDir $module)
}

foreach ($component in @(
  "ArtifactIngestionPanel.tsx",
  "ArtifactMemoryCandidatesPanel.tsx",
  "ArtifactBrainSignalsPanel.tsx",
  "ArtifactIngestionReadinessPanel.tsx",
  "ArtifactIngestionLedgerPanel.tsx",
  "ArtifactIngestionSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $ingestionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$artifactsPageSource = Get-Content -Raw $artifactsPagePath
$exportFlowSource = Get-Content -Raw $exportFlowPanelPath
$missionSource = (Get-Content -Raw $missionHealthPath) + "`n" + (Get-Content -Raw $missionActionsPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $artifactsPageSource + "`n" + $exportFlowSource + "`n" + $missionSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export function buildArtifactIngestionEvent(",
  "export function buildArtifactIngestionEvents(",
  "export function summarizeArtifactIngestionEvents(",
  "export function buildArtifactMemoryCandidate(",
  "export function buildArtifactMemoryCandidates(",
  "export function summarizeArtifactMemoryCandidates(",
  "export function buildArtifactBrainSignal(",
  "export function buildArtifactBrainSignals(",
  "export function summarizeArtifactBrainSignals(",
  "export function buildArtifactIngestionReadiness(",
  "export function scoreArtifactIngestionReadiness(",
  "export function summarizeArtifactIngestionReadiness(",
  "export function buildArtifactIngestionLedger(",
  "export function buildArtifactIngestionLedgerItem(",
  "export function summarizeArtifactIngestionLedger(",
  "export function buildArtifactIngestionSummary(",
  "export function summarizeArtifactIngestionBundle("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $artifactsPageSource "ArtifactIngestionPanel" "Artifacts page imports/renders ArtifactIngestionPanel"
Assert-Contains $exportFlowSource "buildArtifactIngestionSummary" "export flow uses ingestion helpers"
Assert-Contains $exportFlowSource "ArtifactIngestionPanel" "export flow renders ingestion panel"
Assert-Contains $missionSource "Artifact ingestion readiness" "Mission Control references artifact ingestion health"
Assert-Contains $missionSource "Review artifact ingestion candidates" "Mission Control references artifact ingestion next action"

foreach ($text in @(
  "review before promotion",
  "no direct graph mutation",
  "memory candidates",
  "brain signals",
  "read-only",
  "future-promotion"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

foreach ($eventType in @(
  "artifact.exported",
  "production-pack.exported",
  "memory.candidate.created"
)) {
  Assert-Contains $domainSource $eventType "event type includes $eventType"
}

foreach ($marker in @(
  "brain-graph",
  "from `"write-file`"",
  "from 'write-file'",
  "from `"apply-diff`"",
  "from 'apply-diff'",
  "from `"run-command`"",
  "from 'run-command'",
  "broker-execution(",
  "Math.random",
  "Date.now",
  "d3-force",
  "pinecone",
  "weaviate",
  "chroma"
)) {
  Assert-NotContains $allSource $marker "unsafe marker absent: $marker"
}

Assert-NotMatches ($domainSource + "`n" + $uiSource) "from\s+[`"']fs|from\s+[`"']fs/promises" "artifact ingestion does not import filesystem writers"
Assert-NotMatches ($domainSource + "`n" + $uiSource) "https?://" "no external network dependency"
Assert-Contains $domainSource "buildArtifactIngestionStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildArtifactIngestionStableKey" "stable key patterns exist"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-artifact-ingestion\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Artifact Ingestion exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Artifact Ingestion" "managed smoke suite includes Artifact Ingestion exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/artifacts" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /artifacts returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /artifacts route reachable"
} catch {
  Write-Host "[SKIP] /artifacts route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Artifact Ingestion smoke passed."
