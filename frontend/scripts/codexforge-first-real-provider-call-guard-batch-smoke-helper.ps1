function Assert-CodexForgeFirstRealProviderCallGuardFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeFirstRealProviderCallGuardContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeFirstRealProviderCallGuardNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution API found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution API absent: $Name"
}

$CodexForgeFirstRealProviderCallGuardRequiredMarkers = @(
  '3018-3049 - First Real Provider Call Guard'
  '3018-3049 - First Real Provider Call Guard Mega Batch v1'
  'First Real Provider Call Guard'
  'review-only first real provider call guard'
  'synthetic first real provider call guard data only'
  'first real provider call remains blocked until explicit operator approval'
  'provider call intent'
  'provider call approval packet'
  'provider credential reference boundary'
  'provider token reference boundary'
  'provider call request envelope'
  'provider call response envelope'
  'provider call error envelope'
  'provider call dry lock'
  'provider call execution remains blocked'
  'provider call preflight checklist'
  'prompt redaction preview'
  'provider call cost estimate'
  'provider call rate estimate'
  'provider call privacy gate'
  'provider call safety gate'
  'provider call region policy'
  'provider call data retention policy'
  'provider call timeout policy'
  'provider call retry policy'
  'provider call fallback policy'
  'provider call recovery policy'
  'provider call audit packet'
  'provider call observability trace'
  'provider call result review'
  'provider registry handoff remains review-only'
  'multi-provider routing handoff remains review-only'
  'execution bridge handoff remains review-only'
  'runner handoff remains review-only'
  'operator review remains required before first real provider call'
  'first real provider call readiness gate'
  'first real provider call guard completion does not call providers'
  'no live provider calls'
  'no model calls'
  'no prompt sending'
  'no streaming'
  'no provider SDK imports'
  'no text provider imports'
  'no image provider imports'
  'no audio provider imports'
  'no video provider imports'
  'no transcription provider imports'
  'no editing/upscale provider imports'
  'no metadata provider imports'
  'no safety provider imports'
  'no network egress'
  'no fetch/network calls'
  'no connector calls'
  'no upload/download'
  'no file export'
  'no artifact export execution'
  'no publish gateway execution'
  'no platform upload'
  'no render execution'
  'no video rendering'
  'no audio rendering'
  'no storyboard execution'
  'no keyframe generation'
  'no render queue dispatch'
  'no worker dispatch'
  'no worker execution'
  'no job execution'
  'no scheduler execution'
  'no orchestration execution'
  'no live workflow execution'
  'no process spawning'
  'no shell execution'
  'no command execution from the app'
  'no file system writes from the app'
  'no frontend persistence'
  'no browser storage writes'
  'no credential storage'
  'no token storage'
  'no OAuth token storage'
  'no provider key storage'
  'no database writes'
  'no service creation'
  'no API creation from frontend'
  'no port binding'
  'no runtime deploy'
  'next likely batch: 3050-3081 - First Approved Text Planning Provider Trial'
)

$CodexForgeFirstRealProviderCallGuardBannedPatterns = @(
  '\bfetch\s*\('
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'navigator\.mediaDevices'
  'localStorage\.'
  'sessionStorage\.'
  'window\.localStorage'
  'window\.sessionStorage'
  'indexedDB\.'
  'document\.cookie'
  'createObjectURL'
  'showSaveFilePicker'
  'showOpenFilePicker'
  'ServiceWorker'
  'Worker\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
  'provider\.send'
  'provider\.call'
  'provider\.execute'
  'model\.call'
  'prompt\.send'
  'stream\s*\('
  'renderQueue\.dispatch'
  'worker\.dispatch'
  'artifactExport\.execute'
  'publishGateway\.execute'
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

function Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke {
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
  if ($ScriptFile -match "[\/]") { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\first-real-provider-call-guard-map\first-real-provider-call-guard-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\first-real-provider-call-guard-map\components\FirstRealProviderCallGuardPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\first-real-provider-call-guard-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\first-real-provider-call-guard-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-real-provider-call-guard-mega-batch.ps1"
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
    Assert-CodexForgeFirstRealProviderCallGuardFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeFirstRealProviderCallGuardContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeFirstRealProviderCallGuardContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeFirstRealProviderCallGuardContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeFirstRealProviderCallGuardContains $routeSource "FirstRealProviderCallGuardRoutePanel" "route panel uses shared first real provider call guard panel"
  foreach ($marker in $CodexForgeFirstRealProviderCallGuardRequiredMarkers) {
    Assert-CodexForgeFirstRealProviderCallGuardContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeFirstRealProviderCallGuardBannedPatterns) {
    Assert-CodexForgeFirstRealProviderCallGuardNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeFirstRealProviderCallGuardContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeFirstRealProviderCallGuardContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeFirstRealProviderCallGuardContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeFirstRealProviderCallGuardContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeFirstRealProviderCallGuardContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeFirstRealProviderCallGuardContains $navRegistry "group: `"Creative`"" "navigation group"
  Assert-CodexForgeFirstRealProviderCallGuardContains $navRegistry "safetyPosture: `"review-gated`"" "navigation safety posture"
  Assert-CodexForgeFirstRealProviderCallGuardContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeFirstRealProviderCallGuardContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeFirstRealProviderCallGuardContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeFirstRealProviderCallGuardContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeFirstRealProviderCallGuardContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeFirstRealProviderCallGuardBannedPatterns) {
    Assert-CodexForgeFirstRealProviderCallGuardNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }
  Write-Host "[OK] $SmokeName passed."
}
