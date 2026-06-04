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

function Assert-CountExactly {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [int]$Expected, [string]$Name)
  $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count
  if ($count -ne $Expected) { throw "[FAIL] $Name expected $Expected found $count" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Build Warning Path Boundary smoke ==="
Write-Host "Base URL: $BaseUrl"
Write-Host "Build warning path boundary cleanup"
Write-Host "Server-only file helpers stay isolated"
Write-Host "Safe path checks remain enforced"
Write-Host "Arbitrary local browsing remains blocked"
Write-Host "Secret values stay redacted"
Write-Host "Broad dynamic path warnings are tracked"

$serverPathFiles = @(
  "src\lib\codexforge\server-safe-paths\bounded-workspace-path.ts",
  "src\lib\codexforge\server-safe-paths\server-project-path.ts",
  "src\lib\codexforge\server-safe-paths\index.ts",
  "src\lib\codexforge\tools\server-paths.ts"
)

$routeFiles = @(
  "src\app\api\codexforge\artifacts\list\route.ts",
  "src\app\api\codexforge\project\read\route.ts",
  "src\app\api\codexforge\project\search\route.ts",
  "src\app\api\codexforge\project\snapshot\route.ts"
)

$fileHelperFiles = @(
  "src\lib\codexforge\files\server\dependency-trace.ts",
  "src\lib\codexforge\files\server\file-preview.ts",
  "src\lib\codexforge\files\server\project-files.ts"
)

$toolFiles = @(
  "src\lib\codexforge\tools\apply-diff.ts",
  "src\lib\codexforge\tools\generate-diff.ts",
  "src\lib\codexforge\tools\list-files.ts",
  "src\lib\codexforge\tools\read-file.ts",
  "src\lib\codexforge\tools\run-command.ts",
  "src\lib\codexforge\tools\search-project.ts",
  "src\lib\codexforge\tools\snapshot-project.ts"
)

$allSmokePath = "scripts\smoke-codexforge-all.ps1"

foreach ($path in ($serverPathFiles + $routeFiles + $fileHelperFiles + $toolFiles + @($allSmokePath, "README.md"))) {
  Assert-FileExists $path
}

$serverOnlyFiles = $routeFiles + $fileHelperFiles + @(
  "src\lib\codexforge\server-safe-paths\bounded-workspace-path.ts",
  "src\lib\codexforge\server-safe-paths\server-project-path.ts",
  "src\lib\codexforge\tools\server-paths.ts"
) + $toolFiles

foreach ($path in $serverOnlyFiles) {
  $source = Get-Content -Raw $path
  Assert-Contains $source 'import "server-only";' "server-only marker $path"
}

foreach ($path in $routeFiles) {
  $source = Get-Content -Raw $path
  Assert-Contains $source 'export const runtime = "nodejs";' "nodejs runtime marker $path"
  Assert-Contains $source 'export const dynamic = "force-dynamic";' "dynamic marker $path"
}

$safePathSource = ($serverPathFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$routeSource = ($routeFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$fileHelperSource = ($fileHelperFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$toolSource = ($toolFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$cleanupSource = @($safePathSource, $routeSource, $fileHelperSource, $toolSource) -join "`n"
$deterministicCleanupSource = @(
  $safePathSource,
  $routeSource,
  $fileHelperSource,
  (Get-Content -Raw "src\lib\codexforge\tools\apply-diff.ts"),
  (Get-Content -Raw "src\lib\codexforge\tools\generate-diff.ts"),
  (Get-Content -Raw "src\lib\codexforge\tools\list-files.ts"),
  (Get-Content -Raw "src\lib\codexforge\tools\read-file.ts"),
  (Get-Content -Raw "src\lib\codexforge\tools\search-project.ts"),
  (Get-Content -Raw "src\lib\codexforge\tools\snapshot-project.ts")
) -join "`n"

foreach ($marker in @(
  "normalizeSafeRelativePath",
  "joinWorkspacePathFromSafeRelative",
  "resolveBoundedWorkspacePath",
  "isPathInsideWorkspace",
  "resolveCodexForgeServerPath",
  "resolveCodexForgeProjectPath",
  "resolveCodexForgeToolPath",
  "isAbsolutePathInsideBase",
  "CODEXFORGE_PROJECT_ROOT"
)) {
  Assert-Contains $cleanupSource $marker "safe path helper marker $marker"
}

foreach ($marker in @(
  'segment === ".."',
  "relative-path-traversal",
  "relative-path-absolute",
  "path-outside-workspace",
  "unsafeRelativeError",
  "outsideBaseError",
  "Requested path contains unsafe traversal"
)) {
  Assert-Contains $cleanupSource $marker "path boundary marker $marker"
}

foreach ($marker in @(
  "path traversal guard",
  "file size cap",
  "binary guard",
  "no command execution",
  "no writes"
)) {
  Assert-Contains $routeSource $marker "route safety marker $marker"
}

foreach ($marker in @(
  "DRY_RUN_ONLY",
  "dryRun",
  "requiresRuntime",
  "server-only",
  "workspace-guarded",
  "injectedEnvKeys"
)) {
  Assert-Contains $toolSource $marker "tool safety marker $marker"
}

foreach ($pattern in @(
  "path\.resolve\s*\(\s*process\.cwd\s*\(",
  "path\.join\s*\(\s*process\.cwd\s*\(",
  "path\.resolve\s*\(\s*PROJECT_ROOT\s*,",
  "path\.resolve\s*\(\s*pickBasePath\s*\(",
  "path\.join\s*\(\s*root\s*,\s*\.\.\.",
  "path\.join\s*\(\s*workspaceRoot\s*,\s*\.\.\."
)) {
  Assert-NotMatches $cleanupSource $pattern "broad dynamic path warning pattern absent $pattern"
}

$clientFiles = Get-ChildItem "src" -Recurse -File -Include *.ts,*.tsx | Where-Object {
  $head = Get-Content -Path $_.FullName -TotalCount 5 -ErrorAction SilentlyContinue
  (($head -join "`n") -match '^[\s\xEF\xBB\xBF]*["'']use client["'']') -or
    $_.Name -eq "page-client.tsx" -or
    $_.FullName -match "\\components\\"
}

$serverImportPattern = '^\s*import\s+.*(files/server|server-safe-paths|codexforge/tools/(apply-diff|generate-diff|list-files|read-file|run-command|search-project|snapshot-project|server-paths))'
$serverImportViolations = @(
  $clientFiles | Select-String -Pattern $serverImportPattern | ForEach-Object {
    "$($_.Path):$($_.LineNumber):$($_.Line.Trim())"
  }
)

if ($serverImportViolations.Count -gt 0) {
  throw "[FAIL] Client components import server-only file helpers directly: $($serverImportViolations -join '; ')"
}
Write-Host "[PASS] no client component imports server-only file helpers directly"

$appSourceForSecretPatterns = (
  Get-ChildItem "src" -Recurse -File -Include *.ts,*.tsx |
    ForEach-Object { Get-Content -Raw $_.FullName }
) -join "`n"
$readmeSource = Get-Content -Raw "README.md"

Assert-Contains $readmeSource "Secrets are redacted" "README secret redaction marker"
Assert-NotMatches $appSourceForSecretPatterns 'localStorage\.setItem\s*\(\s*["''][^"'']*(api|key|token|secret)' "no localStorage API key storage"
Assert-NotMatches $appSourceForSecretPatterns 'console\.(log|warn|error)\s*\([^\r\n]*process\.env' "no process.env printing"
Assert-NotMatches $appSourceForSecretPatterns '(?<![A-Za-z0-9_-])sk-[A-Za-z0-9_-]{32,}|(?<![A-Za-z0-9_-])AIza[0-9A-Za-z_-]{20,}|(?<![A-Za-z0-9_-])xox[baprs]-[0-9A-Za-z-]{20,}' "no hardcoded secret token patterns"

Assert-NotContains $deterministicCleanupSource "Math.random" "no Math.random in path-boundary cleanup scope"
Assert-NotContains $deterministicCleanupSource "Date.now" "no Date.now in deterministic path-boundary cleanup scope"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches ($safePathSource + "`n" + $routeSource + "`n" + $fileHelperSource) $mojibakePattern "no mojibake in cleanup helper and route surface"

$allSmokeSource = Get-Content -Raw $allSmokePath
Assert-CountExactly $allSmokeSource "smoke-codexforge-build-warning-path-boundary.ps1" 1 "managed smoke suite includes Build Warning Path Boundary exactly once"
Assert-CountExactly $allSmokeSource "Build Warning Path Boundary" 1 "managed smoke suite labels Build Warning Path Boundary exactly once"

Write-Host "[OK] CodexForge Build Warning Path Boundary smoke passed."
