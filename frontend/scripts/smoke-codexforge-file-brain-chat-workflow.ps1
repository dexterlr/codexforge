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

Write-Host "=== CodexForge File Brain Chat workflow smoke ==="
Write-Host "Base URL: $BaseUrl"

$filesDir = "src\lib\codexforge\files"
$componentsDir = Join-Path $filesDir "components"
$commandCenterPath = Join-Path $componentsDir "files-command-center.tsx"
$brainContextPath = Join-Path $filesDir "file-brain-context.ts"
$chatBridgePath = Join-Path $filesDir "file-chat-bridge.ts"
$readinessPath = Join-Path $filesDir "file-readiness.ts"
$safeActionPath = Join-Path $filesDir "file-safe-next-action.ts"
$brainPanelPath = Join-Path $componentsDir "FileBrainContextPanel.tsx"
$chatPanelPath = Join-Path $componentsDir "FileChatHandoffPanel.tsx"
$safeActionPanelPath = Join-Path $componentsDir "FileSafeNextActionPanel.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

foreach ($path in @(
  $brainContextPath,
  $chatBridgePath,
  $readinessPath,
  $safeActionPath,
  $brainPanelPath,
  $chatPanelPath,
  $safeActionPanelPath,
  $commandCenterPath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$brainContextSource = Get-Content -Raw $brainContextPath
$chatBridgeSource = Get-Content -Raw $chatBridgePath
$readinessSource = Get-Content -Raw $readinessPath
$safeActionSource = Get-Content -Raw $safeActionPath
$commandCenterSource = Get-Content -Raw $commandCenterPath
$uiSource = (Get-ChildItem $componentsDir -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$filesSource = (Get-ChildItem $filesDir -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$newFeatureSource = @(
  $brainContextSource,
  $chatBridgeSource,
  $readinessSource,
  $safeActionSource,
  (Get-Content -Raw $brainPanelPath),
  (Get-Content -Raw $chatPanelPath),
  (Get-Content -Raw $safeActionPanelPath),
  $commandCenterSource
) -join "`n"
$allSmokeSource = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "export function buildFileBrainContext",
  "export function findRelatedBrainNodesForFile",
  "export function summarizeFileBrainContext",
  "export function rankFileBrainContextNodes",
  "exact-file-path",
  "subsystem",
  "route-component",
  "smoke-test",
  "confidenceScore",
  "emptyState"
)) {
  Assert-Contains $brainContextSource $marker "file-brain-context marker $marker"
}

foreach ($marker in @(
  "export function buildFileToChatPrompt",
  "export function buildFileBrainPromptContext",
  "export function summarizeFileChatBridge",
  "export function buildFileWorkspacePrompt",
  "Inspect the selected file",
  "Do not mutate files",
  "without explicit operator approval"
)) {
  Assert-Contains $chatBridgeSource $marker "file-chat-bridge marker $marker"
}

foreach ($marker in @(
  "export function selectFileSafeNextAction",
  "export function buildFileSafeActionQueue",
  "export function summarizeFileSafeNextAction",
  "Copy brain-aware prompt",
  "Guarded apply later",
  "blocked, preview-only, and approval required"
)) {
  Assert-Contains $safeActionSource $marker "safe next action marker $marker"
}

foreach ($marker in @(
  "export function buildFileReadinessBoard",
  "export function scoreFileReadiness",
  "export function summarizeFileReadiness",
  "Context readiness",
  "Brain memory readiness",
  "Test/smoke readiness",
  "Risk readiness",
  "Review readiness",
  "Apply readiness",
  "blocked, preview-only, and approval required"
)) {
  Assert-Contains $readinessSource $marker "readiness marker $marker"
}

foreach ($marker in @(
  "data-codexforge-file-brain-context-panel",
  "Brain context",
  "data-codexforge-file-chat-handoff-panel",
  "Chat handoff",
  "data-codexforge-copy-brain-aware-prompt",
  "Copy brain-aware prompt",
  "data-codexforge-file-readiness-board",
  "data-codexforge-file-safe-next-action-card",
  "Safe next action",
  "Open in brain view"
)) {
  Assert-Contains $uiSource $marker "Files UI marker $marker"
}

foreach ($marker in @(
  "buildFileBrainContext",
  "buildFileToChatPrompt",
  "buildFileWorkspacePrompt",
  "summarizeFileChatBridge",
  "buildFileReadinessBoard",
  "buildFileSafeActionQueue",
  "selectFileSafeNextAction",
  "FileBrainContextPanel",
  "FileChatHandoffPanel",
  "FileSafeNextActionPanel"
)) {
  Assert-Contains $commandCenterSource $marker "Files command center wires $marker"
}

foreach ($marker in @("write-file", "apply-diff", "run-command")) {
  Assert-NotMatches $uiSource "from\s+[""'][^""']*$marker[""']" "Files UI import absent: $marker"
}

foreach ($marker in @("saveBrainGraph", "loadBrainGraph", "mergeBrainMemoryIngestion", "reduceGraph(", "createBrain", ".nodes.push", ".edges.push", "appendEvent(")) {
  Assert-NotContains $uiSource $marker "Files UI Brain graph mutation absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch", "executeCodexForgeTool")) {
  Assert-NotContains $uiSource $marker "Files UI project mutation absent: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force")) {
  Assert-NotContains $filesSource $marker "deterministic Files marker absent: $marker"
}

foreach ($marker in @("fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI")) {
  Assert-NotContains $newFeatureSource $marker "new workflow has no AI/network call: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $newFeatureSource $mojibakePattern "no mojibake in File Brain Chat workflow files"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-file-brain-chat-workflow\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include File Brain Chat workflow exactly once; found $($suiteMatches.Count)."
}
Write-Host "[PASS] managed smoke suite includes File Brain Chat workflow exactly once"

Write-Host "[OK] CodexForge File Brain Chat workflow smoke passed."
