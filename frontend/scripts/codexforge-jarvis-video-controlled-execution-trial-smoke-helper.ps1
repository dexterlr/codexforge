function Assert-CodexForgeJarvisVideoControlledExecutionTrialFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisVideoControlledExecutionTrialContains {
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

function Assert-CodexForgeJarvisVideoControlledExecutionTrialCountExactly {
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

function Assert-CodexForgeJarvisVideoControlledExecutionTrialNotMatches {
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

function Assert-CodexForgeJarvisVideoControlledExecutionTrialNoMixedBorderShorthand {
  param([string[]]$Paths)
  foreach ($path in $Paths) {
    $source = Get-Content -Raw $path
    if ($source -match 'border\s*:' -and $source -match 'border(Color|Width|Style|Top|Right|Bottom|Left)\s*:') {
      throw "[FAIL] Mixed inline border shorthand with longhand found in $path"
    }
  }
  Write-Host "[PASS] no mixed inline border shorthand with longhand in touched files"
}

$CodexForgeJarvisVideoControlledExecutionTrialRequiredMarkers = @(
  "3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial",
  "3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial Mega Batch v1",
  "First Jarvis-Controlled Video Controlled Execution Trial",
  "Jarvis-controlled video controlled execution trial only",
  "controlled trial console only",
  "/jarvis-video controlled trial remains review-only",
  "controlled execution trial remains disabled",
  "controlled execution trial remains backend-owned",
  "controlled execution trial requires explicit operator approval",
  "approved dry-run reference required",
  "approved approval packet reference required",
  "approved video adapter reference required",
  "backend execution readiness reference required",
  "operator preflight checklist required",
  "provider reference review only",
  "credential reference review only",
  "token redaction review only",
  "request envelope review only",
  "response envelope review only",
  "error envelope review only",
  "prompt redaction review only",
  "cost rate timeout review only",
  "duration resolution size review only",
  "privacy safety gate review only",
  "audit observability review only",
  "result placeholder only",
  "artifact handoff placeholder only",
  "kill switch remains enforced",
  "single-call lock required",
  "idempotency required",
  "replay block required",
  "disabled launch lane",
  "blocked action summary only",
  "operator review required before video execution",
  "controlled execution trial completion does not enable provider/render/export/publish/workers/trading/automation",
  "disabled by default",
  "hard kill switch",
  "backend-only execution path required",
  "no direct frontend execution",
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
  "Controlled trial is locked",
  "Backend-owned execution required",
  "Operator approval required",
  "No provider call from frontend",
  "No real video generation yet",
  "next likely batch: 3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract"
)

$CodexForgeJarvisVideoControlledExecutionTrialSharedNeedles = @(
  "controlled trial console status",
  "trial readiness state",
  "approved dry-run reference",
  "approved approval packet reference",
  "approved video adapter reference",
  "backend readiness reference",
  "operator preflight checklist",
  "provider reference",
  "credential reference",
  "token redaction",
  "request envelope",
  "response envelope",
  "error envelope",
  "prompt redaction",
  "cost rate timeout",
  "duration resolution size",
  "privacy safety gate",
  "audit observability",
  "result placeholder",
  "artifact handoff placeholder",
  "kill switch",
  "single-call lock",
  "idempotency",
  "replay block",
  "disabled launch lane",
  "blocked action summary",
  "operator review required before video execution",
  "Final execution-trial decision state"
)

$CodexForgeJarvisVideoControlledExecutionTrialBannedPatterns = @(
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

function Invoke-CodexForgeJarvisVideoControlledExecutionTrialSmoke {
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
  $routePanel = Join-Path $root ("src/lib/codexforge/$Route/components/JarvisVideoControlledExecutionTrialPhasePanel.tsx")
  $sharedFiles = @(
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/components/index.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/components/JarvisVideoControlledExecutionTrialPanel.tsx")
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/jarvis-video-controlled-execution-trial-model.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/jarvis-video-controlled-execution-trial-packet.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/jarvis-video-controlled-execution-trial-gates.ts")
    (Join-Path $root "src/lib/codexforge/jarvis-video-controlled-execution-trial-map/jarvis-video-controlled-execution-trial-safety.ts")
  )

  foreach ($path in @($page, $pageClient, $routeLibIndex, $routeComponentsIndex, $routePanel) + $sharedFiles) {
    Assert-CodexForgeJarvisVideoControlledExecutionTrialFileExists -Path $path
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
    Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $routeSource -Needle $needle -Name "route source contains $needle"
  }

  foreach ($marker in $CodexForgeJarvisVideoControlledExecutionTrialRequiredMarkers) {
    Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $routeSource -Needle $marker -Name "route and shared source contains $marker"
  }

  $sharedSource = ($sharedFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($needle in $CodexForgeJarvisVideoControlledExecutionTrialSharedNeedles) {
    Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $sharedSource -Needle $needle -Name "shared model contains $needle"
  }

  $jarvisVideoSource = @(
    Get-Content -Raw (Join-Path $root "src/app/jarvis-video/page-client.tsx")
    Get-Content -Raw (Join-Path $root "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.tsx")
  ) -join "`n"
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $jarvisVideoSource -Needle "controlled trial console only" -Name "primary /jarvis-video source contains controlled trial console marker"

  $docsCombined = @(
    Get-Content -Raw (Join-Path $root "README.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-checkpoint-current.md")
    Get-Content -Raw (Join-Path $root "docs/codexforge-operator-checkpoint-runbook.md")
  ) -join "`n"
  foreach ($needle in @(
    "3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial",
    "3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial Mega Batch v1",
    "First Jarvis-Controlled Video Controlled Execution Trial",
    "controlled trial console only",
    "/jarvis-video controlled trial remains review-only",
    "controlled execution trial remains disabled",
    "controlled execution trial remains backend-owned",
    "controlled execution trial requires explicit operator approval",
    "next likely batch: 3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract"
  )) {
    Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $docsCombined -Needle $needle -Name "docs contain $needle"
  }

  $commandRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/command-palette/command-registry.ts")
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_CONTROLLED_EXECUTION_TRIAL_ROUTE_COMMANDS" -Name "command palette route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $commandRegistrySource -Needle "JARVIS_VIDEO_CONTROLLED_EXECUTION_TRIAL_ROUTE_AVAILABILITY" -Name "command palette availability exists for phase routes"

  $navigationRegistrySource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-route-registry.ts")
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $navigationRegistrySource -Needle "JARVIS_VIDEO_CONTROLLED_EXECUTION_TRIAL_ROUTE_INPUTS" -Name "nav route entry exists for phase routes"
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $navigationRegistrySource -Needle "buildJarvisVideoControlledExecutionTrialRouteDefaults" -Name "nav route defaults exist for phase routes"
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $navigationRegistrySource -Needle 'commandDeckRole: "workspace"' -Name "phase routes use workspace commandDeckRole"
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $navigationRegistrySource -Needle 'safetyPosture: "approval-gated"' -Name "phase routes use approval-gated safety posture"

  $navigationTypesSource = Get-Content -Raw (Join-Path $root "src/lib/codexforge/navigation-shell/navigation-shell-types.ts")
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $navigationTypesSource -Needle "JarvisVideoControlledExecutionTrialRouteSlug" -Name "navigation shell types include controlled trial route slug"
  Assert-CodexForgeJarvisVideoControlledExecutionTrialContains -Haystack $navigationTypesSource -Needle $RouteHref -Name "navigation shell types include controlled trial route href marker"

  $allSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-all.ps1")
  Assert-CodexForgeJarvisVideoControlledExecutionTrialCountExactly -Haystack $allSmokeSource -Needle $ScriptFile -Expected 1 -Name "all-smoke references route smoke once"

  $megaSmokeSource = Get-Content -Raw (Join-Path $root "scripts/smoke-codexforge-jarvis-video-controlled-execution-trial-mega-batch.ps1")
  Assert-CodexForgeJarvisVideoControlledExecutionTrialCountExactly -Haystack $megaSmokeSource -Needle $ScriptFile -Expected 1 -Name "mega smoke references route smoke once"

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
  )
  $combinedSource = ($touchedSourceFiles | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  foreach ($pattern in $CodexForgeJarvisVideoControlledExecutionTrialBannedPatterns) {
    Assert-CodexForgeJarvisVideoControlledExecutionTrialNotMatches -Haystack $combinedSource -Pattern $pattern -Name "touched files"
  }

  Assert-CodexForgeJarvisVideoControlledExecutionTrialNoMixedBorderShorthand -Paths $touchedSourceFiles
  Write-Host "[OK] $SmokeName smoke passed."
}
