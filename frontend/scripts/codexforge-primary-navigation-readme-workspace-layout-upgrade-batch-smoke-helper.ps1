function Assert-CodexForgePrimaryNavigationUpgradeFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgePrimaryNavigationUpgradeContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgePrimaryNavigationUpgradeNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) { throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern" }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgePrimaryNavigationUpgradeRequiredMarkers = @(
  '3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade'
  'CodexForge Primary Navigation, README, and Workspace Layout Upgrade'
  'god-tier product shell consolidation'
  'primary navigation product areas'
  'Home / Operator Cockpit'
  'Generate'
  'Projects'
  'Assets'
  'Providers'
  'Workflows'
  'Trading'
  'Audit / Runs'
  'Settings / Safety'
  'Developer / Checkpoints'
  'user action first'
  'safety state second'
  'evidence audit third'
  'technical implementation details last'
  'generation chat box appears first on generation pages'
  'approval state appears above technical metadata'
  'output preview appears above technical checkpoint details'
  'phase checkpoint routes remain preserved'
  'phase checkpoint routes do not dominate primary navigation'
  'README explains current live readiness status'
  'README explains provider key never exposed to frontend'
  'README explains first live text provider bridge'
  'Return OK and the approved dry-run id.'
  'next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge'
)

$CodexForgePrimaryNavigationUpgradeBannedPatterns = @(
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

function Invoke-CodexForgePrimaryNavigationReadmeWorkspaceLayoutUpgradeBatchSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\primary-navigation-readme-workspace-layout-upgrade-map\primary-navigation-readme-workspace-layout-upgrade-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\primary-navigation-readme-workspace-layout-upgrade-map\components\PrimaryNavigationReadmeWorkspaceLayoutUpgradePanel.tsx"
  $productAreaModelPath = Join-Path $root "src\lib\codexforge\navigation-shell\primary-product-area-model.ts"
  $sidebarPath = Join-Path $root "src\lib\codexforge\navigation-shell\components\CodexForgeSidebar.tsx"
  $appShellPath = Join-Path $root "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $rootReadmePath = Join-Path $repoRoot "README.md"
  $frontendReadmePath = Join-Path $root "README.md"
  $checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
  $handoffPath = Join-Path $root "CODEXFORGE-HANDOFF.md"
  $currentCheckpointPath = Join-Path $root "CODEXFORGE-CHECKPOINT.md"
  $statusPath = Join-Path $root "docs\codexforge-status-index.md"
  $runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-primary-navigation-readme-workspace-layout-upgrade-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile

  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$productAreaModelPath,$sidebarPath,$appShellPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$rootReadmePath,$frontendReadmePath,$checkpointPath,$handoffPath,$currentCheckpointPath,$statusPath,$runbookPath,$allSmokePath,$wrapperSmokePath,$scriptPath)) {
    Assert-CodexForgePrimaryNavigationUpgradeFileExists $path
  }

  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$productAreaModelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $navigationSource = (Get-Content -Raw $sidebarPath) + "`n" + (Get-Content -Raw $appShellPath)
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $docsCombined = @($rootReadmePath,$frontendReadmePath,$checkpointPath,$handoffPath,$currentCheckpointPath,$statusPath,$runbookPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath

  Assert-CodexForgePrimaryNavigationUpgradeContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgePrimaryNavigationUpgradeContains $routeSource $Title "phase title in route source"
  Assert-CodexForgePrimaryNavigationUpgradeContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgePrimaryNavigationUpgradeContains $routeSource "PrimaryNavigationReadmeWorkspaceLayoutUpgradeRoutePanel" "route panel uses shared product shell panel"
  foreach ($marker in $CodexForgePrimaryNavigationUpgradeRequiredMarkers) {
    Assert-CodexForgePrimaryNavigationUpgradeContains $routeSource $marker "route marker $marker"
    Assert-CodexForgePrimaryNavigationUpgradeContains $docsCombined $marker "docs marker $marker"
  }

  foreach ($area in @('Home / Operator Cockpit','Generate','Projects','Assets','Providers','Workflows','Trading','Audit / Runs','Settings / Safety','Developer / Checkpoints')) {
    Assert-CodexForgePrimaryNavigationUpgradeContains $navigationSource $area "primary product area $area"
    Assert-CodexForgePrimaryNavigationUpgradeContains $routeSource $area "route product area $area"
  }
  Assert-CodexForgePrimaryNavigationUpgradeContains $navigationSource "CODEXFORGE_PRIMARY_PRODUCT_AREAS" "primary product area model imported by sidebar"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navigationSource "phase checkpoint routes do not dominate primary navigation" "phase routes secondary marker"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navigationSource "phase checkpoint routes remain preserved" "phase routes preserved marker"

  foreach ($pattern in $CodexForgePrimaryNavigationUpgradeBannedPatterns) {
    Assert-CodexForgePrimaryNavigationUpgradeNotMatches $routeSource $pattern "route source"
    Assert-CodexForgePrimaryNavigationUpgradeNotMatches $navigationSource $pattern "primary navigation source"
  }

  Assert-CodexForgePrimaryNavigationUpgradeContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgePrimaryNavigationUpgradeContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgePrimaryNavigationUpgradeContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navRegistry 'group: "Audit"' "navigation group"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navRegistry 'safetyPosture: "review-gated"' "navigation safety posture"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgePrimaryNavigationUpgradeContains $navTypes ('| "' + $RouteHref + '"') "route href type"
  Assert-CodexForgePrimaryNavigationUpgradeContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgePrimaryNavigationUpgradeContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgePrimaryNavigationUpgradeContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  Assert-CodexForgePrimaryNavigationUpgradeContains $allSmoke "smoke-codexforge-first-live-text-provider-call-backend-bridge-mega-batch.ps1" "previous first live text provider bridge smoke preserved"
  Assert-CodexForgePrimaryNavigationUpgradeContains $docsCombined "3178-3209 - First Live Text Provider Call Backend Bridge" "previous checkpoint history preserved"
  Assert-CodexForgePrimaryNavigationUpgradeContains $docsCombined "3146-3177 - Live Provider Credential Vault Readiness" "credential vault history preserved"
  Assert-CodexForgePrimaryNavigationUpgradeContains $docsCombined "Highest detected phase: 3241" "docs current phase updated"

  foreach ($pattern in $CodexForgePrimaryNavigationUpgradeBannedPatterns) {
    Assert-CodexForgePrimaryNavigationUpgradeNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }
  Write-Host "[OK] $SmokeName passed."
}