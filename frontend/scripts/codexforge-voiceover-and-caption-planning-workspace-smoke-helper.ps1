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
foreach ($scanRoot in @("src\lib\codexforge\voiceover-and-caption-planning-workspace", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "VoiceoverAndCaptionPlanningWorkspaceRoutePanel" "main route panel"
Assert-Contains $source "VoiceoverAndCaptionPlanningWorkspaceCockpitSummaryPanel" "cockpit voiceover and caption planning summary panel"
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
  "Voiceover And Caption Planning Workspace"
  "Voiceover And Caption Planning Workspace Boundary"
  "Narration Brief"
  "Voice Tone And Pace"
  "Voice Consent And Rights"
  "Audio Cue Planning"
  "Caption Style Guide"
  "Subtitle Timing Plan"
  "Lower Third And Supers Plan"
  "Accessibility Caption Note"
  "Transcript Review Lane"
  "Audio Caption Blocker Map"
  "Voice Generation Blocked Boundary"
  "Caption Export Blocked Boundary"
  "Review-only voiceover and caption planning workspace"
  "Synthetic data only"
  "No voice generation from the cockpit"
  "No voice cloning from the cockpit"
  "No audio synthesis from the cockpit"
  "No transcription from the cockpit"
  "No caption export from the cockpit"
  "No subtitle file generation from the cockpit"
  "No audio upload from the cockpit"
  "No audio download from the cockpit"
  "No video rendering from the cockpit"
  "No video export from the cockpit"
  "No file generation from the cockpit"
  "No frontend file mutation"
  "No frontend voice persistence"
  "No frontend caption persistence"
  "No frontend transcript persistence"
  "No frontend audio persistence"
  "No frontend asset persistence"
  "No frontend rights persistence"
  "No frontend approval persistence"
  "No frontend prompt persistence"
  "No frontend job persistence"
  "No provider calls from the cockpit"
  "No model calls from the cockpit"
  "No connector calls from the cockpit"
  "No image generation calls from the cockpit"
  "No video generation calls from the cockpit"
  "No voice generation calls from the cockpit"
  "No publishing from the cockpit"
  "No social posting from the cockpit"
  "No scheduling from the cockpit"
  "No copyright clearance from the cockpit"
  "No consent clearance from the cockpit"
  "No automated brand approval from the cockpit"
  "No performance guarantees"
  "Backend-owned asset storage remains required"
  "Backend-owned audio storage remains required"
  "Backend-owned render service remains required"
  "Backend-owned export service remains required"
  "Backend-owned provider gateway remains required"
  "Backend-owned rights review remains required"
  "Backend-owned consent review remains required"
  "Backend-owned approval capture remains required"
  "Backend-owned script persistence remains required"
  "Backend-owned storyboard persistence remains required"
  "Backend-owned caption persistence remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "voiceoverAndCaptionPlanningWorkspaceId"
  "voiceoverAndCaptionPlanningWorkspaceKind"
  "narrationBrief"
  "voiceToneAndPace"
  "voiceConsentAndRights"
  "audioCuePlanning"
  "captionStyleGuide"
  "subtitleTimingPlan"
  "lowerThirdAndSupersPlan"
  "accessibilityCaptionNote"
  "transcriptReviewLane"
  "audioCaptionBlockerMap"
  "voiceGenerationBlockedBoundary"
  "captionExportBlockedBoundary"
  "deniedVoiceoverAndCaptionPlanningWorkspaceBoundaries"
  "cockpitSummary"
  "explicitSafetyLimits"
)) {
  Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker)
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
$unsafeApiNames = @(
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
  ("generate" + "Image"),
  ("generate" + "Video"),
  ("generate" + "Voice"),
  ("clone" + "Voice"),
  ("synthesize" + "Audio"),
  ("transcribe" + "Audio"),
  ("export" + "Captions"),
  ("write" + "SubtitleFile"),
  ("run" + "Command"),
  ("append" + "Event"),
  ("write" + "File"),
  ("save" + "BrainGraph")
)
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"

Write-Host ("[OK] " + $SmokeName + " static voiceover and caption planning workspace smoke passed.")

