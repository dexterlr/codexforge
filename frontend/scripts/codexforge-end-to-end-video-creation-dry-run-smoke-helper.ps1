function Assert-CodexForgeVideoDryRunFileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-CodexForgeVideoDryRunContains {
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

$CodexForgeVideoDryRunRequiredMarkers = @(
  "2826-2857 - End-to-End Video Creation Dry Run Mega Batch v1",
  "End-to-End Video Creation Dry Run",
  "review-only video dry run diagnostic",
  "blocked video workflow execution",
  "protected video workflow boundary",
  "video dry run contract",
  "video idea envelope",
  "prompt safety review",
  "provider gateway handoff boundary",
  "asset storage handoff boundary",
  "audio storage handoff boundary",
  "storyboard plan boundary",
  "keyframe plan boundary",
  "timeline plan boundary",
  "render queue handoff boundary",
  "worker orchestration handoff boundary",
  "artifact export handoff boundary",
  "publish gateway handoff boundary",
  "operator approval checkpoint",
  "execution blocked",
  "video workflow persistence blocked",
  "no live video creation",
  "no live end-to-end execution",
  "no live storyboard execution",
  "no live keyframe generation",
  "no live prompt execution",
  "no live render plan execution",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no publish provider imports",
  "no video provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no audio upload",
  "no audio download",
  "no audio recording",
  "no microphone access",
  "no media device access",
  "no playback engine creation",
  "no audio rendering",
  "no video rendering",
  "no transcoding",
  "no render execution",
  "no render queue dispatch",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no artifact export execution",
  "no file export",
  "no download generation",
  "no archive creation",
  "no signed URL creation",
  "no publish gateway execution",
  "no publish handoff execution",
  "no platform upload",
  "no channel publishing",
  "no social publishing",
  "no scheduled publishing",
  "no OAuth flow creation",
  "no webhook creation",
  "no callback route creation",
  "no render/export/publish/schedule",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no API creation from frontend",
  "no service creation",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "video dry run state",
  "video dry run recovery",
  "operator review",
  "cockpit alignment",
  "completion guard",
  "guarded video pipeline path",
  "controlled video workflow trial next",
  "next likely batch: 2858-2889 - First Controlled Video Workflow Trial"
)

function Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke {
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
  $sharedModelPath = Join-Path $root "src\lib\codexforge\end-to-end-video-creation-dry-run-map\end-to-end-video-creation-dry-run-model.ts"
  $sharedPanelPath = Join-Path $root "src\lib\codexforge\end-to-end-video-creation-dry-run-map\components\EndToEndVideoCreationDryRunPanel.tsx"
  $commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
  $navRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
  $navTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
  $allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"
  $scriptPath = Join-Path $scriptRoot $ScriptFile
  foreach ($path in @(
    $pagePath,
    $pageClientPath,
    $libIndexPath,
    $componentsIndexPath,
    $panelPath,
    $sharedModelPath,
    $sharedPanelPath,
    $commandRegistryPath,
    $navRegistryPath,
    $navTypesPath,
    $allSmokePath,
    $scriptPath
  )) {
    Assert-CodexForgeVideoDryRunFileExists $path
  }
  $routeSource = @($pagePath, $pageClientPath, $libIndexPath, $componentsIndexPath, $panelPath, $sharedModelPath, $sharedPanelPath) | ForEach-Object { Get-Content -Raw $_ } | Out-String
  $commandRegistry = Get-Content -Raw $commandRegistryPath
  $navRegistry = Get-Content -Raw $navRegistryPath
  $navTypes = Get-Content -Raw $navTypesPath
  $allSmoke = Get-Content -Raw $allSmokePath
  Assert-CodexForgeVideoDryRunContains $routeSource $RouteHref "route href in route source"
  Assert-CodexForgeVideoDryRunContains $routeSource $Title "phase title in route source"
  Assert-CodexForgeVideoDryRunContains $routeSource $Phase "phase number in route source"
  Assert-CodexForgeVideoDryRunContains $routeSource "End-to-End Video Creation Dry Run" "shared End-to-End Video Creation Dry Run marker"
  Assert-CodexForgeVideoDryRunContains $routeSource "EndToEndVideoCreationDryRunRoutePanel" "route panel uses shared video dry run panel"
  foreach ($marker in $CodexForgeVideoDryRunRequiredMarkers) {
    Assert-CodexForgeVideoDryRunContains $routeSource $marker "route marker $marker"
  }
  Assert-CodexForgeVideoDryRunContains $commandRegistry "`"$RouteHref`": true" "command route availability href"
  Assert-CodexForgeVideoDryRunContains $commandRegistry "href: `"$RouteHref`"" "command palette href"
  Assert-CodexForgeVideoDryRunContains $commandRegistry $CommandLabel "command palette label"
  $hrefPattern = 'href:\s*"' + [regex]::Escape($RouteHref) + '"'
  $hrefCount = ([regex]::Matches($commandRegistry, $hrefPattern)).Count
  if ($hrefCount -ne 1) {
    throw "[FAIL] command palette href count expected 1 found $hrefCount for $RouteHref"
  }
  Write-Host "[PASS] command palette href count exactly 1"
  Assert-CodexForgeVideoDryRunContains $navRegistry "href: `"$RouteHref`"" "navigation href"
  Assert-CodexForgeVideoDryRunContains $navRegistry "commandDeckRole: `"workspace`"" "navigation commandDeckRole uses existing workspace role"
  Assert-CodexForgeVideoDryRunContains $navTypes "| `"$Route`"" "route id type"
  Assert-CodexForgeVideoDryRunContains $navTypes "| `"$RouteHref`"" "route href type"
  Assert-CodexForgeVideoDryRunContains $allSmoke $ScriptFile "all-smoke references route smoke"
  Write-Host "[OK] $SmokeName passed."
}
