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
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\strategy-lab-signal-engine", "src\lib\codexforge\unified-cockpit")) {
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
  "Strategy Lab Signal Engine",
  "Strategy Lab",
  "Signal Engine",
  "Strategy Idea",
  "Strategy Hypothesis",
  "Indicator Concept",
  "Signal Rule Draft",
  "Entry Rule Draft",
  "Exit Rule Draft",
  "Stop Loss Rule Draft",
  "Take Profit Rule Draft",
  "Position Sizing Concept",
  "Signal Confidence Notes",
  "Signal Invalidation Notes",
  "Strategy Evidence Map",
  "No executable signals from the cockpit",
  "No broker connections from the cockpit",
  "No trade placement from the cockpit",
  "No live market data calls from the cockpit",
  "No financial advice from the cockpit",
  "No personalised recommendations from the cockpit",
  "No buy sell instructions from the cockpit",
  "No guaranteed profit claims",
  "No trading automation from the cockpit",
  "Backtesting remains backend-owned",
  "Paper trading remains backend-owned",
  "Risk governor remains required",
  "Backend-owned broker boundary remains required",
  "Explicit operator approval remains required",
  "strategyLabSignalEngineId",
  "strategyLabSignalEngineKind",
  "strategyIdeaIntake",
  "strategyHypothesis",
  "indicatorConceptPreview",
  "signalRuleDraft",
  "entryRuleDraft",
  "exitRuleDraft",
  "stopLossRuleDraft",
  "takeProfitRuleDraft",
  "positionSizingConcept",
  "signalConfidenceNotes",
  "signalInvalidationNotes",
  "strategyEvidenceMap",
  "deniedStrategySignalBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
  "strategy idea intake",
  "strategy hypothesis",
  "indicator concept preview",
  "signal rule draft",
  "entry rule draft",
  "exit rule draft",
  "stop loss rule draft",
  "take profit rule draft",
  "position sizing concept",
  "signal confidence notes",
  "signal invalidation notes",
  "strategy evidence map",
  "operator approval gates",
  "risk governor prerequisite",
  "backend-owned broker boundary prerequisite"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(' "runtime/provider/command/file/browser side-effect APIs"
Assert-NotMatches $source 'brokerExecution|orderPlacement|marketDataApi|exchangeApi|submitOrder|placeOrder' "broker or market execution APIs"

Write-Host "[OK] $SmokeName static strategy lab signal engine smoke passed."
