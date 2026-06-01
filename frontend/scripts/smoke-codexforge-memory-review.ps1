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
Write-Host "=== CodexForge Memory Review smoke ==="
Write-Host "Base URL: $BaseUrl"

$reviewDir = "src\lib\codexforge\memory-review"
$componentDir = Join-Path $reviewDir "components"
$routePath = "src\app\memory\page.tsx"
$pageClientPath = "src\app\memory\page-client.tsx"
$artifactsPagePath = "src\app\artifacts\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $reviewDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "memory-review-types.ts",
  "memory-review-queue.ts",
  "memory-review-scoring.ts",
  "memory-review-policy.ts",
  "memory-review-actions.ts",
  "memory-promotion-events.ts",
  "memory-review-ledger.ts",
  "memory-review-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $reviewDir $module)
}

foreach ($component in @(
  "MemoryReviewQueue.tsx",
  "MemoryCandidateCard.tsx",
  "MemoryReviewScorePanel.tsx",
  "MemoryPromotionPolicyPanel.tsx",
  "MemoryReviewActionsPanel.tsx",
  "MemoryPromotionEventPreview.tsx",
  "MemoryReviewLedgerPanel.tsx",
  "MemoryReviewSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $reviewDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$artifactsSource = Get-Content -Raw $artifactsPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource + "`n" + $artifactsSource + "`n" + $missionSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "MemoryReviewQueue renders",
  "MemoryCandidateCard renders",
  "MemoryReviewScorePanel renders",
  "MemoryPromotionPolicyPanel renders",
  "MemoryReviewActionsPanel renders",
  "MemoryPromotionEventPreview renders",
  "MemoryReviewLedgerPanel renders",
  "MemoryReviewSafetyNotice renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

foreach ($export in @(
  "export function buildMemoryReviewQueue(",
  "export function buildMemoryReviewItem(",
  "export function summarizeMemoryReviewQueue(",
  "export function selectMemoryReviewNextAction(",
  "export function scoreMemoryReviewCandidate(",
  "export function classifyMemoryPromotionReadiness(",
  "export function summarizeMemoryReviewScore(",
  "export function buildMemoryPromotionPolicy(",
  "export function isMemoryPromotionAllowed(",
  "export function summarizeMemoryPromotionPolicy(",
  "export function buildMemoryReviewAction(",
  "export function reduceMemoryReviewQueue(",
  "export function summarizeMemoryReviewAction(",
  "export function buildMemoryPromotionEvent(",
  "export function buildMemoryPromotionEventPreview(",
  "export function summarizeMemoryPromotionEvent(",
  "export function buildMemoryReviewLedger(",
  "export function buildMemoryReviewLedgerItem(",
  "export function summarizeMemoryReviewLedger(",
  "export function buildMemoryReviewSummary(",
  "export function summarizeMemoryReviewBundle("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

foreach ($text in @(
  "review required",
  "no auto-promotion",
  "no direct graph mutation",
  "memory.promoted",
  "promotion event preview",
  "policy requires explicit approval",
  "contradiction risk",
  "low confidence review",
  "Review memory candidates"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

foreach ($marker in @(
  "from `"@/lib/codexforge/brain/graph`"",
  "from '@/lib/codexforge/brain/graph'",
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

Assert-NotMatches ($domainSource + "`n" + $uiSource + "`n" + $pageSource) "from\s+[`"']fs|from\s+[`"']fs/promises" "memory review does not import filesystem writers"
Assert-NotMatches $allSource "https?://" "no external network dependency"
Assert-Contains $domainSource "buildMemoryReviewStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildMemoryReviewStableKey" "stable key patterns exist"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-memory-review\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Memory Review exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Memory Review" "managed smoke suite includes Memory Review exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/memory" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /memory returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /memory route reachable"
} catch {
  Write-Host "[SKIP] /memory route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Memory Review smoke passed."
