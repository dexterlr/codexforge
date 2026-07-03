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
$sharedBoundaryPath = Join-RepoPath "src" "lib" "codexforge" "provider-gateway-wiring-map"
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

Assert-Contains $source "ProviderGatewayWiringRoutePanel" "shared route panel"
Assert-Contains $source "ProviderGatewayReadinessCockpitSection" "cockpit readiness section"
Assert-Contains $source "Provider Gateway Wiring" "batch marker"
Assert-Contains $source "Review-only provider gateway wiring" "review-only marker"
Assert-Contains $source "Synthetic provider data only" "synthetic provider marker"
Assert-Contains $source "No live provider execution" "provider execution denial"
Assert-Contains $source "No provider calls" "provider call denial"
Assert-Contains $source "No model calls" "model call denial"
Assert-Contains $source "No prompt sending" "prompt denial"
Assert-Contains $source "No credential storage" "credential storage denial"
Assert-Contains $source "No token storage" "token storage denial"
Assert-Contains $source "No streaming" "streaming denial"
Assert-Contains $source "No frontend persistence" "frontend persistence denial"
Assert-Contains $source "No browser storage writes" "browser storage denial"
Assert-Contains $source "No connector calls" "connector denial"
Assert-Contains $source "No upload" "upload denial"
Assert-Contains $source "No download" "download denial"
Assert-Contains $source "No render" "render denial"
Assert-Contains $source "No export" "export denial"
Assert-Contains $source "No publish" "publish denial"
Assert-Contains $source "No schedule" "schedule denial"
Assert-Contains $source "No queue dispatch" "queue dispatch denial"
Assert-Contains $source "No worker dispatch" "worker dispatch denial"
Assert-Contains $source "No database writes" "database write denial"
Assert-Contains $source "No command execution" "command execution denial"
Assert-Contains $source "No service creation" "service creation denial"
Assert-Contains $source "No API creation from frontend" "api creation denial"
Assert-Contains $source "Backend-owned provider gateway remains required" "provider gateway ownership marker"
Assert-Contains $source "Explicit operator approval required" "operator approval marker"
Assert-Contains $source "Audit trail required" "audit marker"
Assert-Contains $source "Disabled Provider Adapter Registry" "disabled adapter registry marker"
Assert-Contains $source "Provider Request Envelope" "request envelope marker"
Assert-Contains $source "Provider Response Envelope" "response envelope marker"
Assert-Contains $source "Provider Approval Gate" "approval gate marker"
Assert-Contains $source "Provider Audit Envelope" "audit envelope marker"
Assert-Contains $source "Provider Gateway Credential Boundary" "credential boundary marker"
Assert-Contains $source "Provider Gateway Token Boundary" "token boundary marker"
Assert-Contains $source "Provider Gateway Streaming Boundary" "streaming boundary marker"
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
  "Provider Gateway Wiring Map",
  "Provider Request Envelope",
  "Provider Response Envelope",
  "Provider Capability Catalog",
  "Provider Model Family Catalog",
  "Provider Selection Policy",
  "Provider Privacy Class Boundary",
  "Provider Cost Class Boundary",
  "Provider Rate Limit Boundary",
  "Provider Error Taxonomy",
  "Provider Audit Envelope",
  "Provider Approval Gate",
  "Disabled Provider Adapter Registry",
  "Provider Gateway Cockpit Readiness Rail",
  "Provider Gateway Prompt Boundary",
  "Provider Gateway Credential Boundary",
  "Provider Gateway Token Boundary",
  "Provider Gateway Streaming Boundary",
  "Provider Gateway Retry Boundary",
  "Provider Gateway Timeout Boundary",
  "Provider Gateway Fallback Boundary",
  "Provider Gateway Observability Boundary",
  "First Provider Gateway Wiring Candidate",
  "Provider Gateway Backend Readiness Preview",
  "Provider Gateway Adapter Implementation Readiness",
  "Provider Gateway Execution Still Blocked Guard",
  "Controlled Provider Gateway Wiring Release Candidate",
  "Controlled Provider Gateway Wiring Completion Candidate"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }

$networkOrStoragePattern = @(
  ("fetch" + "("),
  "XMLHttpRequest",
  "EventSource",
  "WebSocket",
  ("local" + "Storage"),
  ("session" + "Storage"),
  ("document" + "." + "cookie")
) | ForEach-Object { [regex]::Escape($_) }
Assert-NotMatches $source ($networkOrStoragePattern -join "|") "network or browser storage APIs"
$nondeterministicPattern = @(
  ("Math" + "." + "random"),
  ("Date" + "." + "now"),
  ("crypto" + "." + "randomUUID")
) | ForEach-Object { [regex]::Escape($_) }
Assert-NotMatches $source ($nondeterministicPattern -join "|") "nondeterministic key or data generators"
$unsafeApiNames = @(("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("stream"+"Response"),("store"+"Credential"),("store"+"Token"),("create"+"Client"),("create"+"ProviderClient"),("run"+"Provider"),("execute"+"Provider"),("dispatch"+"Provider"),("persist"+"Prompt"),("persist"+"Response"),("upload"+"Asset"),("download"+"Asset"),("render"+"Video"),("export"+"Video"),("publish"+"Post"),("schedule"+"Post"),("dispatch"+"Worker"),("spawn"+"Process"),("run"+"Command"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase provider gateway API names"
Write-Host ("[OK] " + $SmokeName + " static provider gateway wiring smoke passed.")
