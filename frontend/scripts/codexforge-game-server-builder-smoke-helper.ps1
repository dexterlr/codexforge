param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$MainPanel,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string[]]$Markers
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

foreach ($path in @($Domain, $Route, (Join-Path $Route "page.tsx"), (Join-Path $Route "page-client.tsx"), (Join-Path "scripts" $ScriptFile))) {
  if (-not (Test-Path $path)) { throw "[FAIL] Missing path: $path" }
  Write-Host "[PASS] path exists $path"
}

$sourceParts = @()
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\game-server-builder", "src\lib\codexforge\unified-cockpit")) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source $MainPanel "main panel source"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationRegistry $CommandLabel.Replace("Go to ", "") "navigation label"
Assert-Contains $commandRegistry $RouteHref "command route href"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"

foreach ($marker in $Markers) {
  Assert-Contains $source $marker "marker $marker"
}

foreach ($safetyMarker in @(
  "Game Server Builder",
  "Server Goal",
  "Server Type",
  "Theme",
  "Minecraft Profile",
  "Plugins",
  "Mods",
  "World Rules",
  "Roles",
  "Permissions",
  "Economy",
  "Quests",
  "Regions",
  "Factions",
  "Files",
  "Commands",
  "Validation",
  "Evidence",
  "Recovery",
  "Audit",
  "No server starts from the cockpit",
  "No plugin installs from the cockpit",
  "No mod installs from the cockpit",
  "No port binding from the cockpit",
  "No command execution from the cockpit",
  "Backend-owned game server workflow remains required",
  "Explicit operator approval remains required",
  "Game Server Builder is preview-only from the frontend.",
  "It does not start game servers from the UI.",
  "It does not install mods or plugins from the UI.",
  "It does not download server jars from the UI.",
  "It does not bind ports from the UI.",
  "It does not run Java, Docker, SteamCMD, or server commands from the UI.",
  "It does not write generated server files from the UI.",
  "It does not call models, providers, connectors, or local models from the UI.",
  "It prepares a future backend-owned game server domain workflow.",
  "gameServerBuilderId",
  "gameServerBuilderKind",
  "goalRef",
  "projectContextRef",
  "specialistWorkerRef",
  "modelRouterRef",
  "providerApprovalRef",
  "localModelBridgeRef",
  "gameServerGoalIntake",
  "serverTypeClassifier",
  "themeLorePack",
  "minecraftServerProfile",
  "pluginModIntent",
  "worldRulesConfig",
  "rolesPermissionsEconomy",
  "questRegionFaction",
  "serverFilePlan",
  "serverCommandPlan",
  "serverValidationEvidence",
  "serverRecoveryAudit",
  "deniedGameServerBoundaries",
  "cockpitSummary",
  "explicitSafetyLimits",
  "Phase pages remain dev test diagnostics only",
  "frontend game server execution still blocked",
  "backend-owned game server workflow remains required"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(|XMLHttpRequest|EventSource|WebSocket' "runtime/provider/command/file side-effect APIs"

Write-Host "[OK] $SmokeName static game server builder smoke passed."
