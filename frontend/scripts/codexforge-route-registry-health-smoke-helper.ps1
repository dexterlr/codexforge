param(
  [Parameter(Mandatory = $true)][string[]]$ExpectedRoutes
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

$routeRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$shellTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"

$hrefMatches = [regex]::Matches($routeRegistry, 'href:\s*"(?<href>/[^"]*)"')
$hrefs = @($hrefMatches | ForEach-Object { $_.Groups["href"].Value })
$duplicateHrefs = @($hrefs | Group-Object | Where-Object { $_.Count -gt 1 })
if ($duplicateHrefs.Count -gt 0) {
  throw "[FAIL] route registry has duplicate href entries: $($duplicateHrefs.Name -join ', ')"
}
Write-Host "[PASS] route registry has no duplicate route hrefs"

$shortLabelMatches = [regex]::Matches($routeRegistry, 'shortLabel:\s*"(?<label>[^"]+)"')
$shortLabels = @($shortLabelMatches | ForEach-Object { $_.Groups["label"].Value })
$duplicateShortLabels = @($shortLabels | Group-Object | Where-Object { $_.Count -gt 1 })
if ($duplicateShortLabels.Count -gt 0) {
  throw "[FAIL] route registry has duplicate shortLabel values: $($duplicateShortLabels.Name -join ', ')"
}
Write-Host "[PASS] route registry has no duplicate shortLabel values"

foreach ($route in $ExpectedRoutes) {
  Assert-Contains $routeRegistry "href: `"$route`"" "navigation route coverage $route"
  Assert-Contains $shellTypes "| `"$route`"" "route type coverage $route"
  Assert-Contains $commandRegistry "`"$route`": true" "command availability coverage $route"
  Assert-Contains $commandRegistry "href: `"$route`"" "command route coverage $route"
}

Write-Host "[PASS] protected route coverage remains present"
