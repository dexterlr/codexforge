function Assert-CodexForgeApprovedImageStoryboardTrialFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeApprovedImageStoryboardTrialContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeApprovedImageStoryboardTrialNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution API found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution API absent: $Name"
}

$CodexForgeApprovedImageStoryboardTrialRequiredMarkers = @(
  '3082-3113 - First Approved Image Storyboard Provider Trial'
  '3082-3113 - First Approved Image Storyboard Provider Trial Mega Batch v1'
  'First Approved Image Storyboard Provider Trial'
  'review-only approved image storyboard provider trial'
  'synthetic image storyboard provider trial data only'
  'image storyboard provider trial remains blocked until explicit operator approval'
  'approved image storyboard intent'
  'approved image storyboard approval packet'
  'approved image storyboard provider selection'
  'approved image storyboard credential reference boundary'
  'approved image storyboard token reference boundary'
  'approved image storyboard visual brief'
  'approved image storyboard prompt envelope'
  'approved image storyboard request envelope'
  'approved image storyboard response envelope'
  'approved image storyboard error envelope'
  'approved image storyboard dry lock'
  'approved image storyboard execution remains blocked'
  'storyboard frame plan remains synthetic'
  'keyframe candidate remains synthetic'
  'style guide remains synthetic'
  'shot list remains synthetic'
  'visual safety review remains review-only'
  'redaction review remains review-only'
  'approved image storyboard audit packet'
  'approved image storyboard observability trace'
  'approved image storyboard cost estimate'
  'approved image storyboard rate estimate'
  'approved image storyboard privacy gate'
  'approved image storyboard region policy'
  'approved image storyboard data retention policy'
  'approved image storyboard retry fallback policy'
  'approved image storyboard result review'
  'asset storage handoff remains review-only'
  'approved image storyboard runner handoff remains review-only'
  'approved image storyboard readiness gate'
  'first approved image storyboard provider trial completion does not call providers'
  'no live provider calls'
  'no image model calls'
  'no model calls'
  'no prompt sending'
  'no image generation'
  'no keyframe generation'
  'no storyboard execution'
  'no streaming'
  'no provider SDK imports'
  'no image provider imports'
  'no text provider imports'
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
  'next likely batch: 3114-3145 - First Approved Audio Provider Trial'
)

$CodexForgeApprovedImageStoryboardTrialBannedPatterns = @(
  '\bfetch\s*\('
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'localStorage\.'
  'sessionStorage\.'
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
  'image\.generate'
  'keyframe\.generate'
  'storyboard\.execute'
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

function Invoke-CodexForgeApprovedImageStoryboardTrialBatchSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\approved-image-storyboard-provider-trial-map\approved-image-storyboard-provider-trial-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\approved-image-storyboard-provider-trial-map\components\ApprovedImageStoryboardTrialPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\approved-image-storyboard-provider-trial-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\approved-image-storyboard-provider-trial-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-approved-image-storyboard-provider-trial-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath)) {
    Assert-CodexForgeApprovedImageStoryboardTrialFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeApprovedImageStoryboardTrialContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $routeSource "ApprovedImageStoryboardTrialRoutePanel" "route panel uses shared approved image storyboard provider trial panel"
  foreach ($marker in $CodexForgeApprovedImageStoryboardTrialRequiredMarkers) { Assert-CodexForgeApprovedImageStoryboardTrialContains $routeSource $marker "route marker $marker" }
  foreach ($pattern in $CodexForgeApprovedImageStoryboardTrialBannedPatterns) { Assert-CodexForgeApprovedImageStoryboardTrialNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeApprovedImageStoryboardTrialContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $navRegistry "group: `"Creative`"" "navigation group"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $navRegistry "safetyPosture: `"review-gated`"" "navigation safety posture"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeApprovedImageStoryboardTrialContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeApprovedImageStoryboardTrialBannedPatterns) { Assert-CodexForgeApprovedImageStoryboardTrialNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
