function Assert-CodexForgeJarvisTaskPlannerToolRouterFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisTaskPlannerToolRouterContains {
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

function Assert-CodexForgeJarvisTaskPlannerToolRouterCountExactly {
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

function Assert-CodexForgeJarvisTaskPlannerToolRouterNotMatches {
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

$CodexForgeJarvisTaskPlannerToolRouterRequiredMarkers = @(
  '3658-3689 - Jarvis Task Planner and Tool Router'
  '3658-3689 - Jarvis Task Planner and Tool Router Mega Batch v1'
  'Jarvis Task Planner and Tool Router'
  'Jarvis task planner and tool router only'
  'task planner foundation'
  'tool router foundation'
  'one Jarvis brain with shared task planning'
  'one Jarvis brain with shared tool routing'
  'user goal review only'
  'request envelope review only'
  'plan graph review only'
  'plan step review only'
  'capability selection review only'
  'risk check required'
  'permission check required'
  'approval check required'
  'dry-run routing required'
  'tool router contract review only'
  'backend adapter routing review only'
  'video route review only'
  'website route review only'
  'avatar route review only'
  'chatbot brain route review only'
  'trading route review only'
  'workflow route review only'
  'render publish route review only'
  'operator decision preview only'
  'blocked action summary only'
  'approval packet request readiness only'
  'audit preview only'
  'result ledger preview only'
  'memory boundary preview only'
  'kill switch check required'
  'lock manager check required'
  'idempotency check required'
  'replay block check required'
  'human review required before any execution'
  'task planner and tool router completion does not enable provider/render/export/publish/workers/trading/automation'
  'disabled by default'
  'hard kill switch'
  'no direct frontend execution'
  'no frontend execution of backend adapters'
  'no live provider call'
  'no provider execution'
  'no live provider execution'
  'no video provider execution'
  'no image provider execution'
  'no audio provider execution'
  'no website creation execution'
  'no avatar generation execution'
  'no chatbot autonomous execution'
  'no trading execution'
  'no paper trading execution'
  'no real-money trading execution'
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
  'no frontend secrets'
  'no plaintext secrets'
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no browser storage for secrets'
  'next likely batch: 3690-3721 - Jarvis Audit Result Ledger and Status Dashboard'
)

$CodexForgeJarvisTaskPlannerToolRouterBannedPatterns = @(
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
  "from\s+['`"]openai['`"]"
  "from\s+['`"]@anthropic"
  "from\s+['`"]@google"
  "from\s+['`"]@aws-sdk"
  "from\s+['`"]replicate['`"]"
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
)

function Invoke-CodexForgeJarvisTaskPlannerToolRouterSmoke {
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
  $panelPath = Join-Path $libDir "components\JarvisTaskPlannerPhasePanel.tsx"

  $sharedModelPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\jarvis-task-planner-tool-router-model.ts"
  $sharedPlansPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\jarvis-task-planner-tool-router-plans.ts"
  $sharedRoutesPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\jarvis-task-planner-tool-router-routes.ts"
  $sharedSafetyPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\jarvis-task-planner-tool-router-safety.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\components\JarvisTaskPlannerToolRouterPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\jarvis-task-planner-tool-router-map\components\index.ts"

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-task-planner-tool-router-mega-batch.ps1"
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
    $sharedPlansPath,
    $sharedRoutesPath,
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
    Assert-CodexForgeJarvisTaskPlannerToolRouterFileExists $path
  }

  $routeSource = @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $sharedModelPath,
    $sharedPlansPath,
    $sharedRoutesPath,
    $sharedSafetyPath,
    $sharedPanelPath,
    $sharedIndexPath,
    $sharedComponentsIndexPath
  ) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $sharedPlans = Get-Content -Raw $sharedPlansPath
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $routeSource "JarvisTaskPlannerToolRouterRoutePanel" "route panel uses shared Jarvis task planner tool router panel"

  foreach ($capabilityId in @(
    "video.generate",
    "website.create",
    "avatar.prepare",
    "chatbot.plan",
    "trading.paperReview",
    "workflow.prepare",
    "render.publishReview"
  )) {
    Assert-CodexForgeJarvisTaskPlannerToolRouterContains $sharedPlans $capabilityId "shared planner example $capabilityId"
  }

  foreach ($routeTarget in @(
    "/jarvis-task-planner-video-route-wiring",
    "/jarvis-task-planner-website-route-wiring",
    "/jarvis-task-planner-avatar-route-wiring",
    "/jarvis-task-planner-chatbot-brain-route-wiring",
    "/jarvis-task-planner-trading-route-wiring",
    "/jarvis-task-planner-workflow-route-wiring",
    "/jarvis-task-planner-render-publish-route-wiring"
  )) {
    Assert-CodexForgeJarvisTaskPlannerToolRouterContains $sharedPlans $routeTarget "shared planned route target $routeTarget"
  }

  foreach ($needle in @(
    "permission check required",
    "approval check required",
    "dry-run routing required",
    "backend-only route required",
    "blocked action summary only",
    "approval packet request readiness only",
    "audit preview only",
    "result ledger preview only",
    "memory boundary preview only",
    "kill switch check required",
    "lock manager check required",
    "idempotency check required",
    "replay block check required",
    "human review required before any execution"
  )) {
    Assert-CodexForgeJarvisTaskPlannerToolRouterContains $routeSource $needle "shared router marker $needle"
  }

  foreach ($marker in $CodexForgeJarvisTaskPlannerToolRouterRequiredMarkers) {
    Assert-CodexForgeJarvisTaskPlannerToolRouterContains $docsCombined $marker "docs marker $marker"
  }

  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $commandRegistry $RouteHref "command registry route href"
  Assert-CodexForgeJarvisTaskPlannerToolRouterCountExactly $commandRegistry $CommandLabel 1 "command label appears once"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $navRegistry $RouteHref "nav registry route href"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $navRegistry 'commandDeckRole: "workspace"' "nav registry command deck role"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $navRegistry 'group: "Advanced"' "nav registry advanced group"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $navRegistry 'safetyPosture: "approval-gated"' "nav registry approval posture"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $navTypes $Route "nav types route id"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $navTypes $RouteHref "nav types href marker"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeJarvisTaskPlannerToolRouterContains $wrapperSmoke $ScriptFile "mega smoke references route smoke"

  foreach ($pattern in $CodexForgeJarvisTaskPlannerToolRouterBannedPatterns) {
    Assert-CodexForgeJarvisTaskPlannerToolRouterNotMatches $routeSource $pattern "route source"
  }
}
