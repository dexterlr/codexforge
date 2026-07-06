function Assert-CodexForgeVideoProviderExecutionApprovalPacketFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeVideoProviderExecutionApprovalPacketContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw ("[FAIL] Missing " + $Name + ": " + $Needle)
  }
  Write-Host "[PASS] $Name"
}

function Assert-CodexForgeVideoProviderExecutionApprovalPacketNotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Banned execution or secret exposure pattern found in $Name with pattern $Pattern"
  }
  Write-Host "[PASS] banned execution and secret exposure pattern absent: $Name"
}

$CodexForgeVideoProviderExecutionApprovalPacketRequiredMarkers = @(
  '3498-3529 - First Backend-Owned Video Provider Execution Approval Packet'
  '3498-3529 - First Backend-Owned Video Provider Execution Approval Packet Mega Batch v1'
  'First Backend-Owned Video Provider Execution Approval Packet'
  'backend-owned video provider execution approval packet'
  'approval packet only'
  'operator approval packet only'
  'no live provider call'
  'no real video generation'
  'no live video generation'
  'real video provider execution remains blocked'
  'approved dry-run id required'
  'approved video provider reference required'
  'credential reference review only'
  'token reference review only'
  'approved request envelope review only'
  'prompt redaction review only'
  'guard snapshot review only'
  'cost cap review only'
  'rate cap review only'
  'timeout cap review only'
  'duration resolution size cap review only'
  'backend-owned approval packet privacy gate review'
  'backend-owned approval packet safety gate review'
  'backend-owned approval packet lineage packet review'
  'backend-owned approval packet audit packet review'
  'backend-owned approval packet observability trace review'
  'synthetic provider response review remains required'
  'synthetic provider error review remains required'
  'backend-owned approval packet result capture review'
  'backend-owned approval packet artifact handoff review'
  'hard kill switch review remains required'
  'single-call lock review remains required'
  'idempotency key review remains required'
  'replay block review remains required'
  'retry policy review remains required'
  'fallback policy review remains required'
  'backend-owned runtime check remains required'
  'server-only boundary remains required'
  'operator final review remains required before real video provider execution'
  'first backend-owned video provider execution approval packet completion does not enable live provider/render/export/publish/workers'
  'disabled by default'
  'hard kill switch'
  'no provider execution'
  'no live provider execution'
  'no video provider execution'
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
  'next likely batch: 3530-3561 - First Backend-Owned Video Provider Execution Adapter Readiness'
)

$CodexForgeVideoProviderExecutionApprovalPacketBannedPatterns = @(
  '\bfetch\s*\('
  'axios\s*\.'
  'XMLHttpRequest'
  'WebSocket'
  'EventSource'
  'sendBeacon'
  'navigator\.sendBeacon'
  'localStorage\s*[\.\[]'
  'sessionStorage\s*[\.\[]'
  'indexedDB\s*[\.\[]'
  'document\.cookie'
  'cookie\s*='
  'process\.env\.[A-Za-z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)'
  "process\.env\s*\[['`"][^'`"]*(KEY|TOKEN|SECRET|CREDENTIAL|OPENAI|ANTHROPIC|GOOGLE|PROVIDER)"
  'NEXT_PUBLIC_[A-Z0-9_]*(KEY|TOKEN|SECRET|CREDENTIAL|PROVIDER)'
  'apiKey\s*[:=]'
  'providerKey\s*[:=]'
  'providerToken\s*[:=]'
  'accessToken\s*[:=]'
  'refreshToken\s*[:=]'
  'clientSecret\s*[:=]'
  'Bearer\s+[A-Za-z0-9._-]{16,}'
  'sk-[A-Za-z0-9_]{20,}'
  'sk-proj-[A-Za-z0-9_-]{20,}'
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

function Invoke-CodexForgeVideoProviderExecutionApprovalPacketBatchSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\video-provider-execution-approval-packet-map\video-provider-execution-approval-packet-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\video-provider-execution-approval-packet-map\components\VideoProviderExecutionApprovalPacketPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\video-provider-execution-approval-packet-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\video-provider-execution-approval-packet-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-video-provider-execution-approval-packet-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  $docsPaths = @(
    (Join-Path $repoRoot "README.md")
    (Join-Path $root "README.md")
    (Join-Path $root "CODEXFORGE-CHECKPOINT.md")
    (Join-Path $root "CODEXFORGE-HANDOFF.md")
    (Join-Path $root "docs\codexforge-checkpoint-current.md")
    (Join-Path $root "docs\codexforge-status-index.md")
    (Join-Path $root "docs\WORKSPACE_MAP.md")
    (Join-Path $root "docs\codexforge-structure-map.md")
    (Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md")
    (Join-Path $root "docs\operator\OPERATOR-V3-START.md")
    (Join-Path $root "docs\operator\OPERATOR-V3-SCOPE.md")
  )
  foreach ($path in @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath,$commandRegistryPath,$navRegistryPath,$navTypesPath,$allSmokePath,$wrapperSmokePath,$scriptPath) + $docsPaths) {
    Assert-CodexForgeVideoProviderExecutionApprovalPacketFileExists $path
  }
  $routeSource = @($pagePath,$pageClientPath,$libIndexPath,$componentsIndexPath,$panelPath,$sharedModelPath,$sharedPanelPath,$sharedIndexPath,$sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  $docsCombined = ($docsPaths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $routeSource "VideoProviderExecutionApprovalPacketRoutePanel" "route panel uses shared video provider execution approval packet panel"
  foreach ($marker in $CodexForgeVideoProviderExecutionApprovalPacketRequiredMarkers) { Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $routeSource $marker "route marker $marker" }
  foreach ($marker in $CodexForgeVideoProviderExecutionApprovalPacketRequiredMarkers) { Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $docsCombined $marker "docs marker $marker" }
  foreach ($pattern in $CodexForgeVideoProviderExecutionApprovalPacketBannedPatterns) { Assert-CodexForgeVideoProviderExecutionApprovalPacketNotMatches $routeSource $pattern "route source" }
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $commandRegistry ('"' + $RouteHref + '": true') "command route availability href"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $commandRegistry ('href: "' + $RouteHref + '"') "command palette href"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) { throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref" }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $navRegistry ('href: "' + $RouteHref + '"') "navigation href"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $navRegistry 'commandDeckRole: "workspace"' "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $navRegistry 'group: "Creative"' "navigation group"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $navRegistry 'safetyPosture: "review-gated"' "navigation safety posture"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $navTypes ('| "' + $Route + '"') "route id type"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $navTypes ('| "' + $RouteHref + '"') "route href marker"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $allSmoke $SmokeName "all-smoke references route name"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeVideoProviderExecutionApprovalPacketContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  foreach ($pattern in $CodexForgeVideoProviderExecutionApprovalPacketBannedPatterns) { Assert-CodexForgeVideoProviderExecutionApprovalPacketNotMatches ($commandRegistry + "`n" + $navRegistry) $pattern "command and navigation registry" }
  Write-Host "[OK] $SmokeName passed."
}
