function Assert-CodexForgePublishGatewayFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgePublishGatewayContains {
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

$CodexForgePublishGatewayRequiredMarkers = @(
  "2794-2825 - Publish Gateway Backend Wiring Mega Batch v1",
  "Publish Gateway Backend Wiring",
  "Pipeline Command Center",
  "review-only publish gateway diagnostic",
  "blocked publish gateway execution",
  "protected publish gateway boundary",
  "publish gateway contract",
  "publish gateway job envelope",
  "publish gateway channel policy",
  "publish gateway destination policy",
  "asset handoff boundary",
  "artifact handoff boundary",
  "metadata policy",
  "caption policy",
  "thumbnail policy",
  "schedule blocked",
  "platform upload blocked",
  "external account linking blocked",
  "OAuth token isolation",
  "signed URL creation blocked",
  "publish handoff blocked",
  "publish persistence blocked",
  "no live publish gateway",
  "no platform upload",
  "no channel publishing",
  "no social publishing",
  "no scheduled publishing",
  "no external account linking",
  "no OAuth flow creation",
  "no OAuth callback creation",
  "no webhook creation",
  "no callback route creation",
  "no signed URL creation",
  "no publish handoff execution",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no render execution",
  "no video rendering",
  "no artifact export execution",
  "no file export",
  "no download generation",
  "no archive creation",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no publish provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no API creation from frontend",
  "no service creation",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "publish gateway state",
  "publish gateway recovery",
  "operator review",
  "cockpit alignment",
  "completion guard",
  "guarded video pipeline path",
  "provider gateway to publish gateway path",
  "artifact export to publish gateway handoff",
  "controlled video dry run next",
  "next likely batch: 2826-2857 - End-to-End Video Creation Dry Run"
)

function Invoke-CodexForgePublishGatewayBackendWiringSmoke {
  param(
    [string]$SmokeName,
    [string]$ScriptFile,
    [string]$Route,
    [string]$CommandLabel,
    [string]$RouteHref,
    [string]$Phase,
    [string]$Title
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\publish-gateway-backend-wiring-map\publish-gateway-backend-wiring-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\publish-gateway-backend-wiring-map\components\PublishGatewayBackendWiringPanel.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $commandRegistryPath, $navRegistryPath, $navTypesPath, $allSmokePath, $scriptPath)) {
    Assert-CodexForgePublishGatewayFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  Assert-CodexForgePublishGatewayContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgePublishGatewayContains $routeSource $Title "phase title in route source"
  Assert-CodexForgePublishGatewayContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgePublishGatewayContains $routeSource "Publish Gateway Backend Wiring" "shared Publish Gateway Backend Wiring marker"
  Assert-CodexForgePublishGatewayContains $routeSource "PublishGatewayBackendWiringRoutePanel" "route panel uses shared publish gateway backend wiring panel"
  foreach ($marker in $CodexForgePublishGatewayRequiredMarkers) {
    Assert-CodexForgePublishGatewayContains $routeSource $marker "route marker $marker"
  }
  Assert-CodexForgePublishGatewayContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgePublishGatewayContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgePublishGatewayContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgePublishGatewayContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgePublishGatewayContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgePublishGatewayContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgePublishGatewayContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgePublishGatewayContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
