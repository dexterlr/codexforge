function Assert-CodexForgeVideoProviderExecutionAdapterReadinessFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw ("[FAIL] Missing " + $Name + ": " + $Needle)
  }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeVideoProviderExecutionAdapterReadinessNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern"
  }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeVideoProviderExecutionAdapterReadinessRequiredMarkers = @(
  '3530-3561 - First Backend-Owned Video Provider Execution Adapter Readiness'
  '3530-3561 - First Backend-Owned Video Provider Execution Adapter Readiness Mega Batch v1'
  'First Backend-Owned Video Provider Execution Adapter Readiness'
  'backend-owned video provider execution adapter readiness'
  'adapter readiness only'
  'no live provider call'
  'no real video generation'
  'no live video generation'
  'real video provider execution remains blocked'
  'backend-owned adapter contract only'
  'approved provider reference required'
  'credential reference only'
  'token reference only'
  'dry-run reference required'
  'approval packet reference required'
  'request envelope readiness only'
  'response envelope readiness only'
  'error envelope readiness only'
  'prompt redaction gate readiness only'
  'cost guard readiness only'
  'rate guard readiness only'
  'timeout guard readiness only'
  'duration resolution size guard readiness only'
  'backend-owned adapter privacy gate readiness'
  'backend-owned adapter safety gate readiness'
  'backend-owned adapter lineage packet readiness'
  'backend-owned adapter audit packet readiness'
  'backend-owned adapter observability trace readiness'
  'backend-owned adapter result capture readiness'
  'backend-owned adapter artifact handoff readiness'
  'hard kill switch remains enforced'
  'single-call lock remains required'
  'idempotency key remains required'
  'replay block remains required'
  'retry policy remains review-only'
  'fallback policy remains review-only'
  'backend-owned runtime check remains required'
  'server-only boundary remains required'
  'operator review remains required before real video provider execution'
  'first backend-owned video provider execution adapter readiness completion does not enable live provider/render/export/publish/workers'
  'disabled by default'
  'hard kill switch'
  'no provider execution'
  'no live provider execution'
  'no video provider execution'
  'no network execution'
  'no render execution'
  'no export execution'
  'no publish execution'
  'no worker dispatch'
  'no file export'
  'no download generation'
  'no archive creation'
  'no signed URL creation'
  'no platform upload'
  'no media upload'
  'no OAuth flow creation'
  'no webhook creation'
  'no schedule execution'
  'no account authorization execution'
  'no API route execution'
  'no service creation'
  'no runtime deploy'
  'no file writes from the app'
  'no shell/process/command execution from the app'
  'no fetch/network calls'
  'no provider SDK imports in frontend'
  'no frontend provider key reads'
  'no plaintext secrets'
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no browser storage for secrets'
  'next likely batch: 3562-3593 - Jarvis Operator Control Plane Foundation'
)

$CodexForgeVideoProviderExecutionAdapterReadinessBannedPatterns = @(
  '\bfetch\s*\('
  'axios\s*\.'
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
  "process\.env\s*\[['`"][^'`"]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)"
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
  'apiKey\s*[:=]'
  'providerKey\s*[:=]'
  'providerToken\s*[:=]'
  'accessToken\s*[:=]'
  'refreshToken\s*[:=]'
  'clientSecret\s*[:=]'
  'Bearer\s+[A-Za-z0-9._-]{16,}'
  'sk-[A-Za-z0-9_]{20,}'
  'sk-proj-[A-Za-z0-9_-]{20,}'
  "from\s+['`"]openai['`"]"
  "from\s+['`"]@anthropic"
  "from\s+['`"]@google"
  "from\s+['`"]@aws-sdk"
  "from\s+['`"]replicate"
  "from\s+['`"]runway"
  "from\s+['`"]fal"
  'new\s+OpenAI\s*\('
  'provider\.(send|call|execute)\s*\('
  'model\.(call|execute)\s*\('
  'prompt\.send\s*\('
  'stream\s*\('
  'imageProvider\.(call|execute)\s*\('
  'audioProvider\.(call|execute)\s*\('
  'videoProvider\.(call|execute)\s*\('
  'renderProvider\.(call|execute)\s*\('
  'exportProvider\.(call|execute)\s*\('
  'publishProvider\.(call|execute)\s*\('
  'workerProvider\.(call|execute)\s*\('
  'generateImage\s*\('
  'generateAudio\s*\('
  'generateVideo\s*\('
  'renderVideo\s*\('
  'renderArtifact\s*\('
  'renderQueue\.dispatch'
  'dispatchWorker\s*\('
  'worker\.dispatch'
  'Worker\s*\('
  'new\s+Worker'
  'artifactExport\.execute'
  'publishGateway\.execute'
  'upload\s*\('
  'download\s*\('
  'generateDownload\s*\('
  'createDownload\s*\('
  'createArchive\s*\('
  'JSZip'
  'createSignedUrl\s*\('
  'createSignedURL\s*\('
  'createOAuth\s*\('
  'createWebhook\s*\('
  'createService\s*\('
  'createApi\s*\('
  'createAPI\s*\('
  'createSchedule\s*\('
  'authorizeAccount\s*\('
  'writeFile\s*\('
  'appendFile\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
)

function Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke {
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
  if ($Route -match "[/\\]") { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match "[/\\]") { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\video-provider-execution-adapter-readiness-map\video-provider-execution-adapter-readiness-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\video-provider-execution-adapter-readiness-map\components\VideoProviderExecutionAdapterReadinessPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\video-provider-execution-adapter-readiness-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\video-provider-execution-adapter-readiness-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-video-provider-execution-adapter-readiness-mega-batch.ps1"
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
    (Join-Path $root "docs\operator\OPERATOR-V3-START.md")
    (Join-Path $root "docs\operator\OPERATOR-V3-SCOPE.md")
  )
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath) + $docsPaths) {
    Assert-CodexForgeVideoProviderExecutionAdapterReadinessFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $routeSource "VideoProviderExecutionAdapterReadinessRoutePanel" "route panel uses shared video provider execution adapter readiness panel"
  foreach ($marker in $CodexForgeVideoProviderExecutionAdapterReadinessRequiredMarkers) { Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $routeSource $marker "route marker $marker" }
  foreach ($marker in $CodexForgeVideoProviderExecutionAdapterReadinessRequiredMarkers) { Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $docsCombined $marker "docs marker $marker" }
  foreach ($pattern in $CodexForgeVideoProviderExecutionAdapterReadinessBannedPatterns) { Assert-CodexForgeVideoProviderExecutionAdapterReadinessNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $navRegistry 'group: "Creative"' "navigation group"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $navRegistry 'safetyPosture: "review-gated"' "navigation safety posture"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $navTypes ('| "' + $RouteHref + '"') "route href marker"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeVideoProviderExecutionAdapterReadinessContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeVideoProviderExecutionAdapterReadinessBannedPatterns) { Assert-CodexForgeVideoProviderExecutionAdapterReadinessNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
