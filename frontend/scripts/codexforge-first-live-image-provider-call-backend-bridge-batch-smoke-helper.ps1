function Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeFirstLiveImageProviderCallBackendBridgeRequiredMarkers = @(
  '3242-3273 - First Live Image Provider Call Backend Bridge'
  '3242-3273 - First Live Image Provider Call Backend Bridge Mega Batch v1'
  'First Live Image Provider Call Backend Bridge'
  'first tightly controlled live image provider call bridge'
  'image provider only'
  'single approved image provider only'
  'one approved image provider only'
  'one harmless approved image prompt only'
  'one tiny approved test image only'
  'Create one tiny neutral test image for the approved dry-run id.'
  'manual operator approval required before live image provider call'
  'backend-owned credential reference only'
  'provider key never exposed to frontend'
  'provider token never exposed to frontend'
  'frontend secret exposure remains blocked'
  'first live image provider request envelope'
  'first live image provider response envelope'
  'first live image provider error envelope'
  'first live image provider size cap'
  'first live image provider cost cap'
  'first live image provider rate cap'
  'first live image provider timeout cap'
  'first live image provider privacy gate'
  'first live image provider safety gate'
  'first live image provider redaction preview'
  'first live image provider audit packet'
  'first live image provider observability trace'
  'first live image provider result capture'
  'first live image provider result review'
  'first live image provider asset handoff remains review-only'
  'first live image provider kill switch'
  'first live image provider single call lock'
  'first live image provider idempotency key'
  'first live image provider replay remains blocked'
  'first live image provider retry policy'
  'first live image provider fallback policy'
  'first live image provider region policy'
  'first live image provider data retention policy'
  'backend runtime check remains required'
  'operator review remains required before first live image provider call'
  'first live image provider call backend bridge completion does not enable broad provider execution'
  'image bridge remains backend-owned'
  'image result review remains audit backed'
  'live image call cannot execute until a backend-owned execution runtime exists'
  'disabled by default'
  'hard kill switch'
  'tiny cost cap'
  'tiny size cap'
  'audit/result capture'
  'no provider key in frontend'
  'no token in frontend'
  'no plaintext secrets'
  'no browser storage for secrets'
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no frontend process.env provider key reads'
  'no provider SDK imports in frontend'
  'no broad provider execution'
  'no frontend image provider execution'
  'no frontend image provider calls'
  'no audio provider calls'
  'no video provider calls'
  'no render execution'
  'no artifact export execution'
  'no publish gateway execution'
  'no platform upload'
  'no download generation'
  'no signed URL creation'
  'no OAuth flow creation'
  'no webhook creation'
  'no worker execution'
  'no file writes from the app'
  'no shell/process/command execution from the app'
  'no service creation from frontend'
  'no API creation from frontend'
  'no runtime deploy'
  'next likely batch: 3274-3305 - First Live Audio Provider Call Backend Bridge'
)

$CodexForgeFirstLiveImageProviderCallBackendBridgeBannedPatterns = @(
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
  'Bearer\s+[A-Za-z0-9._-]{16,}'
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
  'new\s+OpenAI\s*\('
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
  'renderProvider\.(call|execute)\s*\('
  'exportProvider\.(call|execute)\s*\('
  'publishProvider\.(call|execute)\s*\('
  'upload\s*\('
  'download\s*\('
  'generateDownload\s*\('
  'createDownload\s*\('
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

function Invoke-CodexForgeFirstLiveImageProviderCallBackendBridgeBatchSmoke {
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
  $repoRoot = Resolve-Path (Join-Path $root "..")
  Set-Location $root
  Write-Host "=== $SmokeName ==="
  if ($RouteHref -match "^/codexforge/") { throw "[FAIL] Nested CodexForge route href is not allowed: $RouteHref" }
  if ($Route -match "[\/]" ) { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match "[\/]" ) { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\first-live-image-provider-call-backend-bridge-map\first-live-image-provider-call-backend-bridge-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\first-live-image-provider-call-backend-bridge-map\components\FirstLiveImageProviderCallBackendBridgePanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\first-live-image-provider-call-backend-bridge-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\first-live-image-provider-call-backend-bridge-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-live-image-provider-call-backend-bridge-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  $docsPaths = @(
    (Join-Path $repoRoot "README.md")
    (Join-Path $root "README.md")
    (Join-Path $root "CODEXFORGE-CHECKPOINT.md")
    (Join-Path $root "CODEXFORGE-HANDOFF.md")
    (Join-Path $root "docs\codexforge-checkpoint-current.md")
    (Join-Path $root "docs\codexforge-status-index.md")
    (Join-Path $root "docs\WORKSPACE_MAP.md")
    (Join-Path $root "docs\codexforge-structure-map.md")
    (Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md")
  )
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath) + $docsPaths) {
    Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $routeSource "FirstLiveImageProviderCallBackendBridgeRoutePanel" "route panel uses shared first live image provider call backend bridge panel"
  foreach ($marker in $CodexForgeFirstLiveImageProviderCallBackendBridgeRequiredMarkers) { Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $routeSource $marker "route marker $marker" }
  foreach ($marker in $CodexForgeFirstLiveImageProviderCallBackendBridgeRequiredMarkers) { Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $docsCombined $marker "docs marker $marker" }
  foreach ($pattern in $CodexForgeFirstLiveImageProviderCallBackendBridgeBannedPatterns) { Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $commandRegistry ""$RouteHref": true" "command route availability href"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $commandRegistry "href: "$RouteHref"" "command palette href"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $navRegistry "href: "$RouteHref"" "navigation href"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $navRegistry "commandDeckRole: "workspace"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $navRegistry "group: "Creative"" "navigation group"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $navRegistry "safetyPosture: "review-gated"" "navigation safety posture"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $navTypes "| "$Route"" "route id type"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $navTypes "| "$RouteHref"" "route href type"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeFirstLiveImageProviderCallBackendBridgeBannedPatterns) { Assert-CodexForgeFirstLiveImageProviderCallBackendBridgeNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
