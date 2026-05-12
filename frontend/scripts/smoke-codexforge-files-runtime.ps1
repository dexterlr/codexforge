param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

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
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Haystack -notmatch $Pattern) { throw "[FAIL] Missing $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Pattern,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge Files runtime smoke ==="
Write-Host "Base URL: $BaseUrl"

$routePath = "src\app\api\codexforge\files\route.ts"
$serverDir = "src\lib\codexforge\files\server"
$projectFilesPath = Join-Path $serverDir "project-files.ts"
$previewPath = Join-Path $serverDir "file-preview.ts"
$dependencyPath = Join-Path $serverDir "dependency-trace.ts"
$runtimeContextPath = Join-Path $serverDir "runtime-file-context.ts"
$serverIndexPath = Join-Path $serverDir "index.ts"
$commandCenterPath = "src\lib\codexforge\files\components\files-command-center.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $routePath
Assert-DirectoryExists $serverDir
Assert-FileExists $projectFilesPath
Assert-FileExists $previewPath
Assert-FileExists $dependencyPath
Assert-FileExists $runtimeContextPath
Assert-FileExists $serverIndexPath

$routeSource = Get-Content -Raw $routePath
$projectSource = Get-Content -Raw $projectFilesPath
$previewSource = Get-Content -Raw $previewPath
$dependencySource = Get-Content -Raw $dependencyPath
$runtimeContextSource = Get-Content -Raw $runtimeContextPath
$serverIndexSource = Get-Content -Raw $serverIndexPath
$commandCenterSource = Get-Content -Raw $commandCenterPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$serverSource = @(
  $routeSource,
  $projectSource,
  $previewSource,
  $dependencySource,
  $runtimeContextSource,
  $serverIndexSource
) -join "`n"
$allFilesSource = @(
  $serverSource,
  $commandCenterSource
) -join "`n"

Assert-Matches $routeSource "export\s+async\s+function\s+GET" "route exposes GET"
foreach ($method in @("POST", "PUT", "PATCH", "DELETE")) {
  Assert-NotMatches $routeSource "export\s+async\s+function\s+$method" "route does not expose $method"
}

foreach ($marker in @("read-only", "bounded", "MAX_FILE_COUNT", "MAX_PREVIEW_LENGTH", "MAX_SCAN_ENTRIES")) {
  Assert-Contains $serverSource $marker "read-only/bounded scan protection $marker"
}

foreach ($folder in @("node_modules", ".next", ".git", "dist", "build", "coverage", ".codexforge")) {
  Assert-Contains $serverSource $folder "skips heavy folder $folder"
}

foreach ($marker in @("writeFile", "appendFile", "unlink", "rm(", "rmdir", "mkdir", "spawn", "exec(", "execFile", "child_process")) {
  Assert-NotContains $serverSource $marker "server/helper mutation or command marker absent: $marker"
}

Assert-Contains $commandCenterSource '"/api/codexforge/files"' "FilesCommandCenter uses Files API path"
Assert-Contains $commandCenterSource "globalThis.fetch" "FilesCommandCenter reads API with browser fetch"
foreach ($marker in @("loading", "fallback", "Read-only Files API", "Fixture fallback", "Live read-only intelligence")) {
  Assert-Contains $commandCenterSource $marker "live/read-only/fallback handling $marker"
}

foreach ($marker in @(
  "data-codexforge-files-live-source",
  "data-codexforge-files-read-only-api",
  "data-codexforge-files-runtime-context",
  "data-codexforge-files-preview-panel",
  "data-codexforge-files-dependency-trace"
)) {
  Assert-Contains $commandCenterSource $marker "required Files runtime marker $marker"
}

Assert-Contains $dependencySource "buildDependencyTrace" "dependency trace helper exists"
Assert-Contains $dependencySource ".sort" "dependency trace helper is deterministic"
Assert-Contains $runtimeContextSource "buildRuntimeFileContextSignals" "runtime file context helper exists"
Assert-Contains $runtimeContextSource "@/lib/codexforge/brain/runtime" "runtime file context references runtime/memory context"
Assert-NotContains $runtimeContextSource "brain-graph" "runtime file context avoids legacy brain-graph import"

foreach ($marker in @("Math.random", "d3-force", "Pinecone", "Chroma", "Weaviate", "Qdrant", "Milvus", "FAISS", "pgvector", "embedding", "embeddings")) {
  Assert-NotContains $allFilesSource $marker "banned intelligence dependency absent: $marker"
}

foreach ($marker in @("XMLHttpRequest", "WebSocket", "OpenAI", "API-key", "apiKey")) {
  Assert-NotContains $serverSource $marker "server network/API marker absent: $marker"
}
Assert-NotMatches $serverSource "\bfetch\b" "server helpers do not use network fetch"

foreach ($marker in @("applyPatch", "prepareApply", "writeFile", "appendFile", "unlink", "rm(", "rmdir", "mkdir", "rename(", "copyFile")) {
  Assert-NotContains $commandCenterSource $marker "Files UI direct mutation marker absent: $marker"
}

Assert-NotMatches $allFilesSource 'from\s+["''][^"'']*brain-graph["'']' "legacy brain-graph import absent"

foreach ($marker in @("ÃƒÂ¢", "ÃƒÆ’", "Ãƒâ€š", "Ã¯Â¿Â½")) {
  Assert-NotContains $allFilesSource $marker "mojibake marker absent: $marker"
}

$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-files-runtime\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Files runtime exactly once; found $($suiteMatches.Count)."
}

Write-Host "[OK] CodexForge Files runtime smoke passed."
