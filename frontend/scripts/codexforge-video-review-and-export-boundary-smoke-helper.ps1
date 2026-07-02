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
foreach ($scanRoot in @("src\lib\codexforge\video-review-and-export-boundary", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "VideoReviewAndExportBoundaryRoutePanel" "main route panel"
Assert-Contains $source "VideoReviewAndExportBoundaryCockpitSummaryPanel" "cockpit video review and export summary panel"
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
  "Video Review And Export Boundary"
  "Video Review Packet Preview"
  "Review Decision Checklist Preview"
  "Rights Clearance Review Preview"
  "Brand Approval Review Preview"
  "Caption And Audio Review Preview"
  "Export Readiness Summary Preview"
  "Export Settings Review Preview"
  "Export Artifact Blocked Preview"
  "Download Blocked Preview"
  "Publish Blocked Preview"
  "Schedule Blocked Preview"
  "Revision Request Preview"
  "Review-only video review and export boundary"
  "Synthetic data only"
  "No export from the cockpit"
  "No download from the cockpit"
  "No upload from the cockpit"
  "No publishing from the cockpit"
  "No scheduling from the cockpit"
  "No rendering from the cockpit"
  "No render queue creation from the cockpit"
  "No worker dispatch from the cockpit"
  "No artifact creation from the cockpit"
  "No artifact persistence from the cockpit"
  "No frontend export persistence"
  "No frontend revision persistence"
  "No frontend approval persistence"
  "No frontend artifact persistence"
  "No frontend caption persistence"
  "No frontend transcript persistence"
  "No frontend audio persistence"
  "No frontend asset persistence"
  "No frontend rights persistence"
  "No frontend prompt persistence"
  "No frontend job persistence"
  "No provider calls from the cockpit"
  "No model calls from the cockpit"
  "No connector calls from the cockpit"
  "No prompt sending from the cockpit"
  "Backend-owned export workflow remains required"
  "Backend-owned render workflow remains required"
  "Backend-owned artifact workflow remains required"
  "Backend-owned publish workflow remains required"
  "Backend-owned approval workflow remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "videoReviewAndExportBoundaryId"
  "videoReviewAndExportBoundaryKind"
  "videoReviewAndExportBoundary"
  "videoReviewPacketPreview"
  "reviewDecisionChecklistPreview"
  "rightsClearanceReviewPreview"
  "brandApprovalReviewPreview"
  "captionAndAudioReviewPreview"
  "exportReadinessSummaryPreview"
  "exportSettingsReviewPreview"
  "exportArtifactBlockedPreview"
  "downloadBlockedPreview"
  "publishBlockedPreview"
  "scheduleBlockedPreview"
  "revisionRequestPreview"
  "deniedVideoReviewAndExportBoundaries"
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
  ("persist" + "Revision"),
  ("store" + "Media"),
  ("create" + "RenderQueue"),
  ("start" + "Render"),
  ("retry" + "Render"),
  ("persist" + "Artifact")
)
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"

Write-Host ("[OK] " + $SmokeName + " static video review and export boundary smoke passed.")
