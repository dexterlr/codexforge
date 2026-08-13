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
$localActionBarPath = Join-Path $navDir "CodexForgeLocalActionBar.tsx"
$pageShellPath = Join-Path $navDir "CodexForgePageShell.tsx"
$indexPath = Join-Path $navDir "index.ts"
$navigationShellRouteRegistryPath = ".\src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$suitePath = ".\scripts\smoke-codexforge-all.ps1"
$aiTopBarPath = ".\src\lib\codexforge\chat\components\top-bar.tsx"
$aiPagePath = ".\src\app\ai\page.tsx"
$brainPagePath = ".\src\app\brain\page-client.tsx"

Assert-True (Test-Path $navDir) "shared navigation directory exists"
Assert-True (Test-Path $routeRegistryPath) "route registry exists"
Assert-True (Test-Path $globalNavPath) "CodexForgeGlobalNav exists"
Assert-True (Test-Path $localActionBarPath) "CodexForgeLocalActionBar exists"
Assert-True (Test-Path $pageShellPath) "CodexForgePageShell exists"
Assert-True (Test-Path $indexPath) "navigation index exists"
Assert-True (Test-Path $navigationShellRouteRegistryPath) "current navigation shell route registry exists"
Assert-True (Test-Path $suitePath) "managed smoke suite exists"
Assert-True (Test-Path $aiTopBarPath) "retained historical chat top bar source exists"
Assert-True (Test-Path $aiPagePath) "/ai compatibility route exists"
Assert-True (Test-Path $brainPagePath) "/brain page client exists"

$routeRegistry = Get-Content -Raw $routeRegistryPath
$globalNav = Get-Content -Raw $globalNavPath
$localActionBar = Get-Content -Raw $localActionBarPath
$pageShell = Get-Content -Raw $pageShellPath
$indexSource = Get-Content -Raw $indexPath
$navigationShellRouteRegistry = Get-Content -Raw $navigationShellRouteRegistryPath
$suite = Get-Content -Raw $suitePath
$aiTopBar = Get-Content -Raw $aiTopBarPath
$aiPage = Get-Content -Raw $aiPagePath
$brainPage = Get-Content -Raw $brainPagePath

$pagePaths = [ordered]@{
  "home page references global nav or route registry" = ".\src\app\page.tsx"
  "/jarvis references the canonical product shell" = ".\src\app\jarvis\page-client.tsx"
  "/jarvis-websites references the canonical product shell" = ".\src\app\jarvis-websites\page-client.tsx"
  "/brain references global nav" = ".\src\app\brain\page-client.tsx"
  "/files references global nav or canonical shell" = ".\src\app\files\page-client.tsx"
  "/history references global nav" = ".\src\app\history\page.tsx"
  "/capabilities references global nav or canonical shell" = ".\src\app\capabilities\page-client.tsx"
  "/creative references global nav or canonical shell" = ".\src\app\creative\page-client.tsx"
  "/entry references global nav" = ".\src\app\entry\page.tsx"
  "/clawd references global nav" = ".\src\app\clawd\page.tsx"
}

foreach ($entry in $pagePaths.GetEnumerator()) {
  Assert-True (Test-Path $entry.Value) "$($entry.Value) exists"
  $source = Get-Content -Raw $entry.Value
  Assert-True (($source.Contains("CodexForgeGlobalNav")) -or ($source.Contains("CodexForgeAppShell")) -or ($source.Contains("JarvisUnifiedProductPageClientShell")) -or ($source.Contains("CODEXFORGE_ROUTES"))) $entry.Key
}

Assert-Contains $aiPage 'import { redirect } from "next/navigation"' "/ai uses the framework redirect boundary"
Assert-Contains $aiPage 'redirect("/jarvis")' "/ai retires the standalone workspace by redirecting to canonical Jarvis"

$runsRoutePath = ".\src\app\runs\page-client.tsx"
if (Test-Path $runsRoutePath) {
  $runsSource = Get-Content -Raw $runsRoutePath
  Assert-Contains $runsSource "CodexForgeGlobalNav" "/runs references global nav"
}

$requiredRoutes = @(
  "/ai",
  "/jarvis",
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

foreach ($id in @("home", "jarvis", "workspace", "brain", "files", "runs", "capabilities", "creative", "history", "entry", "operator")) {
  Assert-Contains $routeRegistry "id: `"$id`"" "route registry includes $id id"
}

foreach ($primaryId in @("jarvis", "workspace", "brain", "files", "runs")) {
  $pattern = 'id:\s+"' + [regex]::Escape($primaryId) + '"[\s\S]*?priority:\s+"primary"'
  Assert-True ([regex]::IsMatch($routeRegistry, $pattern)) "route registry marks $primaryId as primary"
}

foreach ($secondaryId in @("home", "capabilities", "creative", "history", "entry", "operator")) {
  $pattern = 'id:\s+"' + [regex]::Escape($secondaryId) + '"[\s\S]*?priority:\s+"secondary"'
  Assert-True ([regex]::IsMatch($routeRegistry, $pattern)) "route registry marks $secondaryId as secondary"
}

Assert-Contains $routeRegistry "showInGlobalNav: true" "route registry exposes global nav visibility"
Assert-True ([regex]::IsMatch($routeRegistry, 'id:\s+"workspace"[\s\S]*?path:\s+"/ai"[\s\S]*?showInGlobalNav:\s+false')) "legacy /ai registry entry is retained only as a hidden compatibility redirect"
foreach ($canonicalRoute in @("/jarvis", "/jarvis-websites")) {
  $pattern = 'href:\s+"' + [regex]::Escape($canonicalRoute) + '"'
  Assert-True ([regex]::Matches($navigationShellRouteRegistry, $pattern).Count -eq 1) "current navigation shell registers $canonicalRoute exactly once"
}
Assert-True ([regex]::IsMatch($navigationShellRouteRegistry, 'route\.href === "/jarvis" \|\| route\.href === "/jarvis-websites"[\s\S]*?\? "available"')) "current navigation shell marks Jarvis and Website Builder available"
Assert-Contains $globalNav "primaryRoutes" "global nav builds a primary route group"
Assert-Contains $globalNav "secondaryRoutes" "global nav builds a secondary route group"
Assert-Contains $globalNav "href={route.path}" "global nav renders route links from registry paths"
Assert-Contains $globalNav "aria-current={active ? `"page`" : undefined}" "global nav keeps active route aria-current"
Assert-Contains $globalNav "getCodexForgeRoute(pathname)" "global nav keeps active route lookup"
Assert-NotContains $globalNav "groupLabel" "global nav no longer defines noisy per-route group badge style"
Assert-NotContains $globalNav "route.group}</span>" "global nav no longer renders group text inside every route pill"
Assert-NotContains $globalNav "title={`${route.group}" "global nav no longer leads every route tooltip with group noise"

Assert-Contains $aiTopBar "Add system note" "retained historical chat top bar preserves Add system note source coverage"
Assert-Contains $aiTopBar "Clear" "retained historical chat top bar preserves Clear source coverage"
Assert-Contains $brainPage "Refresh" "/brain keeps Refresh action"
Assert-Contains $brainPage "Seed real memory" "/brain keeps Seed real memory action"

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
  $localActionBar,
  $pageShell,
  $indexSource,
  $navigationShellRouteRegistry,
  $aiTopBar,
  $aiPage,
  $brainPage,
  (Get-Content -Raw ".\src\app\page.tsx"),
  (Get-Content -Raw ".\src\app\jarvis\page-client.tsx"),
  (Get-Content -Raw ".\src\app\jarvis-websites\page-client.tsx"),
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
  $localActionBar,
  $pageShell,
  $indexSource,
  $navigationShellRouteRegistry,
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
Assert-Contains $localActionBar "data-codexforge-local-action-bar" "shared local action bar marker exists"
Assert-Contains $indexSource "CodexForgeLocalActionBar" "navigation index exports shared local action bar"

$suiteCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-global-navigation.ps1")).Count
Assert-True ($suiteCount -eq 1) "managed smoke suite includes Global Navigation exactly once"

Write-Host "[OK] CodexForge global navigation smoke passed."
