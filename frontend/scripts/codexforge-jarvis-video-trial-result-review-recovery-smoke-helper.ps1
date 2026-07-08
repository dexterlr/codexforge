function Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains {
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

function Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryCountExactly {
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

function Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryNotMatches {
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

function Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryNoMixedBorderShorthand {
  param([string[]]$Paths)
  foreach ($path in $Paths) {
    $source = Get-Content -Raw $path
    if ($source -match 'border\s*:' -and $source -match 'border(Color|Width|Style|Top|Right|Bottom|Left)\s*:') {
      throw "[FAIL] Mixed inline border shorthand with longhand found in $path"
    }
  }
  Write-Host "[PASS] no mixed inline border shorthand with longhand in touched files"
}

$CodexForgeJarvisVideoTrialResultReviewRecoveryRequiredMarkers = @(
  "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery",
  "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery Mega Batch v1",
  "First Jarvis-Controlled Video Trial Result Review and Recovery",
  "Jarvis-controlled video trial result review and recovery only",
  "trial result review recovery only",
  "/jarvis-video trial result review remains review-only",
  "result review is staged",
  "synthetic result only",
  "recovery remains backend-owned",
  "no result persistence",
  "no retry or fallback execution",
  "operator acceptance required",
  "result envelope review only",
  "result receipt placeholder only",
  "safety review required",
  "privacy review required",
  "redaction review required",
  "approval audit join review only",
  "observability trace review only",
  "quality checklist review only",
  "failure taxonomy review only",
  "recovery plan review only",
  "retry review only",
  "fallback review only",
  "timeout recovery review only",
  "cost rate recovery review only",
  "rollback review only",
  "artifact handoff review only",
  "export publish blocker only",
  "operator acceptance checklist required",
  "disabled promotion lane",
  "status timeline review only",
  "backend runner link review only",
  "controlled trial link review only",
  "product IA link review only",
  "no persistence guard",
  "no execution guard",
  "trial result review recovery completion does not enable provider/render/export/publish/workers/trading/automation",
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
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "no retry execution",
  "no fallback execution",
  "next likely batch: 4042-4073 - Jarvis Video Studio Release Candidate"
)

$CodexForgeJarvisVideoTrialResultReviewRecoverySharedNeedles = @(
  "resultReviewStatus",
  "syntheticResultEnvelope",
  "resultReceiptPlaceholder",
  "safetyReview",
  "privacyReview",
  "redactionReview",
  "approvalJoin",
  "auditJoin",
  "observabilityTrace",
  "qualityChecklist",
  "failureTaxonomy",
  "recoveryPlan",
  "retryReview",
  "fallbackReview",
  "timeoutRecovery",
  "costRecovery",
  "rateRecovery",
  "rollbackReview",
  "artifactHandoffReview",
  "exportPublishBlocker",
  "operatorAcceptanceChecklist",
  "disabledPromotionLane",
  "statusTimeline",
  "backendRunnerLink",
  "controlledTrialLink",
  "productIaLink",
  "noPersistenceGuard",
  "noExecutionGuard",
  "operatorReviewPosture",
  "readinessPosture",
  "executionPosture",
  "Result review status",
  "Synthetic result envelope",
  "Result receipt placeholder",
  "Safety review",
  "Privacy review",
  "Redaction review",
  "Approval and audit join",
  "Observability trace",
  "Result quality checklist",
  "Failure taxonomy",
  "Recovery plan",
  "Retry and fallback review",
  "Timeout, cost, and rate recovery",
  "Rollback review",
  "Artifact handoff review",
  "Export and publish blocker",
  "Operator acceptance checklist",
  "Disabled promotion lane",
  "Status timeline",
  "Backend runner link",
  "Controlled trial link",
  "Product IA link",
  "No persistence guard",
  "No execution guard",
  "Next action"
)

$CodexForgeJarvisVideoTrialResultReviewRecoveryBannedPatterns = @(
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

function Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke {
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
  $routePanel = Join-Path $root ("src/lib/codexforge/$Route/components/JarvisVideoTrialResultReviewRecoveryPhasePanel.tsx")
  $sharedFiles = @(
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/components/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/components/JarvisVideoTrialResultReviewRecoveryPanel.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/jarvis-video-trial-result-review-recovery-model.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/jarvis-video-trial-result-review-recovery-packet.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/jarvis-video-trial-result-review-recovery-gates.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-trial-result-review-recovery-map/jarvis-video-trial-result-review-recovery-safety.ts")
  )

  foreach ($path in @($page, $pageClient, $routeLibIndex, $routeComponentsIndex, $routePanel) + $sharedFiles) {
    Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryFileExists -Path $path
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
    Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $routeSource -Needle $needle -Name "route source contains $needle"
  }

  foreach ($marker in $CodexForgeJarvisVideoTrialResultReviewRecoveryRequiredMarkers) {
    Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $routeSource -Needle $marker -Name "route and shared source contains $marker"
  }

  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($needle in $CodexForgeJarvisVideoTrialResultReviewRecoverySharedNeedles) {
    Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $sharedSource -Needle $needle -Name "shared model contains $needle"
  }

  $jarvisVideoSource = @(
    Get-Content -Raw (Join-Path $root "src/app/jarvis-video/page-client.tsx")
    Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx")
  ) -join "`n"
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $jarvisVideoSource -Needle "trial result review recovery only" -Name "primary /jarvis-video source contains trial result review recovery marker"

  $docsCombined = @(
    Get-Content -Raw (Join-Path $root "README.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-checkpoint-current.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-operator-checkpoint-runbook.md")
  ) -join "`n"
  foreach ($needle in @(
    "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery",
    "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery Mega Batch v1",
    "First Jarvis-Controlled Video Trial Result Review and Recovery",
    "Jarvis-controlled video trial result review and recovery only",
    "trial result review recovery only",
    "/jarvis-video trial result review remains review-only",
    "result review is staged",
    "synthetic result only",
    "recovery remains backend-owned",
    "no result persistence",
    "no retry or fallback execution",
    "operator acceptance required",
    "next likely batch: 4042-4073 - Jarvis Video Studio Release Candidate"
  )) {
    Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $docsCombined -Needle $needle -Name "docs contain $needle"
  }

  $commandRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/command-palette/command-registry.ts")
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTE_COMMANDS" -Name "command palette route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTE_AVAILABILITY" -Name "command palette availability exists for phase routes"

  $navigationRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-route-registry.ts")
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $navigationRegistrySource -Needle "JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTE_INPUTS" -Name "nav route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $navigationRegistrySource -Needle "buildJarvisVideoTrialResultReviewRecoveryRouteDefaults" -Name "nav route defaults exist for phase routes"
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $navigationRegistrySource -Needle 'commandDeckRole: "workspace"' -Name "phase routes use workspace commandDeckRole"
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $navigationRegistrySource -Needle 'safetyPosture: "approval-gated"' -Name "phase routes use approval-gated safety posture"

  $navigationTypesSource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-shell-types.ts")
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $navigationTypesSource -Needle "JarvisVideoTrialResultReviewRecoveryRouteSlug" -Name "navigation shell types include trial result review recovery route slug"
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryContains -Haystack $navigationTypesSource -Needle $RouteHref -Name "navigation shell types include trial result review recovery route href marker"

  $allSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-all.ps1")
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryCountExactly -Haystack $allSmokeSource -Needle $ScriptFile -Expected 1 -Name "all-smoke references route smoke once"

  $megaSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-jarvis-video-trial-result-review-recovery-mega-batch.ps1")
  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryCountExactly -Haystack $megaSmokeSource -Needle $ScriptFile -Expected 1 -Name "mega smoke references route smoke once"

  $touchedSourceFiles = @(
    $pageClient
    $routePanel
    $sharedFiles
    (Join-Path $root "src/app/jarvis-video/page-client.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx")
    (Join-Path $root "src/lib/codexforge/command-palette/command-registry.ts")
    (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-route-registry.ts")
    (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-shell-types.ts")
  ) | Where-Object { Test-Path $_ }
  $combinedSource = ($touchedSourceFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($pattern in $CodexForgeJarvisVideoTrialResultReviewRecoveryBannedPatterns) {
    Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryNotMatches -Haystack $combinedSource -Pattern $pattern -Name "touched files"
  }

  Assert-CodexForgeJarvisVideoTrialResultReviewRecoveryNoMixedBorderShorthand -Paths $touchedSourceFiles
  Write-Host "[OK] $SmokeName smoke passed."
}
