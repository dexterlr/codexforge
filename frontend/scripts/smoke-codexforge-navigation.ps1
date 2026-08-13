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

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Message
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

Write-Host "=== CodexForge navigation smoke ==="

$homePath = ".\src\app\page.tsx"
$homeClientPath = ".\src\app\page-client.tsx"
$pageConfigPath = ".\src\lib\codexforge\chat\page-config.ts"
$navigationRouteRegistryPath = ".\src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistryPath = ".\src\lib\codexforge\command-palette\command-registry.ts"
$aiPagePath = ".\src\app\ai\page.tsx"
$suitePath = ".\scripts\smoke-codexforge-all.ps1"

Assert-True (Test-Path $homePath) "home page exists"
Assert-True (Test-Path $homeClientPath) "home client page exists"
Assert-True (Test-Path $pageConfigPath) "page config exists"
Assert-True (Test-Path $navigationRouteRegistryPath) "current navigation route registry exists"
Assert-True (Test-Path $commandRegistryPath) "command registry exists"
Assert-True (Test-Path $aiPagePath) "/ai compatibility route exists"
Assert-True (Test-Path $suitePath) "managed smoke suite exists"

$homeSource = Get-Content -Raw $homePath
$homeClientSource = Get-Content -Raw $homeClientPath
$pageConfig = Get-Content -Raw $pageConfigPath
$navigationRouteRegistry = Get-Content -Raw $navigationRouteRegistryPath
$commandRegistry = Get-Content -Raw $commandRegistryPath
$aiPage = Get-Content -Raw $aiPagePath
$suite = Get-Content -Raw $suitePath

$retainedLegacyRoutes = @(
  "/files",
  "/runs",
  "/capabilities",
  "/creative",
  "/brain",
  "/history",
  "/clawd",
  "/entry"
)

foreach ($route in $retainedLegacyRoutes) {
  $routeDirectory = Join-Path ".\src\app" $route.TrimStart("/")
  Assert-True (Test-Path $routeDirectory) "retained route $route still has a source directory"
  Assert-True ($pageConfig.Contains($route)) "page config references $route"
}

Assert-True ($homeSource.Contains("OperatorHomePageClient")) "home renders the authentic CodexForge operator home client"
Assert-True ($homeClientSource.Contains("CodexForgeAppShell") -and $homeClientSource.Contains("ProductHomePanel")) "home client uses the canonical CodexForge product shell"
Assert-True ($aiPage.Contains('import { redirect } from "next/navigation"') -and $aiPage.Contains('redirect("/jarvis")')) "/ai is an explicit compatibility redirect to canonical Jarvis"

$canonicalRoutes = @("/jarvis", "/jarvis-websites")
foreach ($route in $canonicalRoutes) {
  $routeDirectory = Join-Path ".\src\app" $route.TrimStart("/")
  Assert-True (Test-Path $routeDirectory) "canonical route $route has a source directory"
  $hrefPattern = 'href:\s+"' + [regex]::Escape($route) + '"'
  Assert-True ([regex]::Matches($navigationRouteRegistry, $hrefPattern).Count -eq 1) "navigation registry reaches $route exactly once"
  Assert-True ([regex]::Matches($commandRegistry, $hrefPattern).Count -eq 1) "command palette reaches $route exactly once"
}
Assert-True ([regex]::IsMatch($navigationRouteRegistry, 'route\.href === "/jarvis" \|\| route\.href === "/jarvis-websites"[\s\S]*?\? "available"')) "canonical Jarvis routes are operational rather than preview-only"

$forbiddenMojibake = @(
  [string][char]0x00C3,
  [string][char]0x00C2,
  ([string][char]0x00E2 + [string][char]0x20AC),
  ([string][char]0x00E2 + [string][char]0x2020),
  ([string][char]0x00EF + [string][char]0x00BF + [string][char]0x00BD),
  [string][char]0xFFFD
)

foreach ($needle in $forbiddenMojibake) {
  $codepoints = (($needle.ToCharArray() | ForEach-Object { "U+{0:X4}" -f [int][char]$_ }) -join " ")
  Assert-NotContains $homeSource $needle "home excludes mojibake marker $codepoints"
  Assert-NotContains $homeClientSource $needle "home client excludes mojibake marker $codepoints"
  Assert-NotContains $pageConfig $needle "page config excludes mojibake marker $codepoints"
}

$surfaceMapMatch = [regex]::Match(
  $navigationRouteRegistry,
  "const JARVIS_UNIFIED_PRODUCT_PRIMARY_ROUTE_INPUTS = \[[\s\S]*?\] as const satisfies readonly",
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

Assert-True $surfaceMapMatch.Success "current navigation registry defines the primary product surface map"

$surfaceMapSource = $surfaceMapMatch.Value
foreach ($route in $canonicalRoutes) {
  $pattern = "href:\s+`"$([regex]::Escape($route))`""
  $count = [regex]::Matches($surfaceMapSource, $pattern).Count
  Assert-True ($count -eq 1) "primary product surface map has one entry for $route"
}

$legacySuiteCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-navigation.ps1")).Count
$globalSuiteCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-global-navigation.ps1")).Count
Assert-True (($legacySuiteCount + $globalSuiteCount) -eq 1) "managed smoke suite includes canonical navigation smoke exactly once"

Write-Host "[OK] CodexForge navigation smoke passed."
