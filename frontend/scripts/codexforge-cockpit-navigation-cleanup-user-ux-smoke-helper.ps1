param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string[]]$Markers
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$workspaceRoot = (Resolve-Path ".").Path

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatchesCaseSensitive {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -cmatch $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Get-RelativeSmokePath {
  param([string]$Path)
  $relativePath = $Path
  if ($relativePath.ToLowerInvariant().StartsWith($workspaceRoot.ToLowerInvariant())) {
    $relativePath = $relativePath.Substring($workspaceRoot.Length)
  }
  return $relativePath.TrimStart([char[]]("\\/")).Replace("/", "\")
}

function Test-ExcludedOlderUserUxPath {
  param([string]$Path)
  $relativePath = Get-RelativeSmokePath $Path
  foreach ($pattern in @(
    "^src\\lib\\codexforge\\broker-execution-boundary(\\|$)",
    "^src\\lib\\codexforge\\broker-[^\\]*-boundary[^\\]*(\\|$)",
    "^src\\app\\broker-[^\\]*(\\|$)",
    "^src\\app\\cockpit-broker-boundary-summary(\\|$)",
    "^src\\app\\controlled-broker-execution-boundary-release-candidate(\\|$)",
    "^src\\app\\first-broker-execution-boundary-candidate(\\|$)",
    "^scripts\\smoke-codexforge-broker-[^\\]*\.ps1$",
    "^scripts\\codexforge-broker-execution-boundary-smoke-helper\.ps1$"
  )) {
    if ($relativePath -match $pattern) { return $true }
  }
  return $false
}

foreach ($path in @($Domain, $Route, (Join-Path $Route "page.tsx"), (Join-Path $Route "page-client.tsx"), (Join-Path "scripts" $ScriptFile))) {
  if (-not (Test-Path $path)) { throw "[FAIL] Missing path: $path" }
  Write-Host "[PASS] path exists $path"
}

$sourceParts = @()
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\cockpit-navigation-cleanup-user-ux", "src\app\codexforge-cockpit", "src\lib\codexforge\unified-cockpit")) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$olderBatchSourceParts = @()
$olderUserUxScanRoots = @(
  "src\lib\codexforge\cockpit-navigation-cleanup-user-ux",
  "src\lib\codexforge\user-cockpit-home-preview",
  "src\lib\codexforge\trading-workspace-hub-preview",
  "src\lib\codexforge\build-workspace-hub-preview",
  "src\lib\codexforge\approvals-hub-preview",
  "src\lib\codexforge\evidence-audit-hub-preview",
  "src\lib\codexforge\developer-diagnostics-hub-preview",
  "src\lib\codexforge\phase-route-grouping-preview",
  "src\lib\codexforge\user-feature-label-map-preview",
  "src\lib\codexforge\cockpit-quick-actions-preview",
  "src\lib\codexforge\next-action-rail-cleanup-preview",
  "src\lib\codexforge\command-palette-grouping-preview",
  "src\lib\codexforge\cockpit-status-summary-preview",
  "src\lib\codexforge\cockpit-onboarding-help-preview",
  "src\lib\codexforge\first-consolidated-user-ux-candidate",
  "src\lib\codexforge\controlled-consolidated-user-ux-release-candidate",
  "src\app\cockpit-navigation-cleanup-boundary",
  "src\app\user-cockpit-home-preview",
  "src\app\trading-workspace-hub-preview",
  "src\app\build-workspace-hub-preview",
  "src\app\approvals-hub-preview",
  "src\app\evidence-audit-hub-preview",
  "src\app\developer-diagnostics-hub-preview",
  "src\app\phase-route-grouping-preview",
  "src\app\user-feature-label-map-preview",
  "src\app\cockpit-quick-actions-preview",
  "src\app\next-action-rail-cleanup-preview",
  "src\app\command-palette-grouping-preview",
  "src\app\cockpit-status-summary-preview",
  "src\app\cockpit-onboarding-help-preview",
  "src\app\first-consolidated-user-ux-candidate",
  "src\app\controlled-consolidated-user-ux-release-candidate"
)
foreach ($scanRoot in $olderUserUxScanRoots) {
  if (Test-Path $scanRoot) {
    $olderBatchSourceParts += Get-ChildItem -Recurse -File $scanRoot |
      Where-Object { -not (Test-ExcludedOlderUserUxPath $_.FullName) } |
      ForEach-Object { Get-Content -Raw $_.FullName }
  }
}
$olderBatchSource = $olderBatchSourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$commandGroups = Get-Content -Raw "src\lib\codexforge\command-palette\command-groups.ts"
$sidebar = Get-Content -Raw "src\lib\codexforge\navigation-shell\components\CodexForgeSidebar.tsx"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "CockpitNavigationCleanupRoutePanel" "main route panel"
Assert-Contains $source "CockpitNavigationCleanupUserUxCockpitPanel" "cockpit user ux panel"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationTypes "| `"$RouteHref`"" "route type coverage"
Assert-Contains $commandRegistry "`"$RouteHref`": true" "command availability coverage"
Assert-Contains $commandRegistry "href: `"$RouteHref`"" "command route coverage"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $commandGroups "User features" "user feature command group"
Assert-Contains $commandGroups "Developer diagnostics" "developer diagnostics command group"
Assert-Contains $sidebar "Main menu hides phase spam" "normal navigation cleanup marker"
Assert-Contains $sidebar "/developer-diagnostics-hub-preview" "developer diagnostics nav entry"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"

foreach ($marker in $Markers) {
  Assert-Contains $source $marker "marker $marker"
}

foreach ($safetyMarker in @(
  "Cockpit Navigation Cleanup User UX",
  "One user cockpit",
  "CodexForge Cockpit",
  "Trading Workspace",
  "Build Workspace",
  "Approvals Hub",
  "Evidence Audit Hub",
  "Developer Diagnostics",
  "Phase routes remain diagnostics",
  "Phase pages remain dev test diagnostics only",
  "Normal users start at /codexforge-cockpit",
  "Feature labels replace phase labels",
  "Main menu hides phase spam",
  "Diagnostics remain searchable",
  "Direct phase route access remains available",
  "Smoke coverage remains preserved",
  "Command palette groups diagnostics",
  "No route deletion",
  "No smoke deletion",
  "No hidden execution",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No money movement from the cockpit",
  "No model calls from the cockpit",
  "No command execution from the cockpit",
  "Explicit operator approval remains required",
  "cockpitNavigationCleanupUserUxId",
  "cockpitNavigationCleanupUserUxKind",
  "userCockpitHome",
  "tradingWorkspaceHub",
  "buildWorkspaceHub",
  "approvalsHub",
  "evidenceAuditHub",
  "developerDiagnosticsHub",
  "phaseRouteGrouping",
  "userFeatureLabelMap",
  "cockpitQuickActions",
  "nextActionRailCleanup",
  "commandPaletteGrouping",
  "cockpitStatusSummary",
  "cockpitOnboardingHelp",
  "deniedNavigationCleanupBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
  "Open CodexForge Cockpit",
  "Open Trading Workspace",
  "Open Build Workspace",
  "Review Approvals",
  "Review Evidence and Audit",
  "Open Developer Diagnostics",
  "Core Foundations",
  "Build Workspace",
  "Trading Research",
  "Mandate Risk Governor",
  "Strategy Lab Signal Engine",
  "Backtest Paper Trading",
  "Profit Lockbox Reinvestment",
  "Cockpit UX Diagnostics"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|runCommand|writeFile|spawn\(|exec\(' "runtime/provider/command/file side-effect APIs"
Assert-NotMatchesCaseSensitive $olderBatchSource 'brokerExecution|orderPlacement|marketDataApi|exchangeApi|submitOrder|placeOrder|withdrawFunds|transferFunds|reinvestCapital|readBrokerAccount' "broker, market, or money movement APIs"

Write-Host "[OK] $SmokeName static cockpit navigation cleanup user UX smoke passed."
