function Assert-CodexForgeFirstApprovedProviderExecutionBridgeFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains {
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

function Assert-CodexForgeFirstApprovedProviderExecutionBridgeNotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Banned execution API found in $Name with pattern $Pattern"
  }
  Write-Host "[PASS] banned execution API absent: $Name"
}

$CodexForgeFirstApprovedProviderExecutionBridgeRequiredMarkers = @(
  "2954-2985 - First Approved Provider Execution Bridge"
  "2954-2985 - First Approved Provider Execution Bridge Mega Batch v1"
  "First Approved Provider Execution Bridge"
  "review-only approved provider execution bridge"
  "synthetic approved provider execution bridge data only"
  "approved provider execution bridge remains disabled until explicit operator approval"
  "approved provider execution intent"
  "approved provider approval packet"
  "approved provider credential reference boundary"
  "approved provider token reference boundary"
  "approved provider request envelope"
  "approved provider response envelope"
  "approved provider error envelope"
  "approved provider dry execution lock"
  "approved provider execution remains blocked"
  "approved provider replay remains blocked"
  "approved provider idempotency key"
  "approved provider audit packet"
  "approved provider redaction packet"
  "approved provider observability trace"
  "approved provider cost guard"
  "approved provider rate guard"
  "approved provider privacy guard"
  "approved provider safety guard"
  "approved provider region policy"
  "approved provider data retention policy"
  "approved provider retry policy"
  "approved provider fallback policy"
  "approved provider recovery policy"
  "approved provider timeout policy"
  "approved provider result review"
  "approved provider runner handoff remains review-only"
  "approved provider adapter registry handoff remains review-only"
  "approved provider operator review remains required"
  "approved provider readiness gate"
  "disabled approved provider execution candidate"
  "first approved provider execution bridge completion does not call providers"
  "no live provider calls"
  "no model calls"
  "no prompt sending"
  "no streaming"
  "no provider SDK imports"
  "no text provider imports"
  "no image provider imports"
  "no audio provider imports"
  "no video provider imports"
  "no transcription provider imports"
  "no editing/upscale provider imports"
  "no metadata provider imports"
  "no safety provider imports"
  "no network egress"
  "no fetch/network calls"
  "no connector calls"
  "no upload/download"
  "no file export"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no social/channel publishing"
  "no scheduled publishing"
  "no OAuth flow creation"
  "no OAuth callback creation"
  "no webhook creation"
  "no signed URL creation"
  "no render execution"
  "no video rendering"
  "no audio rendering"
  "no storyboard execution"
  "no keyframe generation"
  "no render queue dispatch"
  "no worker dispatch"
  "no worker execution"
  "no job execution"
  "no scheduler execution"
  "no orchestration execution"
  "no live workflow execution"
  "no process spawning"
  "no shell execution"
  "no command execution from the app"
  "no file system writes from the app"
  "no frontend persistence"
  "no browser storage writes"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no credential storage"
  "no token storage"
  "no OAuth token storage"
  "no publish token storage"
  "no provider key storage"
  "no database writes"
  "no service creation"
  "no API creation from frontend"
  "no port binding"
  "no runtime deploy"
  "next likely batch: 2986-3017 - Multi-Provider Capability Routing"
)

$CodexForgeFirstApprovedProviderExecutionBridgeBannedPatterns = @(
  "\bfetch\s*\("
  "XMLHttpRequest"
  "WebSocket"
  "EventSource"
  "sendBeacon"
  "navigator\.sendBeacon"
  "navigator\.mediaDevices"
  "localStorage\."
  "sessionStorage\."
  "window\.localStorage"
  "window\.sessionStorage"
  "indexedDB\."
  "document\.cookie"
  "createObjectURL"
  "showSaveFilePicker"
  "showOpenFilePicker"
  "ServiceWorker"
  "Worker\s*\("
  "child_process"
  "spawn\s*\("
  "exec\s*\("
  "execFile\s*\("
  "provider\.send"
  "provider\.call"
  "provider\.execute"
  "model\.call"
  "prompt\.send"
  "stream\s*\("
  "renderQueue\.dispatch"
  "worker\.dispatch"
  "artifactExport\.execute"
  "publishGateway\.execute"
  'from\s+[''"]openai[''"]'
  'from\s+[''"]@anthropic'
  'from\s+[''"]@google'
  'from\s+[''"]replicate'
  'from\s+[''"]stability'
  'from\s+[''"]elevenlabs'
  'from\s+[''"]assemblyai'
  'from\s+[''"]deepgram'
  'from\s+[''"]runway'
  'from\s+[''"]fal'
)

function Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke {
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
  if ($RouteHref -match "^/codexforge/") { throw "[FAIL] Nested CodexForge route href is not allowed: $RouteHref" }
  if ($Route -match "[\/]") { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match "[\\/]") { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\first-approved-provider-execution-bridge-map\first-approved-provider-execution-bridge-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\first-approved-provider-execution-bridge-map\components\FirstApprovedProviderExecutionBridgePanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\first-approved-provider-execution-bridge-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\first-approved-provider-execution-bridge-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-approved-provider-execution-bridge-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @(
    $pagePath
    $pageClientPath
    $libIndexPath
    $componentsIndexPath
    $panelPath
    $sharedModelPath
    $sharedPanelPath
    $sharedIndexPath
    $sharedComponentsIndexPath
    $commandRegistryPath
    $navRegistryPath
    $navTypesPath
    $allSmokePath
    $wrapperSmokePath
    $scriptPath
  )) {
    Assert-CodexForgeFirstApprovedProviderExecutionBridgeFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $routeSource "First Approved Provider Execution Bridge" "shared First Approved Provider Execution Bridge marker"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $routeSource "FirstApprovedProviderExecutionBridgeRoutePanel" "route panel uses shared first approved provider execution bridge panel"
  foreach ($marker in $CodexForgeFirstApprovedProviderExecutionBridgeRequiredMarkers) {
    Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeFirstApprovedProviderExecutionBridgeBannedPatterns) {
    Assert-CodexForgeFirstApprovedProviderExecutionBridgeNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeFirstApprovedProviderExecutionBridgeContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeFirstApprovedProviderExecutionBridgeBannedPatterns) {
    Assert-CodexForgeFirstApprovedProviderExecutionBridgeNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }
  Write-Host "[OK] $SmokeName passed."
}
