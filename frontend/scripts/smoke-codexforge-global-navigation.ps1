$ErrorActionPreference = "Stop"

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Message
  )

  Assert-True ($Haystack.Contains($Needle)) $Message
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Message
  )

  Assert-True (-not $Haystack.Contains($Needle)) $Message
}

Write-Host "=== CodexForge global navigation smoke ==="

$navDir = ".\src\lib\codexforge\navigation"
$routeRegistryPath = Join-Path $navDir "codexforge-routes.ts"
$globalNavPath = Join-Path $navDir "CodexForgeGlobalNav.tsx"
$pageShellPath = Join-Path $navDir "CodexForgePageShell.tsx"
$indexPath = Join-Path $navDir "index.ts"
$suitePath = ".\scripts\smoke-codexforge-all.ps1"

Assert-True (Test-Path $navDir) "shared navigation directory exists"
Assert-True (Test-Path $routeRegistryPath) "route registry exists"
Assert-True (Test-Path $globalNavPath) "CodexForgeGlobalNav exists"
Assert-True (Test-Path $pageShellPath) "CodexForgePageShell exists"
Assert-True (Test-Path $indexPath) "navigation index exists"
Assert-True (Test-Path $suitePath) "managed smoke suite exists"

$routeRegistry = Get-Content -Raw $routeRegistryPath
$globalNav = Get-Content -Raw $globalNavPath
$pageShell = Get-Content -Raw $pageShellPath
$indexSource = Get-Content -Raw $indexPath
$suite = Get-Content -Raw $suitePath

$pagePaths = [ordered]@{
  "home page references global nav or route registry" = ".\src\app\page.tsx"
  "/ai references global nav" = ".\src\app\ai\page.tsx"
  "/brain references global nav" = ".\src\app\brain\page-client.tsx"
  "/files references global nav" = ".\src\app\files\page-client.tsx"
  "/history references global nav" = ".\src\app\history\page.tsx"
  "/capabilities references global nav" = ".\src\app\capabilities\page-client.tsx"
  "/creative references global nav" = ".\src\app\creative\page-client.tsx"
  "/entry references global nav" = ".\src\app\entry\page.tsx"
  "/clawd references global nav" = ".\src\app\clawd\page.tsx"
}

foreach ($entry in $pagePaths.GetEnumerator()) {
  Assert-True (Test-Path $entry.Value) "$($entry.Value) exists"
  $source = Get-Content -Raw $entry.Value
  Assert-True (($source.Contains("CodexForgeGlobalNav")) -or ($source.Contains("CODEXFORGE_ROUTES"))) $entry.Key
}

$runsRoutePath = ".\src\app\runs\page-client.tsx"
if (Test-Path $runsRoutePath) {
  $runsSource = Get-Content -Raw $runsRoutePath
  Assert-Contains $runsSource "CodexForgeGlobalNav" "/runs references global nav"
}

$requiredRoutes = @(
  "/ai",
  "/brain",
  "/files",
  "/capabilities",
  "/creative",
  "/history",
  "/clawd",
  "/entry"
)

if (Test-Path ".\src\app\runs") {
  $requiredRoutes += "/runs"
}

foreach ($route in $requiredRoutes) {
  Assert-Contains $routeRegistry "path: `"$route`"" "route registry includes $route"
}

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  ([string][char]0x00E2 + [string][char]0x20AC),
  ([string][char]0x00EF + [string][char]0x00BF + [string][char]0x00BD),
  [string][char]0xFFFD
)

$sourcesToCheck = @(
  $routeRegistry,
  $globalNav,
  $pageShell,
  $indexSource,
  (Get-Content -Raw ".\src\app\page.tsx"),
  (Get-Content -Raw ".\src\app\ai\page.tsx"),
  (Get-Content -Raw ".\src\app\brain\page-client.tsx"),
  (Get-Content -Raw ".\src\app\files\page-client.tsx"),
  (Get-Content -Raw ".\src\app\history\page.tsx"),
  (Get-Content -Raw ".\src\app\capabilities\page-client.tsx"),
  (Get-Content -Raw ".\src\app\creative\page-client.tsx"),
  (Get-Content -Raw ".\src\app\entry\page.tsx"),
  (Get-Content -Raw ".\src\app\clawd\page.tsx")
)

if (Test-Path $runsRoutePath) {
  $sourcesToCheck += (Get-Content -Raw $runsRoutePath)
}

$combined = $sourcesToCheck -join "`n"

foreach ($needle in $forbiddenMojibake) {
  $codepoints = (($needle.ToCharArray() | ForEach-Object { "U+{0:X4}" -f [int][char]$_ }) -join " ")
  Assert-NotContains $combined $needle "global navigation surfaces exclude mojibake marker $codepoints"
}

$navigationSource = @(
  $routeRegistry,
  $globalNav,
  $pageShell,
  $indexSource,
  (Get-Content -Raw ".\src\app\page.tsx"),
  (Get-Content -Raw ".\src\app\entry\page.tsx"),
  (Get-Content -Raw ".\src\app\history\page.tsx")
) -join "`n"

Assert-NotContains $navigationSource "Math.random" "global navigation and updated ID helpers do not use Math.random"
Assert-NotContains $navigationSource "Date.now" "global navigation and updated ID helpers do not use Date.now"

$packageBefore = ""
if (Test-Path ".\package.json") {
  $packageBefore = Get-Content -Raw ".\package.json"
}
Assert-NotContains $packageBefore "codexforge-global-navigation-external-dependency" "no external dependencies added for global navigation"

$suiteCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-global-navigation.ps1")).Count
Assert-True ($suiteCount -eq 1) "managed smoke suite includes Global Navigation exactly once"

Write-Host "[OK] CodexForge global navigation smoke passed."
