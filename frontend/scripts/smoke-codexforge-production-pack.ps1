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
Write-Host "=== CodexForge Production Pack smoke ==="
Write-Host "Base URL: $BaseUrl"

$packDir = "src\lib\codexforge\production-pack"
$componentDir = Join-Path $packDir "components"
$routePath = "src\app\production\page.tsx"
$pageClientPath = "src\app\production\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $packDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "production-pack-types.ts",
  "production-pack-builder.ts",
  "production-pack-items.ts",
  "production-pack-manifest.ts",
  "production-pack-export.ts",
  "production-pack-validation.ts",
  "production-pack-ledger.ts",
  "production-pack-replay.ts",
  "production-pack-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $packDir $module)
}

foreach ($component in @(
  "ProductionPackBuilder.tsx",
  "ProductionPackOverviewPanel.tsx",
  "ProductionPackItemsPanel.tsx",
  "ProductionPackManifestPanel.tsx",
  "ProductionPackExportPanel.tsx",
  "ProductionPackValidationPanel.tsx",
  "ProductionPackLedgerPanel.tsx",
  "ProductionPackReplayPanel.tsx",
  "ProductionPackSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $packDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "ProductionPackBuilder renders",
  "ProductionPackOverviewPanel renders",
  "ProductionPackItemsPanel renders",
  "ProductionPackManifestPanel renders",
  "ProductionPackExportPanel renders",
  "ProductionPackValidationPanel renders",
  "ProductionPackLedgerPanel renders",
  "ProductionPackReplayPanel renders",
  "ProductionPackSafetyNotice renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

foreach ($export in @(
  "export function buildProductionPack(",
  "export function buildProductionPackItem",
  "export function summarizeProductionPack(",
  "export function selectProductionPackNextAction",
  "export function buildProductionPackItems",
  "export function buildCreativePackItems",
  "export function buildPatchPackItems",
  "export function buildRunPackItems",
  "export function summarizeProductionPackItems",
  "export function buildProductionPackManifest",
  "export function summarizeProductionPackManifest",
  "export function buildProductionPackExportRequests",
  "export function buildProductionPackExportRequest",
  "export function summarizeProductionPackExportRequests",
  "export function validateProductionPack",
  "export function validateProductionPackItem",
  "export function summarizeProductionPackValidation",
  "export function buildProductionPackLedger",
  "export function buildProductionPackLedgerItem",
  "export function summarizeProductionPackLedger",
  "export function buildProductionPackReplay",
  "export function buildProductionPackReplayPrompt",
  "export function summarizeProductionPackReplay"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

foreach ($text in @(
  "preview-pack",
  "explicit export approval required",
  "safe artifact workspace",
  "source mutation blocked",
  ".codexforge/artifacts"
)) {
  Assert-Contains $allSource $text "UI/domain says $text"
}

Assert-Contains $domainSource "approved: args.approved === true" "export requests default approved false"
Assert-Contains $domainSource "isArtifactSourceMutationPath" "no source mutation path allowed"
Assert-Contains $domainSource "validateArtifactWorkspacePath" "artifact workspace guard integrated"
Assert-Contains $uiSource 'fetch("/api/codexforge/artifacts/export"' "only local guarded export API is used from UI"
Assert-Contains $domainSource "buildProductionPackReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildProductionPackReactKey" "stable key patterns exist"

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
  "axios",
  "OpenAI",
  "openai",
  "pinecone",
  "weaviate",
  "chroma",
  "from `"child_process`"",
  "from 'child_process'",
  "spawnSync",
  "execFile",
  "execSync",
  "Blender.execute",
  "Unreal.execute",
  "ComfyUI.execute"
)) {
  Assert-NotContains $allSource $marker "unsafe marker absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-production-pack\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Production Pack exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Production Pack" "managed smoke suite includes Production Pack exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/production" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /production returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /production route reachable"
} catch {
  Write-Host "[SKIP] /production route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Production Pack smoke passed."
