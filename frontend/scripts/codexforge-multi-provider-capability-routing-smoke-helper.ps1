function Assert-CodexForgeMultiProviderCapabilityRoutingFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeMultiProviderCapabilityRoutingContains {
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

function Assert-CodexForgeMultiProviderCapabilityRoutingNotMatches {
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

$CodexForgeMultiProviderCapabilityRoutingRequiredMarkers = @(
  "2986-3017 - Multi-Provider Capability Routing"
  "2986-3017 - Multi-Provider Capability Routing Mega Batch v1"
  "Multi-Provider Capability Routing"
  "review-only multi-provider capability routing"
  "synthetic multi-provider routing data only"
  "multi-provider routing remains disabled until explicit operator approval"
  "provider capability request"
  "provider capability response"
  "text provider routing remains disabled"
  "image provider routing remains disabled"
  "audio provider routing remains disabled"
  "video provider routing remains disabled"
  "transcription provider routing remains disabled"
  "editing provider routing remains disabled"
  "metadata provider routing remains disabled"
  "safety provider routing remains disabled"
  "provider scorecard remains synthetic"
  "cost routing remains review-only"
  "rate routing remains review-only"
  "privacy routing remains review-only"
  "region routing remains review-only"
  "data retention routing remains review-only"
  "approval routing remains review-only"
  "audit routing remains review-only"
  "redaction routing remains review-only"
  "observability routing remains review-only"
  "retry routing remains review-only"
  "fallback routing remains review-only"
  "timeout routing remains review-only"
  "disabled provider route candidate"
  "multi-provider runner handoff remains review-only"
  "execution bridge handoff remains review-only"
  "multi-provider operator review remains required"
  "multi-provider readiness gate"
  "multi-provider capability routing completion does not call providers"
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
  "no frontend persistence"
  "no credential storage"
  "no token storage"
  "no provider key storage"
  "next likely batch: 3018-3049 - First Real Provider Call Guard"
)

$CodexForgeMultiProviderCapabilityRoutingBannedPatterns = @(
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

function Invoke-CodexForgeMultiProviderCapabilityRoutingSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\multi-provider-capability-routing-map\multi-provider-capability-routing-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\multi-provider-capability-routing-map\components\MultiProviderCapabilityRoutingPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\multi-provider-capability-routing-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\multi-provider-capability-routing-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-multi-provider-capability-routing-mega-batch.ps1"
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
    Assert-CodexForgeMultiProviderCapabilityRoutingFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $routeSource "MultiProviderCapabilityRoutingRoutePanel" "route panel uses shared multi-provider capability routing panel"
  foreach ($marker in $CodexForgeMultiProviderCapabilityRoutingRequiredMarkers) {
    Assert-CodexForgeMultiProviderCapabilityRoutingContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeMultiProviderCapabilityRoutingBannedPatterns) {
    Assert-CodexForgeMultiProviderCapabilityRoutingNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeMultiProviderCapabilityRoutingContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeMultiProviderCapabilityRoutingBannedPatterns) {
    Assert-CodexForgeMultiProviderCapabilityRoutingNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }
  Write-Host "[OK] $SmokeName passed."
}
