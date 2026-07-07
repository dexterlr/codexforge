function Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains {
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

function Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceCountExactly {
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

function Assert-CodexForgeJarvisVideoApprovalPacketWorkspacePatternCountExactly {
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

function Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceNotMatches {
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

$CodexForgeJarvisVideoApprovalPacketWorkspaceRequiredMarkers = @(
  "3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace"
  "3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace Mega Batch v1"
  "First Jarvis-Controlled Video Approval Packet Workspace"
  "Jarvis-controlled video approval packet workspace only"
  "/jarvis-video approval packet workspace remains review-only"
  "video.generate approval packet review only"
  "video capability approval review only"
  "video adapter candidate approval review only"
  "video dry-run reference required"
  "video approval packet id required"
  "video permission decision review only"
  "video approval decision review only"
  "human approval required before video execution"
  "backend-only video route required"
  "provider reference review only"
  "credential reference review only"
  "token reference review only"
  "redacted prompt preview only"
  "request envelope review only"
  "response envelope review only"
  "error envelope review only"
  "guard snapshot review only"
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
  "kill switch remains enforced"
  "lock manager required"
  "idempotency required"
  "replay block required"
  "blocked action summary only"
  "operator review required before video execution"
  "video approval packet workspace completion does not enable provider/render/export/publish/workers/trading/automation"
  "disabled by default"
  "hard kill switch"
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
  "next likely batch: 3850-3881 - First Jarvis-Controlled Video Backend Execution Readiness"
)

$CodexForgeJarvisVideoApprovalPacketWorkspaceSharedNeedles = @(
  "video.generate"
  "/jarvis-video"
  "user goal review only"
  "video dry-run reference required"
  "video approval packet id required"
  "video permission decision review only"
  "video approval decision review only"
  "human approval required before video execution"
  "backend-only video route required"
  "provider reference review only"
  "credential reference review only"
  "token reference review only"
  "redacted prompt preview only"
  "request envelope review only"
  "response envelope review only"
  "error envelope review only"
  "guard snapshot review only"
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
  "kill switch remains enforced"
  "lock manager required"
  "idempotency required"
  "replay block required"
  "blocked action summary only"
  "operator review required before video execution"
  "First Jarvis-Controlled Video Dry Run Workspace"
)

$CodexForgeJarvisVideoApprovalPacketWorkspaceBannedPatterns = @(
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

function Invoke-CodexForgeJarvisVideoApprovalPacketWorkspaceSmoke {
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
  $panelPath = Join-Path $libDir "components\JarvisVideoApprovalPacketWorkspacePhasePanel.tsx"

  $primaryRouteFiles = @(
    (Join-Path $root "src\app\jarvis-video\page.tsx")
    (Join-Path $root "src\app\jarvis-video\page-client.tsx")
  )

  $sharedFiles = @(
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\jarvis-video-approval-packet-workspace-model.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\jarvis-video-approval-packet-workspace-packet.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\jarvis-video-approval-packet-workspace-guards.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\jarvis-video-approval-packet-workspace-safety.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\components\JarvisVideoApprovalPacketWorkspacePanel.tsx")
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\components\index.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-video-approval-packet-workspace-map\index.ts")
  )

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-video-approval-packet-workspace-mega-batch.ps1"
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
    Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceFileExists $path
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

  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $routeSource $phaseNeedle "route source phase marker"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $routeSource $Title "route source title"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $routeSource $RouteHref "route source href"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $pageSource './page-client' "route page re-export"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $pageClientSource $Route "page-client route slug"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $panelSource "JarvisVideoApprovalPacketWorkspacePanel" "route panel wiring"

  foreach ($marker in $CodexForgeJarvisVideoApprovalPacketWorkspaceRequiredMarkers) {
    Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $sharedSource $marker "shared marker $marker"
  }

  foreach ($needle in $CodexForgeJarvisVideoApprovalPacketWorkspaceSharedNeedles) {
    Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $sharedSource $needle "shared model needle $needle"
  }

  foreach ($docMarker in @(
    "3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace"
    "3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace Mega Batch v1"
    "First Jarvis-Controlled Video Approval Packet Workspace"
    "next likely batch: 3850-3881 - First Jarvis-Controlled Video Backend Execution Readiness"
  )) {
    Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $docsCombined $docMarker "docs marker $docMarker"
  }

  Assert-CodexForgeJarvisVideoApprovalPacketWorkspacePatternCountExactly $commandRegistry '^\s*const\s+JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_ROUTE_AVAILABILITY\s*=' 1 "route availability block exists once"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspacePatternCountExactly $commandRegistry '^\s*const\s+JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_ROUTE_COMMANDS\s*=' 1 "route command registry block exists once"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspacePatternCountExactly $navRegistry '^\s*const\s+JARVIS_VIDEO_APPROVAL_PACKET_WORKSPACE_ROUTE_INPUTS\s*=' 1 "route nav input block exists once"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspacePatternCountExactly $navRegistry '^\s*function\s+buildJarvisVideoApprovalPacketWorkspaceRouteDefaults\s*\(' 1 "route nav defaults builder exists once"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $navRegistry 'commandDeckRole: "workspace"' 'nav route uses existing commandDeckRole workspace'
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $navRegistry 'safetyPosture: "approval-gated"' 'nav route uses approval-gated posture'
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $navTypes $Route "nav types route id"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceContains $navTypes $RouteHref "nav types route href marker"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceCountExactly $allSmoke $ScriptFile 1 "all-smoke references route smoke once"
  Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceCountExactly $wrapperSmoke $ScriptFile 1 "mega smoke references route smoke once"

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

  foreach ($pattern in $CodexForgeJarvisVideoApprovalPacketWorkspaceBannedPatterns) {
    Assert-CodexForgeJarvisVideoApprovalPacketWorkspaceNotMatches $relevantSource $pattern "relevant source files"
  }

  Write-Host "[OK] $SmokeName passed."
}
