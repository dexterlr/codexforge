param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string]$Contract,
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
foreach ($scanRoot in @("src\lib\codexforge\asset-storage-contract-boundary", "src\lib\codexforge\audio-storage-contract-boundary", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

if ($Contract -eq "Asset") { Assert-Contains $source "AssetStorageContractBoundaryRoutePanel" "asset route panel"; Assert-Contains $source "AssetStorageContractBoundaryCockpitSummaryPanel" "cockpit asset storage contract summary panel" }
if ($Contract -eq "Audio") { Assert-Contains $source "AudioStorageContractBoundaryRoutePanel" "audio route panel"; Assert-Contains $source "AudioStorageContractBoundaryCockpitSummaryPanel" "cockpit audio storage contract summary panel" }
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
  "Asset Storage Contract"
  "Asset Storage Contract Boundary"
  "Asset Intake Schema"
  "Asset Metadata Schema"
  "Asset Rights Tagging Contract"
  "Asset Malware Scan Contract"
  "Asset Deduplication Contract"
  "Asset Access Policy"
  "Asset Versioning Contract"
  "Asset Retention Policy"
  "Asset Redaction Policy"
  "Asset Handoff Contract"
  "Asset Storage Audit Event"
  "Frontend Asset Persistence Blocked"
  "Review-only asset storage contract"
  "Synthetic data only"
  "No asset upload from the cockpit"
  "No asset download from the cockpit"
  "No media storage from the cockpit"
  "No object storage from the cockpit"
  "No artifact creation from the cockpit"
  "No artifact persistence from the cockpit"
  "No frontend asset persistence"
  "No frontend rights persistence"
  "No frontend file mutation"
  "No frontend persistence"
  "No provider calls from the cockpit"
  "No model calls from the cockpit"
  "No connector calls from the cockpit"
  "No command execution from the cockpit"
  "No API creation from the cockpit"
  "No service deployment from the cockpit"
  "Backend-owned asset storage remains required"
  "Backend-owned malware scanning remains required"
  "Backend-owned rights tagging remains required"
  "Backend-owned access policy remains required"
  "Backend-owned retention policy remains required"
  "Backend-owned audit trail remains required"
  "Backend-owned approval capture remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "Audio Storage Contract"
  "Audio Storage Contract Boundary"
  "Audio Intake Schema"
  "Audio Metadata Schema"
  "Audio Consent Tagging Contract"
  "Audio Rights Tagging Contract"
  "Audio Transcript Link Contract"
  "Audio Caption Link Contract"
  "Audio Redaction Policy"
  "Audio Retention Policy"
  "Audio Access Policy"
  "Audio Handoff Contract"
  "Audio Storage Audit Event"
  "Frontend Audio Persistence Blocked"
  "Review-only audio storage contract"
  "Synthetic data only"
  "No audio upload from the cockpit"
  "No audio download from the cockpit"
  "No audio storage from the cockpit"
  "No voice generation from the cockpit"
  "No voice cloning from the cockpit"
  "No audio synthesis from the cockpit"
  "No transcription from the cockpit"
  "No caption persistence from the cockpit"
  "No transcript persistence from the cockpit"
  "No frontend audio persistence"
  "No frontend consent persistence"
  "No frontend rights persistence"
  "No frontend file mutation"
  "No frontend persistence"
  "No provider calls from the cockpit"
  "No model calls from the cockpit"
  "No connector calls from the cockpit"
  "No command execution from the cockpit"
  "No API creation from the cockpit"
  "No service deployment from the cockpit"
  "Backend-owned audio storage remains required"
  "Backend-owned consent review remains required"
  "Backend-owned rights tagging remains required"
  "Backend-owned transcript workflow remains required"
  "Backend-owned caption workflow remains required"
  "Backend-owned access policy remains required"
  "Backend-owned retention policy remains required"
  "Backend-owned audit trail remains required"
  "Backend-owned approval capture remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "assetStorageContractId"
  "assetStorageContractKind"
  "assetIntakeSchema"
  "assetMetadataSchema"
  "assetRightsTaggingContract"
  "assetMalwareScanContract"
  "assetDeduplicationContract"
  "assetAccessPolicy"
  "assetVersioningContract"
  "assetRetentionPolicy"
  "assetRedactionPolicy"
  "assetHandoffContract"
  "assetStorageAuditEvent"
  "frontendAssetPersistenceBlocked"
  "deniedAssetStorageContractBoundaries"
  "cockpitSummary"
  "explicitSafetyLimits"
  "audioStorageContractId"
  "audioStorageContractKind"
  "audioIntakeSchema"
  "audioMetadataSchema"
  "audioConsentTaggingContract"
  "audioRightsTaggingContract"
  "audioTranscriptLinkContract"
  "audioCaptionLinkContract"
  "audioRedactionPolicy"
  "audioRetentionPolicy"
  "audioAccessPolicy"
  "audioHandoffContract"
  "audioStorageAuditEvent"
  "frontendAudioPersistenceBlocked"
  "deniedAudioStorageContractBoundaries"
  "cockpitSummary"
  "explicitSafetyLimits"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }
Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
$unsafeApiNames = @(("run"+"Command"),("append"+"Event"),("write"+"File"),("save"+"BrainGraph"),("render"+"Video"),("export"+"Video"),("upload"+"Asset"),("download"+"Asset"),("publish"+"Post"),("schedule"+"Post"),("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("dispatch"+"Worker"),("create"+"Artifact"),("persist"+"Asset"),("persist"+"Prompt"),("persist"+"Job"),("persist"+"Rights"),("store"+"Media"),("create"+"RenderQueue"),("start"+"Render"),("retry"+"Render"),("persist"+"Artifact"),("create"+"Export"),("download"+"File"),("publish"+"Video"),("schedule"+"Video"),("generate"+"Video"),("generate"+"Image"),("generate"+"Voice"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("store"+"Credential"),("store"+"ApiKey"),("dispatch"+"Request"),("persist"+"Response"),("upload"+"Audio"),("download"+"Audio"),("persist"+"Audio"),("persist"+"Transcript"),("persist"+"Caption"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"
Write-Host ("[OK] " + $SmokeName + " static asset/audio storage contract smoke passed.")
