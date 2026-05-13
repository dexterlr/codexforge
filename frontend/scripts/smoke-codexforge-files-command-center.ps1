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

Assert-FileExists $pagePath
Assert-FileExists $pageClientPath
Assert-DirectoryExists $filesDir

foreach ($path in @(
  "$filesDir\file-types.ts",
  "$filesDir\file-intelligence.ts",
  "$filesDir\file-risk.ts",
  "$filesDir\file-search.ts",
  "$filesDir\file-context.ts",
  "$filesDir\index.ts",
  "$componentsDir\FilesCommandCenter.tsx",
  "$componentsDir\FileTree.tsx",
  "$componentsDir\FileInspector.tsx",
  "$componentsDir\FileActionBar.tsx",
  "$componentsDir\FileRiskBadge.tsx",
  "$componentsDir\RelatedFilesPanel.tsx",
  "$componentsDir\SafeEditPreview.tsx",
  "$componentsDir\FileTimeline.tsx",
  "$componentsDir\files-command-center.tsx",
  "$componentsDir\file-tree.tsx",
  "$componentsDir\file-inspector.tsx",
  "$componentsDir\file-risk-badge.tsx",
  "$componentsDir\related-files-panel.tsx",
  "$componentsDir\safe-edit-preview.tsx",
  "$componentsDir\file-timeline.tsx"
)) {
  Assert-FileExists $path
}

if (Test-Path $routePath) {
  Assert-FileExists $routePath
}

$pageSource = Get-Content -Raw $pagePath
$pageClientSource = Get-Content -Raw $pageClientPath
$routeSource = if (Test-Path $routePath) { Get-Content -Raw $routePath } else { "" }
$contextSource = Get-Content -Raw "$filesDir\file-context.ts"
$intelligenceSource = Get-Content -Raw "$filesDir\file-intelligence.ts"
$riskSource = Get-Content -Raw "$filesDir\file-risk.ts"
$searchSource = Get-Content -Raw "$filesDir\file-search.ts"
$commandCenterSource = Get-Content -Raw "$componentsDir\files-command-center.tsx"
$fileTreeSource = Get-Content -Raw "$componentsDir\file-tree.tsx"
$fileInspectorSource = Get-Content -Raw "$componentsDir\file-inspector.tsx"
$actionBarSource = Get-Content -Raw "$componentsDir\file-action-bar.tsx"
$riskBadgeSource = Get-Content -Raw "$componentsDir\file-risk-badge.tsx"
$relatedSource = Get-Content -Raw "$componentsDir\related-files-panel.tsx"
$safePreviewSource = Get-Content -Raw "$componentsDir\safe-edit-preview.tsx"
$timelineSource = Get-Content -Raw "$componentsDir\file-timeline.tsx"
$uiSource = (Get-ChildItem $componentsDir -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$domainSource = (Get-ChildItem $filesDir -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allFilesSource = (Get-ChildItem $filesDir -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmokeSource = Get-Content -Raw $allSmokePath

Assert-Contains $pageSource "buildCodexForgeFilesContext" "route loads read-only files context"
Assert-Contains $pageSource "FilesPageClient" "route delegates to client"
Assert-Contains $pageClientSource '"use client"' "page-client is client boundary"
Assert-Contains $pageClientSource "FilesCommandCenter" "page-client renders FilesCommandCenter"

if ($routeSource) {
  Assert-Contains $routeSource "export async function GET" "optional files API is read-only GET"
  Assert-Contains $routeSource "buildCodexForgeFilesContext" "optional API reuses read-only context"
  Assert-NotMatches $routeSource "export\s+async\s+function\s+(POST|PUT|PATCH|DELETE)" "Files API exposes no mutation method"
}

foreach ($marker in @(
  "export function calculateFileRisk",
  "write-run-build-keyword",
  "safety-policy-code",
  "Runtime/graph/memory surface"
)) {
  Assert-Contains $riskSource $marker "deterministic risk helper marker $marker"
}

foreach ($marker in @(
  "export function inferFileKind",
  "export function inferOwnerArea",
  "export function inferArchitectureRole",
  "export function inferRelatedConcepts",
  "export function summarizeFilePurpose",
  "export function inferSafeNextActions"
)) {
  Assert-Contains $intelligenceSource $marker "deterministic intelligence helper $marker"
}

foreach ($marker in @(
  "export function normalizeFileSearchQuery",
  "export function buildCodexForgeFileReactKey",
  "export function getCodexForgeFileCategory",
  "export function scoreFileSearchMatch",
  "export function searchFiles"
)) {
  Assert-Contains $searchSource $marker "deterministic search helper $marker"
}

foreach ($marker in @(
  "collectCodexForgeProjectFiles",
  "buildDependencyTrace",
  "buildFilePreviews",
  "buildRuntimeFileContextSignals",
  "buildPredictiveFileContextSummary",
  "relateFilesDeterministically"
)) {
  Assert-Contains $contextSource $marker "readonly context helper $marker"
}

foreach ($marker in @(
  "data-codexforge-files-command-center",
  "data-codexforge-file-tree",
  "data-codexforge-file-inspector",
  "data-codexforge-file-action-bar",
  "data-codexforge-file-risk-badge",
  "data-codexforge-related-files-panel",
  "data-codexforge-safe-edit-preview",
  "data-codexforge-file-timeline",
  "data-codexforge-files-responsive-layout",
  "data-codexforge-files-overflow-guard"
)) {
  Assert-Contains $uiSource $marker "UI marker $marker"
}

foreach ($component in @(
  @{ Name = "FilesCommandCenter"; Source = $commandCenterSource },
  @{ Name = "FileTree"; Source = $fileTreeSource },
  @{ Name = "FileInspector"; Source = $fileInspectorSource },
  @{ Name = "FileActionBar"; Source = $actionBarSource },
  @{ Name = "FileRiskBadge"; Source = $riskBadgeSource },
  @{ Name = "RelatedFilesPanel"; Source = $relatedSource },
  @{ Name = "SafeEditPreview"; Source = $safePreviewSource },
  @{ Name = "FileTimeline"; Source = $timelineSource }
)) {
  Assert-Contains $component.Source "export function $($component.Name)" "$($component.Name) exported"
}

foreach ($marker in @(
  "App routes",
  "API routes",
  "Components",
  "Runtime",
  "Tools",
  "Brain",
  "Docs",
  "Scripts",
  "Config",
  "Tests/Smoke"
)) {
  Assert-Contains $fileTreeSource $marker "FileTree category $marker"
}

foreach ($marker in @(
  "Why it matters",
  "Safe next action",
  "Suggested validation",
  "read-only"
)) {
  Assert-Contains $fileInspectorSource $marker "FileInspector detail $marker"
}

foreach ($marker in @(
  "preview-only",
  "no overwrite",
  "preview and approval",
  "inspect -&gt; plan -&gt; preview diff -&gt; approve -&gt; apply via guarded tool"
)) {
  Assert-Contains $safePreviewSource $marker "SafeEditPreview safety language $marker"
}

foreach ($marker in @("write-file", "apply-diff", "run-command", "writeFileTool", "applyPatch", "executeCodexForgeTool")) {
  Assert-NotContains $uiSource $marker "Files UI mutation import/call absent: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $allFilesSource $marker "banned deterministic intelligence marker absent: $marker"
}

foreach ($marker in @("fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI")) {
  Assert-NotContains $domainSource $marker "external network/AI dependency absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "saveBrainGraph")) {
  Assert-NotContains $uiSource $marker "UI mutation marker absent: $marker"
}

Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "Files UI does not import write-file"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "Files UI does not import apply-diff"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "Files UI does not import run-command"
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allFilesSource $mojibakePattern "no mojibake in Files Command Center files"
Assert-Contains $searchSource "buildCodexForgeFileReactKey" "stable key helper exists"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-files-command-center\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Files Command Center exactly once; found $($suiteMatches.Count)."
}
Write-Host "[PASS] managed smoke suite includes Files Command Center exactly once"

Write-Host "[OK] CodexForge Files Command Center smoke passed."
