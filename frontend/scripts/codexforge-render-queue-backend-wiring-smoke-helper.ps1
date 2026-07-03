function Assert-CodexForgeRenderQueueFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeRenderQueueContains {
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

function Invoke-CodexForgeRenderQueueBackendWiringSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\render-queue-backend-wiring-map\render-queue-backend-wiring-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\render-queue-backend-wiring-map\components\RenderQueueBackendWiringPanel.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $commandRegistryPath, $navRegistryPath, $navTypesPath, $allSmokePath, $scriptPath)) {
    Assert-CodexForgeRenderQueueFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  Assert-CodexForgeRenderQueueContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeRenderQueueContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeRenderQueueContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeRenderQueueContains $routeSource "Render Queue Backend Wiring" "shared Render Queue Backend Wiring marker"
  Assert-CodexForgeRenderQueueContains $routeSource "RenderQueueBackendWiringRoutePanel" "route panel uses shared render queue backend wiring panel"
  foreach ($marker in $Markers) {
    Assert-CodexForgeRenderQueueContains $routeSource $marker "route marker $marker"
  }
  Assert-CodexForgeRenderQueueContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeRenderQueueContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeRenderQueueContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeRenderQueueContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeRenderQueueContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeRenderQueueContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeRenderQueueContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeRenderQueueContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}