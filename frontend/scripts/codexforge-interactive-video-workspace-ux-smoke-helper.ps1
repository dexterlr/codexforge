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
foreach ($scanRoot in @("src\lib\codexforge\interactive-video-workspace-shell", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join [Environment]::NewLine
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "InteractiveVideoWorkspaceRoutePanel" "shared route panel"
Assert-Contains $source "InteractiveVideoWorkspaceCockpitPanel" "cockpit panel"
Assert-Contains $source "Local React state only" "local state marker"
Assert-Contains $source "Synthetic data only" "synthetic data marker"
Assert-Contains $source "Backend wiring required" "backend wiring marker"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationTypes ('| "' + $RouteHref.TrimStart('/') + '"') "route id type coverage"
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
  "Interactive Video Workspace",
  "Project Brief Editor Mock",
  "Audience Outcome Selector Mock",
  "Script Outline Editor Mock",
  "Scene Storyboard Builder Mock",
  "Shot List Planner Mock",
  "Asset Checklist Panel Mock",
  "Audio Voiceover Planner Mock",
  "Caption Accessibility Planner Mock",
  "Brand Style Guard Panel Mock",
  "Rights Consent Checklist Mock",
  "Approval Gate Checklist Mock",
  "Render Readiness Panel Mock",
  "Export Readiness Panel Mock",
  "Publish Readiness Panel Mock",
  "Fake Video Job Timeline Mock",
  "Blocked Backend Action Centre",
  "First Backend Wiring Readiness Preview",
  "Controlled Interactive Video Workspace Completion Candidate",
  "No backend execution",
  "No frontend persistence",
  "No browser storage writes",
  "No provider calls",
  "No model calls",
  "No connector calls",
  "No prompt sending",
  "No upload",
  "No download",
  "No render",
  "No export",
  "No publish",
  "No schedule",
  "No command execution",
  "No service creation",
  "No API creation",
  "Operator review required",
  "Explicit operator approval required"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }
Assert-NotMatches $source 'key={(item|label|constraint|badge|entry|step|route|profile|record|section)}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math.random|Date.now|crypto.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|document\.cookie' "network or browser storage APIs"
$unsafeApiNames = @(("run"+"Command"),("append"+"Event"),("write"+"File"),("save"+"BrainGraph"),("render"+"Video"),("export"+"Video"),("upload"+"Asset"),("download"+"Asset"),("publish"+"Post"),("schedule"+"Post"),("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("dispatch"+"Worker"),("create"+"Artifact"),("persist"+"Asset"),("persist"+"Prompt"),("persist"+"Job"),("persist"+"Rights"),("store"+"Media"),("create"+"RenderQueue"),("start"+"Render"),("retry"+"Render"),("persist"+"Artifact"),("create"+"Export"),("download"+"File"),("publish"+"Video"),("schedule"+"Video"),("generate"+"Video"),("generate"+"Image"),("generate"+"Voice"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("store"+"Credential"),("store"+"ApiKey"),("dispatch"+"Request"),("persist"+"Response"),("upload"+"Audio"),("download"+"Audio"),("persist"+"Audio"),("persist"+"Transcript"),("persist"+"Caption"),("spawn"+"Process"),("bind"+"Port"),("run"+"Shell"),("authorize"+"Account"),("store"+"Token"),("call"+"SocialApi"),("capture"+"Signature"),("verify"+"Identity"),("grant"+"License"),("approve"+"Consent"),("clear"+"Rights"),("persist"+"Consent"),("persist"+"Approval"),("persist"+"Audit"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"
Write-Host ("[OK] " + $SmokeName + " static interactive video workspace UX smoke passed.")
