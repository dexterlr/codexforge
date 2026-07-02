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
foreach ($scanRoot in @("src\lib\codexforge\render-queue-contract-boundary", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join [Environment]::NewLine
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "RenderWorkerOrchestrationContractRoutePanel" "shared route panel"
if ($ContractFamily -eq "Render") { Assert-Contains $source "RenderQueueContractBoundaryCockpitSummaryPanel" "render queue cockpit summary panel" }
if ($ContractFamily -eq "Worker") { Assert-Contains $source "WorkerOrchestrationContractBoundaryCockpitSummaryPanel" "worker orchestration cockpit summary panel" }
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
  "Render Queue Contract"
  "Render Queue Contract Boundary"
  "Render Job Schema"
  "Render Readiness Gate"
  "Render Queue Policy"
  "Render Retry Policy"
  "Render Priority Policy"
  "Render Timeout Policy"
  "Render Cost Guard"
  "Render Job Lease Contract"
  "Render Queue Telemetry"
  "Render Failure Ledger"
  "Render Result Handoff Contract"
  "Frontend Render Queue Creation Blocked"
  "Review-only render queue contract"
  "Synthetic data only"
  "No render queue creation from the cockpit"
  "No render job creation from the cockpit"
  "No render job persistence from the cockpit"
  "No video rendering from the cockpit"
  "No worker dispatch from the cockpit"
  "No retry dispatch from the cockpit"
  "No artifact creation from the cockpit"
  "No artifact persistence from the cockpit"
  "No command execution from the cockpit"
  "No process spawning from the cockpit"
  "No port binding from the cockpit"
  "No frontend queue persistence"
  "No frontend job persistence"
  "No frontend telemetry persistence"
  "No frontend failure persistence"
  "No frontend file mutation"
  "No frontend persistence"
  "Backend-owned render queue remains required"
  "Backend-owned job ledger remains required"
  "Backend-owned retry policy remains required"
  "Backend-owned worker orchestration remains required"
  "Backend-owned telemetry remains required"
  "Backend-owned artifact storage remains required"
  "Backend-owned approval capture remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "Worker Orchestration Contract"
  "Worker Orchestration Contract Boundary"
  "Worker Lease Contract"
  "Runtime Isolation Contract"
  "Worker Sandbox Policy"
  "Command Execution Blocked"
  "Process Spawn Blocked"
  "Port Binding Blocked"
  "Worker Health Contract"
  "Worker Retry Backoff"
  "Worker Artifact Handoff"
  "Worker Audit Event"
  "Worker Failure Quarantine"
  "Frontend Worker Dispatch Blocked"
  "Review-only worker orchestration contract"
  "Synthetic data only"
  "No worker dispatch from the cockpit"
  "No worker start from the cockpit"
  "No command execution from the cockpit"
  "No process spawning from the cockpit"
  "No port binding from the cockpit"
  "No runtime deployment from the cockpit"
  "No service deployment from the cockpit"
  "No artifact creation from the cockpit"
  "No artifact persistence from the cockpit"
  "No frontend worker lease persistence"
  "No frontend runtime persistence"
  "No frontend telemetry persistence"
  "No frontend audit persistence"
  "No frontend file mutation"
  "No frontend persistence"
  "Backend-owned worker orchestration remains required"
  "Backend-owned runtime isolation remains required"
  "Backend-owned sandbox policy remains required"
  "Backend-owned job lease remains required"
  "Backend-owned health monitoring remains required"
  "Backend-owned failure quarantine remains required"
  "Backend-owned audit trail remains required"
  "Backend-owned approval capture remains required"
  "Operator review remains required"
  "Explicit operator approval remains required"
  "renderQueueContractId"
  "renderQueueContractKind"
  "renderJobSchema"
  "renderReadinessGate"
  "renderQueuePolicy"
  "renderRetryPolicy"
  "renderPriorityPolicy"
  "renderTimeoutPolicy"
  "renderCostGuard"
  "renderJobLeaseContract"
  "renderQueueTelemetry"
  "renderFailureLedger"
  "renderResultHandoffContract"
  "frontendRenderQueueCreationBlocked"
  "deniedRenderQueueContractBoundaries"
  "workerOrchestrationContractId"
  "workerOrchestrationContractKind"
  "workerLeaseContract"
  "runtimeIsolationContract"
  "workerSandboxPolicy"
  "commandExecutionBlocked"
  "processSpawnBlocked"
  "portBindingBlocked"
  "workerHealthContract"
  "workerRetryBackoff"
  "workerArtifactHandoff"
  "workerAuditEvent"
  "workerFailureQuarantine"
  "frontendWorkerDispatchBlocked"
  "deniedWorkerOrchestrationContractBoundaries"
  "cockpitSummary"
  "explicitSafetyLimits"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }
Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
$unsafeApiNames = @(("run"+"Command"),("append"+"Event"),("write"+"File"),("save"+"BrainGraph"),("render"+"Video"),("export"+"Video"),("upload"+"Asset"),("download"+"Asset"),("publish"+"Post"),("schedule"+"Post"),("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("dispatch"+"Worker"),("create"+"Artifact"),("persist"+"Asset"),("persist"+"Prompt"),("persist"+"Job"),("persist"+"Rights"),("store"+"Media"),("create"+"RenderQueue"),("start"+"Render"),("retry"+"Render"),("persist"+"Artifact"),("create"+"Export"),("download"+"File"),("publish"+"Video"),("schedule"+"Video"),("generate"+"Video"),("generate"+"Image"),("generate"+"Voice"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("store"+"Credential"),("store"+"ApiKey"),("dispatch"+"Request"),("persist"+"Response"),("upload"+"Audio"),("download"+"Audio"),("persist"+"Audio"),("persist"+"Transcript"),("persist"+"Caption"),("spawn"+"Process"),("bind"+"Port"),("run"+"Shell"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"
Write-Host ("[OK] " + $SmokeName + " static render queue / worker orchestration contract smoke passed.")
