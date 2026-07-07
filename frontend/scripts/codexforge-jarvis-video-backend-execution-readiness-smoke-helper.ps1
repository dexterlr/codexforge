function Assert-CodexForgeJarvisVideoBackendExecutionReadinessFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains {
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

function Assert-CodexForgeJarvisVideoBackendExecutionReadinessCountExactly {
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

function Assert-CodexForgeJarvisVideoBackendExecutionReadinessPatternCountExactly {
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

function Assert-CodexForgeJarvisVideoBackendExecutionReadinessNotMatches {
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

function Assert-CodexForgeJarvisVideoBackendExecutionReadinessNoMixedBorderShorthand {
  param([string[]]$Paths)
  foreach ($path in $Paths) {
    $source = Get-Content -Raw $path
    if ($source -match 'border\s*:' -and $source -match 'border(Color|Width|Style|Top|Right|Bottom|Left)\s*:') {
      throw "[FAIL] Mixed inline border shorthand with longhand found in $path"
    }
  }
  Write-Host "[PASS] no mixed inline border shorthand with longhand in touched files"
}

$CodexForgeJarvisVideoBackendExecutionReadinessRequiredMarkers = @(
  "3882-3913 - First Jarvis-Controlled Video Backend Execution Readiness"
  "3882-3913 - First Jarvis-Controlled Video Backend Execution Readiness Mega Batch v1"
  "First Jarvis-Controlled Video Backend Execution Readiness"
  "Jarvis-controlled video backend execution readiness only"
  "/jarvis-video backend execution readiness remains review-only"
  "backend-only video execution contract readiness"
  "server runtime boundary readiness"
  "approved dry-run reference required"
  "approved approval packet reference required"
  "approved video adapter reference required"
  "provider runtime readiness review only"
  "credential reference readiness review only"
  "token redaction readiness review only"
  "request envelope readiness review only"
  "response envelope readiness review only"
  "error envelope readiness review only"
  "prompt redaction readiness review only"
  "cost rate timeout readiness review only"
  "duration resolution size readiness review only"
  "privacy safety gate readiness review only"
  "audit persistence readiness review only"
  "observability trace readiness review only"
  "result capture readiness review only"
  "artifact handoff readiness review only"
  "render export publish remains blocked"
  "worker dispatch remains blocked"
  "network egress remains blocked"
  "kill switch remains enforced"
  "single-call lock required"
  "idempotency required"
  "replay block required"
  "operator preflight checklist required"
  "backend execution readiness dashboard only"
  "operator review required before video execution"
  "backend execution readiness completion does not enable provider/render/export/publish/workers/trading/automation"
  "disabled by default"
  "hard kill switch"
  "backend-only execution path required"
  "no direct frontend execution"
  "no live provider call"
  "no provider execution"
  "no live provider execution"
  "no video provider execution"
  "no real video generation"
  "no live video generation"
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
  "next likely batch: 3914-3945 - First Jarvis-Controlled Video Controlled Execution Trial"
)

$CodexForgeJarvisVideoBackendExecutionReadinessSharedNeedles = @(
  "video.generate"
  "/jarvis-video"
  "backend-only video execution contract readiness"
  "server runtime boundary readiness"
  "approved dry-run reference required"
  "approved approval packet reference required"
  "approved video adapter reference required"
  "provider runtime readiness review only"
  "credential reference readiness review only"
  "token redaction readiness review only"
  "request envelope readiness review only"
  "response envelope readiness review only"
  "error envelope readiness review only"
  "prompt redaction readiness review only"
  "cost rate timeout readiness review only"
  "duration resolution size readiness review only"
  "privacy safety gate readiness review only"
  "audit persistence readiness review only"
  "observability trace readiness review only"
  "result capture readiness review only"
  "artifact handoff readiness review only"
  "render export publish remains blocked"
  "worker dispatch remains blocked"
  "network egress remains blocked"
  "kill switch remains enforced"
  "single-call lock required"
  "idempotency required"
  "replay block required"
  "operator preflight checklist required"
  "backend execution readiness dashboard only"
  "First Jarvis-Controlled Video Dry Run Workspace"
  "First Jarvis-Controlled Video Approval Packet Workspace"
  "First Jarvis-Controlled Video Adapter Plug-in"
)

$CodexForgeJarvisVideoBackendExecutionReadinessBannedPatterns = @(
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

function Invoke-CodexForgeJarvisVideoBackendExecutionReadinessSmoke {
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
  $panelPath = Join-Path $libDir "components\JarvisVideoBackendExecutionReadinessPhasePanel.tsx"

  $primaryRouteFiles = @(
    (Join-Path $root "src\app\jarvis-video\page.tsx")
    (Join-Path $root "src\app\jarvis-video\page-client.tsx")
  )

  $sharedFiles = @(
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\jarvis-video-backend-execution-readiness-model.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\jarvis-video-backend-execution-readiness-gates.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\jarvis-video-backend-execution-readiness-dashboard.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\jarvis-video-backend-execution-readiness-safety.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\components\JarvisVideoBackendExecutionReadinessPanel.tsx")
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\components\index.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-backend-execution-readiness-map\index.ts")
  )

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-video-backend-execution-readiness-mega-batch.ps1"
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
    Assert-CodexForgeJarvisVideoBackendExecutionReadinessFileExists $path
  }

  $pageSource = Get-Content -Raw $pagePath
  $pageClientSource = Get-Content -Raw $pageClientPath
  $panelSource = Get-Content -Raw $panelPath
  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  $routeSource = @($pageSource, $pageClientSource, $panelSource, $sharedSource) -join "`n"
  $phaseNeedle = $Phase -replace '^Phase\s+', ''
  $jarvisVideoSource = ($primaryRouteFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $routeSource $phaseNeedle "route source phase marker"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $routeSource $Title "route source title"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $routeSource $RouteHref "route source href"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $pageSource './page-client' "route page re-export"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $pageClientSource $Route "page-client route slug"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $panelSource "JarvisVideoBackendExecutionReadinessPanel" "route panel wiring"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $jarvisVideoSource "JarvisVideoBackendExecutionReadinessPageClientShell" "primary /jarvis-video backend execution readiness marker"

  foreach ($marker in $CodexForgeJarvisVideoBackendExecutionReadinessRequiredMarkers) {
    Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $sharedSource $marker "shared marker $marker"
  }

  foreach ($needle in $CodexForgeJarvisVideoBackendExecutionReadinessSharedNeedles) {
    Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $sharedSource $needle "shared model needle $needle"
  }

  foreach ($docMarker in @(
    "3882-3913 - First Jarvis-Controlled Video Backend Execution Readiness"
    "3882-3913 - First Jarvis-Controlled Video Backend Execution Readiness Mega Batch v1"
    "First Jarvis-Controlled Video Backend Execution Readiness"
    "next likely batch: 3914-3945 - First Jarvis-Controlled Video Controlled Execution Trial"
  )) {
    Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $docsCombined $docMarker "docs marker $docMarker"
  }

  Assert-CodexForgeJarvisVideoBackendExecutionReadinessPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_VIDEO_BACKEND_EXECUTION_READINESS_ROUTE_AVAILABILITY\s*=' 1 "route availability block exists once"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessPatternCountExactly $commandRegistry '^\s*const\s+JARVIS_VIDEO_BACKEND_EXECUTION_READINESS_ROUTE_COMMANDS\s*=' 1 "route command registry block exists once"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessPatternCountExactly $navRegistry '^\s*const\s+JARVIS_VIDEO_BACKEND_EXECUTION_READINESS_ROUTE_INPUTS\s*=' 1 "route nav input block exists once"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessPatternCountExactly $navRegistry '^\s*function\s+buildJarvisVideoBackendExecutionReadinessRouteDefaults\s*\(' 1 "route nav defaults builder exists once"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $navRegistry 'commandDeckRole: "workspace"' 'nav route uses existing commandDeckRole workspace'
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $navRegistry 'safetyPosture: "approval-gated"' 'nav route uses approval-gated posture'
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $navTypes $Route "nav types route id"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessContains $navTypes $RouteHref "nav types route href marker"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessCountExactly $allSmoke $ScriptFile 1 "all-smoke references route smoke once"
  Assert-CodexForgeJarvisVideoBackendExecutionReadinessCountExactly $wrapperSmoke $ScriptFile 1 "mega smoke references route smoke once"

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

  foreach ($pattern in $CodexForgeJarvisVideoBackendExecutionReadinessBannedPatterns) {
    Assert-CodexForgeJarvisVideoBackendExecutionReadinessNotMatches $relevantSource $pattern "relevant source files"
  }

  Assert-CodexForgeJarvisVideoBackendExecutionReadinessNoMixedBorderShorthand $relevantSourceFiles

  Write-Host "[OK] $SmokeName passed."
}
