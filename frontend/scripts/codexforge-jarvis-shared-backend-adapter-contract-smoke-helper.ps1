function Assert-CodexForgeJarvisSharedBackendAdapterContractFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisSharedBackendAdapterContractContains {
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

function Assert-CodexForgeJarvisSharedBackendAdapterContractNotMatches {
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

$CodexForgeJarvisSharedBackendAdapterContractRequiredMarkers = @(
  '3594-3625 - Jarvis Shared Backend Adapter Contract'
  '3594-3625 - Jarvis Shared Backend Adapter Contract Mega Batch v1'
  'Jarvis Shared Backend Adapter Contract'
  'Jarvis shared backend adapter contract only'
  'shared adapter contract foundation'
  'manifest-driven adapter registry'
  'one Jarvis brain with specialist workspaces'
  'Jarvis operating system with feature workspaces'
  'video workspace plugs into shared adapter contract'
  'website workspace plugs into shared adapter contract'
  'avatar workspace plugs into shared adapter contract'
  'chatbot brain plugs into shared adapter contract'
  'trading workspace plugs into shared adapter contract'
  'workflow workspace plugs into shared adapter contract'
  'render export publish plugs into shared adapter contract'
  'capability id required'
  'feature domain required'
  'risk tier required'
  'permission posture required'
  'approval mode required'
  'dry-run mode required'
  'backend-only mode required'
  'input envelope review only'
  'output envelope review only'
  'error envelope review only'
  'credential reference policy only'
  'token reference policy only'
  'execution policy remains blocked'
  'audit hook readiness only'
  'observability hook readiness only'
  'result ledger hook readiness only'
  'memory boundary hook readiness only'
  'kill switch hook required'
  'lock manager hook required'
  'idempotency hook required'
  'replay block hook required'
  'operator review required before adapter execution'
  'shared backend adapter contract completion does not enable provider/render/export/publish/workers/trading/automation'
  'disabled by default'
  'hard kill switch'
  'no direct frontend execution'
  'no live provider call'
  'no provider execution'
  'no video provider execution'
  'no image provider execution'
  'no audio provider execution'
  'no website creation execution'
  'no avatar generation execution'
  'no chatbot autonomous execution'
  'no trading execution'
  'no paper trading execution'
  'no real-money trading execution'
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
  'next likely batch: 3626-3657 - Jarvis Permission and Approval Engine'
)

$CodexForgeJarvisSharedBackendAdapterContractBannedPatterns = @(
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

function Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke {
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

  $sharedModelPath = Join-Path $root "src\lib\codexforge\jarvis-shared-backend-adapter-contract-map\jarvis-shared-backend-adapter-contract-model.ts"
  $sharedManifestPath = Join-Path $root "src\lib\codexforge\jarvis-shared-backend-adapter-contract-map\jarvis-shared-backend-adapter-contract-manifest.ts"
  $sharedSafetyPath = Join-Path $root "src\lib\codexforge\jarvis-shared-backend-adapter-contract-map\jarvis-shared-backend-adapter-contract-safety.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\jarvis-shared-backend-adapter-contract-map\components\JarvisSharedBackendAdapterContractPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\jarvis-shared-backend-adapter-contract-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\jarvis-shared-backend-adapter-contract-map\components\index.ts"

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-shared-backend-adapter-contract-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile

  $docsPaths = @(
    (Join-Path $repoRoot "README.md")
    (Join-Path $root "README.md")
    (Join-Path $root "docs\codexforge-checkpoint-current.md")
    (Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md")
  )

  foreach ($path in @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $sharedModelPath,
    $sharedManifestPath,
    $sharedSafetyPath,
    $sharedPanelPath,
    $sharedIndexPath,
    $sharedComponentsIndexPath,
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath,
    $allSmokePath,
    $wrapperSmokePath,
    $scriptPath
  ) + $docsPaths) {
    Assert-CodexForgeJarvisSharedBackendAdapterContractFileExists $path
  }

  $routeSource = @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $sharedModelPath,
    $sharedManifestPath,
    $sharedSafetyPath,
    $sharedPanelPath,
    $sharedIndexPath,
    $sharedComponentsIndexPath
  ) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $sharedManifest = Get-Content -Raw $sharedManifestPath
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $routeSource "JarvisSharedBackendAdapterContractRoutePanel" "route panel uses shared Jarvis shared backend adapter contract panel"

  foreach ($capabilityId in @(
    "video.generate",
    "website.create",
    "avatar.prepare",
    "chatbot.plan",
    "trading.paperReview",
    "workflow.prepare",
    "render.publishReview"
  )) {
    Assert-CodexForgeJarvisSharedBackendAdapterContractContains $sharedManifest $capabilityId "shared manifest entry $capabilityId"
  }

  foreach ($marker in $CodexForgeJarvisSharedBackendAdapterContractRequiredMarkers) {
    Assert-CodexForgeJarvisSharedBackendAdapterContractContains $routeSource $marker "route marker $marker"
    Assert-CodexForgeJarvisSharedBackendAdapterContractContains $docsCombined $marker "docs marker $marker"
  }

  foreach ($pattern in $CodexForgeJarvisSharedBackendAdapterContractBannedPatterns) {
    Assert-CodexForgeJarvisSharedBackendAdapterContractNotMatches $routeSource $pattern "route source"
    Assert-CodexForgeJarvisSharedBackendAdapterContractNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }

  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"

  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $navRegistry 'group: "Advanced"' "navigation group"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $navRegistry 'safetyPosture: "approval-gated"' "navigation safety posture"

  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $navTypes ('| "' + $RouteHref + '"') "route href marker"

  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeJarvisSharedBackendAdapterContractContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"

  Write-Host "[OK] $SmokeName passed."
}
