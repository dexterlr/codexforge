function Assert-CodexForgeJarvisVideoStudioReleaseCandidateFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains {
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

function Assert-CodexForgeJarvisVideoStudioReleaseCandidateCountExactly {
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

function Assert-CodexForgeJarvisVideoStudioReleaseCandidateNotMatches {
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

function Assert-CodexForgeJarvisVideoStudioReleaseCandidateNoMixedBorderShorthand {
  param([string[]]$Paths)
  foreach ($path in $Paths) {
    $source = Get-Content -Raw $path
    if ($source -match 'border\s*:' -and $source -match 'border(Color|Width|Style|Top|Right|Bottom|Left)\s*:') {
      throw "[FAIL] Mixed inline border shorthand with longhand found in $path"
    }
  }
  Write-Host "[PASS] no mixed inline border shorthand with longhand in touched files"
}

$CodexForgeJarvisVideoStudioReleaseCandidateRequiredMarkers = @(
  "4042-4073 - Jarvis Video Studio Release Candidate",
  "4042-4073 - Jarvis Video Studio Release Candidate Mega Batch v1",
  "Jarvis Video Studio Release Candidate",
  "Jarvis Video Studio",
  "release candidate only",
  "/jarvis-video release candidate remains review-only",
  "premium video studio release candidate",
  "Plan, review, approve, then hand off to backend",
  "generation remains locked",
  "backend-owned execution required",
  "operator approval required",
  "no provider call from frontend",
  "video studio mission brief",
  "video production timeline",
  "video readiness score",
  "script storyboard lane",
  "asset audio caption lane",
  "approval packet lane",
  "dry-run lane",
  "backend readiness lane",
  "controlled trial lane",
  "backend runner lane",
  "result review recovery lane",
  "safety rail review only",
  "audit rail review only",
  "blocked action command deck",
  "next action card",
  "developer diagnostics grouped lower",
  "release summary review only",
  "no generation guard",
  "no execution guard",
  "no persistence guard",
  "no provider network guard",
  "video studio release candidate completion does not enable provider/render/export/publish/workers/trading/automation",
  "disabled by default",
  "hard kill switch",
  "backend-only execution path required",
  "no direct frontend execution",
  "no frontend execution of backend adapters",
  "no live provider call",
  "no provider execution",
  "no live provider execution",
  "no video provider execution",
  "no real video generation",
  "no live video generation",
  "no image provider execution",
  "no audio provider execution",
  "no website creation execution",
  "no avatar generation execution",
  "no chatbot autonomous execution",
  "no trading execution",
  "no paper trading execution",
  "no real-money trading execution",
  "no financial advice",
  "no personalised recommendations",
  "no buy sell instructions",
  "no broker execution",
  "no live market data calls",
  "no tool execution",
  "no autonomous tool execution",
  "no network execution",
  "no render execution",
  "no export execution",
  "no publish execution",
  "no worker dispatch",
  "no queue dispatch",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no file export",
  "no download generation",
  "no archive creation",
  "no signed URL creation",
  "no platform upload",
  "no media upload",
  "no OAuth flow creation",
  "no webhook creation",
  "no schedule execution",
  "no account authorization execution",
  "no API route execution",
  "no service creation",
  "no runtime deploy",
  "no file writes from the app",
  "no shell/process/command execution from the app",
  "no fetch/network calls",
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
  "no database writes",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "no retry execution",
  "no fallback execution",
  "next likely batch: 4074-4105 - Jarvis Video Backend Execution Implementation Plan"
)

$CodexForgeJarvisVideoStudioReleaseCandidateSharedNeedles = @(
  "studioReleaseCandidateId",
  "heroState",
  "missionBrief",
  "productionTimeline",
  "readinessScore",
  "scriptStoryboardLane",
  "assetAudioCaptionLane",
  "approvalPacketLane",
  "dryRunLane",
  "backendReadinessLane",
  "controlledTrialLane",
  "backendRunnerLane",
  "resultReviewLane",
  "safetyRail",
  "auditRail",
  "blockedActionDeck",
  "nextActionCard",
  "workspaceNavigationCard",
  "productIaLink",
  "jarvisHomeLink",
  "cockpitLink",
  "releaseSummary",
  "developerDiagnosticsGrouping",
  "noGenerationGuard",
  "noExecutionGuard",
  "noPersistenceGuard",
  "noProviderNetworkGuard",
  "operatorReviewPosture",
  "readinessPosture",
  "executionPosture",
  "video studio mission brief",
  "video production timeline",
  "video readiness score",
  "script storyboard lane",
  "asset audio caption lane",
  "approval packet lane",
  "dry-run lane",
  "backend readiness lane",
  "controlled trial lane",
  "backend runner lane",
  "result review recovery lane",
  "blocked action command deck",
  "next action card",
  "release summary review only"
)

$CodexForgeJarvisVideoStudioReleaseCandidateBannedPatterns = @(
  '\bfetch\s*\(',
  'axios\s*\.',
  'XMLHttpRequest',
  'WebSocket',
  'EventSource',
  'navigator\.sendBeacon',
  'navigator\.mediaDevices',
  'localStorage\s*[\.\[]',
  'sessionStorage\s*[\.\[]',
  'indexedDB\s*[\.\[]',
  'document\.cookie',
  'cookie\s*=',
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)',
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)',
  'from\s+[`"'']openai[`"'']',
  'from\s+[`"'']@anthropic',
  'from\s+[`"'']@google',
  'from\s+[`"'']@aws-sdk',
  'from\s+[`"'']replicate[`"'']',
  'new\s+OpenAI\s*\(',
  'provider\.(send|call|execute)\s*\(',
  'tool\.(send|call|execute|run)\s*\(',
  'adapter\.(send|call|execute|run)\s*\(',
  'dispatchWorker\s*\(',
  'Worker\s*\(',
  'new\s+Worker',
  'upload\s*\(',
  'download\s*\(',
  'createDownload\s*\(',
  'createArchive\s*\(',
  'createSignedUrl\s*\(',
  'createSignedURL\s*\(',
  'createOAuth\s*\(',
  'createWebhook\s*\(',
  'createSchedule\s*\(',
  'authorizeAccount\s*\(',
  'writeFile\s*\(',
  'appendFile\s*\(',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\(',
  ':\s*any\b',
  '<\s*any\s*>',
  'as any',
  'Array<any>',
  '@ts-nocheck',
  '@ts-expect-error'
)

function Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke {
  param(
    [string]$SmokeName,
    [string]$ScriptFile,
    [string]$Route,
    [string]$RouteHref,
    [string]$Phase,
    [string]$Title
  )

  $ErrorActionPreference = "Stop"
  $scriptRoot = $PSScriptRoot
  $root = Split-Path -Parent $scriptRoot

  $page = Join-Path $root ("src/app/$Route/page.tsx")
  $pageClient = Join-Path $root ("src/app/$Route/page-client.tsx")
  $routeLibIndex = Join-Path $root ("src/lib/codexforge/$Route/index.ts")
  $routeComponentsIndex = Join-Path $root ("src/lib/codexforge/$Route/components/index.ts")
  $routePanel = Join-Path $root ("src/lib/codexforge/$Route/components/JarvisVideoStudioReleaseCandidatePhasePanel.tsx")
  $sharedFiles = @(
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/components/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/components/JarvisVideoStudioReleaseCandidatePanel.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/components/JarvisVideoStudioReleaseCandidatePanel.module.css")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-studio-release-candidate-model.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-studio-release-candidate-sections.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-studio-release-candidate-gates.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/jarvis-video-studio-release-candidate-safety.ts")
  )

  foreach ($path in @($page, $pageClient, $routeLibIndex, $routeComponentsIndex, $routePanel) + $sharedFiles) {
    Assert-CodexForgeJarvisVideoStudioReleaseCandidateFileExists -Path $path
  }

  $routeSource = @(
    Get-Content -Raw $page
    Get-Content -Raw $pageClient
    Get-Content -Raw $routeLibIndex
    Get-Content -Raw $routeComponentsIndex
    Get-Content -Raw $routePanel
    $sharedFiles | ForEach-Object { Get-Content -Raw $_ }
  ) -join "`n"

  foreach ($needle in @($Phase, $Title, $Route, $RouteHref)) {
    Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $routeSource -Needle $needle -Name "route source contains $needle"
  }

  foreach ($marker in $CodexForgeJarvisVideoStudioReleaseCandidateRequiredMarkers) {
    Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $routeSource -Needle $marker -Name "route and shared source contains $marker"
  }

  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($needle in $CodexForgeJarvisVideoStudioReleaseCandidateSharedNeedles) {
    Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $sharedSource -Needle $needle -Name "shared model contains $needle"
  }

  $jarvisVideoSource = @(
    Get-Content -Raw (Join-Path $root "src/app/jarvis-video/page-client.tsx")
    Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx")
    Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-workspaces.ts")
    Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-content.ts")
  ) -join "`n"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $jarvisVideoSource -Needle "Jarvis Video Studio Release Candidate" -Name "primary /jarvis-video source contains release candidate marker"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $jarvisVideoSource -Needle "Plan, review, approve, then hand off to backend" -Name "primary /jarvis-video source contains workflow marker"

  $docsCombined = @(
    Get-Content -Raw (Join-Path $root "README.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-checkpoint-current.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-operator-checkpoint-runbook.md")
  ) -join "`n"
  foreach ($needle in @(
    "4042-4073 - Jarvis Video Studio Release Candidate"
    "4042-4073 - Jarvis Video Studio Release Candidate Mega Batch v1"
    "Jarvis Video Studio Release Candidate"
    "premium video studio release candidate"
    "/jarvis-video release candidate remains review-only"
    "Plan, review, approve, then hand off to backend"
    "generation remains locked"
    "backend-owned execution required"
    "operator approval required"
    "no provider call from frontend"
    "next likely batch: 4074-4105 - Jarvis Video Backend Execution Implementation Plan"
  )) {
    Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $docsCombined -Needle $needle -Name "docs contain $needle"
  }

  $commandRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/command-palette/command-registry.ts")
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_ROUTE_COMMANDS" -Name "command palette route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_ROUTE_AVAILABILITY" -Name "command palette availability exists for phase routes"

  $navigationRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-route-registry.ts")
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $navigationRegistrySource -Needle "JARVIS_VIDEO_STUDIO_RELEASE_CANDIDATE_ROUTE_INPUTS" -Name "nav route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $navigationRegistrySource -Needle "buildJarvisVideoStudioReleaseCandidateRouteDefaults" -Name "nav route defaults exist for phase routes"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $navigationRegistrySource -Needle 'commandDeckRole: "workspace"' -Name "phase routes use workspace commandDeckRole"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $navigationRegistrySource -Needle 'safetyPosture: "approval-gated"' -Name "phase routes use approval-gated safety posture"

  $navigationTypesSource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-shell-types.ts")
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $navigationTypesSource -Needle "JarvisVideoStudioReleaseCandidateRouteSlug" -Name "navigation shell types include release candidate route slug"
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateContains -Haystack $navigationTypesSource -Needle $RouteHref -Name "navigation shell types include release candidate route href marker"

  $allSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-all.ps1")
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateCountExactly -Haystack $allSmokeSource -Needle $ScriptFile -Expected 1 -Name "all-smoke references route smoke once"

  $megaSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-jarvis-video-studio-release-candidate-mega-batch.ps1")
  Assert-CodexForgeJarvisVideoStudioReleaseCandidateCountExactly -Haystack $megaSmokeSource -Needle $ScriptFile -Expected 1 -Name "mega smoke references route smoke once"

  $releasePanelSource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-video-studio-release-candidate-map/components/JarvisVideoStudioReleaseCandidatePanel.tsx")
  $workflowIndex = $releasePanelSource.IndexOf('aria-label="Video production timeline"', [StringComparison]::OrdinalIgnoreCase)
  $diagnosticsIndex = $releasePanelSource.IndexOf('aria-label="Developer diagnostics"', [StringComparison]::OrdinalIgnoreCase)
  if ($workflowIndex -lt 0 -or $diagnosticsIndex -lt 0 -or $workflowIndex -gt $diagnosticsIndex) {
    throw "[FAIL] /jarvis-video visible UX does not put product workflow before developer diagnostics"
  }
  Write-Host "[PASS] /jarvis-video visible UX puts product workflow before developer diagnostics"

  $touchedSourceFiles = @(
    $pageClient
    $routePanel
    $sharedFiles
    (Join-Path $root "src/app/jarvis-video/page-client.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-workspaces.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/jarvis-unified-product-ia-content.ts")
    (Join-Path $root "src/lib/codexforge/command-palette/command-registry.ts")
    (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-route-registry.ts")
    (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-shell-types.ts")
  ) | Where-Object { Test-Path $_ }
  $combinedSource = ($touchedSourceFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($pattern in $CodexForgeJarvisVideoStudioReleaseCandidateBannedPatterns) {
    Assert-CodexForgeJarvisVideoStudioReleaseCandidateNotMatches -Haystack $combinedSource -Pattern $pattern -Name "touched files"
  }

  Assert-CodexForgeJarvisVideoStudioReleaseCandidateNoMixedBorderShorthand -Paths $touchedSourceFiles
  Write-Host "[OK] $SmokeName smoke passed."
}
