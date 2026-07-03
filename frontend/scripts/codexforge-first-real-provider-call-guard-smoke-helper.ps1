param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][int]$Phase,
  [Parameter(Mandatory = $true)][string]$Title,
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
$expectedScriptFileName = "smoke-codexforge-$routeSlug.ps1"
if ($scriptFileName -ne $expectedScriptFileName) { throw ("[FAIL] Smoke script mismatch for Phase " + $Phase + ": " + $scriptFileName + " expected " + $expectedScriptFileName) }
if ($RouteHref -ne ("/" + $routeSlug)) { throw ("[FAIL] Route href mismatch for Phase " + $Phase + ": " + $RouteHref) }

$domainPath = Join-RepoPath "src" "lib" "codexforge" $domainSlug
$routePath = Join-RepoPath "src" "app" $routeSlug
$routePagePath = Join-RepoPath "src" "app" $routeSlug "page.tsx"
$routeClientPath = Join-RepoPath "src" "app" $routeSlug "page-client.tsx"
$scriptPath = Join-RepoPath "scripts" $scriptFileName
$sharedBoundaryPath = Join-RepoPath "src" "lib" "codexforge" "first-real-provider-call-guard-map"
$navigationRegistryPath = Join-RepoPath "src" "lib" "codexforge" "navigation-shell" "navigation-route-registry.ts"
$navigationTypesPath = Join-RepoPath "src" "lib" "codexforge" "navigation-shell" "navigation-shell-types.ts"
$commandRegistryPath = Join-RepoPath "src" "lib" "codexforge" "command-palette" "command-registry.ts"
$allSmokePath = Join-RepoPath "scripts" "smoke-codexforge-all.ps1"

foreach ($path in @($domainPath, $routePath, $routePagePath, $routeClientPath, $scriptPath, $sharedBoundaryPath)) {
  if (-not (Test-Path $path)) { throw ("[FAIL] Missing path: " + $path) }
  if ($path -match "srclibcodexforge|srcapp|scriptsmoke") { throw ("[FAIL] Broken joined path: " + $path) }
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

foreach ($needle in @(
  "FirstRealProviderCallGuardPageClientShell",
  "FirstRealProviderCallGuardRoutePanel",
  "First Real Provider Call Guard",
  "First Real Provider Call Guard Map",
  "Real Provider Call Eligibility Checklist",
  "Real Provider Execution Lock",
  "Real Provider Backend Only Gate",
  "Real Provider Operator Approval Enforcement",
  "Real Provider Audit Enforcement",
  "Real Provider Credential Presence Guard",
  "Real Provider Token Redaction Guard",
  "Real Provider Prompt Transmission Guard",
  "Real Provider Response Capture Guard",
  "Real Provider SDK Import Guard",
  "Real Provider Network Egress Guard",
  "Real Provider Rate Limit Guard",
  "Real Provider Timeout Guard",
  "Real Provider Retry Fallback Guard",
  "Real Provider Cost Guard",
  "Real Provider Safety Guard",
  "Real Provider Privacy Guard",
  "Real Provider Observability Guard",
  "Real Provider Rollback Guard",
  "Disabled Real Provider Call Lane",
  "Real Provider Call Cockpit Readiness Rail",
  "Real Provider Call State",
  "Real Provider Call Recovery",
  "Real Provider Call Acceptance Criteria",
  "Real Provider Call Fixture Safety Guard",
  "Real Provider Call Prompt Transmission Blocker",
  "Real Provider Call Credential Token Blocker",
  "Real Provider Call Streaming Blocker",
  "First Real Provider Call Guard Completion Candidate",
  "Review-only first real provider call guard",
  "Synthetic real provider call guard data only",
  "No live provider execution",
  "No provider calls",
  "No model calls",
  "No prompt sending",
  "No credential storage",
  "No token storage",
  "No streaming",
  "No frontend persistence",
  "No browser storage writes",
  "No connector calls",
  "No upload",
  "No download",
  "No render",
  "No export",
  "No publish",
  "No schedule",
  "No queue dispatch",
  "No worker dispatch",
  "No database writes",
  "No command execution",
  "No service creation",
  "No API creation from frontend",
  "No route handlers for live provider execution",
  "No audit persistence",
  "No approval persistence",
  "No provider SDK imports",
  "No network egress",
  "Backend-owned provider adapter remains required",
  "Explicit operator approval required",
  "Audit trail required",
  "next batch: 2538-2569 - First Approved Provider Trial Mega Batch v1",
  $RouteHref,
  $CommandLabel,
  $Title,
  "disabled"
)) { Assert-Contains $source $needle ("source marker " + $needle) }

Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationRegistry ('commandDeckRole: "workspace"') "workspace command deck role"
Assert-Contains $navigationRegistry 'group: "Creative"' "valid navigation group"
Assert-Contains $navigationRegistry 'safetyPosture: "review-gated"' "valid safety posture"
Assert-Contains $navigationTypes ('| "' + $RouteHref.TrimStart("/") + '"') "route id type coverage"
Assert-Contains $navigationTypes ('| "' + $RouteHref + '"') "route href type coverage"
Assert-NotMatches $navigationTypes 'CodexForgeCommandDeckRoles*=s*string' "command deck role loosened to string"
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

$unsafeApiNames = @(("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("stream"+"Response"),("store"+"Credential"),("store"+"Token"),("create"+"Client"),("create"+"ProviderClient"),("run"+"Provider"),("execute"+"Provider"),("dispatch"+"Provider"),("persist"+"Prompt"),("persist"+"Response"),("upload"+"Asset"),("download"+"Asset"),("render"+"Video"),("export"+"Video"),("publish"+"Post"),("schedule"+"Post"),("dispatch"+"Worker"),("spawn"+"Process"),("run"+"Command"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("import"+"Sdk"),("initialize"+"Sdk"),("send"+"Telemetry"),("write"+"AuditLog"),("persist"+"Approval"),("persist"+"Audit"),("approve"+"Execution"),("authorize"+"Provider"),("write"+"Audit"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase first real provider call guard API names"
Write-Host ("[OK] " + $SmokeName + " static first real provider call guard smoke passed.")
