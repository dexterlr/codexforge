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
foreach ($scanRoot in @("src\lib\codexforge\provider-gateway-contract-boundary", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "ProviderGatewayContractBoundaryRoutePanel" "main route panel"
Assert-Contains $source "ProviderGatewayContractBoundaryCockpitSummaryPanel" "cockpit provider gateway contract summary panel"
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
  "Provider Gateway Contract"
  "Provider Gateway Contract Boundary"
  "Provider Selection Policy"
  "Model Routing Policy"
  "Prompt Review Packet"
  "Credential Vault Boundary"
  "Generation Request Schema"
  "Generation Response Schema"
  "Provider Safety Review"
  "Provider Rate Limit Policy"
  "Provider Quota Policy"
  "Provider Audit Event"
  "Provider Failure Retry Boundary"
  "Frontend Provider Call Blocked"
  "Review-only provider gateway contract"
  "Synthetic data only"
  "No provider calls from the cockpit"
  "No model calls from the cockpit"
  "No connector calls from the cockpit"
  "No prompt sending from the cockpit"
  "No credential storage from the cockpit"
  "No API key storage from the cockpit"
  "No generation from the cockpit"
  "No image generation from the cockpit"
  "No video generation from the cockpit"
  "No voice generation from the cockpit"
  "No script generation from the cockpit"
  "No caption generation from the cockpit"
  "No backend implementation from the cockpit"
  "No API creation from the cockpit"
  "No service deployment from the cockpit"
  "No command execution from the cockpit"
  "No worker dispatch from the cockpit"
  "No render queue creation from the cockpit"
  "No artifact creation from the cockpit"
  "No frontend persistence"
  "Backend-owned provider gateway remains required"
  "Backend-owned credential vault remains required"
  "Backend-owned prompt review remains required"
  "Backend-owned safety review remains required"
  "Backend-owned audit trail remains required"
  "Backend-owned approval capture remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "providerGatewayContractId"
  "providerGatewayContractKind"
  "providerSelectionPolicy"
  "modelRoutingPolicy"
  "promptReviewPacket"
  "credentialVaultBoundary"
  "generationRequestSchema"
  "generationResponseSchema"
  "providerSafetyReview"
  "providerRateLimitPolicy"
  "providerQuotaPolicy"
  "providerAuditEvent"
  "providerFailureRetryBoundary"
  "frontendProviderCallBlocked"
  "deniedProviderGatewayContractBoundaries"
  "cockpitSummary"
  "explicitSafetyLimits"
)) {
  Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker)
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
$unsafeApiNames = @(
  ("run" + "Command"),
  ("append" + "Event"),
  ("write" + "File"),
  ("save" + "BrainGraph"),
  ("render" + "Video"),
  ("export" + "Video"),
  ("upload" + "Asset"),
  ("download" + "Asset"),
  ("publish" + "Post"),
  ("schedule" + "Post"),
  ("call" + "Provider"),
  ("call" + "Model"),
  ("send" + "Prompt"),
  ("dispatch" + "Worker"),
  ("create" + "Artifact"),
  ("persist" + "Asset"),
  ("persist" + "Prompt"),
  ("persist" + "Job"),
  ("persist" + "Rights"),
  ("store" + "Media"),
  ("create" + "RenderQueue"),
  ("start" + "Render"),
  ("retry" + "Render"),
  ("persist" + "Artifact"),
  ("create" + "Export"),
  ("download" + "File"),
  ("publish" + "Video"),
  ("schedule" + "Video"),
  ("generate" + "Video"),
  ("generate" + "Image"),
  ("generate" + "Voice"),
  ("create" + "Api"),
  ("start" + "Service"),
  ("deploy" + "Runtime"),
  ("store" + "Credential"),
  ("store" + "ApiKey"),
  ("dispatch" + "Request"),
  ("persist" + "Response")
)
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"

Write-Host ("[OK] " + $SmokeName + " static provider gateway contract smoke passed.")

