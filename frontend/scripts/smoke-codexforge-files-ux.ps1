param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path -PathType Container)) {
    throw "[FAIL] Missing directory: $Path"
  }

  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack -notmatch $Pattern) {
    throw "[FAIL] Missing expected $Name pattern: $Pattern"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack -match $Pattern) {
    throw "[FAIL] Unexpected $Name pattern: $Pattern"
  }

  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge Files UX smoke ==="
Write-Host "Base URL: $BaseUrl"

$filesDir = "src\lib\codexforge\files"
$componentsDir = Join-Path $filesDir "components"
$pagePath = "src\app\files\page.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $pagePath
Assert-DirectoryExists $filesDir
Assert-DirectoryExists $componentsDir

$requiredFiles = @(
  "types.ts",
  "file-intelligence.ts",
  "file-risk.ts",
  "file-search.ts",
  "file-fixtures.ts",
  "index.ts"
)

$requiredComponents = @(
  "files-command-center.tsx",
  "file-tree.tsx",
  "file-inspector.tsx",
  "file-action-bar.tsx",
  "safe-edit-preview.tsx",
  "file-risk-badge.tsx",
  "file-timeline.tsx",
  "related-files-panel.tsx",
  "dependency-map.tsx",
  "execution-history.tsx"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists (Join-Path $filesDir $file)
}

foreach ($file in $requiredComponents) {
  Assert-FileExists (Join-Path $componentsDir $file)
}

$pageSource = Get-Content -Raw $pagePath
$commandCenterSource = Get-Content -Raw (Join-Path $componentsDir "files-command-center.tsx")
$safePreviewSource = Get-Content -Raw (Join-Path $componentsDir "safe-edit-preview.tsx")
$riskSource = Get-Content -Raw (Join-Path $filesDir "file-risk.ts")
$searchSource = Get-Content -Raw (Join-Path $filesDir "file-search.ts")
$intelligenceSource = Get-Content -Raw (Join-Path $filesDir "file-intelligence.ts")
$fixturesSource = Get-Content -Raw (Join-Path $filesDir "file-fixtures.ts")
$allSource = (Get-ChildItem $filesDir -Recurse -File | ForEach-Object {
  Get-Content -Raw $_.FullName
}) -join "`n"
$allSmokeSource = Get-Content -Raw $allSmokePath

Assert-Contains $pageSource "FilesCommandCenter" "page imports FilesCommandCenter"
Assert-Matches $pageSource "<FilesCommandCenter\s*/>" "page renders FilesCommandCenter"

$markers = @(
  "data-codexforge-files-command-center",
  "data-codexforge-file-tree",
  "data-codexforge-file-inspector",
  "data-codexforge-file-action-bar",
  "data-codexforge-safe-edit-preview",
  "data-codexforge-file-risk-badge",
  "data-codexforge-file-timeline",
  "data-codexforge-related-files-panel",
  "data-codexforge-dependency-map",
  "data-codexforge-execution-history"
)

foreach ($marker in $markers) {
  Assert-Contains $allSource $marker "required data marker $marker"
}

$actions = @(
  "summarize",
  "explain",
  "refactor",
  "generate tests",
  "trace dependencies",
  "prepare patch",
  "analyze risk",
  "locate callers",
  "explain architecture role"
)

foreach ($action in $actions) {
  Assert-Contains $allSource $action "action visible: $action"
}

Assert-Contains $safePreviewSource "preview-only" "safe preview says preview-only"
Assert-Contains $safePreviewSource "no overwrite" "safe preview says no overwrite"
Assert-Contains $safePreviewSource "approval" "safe preview requires approval language"

Assert-Contains $riskSource "export function calculateFileRisk" "file-risk exports calculateFileRisk"
Assert-Contains $riskSource "export function summarizeFileRisk" "file-risk exports summarizeFileRisk"
Assert-Contains $searchSource "export function searchFiles" "file-search exports searchFiles"
Assert-Contains $searchSource "export function filterFiles" "file-search exports filterFiles"
Assert-Contains $searchSource "export function rankFiles" "file-search exports rankFiles"
Assert-Contains $intelligenceSource "export function summarizeFilePurpose" "file-intelligence exports summary helper"
Assert-Contains $intelligenceSource "export function inferArchitectureRole" "file-intelligence exports architecture helper"
Assert-Contains $intelligenceSource "export function inferRelatedConcepts" "file-intelligence exports concept helper"

Assert-Contains $fixturesSource "FIXED_TIMESTAMPS" "fixtures use fixed timestamp map"
Assert-Contains $fixturesSource "2026-05-12T12:00:00.000Z" "fixtures include fixed Phase 3A timestamp"
Assert-NotContains $fixturesSource "Date.now" "fixtures do not use Date.now"

foreach ($marker in @("Math.random", "d3-force", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector", "embedding", "embeddings")) {
  Assert-NotContains $allSource $marker "banned dependency marker absent: $marker"
}

foreach ($marker in @("fetch(", "globalThis.fetch", "/api/codexforge/files", "XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $allSource $marker "network/API marker absent: $marker"
}

foreach ($pattern in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "fs\.", "Set-Content", "Remove-Item")) {
  Assert-NotContains $allSource $pattern "direct file mutation marker absent: $pattern"
}

Assert-NotMatches $allSource 'from\s+["''][^"'']*brain-graph["'']' "legacy brain-graph import absent"

foreach ($marker in @("Ã¢", "Ãƒ", "Ã‚", "ï¿½")) {
  Assert-NotContains $allSource $marker "mojibake marker absent: $marker"
}

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-files-ux\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Files UX exactly once; found $($suiteMatches.Count)."
}

Assert-Contains $allSmokeSource 'Name = "Files UX"' "managed smoke suite names Files UX"

Write-Host "[OK] CodexForge Files UX smoke passed."
