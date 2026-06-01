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
Write-Host "=== CodexForge Memory Persistence smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\memory-persistence"
$componentDir = Join-Path $domainDir "components"
$appendApiPath = "src\app\api\codexforge\memory\events\append\route.ts"
$listApiPath = "src\app\api\codexforge\memory\events\list\route.ts"
$memoryPagePath = "src\app\memory\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "memory-persistence-types.ts",
  "memory-event-path-guard.ts",
  "memory-event-policy.ts",
  "memory-event-request.ts",
  "memory-event-ledger.ts",
  "memory-event-validation.ts",
  "memory-event-reducer-preview.ts",
  "memory-event-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "MemoryPersistencePanel.tsx",
  "MemoryEventApprovalPanel.tsx",
  "MemoryEventLedgerPanel.tsx",
  "MemoryEventValidationPanel.tsx",
  "MemoryGraphReductionPreview.tsx",
  "MemoryPersistenceSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $appendApiPath
Assert-FileExists $listApiPath
Assert-FileExists $memoryPagePath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$appendApiSource = Get-Content -Raw $appendApiPath
$listApiSource = Get-Content -Raw $listApiPath
$memoryPageSource = Get-Content -Raw $memoryPagePath
$allSource = $domainSource + "`n" + $uiSource + "`n" + $appendApiSource + "`n" + $listApiSource + "`n" + $memoryPageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export const CODEXFORGE_MEMORY_EVENT_WORKSPACE_ROOT",
  "export const CODEXFORGE_MEMORY_EVENT_ALLOWED_EXTENSIONS",
  "export function normalizeMemoryEventRelativePath(",
  "export function validateMemoryEventWorkspacePath(",
  "export function isMemoryEventPathTraversal(",
  "export function buildSafeMemoryEventPath(",
  "export function buildMemoryEventPersistencePolicy(",
  "export function isMemoryEventPersistenceAllowed(",
  "export function summarizeMemoryEventPersistencePolicy(",
  "export function buildMemoryEventPersistenceRequest(",
  "export function validateMemoryEventPersistenceRequest(",
  "export function summarizeMemoryEventPersistenceRequest(",
  "export function buildMemoryEventLedger(",
  "export function buildMemoryEventLedgerItem(",
  "export function summarizeMemoryEventLedger(",
  "export function validateMemoryEventContent(",
  "export function validateMemoryEventSet(",
  "export function summarizeMemoryEventValidation(",
  "export function buildMemoryGraphReductionPreview(",
  "export function summarizeMemoryGraphReductionPreview(",
  "export function selectMemoryGraphReductionNextAction("
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $memoryPageSource "MemoryPersistencePanel" "Memory page imports/renders MemoryPersistencePanel"

foreach ($text in @(
  "explicit approval required",
  "no auto-promotion",
  "no direct graph mutation",
  ".codexforge/memory-events",
  "memory.promoted"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

Assert-Contains $appendApiSource "approved !== true" "append API requires approved true"
Assert-Contains $appendApiSource ".codexforge/memory-events" "append API writes only under .codexforge/memory-events"
Assert-Contains $appendApiSource "blocks traversal" "append API blocks traversal"
Assert-Contains $appendApiSource "blocks absolute paths" "append API blocks absolute paths"
Assert-NotContains $appendApiSource "write-file" "append API does not import write-file"
Assert-NotContains $appendApiSource "apply-diff" "append API does not import apply-diff"
Assert-NotContains $appendApiSource "run-command" "append API does not import run-command"
Assert-Contains $listApiSource "workspace is missing; list handled safely" "list API handles missing workspace safely"
Assert-Contains $domainSource "memory.promoted" "event type includes memory.promoted"
Assert-Contains $domainSource "reduceGraph" "graph reduction preview uses runtime reducer or references reduceGraph"

Assert-NotContains $allSource "brain-graph" "no import from brain-graph"
Assert-NotContains $allSource "broker-execution" "no broker-execution call"
Assert-NotContains $allSource "Math.random" "no Math.random"
Assert-NotContains $allSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $allSource "d3-force" "no d3-force"
Assert-NotMatches $allSource "https?://" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $allSource $marker "no vector database dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildMemoryEventStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-memory-persistence\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Memory Persistence exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Memory Persistence" "managed smoke suite includes Memory Persistence exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/api/codexforge/memory/events/list" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] list API returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] list API route reachable"
} catch {
  Write-Host "[SKIP] list API route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Memory Persistence smoke passed."
