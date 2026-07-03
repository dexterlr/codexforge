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

function Join-RepoPath {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Segments)
  $safeSegments = @()
  foreach ($segment in $Segments) {
    if ([string]::IsNullOrWhiteSpace($segment)) { continue }
    $normalizedSegment = $segment.Trim().Replace("\", "/")
    foreach ($part in ($normalizedSegment -split "/+")) {
      if ([string]::IsNullOrWhiteSpace($part) -or $part -eq ".") { continue }
      if ($part -eq "..") { throw ("[FAIL] Unsafe path segment: " + $segment) }
      $safeSegments += $part
    }
  }
  if ($safeSegments.Count -eq 0) { throw "[FAIL] No path segments supplied" }
  $path = $safeSegments[0]
  for ($index = 1; $index -lt $safeSegments.Count; $index++) {
    $path = Join-Path $path $safeSegments[$index]
  }
  return $path
}

function Normalize-SmokeScriptFile {
  param([string]$Value)
  $scriptFileName = Split-Path -Leaf $Value.Trim().Replace("/", "\")
  if ([string]::IsNullOrWhiteSpace($scriptFileName)) { throw "[FAIL] Missing smoke script file name" }
  if ($scriptFileName -notlike "smoke-codexforge-*.ps1") { throw ("[FAIL] Unexpected smoke script file name: " + $scriptFileName) }
  return $scriptFileName
}

function Normalize-RouteSlug {
  param([string]$Value, [string]$FallbackHref)
  $candidate = $Value
  if ([string]::IsNullOrWhiteSpace($candidate)) { $candidate = $FallbackHref }
  $candidate = $candidate.Trim().Replace("\", "/").Trim("/")
  if ($candidate.StartsWith("src/lib/codexforge/")) {
    $candidate = $candidate.Substring("src/lib/codexforge/".Length)
  }
  if ($candidate.StartsWith("src/app/")) {
    $candidate = $candidate.Substring("src/app/".Length)
  }
  return $candidate.Trim("/")
}

$domainSlug = Normalize-RouteSlug $Domain $RouteHref
$routeSlug = Normalize-RouteSlug $Route $RouteHref
$scriptFileName = Normalize-SmokeScriptFile $ScriptFile
$domainPath = Join-RepoPath "src" "lib" "codexforge" $domainSlug
$routePath = Join-RepoPath "src" "app" $routeSlug
$routePagePath = Join-RepoPath "src" "app" $routeSlug "page.tsx"
$routeClientPath = Join-RepoPath "src" "app" $routeSlug "page-client.tsx"
$scriptPath = Join-RepoPath "scripts" $scriptFileName
$sharedBoundaryPath = Join-RepoPath "src" "lib" "codexforge" "first-backend-wiring-boundary-map"
$navigationRegistryPath = Join-RepoPath "src" "lib" "codexforge" "navigation-shell" "navigation-route-registry.ts"
$navigationTypesPath = Join-RepoPath "src" "lib" "codexforge" "navigation-shell" "navigation-shell-types.ts"
$commandRegistryPath = Join-RepoPath "src" "lib" "codexforge" "command-palette" "command-registry.ts"
$allSmokePath = Join-RepoPath "scripts" "smoke-codexforge-all.ps1"

foreach ($path in @($domainPath, $routePath, $routePagePath, $routeClientPath, $scriptPath, $sharedBoundaryPath)) {
  if (-not (Test-Path $path)) { throw ("[FAIL] Missing path: " + $path) }
  Write-Host ("[PASS] path exists " + $path)
}

$sourceParts = @()
foreach ($scanRoot in @($sharedBoundaryPath, $domainPath, $routePath, $scriptPath)) {
  if (Test-Path $scanRoot -PathType Leaf) {
    $sourceParts += Get-Content -Raw $scanRoot
  } else {
    $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
  }
}
$source = $sourceParts -join [Environment]::NewLine
$navigationRegistry = Get-Content -Raw $navigationRegistryPath
$navigationTypes = Get-Content -Raw $navigationTypesPath
$commandRegistry = Get-Content -Raw $commandRegistryPath
$allSmoke = Get-Content -Raw $allSmokePath

Assert-Contains $source "BackendWiringBoundaryRoutePanel" "shared route panel"
Assert-Contains $source "BackendWiringReadinessCockpitSection" "cockpit readiness section"
Assert-Contains $source "First Backend Wiring Boundary" "batch marker"
Assert-Contains $source "Review-only backend wiring boundary" "review-only marker"
Assert-Contains $source "Synthetic data only" "synthetic data marker"
Assert-Contains $source "No live backend execution" "backend execution denial"
Assert-Contains $source "No frontend persistence" "frontend persistence denial"
Assert-Contains $source "No browser storage writes" "browser storage denial"
Assert-Contains $source "No provider calls" "provider denial"
Assert-Contains $source "No model calls" "model denial"
Assert-Contains $source "No connector calls" "connector denial"
Assert-Contains $source "No prompt sending" "prompt denial"
Assert-Contains $source "No upload" "upload denial"
Assert-Contains $source "No download" "download denial"
Assert-Contains $source "No render" "render denial"
Assert-Contains $source "No export" "export denial"
Assert-Contains $source "No publish" "publish denial"
Assert-Contains $source "No schedule" "schedule denial"
Assert-Contains $source "No queue dispatch" "queue dispatch denial"
Assert-Contains $source "No worker dispatch" "worker dispatch denial"
Assert-Contains $source "No database writes" "database write denial"
Assert-Contains $source "No credential storage" "credential storage denial"
Assert-Contains $source "No token storage" "token storage denial"
Assert-Contains $source "No command execution" "command execution denial"
Assert-Contains $source "No service creation" "service creation denial"
Assert-Contains $source "No API creation from frontend" "api creation denial"
Assert-Contains $source "Backend-owned services remain required" "backend ownership marker"
Assert-Contains $source "Explicit operator approval required" "operator approval marker"
Assert-Contains $source "Audit trail required" "audit marker"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $source "disabled" "disabled button source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationRegistry ('commandDeckRole: "workspace"') "workspace command deck role"
Assert-Contains $navigationRegistry 'group: "Creative"' "valid navigation group"
Assert-Contains $navigationRegistry 'safetyPosture: "review-gated"' "valid safety posture"
Assert-Contains $navigationTypes ('| "' + $RouteHref.TrimStart("/") + '"') "route id type coverage"
Assert-Contains $navigationTypes ('| "' + $RouteHref + '"') "route href type coverage"
Assert-NotMatches $navigationTypes 'CodexForgeCommandDeckRole\s*=\s*string' "command deck role loosened to string"
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
  "Backend Wiring Boundary Map",
  "Server Only Module Boundary",
  "Frontend To Backend Request Boundary",
  "Environment Config Boundary",
  "Provider Gateway Wiring Boundary",
  "Asset Storage Wiring Boundary",
  "Audio Storage Wiring Boundary",
  "Render Queue Wiring Boundary",
  "Worker Orchestration Wiring Boundary",
  "Artifact Export Wiring Boundary",
  "Publish Gateway Wiring Boundary",
  "Approval Capture Wiring Boundary",
  "Rights Consent Audit Wiring Boundary",
  "Command Action Adapter Boundary",
  "Cockpit Backend Readiness Rail",
  "Disabled Backend Adapter Layer",
  "Endpoint Inventory Preview",
  "Contract To Service Mapping",
  "Backend Error Envelope",
  "Backend Audit Envelope",
  "Backend Permission Envelope",
  "Backend Idempotency Boundary",
  "Backend Rate Limit Boundary",
  "Backend Secret Handling Boundary",
  "Backend Observability Boundary",
  "First Provider Wiring Readiness Preview",
  "Controlled Backend Wiring Boundary Release Candidate",
  "Controlled First Backend Wiring Boundary Completion Candidate"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }

Assert-NotMatches $source 'onClick=' "interactive backend button handlers"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|document\.cookie' "network or browser storage APIs"
Assert-NotMatches $source 'Math.random|Date.now|crypto.randomUUID' "nondeterministic key or data generators"
$unsafeApiNames = @(("run"+"Command"),("write"+"File"),("save"+"BrainGraph"),("render"+"Video"),("export"+"Video"),("upload"+"Asset"),("download"+"Asset"),("publish"+"Post"),("schedule"+"Post"),("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("dispatch"+"Worker"),("create"+"Artifact"),("persist"+"Asset"),("persist"+"Prompt"),("persist"+"Job"),("persist"+"Rights"),("store"+"Media"),("create"+"RenderQueue"),("start"+"Render"),("retry"+"Render"),("persist"+"Artifact"),("create"+"Export"),("publish"+"Video"),("schedule"+"Video"),("generate"+"Video"),("generate"+"Image"),("generate"+"Voice"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("store"+"Credential"),("store"+"ApiKey"),("dispatch"+"Request"),("persist"+"Response"),("upload"+"Audio"),("download"+"Audio"),("persist"+"Audio"),("persist"+"Transcript"),("persist"+"Caption"),("spawn"+"Process"),("bind"+"Port"),("run"+"Shell"),("authorize"+"Account"),("store"+"Token"),("call"+"SocialApi"),("capture"+"Signature"),("verify"+"Identity"),("grant"+"License"),("approve"+"Consent"),("clear"+"Rights"),("persist"+"Consent"),("persist"+"Approval"),("persist"+"Audit"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"
Write-Host ("[OK] " + $SmokeName + " static backend wiring boundary smoke passed.")
