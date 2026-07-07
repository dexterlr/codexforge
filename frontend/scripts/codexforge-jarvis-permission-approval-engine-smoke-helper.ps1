function Assert-CodexForgeJarvisPermissionApprovalEngineFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeJarvisPermissionApprovalEngineContains {
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

function Assert-CodexForgeJarvisPermissionApprovalEngineNotMatches {
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

$CodexForgeJarvisPermissionApprovalEngineRequiredMarkers = @(
  '3626-3657 - Jarvis Permission and Approval Engine'
  '3626-3657 - Jarvis Permission and Approval Engine Mega Batch v1'
  'Jarvis Permission and Approval Engine'
  'Jarvis permission and approval engine only'
  'permission engine foundation'
  'approval engine foundation'
  'centralized permission decision model'
  'one Jarvis brain with shared permissions'
  'allowed for review only'
  'dry-run only decision'
  'approval required decision'
  'blocked decision'
  'kill-switch blocked decision'
  'unsupported decision'
  'human operator review required'
  'capability permission policy required'
  'adapter permission policy required'
  'workspace permission policy required'
  'operator role review only'
  'human approval gate required'
  'dry-run required before execution'
  'approval mode required'
  'deny reason required'
  'blocked action category required'
  'approval packet readiness only'
  'cost limit posture required'
  'rate limit posture required'
  'timeout posture required'
  'data sensitivity posture required'
  'secret boundary posture required'
  'trading risk remains critical'
  'provider risk remains approval-gated'
  'website creation risk remains approval-gated'
  'avatar risk remains approval-gated'
  'workflow risk remains approval-gated'
  'audit hook readiness only'
  'result ledger hook readiness only'
  'memory boundary hook readiness only'
  'kill switch hook required'
  'replay block hook required'
  'operator review required before any execution'
  'permission and approval engine completion does not enable provider/render/export/publish/workers/trading/automation'
  'disabled by default'
  'hard kill switch'
  'no direct frontend execution'
  'no live provider call'
  'no provider execution'
  'no video provider execution'
  'no image provider execution'
  'no audio provider execution'
  'no website creation execution'
  'no avatar generation execution'
  'no chatbot autonomous execution'
  'no trading execution'
  'no paper trading execution'
  'no real-money trading execution'
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
  'no plaintext secrets'
  'no localStorage'
  'no sessionStorage'
  'no IndexedDB'
  'no cookies'
  'no browser storage for secrets'
  'next likely batch: 3658-3689 - Jarvis Task Planner and Tool Router'
)

$CodexForgeJarvisPermissionApprovalEngineBannedPatterns = @(
  '\bfetch\s*\('
  'axios\s*\.'
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'navigator\.mediaDevices'
  'localStorage\s*[\.\[]'
  'sessionStorage\s*[\.\[]'
  'indexedDB\s*[\.\[]'
  'document\.cookie'
  'cookie\s*='
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'process\.env\s*\[\s*["''][^"''\]]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
  "from\s+['`"]openai['`"]"
  "from\s+['`"]@anthropic"
  "from\s+['`"]@google"
  "from\s+['`"]@aws-sdk"
  "from\s+['`"]replicate"
  "from\s+['`"]runway"
  "from\s+['`"]fal"
  'new\s+OpenAI\s*\('
  'provider\.(send|call|execute)\s*\('
  'model\.(call|execute)\s*\('
  'prompt\.send\s*\('
  'stream\s*\('
  'imageProvider\.(call|execute)\s*\('
  'audioProvider\.(call|execute)\s*\('
  'videoProvider\.(call|execute)\s*\('
  'renderProvider\.(call|execute)\s*\('
  'exportProvider\.(call|execute)\s*\('
  'publishProvider\.(call|execute)\s*\('
  'workerProvider\.(call|execute)\s*\('
  'generateImage\s*\('
  'generateAudio\s*\('
  'generateVideo\s*\('
  'renderVideo\s*\('
  'renderArtifact\s*\('
  'renderQueue\.dispatch'
  'dispatchWorker\s*\('
  'worker\.dispatch'
  'Worker\s*\('
  'new\s+Worker'
  'artifactExport\.execute'
  'publishGateway\.execute'
  'upload\s*\('
  'download\s*\('
  'generateDownload\s*\('
  'createDownload\s*\('
  'createArchive\s*\('
  'JSZip'
  'createSignedUrl\s*\('
  'createSignedURL\s*\('
  'createOAuth\s*\('
  'createWebhook\s*\('
  'createService\s*\('
  'createApi\s*\('
  'createAPI\s*\('
  'createSchedule\s*\('
  'authorizeAccount\s*\('
  'writeFile\s*\('
  'appendFile\s*\('
  'child_process'
  'spawn\s*\('
  'exec\s*\('
  'execFile\s*\('
)

function Invoke-CodexForgeJarvisPermissionApprovalEngineSmoke {
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
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName

  $sharedModelPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\jarvis-permission-approval-engine-model.ts"
  $sharedPoliciesPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\jarvis-permission-approval-engine-policies.ts"
  $sharedDecisionsPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\jarvis-permission-approval-engine-decisions.ts"
  $sharedSafetyPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\jarvis-permission-approval-engine-safety.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\components\JarvisPermissionApprovalEnginePanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\jarvis-permission-approval-engine-map\components\index.ts"

  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-jarvis-permission-approval-engine-mega-batch.ps1"
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
    $sharedPoliciesPath,
    $sharedDecisionsPath,
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
    Assert-CodexForgeJarvisPermissionApprovalEngineFileExists $path
  }

  $routeSource = @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $sharedModelPath,
    $sharedPoliciesPath,
    $sharedDecisionsPath,
    $sharedSafetyPath,
    $sharedPanelPath,
    $sharedIndexPath,
    $sharedComponentsIndexPath
  ) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $sharedPolicies = Get-Content -Raw $sharedPoliciesPath
  $sharedDecisions = Get-Content -Raw $sharedDecisionsPath
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"

  Assert-CodexForgeJarvisPermissionApprovalEngineContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $routeSource "JarvisPermissionApprovalEngineRoutePanel" "route panel uses shared Jarvis permission approval engine panel"

  foreach ($capabilityId in @(
    "video.generate",
    "website.create",
    "avatar.prepare",
    "chatbot.plan",
    "trading.paperReview",
    "workflow.prepare",
    "render.publishReview"
  )) {
    Assert-CodexForgeJarvisPermissionApprovalEngineContains $sharedPolicies $capabilityId "shared policy entry $capabilityId"
  }

  foreach ($status in @(
    "allowed for review only",
    "dry-run only decision",
    "approval required decision",
    "blocked decision",
    "kill-switch blocked decision",
    "unsupported decision",
    "human operator review required"
  )) {
    Assert-CodexForgeJarvisPermissionApprovalEngineContains $sharedDecisions $status "shared decision status $status"
  }

  foreach ($marker in $CodexForgeJarvisPermissionApprovalEngineRequiredMarkers) {
    Assert-CodexForgeJarvisPermissionApprovalEngineContains $routeSource $marker "route marker $marker"
    Assert-CodexForgeJarvisPermissionApprovalEngineContains $docsCombined $marker "docs marker $marker"
  }

  foreach ($pattern in $CodexForgeJarvisPermissionApprovalEngineBannedPatterns) {
    Assert-CodexForgeJarvisPermissionApprovalEngineNotMatches $routeSource $pattern "route source"
    Assert-CodexForgeJarvisPermissionApprovalEngineNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry"
  }

  Assert-CodexForgeJarvisPermissionApprovalEngineContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"

  Assert-CodexForgeJarvisPermissionApprovalEngineContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $navRegistry 'group: "Advanced"' "navigation group"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $navRegistry 'safetyPosture: "approval-gated"' "navigation safety posture"

  Assert-CodexForgeJarvisPermissionApprovalEngineContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $navTypes ('| "' + $RouteHref + '"') "route href marker"

  Assert-CodexForgeJarvisPermissionApprovalEngineContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeJarvisPermissionApprovalEngineContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"

  Write-Host "[OK] $SmokeName passed."
}
