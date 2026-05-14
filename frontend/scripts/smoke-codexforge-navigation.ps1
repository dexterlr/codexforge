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
$pageConfigPath = ".\src\lib\codexforge\chat\page-config.ts"
$suitePath = ".\scripts\smoke-codexforge-all.ps1"

Assert-True (Test-Path $homePath) "home page exists"
Assert-True (Test-Path $pageConfigPath) "page config exists"
Assert-True (Test-Path $suitePath) "managed smoke suite exists"

$homeSource = Get-Content -Raw $homePath
$pageConfig = Get-Content -Raw $pageConfigPath
$suite = Get-Content -Raw $suitePath

$requiredRoutes = @(
  "/files",
  "/runs",
  "/capabilities",
  "/creative",
  "/brain",
  "/history",
  "/ai",
  "/clawd",
  "/entry"
)

foreach ($route in $requiredRoutes) {
  Assert-True ($homeSource.Contains($route)) "home references $route"
  Assert-True ($pageConfig.Contains($route)) "page config references $route"
}

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
  Assert-NotContains $pageConfig $needle "page config excludes mojibake marker $codepoints"
}

$surfaceMapMatch = [regex]::Match(
  $homeSource,
  "const SURFACE_MAP:[\s\S]*?\] as const;",
  [System.Text.RegularExpressions.RegexOptions]::Singleline
)

Assert-True $surfaceMapMatch.Success "home defines system surface map"

$surfaceMapSource = $surfaceMapMatch.Value
foreach ($route in $requiredRoutes) {
  $pattern = "path:\s+`"$([regex]::Escape($route))`""
  $count = [regex]::Matches($surfaceMapSource, $pattern).Count
  Assert-True ($count -eq 1) "system surface map has one card for $route"
}

$legacySuiteCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-navigation.ps1")).Count
$globalSuiteCount = [regex]::Matches($suite, [regex]::Escape("smoke-codexforge-global-navigation.ps1")).Count
Assert-True (($legacySuiteCount + $globalSuiteCount) -eq 1) "managed smoke suite includes canonical navigation smoke exactly once"

Write-Host "[OK] CodexForge navigation smoke passed."
