function Assert-CodexForgeJarvisUnifiedProductIaFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisUnifiedProductIaContains {
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

function Assert-CodexForgeJarvisUnifiedProductIaCountExactly {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [int]$Expected,
    [string]$Name
  )
  $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count
  if ($count -ne $Expected) {
    throw "[FAIL] $Name expected $Expected found $count"
  }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeJarvisUnifiedProductIaPatternCountExactly {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [int]$Expected,
    [string]$Name
  )
  $count = ([regex]::Matches($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::Multiline)).Count
  if ($count -ne $Expected) {
    throw "[FAIL] $Name expected $Expected found $count"
  }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeJarvisUnifiedProductIaNotMatches {
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

function Assert-CodexForgeJarvisUnifiedProductIaNoMixedBorderShorthand {
  param([string[]]$Paths)
  foreach ($path in $Paths) {
    $source = Get-Content -Raw $path
    if ($source -match 'border\s*:' -and $source -match 'border(Color|Width|Style|Top|Right|Bottom|Left)\s*:') {
      throw "[FAIL] Mixed inline border shorthand with longhand found in $path"
    }
  }
  Write-Host "[PASS] no mixed inline border shorthand with longhand in touched files"
}

$CodexForgeJarvisUnifiedProductIaRequiredMarkers = @(
  '3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish'
  '3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish Mega Batch v1'
  'Jarvis Unified Product IA and God-Tier UX Polish'
  'Jarvis unified product IA only'
  'world-class Jarvis product order'
  'home product order upgraded'
  'premium CodexForge cockpit order upgraded'
  'Jarvis command center order upgraded'
  'video studio remains primary active workspace'
  'trading workspace has dedicated polished page'
  'websites workspace placeholder only'
  'avatar workspace placeholder only'
  'workflows workspace placeholder only'
  'audit workspace placeholder only'
  'safety workspace placeholder only'
  'normal user path is primary'
  'developer diagnostics are secondary'
  'phase pages remain diagnostics only'
  'placeholders are intentional'
  'no direct frontend execution'
  'no live provider call'
  'no provider execution'
  'no live provider execution'
  'no video provider execution'
  'no real video generation'
  'no live video generation'
  'no image provider execution'
  'no audio provider execution'
  'no website creation execution'
  'no avatar generation execution'
  'no chatbot autonomous execution'
  'no trading execution'
  'no paper trading execution'
  'no real-money trading execution'
  'no financial advice'
  'no personalised recommendations'
  'no buy sell instructions'
  'no broker execution'
  'no live market data calls'
  'no tool execution'
  'no autonomous tool execution'
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
  'next likely batch: 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial'
)

$CodexForgeJarvisUnifiedProductIaSharedNeedles = @(
  'home'
  'codexforge-cockpit'
  'jarvis'
  'jarvis-video'
  'jarvis-trading'
  'jarvis-websites'
  'jarvis-avatar'
  'jarvis-workflows'
  'jarvis-audit'
  'jarvis-safety'
  'developer-diagnostics'
  'Video Studio'
  'Website Builder'
  'Avatar Studio'
  'Trading Desk'
  'Workflows'
  'Audit and Runs'
  'Safety and Settings'
  'Developer Diagnostics'
  'paper-review-only'
)

$CodexForgeJarvisUnifiedProductIaPrimaryUxMarkers = @(
  'home product order upgraded'
  'premium CodexForge cockpit order upgraded'
  'Jarvis command center order upgraded'
  'video studio remains primary active workspace'
  'trading workspace has dedicated polished page'
  'websites workspace placeholder only'
  'avatar workspace placeholder only'
  'workflows workspace placeholder only'
  'audit workspace placeholder only'
  'safety workspace placeholder only'
  'normal user path is primary'
  'developer diagnostics are secondary'
)

$CodexForgeJarvisUnifiedProductIaTradingMarkers = @(
  'no financial advice'
  'no personalised recommendations'
  'no buy sell instructions'
  'no broker execution'
  'no real-money trading'
  'no live market data calls'
)

$CodexForgeJarvisUnifiedProductIaBannedPatterns = @(
  '\bfetch\s*\('
  'axios\s*\.'
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'navigator\.sendBeacon'
  'navigator\.mediaDevices'
  'localStorage\s*[\.\[]'
  'sessionStorage\s*[\.\[]'
  'indexedDB\s*[\.\[]'
  'document\.cookie'
  'cookie\s*='
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
  'from\s+["''`]openai["''`]'
  'from\s+["''`]@anthropic'
  'from\s+["''`]@google'
  'from\s+["''`]@aws-sdk'
  'from\s+["''`]replicate["''`]'
  'new\s+OpenAI\s*\('
  'provider\.(send|call|execute)\s*\('
  'tool\.(send|call|execute|run)\s*\('
  'adapter\.(send|call|execute|run)\s*\('
  'dispatchWorker\s*\('
  'Worker\s*\('
  'new\s+Worker'
  'upload\s*\('
  'download\s*\('
  'createDownload\s*\('
  'createArchive\s*\('
  'createSignedUrl\s*\('
  'createSignedURL\s*\('
  'createOAuth\s*\('
  'createWebhook\s*\('
  'createSchedule\s*\('
  'authorizeAccount\s*\('
  'writeFile\s*\('
  'appendFile\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
  ':\s*any\b'
  '<\s*any\s*>'
  'as any'
  'Array<any>'
  '@ts-nocheck'
  '@ts-expect-error'
)

function Invoke-CodexForgeJarvisUnifiedProductIaSmoke {
  param(
    [string]$SmokeName,
    [string]$ScriptFile,
    [string]$Route,
    [string]$CommandLabel,
    [string]$RouteHref,
    [string]$Phase,
    [string]$Title
  )

  $ErrorActionPreference = 'Stop'
  $scriptRoot = $PSScriptRoot
  $root = Split-Path -Parent $scriptRoot
  Set-Location $root

  Write-Host "=== $SmokeName ==="

  if ($RouteHref -match '^/codexforge/') { throw "[FAIL] Nested CodexForge route href is not allowed: $RouteHref" }
  if ($Route -match '[/\\]') { throw "[FAIL] Route must be a flat slug: $Route" }
  if ($ScriptFile -match '[/\\]') { throw "[FAIL] Smoke scripts must live directly under scripts: $ScriptFile" }

  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir 'page.tsx'
  $pageClientPath = Join-Path $appRouteDir 'page-client.tsx'
  $unexpectedRoutePath = Join-Path $appRouteDir 'route.ts'
  if (Test-Path $unexpectedRoutePath) { throw "[FAIL] API route creation is not allowed for this batch: $unexpectedRoutePath" }
  $unexpectedApiPath = Join-Path $root "src\app\api\codexforge\$Route"
  if (Test-Path $unexpectedApiPath) { throw "[FAIL] API creation is not allowed for this batch: $unexpectedApiPath" }

  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir 'index.ts'
  $componentsIndexPath = Join-Path $libDir 'components\index.ts'
  $panelPath = Join-Path $libDir 'components\JarvisUnifiedProductIaPhasePanel.tsx'

  $primaryRouteFiles = @(
    (Join-Path $root 'src\app\page.tsx')
    (Join-Path $root 'src\app\page-client.tsx')
    (Join-Path $root 'src\app\codexforge-cockpit\page-client.tsx')
    (Join-Path $root 'src\app\jarvis\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-video\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-trading\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-websites\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-avatar\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-workflows\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-audit\page-client.tsx')
    (Join-Path $root 'src\app\jarvis-safety\page-client.tsx')
  )

  $sharedFiles = @(
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-model.ts')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-workspaces.ts')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-safety.ts')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisProductHero.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisWorkspaceGrid.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisNextActionRail.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisWorkspacePlaceholder.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisBlockedActionSummary.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisApprovalReadinessSummary.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisDeveloperDiagnosticsDock.tsx')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\components\index.ts')
    (Join-Path $root 'src\lib\codexforge\jarvis-unified-product-ia-map\index.ts')
  )

  $commandRegistryPath = Join-Path $root 'src\lib\codexforge\command-palette\command-registry.ts'
  $navRegistryPath = Join-Path $root 'src\lib\codexforge\navigation-shell\navigation-route-registry.ts'
  $navTypesPath = Join-Path $root 'src\lib\codexforge\navigation-shell\navigation-shell-types.ts'
  $allSmokePath = Join-Path $scriptRoot 'smoke-codexforge-all.ps1'
  $wrapperSmokePath = Join-Path $scriptRoot 'smoke-codexforge-jarvis-unified-product-ia-god-tier-ux-mega-batch.ps1'
  $scriptPath = Join-Path $scriptRoot $ScriptFile

  $docsPaths = @(
    (Join-Path $root 'README.md')
    (Join-Path $root 'docs\codexforge-checkpoint-current.md')
    (Join-Path $root 'docs\codexforge-operator-checkpoint-runbook.md')
  )

  foreach ($path in @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath,
    $allSmokePath,
    $wrapperSmokePath,
    $scriptPath
  ) + $sharedFiles + $primaryRouteFiles + $docsPaths) {
    Assert-CodexForgeJarvisUnifiedProductIaFileExists $path
  }

  $pageSource = Get-Content -Raw $pagePath
  $pageClientSource = Get-Content -Raw $pageClientPath
  $panelSource = Get-Content -Raw $panelPath
  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  $routeSource = @($pageSource, $pageClientSource, $panelSource) -join "`n"
  $phaseNeedle = $Phase -replace '^Phase\s+', ''
  $primaryRouteSource = ($primaryRouteFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisUnifiedProductIaContains $routeSource $phaseNeedle 'route source phase marker'
  Assert-CodexForgeJarvisUnifiedProductIaContains $routeSource $Title 'route source title'
  Assert-CodexForgeJarvisUnifiedProductIaContains $routeSource $RouteHref 'route source href'
  Assert-CodexForgeJarvisUnifiedProductIaContains $pageSource './page-client' 'route page re-export'
  Assert-CodexForgeJarvisUnifiedProductIaContains $pageClientSource 'JarvisUnifiedProductIaPhasePanel' 'route page-client wiring'
  Assert-CodexForgeJarvisUnifiedProductIaContains $panelSource 'JarvisUnifiedProductPhasePanel' 'route panel wiring'
  Assert-CodexForgeJarvisUnifiedProductIaContains $panelSource $Route 'route panel slug'

  foreach ($marker in $CodexForgeJarvisUnifiedProductIaRequiredMarkers) {
    Assert-CodexForgeJarvisUnifiedProductIaContains $sharedSource $marker "shared marker $marker"
  }

  foreach ($needle in $CodexForgeJarvisUnifiedProductIaSharedNeedles) {
    Assert-CodexForgeJarvisUnifiedProductIaContains $sharedSource $needle "shared model needle $needle"
  }

  foreach ($needle in $CodexForgeJarvisUnifiedProductIaPrimaryUxMarkers) {
    Assert-CodexForgeJarvisUnifiedProductIaContains $primaryRouteSource $needle "primary UX marker $needle"
  }

  foreach ($needle in $CodexForgeJarvisUnifiedProductIaTradingMarkers) {
    Assert-CodexForgeJarvisUnifiedProductIaContains $sharedSource $needle "trading marker $needle"
  }

  foreach ($docMarker in @(
    '3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish'
    '3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish Mega Batch v1'
    'Jarvis Unified Product IA and God-Tier UX Polish'
    'Jarvis unified product IA only'
    'world-class Jarvis product order'
    'home product order upgraded'
    'premium CodexForge cockpit order upgraded'
    'Jarvis command center order upgraded'
    'video studio remains primary active workspace'
    'trading workspace has dedicated polished page'
    'websites workspace placeholder only'
    'avatar workspace placeholder only'
    'workflows workspace placeholder only'
    'audit workspace placeholder only'
    'safety workspace placeholder only'
    'normal user path is primary'
    'developer diagnostics are secondary'
    'phase pages remain diagnostics only'
    'placeholders are intentional'
    'next likely batch: 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial'
  )) {
    Assert-CodexForgeJarvisUnifiedProductIaContains $docsCombined $docMarker "docs marker $docMarker"
  }

  Assert-CodexForgeJarvisUnifiedProductIaPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_UNIFIED_PRODUCT_IA_ROUTE_AVAILABILITY\s*=' 1 'route availability block exists once'
  Assert-CodexForgeJarvisUnifiedProductIaPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_UNIFIED_PRODUCT_IA_ROUTE_COMMANDS\s*=' 1 'route command registry block exists once'
  Assert-CodexForgeJarvisUnifiedProductIaPatternCountExactly $navRegistry '^\s*const\s+JARVIS_UNIFIED_PRODUCT_IA_ROUTE_INPUTS\s*=' 1 'route nav input block exists once'
  Assert-CodexForgeJarvisUnifiedProductIaPatternCountExactly $navRegistry '^\s*function\s+buildJarvisUnifiedProductIaRouteDefaults\s*\(' 1 'route nav defaults builder exists once'
  Assert-CodexForgeJarvisUnifiedProductIaContains $navRegistry 'commandDeckRole: "workspace"' 'nav route uses existing commandDeckRole workspace'
  Assert-CodexForgeJarvisUnifiedProductIaContains $navRegistry 'safetyPosture: "approval-gated"' 'nav route uses approval-gated posture'
  Assert-CodexForgeJarvisUnifiedProductIaContains $navTypes $Route 'nav types route id'
  Assert-CodexForgeJarvisUnifiedProductIaContains $navTypes $RouteHref 'nav types route href marker'
  Assert-CodexForgeJarvisUnifiedProductIaCountExactly $allSmoke $ScriptFile 1 'all-smoke references route smoke once'
  Assert-CodexForgeJarvisUnifiedProductIaCountExactly $wrapperSmoke $ScriptFile 1 'mega smoke references route smoke once'

  $relevantSourceFiles = @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath
  ) + $sharedFiles + $primaryRouteFiles
  $relevantSource = ($relevantSourceFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  foreach ($pattern in $CodexForgeJarvisUnifiedProductIaBannedPatterns) {
    Assert-CodexForgeJarvisUnifiedProductIaNotMatches $relevantSource $pattern 'relevant source files'
  }

  Assert-CodexForgeJarvisUnifiedProductIaNoMixedBorderShorthand $relevantSourceFiles

  Write-Host "[OK] $SmokeName passed."
}