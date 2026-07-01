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
  if (-not $Haystack.Contains($Needle)) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host ("[PASS] " + $Name)
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw ("[FAIL] Unexpected " + $Name + ": " + $Pattern) }
  Write-Host ("[PASS] " + $Name)
}

foreach ($path in @($Domain, $Route, (Join-Path $Route "page.tsx"), (Join-Path $Route "page-client.tsx"), (Join-Path "scripts" $ScriptFile))) {
  if (-not (Test-Path $path)) { throw ("[FAIL] Missing path: " + $path) }
  Write-Host ("[PASS] path exists " + $path)
}

$sourceParts = @()
foreach ($scanRoot in @("src\lib\codexforge\strategy-version-review-registry", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$cockpitPanel = Get-Content -Raw "src\lib\codexforge\cockpit-navigation-cleanup-user-ux\components\CockpitNavigationCleanupUserUxPanel.tsx"
$unifiedCockpit = Get-Content -Raw "src\lib\codexforge\unified-cockpit\components\UnifiedCockpitPanel.tsx"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "StrategyVersionReviewRegistryRoutePanel" "main route panel"
Assert-Contains $source "StrategyVersionReviewRegistryCockpitSummaryPanel" "cockpit strategy version registry summary panel"
Assert-Contains $cockpitPanel "StrategyVersionReviewRegistryCockpitSummaryPanel" "cockpit navigation cleanup strategy version registry summary"
Assert-Contains $unifiedCockpit "StrategyVersionReviewRegistryCockpitSummaryPanel" "unified cockpit strategy version registry summary"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationTypes ('| "' + $RouteHref + '"') "route type coverage"
Assert-Contains $commandRegistry ('"' + $RouteHref + '": true') "command availability coverage"
Assert-Contains $commandRegistry ('href: "' + $RouteHref + '"') "command route coverage"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"

$escapedRouteHref = [regex]::Escape($RouteHref)
$commandHrefPattern = 'href:\s*"' + $escapedRouteHref + '"'
$commandHrefCount = ([regex]::Matches($commandRegistry, $commandHrefPattern)).Count
if ($commandHrefCount -ne 1) { throw ("[FAIL] Duplicate command palette href count for " + $RouteHref + ": " + $commandHrefCount) }
Write-Host ("[PASS] unique command palette href " + $RouteHref)

foreach ($marker in $Markers) {
  Assert-Contains $source $marker ("marker " + $marker)
}

foreach ($safetyMarker in @(
  "Strategy Version Review Registry"
  "Version Lineage Map"
  "Version Diff Summary"
  "Version Evidence Links"
  "Version Risk Status"
  "Version Mandate Status"
  "Version Approval State"
  "Version Retirement State"
  "Version Rollback Note"
  "Version Comparison Matrix"
  "Version Review Checklist"
  "Version Registry Export Boundary"
  "No Auto Promote Registry Boundary"
  "Review-only strategy version registry"
  "Synthetic data only"
  "No financial advice from the cockpit"
  "No personalised recommendations from the cockpit"
  "No buy sell instructions from the cockpit"
  "No strategy auto promotion from the cockpit"
  "No strategy auto tuning from the cockpit"
  "No automatic rule mutation from the cockpit"
  "No frontend file mutation"
  "No frontend approval persistence"
  "No frontend version persistence"
  "No real P&L analysis from the cockpit"
  "No live market data calls from the cockpit"
  "No order placement from the cockpit"
  "No order dispatch from the cockpit"
  "No broker execution from the cockpit"
  "No money movement from the cockpit"
  "No trading automation from the cockpit"
  "No performance guarantees"
  "Backend-owned version registry remains required"
  "Backend-owned change workflow remains required"
  "Backend-owned evidence capture remains required"
  "Backend-owned approval capture remains required"
  "Operator review remains required"
  "Risk governor approval remains required"
  "Kill switch enforcement remains required"
  "Explicit operator approval remains required"
  "strategyVersionReviewRegistryId"
  "strategyVersionReviewRegistryKind"
  "versionLineageMap"
  "versionDiffSummary"
  "versionEvidenceLinks"
  "versionRiskStatus"
  "versionMandateStatus"
  "versionApprovalState"
  "versionRetirementState"
  "versionRollbackNote"
  "versionComparisonMatrix"
  "versionReviewChecklist"
  "versionRegistryExportBoundary"
  "noAutoPromoteRegistryBoundary"
  "deniedStrategyVersionRegistryBoundaries"
  "cockpitSummary"
  "explicitSafetyLimits"
)) {
  Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker)
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
Assert-NotMatches $source 'brokerSdk|brokerApi|marketDataApi|exchangeApi|submitOrder|placeOrder|withdrawFunds|transferFunds|reinvestCapital|readBrokerAccount|dispatchBrokerOrder|runCommand|writeFile|saveBrainGraph|appendEvent' "broker, market, money movement, command, or mutation APIs"

Write-Host ("[OK] " + $SmokeName + " static strategy version review registry smoke passed.")
