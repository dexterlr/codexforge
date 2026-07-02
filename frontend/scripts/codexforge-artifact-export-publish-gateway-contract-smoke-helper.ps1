param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string]$ContractFamily,
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
foreach ($scanRoot in @("src\lib\codexforge\artifact-export-contract-boundary", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join [Environment]::NewLine
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "ArtifactExportPublishGatewayContractRoutePanel" "shared route panel"
if ($ContractFamily -eq "ArtifactExport") { Assert-Contains $source "ArtifactExportContractBoundaryCockpitSummaryPanel" "artifact export cockpit summary panel" }
if ($ContractFamily -eq "PublishGateway") { Assert-Contains $source "PublishGatewayContractBoundaryCockpitSummaryPanel" "publish gateway cockpit summary panel" }
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
foreach ($marker in $Markers) { Assert-Contains $source $marker ("marker " + $marker) }
foreach ($safetyMarker in @(
  "Artifact Export Contract",
  "Artifact Export Contract Boundary",
  "Artifact Schema",
  "Artifact Checksum Contract",
  "Artifact Retention Policy",
  "Artifact Access Policy",
  "Export Request Schema",
  "Export Readiness Gate",
  "Export Format Policy",
  "Export Audit Event",
  "Download Blocked Boundary",
  "Export Failure Ledger",
  "Artifact Handoff Contract",
  "Frontend Export Blocked",
  "Review-only artifact export contract",
  "Synthetic data only",
  "No artifact creation from the cockpit",
  "No artifact persistence from the cockpit",
  "No export from the cockpit",
  "No download from the cockpit",
  "No upload from the cockpit",
  "No file generation from the cockpit",
  "No file write from the cockpit",
  "No browser storage write from the cockpit",
  "No video rendering from the cockpit",
  "No worker dispatch from the cockpit",
  "No frontend export persistence",
  "No frontend artifact persistence",
  "No frontend download path",
  "No frontend file mutation",
  "No frontend persistence",
  "Backend-owned artifact storage remains required",
  "Backend-owned export service remains required",
  "Backend-owned checksum capture remains required",
  "Backend-owned access policy remains required",
  "Backend-owned retention policy remains required",
  "Backend-owned audit trail remains required",
  "Backend-owned approval capture remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
  "Publish Gateway Contract",
  "Publish Gateway Contract Boundary",
  "Social Account Authorization",
  "Publish Request Schema",
  "Schedule Policy",
  "Platform Policy",
  "Media Upload Blocked",
  "Publish Approval Gate",
  "Publish Audit Event",
  "Publish Failure Ledger",
  "Schedule Hold",
  "Takedown Revocation Policy",
  "Publish Telemetry",
  "Frontend Publish Blocked",
  "Review-only publish gateway contract",
  "Synthetic data only",
  "No publishing from the cockpit",
  "No social posting from the cockpit",
  "No scheduling from the cockpit",
  "No social API calls from the cockpit",
  "No media upload from the cockpit",
  "No publish state persistence from the cockpit",
  "No schedule persistence from the cockpit",
  "No account authorization from the cockpit",
  "No token storage from the cockpit",
  "No provider calls from the cockpit",
  "No model calls from the cockpit",
  "No connector calls from the cockpit",
  "No frontend publish persistence",
  "No frontend schedule persistence",
  "No frontend credential storage",
  "No frontend file mutation",
  "No frontend persistence",
  "Backend-owned publish gateway remains required",
  "Backend-owned account authorization remains required",
  "Backend-owned scheduling gateway remains required",
  "Backend-owned approval capture remains required",
  "Backend-owned rights review remains required",
  "Backend-owned audit trail remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
  "artifactExportContractId",
  "artifactExportContractKind",
  "artifactSchema",
  "artifactChecksumContract",
  "artifactRetentionPolicy",
  "artifactAccessPolicy",
  "exportRequestSchema",
  "exportReadinessGate",
  "exportFormatPolicy",
  "exportAuditEvent",
  "downloadBlockedBoundary",
  "exportFailureLedger",
  "artifactHandoffContract",
  "frontendExportBlocked",
  "deniedArtifactExportContractBoundaries",
  "publishGatewayContractId",
  "publishGatewayContractKind",
  "socialAccountAuthorization",
  "publishRequestSchema",
  "schedulePolicy",
  "platformPolicy",
  "mediaUploadBlocked",
  "publishApprovalGate",
  "publishAuditEvent",
  "publishFailureLedger",
  "scheduleHold",
  "takedownRevocationPolicy",
  "publishTelemetry",
  "frontendPublishBlocked",
  "deniedPublishGatewayContractBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }
Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
$unsafeApiNames = @(("run"+"Command"),("append"+"Event"),("write"+"File"),("save"+"BrainGraph"),("render"+"Video"),("export"+"Video"),("upload"+"Asset"),("download"+"Asset"),("publish"+"Post"),("schedule"+"Post"),("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("dispatch"+"Worker"),("create"+"Artifact"),("persist"+"Asset"),("persist"+"Prompt"),("persist"+"Job"),("persist"+"Rights"),("store"+"Media"),("create"+"RenderQueue"),("start"+"Render"),("retry"+"Render"),("persist"+"Artifact"),("create"+"Export"),("download"+"File"),("publish"+"Video"),("schedule"+"Video"),("generate"+"Video"),("generate"+"Image"),("generate"+"Voice"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("store"+"Credential"),("store"+"ApiKey"),("dispatch"+"Request"),("persist"+"Response"),("upload"+"Audio"),("download"+"Audio"),("persist"+"Audio"),("persist"+"Transcript"),("persist"+"Caption"),("spawn"+"Process"),("bind"+"Port"),("run"+"Shell"),("authorize"+"Account"),("store"+"Token"),("call"+"SocialApi"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"
Write-Host ("[OK] " + $SmokeName + " static artifact export / publish gateway contract smoke passed.")
