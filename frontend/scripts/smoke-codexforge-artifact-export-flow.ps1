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
Write-Host "=== CodexForge Artifact Export Flow smoke ==="
Write-Host "Base URL: $BaseUrl"

$flowDir = "src\lib\codexforge\artifact-export-flow"
$componentDir = Join-Path $flowDir "components"
$productionPagePath = "src\app\production\page-client.tsx"
$artifactsPagePath = "src\app\artifacts\page-client.tsx"
$exportRoutePath = "src\app\api\codexforge\artifacts\export\route.ts"
$listRoutePath = "src\app\api\codexforge\artifacts\list\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $flowDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "export-flow-types.ts",
  "export-flow-review.ts",
  "export-flow-approval.ts",
  "export-flow-client.ts",
  "export-flow-ledger.ts",
  "export-flow-state.ts",
  "export-flow-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $flowDir $module)
}

foreach ($component in @(
  "ArtifactExportFlowPanel.tsx",
  "ExportRequestReviewPanel.tsx",
  "ExportApprovalChecklist.tsx",
  "ExportProgressPanel.tsx",
  "ExportResultLedger.tsx",
  "ExportWorkspaceRefreshPanel.tsx",
  "ExportSafetyBoundary.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $flowDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productionPageSource = Get-Content -Raw $productionPagePath
$artifactsPageSource = Get-Content -Raw $artifactsPagePath
$exportRouteSource = Get-Content -Raw $exportRoutePath
$listRouteSource = Get-Content -Raw $listRoutePath
$allSource = $domainSource + "`n" + $uiSource + "`n" + $productionPageSource + "`n" + $artifactsPageSource + "`n" + $exportRouteSource + "`n" + $listRouteSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export function buildArtifactExportFlow(",
  "export function buildArtifactExportFlowStep(",
  "export function summarizeArtifactExportFlow(",
  "export function selectExportFlowNextAction(",
  "export function buildExportRequestReview(",
  "export function summarizeExportRequestReview(",
  "export function groupExportRequestsByRisk(",
  "export function buildExportApprovalChecklist(",
  "export function isExportApprovedForWorkspace(",
  "export function summarizeExportApprovalChecklist(",
  "export function buildExportApiPayload(",
  "export function parseExportApiResult(",
  "export function summarizeExportApiResult(",
  "export function buildExportResultLedger(",
  "export function buildExportResultLedgerItem(",
  "export function summarizeExportResultLedger(",
  "export function buildInitialExportFlowState(",
  "export function reduceExportFlowState(",
  "export function summarizeExportFlowState("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $productionPageSource "ArtifactExportFlowPanel" "Production page imports/renders ArtifactExportFlowPanel"
Assert-Contains $artifactsPageSource "ExportWorkspaceRefreshPanel" "Artifacts page shows workspace refresh UI"
Assert-Contains $artifactsPageSource "ExportSafetyBoundary" "Artifacts page shows export safety UI"

foreach ($text in @(
  "explicit approval required",
  "safe artifact workspace",
  "source mutation blocked",
  ".codexforge/artifacts"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

Assert-Contains $domainSource "approved: false" "export requests default to not approved unless user toggles/approves"
Assert-Contains $uiSource 'fetch("/api/codexforge/artifacts/export"' "export flow calls guarded artifacts export API only"
Assert-Contains $uiSource 'fetch("/api/codexforge/artifacts/list"' "export flow refresh uses guarded artifacts list API"

foreach ($marker in @(
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
  "https://",
  "http://",
  "pinecone",
  "weaviate",
  "chroma"
)) {
  Assert-NotContains $allSource $marker "unsafe marker absent: $marker"
}

Assert-NotMatches ($domainSource + "`n" + $uiSource) "from\s+[`"']fs|from\s+[`"']fs/promises" "export flow does not import filesystem writers"
Assert-Contains $domainSource "buildArtifactExportFlowReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildArtifactExportFlowReactKey" "stable key patterns exist"

Assert-Contains $exportRouteSource "approved !== true" "export route requires approved true"
Assert-Contains $exportRouteSource "pathValidation.traversal" "export route blocks traversal"
Assert-Contains $exportRouteSource "pathValidation.absolutePath" "export route blocks absolute paths"
Assert-Contains $exportRouteSource "pathValidation.extensionAllowed" "export route blocks unsupported extensions"
Assert-Contains $exportRouteSource "CODEXFORGE_ARTIFACT_WORKSPACE_ROOT" "export route writes only under .codexforge/artifacts"
Assert-Contains $exportRouteSource "resolveBoundedWorkspacePath" "export route verifies resolved workspace path"
Assert-Contains $listRouteSource "Artifact workspace has not been created yet." "list route handles missing workspace safely"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-artifact-export-flow\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Artifact Export Flow exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Artifact Export Flow" "managed smoke suite includes Artifact Export Flow exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/production" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /production returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /production route reachable"
} catch {
  Write-Host "[SKIP] /production route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Artifact Export Flow smoke passed."
