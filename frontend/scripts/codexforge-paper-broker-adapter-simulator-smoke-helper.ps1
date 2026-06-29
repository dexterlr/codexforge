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
foreach ($scanRoot in @("src\lib\codexforge\paper-broker-adapter-simulator", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "PaperBrokerAdapterSimulatorRoutePanel" "main route panel"
Assert-Contains $source "PaperBrokerAdapterSimulatorCockpitSummaryPanel" "cockpit paper broker simulator summary panel"
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
  "Paper Broker Adapter Simulator",
  "Synthetic Account State",
  "Synthetic Buying Power",
  "Synthetic Position Ledger",
  "Synthetic Order Intent",
  "Synthetic Order Validation",
  "Synthetic Order Queue",
  "Synthetic Fill Model",
  "Synthetic Slippage Fee",
  "Synthetic Rejection Reason",
  "Synthetic Cancel Replace",
  "Synthetic Execution Audit",
  "Synthetic Risk Governor Bridge",
  "No real broker connection from the cockpit",
  "No broker SDK from the cockpit",
  "No broker API calls from the cockpit",
  "No real account state from the cockpit",
  "No real buying power from the cockpit",
  "No live positions from the cockpit",
  "No live market data calls from the cockpit",
  "No order placement from the cockpit",
  "No order dispatch from the cockpit",
  "No real paper order execution from the cockpit",
  "No money movement from the cockpit",
  "No trading automation from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "Synthetic data only",
  "Review-only simulator",
  "Backend-owned paper broker adapter remains required",
  "Backend-owned execution simulator remains required",
  "Risk governor approval remains required",
  "Kill switch enforcement remains required",
  "Explicit operator approval remains required",
  "paperBrokerAdapterSimulatorId",
  "paperBrokerAdapterSimulatorKind",
  "syntheticAccountState",
  "syntheticBuyingPower",
  "syntheticPositionLedger",
  "syntheticOrderIntent",
  "syntheticOrderValidation",
  "syntheticOrderQueue",
  "syntheticFillModel",
  "syntheticSlippageFee",
  "syntheticRejectionReason",
  "syntheticCancelReplace",
  "syntheticExecutionAudit",
  "syntheticRiskGovernorBridge",
  "deniedPaperBrokerSimulatorBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(' "runtime/provider/command/file/browser side-effect APIs"
Assert-NotMatches $source 'brokerSdk|brokerApi|marketDataApi|exchangeApi|submitOrder|placeOrder|withdrawFunds|transferFunds|readBrokerAccount|dispatchBrokerOrder' "broker, market, or money movement APIs"

Write-Host "[OK] $SmokeName static paper broker adapter simulator smoke passed."
