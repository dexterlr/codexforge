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

Write-Host "=== CodexForge File Workflow smoke ==="
Write-Host "Base URL: $BaseUrl"

$filesDir = "src\lib\codexforge\files"
$componentsDir = Join-Path $filesDir "components"
$commandCenterPath = Join-Path $componentsDir "files-command-center.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

$domainFiles = @(
  "$filesDir\file-workflow.ts",
  "$filesDir\file-readiness.ts",
  "$filesDir\file-safe-plan.ts",
  "$filesDir\file-cognitive-context.ts",
  "$filesDir\file-command-palette.ts"
)

$componentFiles = @(
  "$componentsDir\FileCognitiveContextPanel.tsx",
  "$componentsDir\FileWorkflowRail.tsx",
  "$componentsDir\FileReadinessBoard.tsx",
  "$componentsDir\FileSafePlanPanel.tsx",
  "$componentsDir\FilesCommandPalette.tsx",
  "$componentsDir\FileOpenInBrainLink.tsx"
)

foreach ($path in $domainFiles + $componentFiles + @($commandCenterPath, $allSmokePath)) {
  Assert-FileExists $path
}

$workflowSource = Get-Content -Raw "$filesDir\file-workflow.ts"
$contextSource = Get-Content -Raw "$filesDir\file-cognitive-context.ts"
$readinessSource = Get-Content -Raw "$filesDir\file-readiness.ts"
$safePlanSource = Get-Content -Raw "$filesDir\file-safe-plan.ts"
$paletteSource = Get-Content -Raw "$filesDir\file-command-palette.ts"
$commandCenterSource = Get-Content -Raw $commandCenterPath
$safePlanPanelSource = Get-Content -Raw "$componentsDir\FileSafePlanPanel.tsx"
$uiSource = (Get-ChildItem $componentsDir -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$filesSource = (Get-ChildItem $filesDir -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmokeSource = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "export function buildFileWorkflow",
  "export function summarizeFileWorkflow",
  "export function buildFileWorkflowStep",
  "export function selectNextFileWorkflowAction",
  "inspect",
  "understand",
  "plan",
  "preview",
  "approve",
  "apply via guarded tool later"
)) {
  Assert-Contains $workflowSource $marker "workflow export/step $marker"
}

foreach ($marker in @(
  "export function buildFileCognitiveContext",
  "export function summarizeFileCognitiveContext",
  "export function rankFileContextSignals",
  "runtime-health",
  "memory-cluster",
  "topology-hint",
  "brain-node"
)) {
  Assert-Contains $contextSource $marker "cognitive context marker $marker"
}

foreach ($marker in @(
  "export function buildFileReadinessBoard",
  "export function scoreFileReadiness",
  "export function summarizeFileReadiness",
  "safety-readiness",
  "test-readiness",
  "context-readiness",
  "brain-readiness",
  "review-readiness",
  "apply-readiness",
  "preview-only"
)) {
  Assert-Contains $readinessSource $marker "readiness marker $marker"
}

foreach ($marker in @(
  "export function buildSafeFilePlan",
  "export function summarizeSafeFilePlan",
  "export function buildSafeFilePlanChecklist",
  "Preview required before any write",
  "No file mutation happens from this panel",
  "Apply must go through guarded tool approval",
  "noWriteExecution"
)) {
  Assert-Contains $safePlanSource $marker "safe plan marker $marker"
}

foreach ($marker in @(
  "export function buildFilesCommandPalette",
  "Search files",
  "Focus selected file",
  "Show risk",
  "Show related context",
  "Prepare safe plan",
  "Copy file path",
  "Open brain view hint",
  "Open chat prompt hint",
  "Ctrl/Cmd+K"
)) {
  Assert-Contains $paletteSource $marker "command palette marker $marker"
}

foreach ($marker in @(
  "data-codexforge-file-workflow-rail",
  "data-codexforge-file-cognitive-context-panel",
  "data-codexforge-file-readiness-board",
  "data-codexforge-file-safe-plan-panel",
  "data-codexforge-files-command-palette",
  "data-codexforge-file-open-in-brain-link"
)) {
  Assert-Contains $uiSource $marker "UI marker $marker"
}

foreach ($marker in @(
  "FileWorkflowRail",
  "FileCognitiveContextPanel",
  "FileReadinessBoard",
  "FileSafePlanPanel",
  "FilesCommandPalette",
  "buildFileWorkflow"
)) {
  Assert-Contains $commandCenterSource $marker "FilesCommandCenter renders $marker"
}

Assert-Contains $safePlanPanelSource "Preview required before any write" "safe plan preview language"
Assert-Contains $safePlanPanelSource "No file mutation happens from this panel" "safe plan no mutation language"

foreach ($marker in @("write-file", "apply-diff", "run-command")) {
  Assert-NotMatches $uiSource "from\s+[""'][^""']*$marker[""']" "Files UI import absent: $marker"
  Assert-NotContains $uiSource $marker "Files UI command marker absent: $marker"
}

foreach ($marker in @("saveBrainGraph", "reduceGraph(", "createBrain", ".nodes.push", ".edges.push")) {
  Assert-NotContains $uiSource $marker "direct graph mutation absent: $marker"
}

Assert-NotContains $uiSource "appendEvent(" "append event call absent from Files UI"

foreach ($marker in @("Math.random", "Date.now", "d3-force", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector")) {
  Assert-NotContains $filesSource $marker "banned deterministic marker absent: $marker"
}

foreach ($marker in @("fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI", "https://", "http://")) {
  Assert-NotContains $filesSource $marker "external network/AI dependency absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $filesSource $mojibakePattern "no mojibake in File workflow files"
Assert-Contains $filesSource "buildCodexForgeFileReactKey" "stable key helper or stable key patterns exist"

$fileWorkflowMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-file-workflow\.ps1")
if ($fileWorkflowMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include File workflow exactly once; found $($fileWorkflowMatches.Count)."
}
Write-Host "[PASS] managed smoke suite includes File workflow exactly once"

foreach ($scriptName in @(
  "smoke-codexforge-files-command-center.ps1",
  "smoke-codexforge-brain-runtime.ps1",
  "smoke-codexforge-cognitive-memory.ps1"
)) {
  $matches = [regex]::Matches($allSmokeSource, [regex]::Escape($scriptName))
  if ($matches.Count -ne 1) {
    throw "[FAIL] Managed smoke suite must include $scriptName exactly once; found $($matches.Count)."
  }
  Write-Host "[PASS] managed smoke suite keeps $scriptName exactly once"
}

Write-Host "[OK] CodexForge File Workflow smoke passed."
