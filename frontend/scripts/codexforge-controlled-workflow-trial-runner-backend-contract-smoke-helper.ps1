function Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains {
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

function Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractNotMatches {
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

$CodexForgeControlledWorkflowTrialRunnerBackendContractRequiredMarkers = @(
  "2890-2921 - Controlled Workflow Trial Runner Backend Contract"
  "2890-2921 - Controlled Workflow Trial Runner Backend Contract Mega Batch v1"
  "Controlled Workflow Trial Runner Backend Contract"
  "review-only workflow trial runner contract"
  "synthetic workflow trial runner data only"
  "backend-owned runner contract remains blocked until explicit operator approval"
  "runner input envelope"
  "runner output envelope"
  "runner state machine"
  "runner approval lock"
  "runner execution block"
  "runner replay block"
  "runner idempotency contract"
  "runner audit envelope"
  "runner redaction envelope"
  "runner observability envelope"
  "runner cost envelope"
  "runner rate envelope"
  "runner privacy envelope"
  "runner safety envelope"
  "provider gateway runner contract remains review-only"
  "asset storage runner contract remains review-only"
  "audio storage runner contract remains review-only"
  "storyboard runner contract remains review-only"
  "keyframe runner contract remains review-only"
  "timeline runner contract remains review-only"
  "render queue runner contract remains review-only"
  "worker orchestration runner contract remains review-only"
  "artifact export runner contract remains review-only"
  "publish gateway runner contract remains review-only"
  "controlled workflow trial runner completion does not execute workflow"
  "no live workflow execution"
  "no live video creation"
  "no live end-to-end execution"
  "no provider calls"
  "no model calls"
  "no prompt sending"
  "no video rendering"
  "no worker execution"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no network egress"
  "no frontend persistence"
  "no streaming"
  "no provider SDK imports"
  "no video provider imports"
  "no audio provider imports"
  "no storage provider imports"
  "no render provider imports"
  "no worker provider imports"
  "no export provider imports"
  "no publish provider imports"
  "no fetch/network calls"
  "no connector calls"
  "no upload/download"
  "no file export"
  "no social/channel publishing"
  "no scheduled publishing"
  "no OAuth flow creation"
  "no OAuth callback creation"
  "no webhook creation"
  "no signed URL creation"
  "no render execution"
  "no storyboard execution"
  "no keyframe generation"
  "no render queue dispatch"
  "no worker dispatch"
  "no job execution"
  "no scheduler execution"
  "no orchestration execution"
  "no process spawning"
  "no shell execution"
  "no command execution from the app"
  "no file system writes from the app"
  "no browser storage writes"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no credential storage"
  "no token storage"
  "no OAuth token storage"
  "no publish token storage"
  "no database writes"
  "no service creation"
  "no API creation from frontend"
  "no port binding"
  "no runtime deploy"
  "next likely batch: 2922-2953 - Provider Adapter Registry Backend Contract"
)

$CodexForgeControlledWorkflowTrialRunnerBackendContractBannedPatterns = @(
  "\bfetch\s*\("
  "XMLHttpRequest"
  "WebSocket"
  "EventSource"
  "sendBeacon"
  "navigator\.sendBeacon"
  "navigator\.mediaDevices"
  "localStorage\."
  "sessionStorage\."
  "window\.localStorage"
  "window\.sessionStorage"
  "indexedDB\."
  "document\.cookie"
  "createObjectURL"
  "showSaveFilePicker"
  "showOpenFilePicker"
  "ServiceWorker"
  "Worker\s*\("
  "child_process"
  "spawn\s*\("
  "exec\s*\("
  "execFile\s*\("
  "provider\.send"
  "renderQueue\.dispatch"
  "worker\.dispatch"
  "artifactExport\.execute"
  "publishGateway\.execute"
)

function Invoke-CodexForgeControlledWorkflowTrialRunnerBackendContractSmoke {
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
  if ($Route -match "[\/]") { throw "[FAIL] Route must be a flat slug: $Route" }
  $appRouteDir = Join-Path $root "src\app\$Route"
  $pagePath = Join-Path $appRouteDir "page.tsx"
  $pageClientPath = Join-Path $appRouteDir "page-client.tsx"
  $libDir = Join-Path $root "src\lib\codexforge\$Route"
  $libIndexPath = Join-Path $libDir "index.ts"
  $componentsIndexPath = Join-Path $libDir "components\index.ts"
  $panelPath = Get-ChildItem -Path (Join-Path $libDir "components") -Filter "*Panel.tsx" -File | Select-Object -First 1 -ExpandProperty FullName
  $sharedModelPath = Join-Path $root "src\lib\codexforge\controlled-workflow-trial-runner-backend-contract-map\controlled-workflow-trial-runner-backend-contract-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\controlled-workflow-trial-runner-backend-contract-map\components\ControlledWorkflowTrialRunnerBackendContractPanel.tsx"
  $sharedIndexPath = Join-Path $root "src\lib\codexforge\controlled-workflow-trial-runner-backend-contract-map\index.ts"
  $sharedComponentsIndexPath = Join-Path $root "src\lib\codexforge\controlled-workflow-trial-runner-backend-contract-map\components\index.ts"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $wrapperSmokePath = Join-Path $scriptRoot "smoke-codexforge-controlled-workflow-trial-runner-backend-contract-mega-batch.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @(
    $pagePath
    $pageClientPath
    $libIndexPath
    $componentsIndexPath
    $panelPath
    $sharedModelPath
    $sharedPanelPath
    $sharedIndexPath
    $sharedComponentsIndexPath
    $commandRegistryPath
    $navRegistryPath
    $navTypesPath
    $allSmokePath
    $wrapperSmokePath
    $scriptPath
  )) {
    Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath, $sharedIndexPath, $sharedComponentsIndexPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  $wrapperSmoke = Get-Content -Raw $wrapperSmokePath
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $routeSource "Controlled Workflow Trial Runner Backend Contract" "shared Controlled Workflow Trial Runner Backend Contract marker"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $routeSource "ControlledWorkflowTrialRunnerBackendContractRoutePanel" "route panel uses shared runner contract panel"
  foreach ($marker in $CodexForgeControlledWorkflowTrialRunnerBackendContractRequiredMarkers) {
    Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $routeSource $marker "route marker $marker"
  }
  foreach ($pattern in $CodexForgeControlledWorkflowTrialRunnerBackendContractBannedPatterns) {
    Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractNotMatches $routeSource $pattern "route source"
  }
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Assert-CodexForgeControlledWorkflowTrialRunnerBackendContractContains $wrapperSmoke $ScriptFile "wrapper smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
