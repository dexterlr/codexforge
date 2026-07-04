function Assert-CodexForgeFirstControlledVideoWorkflowTrialFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeFirstControlledVideoWorkflowTrialContains {
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

function Assert-CodexForgeFirstControlledVideoWorkflowTrialNotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Banned execution API found in $Name with pattern $Pattern"
  }
  Write-Host "[PASS] banned execution API absent: $Name"
}

$CodexForgeFirstControlledVideoWorkflowTrialRequiredMarkers = @(
  "2858-2889 - First Controlled Video Workflow Trial",
  "2858-2889 - First Controlled Video Workflow Trial Mega Batch v1",
  "First Controlled Video Workflow Trial",
  "review-only controlled video workflow trial",
  "synthetic controlled video trial data only",
  "controlled video workflow trial remains blocked until explicit operator approval",
  "provider gateway handoff remains review-only",
  "asset storage handoff remains review-only",
  "audio storage handoff remains review-only",
  "render queue handoff remains review-only",
  "worker orchestration handoff remains review-only",
  "artifact export handoff remains review-only",
  "publish gateway handoff remains review-only",
  "operator approval checkpoint remains required",
  "audit boundary remains required",
  "redaction boundary remains required",
  "privacy safety cost guard remains required",
  "controlled trial completion does not execute video workflow",
  "no live video creation",
  "no live end-to-end execution",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no video rendering",
  "no worker execution",
  "no artifact export execution",
  "no publish gateway execution",
  "no platform upload",
  "no network egress",
  "no frontend persistence",
  "no streaming",
  "no provider SDK imports",
  "no video provider imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no publish provider imports",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no file export",
  "no social/channel publishing",
  "no scheduled publishing",
  "no OAuth flow creation",
  "no OAuth callback creation",
  "no webhook creation",
  "no signed URL creation",
  "no render execution",
  "no storyboard execution",
  "no keyframe generation",
  "no render queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no browser storage writes",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "no database writes",
  "no service creation",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "first controlled internal private alpha workflow trial",
  "reviewed gated approved audited blocked handoff surface",
  "operator-approved only",
  "review-only trial intake boundary",
  "review-only trial contract",
  "review-only trial scenario envelope",
  "review-only operator brief",
  "review-only prompt review",
  "review-only provider gateway review",
  "review-only asset storage review",
  "review-only audio storage review",
  "review-only storyboard review",
  "review-only keyframe review",
  "review-only timeline review",
  "review-only render queue review",
  "review-only worker orchestration review",
  "review-only artifact export review",
  "review-only publish gateway review",
  "execution lock remains active",
  "replay remains blocked",
  "persistence guard remains active",
  "credential isolation remains active",
  "token isolation remains active",
  "provider import guard remains active",
  "network egress guard remains active",
  "observability trace remains synthetic",
  "retry policy remains review-only",
  "fallback policy remains review-only",
  "operator readiness remains review-only",
  "next likely batch: 2890-2921 - roadmap follow-up after First Controlled Video Workflow Trial, not implemented here"
)

$CodexForgeFirstControlledVideoWorkflowTrialBannedPatterns = @(
  "\bfetch\s*\(",
  "XMLHttpRequest",
  "WebSocket",
  "EventSource",
  "sendBeacon",
  "navigator\.sendBeacon",
  "navigator\.mediaDevices",
  "localStorage\.",
  "sessionStorage\.",
  "window\.localStorage",
  "window\.sessionStorage",
  "indexedDB\.",
  "document\.cookie",
  "createObjectURL",
  "showSaveFilePicker",
  "showOpenFilePicker",
  "ServiceWorker",
  "Worker\s*\(",
  "child_process",
  "spawn\s*\(",
  "exec\s*\(",
  "execFile\s*\(",
  "provider\.send",
  "renderQueue\.dispatch",
  "worker\.dispatch",
  "artifactExport\.execute",
  "publishGateway\.execute"
)

function Invoke-CodexForgeFirstControlledVideoWorkflowTrialSmoke {
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
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\first-controlled-video-workflow-trial-map\first-controlled-video-workflow-trial-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\first-controlled-video-workflow-trial-map\components\FirstControlledVideoWorkflowTrialPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\first-controlled-video-workflow-trial-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\first-controlled-video-workflow-trial-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-first-controlled-video-workflow-trial-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $sharedModelPath,
    $sharedPanelPath,
    $sharedIndexPath,
    $sharedComponentsIndexPath,
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath,
    $allSmokePath,
    $wrapperSmokePath,
    $scriptPath
  )) {
    Assert-CodexForgeFirstControlledVideoWorkflowTrialFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $routeSource "First Controlled Video Workflow Trial" "shared First Controlled Video Workflow Trial marker"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $routeSource "FirstControlledVideoWorkflowTrialRoutePanel" "route panel uses shared controlled trial panel"
  foreach ($marker in $CodexForgeFirstControlledVideoWorkflowTrialRequiredMarkers) {
    Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeFirstControlledVideoWorkflowTrialBannedPatterns) {
    Assert-CodexForgeFirstControlledVideoWorkflowTrialNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeFirstControlledVideoWorkflowTrialContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
