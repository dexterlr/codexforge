param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Turbopack Warning Cleanup smoke ==="
Write-Host "Base URL: $BaseUrl"

$safePathDir = "src\lib\codexforge\server-safe-paths"
$safeIndexPath = Join-Path $safePathDir "index.ts"
$workspacePath = Join-Path $safePathDir "bounded-workspace-path.ts"
$projectPath = Join-Path $safePathDir "bounded-project-path.ts"
$typesPath = Join-Path $safePathDir "server-safe-paths-types.ts"
$artifactRoutePath = "src\app\api\codexforge\artifacts\export\route.ts"
$memoryAppendPath = "src\app\api\codexforge\memory\events\append\route.ts"
$memoryListPath = "src\app\api\codexforge\memory\events\list\route.ts"
$dependencyTracePath = "src\lib\codexforge\files\server\dependency-trace.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $safePathDir
foreach ($path in @($safeIndexPath, $workspacePath, $projectPath, $typesPath, $artifactRoutePath, $memoryAppendPath, $memoryListPath, $dependencyTracePath, $allSmokePath)) {
  Assert-FileExists $path
}

$safeSource = (Get-ChildItem $safePathDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw $safeIndexPath
$artifactSource = Get-Content -Raw $artifactRoutePath
$memoryAppendSource = Get-Content -Raw $memoryAppendPath
$memoryListSource = Get-Content -Raw $memoryListPath
$dependencySource = Get-Content -Raw $dependencyTracePath
$allSmokeSource = Get-Content -Raw $allSmokePath
$touchedApiSource = @($artifactSource, $memoryAppendSource, $memoryListSource) -join "`n"
$allTouchedSource = @($safeSource, $artifactSource, $memoryAppendSource, $memoryListSource, $dependencySource) -join "`n"

foreach ($export in @(
  "normalizeSafeRelativePath",
  "joinWorkspacePathFromSafeRelative",
  "resolveBoundedWorkspacePath",
  "isPathInsideWorkspace",
  "toPortableRelativePath",
  "resolveImportSpecifierPath",
  "summarizeBoundedPathCheck"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

Assert-Contains $artifactSource "server-safe-paths" "artifact export route imports server-safe-paths"
Assert-Contains $memoryAppendSource "server-safe-paths" "memory append route imports server-safe-paths"
Assert-Contains $memoryListSource "server-safe-paths" "memory list route imports server-safe-paths"

Assert-NotContains $artifactSource "path.resolve(workspaceRoot, validation.pathValidation.normalizedPath)" "artifact route removed dynamic path.resolve"
Assert-NotContains $memoryAppendSource "path.resolve(workspaceRoot, validation.pathValidation.normalizedPath)" "memory append route removed dynamic path.resolve"
Assert-NotContains $memoryListSource "path.resolve(workspaceRoot, validation.normalizedPath)" "memory list route removed dynamic path.resolve"
Assert-NotContains $dependencySource "path.resolve(root, path.dirname(fromPath), specifier)" "dependency trace removed project-root import path.resolve"
Assert-Contains $dependencySource "resolveImportSpecifierPath" "dependency trace uses portable normalized path resolver"

Assert-Contains $safeSource 'segment === ".."' "traversal is still blocked"
Assert-Contains $safeSource "isAbsoluteInput" "absolute paths are still blocked"
Assert-Contains $artifactSource "sourceMutationAttempt" "artifact route still blocks source mutation attempts"
Assert-Contains $memoryAppendSource "sourceMutationAttempt" "memory append route still blocks source mutation attempts"
Assert-Contains $memoryAppendSource "noAutoPromotion: true" "memory event metadata still includes noAutoPromotion"
Assert-Contains $artifactSource "artifact export only" "artifact export still says artifact export only"
Assert-Contains $artifactSource "source mutation blocked" "artifact export still says source mutation blocked"

foreach ($marker in @("run-command", "apply-diff", "broker-execution")) {
  Assert-NotContains $touchedApiSource $marker "touched API routes avoid unsafe execution marker: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "localStorage", "process.env", "Math.random", "Date.now")) {
  Assert-NotContains $allTouchedSource $marker "banned marker absent from touched server files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allTouchedSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-turbopack-warning-cleanup\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Turbopack Warning Cleanup exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmokeSource "Turbopack Warning Cleanup" "managed smoke suite includes Turbopack Warning Cleanup exactly once"

Write-Host "[OK] CodexForge Turbopack Warning Cleanup smoke passed."
