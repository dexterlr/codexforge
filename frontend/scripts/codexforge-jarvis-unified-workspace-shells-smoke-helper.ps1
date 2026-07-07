function Assert-CodexForgeJarvisUnifiedWorkspaceShellsFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains {
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

function Assert-CodexForgeJarvisUnifiedWorkspaceShellsCountExactly {
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

function Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly {
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

function Assert-CodexForgeJarvisUnifiedWorkspaceShellsNotMatches {
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

$CodexForgeJarvisUnifiedWorkspaceShellsRequiredMarkers = @(
  "3722-3753 - Jarvis Unified Workspace Shells"
  "3722-3753 - Jarvis Unified Workspace Shells Mega Batch v1"
  "Jarvis Unified Workspace Shells"
  "Jarvis unified workspace shells only"
  "one Jarvis command center"
  "one shared workspace shell model"
  "one Jarvis brain with specialist workspaces"
  "Jarvis operating system with feature workspaces"
  "Jarvis command center route"
  "video workspace shell only"
  "website creation workspace shell only"
  "avatar workspace shell only"
  "chatbot brain workspace shell only"
  "trading workspace shell only"
  "workflow workspace shell only"
  "render publish workspace shell only"
  "audit status workspace shell only"
  "safety settings workspace shell only"
  "trading workspace has dedicated page"
  "specialist pages remain review-only"
  "shared capability grid only"
  "shared planner panel only"
  "shared permission panel only"
  "shared approval panel only"
  "shared audit panel only"
  "shared result ledger panel only"
  "shared memory boundary panel only"
  "shared kill switch panel only"
  "shared blocked action panel only"
  "shared dry-run panel only"
  "shared adapter status panel only"
  "shared risk tier panel only"
  "specialist navigation review only"
  "operator review required before any execution"
  "unified workspace shells completion does not enable provider/render/export/publish/workers/trading/automation"
  "disabled by default"
  "hard kill switch"
  "no direct frontend execution"
  "no live provider call"
  "no provider execution"
  "no video provider execution"
  "no image provider execution"
  "no audio provider execution"
  "no website creation execution"
  "no avatar generation execution"
  "no chatbot autonomous execution"
  "no trading execution"
  "no paper trading execution"
  "no real-money trading execution"
  "no tool execution"
  "no autonomous tool execution"
  "no network execution"
  "no render execution"
  "no export execution"
  "no publish execution"
  "no worker dispatch"
  "no file export"
  "no download generation"
  "no archive creation"
  "no signed URL creation"
  "no platform upload"
  "no media upload"
  "no OAuth flow creation"
  "no webhook creation"
  "no schedule execution"
  "no account authorization execution"
  "no API route execution"
  "no service creation"
  "no runtime deploy"
  "no file writes from the app"
  "no shell/process/command execution from the app"
  "no fetch/network calls"
  "no provider SDK imports in frontend"
  "no frontend provider key reads"
  "no plaintext secrets"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no browser storage for secrets"
  "next likely batch: 3754-3785 - First Jarvis-Controlled Video Adapter Plug-in"
)

$CodexForgeJarvisUnifiedWorkspaceShellsPrimaryRoutes = @(
  @{ Route = "jarvis"; Href = "/jarvis"; Label = "Jarvis Command Center" }
  @{ Route = "jarvis-video"; Href = "/jarvis-video"; Label = "Jarvis Video Workspace" }
  @{ Route = "jarvis-websites"; Href = "/jarvis-websites"; Label = "Jarvis Website Creation Workspace" }
  @{ Route = "jarvis-avatar"; Href = "/jarvis-avatar"; Label = "Jarvis Avatar Workspace" }
  @{ Route = "jarvis-chatbot"; Href = "/jarvis-chatbot"; Label = "Jarvis Chatbot Brain Workspace" }
  @{ Route = "jarvis-trading"; Href = "/jarvis-trading"; Label = "Jarvis Trading Workspace" }
  @{ Route = "jarvis-workflows"; Href = "/jarvis-workflows"; Label = "Jarvis Workflow Workspace" }
  @{ Route = "jarvis-render-publish"; Href = "/jarvis-render-publish"; Label = "Jarvis Render Publish Workspace" }
  @{ Route = "jarvis-audit"; Href = "/jarvis-audit"; Label = "Jarvis Audit Status Workspace" }
  @{ Route = "jarvis-safety"; Href = "/jarvis-safety"; Label = "Jarvis Safety Settings Workspace" }
)

$CodexForgeJarvisUnifiedWorkspaceShellsWorkspaceMarkers = @(
  'id: "jarvis"'
  'id: "jarvis-video"'
  'id: "jarvis-websites"'
  'id: "jarvis-avatar"'
  'id: "jarvis-chatbot"'
  'id: "jarvis-trading"'
  'id: "jarvis-workflows"'
  'id: "jarvis-render-publish"'
  'id: "jarvis-audit"'
  'id: "jarvis-safety"'
  'routeHref: "/jarvis"'
  'routeHref: "/jarvis-video"'
  'routeHref: "/jarvis-websites"'
  'routeHref: "/jarvis-avatar"'
  'routeHref: "/jarvis-chatbot"'
  'routeHref: "/jarvis-trading"'
  'routeHref: "/jarvis-workflows"'
  'routeHref: "/jarvis-render-publish"'
  'routeHref: "/jarvis-audit"'
  'routeHref: "/jarvis-safety"'
)

$CodexForgeJarvisUnifiedWorkspaceShellsBannedPatterns = @(
  "\bfetch\s*\("
  "axios\s*\."
  "XMLHttpRequest"
  "WebSocket"
  "EventSource"
  "navigator\.sendBeacon"
  "navigator\.mediaDevices"
  "localStorage\s*[\.\[]"
  "sessionStorage\s*[\.\[]"
  "indexedDB\s*[\.\[]"
  "document\.cookie"
  "cookie\s*="
  "process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)"
  "NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)"
  "from\s+['`"]openai['`"]"
  "from\s+['`"]@anthropic"
  "from\s+['`"]@google"
  "from\s+['`"]@aws-sdk"
  "from\s+['`"]replicate['`"]"
  "new\s+OpenAI\s*\("
  "provider\.(send|call|execute)\s*\("
  "tool\.(send|call|execute|run)\s*\("
  "adapter\.(send|call|execute|run)\s*\("
  "dispatchWorker\s*\("
  "Worker\s*\("
  "new\s+Worker"
  "upload\s*\("
  "download\s*\("
  "createDownload\s*\("
  "createArchive\s*\("
  "createSignedUrl\s*\("
  "createSignedURL\s*\("
  "createOAuth\s*\("
  "createWebhook\s*\("
  "createSchedule\s*\("
  "authorizeAccount\s*\("
  "writeFile\s*\("
  "appendFile\s*\("
  "child_process"
  "spawn\s*\("
  "exec\s*\("
  "execFile\s*\("
  ":\s*any\b"
  "<\s*any\s*>"
  "as any"
  "Array<any>"
  "@ts-nocheck"
  "@ts-expect-error"
)

function Invoke-CodexForgeJarvisUnifiedWorkspaceShellsSmoke {
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
  $panelPath = Join-Path $libDir "components\JarvisUnifiedWorkspaceShellPhasePanel.tsx"

  $primaryRouteFiles = @()
  foreach ($primaryRoute in $CodexForgeJarvisUnifiedWorkspaceShellsPrimaryRoutes) {
    $primaryRouteDir = Join-Path $root ("src\app\" + $primaryRoute.Route)
    $primaryRouteFiles += Join-Path $primaryRouteDir "page.tsx"
    $primaryRouteFiles += Join-Path $primaryRouteDir "page-client.tsx"
  }

  $sharedFiles = @(
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\jarvis-unified-workspace-shells-model.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\jarvis-unified-workspace-shells-workspaces.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\jarvis-unified-workspace-shells-panels.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\jarvis-unified-workspace-shells-safety.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\components\JarvisUnifiedWorkspaceShellPanel.tsx")
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\components\index.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-unified-workspace-shells-map\index.ts")
  )

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-unified-workspace-shells-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile

  $docsPaths = @(
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
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath,
    $allSmokePath,
    $wrapperSmokePath,
    $scriptPath
  ) + $sharedFiles + $primaryRouteFiles + $docsPaths) {
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsFileExists $path
  }

  $pageSource = Get-Content -Raw $pagePath
  $pageClientSource = Get-Content -Raw $pageClientPath
  $panelSource = Get-Content -Raw $panelPath
  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  $routeSource = @($pageSource, $pageClientSource, $panelSource, $sharedSource) -join "`n"
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $routeSource $Phase "route source phase marker"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $routeSource $Title "route source title"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $routeSource $RouteHref "route source href"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $pageSource './page-client' "route page re-export"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $pageClientSource $Route "page-client route slug"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $panelSource "JarvisUnifiedWorkspaceShellPanel" "route panel wiring"

  foreach ($marker in $CodexForgeJarvisUnifiedWorkspaceShellsRequiredMarkers) {
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $sharedSource $marker "shared marker $marker"
  }

  foreach ($workspaceMarker in $CodexForgeJarvisUnifiedWorkspaceShellsWorkspaceMarkers) {
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $sharedSource $workspaceMarker "workspace marker $workspaceMarker"
  }

  foreach ($docMarker in @(
    "3722-3753 - Jarvis Unified Workspace Shells"
    "3722-3753 - Jarvis Unified Workspace Shells Mega Batch v1"
    "Jarvis Unified Workspace Shells"
    "next likely batch: 3754-3785 - First Jarvis-Controlled Video Adapter Plug-in"
  )) {
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $docsCombined $docMarker "docs marker $docMarker"
  }

  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_UNIFIED_WORKSPACE_SHELL_PRIMARY_ROUTE_COMMANDS\s*=' 1 "primary route command registry block exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTE_COMMANDS\s*=' 1 "phase route command registry block exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_UNIFIED_WORKSPACE_SHELL_PRIMARY_ROUTE_AVAILABILITY\s*=' 1 "primary route availability block exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTE_AVAILABILITY\s*=' 1 "phase route availability block exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $navRegistry '^\s*const\s+JARVIS_UNIFIED_WORKSPACE_SHELL_PRIMARY_ROUTE_INPUTS\s*=' 1 "primary route nav input block exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $navRegistry '^\s*const\s+JARVIS_UNIFIED_WORKSPACE_SHELL_ROUTE_INPUTS\s*=' 1 "phase route nav input block exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $navRegistry '^\s*function\s+buildJarvisUnifiedWorkspaceShellPrimaryRouteDefaults\s*\(' 1 "primary route nav defaults builder exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsPatternCountExactly $navRegistry '^\s*function\s+buildJarvisUnifiedWorkspaceShellRouteDefaults\s*\(' 1 "phase route nav defaults builder exists once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $navRegistry 'commandDeckRole: "workspace"' 'nav route uses existing commandDeckRole workspace'
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $navRegistry 'safetyPosture: "approval-gated"' 'nav route uses approval-gated posture'
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $navTypes $Route "nav types route id"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $navTypes $RouteHref "nav types route href marker"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsCountExactly $allSmoke $ScriptFile 1 "all-smoke references route smoke once"
  Assert-CodexForgeJarvisUnifiedWorkspaceShellsCountExactly $wrapperSmoke $ScriptFile 1 "mega smoke references route smoke once"

  foreach ($primaryRoute in $CodexForgeJarvisUnifiedWorkspaceShellsPrimaryRoutes) {
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $sharedSource $primaryRoute.Label "primary workspace label $($primaryRoute.Label)"
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $navTypes $primaryRoute.Route "primary route nav type id $($primaryRoute.Route)"
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsContains $navTypes $primaryRoute.Href "primary route nav type href $($primaryRoute.Href)"
  }

  $relevantSourceFiles = @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath
  ) + $sharedFiles
  $relevantSource = ($relevantSourceFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  foreach ($pattern in $CodexForgeJarvisUnifiedWorkspaceShellsBannedPatterns) {
    Assert-CodexForgeJarvisUnifiedWorkspaceShellsNotMatches $relevantSource $pattern "relevant source files"
  }

  Write-Host "[OK] $SmokeName passed."
}
