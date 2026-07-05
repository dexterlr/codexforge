function Assert-CodexForgeApprovedTextPlanningTrialFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeApprovedTextPlanningTrialContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeApprovedTextPlanningTrialNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution API found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution API absent: $Name"
}

$CodexForgeApprovedTextPlanningTrialRequiredMarkers = @(
  '3050-3081 - First Approved Text Planning Provider Trial'
  '3050-3081 - First Approved Text Planning Provider Trial Mega Batch v1'
  'First Approved Text Planning Provider Trial'
  'review-only approved text planning provider trial'
  'synthetic text planning provider trial data only'
  'text planning provider trial remains blocked until explicit operator approval'
  'approved text planning intent'
  'approved text planning approval packet'
  'approved text planning provider selection'
  'approved text planning credential reference boundary'
  'approved text planning token reference boundary'
  'approved text planning prompt envelope'
  'approved text planning request envelope'
  'approved text planning response envelope'
  'approved text planning error envelope'
  'approved text planning dry lock'
  'approved text planning execution remains blocked'
  'idea expansion remains synthetic'
  'video outline remains synthetic'
  'prompt plan remains synthetic'
  'storyboard text plan remains synthetic'
  'metadata plan remains synthetic'
  'risk review remains review-only'
  'safety review remains review-only'
  'redaction review remains review-only'
  'approved text planning audit packet'
  'approved text planning observability trace'
  'approved text planning cost estimate'
  'approved text planning rate estimate'
  'approved text planning privacy gate'
  'approved text planning region policy'
  'approved text planning data retention policy'
  'approved text planning retry fallback policy'
  'approved text planning result review'
  'approved text planning runner handoff remains review-only'
  'approved text planning readiness gate'
  'first approved text planning provider trial completion does not call providers'
  'no live provider calls'
  'no text model calls'
  'no model calls'
  'no prompt sending'
  'no streaming'
  'no provider SDK imports'
  'no text provider imports'
  'no image provider imports'
  'no video provider imports'
  'no audio provider imports'
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
  'next likely batch: 3082-3113 - First Approved Image Storyboard Provider Trial'
)

$CodexForgeApprovedTextPlanningTrialBannedPatterns = @(
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

function Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke {
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
  if ($Route -match "[\/]" ) { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match "[\/]" ) { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\approved-text-planning-provider-trial-map\approved-text-planning-provider-trial-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\approved-text-planning-provider-trial-map\components\ApprovedTextPlanningTrialPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\approved-text-planning-provider-trial-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\approved-text-planning-provider-trial-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-approved-text-planning-provider-trial-mega-batch.ps1"
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
    Assert-CodexForgeApprovedTextPlanningTrialFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeApprovedTextPlanningTrialContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeApprovedTextPlanningTrialContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeApprovedTextPlanningTrialContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeApprovedTextPlanningTrialContains $routeSource "ApprovedTextPlanningTrialRoutePanel" "route panel uses shared approved text planning provider trial panel"
  foreach ($marker in $CodexForgeApprovedTextPlanningTrialRequiredMarkers) {
    Assert-CodexForgeApprovedTextPlanningTrialContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeApprovedTextPlanningTrialBannedPatterns) {
    Assert-CodexForgeApprovedTextPlanningTrialNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeApprovedTextPlanningTrialContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeApprovedTextPlanningTrialContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeApprovedTextPlanningTrialContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeApprovedTextPlanningTrialContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeApprovedTextPlanningTrialContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeApprovedTextPlanningTrialContains $navRegistry "group: `"Creative`"" "navigation group"
  Assert-CodexForgeApprovedTextPlanningTrialContains $navRegistry "safetyPosture: `"review-gated`"" "navigation safety posture"
  Assert-CodexForgeApprovedTextPlanningTrialContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeApprovedTextPlanningTrialContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeApprovedTextPlanningTrialContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeApprovedTextPlanningTrialContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeApprovedTextPlanningTrialContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeApprovedTextPlanningTrialBannedPatterns) {
    Assert-CodexForgeApprovedTextPlanningTrialNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }
  Write-Host "[OK] $SmokeName passed."
}
