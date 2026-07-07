function Assert-CodexForgeJarvisAuditResultStatusFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisAuditResultStatusContains {
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

function Assert-CodexForgeJarvisAuditResultStatusCountExactly {
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

function Assert-CodexForgeJarvisAuditResultStatusNotMatches {
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

$CodexForgeJarvisAuditResultStatusRequiredMarkers = @(
  "3690-3721 - Jarvis Audit Result Ledger and Status Dashboard"
  "3690-3721 - Jarvis Audit Result Ledger and Status Dashboard Mega Batch v1"
  "Jarvis Audit Result Ledger and Status Dashboard"
  "Jarvis audit result ledger and status dashboard only"
  "audit ledger foundation"
  "result ledger foundation"
  "status dashboard foundation"
  "one Jarvis cockpit with shared evidence"
  "audit event review only"
  "approval event review only"
  "permission event review only"
  "planner event review only"
  "router event review only"
  "blocked action event review only"
  "dry-run record review only"
  "approval record review only"
  "blocked record review only"
  "artifact placeholder review only"
  "capability status review only"
  "workspace status review only"
  "adapter status review only"
  "permission status review only"
  "approval status review only"
  "dry-run status review only"
  "risk status review only"
  "trading status review only"
  "provider status review only"
  "website avatar status review only"
  "workflow status review only"
  "memory boundary status review only"
  "kill switch status review only"
  "lock manager status review only"
  "idempotency status review only"
  "replay block status review only"
  "operator review status required"
  "audit result status completion does not enable provider/render/export/publish/workers/trading/automation"
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
  "next likely batch: 3722-3753 - Jarvis Unified Workspace Shells"
)

$CodexForgeJarvisAuditResultStatusCapabilityIds = @(
  "video.generate"
  "website.create"
  "avatar.prepare"
  "chatbot.plan"
  "trading.paperReview"
  "workflow.prepare"
  "render.publishReview"
)

$CodexForgeJarvisAuditResultStatusTypeMarkers = @(
  "JarvisAuditResultStatusAuditEventReviewRecord"
  "JarvisAuditResultStatusApprovalEventReviewRecord"
  "JarvisAuditResultStatusPermissionEventReviewRecord"
  "JarvisAuditResultStatusPlannerEventReviewRecord"
  "JarvisAuditResultStatusRouterEventReviewRecord"
  "JarvisAuditResultStatusBlockedActionEventReviewRecord"
  "JarvisAuditResultStatusResultLedgerRecordReview"
  "JarvisAuditResultStatusDryRunRecordReview"
  "JarvisAuditResultStatusApprovalRecordReview"
  "JarvisAuditResultStatusBlockedRecordReview"
  "JarvisAuditResultStatusArtifactPlaceholderReview"
  "JarvisAuditResultStatusCapabilityStatusReviewRecord"
  "JarvisAuditResultStatusWorkspaceStatusReviewRecord"
  "JarvisAuditResultStatusAdapterStatusReviewRecord"
  "JarvisAuditResultStatusPermissionStatusReviewRecord"
  "JarvisAuditResultStatusApprovalStatusReviewRecord"
  "JarvisAuditResultStatusDryRunStatusReviewRecord"
  "JarvisAuditResultStatusRiskStatusReviewRecord"
  "JarvisAuditResultStatusTradingStatusReviewRecord"
  "JarvisAuditResultStatusProviderStatusReviewRecord"
  "JarvisAuditResultStatusWebsiteAvatarStatusReviewRecord"
  "JarvisAuditResultStatusWorkflowStatusReviewRecord"
  "JarvisAuditResultStatusMemoryBoundaryStatusReviewRecord"
  "JarvisAuditResultStatusKillSwitchStatusReviewRecord"
  "JarvisAuditResultStatusLockManagerStatusReviewRecord"
  "JarvisAuditResultStatusIdempotencyStatusReviewRecord"
  "JarvisAuditResultStatusReplayBlockStatusReviewRecord"
  "JarvisAuditResultStatusOperatorReviewStatusRecord"
)

$CodexForgeJarvisAuditResultStatusBannedPatterns = @(
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

function Invoke-CodexForgeJarvisAuditResultStatusSmoke {
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
  $panelPath = Join-Path $libDir "components\JarvisAuditResultStatusPhasePanel.tsx"

  $sharedFiles = @(
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\jarvis-audit-result-status-model.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\jarvis-audit-result-status-events.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\jarvis-audit-result-status-ledger.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\jarvis-audit-result-status-dashboard.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\jarvis-audit-result-status-safety.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\components\JarvisAuditResultStatusPanel.tsx")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\components\index.ts")
    (Join-Path $root "src\lib\codexforge\jarvis-audit-result-status-map\index.ts")
  )

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-audit-result-status-mega-batch.ps1"
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
  ) + $sharedFiles + $docsPaths) {
    Assert-CodexForgeJarvisAuditResultStatusFileExists $path
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

  Assert-CodexForgeJarvisAuditResultStatusContains $routeSource $Phase "route source phase marker"
  Assert-CodexForgeJarvisAuditResultStatusContains $routeSource $Title "route source title"
  Assert-CodexForgeJarvisAuditResultStatusContains $routeSource $RouteHref "route source href"
  Assert-CodexForgeJarvisAuditResultStatusContains $pageSource './page-client' "route page re-export"
  Assert-CodexForgeJarvisAuditResultStatusContains $pageClientSource $Route "page-client route slug"
  Assert-CodexForgeJarvisAuditResultStatusContains $panelSource "JarvisAuditResultStatusRoutePanel" "route panel wiring"

  foreach ($marker in $CodexForgeJarvisAuditResultStatusRequiredMarkers) {
    Assert-CodexForgeJarvisAuditResultStatusContains $sharedSource $marker "shared marker $marker"
  }

  foreach ($capabilityId in $CodexForgeJarvisAuditResultStatusCapabilityIds) {
    Assert-CodexForgeJarvisAuditResultStatusContains $sharedSource $capabilityId "shared capability example $capabilityId"
  }

  foreach ($typeMarker in $CodexForgeJarvisAuditResultStatusTypeMarkers) {
    Assert-CodexForgeJarvisAuditResultStatusContains $sharedSource $typeMarker "shared review type $typeMarker"
  }

  foreach ($docMarker in @(
    "3690-3721 - Jarvis Audit Result Ledger and Status Dashboard"
    "3690-3721 - Jarvis Audit Result Ledger and Status Dashboard Mega Batch v1"
    "Jarvis Audit Result Ledger and Status Dashboard"
    "next likely batch: 3722-3753 - Jarvis Unified Workspace Shells"
  )) {
    Assert-CodexForgeJarvisAuditResultStatusContains $docsCombined $docMarker "docs marker $docMarker"
  }

  Assert-CodexForgeJarvisAuditResultStatusCountExactly $commandRegistry $CommandLabel 1 "command palette route entry exists once"
  Assert-CodexForgeJarvisAuditResultStatusCountExactly $navRegistry $RouteHref 1 "nav route marker exists once"
  Assert-CodexForgeJarvisAuditResultStatusContains $navRegistry 'commandDeckRole: "workspace"' 'nav route uses existing commandDeckRole workspace'
  Assert-CodexForgeJarvisAuditResultStatusContains $navRegistry 'group: "Advanced"' 'nav route uses Advanced group'
  Assert-CodexForgeJarvisAuditResultStatusContains $navRegistry 'safetyPosture: "approval-gated"' 'nav route uses approval-gated posture'
  Assert-CodexForgeJarvisAuditResultStatusContains $navTypes $Route "nav types route id"
  Assert-CodexForgeJarvisAuditResultStatusContains $navTypes $RouteHref "nav types route href marker"
  Assert-CodexForgeJarvisAuditResultStatusCountExactly $allSmoke $ScriptFile 1 "all-smoke references route smoke once"
  Assert-CodexForgeJarvisAuditResultStatusCountExactly $wrapperSmoke $ScriptFile 1 "mega smoke references route smoke once"

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

  foreach ($pattern in $CodexForgeJarvisAuditResultStatusBannedPatterns) {
    Assert-CodexForgeJarvisAuditResultStatusNotMatches $relevantSource $pattern "relevant source files"
  }

  Write-Host "[OK] $SmokeName passed."
}
