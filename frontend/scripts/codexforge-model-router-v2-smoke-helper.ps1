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
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\model-router-v2", "src\lib\codexforge\unified-cockpit")) {
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
  "Model Router v2",
  "Capability",
  "Local Private",
  "Cheapest Capable",
  "Paid Pro",
  "Specialist",
  "Privacy",
  "Cost",
  "Prompt Preview",
  "Approval",
  "Fallback",
  "Denied",
  "Evidence",
  "Result",
  "Audit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No connector calls from the cockpit",
  "No prompt sending from the cockpit",
  "No credential storage from the cockpit",
  "Backend-owned model routing remains required",
  "Explicit operator approval remains required",
  "Model Router v2 is preview-only from the frontend.",
  "It does not call models from the UI.",
  "It does not call providers from the UI.",
  "It does not call connectors from the UI.",
  "It does not send prompts from the UI.",
  "It does not read secrets or API keys.",
  "It does not store credentials in browser storage.",
  "It does not persist provider credentials.",
  "It does not hide model choice.",
  "It does not hide cost class.",
  "It does not hide privacy class.",
  "It does not persist routing decisions from the UI.",
  "It does not release execution from the frontend.",
  "It prepares a future backend-owned provider-gated model routing path.",
  "modelRouterId",
  "modelRouterKind",
  "goalRef",
  "projectContextRef",
  "workProposalRef",
  "capabilityRegistry",
  "localPrivatePreference",
  "cheapestCapablePolicy",
  "paidProJustification",
  "specialistDomainFit",
  "privacyClass",
  "costClass",
  "promptPayloadPreview",
  "approvalGate",
  "fallbackRoute",
  "denialRoute",
  "evidenceResultAuditPreview",
  "deniedModelBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
  "Phase pages remain dev test diagnostics only",
  "frontend model/provider/connector calls still blocked",
  "backend-owned provider-gated model routing remains required"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(' "runtime/provider/command/file side-effect APIs"

Write-Host "[OK] $SmokeName static model router v2 smoke passed."
