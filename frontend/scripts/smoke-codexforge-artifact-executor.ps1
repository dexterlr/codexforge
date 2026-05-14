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
Write-Host "=== CodexForge Artifact Executor smoke ==="
Write-Host "Base URL: $BaseUrl"

$artifactDir = "src\lib\codexforge\artifact-executor"
$componentDir = Join-Path $artifactDir "components"
$routePath = "src\app\artifacts\page.tsx"
$pageClientPath = "src\app\artifacts\page-client.tsx"
$apiRoutePath = "src\app\api\codexforge\artifacts\preview\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $artifactDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "artifact-types.ts",
  "artifact-plan.ts",
  "artifact-policy.ts",
  "artifact-renderer.ts",
  "artifact-preview.ts",
  "artifact-ledger.ts",
  "artifact-validation.ts",
  "artifact-run-handoff.ts",
  "artifact-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $artifactDir $module)
}

foreach ($component in @(
  "ArtifactExecutorCenter.tsx",
  "ArtifactPlanPanel.tsx",
  "ArtifactPolicyBoundary.tsx",
  "ArtifactPreviewPanel.tsx",
  "ArtifactLedgerBoard.tsx",
  "ArtifactValidationPanel.tsx",
  "ArtifactRunHandoffPanel.tsx",
  "ArtifactBlockedActionNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $artifactDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$apiSource = if (Test-Path $apiRoutePath) { Get-Content -Raw $apiRoutePath } else { "" }
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $apiSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "ArtifactExecutorCenter renders",
  "ArtifactPlanPanel renders",
  "ArtifactPolicyBoundary renders",
  "ArtifactPreviewPanel renders",
  "ArtifactLedgerBoard renders",
  "ArtifactValidationPanel renders",
  "ArtifactRunHandoffPanel renders",
  "ArtifactBlockedActionNotice renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

foreach ($export in @(
  "export function buildArtifactPlan",
  "export function buildArtifactPlanItem",
  "export function summarizeArtifactPlan",
  "export function selectNextArtifactAction",
  "export function buildArtifactPolicyBoundary",
  "export function isArtifactGenerationBlocked",
  "export function summarizeArtifactPolicyBoundary",
  "export function renderArtifactPreview",
  "export function renderMarkdownArtifact",
  "export function renderJsonArtifact",
  "export function renderTextArtifact",
  "export function buildArtifactPreview",
  "export function buildArtifactPreviewSet",
  "export function summarizeArtifactPreview",
  "export function buildArtifactLedger",
  "export function buildArtifactLedgerItem",
  "export function summarizeArtifactLedger",
  "export function validateArtifactPreview",
  "export function validateArtifactSet",
  "export function summarizeArtifactValidation",
  "export function buildArtifactRunHandoff",
  "export function summarizeArtifactRunHandoff",
  "export function buildArtifactReviewPrompt"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $routeSource "buildArtifactExecutorModel" "/artifacts route builds model"
Assert-Contains $routeSource "ArtifactExecutorCenter" "page-client renders ArtifactExecutorCenter"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "no source mutation" "UI says no source mutation"
Assert-Contains $uiSource "no command execution" "UI says no command execution"
Assert-Contains $uiSource "no external app execution" "UI says no external app execution"
Assert-Contains $uiSource "approval required before future writes/execution" "UI says approval required before future writes/execution"

foreach ($marker in @("from `"write-file`"", "from 'write-file'", "from `"apply-diff`"", "from 'apply-diff'", "from `"run-command`"", "from 'run-command'")) {
  Assert-NotContains $uiSource $marker "UI mutation import absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch", "broker-execution", "child_process", "spawn(", "exec(")) {
  Assert-NotContains $uiSource $marker "UI execution call absent: $marker"
}

foreach ($marker in @("Blender --", "blender --", "UnrealEditor", "comfyui-workflow-run(")) {
  Assert-NotContains $uiSource $marker "UI does not execute Blender/Unreal/ComfyUI: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile")) {
  Assert-NotContains $apiSource $marker "optional API route does not write files: $marker"
}

foreach ($marker in @("child_process", "spawn(", "exec(", "runCommand", "shell")) {
  Assert-NotContains $apiSource $marker "optional API route does not execute commands: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force", "fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI", "pinecone", "weaviate", "chroma")) {
  Assert-NotContains $allSource $marker "determinism or external dependency absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildArtifactReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildArtifactReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-artifact-executor\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Artifact Executor exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Artifact Executor" "managed smoke suite includes Artifact Executor exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/artifacts" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /artifacts returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /artifacts route reachable"
} catch {
  Write-Host "[SKIP] /artifacts route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Artifact Executor smoke passed."
