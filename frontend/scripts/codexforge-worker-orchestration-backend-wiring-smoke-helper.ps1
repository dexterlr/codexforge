function Assert-CodexForgeWorkerOrchestrationFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeWorkerOrchestrationContains {
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

function Invoke-CodexForgeWorkerOrchestrationBackendWiringSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\worker-orchestration-backend-wiring-map\worker-orchestration-backend-wiring-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\worker-orchestration-backend-wiring-map\components\WorkerOrchestrationBackendWiringPanel.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $commandRegistryPath, $navRegistryPath, $navTypesPath, $allSmokePath, $scriptPath)) {
    Assert-CodexForgeWorkerOrchestrationFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  Assert-CodexForgeWorkerOrchestrationContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeWorkerOrchestrationContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeWorkerOrchestrationContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeWorkerOrchestrationContains $routeSource "Worker Orchestration Backend Wiring" "shared Worker Orchestration Backend Wiring marker"
  Assert-CodexForgeWorkerOrchestrationContains $routeSource "WorkerOrchestrationBackendWiringRoutePanel" "route panel uses shared worker orchestration backend wiring panel"
  foreach ($marker in $Markers) {
    Assert-CodexForgeWorkerOrchestrationContains $routeSource $marker "route marker $marker"
  }
  Assert-CodexForgeWorkerOrchestrationContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeWorkerOrchestrationContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeWorkerOrchestrationContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeWorkerOrchestrationContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeWorkerOrchestrationContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeWorkerOrchestrationContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeWorkerOrchestrationContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeWorkerOrchestrationContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}