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
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\specialist-worker-registry", "src\lib\codexforge\unified-cockpit")) {
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
  "Specialist Worker Registry",
  "Coding",
  "Research",
  "Game Server",
  "Web App",
  "Docs",
  "Data",
  "Creative",
  "Video",
  "Trading Analysis",
  "QA Validation",
  "Audit",
  "Recovery",
  "Worker Routing",
  "Capability Fit",
  "Denied Workers",
  "No worker dispatch from the cockpit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No connector calls from the cockpit",
  "No command execution from the cockpit",
  "Backend-owned worker routing remains required",
  "Explicit operator approval remains required",
  "Specialist Worker Registry is preview-only from the frontend.",
  "It does not dispatch workers from the UI.",
  "It does not call models from the UI.",
  "It does not call local models from the UI.",
  "It does not call providers from the UI.",
  "It does not call connectors from the UI.",
  "It does not send prompts from the UI.",
  "It does not execute commands from the UI.",
  "It does not start runtimes from the UI.",
  "It does not persist worker decisions from the UI.",
  "It does not persist evidence/results/audit from the UI.",
  "It prepares a future backend-owned specialist worker routing path.",
  "specialistWorkerRegistryId",
  "specialistWorkerRegistryKind",
  "goalRef",
  "projectContextRef",
  "modelRouterRef",
  "providerApprovalRef",
  "localModelBridgeRef",
  "workerProfiles",
  "codingWorkerProfile",
  "researchWorkerProfile",
  "gameServerWorkerProfile",
  "webAppWorkerProfile",
  "docsWorkerProfile",
  "dataWorkerProfile",
  "creativeWorkerProfile",
  "videoWorkerProfile",
  "tradingAnalysisWorkerProfile",
  "qaValidationWorkerProfile",
  "auditWorkerProfile",
  "recoveryWorkerProfile",
  "workerRoutingFit",
  "deniedWorkerBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
  "Phase pages remain dev test diagnostics only",
  "frontend worker dispatch still blocked",
  "backend-owned specialist worker routing remains required"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(|XMLHttpRequest|EventSource|WebSocket' "runtime/provider/command/file side-effect APIs"

Write-Host "[OK] $SmokeName static specialist worker registry smoke passed."
