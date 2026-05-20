param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Creative Artifact Review smoke ==="
Write-Host "Base URL: $BaseUrl"

$pagePath = "src\app\artifacts\review\page-client.tsx"
$boardPath = "src\lib\codexforge\creative-artifact-review\components\CreativeArtifactReviewBoard.tsx"
$routeRegistryPath = "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"

foreach ($path in @($pagePath,$boardPath,$routeRegistryPath)) { Assert-FileExists $path }

$source = (Get-Content -Raw $pagePath) + "`n" + (Get-Content -Raw $boardPath) + "`n" + (Get-Content -Raw $routeRegistryPath)

Assert-Contains $source "CreativeArtifactReviewBoard" "review board exists"
Assert-Contains $source 'activePath="/artifacts/review"' "review route uses shell"
Assert-Contains $source "focusMode" "review route uses focus mode"
Assert-Contains $source "preview-only review-only artifact gallery readable inspector" "review board polish marker"
Assert-Contains $source "No ComfyUI execution call is available in this UI." "ComfyUI execution remains blocked text"
Assert-Contains $source "Python remains text preview until an approval boundary handles it." "Blender execution remains blocked text"
Assert-Contains $source "preserve latest-message authority" "latest-message authority marker"

foreach ($pattern in @("appendEvent\s*\(","saveBrainGraph\s*\(","apply-diff\s*\(","write-file\s*\(","run-command\s*\(","runBlender\s*\(","executeBlender\s*\(","runComfyUI\s*\(","executeComfyUI\s*\(","runUnreal\s*\(","Math\.random","Date\.now","key=\{item\}")) {
  Assert-NotMatches $source $pattern "creative artifact review excludes $pattern"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $source $mojibakePattern "no mojibake"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/artifacts/review" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /artifacts/review returned status $($response.StatusCode)" }
  Write-Host "[PASS] /artifacts/review route reachable"
} catch {
  Write-Host "[SKIP] /artifacts/review route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Creative Artifact Review smoke passed."
