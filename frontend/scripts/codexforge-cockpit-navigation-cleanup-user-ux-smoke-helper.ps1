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

foreach ($path in @($Domain, $Route, (Join-Path $Route "page.tsx"), (Join-Path $Route "page-client.tsx"), (Join-Path "scripts" $ScriptFile))) {
  if (-not (Test-Path $path)) { throw "[FAIL] Missing path: $path" }
  Write-Host "[PASS] path exists $path"
}

$sourceParts = @()
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\cockpit-navigation-cleanup-user-ux", "src\app\codexforge-cockpit", "src\lib\codexforge\unified-cockpit")) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
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
Assert-NotMatches $source 'brokerExecution|orderPlacement|marketDataApi|exchangeApi|submitOrder|placeOrder|withdrawFunds|transferFunds|reinvestCapital|readBrokerAccount' "broker, market, or money movement APIs"

Write-Host "[OK] $SmokeName static cockpit navigation cleanup user UX smoke passed."
