function Assert-CodexForgeControlledRenderArtifactAssemblyTrialFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeControlledRenderArtifactAssemblyTrialNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeControlledRenderArtifactAssemblyTrialRequiredMarkers = @(
  '3338-3369 - Controlled Render Artifact Assembly Trial'
  '3338-3369 - Controlled Render Artifact Assembly Trial Mega Batch v1'
  'Controlled Render Artifact Assembly Trial'
  'review-only controlled render artifact assembly trial'
  'assembly plan only'
  'already-approved source references only'
  'approved text plan reference only'
  'approved image asset reference only'
  'approved audio asset reference only'
  'approved video clip reference only'
  'approved timeline manifest only'
  'approved scene order only'
  'approved duration budget only'
  'approved resolution budget only'
  'approved size budget only'
  'approved cost budget only'
  'controlled render artifact assembly privacy gate'
  'controlled render artifact assembly safety gate'
  'controlled render artifact assembly lineage packet'
  'controlled render artifact assembly audit packet'
  'controlled render artifact assembly observability trace'
  'controlled render artifact assembly result preview'
  'controlled render artifact assembly result review'
  'controlled render artifact assembly idempotency key'
  'controlled render artifact assembly replay remains blocked'
  'controlled render artifact assembly retry policy'
  'controlled render artifact assembly fallback policy'
  'render artifact assembly remains blocked until explicit operator approval'
  'backend-owned runtime check remains required'
  'operator review remains required before artifact assembly execution'
  'controlled render artifact assembly trial completion does not enable render/export/publish/workers'
  'disabled by default'
  'no provider execution'
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
  'no OAuth flow creation'
  'no webhook creation'
  'no file writes from the app'
  'no shell/process/command execution from the app'
  'no fetch/network calls'
  'no provider SDK imports in frontend'
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no browser storage for secrets'
  'next likely batch: 3370-3401 - Controlled Render Artifact Export Review Trial'
)

$CodexForgeControlledRenderArtifactAssemblyTrialBannedPatterns = @(
  '\bfetch\s*\(',
  'axios\s*\.',
  'XMLHttpRequest',
  'WebSocket',
  'EventSource',
  'sendBeacon',
  'navigator\.sendBeacon',
  'localStorage\s*[\.\[]',
  'sessionStorage\s*[\.\[]',
  'indexedDB\s*[\.\[]',
  'document\.cookie',
  'cookie\s*=',
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)',
  'process\.env\s*\[[''\"][^''\"]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)',
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)',
  'apiKey\s*[:=]',
  'providerKey\s*[:=]',
  'providerToken\s*[:=]',
  'accessToken\s*[:=]',
  'refreshToken\s*[:=]',
  'clientSecret\s*[:=]',
  'Bearer\s+[A-Za-z0-9._-]{16,}',
  'sk-[A-Za-z0-9_]{20,}',
  'sk-proj-[A-Za-z0-9_-]{20,}',
  'from\s+[''\"]openai[''\"]',
  'from\s+[''\"]@anthropic',
  'from\s+[''\"]@google',
  'from\s+[''\"]@aws-sdk',
  'from\s+[''\"]replicate',
  'from\s+[''\"]runway',
  'from\s+[''\"]fal',
  'from\s+[''\"]cloudinary',
  'new\s+OpenAI\s*\(',
  'provider\.(send|call|execute)\s*\(',
  'model\.(call|execute)\s*\(',
  'prompt\.send\s*\(',
  'stream\s*\(',
  'imageProvider\.(call|execute)\s*\(',
  'audioProvider\.(call|execute)\s*\(',
  'videoProvider\.(call|execute)\s*\(',
  'renderProvider\.(call|execute)\s*\(',
  'exportProvider\.(call|execute)\s*\(',
  'publishProvider\.(call|execute)\s*\(',
  'workerProvider\.(call|execute)\s*\(',
  'generateImage\s*\(',
  'generateAudio\s*\(',
  'generateVideo\s*\(',
  'renderVideo\s*\(',
  'renderArtifact\s*\(',
  'renderQueue\.dispatch',
  'dispatchWorker\s*\(',
  'worker\.dispatch',
  'Worker\s*\(',
  'new\s+Worker',
  'artifactExport\.execute',
  'publishGateway\.execute',
  'upload\s*\(',
  'download\s*\(',
  'generateDownload\s*\(',
  'createDownload\s*\(',
  'createArchive\s*\(',
  'JSZip',
  'createSignedUrl\s*\(',
  'createSignedURL\s*\(',
  'createOAuth\s*\(',
  'createWebhook\s*\(',
  'writeFile\s*\(',
  'appendFile\s*\(',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\('
)

function Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke {
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
  $repoRoot = Resolve-Path (Join-Path $root '..')
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
  $panelPath = Get-ChildItem -Path (Join-Path $libDir 'components') -Filter '*Panel.tsx' -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root 'src\lib\codexforge\controlled-render-artifact-assembly-trial-map\controlled-render-artifact-assembly-trial-model.ts'
  $sharedPanelPath = Join-Path $root 'src\lib\codexforge\controlled-render-artifact-assembly-trial-map\components\ControlledRenderArtifactAssemblyTrialPanel.tsx'
  $sharedIndexPath = Join-Path $root 'src\lib\codexforge\controlled-render-artifact-assembly-trial-map\index.ts'
  $sharedComponentsIndexPath = Join-Path $root 'src\lib\codexforge\controlled-render-artifact-assembly-trial-map\components\index.ts'
  $commandRegistryPath = Join-Path $root 'src\lib\codexforge\command-palette\command-registry.ts'
  $navRegistryPath = Join-Path $root 'src\lib\codexforge\navigation-shell\navigation-route-registry.ts'
  $navTypesPath = Join-Path $root 'src\lib\codexforge\navigation-shell\navigation-shell-types.ts'
  $allSmokePath = Join-Path $scriptRoot 'smoke-codexforge-all.ps1'
  $wrapperSmokePath = Join-Path $scriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-trial-mega-batch.ps1'
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  $docsPaths = @(
    (Join-Path $root 'README.md')
    (Join-Path $root 'CODEXFORGE-CHECKPOINT.md')
    (Join-Path $root 'CODEXFORGE-HANDOFF.md')
    (Join-Path $root 'docs\codexforge-checkpoint-current.md')
    (Join-Path $root 'docs\codexforge-status-index.md')
    (Join-Path $root 'docs\WORKSPACE_MAP.md')
    (Join-Path $root 'docs\codexforge-structure-map.md')
    (Join-Path $root 'docs\codexforge-operator-checkpoint-runbook.md')
    (Join-Path $root 'docs\operator\OPERATOR-V3-START.md')
    (Join-Path $root 'docs\operator\OPERATOR-V3-SCOPE.md')
  )
  $repoReadmePath = Join-Path $repoRoot 'README.md'
  if (Test-Path $repoReadmePath) {
    $docsPaths = @($repoReadmePath) + $docsPaths
  }
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath) + $docsPaths) {
    Assert-CodexForgeControlledRenderArtifactAssemblyTrialFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join [Environment]::NewLine
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $routeSource $RouteHref 'route href in route source'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $routeSource $Title 'phase title in route source'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $routeSource $Phase 'phase number in route source'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $routeSource 'ControlledRenderArtifactAssemblyTrialRoutePanel' 'route panel uses shared controlled render artifact assembly trial panel'
  foreach ($marker in $CodexForgeControlledRenderArtifactAssemblyTrialRequiredMarkers) { Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $routeSource $marker "route marker $marker" }
  foreach ($marker in $CodexForgeControlledRenderArtifactAssemblyTrialRequiredMarkers) { Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $docsCombined $marker "docs marker $marker" }
  foreach ($pattern in $CodexForgeControlledRenderArtifactAssemblyTrialBannedPatterns) { Assert-CodexForgeControlledRenderArtifactAssemblyTrialNotMatches $routeSource $pattern 'route source' }
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $commandRegistry ('"' + $RouteHref + '": true') 'command route availability href'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $commandRegistry ('href: "' + $RouteHref + '"') 'command palette href'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $commandRegistry $CommandLabel 'command palette label'
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host '[PASS] command palette href count exactly 1'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $navRegistry ('href: "' + $RouteHref + '"') 'navigation href'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $navRegistry 'commandDeckRole: "workspace"' 'navigation commandDeckRole uses existing workspace role'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $navRegistry 'group: "Creative"' 'navigation group'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $navRegistry 'safetyPosture: "review-gated"' 'navigation safety posture'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $navTypes ('| "' + $Route + '"') 'route id type'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $navTypes ('| "' + $RouteHref + '"') 'route href type'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $allSmoke $SmokeName 'all-smoke references route name'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $allSmoke $ScriptFile 'all-smoke references route smoke'
  Assert-CodexForgeControlledRenderArtifactAssemblyTrialContains $wrapperSmoke $ScriptFile 'wrapper smoke references route smoke'
  foreach ($pattern in $CodexForgeControlledRenderArtifactAssemblyTrialBannedPatterns) { Assert-CodexForgeControlledRenderArtifactAssemblyTrialNotMatches ($commandRegistry + [Environment]::NewLine + $navRegistry) $pattern 'command and navigation registry' }
  Write-Host "[OK] $SmokeName passed."
}
