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

Write-Host ""
Write-Host "=== CodexForge Patch Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$patchDir = "src\lib\codexforge\patch-preview"
$componentsDir = Join-Path $patchDir "components"
$filesUiPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$chatBridgePath = "src\lib\codexforge\files\file-chat-bridge.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $patchDir
Assert-DirectoryExists $componentsDir

$modules = @(
  "patch-preview-types.ts",
  "patch-preview-plan.ts",
  "patch-risk.ts",
  "patch-rollback.ts",
  "patch-test-plan.ts",
  "patch-approval.ts",
  "patch-preview-summary.ts",
  "index.ts"
)

foreach ($module in $modules) {
  Assert-FileExists (Join-Path $patchDir $module)
}

$components = @(
  "PatchPreviewCockpit.tsx",
  "PatchPreviewPlanPanel.tsx",
  "PatchRiskBoard.tsx",
  "PatchTestPlanPanel.tsx",
  "PatchRollbackPanel.tsx",
  "PatchApprovalBoundary.tsx",
  "PatchDiffPreviewPanel.tsx"
)

foreach ($component in $components) {
  Assert-FileExists (Join-Path $componentsDir $component)
}

$patchSource = (Get-ChildItem $patchDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$patchUiSource = (Get-ChildItem $componentsDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$filesUiSource = Get-Content -Raw $filesUiPath
$chatBridgeSource = Get-Content -Raw $chatBridgePath
$allSmokeSource = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export function buildPatchPreviewPlan",
  "export function buildPatchPreviewStep",
  "export function summarizePatchPreviewPlan",
  "export function buildPatchPreviewDiffPlaceholder",
  "export function selectPatchPreviewNextAction",
  "export function scorePatchRisk",
  "export function classifyPatchRisk",
  "export function buildPatchRiskBoard",
  "export function summarizePatchRisk",
  "export function buildPatchTestPlan",
  "export function selectSuggestedSmokeTests",
  "export function summarizePatchTestPlan",
  "export function buildPatchRollbackPlan",
  "export function summarizePatchRollbackPlan",
  "export function buildPatchApprovalBoundary",
  "export function isPatchApplyBlocked",
  "export function summarizePatchApprovalBoundary"
)) {
  Assert-Contains $patchSource $export "expected export $export"
}

Assert-Contains $filesUiSource "PatchPreviewCockpit" "Files UI imports/renders PatchPreviewCockpit"
Assert-Contains $filesUiSource "buildPatchPreviewPlan" "Files UI builds patch preview plan"
Assert-Matches $patchUiSource "preview-only|Preview only" "UI contains preview-only posture"
Assert-Contains $patchUiSource "No file mutation" "UI contains no file mutation boundary"
Assert-Contains $patchUiSource "Approval Boundary" "UI contains approval boundary"
Assert-Contains $patchUiSource "Rollback Panel" "UI contains rollback panel"
Assert-Contains $patchUiSource "Suggested Tests" "UI contains suggested tests panel"
Assert-Contains $patchUiSource "Copy patch prompt" "UI contains copy patch prompt"
Assert-Contains $patchUiSource "Copy test plan" "UI contains copy test plan"
Assert-Contains $chatBridgeSource "Patch preview plan" "Chat handoff includes patch preview plan"
Assert-Contains $chatBridgeSource "Produce a preview diff only" "Chat handoff instructs preview diff only"
Assert-Contains $chatBridgeSource "Do not write files without approval" "Chat handoff blocks writing without approval"

foreach ($marker in @("from `"write-file`"", "from 'write-file'", "from `"apply-diff`"", "from 'apply-diff'", "from `"run-command`"", "from 'run-command'")) {
  Assert-NotContains $patchUiSource $marker "UI mutation import absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch")) {
  Assert-NotContains $patchUiSource $marker "UI file mutation absent: $marker"
}

Assert-NotContains $patchUiSource "broker-execution" "UI does not call broker-execution"
Assert-Contains $patchSource "applyBlocked: true" "apply is blocked in Phase 6"
Assert-Contains $patchSource "Phase 6" "Phase 6 approval boundary"

foreach ($marker in @("Math.random", "Date.now", "d3-force")) {
  Assert-NotContains $patchSource $marker "determinism marker absent: $marker"
}

foreach ($marker in @("fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI")) {
  Assert-NotContains $patchSource $marker "external network or AI dependency absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $patchSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-patch-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Patch Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmokeSource "Patch Preview" "managed smoke suite includes Patch Preview exactly once"

Write-Host "[OK] CodexForge Patch Preview smoke passed."
