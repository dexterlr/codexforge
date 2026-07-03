function Assert-CodexForgeAudioStorageFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeAudioStorageContains {
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

function Invoke-CodexForgeAudioStorageBackendWiringSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\audio-storage-backend-wiring-map\audio-storage-backend-wiring-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\audio-storage-backend-wiring-map\components\AudioStorageBackendWiringPanel.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $commandRegistryPath, $navRegistryPath, $navTypesPath, $allSmokePath, $scriptPath)) {
    Assert-CodexForgeAudioStorageFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  Assert-CodexForgeAudioStorageContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeAudioStorageContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeAudioStorageContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeAudioStorageContains $routeSource "Audio Storage Backend Wiring" "shared Audio Storage Backend Wiring marker"
  Assert-CodexForgeAudioStorageContains $routeSource "AudioStorageBackendWiringRoutePanel" "route panel uses shared audio storage backend wiring panel"
  foreach ($marker in $Markers) {
    Assert-CodexForgeAudioStorageContains $routeSource $marker "route marker $marker"
  }
  Assert-CodexForgeAudioStorageContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeAudioStorageContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeAudioStorageContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeAudioStorageContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeAudioStorageContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeAudioStorageContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeAudioStorageContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeAudioStorageContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
