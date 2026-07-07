function Assert-CodexForgeJarvisVideoDryRunWorkspaceFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoDryRunWorkspaceContains {
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

function Assert-CodexForgeJarvisVideoDryRunWorkspaceCountExactly {
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

function Assert-CodexForgeJarvisVideoDryRunWorkspacePatternCountExactly {
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

function Assert-CodexForgeJarvisVideoDryRunWorkspaceNotMatches {
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

$CodexForgeJarvisVideoDryRunWorkspaceRequiredMarkers = @(
  "3786-3817 - First Jarvis-Controlled Video Dry Run Workspace"
  "3786-3817 - First Jarvis-Controlled Video Dry Run Workspace Mega Batch v1"
  "First Jarvis-Controlled Video Dry Run Workspace"
  "Jarvis-controlled video dry-run workspace only"
  "/jarvis-video dry-run workspace remains review-only"
  "video.generate dry-run request envelope review only"
  "video capability selection review only"
  "video adapter route review only"
  "video permission decision review only"
  "video approval requirement review only"
  "redacted prompt preview only"
  "provider reference review only"
  "credential reference review only"
  "token reference review only"
  "cost guard review only"
  "rate guard review only"
  "timeout guard review only"
  "duration guard review only"
  "resolution guard review only"
  "size guard review only"
  "privacy guard review only"
  "safety guard review only"
  "result placeholder only"
  "artifact handoff placeholder only"
  "audit preview only"
  "result ledger preview only"
  "status preview only"
  "memory boundary preview only"
  "kill switch check required"
  "lock manager check required"
  "idempotency check required"
  "replay block check required"
  "blocked action summary only"
  "operator review required before video execution"
  "video dry-run workspace completion does not enable provider/render/export/publish/workers/trading/automation"
  "disabled by default"
  "hard kill switch"
  "dry-run only"
  "dry-run required before execution"
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
  "next likely batch: 3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace"
)

$CodexForgeJarvisVideoDryRunWorkspaceSharedNeedles = @(
  "video.generate"
  "/jarvis-video"
  "video.generate dry-run request envelope review only"
  "redacted prompt preview only"
  "provider reference review only"
  "credential reference review only"
  "token reference review only"
  "cost guard review only"
  "rate guard review only"
  "timeout guard review only"
  "duration guard review only"
  "resolution guard review only"
  "size guard review only"
  "privacy guard review only"
  "safety guard review only"
  "result placeholder only"
  "artifact handoff placeholder only"
  "audit preview only"
  "result ledger preview only"
  "status preview only"
  "memory boundary preview only"
  "kill switch check required"
  "lock manager check required"
  "idempotency check required"
  "replay block check required"
  "blocked action summary only"
  "operator review required before video execution"
  "First Jarvis-Controlled Video Adapter Plug-in"
)

$CodexForgeJarvisVideoDryRunWorkspaceBannedPatterns = @(
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

function Invoke-CodexForgeJarvisVideoDryRunWorkspaceSmoke {
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
  $panelPath = Join-Path $libDir "components\JarvisVideoDryRunWorkspacePhasePanel.tsx"

  $primaryRouteFiles = @(
    (Join-Path $root "src\app\jarvis-video\page.tsx")
    (Join-Path $root "src\app\jarvis-video\page-client.tsx")
  )

  $sharedFiles = @(
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\jarvis-video-dry-run-workspace-model.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\jarvis-video-dry-run-workspace-request.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\jarvis-video-dry-run-workspace-guards.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\jarvis-video-dry-run-workspace-safety.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\components\JarvisVideoDryRunWorkspacePanel.tsx")
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\components\index.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-dry-run-workspace-map\index.ts")
  )

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-video-dry-run-workspace-mega-batch.ps1"
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
    Assert-CodexForgeJarvisVideoDryRunWorkspaceFileExists $path
  }

  $pageSource = Get-Content -Raw $pagePath
  $pageClientSource = Get-Content -Raw $pageClientPath
  $panelSource = Get-Content -Raw $panelPath
  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  $routeSource = @($pageSource, $pageClientSource, $panelSource, $sharedSource) -join "`n"
  $phaseNeedle = $Phase -replace '^Phase\s+', ''
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $routeSource $phaseNeedle "route source phase marker"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $routeSource $Title "route source title"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $routeSource $RouteHref "route source href"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $pageSource './page-client' "route page re-export"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $pageClientSource $Route "page-client route slug"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $panelSource "JarvisVideoDryRunWorkspacePanel" "route panel wiring"

  foreach ($marker in $CodexForgeJarvisVideoDryRunWorkspaceRequiredMarkers) {
    Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $sharedSource $marker "shared marker $marker"
  }

  foreach ($needle in $CodexForgeJarvisVideoDryRunWorkspaceSharedNeedles) {
    Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $sharedSource $needle "shared model needle $needle"
  }

  foreach ($docMarker in @(
    "3786-3817 - First Jarvis-Controlled Video Dry Run Workspace"
    "3786-3817 - First Jarvis-Controlled Video Dry Run Workspace Mega Batch v1"
    "First Jarvis-Controlled Video Dry Run Workspace"
    "next likely batch: 3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace"
  )) {
    Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $docsCombined $docMarker "docs marker $docMarker"
  }

  Assert-CodexForgeJarvisVideoDryRunWorkspacePatternCountExactly $commandRegistry '^\s*const\s+JARVIS_VIDEO_DRY_RUN_WORKSPACE_ROUTE_AVAILABILITY\s*=' 1 "route availability block exists once"
  Assert-CodexForgeJarvisVideoDryRunWorkspacePatternCountExactly $commandRegistry '^\s*const\s+JARVIS_VIDEO_DRY_RUN_WORKSPACE_ROUTE_COMMANDS\s*=' 1 "route command registry block exists once"
  Assert-CodexForgeJarvisVideoDryRunWorkspacePatternCountExactly $navRegistry '^\s*const\s+JARVIS_VIDEO_DRY_RUN_WORKSPACE_ROUTE_INPUTS\s*=' 1 "route nav input block exists once"
  Assert-CodexForgeJarvisVideoDryRunWorkspacePatternCountExactly $navRegistry '^\s*function\s+buildJarvisVideoDryRunWorkspaceRouteDefaults\s*\(' 1 "route nav defaults builder exists once"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $navRegistry 'commandDeckRole: "workspace"' 'nav route uses existing commandDeckRole workspace'
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $navRegistry 'safetyPosture: "approval-gated"' 'nav route uses approval-gated posture'
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $navTypes $Route "nav types route id"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceContains $navTypes $RouteHref "nav types route href marker"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceCountExactly $allSmoke $ScriptFile 1 "all-smoke references route smoke once"
  Assert-CodexForgeJarvisVideoDryRunWorkspaceCountExactly $wrapperSmoke $ScriptFile 1 "mega smoke references route smoke once"

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

  foreach ($pattern in $CodexForgeJarvisVideoDryRunWorkspaceBannedPatterns) {
    Assert-CodexForgeJarvisVideoDryRunWorkspaceNotMatches $relevantSource $pattern "relevant source files"
  }

  Write-Host "[OK] $SmokeName passed."
}
