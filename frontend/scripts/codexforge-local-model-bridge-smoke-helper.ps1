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
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\local-model-bridge", "src\lib\codexforge\unified-cockpit")) {
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
  "Local Model Bridge v1",
  "Local Model Bridge",
  "Runtime",
  "Model Registry",
  "Endpoint",
  "Prompt Handoff",
  "Redaction",
  "Capability",
  "Timeout",
  "Cancel",
  "Response",
  "Fallback",
  "Denied",
  "Evidence",
  "Result",
  "Audit",
  "No local model calls from the cockpit",
  "No runtime starts from the cockpit",
  "No localhost probing from the cockpit",
  "No port binding from the cockpit",
  "No prompt sending from the cockpit",
  "No credential storage from the cockpit",
  "Backend-owned local model bridge remains required",
  "Explicit operator approval remains required",
  "Local Model Bridge v1 is preview-only from the frontend.",
  "It does not call local models from the UI.",
  "It does not start local runtimes from the UI.",
  "It does not probe localhost from the UI.",
  "It does not bind ports from the UI.",
  "It does not send prompts from the UI.",
  "It does not read secrets or API keys.",
  "It does not store credentials in browser storage.",
  "It does not persist model responses from the UI.",
  "It prepares a future backend-owned local model bridge path.",
  "localModelBridgeId",
  "localModelBridgeKind",
  "modelRouterRef",
  "providerApprovalRef",
  "goalRef",
  "projectContextRef",
  "localRuntimeIdentityPreview",
  "localModelRegistryPreview",
  "localEndpointBoundaryPreview",
  "localPromptHandoffPreview",
  "localContextRedactionPreview",
  "localCapabilityFitPreview",
  "localTimeoutCancellationPreview",
  "localResponseCapturePreview",
  "localFallbackRoutePreview",
  "localDenialRoutePreview",
  "localEvidenceCapturePreview",
  "localResultAuditPreview",
  "deniedLocalModelBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
  "Phase pages remain dev test diagnostics only",
  "frontend local model calls still blocked",
  "backend-owned local model bridge remains required"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(|XMLHttpRequest|EventSource|WebSocket' "runtime/provider/command/file side-effect APIs"

Write-Host "[OK] $SmokeName static local model bridge smoke passed."
