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

Write-Host "=== CodexForge Files Command Center smoke ==="
Write-Host "Base URL: $BaseUrl"

$filesDir = "src\lib\codexforge\files"
$componentsDir = Join-Path $filesDir "components"
$pagePath = "src\app\files\page.tsx"
$pageClientPath = "src\app\files\page-client.tsx"
$routePath = "src\app\api\codexforge\files\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

foreach ($path in @(
  "$filesDir\file-types.ts",
  "$filesDir\file-intelligence.ts",
  "$filesDir\file-risk.ts",
  "$filesDir\file-search.ts",
  "$filesDir\file-context.ts",
  "$filesDir\index.ts",
  "$componentsDir\files-command-center.tsx",
  "$componentsDir\file-tree.tsx",
  "$componentsDir\file-inspector.tsx",
  "$componentsDir\file-risk-badge.tsx",
  "$componentsDir\related-files-panel.tsx",
  "$componentsDir\safe-edit-preview.tsx",
  $pagePath,
  $pageClientPath,
  $routePath
)) {
  Assert-FileExists $path
}

$pageSource = Get-Content -Raw $pagePath
$pageClientSource = Get-Content -Raw $pageClientPath
$routeSource = Get-Content -Raw $routePath
$contextSource = Get-Content -Raw "$filesDir\file-context.ts"
$commandCenterSource = Get-Content -Raw "$componentsDir\files-command-center.tsx"
$safePreviewSource = Get-Content -Raw "$componentsDir\safe-edit-preview.tsx"
$intelligenceSource = Get-Content -Raw "$filesDir\file-intelligence.ts"
$riskSource = Get-Content -Raw "$filesDir\file-risk.ts"
$searchSource = Get-Content -Raw "$filesDir\file-search.ts"
$allFilesSource = (Get-ChildItem $filesDir -Recurse -File | ForEach-Object {
  Get-Content -Raw $_.FullName
}) -join "`n"
$allSmokeSource = Get-Content -Raw $allSmokePath

Assert-Contains $pageSource "buildCodexForgeFilesContext" "route page loads read-only files context"
Assert-Contains $pageSource "FilesPageClient" "route page delegates to client"
Assert-Contains $pageClientSource '"use client"' "page-client is client boundary"
Assert-Contains $pageClientSource "FilesCommandCenter" "page-client renders command center"
Assert-Contains $routeSource "buildCodexForgeFilesContext" "API reuses context assembler"

foreach ($marker in @(
  "collectCodexForgeProjectFiles",
  "buildDependencyTrace",
  "buildFilePreviews",
  "buildRuntimeFileContextSignals",
  "buildPredictiveFileContextSummary",
  "relateFilesDeterministically"
)) {
  Assert-Contains $contextSource $marker "file context uses readonly runtime helper $marker"
}

foreach ($marker in @(
  "data-codexforge-files-command-center",
  "data-codexforge-file-tree",
  "data-codexforge-file-inspector",
  "data-codexforge-file-risk-badge",
  "data-codexforge-related-files-panel",
  "data-codexforge-safe-edit-preview",
  "data-codexforge-files-preview-panel",
  "data-codexforge-files-dependency-trace"
)) {
  Assert-Contains $allFilesSource $marker "command center marker $marker"
}

foreach ($marker in @(
  "Search path, area, concept, risk, memory",
  "preview-only",
  "no overwrite",
  "approval",
  "summarizeFilePurpose",
  "calculateFileRisk",
  "searchFiles"
)) {
  Assert-Contains $allFilesSource $marker "feature marker $marker"
}

Assert-Contains $intelligenceSource "export function summarizeFilePurpose" "deterministic purpose summary exists"
Assert-Contains $riskSource "export function calculateFileRisk" "deterministic risk helper exists"
Assert-Contains $searchSource "export function searchFiles" "deterministic file search exists"
Assert-Contains $commandCenterSource "live-read-only-runtime" "UI can render live readonly context"
Assert-Contains $safePreviewSource "Phase 3" "safe edit preview labels Phase 3 behavior"

foreach ($marker in @("Math.random", "Date.now", "d3-force", "OpenAI", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $allFilesSource $marker "banned random/external intelligence marker absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch", "saveBrainGraph")) {
  Assert-NotContains $commandCenterSource $marker "UI mutation marker absent: $marker"
}

Assert-NotMatches $allFilesSource 'from\s+["''][^"'']*brain-graph["'']' "legacy brain graph import absent"
Assert-NotMatches $routeSource "export\s+async\s+function\s+(POST|PUT|PATCH|DELETE)" "Files API exposes no mutation method"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-files-command-center\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Files Command Center exactly once; found $($suiteMatches.Count)."
}

Write-Host "[OK] CodexForge Files Command Center smoke passed."
