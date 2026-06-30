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
foreach ($scanRoot in @("src\lib\codexforge\paper-trading-review-dashboard", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$cockpitPanel = Get-Content -Raw "src\lib\codexforge\cockpit-navigation-cleanup-user-ux\components\CockpitNavigationCleanupUserUxPanel.tsx"
$unifiedCockpit = Get-Content -Raw "src\lib\codexforge\unified-cockpit\components\UnifiedCockpitPanel.tsx"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "PaperTradingReviewDashboardRoutePanel" "main route panel"
Assert-Contains $source "PaperTradingReviewDashboardCockpitSummaryPanel" "cockpit paper trading review dashboard summary panel"
Assert-Contains $cockpitPanel "PaperTradingReviewDashboardCockpitSummaryPanel" "cockpit navigation cleanup dashboard summary"
Assert-Contains $unifiedCockpit "PaperTradingReviewDashboardCockpitSummaryPanel" "unified cockpit dashboard summary"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationTypes "| `"$RouteHref`"" "route type coverage"
Assert-Contains $commandRegistry "`"$RouteHref`": true" "command availability coverage"
Assert-Contains $commandRegistry "href: `"$RouteHref`"" "command route coverage"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"

$escapedRouteHref = [regex]::Escape($RouteHref)
$commandHrefPattern = "href:\s*`"$escapedRouteHref`""
$commandHrefCount = ([regex]::Matches($commandRegistry, $commandHrefPattern)).Count
if ($commandHrefCount -ne 1) { throw "[FAIL] Duplicate command palette href count for $RouteHref`: $commandHrefCount" }
Write-Host "[PASS] unique command palette href $RouteHref"

foreach ($marker in $Markers) {
  Assert-Contains $source $marker "marker $marker"
}

foreach ($safetyMarker in @(
  "Paper Trading Review Dashboard",
  "Simulated Performance Summary",
  "Simulated Trade Review Queue",
  "Simulated Risk Review Queue",
  "Simulated Evidence Review Queue",
  "Simulated Approval Review Queue",
  "Simulated Metric Cards",
  "Simulated Ledger Timeline",
  "Simulated Exception Queue",
  "Simulated Review Note Packet",
  "Simulated Operator Signoff",
  "Simulated Dashboard Export Boundary",
  "Simulated Dashboard Health Status",
  "Synthetic data only",
  "Review-only dashboard",
  "No real broker connection from the cockpit",
  "No real account dashboard from the cockpit",
  "No live positions from the cockpit",
  "No live market data calls from the cockpit",
  "No real P&L from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No paper order execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No performance guarantees",
  "Backend-owned paper broker adapter remains required",
  "Backend-owned result ledger remains required",
  "Backend-owned evidence capture remains required",
  "Backend-owned review workflow remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
  "paperTradingReviewDashboardId",
  "paperTradingReviewDashboardKind",
  "simulatedPerformanceSummary",
  "simulatedTradeReviewQueue",
  "simulatedRiskReviewQueue",
  "simulatedEvidenceReviewQueue",
  "simulatedApprovalReviewQueue",
  "simulatedMetricCards",
  "simulatedLedgerTimeline",
  "simulatedExceptionQueue",
  "simulatedReviewNotePacket",
  "simulatedOperatorSignoff",
  "simulatedDashboardExportBoundary",
  "simulatedDashboardHealthStatus",
  "deniedPaperTradingReviewDashboardBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(' "runtime/provider/command/file/browser side-effect APIs"
Assert-NotMatches $source 'brokerSdk|brokerApi|marketDataApi|exchangeApi|submitOrder|placeOrder|withdrawFunds|transferFunds|readBrokerAccount|dispatchBrokerOrder' "broker, market, or money movement APIs"

Write-Host "[OK] $SmokeName static paper trading review dashboard smoke passed."
