function Assert-CodexForgeVideoProviderRuntimeReadinessFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeVideoProviderRuntimeReadinessContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeVideoProviderRuntimeReadinessNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeVideoProviderRuntimeReadinessRequiredMarkers = @(
  '3434-3465 - Backend-Owned Video Provider Execution Runtime Readiness'
  '3434-3465 - Backend-Owned Video Provider Execution Runtime Readiness Mega Batch v1'
  'Backend-Owned Video Provider Execution Runtime Readiness'
  'review-only backend-owned video provider execution runtime readiness'
  'backend-owned video runtime only'
  'video provider runtime readiness only'
  'backend runtime readiness only'
  'controlled video provider execution remains blocked'
  'approved video provider only'
  'approved credential reference only'
  'approved token reference only'
  'approved request envelope only'
  'approved response envelope only'
  'approved error envelope only'
  'approved prompt redaction gate only'
  'approved cost guard only'
  'approved rate guard only'
  'approved timeout guard only'
  'approved duration resolution size cap only'
  'backend-owned video provider privacy gate'
  'backend-owned video provider safety gate'
  'backend-owned video provider lineage packet'
  'backend-owned video provider audit packet'
  'backend-owned video provider observability trace'
  'backend-owned video provider result capture readiness'
  'backend-owned video provider artifact handoff readiness'
  'backend-owned video provider kill switch'
  'backend-owned video provider single-call lock'
  'backend-owned video provider idempotency key'
  'backend-owned video provider replay remains blocked'
  'backend-owned video provider retry policy'
  'backend-owned video provider fallback policy'
  'backend-owned runtime check remains required'
  'server-only boundary remains required'
  'operator review remains required before video provider execution'
  'backend-owned video provider execution runtime readiness completion does not enable provider/render/export/publish/workers'
  'disabled by default'
  'hard kill switch'
  'no provider execution'
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
  'next likely batch: 3466-3497 - First Backend-Owned Video Provider Execution Dry Run'
)

$CodexForgeVideoProviderRuntimeReadinessBannedPatterns = @(
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
  'process\.env\s*\[[''"][^''"]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
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
  'from\s+[''"]openai[''"]'
  'from\s+[''"]@anthropic'
  'from\s+[''"]@google'
  'from\s+[''"]@aws-sdk'
  'from\s+[''"]replicate'
  'from\s+[''"]runway'
  'from\s+[''"]fal'
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
  'writeFile\s*\('
  'appendFile\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
)

function Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\video-provider-runtime-readiness-map\video-provider-runtime-readiness-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\video-provider-runtime-readiness-map\components\VideoProviderRuntimeReadinessPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\video-provider-runtime-readiness-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\video-provider-runtime-readiness-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-video-provider-runtime-readiness-mega-batch.ps1"
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
    Assert-CodexForgeVideoProviderRuntimeReadinessFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $routeSource "VideoProviderRuntimeReadinessRoutePanel" "route panel uses shared video provider runtime readiness panel"
  foreach ($marker in $CodexForgeVideoProviderRuntimeReadinessRequiredMarkers) { Assert-CodexForgeVideoProviderRuntimeReadinessContains $routeSource $marker "route marker $marker" }
  foreach ($marker in $CodexForgeVideoProviderRuntimeReadinessRequiredMarkers) { Assert-CodexForgeVideoProviderRuntimeReadinessContains $docsCombined $marker "docs marker $marker" }
  foreach ($pattern in $CodexForgeVideoProviderRuntimeReadinessBannedPatterns) { Assert-CodexForgeVideoProviderRuntimeReadinessNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $navRegistry 'group: "Creative"' "navigation group"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $navRegistry 'safetyPosture: "review-gated"' "navigation safety posture"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $navTypes ('| "' + $RouteHref + '"') "route href type"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeVideoProviderRuntimeReadinessContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeVideoProviderRuntimeReadinessBannedPatterns) { Assert-CodexForgeVideoProviderRuntimeReadinessNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
