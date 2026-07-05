function Assert-CodexForgeApprovedAudioProviderTrialFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeApprovedAudioProviderTrialContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeApprovedAudioProviderTrialNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution API found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution API absent: $Name"
}

$CodexForgeApprovedAudioProviderTrialRequiredMarkers = @(
  '3114-3145 - First Approved Audio Provider Trial'
  '3114-3145 - First Approved Audio Provider Trial Mega Batch v1'
  'First Approved Audio Provider Trial'
  'review-only approved audio provider trial'
  'synthetic audio provider trial data only'
  'audio provider trial remains blocked until explicit operator approval'
  'approved audio provider intent'
  'approved audio provider approval packet'
  'approved audio provider selection'
  'approved audio provider credential reference boundary'
  'approved audio provider token reference boundary'
  'approved audio provider brief'
  'approved audio provider voice plan'
  'approved audio provider narration script'
  'approved audio provider transcript packet'
  'approved audio provider prompt envelope'
  'approved audio provider request envelope'
  'approved audio provider response envelope'
  'approved audio provider error envelope'
  'approved audio provider dry lock'
  'approved audio provider execution remains blocked'
  'approved audio recording remains blocked'
  'approved audio upload remains blocked'
  'approved audio download remains blocked'
  'audio safety review remains review-only'
  'audio redaction review remains review-only'
  'approved audio provider audit packet'
  'approved audio provider observability trace'
  'approved audio provider cost estimate'
  'approved audio provider rate estimate'
  'approved audio provider privacy gate'
  'approved audio provider region policy'
  'approved audio provider data retention policy'
  'approved audio provider retry fallback policy'
  'approved audio provider result review'
  'approved audio provider runner handoff remains review-only'
  'first approved audio provider trial completion does not call providers'
  'audio prompt packet remains synthetic'
  'synthetic audio result envelope'
  'audio asset handoff review remains review-only'
  'approved audio provider operator review remains required'
  'no live provider calls'
  'no audio model calls'
  'no transcription model calls'
  'no model calls'
  'no prompt sending'
  'no audio generation'
  'no audio rendering'
  'no audio recording'
  'no microphone access'
  'no media device access'
  'no transcription execution'
  'no voice cloning'
  'no voice synthesis'
  'no playback engine creation'
  'no streaming'
  'no provider SDK imports'
  'no audio provider imports'
  'no transcription provider imports'
  'no image provider imports'
  'no text provider imports'
  'no video provider imports'
  'no editing/upscale provider imports'
  'no metadata provider imports'
  'no safety provider imports'
  'no network egress'
  'no fetch/network calls'
  'no connector calls'
  'no upload/download'
  'no audio upload'
  'no audio download'
  'no file export'
  'no artifact export execution'
  'no publish gateway execution'
  'no platform upload'
  'no render execution'
  'no video rendering'
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
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no credential storage'
  'no token storage'
  'no OAuth token storage'
  'no provider key storage'
  'no database writes'
  'no service creation'
  'no API creation from frontend'
  'no port binding'
  'no runtime deploy'
  'next likely batch: 3146-3177 - Live Provider Credential Vault Readiness'
)

$CodexForgeApprovedAudioProviderTrialBannedPatterns = @(
  '\bfetch\s*\('
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'navigator\.mediaDevices'
  'getUserMedia\s*\('
  'MediaRecorder'
  'AudioContext'
  'webkitAudioContext'
  'createMediaStream'
  'HTMLAudioElement'
  'new\s+Audio\s*\('
  '\.[Pp]lay\s*\('
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
  'audio\.generate'
  'audio\.render'
  'audio\.record'
  'audio\.upload'
  'audio\.download'
  'transcription\.execute'
  'transcribe\s*\('
  'voice\.clone'
  'voice\.synthesize'
  'stream\s*\('
  'upload\s*\('
  'download\s*\('
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

function Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\approved-audio-provider-trial-map\approved-audio-provider-trial-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\approved-audio-provider-trial-map\components\ApprovedAudioProviderTrialPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\approved-audio-provider-trial-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\approved-audio-provider-trial-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-approved-audio-provider-trial-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath)) {
    Assert-CodexForgeApprovedAudioProviderTrialFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeApprovedAudioProviderTrialContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeApprovedAudioProviderTrialContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeApprovedAudioProviderTrialContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeApprovedAudioProviderTrialContains $routeSource "ApprovedAudioProviderTrialRoutePanel" "route panel uses shared approved audio provider trial panel"
  foreach ($marker in $CodexForgeApprovedAudioProviderTrialRequiredMarkers) { Assert-CodexForgeApprovedAudioProviderTrialContains $routeSource $marker "route marker $marker" }
  foreach ($pattern in $CodexForgeApprovedAudioProviderTrialBannedPatterns) { Assert-CodexForgeApprovedAudioProviderTrialNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeApprovedAudioProviderTrialContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeApprovedAudioProviderTrialContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeApprovedAudioProviderTrialContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeApprovedAudioProviderTrialContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeApprovedAudioProviderTrialContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeApprovedAudioProviderTrialContains $navRegistry "group: `"Creative`"" "navigation group"
  Assert-CodexForgeApprovedAudioProviderTrialContains $navRegistry "safetyPosture: `"review-gated`"" "navigation safety posture"
  Assert-CodexForgeApprovedAudioProviderTrialContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeApprovedAudioProviderTrialContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeApprovedAudioProviderTrialContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeApprovedAudioProviderTrialContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeApprovedAudioProviderTrialContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeApprovedAudioProviderTrialBannedPatterns) { Assert-CodexForgeApprovedAudioProviderTrialNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
