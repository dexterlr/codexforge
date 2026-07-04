function Assert-CodexForgeProviderAdapterRegistryBackendContractFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeProviderAdapterRegistryBackendContractContains {
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

function Assert-CodexForgeProviderAdapterRegistryBackendContractNotMatches {
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

$CodexForgeProviderAdapterRegistryBackendContractRequiredMarkers = @(
  "2922-2953 - Provider Adapter Registry Backend Contract"
  "2922-2953 - Provider Adapter Registry Backend Contract Mega Batch v1"
  "Provider Adapter Registry Backend Contract"
  "review-only provider adapter registry contract"
  "synthetic provider adapter registry data only"
  "provider adapter registry remains disabled until explicit operator approval"
  "disabled provider adapter catalog"
  "provider capability map"
  "text provider capability remains disabled"
  "image provider capability remains disabled"
  "audio provider capability remains disabled"
  "video provider capability remains disabled"
  "transcription provider capability remains disabled"
  "editing provider capability remains disabled"
  "metadata provider capability remains disabled"
  "safety provider capability remains disabled"
  "provider credential boundary"
  "provider token boundary"
  "provider request envelope"
  "provider response envelope"
  "provider error envelope"
  "provider approval gate"
  "provider audit envelope"
  "provider redaction envelope"
  "provider cost guard"
  "provider rate guard"
  "provider privacy guard"
  "provider safety guard"
  "provider region policy"
  "provider data retention policy"
  "provider retry policy"
  "provider fallback policy"
  "provider observability trace"
  "provider runner handoff remains review-only"
  "provider adapter readiness gate"
  "provider adapter registry completion does not call providers"
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
  "next likely batch: 2954-2985 - First Approved Provider Execution Bridge"
)

$CodexForgeProviderAdapterRegistryBackendContractBannedPatterns = @(
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

function Invoke-CodexForgeProviderAdapterRegistryBackendContractSmoke {
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
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\provider-adapter-registry-backend-contract-map\provider-adapter-registry-backend-contract-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\provider-adapter-registry-backend-contract-map\components\ProviderAdapterRegistryBackendContractPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\provider-adapter-registry-backend-contract-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\provider-adapter-registry-backend-contract-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-provider-adapter-registry-backend-contract-mega-batch.ps1"
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
    Assert-CodexForgeProviderAdapterRegistryBackendContractFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $routeSource "Provider Adapter Registry Backend Contract" "shared Provider Adapter Registry Backend Contract marker"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $routeSource "ProviderAdapterRegistryBackendContractRoutePanel" "route panel uses shared provider adapter registry contract panel"
  foreach ($marker in $CodexForgeProviderAdapterRegistryBackendContractRequiredMarkers) {
    Assert-CodexForgeProviderAdapterRegistryBackendContractContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeProviderAdapterRegistryBackendContractBannedPatterns) {
    Assert-CodexForgeProviderAdapterRegistryBackendContractNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeProviderAdapterRegistryBackendContractContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
