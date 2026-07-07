function Assert-CodexForgeJarvisOperatorControlPlaneFoundationFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains {
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

function Assert-CodexForgeJarvisOperatorControlPlaneFoundationNotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern"
  }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeJarvisOperatorControlPlaneFoundationRequiredMarkers = @(
  '3562-3593 - Jarvis Operator Control Plane Foundation'
  '3562-3593 - Jarvis Operator Control Plane Foundation Mega Batch v1'
  'Jarvis Operator Control Plane Foundation'
  'Jarvis sits above all CodexForge features'
  'Jarvis control plane only'
  'shared backend adapter system foundation'
  'capability registry foundation'
  'permission posture foundation'
  'approval router foundation'
  'backend adapter contract foundation'
  'feature oversight only'
  'operator control plane only'
  'no direct frontend execution'
  'no live provider call'
  'no provider execution'
  'no video provider execution'
  'no image provider execution'
  'no audio provider execution'
  'no website creation execution'
  'no avatar generation execution'
  'no trading execution'
  'no paper trading execution'
  'no real-money trading execution'
  'video adapter awareness only'
  'website adapter awareness only'
  'avatar adapter awareness only'
  'chatbot brain awareness only'
  'trading adapter awareness only'
  'workflow adapter awareness only'
  'render export publish awareness only'
  'task planner readiness only'
  'human approval gate required'
  'risk tier review only'
  'dry-run first policy required'
  'audit readiness only'
  'observability readiness only'
  'result ledger readiness only'
  'memory boundary review only'
  'kill switch remains enforced'
  'lock manager readiness only'
  'idempotency readiness only'
  'replay block remains required'
  'operator review remains required before any execution'
  'Jarvis foundation completion does not enable provider/render/export/publish/workers/trading/automation'
  'disabled by default'
  'hard kill switch'
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
  'next likely batch: 3594-3625 - Jarvis Shared Backend Adapter Contract'
)

$CodexForgeJarvisOperatorControlPlaneFoundationBannedPatterns = @(
  '\bfetch\s*\('
  'axios\s*\.'
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'navigator\.mediaDevices'
  'localStorage\s*[\.\[]'
  'sessionStorage\s*[\.\[]'
  'indexedDB\s*[\.\[]'
  'document\.cookie'
  'cookie\s*='
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'process\.env\s*\[\s*["''][^"''\]]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
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

function Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\jarvis-control-plane-map\jarvis-control-plane-model.ts"
  $sharedCapabilitiesPath = Join-Path $root "src\lib\codexforge\jarvis-control-plane-map\jarvis-control-plane-capabilities.ts"
  $sharedSafetyPath = Join-Path $root "src\lib\codexforge\jarvis-control-plane-map\jarvis-control-plane-safety.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\jarvis-control-plane-map\components\JarvisControlPlanePanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\jarvis-control-plane-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\jarvis-control-plane-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-operator-control-plane-foundation-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  $docsPaths = @(
    (Join-Path $repoRoot "README.md")
    (Join-Path $root "README.md")
    (Join-Path $root "docs\codexforge-checkpoint-current.md")
    (Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md")
  )
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedCapabilitiesPath,$sharedSafetyPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath) + $docsPaths) {
    Assert-CodexForgeJarvisOperatorControlPlaneFoundationFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedCapabilitiesPath,$sharedSafetyPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $routeSource "JarvisControlPlaneRoutePanel" "route panel uses shared Jarvis control plane panel"
  foreach ($marker in $CodexForgeJarvisOperatorControlPlaneFoundationRequiredMarkers) {
    Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $routeSource $marker "route marker $marker"
    Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $docsCombined $marker "docs marker $marker"
  }
  foreach ($pattern in $CodexForgeJarvisOperatorControlPlaneFoundationBannedPatterns) {
    Assert-CodexForgeJarvisOperatorControlPlaneFoundationNotMatches $routeSource $pattern "route source"
    Assert-CodexForgeJarvisOperatorControlPlaneFoundationNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $navRegistry 'group: "Advanced"' "navigation group"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $navRegistry 'safetyPosture: "approval-gated"' "navigation safety posture"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $navTypes ('| "' + $RouteHref + '"') "route href marker"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeJarvisOperatorControlPlaneFoundationContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
