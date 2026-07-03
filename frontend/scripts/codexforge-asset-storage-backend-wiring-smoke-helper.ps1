function Assert-CodexForgeAssetStorageFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeAssetStorageContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Invoke-CodexForgeAssetStorageBackendWiringSmoke {
  param(
    [string]$SmokeName,
    [string]$ScriptFile,
    [string]$Route,
    [string]$CommandLabel,
    [string]$RouteHref,
    [string]$Phase,
    [string]$Title,
    [string[]]$Markers
  )
  $ErrorActionPreference = "Stop"
  $scriptRoot = $PSScriptRoot
  $root = Split-Path -Parent $scriptRoot
  Set-Location $root
  Write-Host "=== $SmokeName ==="
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\asset-storage-backend-wiring-map\asset-storage-backend-wiring-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\asset-storage-backend-wiring-map\components\AssetStorageBackendWiringPanel.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $commandRegistryPath, $navRegistryPath, $navTypesPath, $allSmokePath, $scriptPath)) {
    Assert-CodexForgeAssetStorageFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  Assert-CodexForgeAssetStorageContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeAssetStorageContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeAssetStorageContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeAssetStorageContains $routeSource "Asset Storage Backend Wiring" "shared Asset Storage Backend Wiring marker"
  Assert-CodexForgeAssetStorageContains $routeSource "AssetStorageBackendWiringRoutePanel" "route panel uses shared asset storage backend wiring panel"
  foreach ($marker in $Markers) {
    Assert-CodexForgeAssetStorageContains $routeSource $marker "route marker $marker"
  }
  Assert-CodexForgeAssetStorageContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeAssetStorageContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeAssetStorageContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeAssetStorageContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeAssetStorageContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeAssetStorageContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeAssetStorageContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeAssetStorageContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
