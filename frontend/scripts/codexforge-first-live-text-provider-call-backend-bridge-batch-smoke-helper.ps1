function Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeFirstLiveTextProviderCallBackendBridgeRequiredMarkers = @(
  '3178-3209 - First Live Text Provider Call Backend Bridge'
  '3178-3209 - First Live Text Provider Call Backend Bridge Mega Batch v1'
  'First Live Text Provider Call Backend Bridge'
  'first tightly controlled live text provider call bridge'
  'single approved text provider only'
  'one approved provider only'
  'one harmless approved prompt only'
  'Return OK and the approved dry-run id.'
  'manual operator approval required before live text provider call'
  'backend-owned credential reference only'
  'provider key never exposed to frontend'
  'provider token never exposed to frontend'
  'frontend secret exposure remains blocked'
  'first live text provider request envelope'
  'first live text provider response envelope'
  'first live text provider error envelope'
  'first live text provider cost cap'
  'first live text provider rate cap'
  'first live text provider timeout cap'
  'first live text provider privacy gate'
  'first live text provider safety gate'
  'first live text provider redaction preview'
  'first live text provider audit packet'
  'first live text provider observability trace'
  'first live text provider result capture'
  'first live text provider result review'
  'first live text provider kill switch'
  'first live text provider single call lock'
  'first live text provider idempotency key'
  'first live text provider replay remains blocked'
  'first live text provider retry policy'
  'first live text provider fallback policy'
  'first live text provider region policy'
  'first live text provider data retention policy'
  'backend runtime check remains required'
  'operator review remains required before first live text provider call'
  'first live text provider runner handoff remains backend-owned'
  'first live text provider readiness gate'
  'first live text provider call backend bridge completion does not enable broad provider execution'
  'live call cannot execute until a backend-owned execution runtime exists'
  'disabled by default'
  'hard kill switch'
  'tiny cost cap'
  'audit/result capture'
  'no provider key in frontend'
  'no token in frontend'
  'no plaintext secrets'
  'no browser storage for secrets'
  'no frontend process.env provider key reads'
  'no provider SDK imports in frontend'
  'no broad provider execution'
  'no image provider calls'
  'no audio provider calls'
  'no video provider calls'
  'no render execution'
  'no artifact export execution'
  'no publish gateway execution'
  'no platform upload'
  'no file writes from the app'
  'no upload/download'
  'no OAuth flow creation'
  'no webhook creation'
  'no signed URL creation'
  'no service creation from frontend'
  'no API creation from frontend'
  'no runtime deploy'
  'no command/shell/process execution from the app'
  'next likely batch: 3210-3241 - CodexForge Primary Navigation and Workspace Layout Upgrade'
)

$CodexForgeFirstLiveTextProviderCallBackendBridgeBannedPatterns = @(
  '\bfetch\s*\('
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'localStorage\s*[\.\[]'
  'sessionStorage\s*[\.\[]'
  'indexedDB\s*[\.\[]'
  'document\.cookie'
  'cookie\s*='
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'process\.env\s*\[[''"][^''"]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
  'apiKey\s*[:=]'
  'providerKey\s*[:=]'
  'providerToken\s*[:=]'
  'accessToken\s*[:=]'
  'refreshToken\s*[:=]'
  'clientSecret\s*[:=]'
  'plaintextSecret\s*[:=]'
  'sk-[A-Za-z0-9_]{20,}'
  'sk-proj-[A-Za-z0-9_-]{20,}'
  'AIza[0-9A-Za-z_-]{20,}'
  'xox[baprs]-[0-9A-Za-z-]{20,}'
  'gh[pousr]_[A-Za-z0-9_]{20,}'
  'from\s+[''"]openai[''"]'
  'from\s+[''"]@anthropic'
  'from\s+[''"]@google'
  'from\s+[''"]@aws-sdk'
  'from\s+[''"]@azure/keyvault'
  'from\s+[''"]@google-cloud/secret-manager'
  'from\s+[''"]replicate'
  'from\s+[''"]stability'
  'from\s+[''"]elevenlabs'
  'from\s+[''"]assemblyai'
  'from\s+[''"]deepgram'
  'from\s+[''"]runway'
  'from\s+[''"]fal'
  'provider\.(send|call|execute)\s*\('
  'model\.(call|execute)\s*\('
  'prompt\.send\s*\('
  'stream\s*\('
  'textProvider\.(call|execute)\s*\('
  'imageProvider\.(call|execute)\s*\('
  'audioProvider\.(call|execute)\s*\('
  'videoProvider\.(call|execute)\s*\('
  'generateImage\s*\('
  'generateAudio\s*\('
  'generateVideo\s*\('
  'synthesizeAudio\s*\('
  'renderQueue\.dispatch'
  'worker\.dispatch'
  'Worker\s*\('
  'artifactExport\.execute'
  'publishGateway\.execute'
  'upload\s*\('
  'download\s*\('
  'createService\s*\('
  'createApi\s*\('
  'createAPI\s*\('
  'createRoute\s*\('
  'createWebhook\s*\('
  'createSignedUrl\s*\('
  'createSignedURL\s*\('
  'createOAuth\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
)

function Invoke-CodexForgeFirstLiveTextProviderCallBackendBridgeBatchSmoke {
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
  if ($Route -match "[\\/]" ) { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match "[\\/]" ) { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $unexpectedRoutePath = Join-Path $appRouteDir "route.ts"
  if (Test-Path $unexpectedRoutePath) { throw "[FAIL] API route creation is not allowed for this batch: $unexpectedRoutePath" }
  $unexpectedApiPath = Join-Path $root "src\app\api\codexforge\$Route"
  if (Test-Path $unexpectedApiPath) { throw "[FAIL] API creation is not allowed for this batch: $unexpectedApiPath" }
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\first-live-text-provider-call-backend-bridge-map\first-live-text-provider-call-backend-bridge-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\first-live-text-provider-call-backend-bridge-map\components\FirstLiveTextProviderCallBackendBridgePanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\first-live-text-provider-call-backend-bridge-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\first-live-text-provider-call-backend-bridge-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-live-text-provider-call-backend-bridge-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath)) {
    Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $routeSource "FirstLiveTextProviderCallBackendBridgeRoutePanel" "route panel uses shared first live text provider call backend bridge panel"
  foreach ($marker in $CodexForgeFirstLiveTextProviderCallBackendBridgeRequiredMarkers) { Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $routeSource $marker "route marker $marker" }
  foreach ($pattern in $CodexForgeFirstLiveTextProviderCallBackendBridgeBannedPatterns) { Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $commandRegistry ""$RouteHref": true" "command route availability href"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $commandRegistry "href: "$RouteHref"" "command palette href"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $navRegistry "href: "$RouteHref"" "navigation href"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $navRegistry "commandDeckRole: "workspace"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $navRegistry "group: "Creative"" "navigation group"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $navRegistry "safetyPosture: "review-gated"" "navigation safety posture"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $navTypes "| "$Route"" "route id type"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $navTypes "| "$RouteHref"" "route href type"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeFirstLiveTextProviderCallBackendBridgeBannedPatterns) { Assert-CodexForgeFirstLiveTextProviderCallBackendBridgeNotMatches ($commandRegistry + "
" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}