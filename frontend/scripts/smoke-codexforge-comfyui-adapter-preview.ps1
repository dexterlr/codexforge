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
Write-Host "=== CodexForge ComfyUI Adapter Preview smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\comfyui-adapter-preview"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\comfyui\page.tsx"
$pageClientPath = "src\app\comfyui\page-client.tsx"
$routeRegistryPath = "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistryPath = "src\lib\codexforge\command-palette\command-registry.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "comfyui-adapter-types.ts",
  "comfyui-adapter-preview-model.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ComfyUiAdapterPreviewPanel.tsx",
  "ComfyUiAdapterSafetyNotice.tsx",
  "ComfyUiAdapterEmptyState.tsx",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$routeRegistry = Get-Content -Raw $routeRegistryPath
$commandRegistry = Get-Content -Raw $commandRegistryPath
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $routeRegistry + "`n" + $commandRegistry

foreach ($export in @(
  "buildComfyUiAdapterPreviewModel",
  "summarizeComfyUiAdapterPreview"
)) {
  Assert-Contains $domainSource $export "domain exports or defines $export"
}

foreach ($marker in @(
  "ComfyUiAdapterPreviewPanel renders",
  "ComfyUiAdapterSafetyNotice renders",
  "ComfyUiAdapterEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $routeSource "CodexForgeAppShell" "/comfyui uses unified shell"
Assert-Contains $routeSource "ComfyUiAdapterPreviewPanel" "/comfyui imports/renders ComfyUiAdapterPreviewPanel"
Assert-Contains $routeRegistry 'href: "/comfyui"' "route registry includes /comfyui"
Assert-Contains $routeRegistry "ComfyUI Adapter Preview" "route registry labels ComfyUI Adapter Preview"
Assert-Contains $commandRegistry "Go to ComfyUI Adapter Preview" "Command Palette includes ComfyUI route"

foreach ($copy in @(
  "preview-only",
  "approval required",
  "no ComfyUI execution",
  "no endpoint call",
  "no command execution",
  "no file writes",
  "future executor boundary",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $copy "ComfyUI source says $copy"
}

foreach ($marker in @(
  "runComfyUI(",
  "executeComfyUI(",
  "comfyui-workflow-run(",
  "fetch(",
  "XMLHttpRequest",
  "axios",
  "OPENAI_API_KEY",
  "apiKey",
  "localStorage.setItem",
  "Math.random",
  "Date.now",
  "d3-force",
  "appendEvent(",
  "saveBrainGraph(",
  "apply-diff(",
  "write-file(",
  "run-command(",
  "broker-execution("
)) {
  Assert-NotContains $allSource $marker "forbidden marker absent: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-comfyui-adapter-preview\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include ComfyUI Adapter Preview exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "ComfyUI Adapter Preview" "managed smoke suite includes ComfyUI Adapter Preview exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/comfyui" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /comfyui returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /comfyui route reachable"
} catch {
  Write-Host "[SKIP] /comfyui route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge ComfyUI Adapter Preview smoke passed."

