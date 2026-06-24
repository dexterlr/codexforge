param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$MainPanel,
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
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\trading-research-domain-pack", "src\lib\codexforge\cockpit-domain-workspace", "src\lib\codexforge\unified-cockpit")) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source $MainPanel "main panel source"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationRegistry $CommandLabel.Replace("Go to ", "") "navigation label"
Assert-Contains $commandRegistry $RouteHref "command route href"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"

foreach ($marker in $Markers) {
  Assert-Contains $source $marker "marker $marker"
}

foreach ($safetyMarker in @(
  "Trading Research Domain Pack",
  "Trading Research",
  "Research Goal",
  "Watchlist",
  "Thesis Builder",
  "Catalyst Tracker",
  "Risk Notes",
  "Strategy Candidates",
  "Backtest Readiness",
  "Paper Trade Readiness",
  "Profit Lockbox",
  "Trading Mandate Draft",
  "Broker Boundary",
  "Evidence Audit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
  "No financial advice from the cockpit",
  "No guaranteed profit claims",
  "Paper trading required before automation",
  "Backtesting required before automation",
  "Risk governor required before automation",
  "Backend-owned broker boundary remains required",
  "Explicit operator approval remains required",
  "tradingResearchDomainId",
  "tradingResearchDomainKind",
  "researchGoalIntake",
  "watchlistPreview",
  "thesisBuilderPreview",
  "catalystTrackerPreview",
  "riskNotesPreview",
  "strategyCandidatePreview",
  "backtestReadinessPreview",
  "paperTradeReadinessPreview",
  "profitLockboxPreview",
  "tradingMandateDraftPreview",
  "brokerBoundaryPreview",
  "evidenceAuditPreview",
  "cockpitSummary",
  "deniedTradingResearchBoundaries",
  "explicitSafetyLimits",
  "realised profit only",
  "profitable closed trades only",
  "protected profit bucket",
  "reinvestable profit bucket",
  "configurable lock percentage",
  "20% realised profit protected and 80% reinvestable",
  "losing trades have no profit lock",
  "losses reduce active capital",
  "no guaranteed return",
  "allocated capital",
  "active capital",
  "max daily loss",
  "max drawdown",
  "max position risk",
  "approved markets",
  "approved symbols",
  "approved strategies",
  "paper-trade proof required",
  "backtest proof required",
  "kill switch required",
  "broker approval required",
  "automation disabled in this batch",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
  "No financial advice from the cockpit",
  "No guaranteed profit claims"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(|XMLHttpRequest|EventSource|WebSocket' "runtime/provider/command/file side-effect APIs"
Assert-NotMatches $source 'brokerExecution|orderPlacement|marketDataApi|exchangeApi|submitOrder|placeOrder' "broker or market execution APIs"

Write-Host "[OK] $SmokeName static trading research domain pack smoke passed."
