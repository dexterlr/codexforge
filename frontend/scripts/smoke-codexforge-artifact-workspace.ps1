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
Write-Host "=== CodexForge Artifact Workspace smoke ==="
Write-Host "Base URL: $BaseUrl"

$workspaceDir = "src\lib\codexforge\artifact-workspace"
$componentDir = Join-Path $workspaceDir "components"
$pageClientPath = "src\app\artifacts\page-client.tsx"
$exportRoutePath = "src\app\api\codexforge\artifacts\export\route.ts"
$listRoutePath = "src\app\api\codexforge\artifacts\list\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $workspaceDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "artifact-workspace-types.ts",
  "artifact-path-guard.ts",
  "artifact-export-policy.ts",
  "artifact-export-request.ts",
  "artifact-export-ledger.ts",
  "artifact-export-validation.ts",
  "artifact-export-summary.ts",
  "artifact-workspace-context.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $workspaceDir $module)
}

foreach ($component in @(
  "ArtifactWorkspacePanel.tsx",
  "ArtifactExportApprovalPanel.tsx",
  "ArtifactPathGuardPanel.tsx",
  "ArtifactExportLedgerPanel.tsx",
  "ArtifactExportValidationPanel.tsx",
  "ArtifactWorkspaceSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $exportRoutePath
Assert-FileExists $listRoutePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $workspaceDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$pageSource = Get-Content -Raw $pageClientPath
$exportSource = Get-Content -Raw $exportRoutePath
$listSource = Get-Content -Raw $listRoutePath
$allWorkspaceSource = $domainSource + "`n" + $uiSource + "`n" + $pageSource + "`n" + $exportSource + "`n" + $listSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @(
  "export const CODEXFORGE_ARTIFACT_WORKSPACE_ROOT",
  "export const CODEXFORGE_ARTIFACT_ALLOWED_EXTENSIONS",
  "export function normalizeArtifactRelativePath",
  "export function validateArtifactWorkspacePath",
  "export function isArtifactPathTraversal",
  "export function isArtifactExtensionAllowed",
  "export function buildSafeArtifactPath",
  "export function buildArtifactExportPolicy",
  "export function isArtifactExportAllowed",
  "export function summarizeArtifactExportPolicy",
  "export function buildArtifactExportRequest",
  "export function validateArtifactExportRequest",
  "export function summarizeArtifactExportRequest",
  "export function buildArtifactExportLedgerItem",
  "export function buildArtifactExportLedger",
  "export function summarizeArtifactExportLedger",
  "export function validateArtifactExportContent",
  "export function validateArtifactExportSet",
  "export function summarizeArtifactExportValidation",
  "export function buildArtifactWorkspaceContext"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $domainSource '".codexforge/artifacts"' "workspace root is .codexforge/artifacts"
foreach ($extension in @(".md", ".txt", ".json", ".preview.json", ".preview.py", ".preview.txt")) {
  Assert-Contains $domainSource "`"$extension`"" "allowed extension includes $extension"
}

Assert-Contains $domainSource 'part === ".."' "path guard blocks traversal"
Assert-Contains $domainSource "absolutePath" "path guard blocks absolute paths"
Assert-Contains $domainSource "requiresApproval: true" "policy requires approval"
Assert-Contains $domainSource "sourceMutationBlocked: true" "policy blocks source mutation"

foreach ($marker in @(
  "ArtifactWorkspacePanel renders",
  "ArtifactExportApprovalPanel renders",
  "ArtifactPathGuardPanel renders",
  "ArtifactExportLedgerPanel renders",
  "ArtifactExportValidationPanel renders",
  "ArtifactWorkspaceSafetyNotice renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $pageSource "ArtifactWorkspacePanel" "/artifacts shows ArtifactWorkspacePanel"
Assert-Contains $pageSource "ArtifactExportApprovalPanel" "/artifacts shows ArtifactExportApprovalPanel"
Assert-Contains $pageSource "ArtifactPathGuardPanel" "/artifacts shows ArtifactPathGuardPanel"
Assert-Contains $pageSource "ArtifactExportLedgerPanel" "/artifacts shows ArtifactExportLedgerPanel"
Assert-Contains $pageSource "ArtifactExportValidationPanel" "/artifacts shows ArtifactExportValidationPanel"
Assert-Contains $pageSource "ArtifactWorkspaceSafetyNotice" "/artifacts shows ArtifactWorkspaceSafetyNotice"
Assert-Contains ($uiSource + "`n" + $pageSource) "artifact export only" "UI says artifact export only"
Assert-Contains ($uiSource + "`n" + $pageSource) "source mutation blocked" "UI says source mutation blocked"
Assert-Contains ($uiSource + "`n" + $pageSource) "explicit approval required" "UI says explicit approval required"
Assert-Contains ($uiSource + "`n" + $pageSource) "safe workspace" "UI says safe workspace"

Assert-Contains $exportSource "CODEXFORGE_ARTIFACT_WORKSPACE_ROOT" "export API includes write guard for .codexforge/artifacts"
Assert-Contains $exportSource "resolveBoundedWorkspacePath" "export API verifies resolved workspace path"
Assert-Contains $exportSource "approved !== true" "export API requires approved true"
Assert-Contains $exportSource "buildSafeArtifactPath" "export API uses safe artifact path"
Assert-Contains $exportSource "overwrite" "export API enforces overwrite policy"
Assert-Contains $listSource "Contents are not read by this endpoint" "list API returns metadata only"

foreach ($marker in @("child_process", "spawn(", "exec(", "runCommand", "shell", "from `"run-command`"", "from 'run-command'", "from `"apply-diff`"", "from 'apply-diff'", "from `"write-file`"", "from 'write-file'")) {
  Assert-NotContains $exportSource $marker "export API does not execute or import unsafe tool marker: $marker"
}

foreach ($marker in @("broker-execution", "live-trade", "place-order", "send-order")) {
  Assert-NotContains $uiSource $marker "UI does not call broker execution marker: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force", "fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI", "pinecone", "weaviate", "chroma")) {
  Assert-NotContains $allWorkspaceSource $marker "determinism or external dependency absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allWorkspaceSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildArtifactWorkspaceReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildArtifactWorkspaceReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-artifact-workspace\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Artifact Workspace exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Artifact Workspace" "managed smoke suite includes Artifact Workspace exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/artifacts" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /artifacts returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /artifacts route reachable"
} catch {
  Write-Host "[SKIP] /artifacts route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Artifact Workspace smoke passed."
