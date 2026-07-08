function Assert-CodexForgeJarvisVideoBackendTrialRunnerContractFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains {
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

function Assert-CodexForgeJarvisVideoBackendTrialRunnerContractCountExactly {
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

function Assert-CodexForgeJarvisVideoBackendTrialRunnerContractNotMatches {
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

function Assert-CodexForgeJarvisVideoBackendTrialRunnerContractNoMixedBorderShorthand {
  param([string[]]$Paths)
  foreach ($path in $Paths) {
    $source = Get-Content -Raw $path
    if ($source -match 'border\s*:' -and $source -match 'border(Color|Width|Style|Top|Right|Bottom|Left)\s*:') {
      throw "[FAIL] Mixed inline border shorthand with longhand found in $path"
    }
  }
  Write-Host "[PASS] no mixed inline border shorthand with longhand in touched files"
}

$CodexForgeJarvisVideoBackendTrialRunnerContractRequiredMarkers = @(
  "3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract",
  "3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract Mega Batch v1",
  "First Jarvis-Controlled Video Backend Trial Runner Contract",
  "Jarvis-controlled video backend trial runner contract only",
  "backend trial runner contract only",
  "/jarvis-video backend trial runner remains review-only",
  "backend-owned runner required",
  "runner contract drafted",
  "execution lane locked",
  "no frontend execution",
  "no provider call from frontend",
  "operator approval required",
  "runner interface review only",
  "runner input envelope review only",
  "runner output envelope review only",
  "runner error envelope review only",
  "job lease contract review only",
  "queue admission contract review only",
  "worker isolation contract review only",
  "provider adapter handoff review only",
  "approval audit join review only",
  "credential token boundary review only",
  "network egress policy review only",
  "timeout policy review only",
  "retry fallback policy review only",
  "cost rate guard review only",
  "duration resolution size guard review only",
  "privacy safety gate review only",
  "result capture contract review only",
  "artifact handoff contract review only",
  "recovery contract review only",
  "kill switch remains enforced",
  "single-call lock required",
  "idempotency required",
  "replay block required",
  "disabled runner lane",
  "controlled trial link review only",
  "product IA link review only",
  "operator review required before runner execution",
  "backend trial runner contract completion does not enable provider/render/export/publish/workers/trading/automation",
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
  "next likely batch: 4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery"
)

$CodexForgeJarvisVideoBackendTrialRunnerContractSharedNeedles = @(
  "contractId",
  "runnerContractStatus",
  "backendOwnerRequirement",
  "runnerInterface",
  "runnerInputEnvelope",
  "runnerOutputEnvelope",
  "runnerErrorEnvelope",
  "jobLeaseContract",
  "queueAdmissionContract",
  "workerIsolationContract",
  "providerAdapterHandoff",
  "approvalJoin",
  "auditJoin",
  "credentialReferenceBoundary",
  "tokenRedactionBoundary",
  "networkEgressPolicy",
  "timeoutPolicy",
  "retryPolicy",
  "fallbackPolicy",
  "costGuard",
  "rateGuard",
  "durationGuard",
  "resolutionGuard",
  "sizeGuard",
  "privacyGate",
  "safetyGate",
  "resultCaptureContract",
  "artifactHandoffContract",
  "recoveryContract",
  "killSwitchPosture",
  "lockPosture",
  "idempotencyPosture",
  "replayBlockPosture",
  "controlledTrialLink",
  "productIaLink",
  "operatorReviewPosture",
  "readinessPosture",
  "executionPosture",
  "Runner contract status",
  "Backend owner requirement",
  "Runner interface",
  "Runner input envelope",
  "Runner output envelope",
  "Runner error envelope",
  "Job lease contract",
  "Queue admission contract",
  "Worker isolation contract",
  "Provider adapter handoff",
  "Approval and audit join",
  "Credential reference boundary",
  "Token redaction boundary",
  "Network egress policy",
  "Timeout policy",
  "Retry and fallback policy",
  "Cost and rate guard",
  "Duration, resolution, and size guard",
  "Privacy and safety gate",
  "Result capture contract",
  "Artifact handoff contract",
  "Recovery contract",
  "Kill switch, lock, idempotency, and replay block",
  "Disabled runner lane",
  "Controlled trial link",
  "Product IA link",
  "Operator review posture",
  "Next action"
)

$CodexForgeJarvisVideoBackendTrialRunnerContractBannedPatterns = @(
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

function Invoke-CodexForgeJarvisVideoBackendTrialRunnerContractSmoke {
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
  $routePanel = Join-Path $root ("src/lib/codexforge/$Route/components/JarvisVideoBackendTrialRunnerContractPhasePanel.tsx")
  $sharedFiles = @(
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/components/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/components/JarvisVideoBackendTrialRunnerContractPanel.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/jarvis-video-backend-trial-runner-contract-model.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/jarvis-video-backend-trial-runner-contract-packet.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/jarvis-video-backend-trial-runner-contract-gates.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-backend-trial-runner-contract-map/jarvis-video-backend-trial-runner-contract-safety.ts")
  )

  foreach ($path in @($page, $pageClient, $routeLibIndex, $routeComponentsIndex, $routePanel) + $sharedFiles) {
    Assert-CodexForgeJarvisVideoBackendTrialRunnerContractFileExists -Path $path
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
    Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $routeSource -Needle $needle -Name "route source contains $needle"
  }

  foreach ($marker in $CodexForgeJarvisVideoBackendTrialRunnerContractRequiredMarkers) {
    Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $routeSource -Needle $marker -Name "route and shared source contains $marker"
  }

  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($needle in $CodexForgeJarvisVideoBackendTrialRunnerContractSharedNeedles) {
    Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $sharedSource -Needle $needle -Name "shared model contains $needle"
  }

  $jarvisVideoSource = @(
    Get-Content -Raw (Join-Path $root "src/app/jarvis-video/page-client.tsx")
    Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx")
  ) -join "`n"
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $jarvisVideoSource -Needle "backend trial runner contract only" -Name "primary /jarvis-video source contains backend trial runner contract marker"

  $docsCombined = @(
    Get-Content -Raw (Join-Path $root "README.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-checkpoint-current.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-operator-checkpoint-runbook.md")
  ) -join "`n"
  foreach ($needle in @(
    "3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract",
    "3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract Mega Batch v1",
    "First Jarvis-Controlled Video Backend Trial Runner Contract",
    "Jarvis-controlled video backend trial runner contract only",
    "backend trial runner contract only",
    "/jarvis-video backend trial runner remains review-only",
    "backend-owned runner required",
    "runner contract drafted",
    "execution lane locked",
    "operator review required before runner execution",
    "next likely batch: 4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery"
  )) {
    Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $docsCombined -Needle $needle -Name "docs contain $needle"
  }

  $commandRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/command-palette/command-registry.ts")
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_BACKEND_TRIAL_RUNNER_CONTRACT_ROUTE_COMMANDS" -Name "command palette route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_BACKEND_TRIAL_RUNNER_CONTRACT_ROUTE_AVAILABILITY" -Name "command palette availability exists for phase routes"

  $navigationRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-route-registry.ts")
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $navigationRegistrySource -Needle "JARVIS_VIDEO_BACKEND_TRIAL_RUNNER_CONTRACT_ROUTE_INPUTS" -Name "nav route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $navigationRegistrySource -Needle "buildJarvisVideoBackendTrialRunnerContractRouteDefaults" -Name "nav route defaults exist for phase routes"
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $navigationRegistrySource -Needle 'commandDeckRole: "workspace"' -Name "phase routes use workspace commandDeckRole"
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $navigationRegistrySource -Needle 'safetyPosture: "approval-gated"' -Name "phase routes use approval-gated safety posture"

  $navigationTypesSource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-shell-types.ts")
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $navigationTypesSource -Needle "JarvisVideoBackendTrialRunnerContractRouteSlug" -Name "navigation shell types include backend trial runner contract route slug"
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractContains -Haystack $navigationTypesSource -Needle $RouteHref -Name "navigation shell types include backend trial runner contract route href marker"

  $allSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-all.ps1")
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractCountExactly -Haystack $allSmokeSource -Needle $ScriptFile -Expected 1 -Name "all-smoke references route smoke once"

  $megaSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-jarvis-video-backend-trial-runner-contract-mega-batch.ps1")
  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractCountExactly -Haystack $megaSmokeSource -Needle $ScriptFile -Expected 1 -Name "mega smoke references route smoke once"

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
  foreach ($pattern in $CodexForgeJarvisVideoBackendTrialRunnerContractBannedPatterns) {
    Assert-CodexForgeJarvisVideoBackendTrialRunnerContractNotMatches -Haystack $combinedSource -Pattern $pattern -Name "touched files"
  }

  Assert-CodexForgeJarvisVideoBackendTrialRunnerContractNoMixedBorderShorthand -Paths $touchedSourceFiles
  Write-Host "[OK] $SmokeName smoke passed."
}
