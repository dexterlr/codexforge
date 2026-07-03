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
$routePagePath = Join-RepoPath $routePath "page.tsx"
$routeClientPath = Join-RepoPath $routePath "page-client.tsx"
$scriptPath = Join-RepoPath "scripts" $scriptFileName
$jarvisVisualSystemPath = Join-RepoPath "src" "lib" "codexforge" "jarvis-cockpit-visual-system"
$navigationRegistryPath = Join-RepoPath "src" "lib" "codexforge" "navigation-shell" "navigation-route-registry.ts"
$navigationTypesPath = Join-RepoPath "src" "lib" "codexforge" "navigation-shell" "navigation-shell-types.ts"
$commandRegistryPath = Join-RepoPath "src" "lib" "codexforge" "command-palette" "command-registry.ts"
$allSmokePath = Join-RepoPath "scripts" "smoke-codexforge-all.ps1"

foreach ($path in @($domainPath, $routePath, $routePagePath, $routeClientPath, $scriptPath)) {
  if (-not (Test-Path $path)) { throw ("[FAIL] Missing path: " + $path) }
  Write-Host ("[PASS] path exists " + $path)
}

$sourceParts = @()
foreach ($scanRoot in @($jarvisVisualSystemPath, $domainPath, $routePath, $scriptPath)) {
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

Assert-Contains $source "JarvisCockpitVisualRoutePanel" "shared route panel"
Assert-Contains $source "JarvisCockpitVisualCockpitPanel" "cockpit panel"
Assert-Contains $source "InteractiveVideoWorkspaceCockpitPanel" "interactive workspace preserved"
Assert-Contains $source "Jarvis Cockpit Visual Upgrade" "visual upgrade marker"
Assert-Contains $source "Local React state only" "local state marker"
Assert-Contains $source "Synthetic data only" "synthetic data marker"
Assert-Contains $source "Backend wiring required" "backend wiring marker"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationTypes ('| "' + $RouteHref.TrimStart('/') + '"') "route id type coverage"
Assert-Contains $navigationTypes ('| "' + $RouteHref + '"') "route href type coverage"
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
  "Jarvis Cockpit Visual Upgrade",
  "Jarvis Cockpit Visual System",
  "Mission Control Hero",
  "Holographic Command Grid",
  "Readiness Orb Cluster",
  "Cinematic Workflow Timeline",
  "Project Command Brief Panel",
  "Storyboard Orbit Panel",
  "Asset Audio Status Matrix",
  "Approval Rights Safety Rail",
  "Backend Systems Health Wall",
  "Blocked Action Command Deck",
  "Contract Status Drawer",
  "Premium Dark Glass Theme",
  "Responsive Command Centre Layout",
  "Cockpit Visual Accessibility Guard",
  "Cockpit Animation Safety Guard",
  "Cockpit Performance Budget Guard",
  "Cockpit Empty Loading States",
  "Cockpit Microcopy Polish",
  "Cockpit Iconography System",
  "Cockpit Depth Lighting System",
  "Cockpit Data Density Tuning",
  "Cockpit Mobile Command Layout",
  "Cockpit High End UX Summary",
  "First Jarvis Cockpit Candidate",
  "Controlled Jarvis Cockpit Release Candidate",
  "First Backend Wiring Readiness After Visual Upgrade",
  "Controlled Jarvis Cockpit Completion Candidate",
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
Write-Host ("[OK] " + $SmokeName + " static Jarvis cockpit visual smoke passed.")
