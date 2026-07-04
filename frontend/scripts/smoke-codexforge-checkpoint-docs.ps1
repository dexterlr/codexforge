param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$repoRoot = Resolve-Path (Join-Path $root "..")
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
    throw "[FAIL] Unexpected $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ($Haystack -notmatch $Pattern) {
    throw "[FAIL] Missing $Name`: $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ($Haystack -match $Pattern) {
    throw "[FAIL] Unexpected $Name`: $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-CountExactly {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [int]$Expected,
    [string]$Name
  )
  $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count
  if ($count -ne $Expected) {
    throw "[FAIL] $Name expected $Expected found $count"
  }
  Write-Host "[PASS] $Name"
}

function Get-DuplicateValues {
  param([string[]]$Values)
  $Values |
    Where-Object { $_ } |
    Group-Object |
    Where-Object { $_.Count -gt 1 } |
    ForEach-Object { $_.Name }
}

function Get-AllSmokeRouteEntryText {
  param([hashtable]$Entry)
  return '@{ Name = "' + $Entry.Name + '"; File = "' + $Entry.File + '"; Required = $true }'
}

Write-Host "=== CodexForge Checkpoint Documentation smoke ==="

$rootReadmePath = Join-Path $repoRoot "README.md"
$frontendReadmePath = Join-Path $root "README.md"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$statusIndexPath = Join-Path $root "docs\codexforge-status-index.md"
$workspaceMapPath = Join-Path $root "docs\WORKSPACE_MAP.md"
$structureMapPath = Join-Path $root "docs\codexforge-structure-map.md"
$operatorStartPath = Join-Path $root "docs\operator\OPERATOR-V3-START.md"
$operatorScopePath = Join-Path $root "docs\operator\OPERATOR-V3-SCOPE.md"
$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"

foreach ($path in @(
  $rootReadmePath,
  $frontendReadmePath,
  $checkpointPath,
  $runbookPath,
  $statusIndexPath,
  $workspaceMapPath,
  $structureMapPath,
  $operatorStartPath,
  $operatorScopePath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$rootReadme = Get-Content -Raw $rootReadmePath
$frontendReadme = Get-Content -Raw $frontendReadmePath
$checkpointDoc = Get-Content -Raw $checkpointPath
$runbookDoc = Get-Content -Raw $runbookPath
$statusIndexDoc = Get-Content -Raw $statusIndexPath
$workspaceMapDoc = Get-Content -Raw $workspaceMapPath
$structureMapDoc = Get-Content -Raw $structureMapPath
$operatorStartDoc = Get-Content -Raw $operatorStartPath
$operatorScopeDoc = Get-Content -Raw $operatorScopePath
$allSmoke = Get-Content -Raw $allSmokePath

$docsCombined = @(
  $rootReadme,
  $frontendReadme,
  $checkpointDoc,
  $runbookDoc,
  $statusIndexDoc,
  $workspaceMapDoc,
  $structureMapDoc,
  $operatorStartDoc,
  $operatorScopeDoc
) -join "`n"

$phaseMatches = [regex]::Matches($allSmoke, "Phase\s+(\d+)")
if ($phaseMatches.Count -eq 0) {
  throw "[FAIL] No Phase N entries found in all-smoke"
}
$highestPhase = $phaseMatches |
  ForEach-Object { [int]$_.Groups[1].Value } |
  Sort-Object -Descending |
  Select-Object -First 1

Write-Host "[PASS] highest detected phase from all-smoke: $highestPhase"

Assert-Contains $rootReadme "CodexForge" "root README product name"
Assert-Contains $rootReadme "Current State" "root README current status section"
Assert-Contains $rootReadme "Current checkpoint" "root README checkpoint language"
Assert-Contains $frontendReadme "Operational Checkpoint" "frontend README operational checkpoint"
Assert-Matches $docsCombined "(highest detected phase:\s*$highestPhase|through phase\s+$highestPhase)" "docs mention latest detected phase"

foreach ($needle in @(
  "review-only surfaces",
  "Explicit operator approval",
  "No silent mutation",
  "No provider/local/connector/automation execution without approval",
  "No credential/output storage",
  "No memory auto-promotion",
  "canonical workspace",
  "validation commands"
)) {
  Assert-Contains $docsCombined $needle "docs mention $needle"
}

foreach ($needle in @(
  "2346-2377 - First Provider Adapter Dry Run Harness Mega Batch v1",
  "Controlled Provider Adapter Dry Run Completion Candidate",
  "2378-2409 - Provider Adapter Mock Result Harness Mega Batch v1",
  "Controlled Provider Mock Result Harness Completion Candidate",
  "2410-2441 - Provider Approval/Audit Enforcement Boundary Mega Batch v1",
  "Controlled Provider Approval Audit Completion Candidate",
  "2442-2473 - First Controlled Provider Dry Run Candidate Mega Batch v1",
  "Controlled Provider Dry Run Completion Candidate",
  "Controlled Provider Dry Run Candidate",
  "Review-only controlled provider dry run candidate",
  "Synthetic controlled provider dry run data only",
  "controlled provider dry run candidate remains synthetic and review-only",
  "2474-2505 - Provider Backend Execution Readiness Mega Batch v1",
  "Provider Backend Execution Readiness Mega Batch v1",
  "Provider Backend Execution Completion Candidate",
  "Provider Backend Execution Readiness",
  "Review-only provider backend execution readiness",
  "Synthetic provider backend execution readiness data only",
  "provider backend execution readiness remains synthetic and review-only",
  "backend execution remains backend-owned",
  "2506-2537 - First Real Provider Call Guard Mega Batch v1",
  "The dry run harness remains synthetic and review-only",
  "Provider dry run remains backend-owned",
  "The mock result harness remains synthetic and review-only",
  "Synthetic provider mock result data only",
  "Provider mock result handling remains backend-owned",
  "No live provider execution exists yet",
  "No provider calls from frontend",
  "No model calls from frontend",
  "No prompt sending",
  "No streaming",
  "No credential storage",
  "No token storage",
  "2538-2569 - First Approved Provider Trial Mega Batch v1",
  "First Approved Provider Trial Completion Candidate",
  "First Approved Provider Trial",
  "Review-only first approved provider trial",
  "Synthetic approved provider trial data only",
  "first approved provider trial remains synthetic and review-only",
  "approved provider trial remains backend-owned and blocked",
  "Provider Result Review + Recovery Mega Batch v1",
  "explicit operator approval required",
  "audit trail required",
  "2602?2633 ? Provider Gateway Hardening Mega Batch v1",
  "Provider Gateway Hardening",
  "Provider Gateway Hardening Completion",
  "review-only provider gateway diagnostic",
  "blocked provider execution",
  "protected provider boundary",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no network egress",
  "no fetch/network calls",
  "no frontend persistence",
  "no browser storage writes",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no command execution from the app",
  "no service creation",
  "no API creation from frontend",
  "no queue dispatch",
  "no worker dispatch",
  "no process spawning",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "denial handling",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "safety guard",
  "privacy guard",
  "gateway state",
  "gateway recovery",
  "completion guard",
  "Phase 2043 Provider Selection Policy Preview",
  "2602?2633 ? Provider Gateway Hardening Mega Batch v1 remains covered",
  "2826-2857 - End-to-End Video Creation Dry Run Mega Batch v1",
  "End-to-End Video Creation Dry Run",
  "End-to-End Video Creation Dry Run Completion",
  "review-only video dry run diagnostic",
  "blocked video workflow execution",
  "protected video workflow boundary",
  "video dry run contract",
  "video idea envelope",
  "prompt safety review",
  "provider gateway handoff boundary",
  "asset storage handoff boundary",
  "audio storage handoff boundary",
  "storyboard plan boundary",
  "keyframe plan boundary",
  "timeline plan boundary",
  "render queue handoff boundary",
  "worker orchestration handoff boundary",
  "artifact export handoff boundary",
  "publish gateway handoff boundary",
  "operator approval checkpoint",
  "execution blocked",
  "video workflow persistence blocked",
  "no live video creation",
  "no live end-to-end execution",
  "no live storyboard execution",
  "no live keyframe generation",
  "no live prompt execution",
  "no live render plan execution",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no publish provider imports",
  "no video provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no audio upload",
  "no audio download",
  "no audio recording",
  "no microphone access",
  "no media device access",
  "no playback engine creation",
  "no audio rendering",
  "no video rendering",
  "no transcoding",
  "no render execution",
  "no render queue dispatch",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no artifact export execution",
  "no file export",
  "no download generation",
  "no archive creation",
  "no signed URL creation",
  "no publish gateway execution",
  "no publish handoff execution",
  "no platform upload",
  "no channel publishing",
  "no social publishing",
  "no scheduled publishing",
  "no OAuth flow creation",
  "no webhook creation",
  "no callback route creation",
  "no render/export/publish/schedule",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no API creation from frontend",
  "no service creation",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "video dry run state",
  "video dry run recovery",
  "operator review",
  "cockpit alignment",
  "completion guard",
  "guarded video pipeline path",
  "controlled video workflow trial next",
  "next likely batch: 2858-2889 - First Controlled Video Workflow Trial",
  "2794-2825 - Publish Gateway Backend Wiring Mega Batch v1 remains covered",
  "2762-2793 - Artifact Export Backend Wiring Mega Batch v1 remains covered",
  "2730-2761 - Worker Orchestration Backend Wiring Mega Batch v1 remains covered",
  "2698-2729 - Render Queue Backend Wiring Mega Batch v1 remains covered",
  "2666-2697 - Audio Storage Backend Wiring Mega Batch v1 remains covered",
  "2634-2665 - Asset Storage Backend Wiring Mega Batch v1 remains covered",
  "2602-2633 - Provider Gateway Hardening Mega Batch v1 remains covered",
  "do not claim live video creation exists",
  "do not claim live end-to-end execution exists",
  "do not claim live provider calls, model calls, prompt sending, video rendering, worker execution, artifact export, file export, publishing, upload, network, or persistence exists",
  "2794-2825 - Publish Gateway Backend Wiring Mega Batch v1",
  "Publish Gateway Backend Wiring",
  "Pipeline Command Center",
  "review-only publish gateway diagnostic",
  "blocked publish gateway execution",
  "protected publish gateway boundary",
  "publish gateway contract",
  "publish gateway job envelope",
  "publish gateway channel policy",
  "publish gateway destination policy",
  "asset handoff boundary",
  "artifact handoff boundary",
  "metadata policy",
  "caption policy",
  "thumbnail policy",
  "schedule blocked",
  "platform upload blocked",
  "external account linking blocked",
  "OAuth token isolation",
  "signed URL creation blocked",
  "publish handoff blocked",
  "publish persistence blocked",
  "no live publish gateway",
  "no platform upload",
  "no channel publishing",
  "no social publishing",
  "no scheduled publishing",
  "no external account linking",
  "no OAuth flow creation",
  "no OAuth callback creation",
  "no webhook creation",
  "no callback route creation",
  "no signed URL creation",
  "no publish handoff execution",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no render execution",
  "no video rendering",
  "no artifact export execution",
  "no file export",
  "no download generation",
  "no archive creation",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no publish provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no API creation from frontend",
  "no service creation",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "publish gateway state",
  "publish gateway recovery",
  "operator review",
  "cockpit alignment",
  "completion guard",
  "guarded video pipeline path",
  "provider gateway to publish gateway path",
  "artifact export to publish gateway handoff",
  "controlled video dry run next",
  "next likely batch: 2826-2857 - End-to-End Video Creation Dry Run",
  "Publish Gateway Backend Wiring Completion",
  "2762-2793 - Artifact Export Backend Wiring Mega Batch v1 remains covered",
  "2730-2761 - Worker Orchestration Backend Wiring Mega Batch v1 remains covered",
  "2698-2729 - Render Queue Backend Wiring Mega Batch v1 remains covered",
  "2666-2697 - Audio Storage Backend Wiring Mega Batch v1 remains covered",
  "2634-2665 - Asset Storage Backend Wiring Mega Batch v1 remains covered",
  "2602-2633 - Provider Gateway Hardening Mega Batch v1 remains covered",
  "Main Pages Premium UX Upgrade remains preserved if present",
  "preserve Phase 2043 Provider Selection Policy Preview",
  "do not claim live publish gateway exists",
  "do not claim platform upload, channel publishing, social publishing, scheduled publishing, OAuth flow creation, webhook creation, signed URL creation, or publish handoff execution exists",
  "2762-2793 - Artifact Export Backend Wiring Mega Batch v1",
  "Artifact Export Backend Wiring",
  "Artifact Export Backend Wiring Completion",
  "review-only artifact export diagnostic",
  "blocked artifact export execution",
  "protected artifact export boundary",
  "artifact export contract",
  "artifact export job envelope",
  "artifact export validation boundary",
  "artifact format policy",
  "artifact manifest policy",
  "artifact packaging policy",
  "asset linkage boundary",
  "audio linkage boundary",
  "render linkage boundary",
  "worker handoff boundary",
  "file creation blocked",
  "download generation blocked",
  "archive creation blocked",
  "signed URL creation blocked",
  "publish handoff blocked",
  "artifact export persistence blocked",
  "no live artifact export",
  "no file export",
  "no download generation",
  "no archive creation",
  "no signed URL creation",
  "no publish handoff execution",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no render execution",
  "no video rendering",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no API creation from frontend",
  "no service creation",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "artifact export state",
  "artifact export recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2794-2825 - Publish Gateway Backend Wiring",
  "2730-2761 - Worker Orchestration Backend Wiring Mega Batch v1 remains covered",
  "2698-2729 - Render Queue Backend Wiring Mega Batch v1 remains covered",
  "2666-2697 - Audio Storage Backend Wiring Mega Batch v1 remains covered",
  "2634-2665 - Asset Storage Backend Wiring Mega Batch v1 remains covered",
  "2602-2633 - Provider Gateway Hardening Mega Batch v1 remains covered",
  "Preserve Phase 2043 Provider Selection Policy Preview",
  "do not claim live artifact export exists",
  "do not claim file export, download generation, archive creation, signed URL creation, or publish handoff execution exists",
  "2634?2665 ? Asset Storage Backend Wiring Mega Batch v1",
  "Asset Storage Backend Wiring",
  "review-only asset storage diagnostic",
  "blocked asset storage execution",
  "protected asset storage boundary",
  "asset storage contract",
  "asset metadata envelope",
  "asset validation boundary",
  "asset classification boundary",
  "asset path policy",
  "asset namespace guard",
  "upload blocked",
  "download blocked",
  "storage mutation blocked",
  "asset persistence blocked",
  "no live asset storage",
  "no upload/download",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no storage provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no render/export/publish/schedule",
  "no command execution from the app",
  "no service creation",
  "no API creation from frontend",
  "no queue dispatch",
  "no worker dispatch",
  "no process spawning",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "asset state",
  "asset recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2666?2697 ? Audio Storage Backend Wiring",
  "do not claim live asset storage exists",
  "do not claim live upload/download exists",
  "2666?2697 ? Audio Storage Backend Wiring Mega Batch v1",
  "Audio Storage Backend Wiring",
  "Audio Storage Backend Wiring Completion",
  "review-only audio storage diagnostic",
  "blocked audio storage execution",
  "protected audio storage boundary",
  "audio storage contract",
  "audio metadata envelope",
  "audio validation boundary",
  "audio classification boundary",
  "audio codec policy",
  "audio duration guard",
  "waveform metadata boundary",
  "transcript linkage boundary",
  "asset linkage boundary",
  "audio upload blocked",
  "audio download blocked",
  "audio recording blocked",
  "microphone access blocked",
  "media device access blocked",
  "playback blocked",
  "transcoding blocked",
  "audio rendering blocked",
  "storage mutation blocked",
  "audio persistence blocked",
  "no live audio storage",
  "no upload/download",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no render/export/publish/schedule",
  "no command execution from the app",
  "no service creation",
  "no API creation from frontend",
  "no queue dispatch",
  "no worker dispatch",
  "no process spawning",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "audio state",
  "audio recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2698?2729 ? Render Queue Backend Wiring",
  "do not claim live audio storage exists",
  "do not claim live upload/download exists",
  "do not claim recording/playback/transcoding/audio rendering exists",
  "2634?2665 ? Asset Storage Backend Wiring Mega Batch v1 remains covered",
  "2698?2729 ? Render Queue Backend Wiring Mega Batch v1",
  "Render Queue Backend Wiring",
  "Render Queue Backend Wiring Completion",
  "review-only render queue diagnostic",
  "blocked render queue execution",
  "protected render queue boundary",
  "render queue contract",
  "render job envelope",
  "render validation boundary",
  "asset dependency boundary",
  "audio dependency boundary",
  "timeline dependency boundary",
  "render priority policy",
  "render scheduling policy",
  "render queue dispatch blocked",
  "worker dispatch blocked",
  "worker execution blocked",
  "job execution blocked",
  "scheduler execution blocked",
  "render execution blocked",
  "video rendering blocked",
  "transcoding blocked",
  "render persistence blocked",
  "no live render queue",
  "no live rendering",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no process spawning",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no command execution from the app",
  "no service creation",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "render queue state",
  "render queue recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2730?2761 ? Worker Orchestration Backend Wiring",
  "do not claim live render queue exists",
  "do not claim live rendering exists",
  "do not claim queue dispatch, worker execution, job execution, or scheduler execution exists",
  "Worker Orchestration Backend Wiring Completion",
  "do not claim live worker orchestration exists",
  "do not claim worker dispatch, worker execution, process spawning, service creation, port binding, or runtime deploy exists",
  "2698?2729 ? Render Queue Backend Wiring Mega Batch v1 remains covered",
  "2730?2761 ? Worker Orchestration Backend Wiring Mega Batch v1",
  "Worker Orchestration Backend Wiring",
  "review-only worker orchestration diagnostic",
  "blocked worker orchestration execution",
  "protected worker orchestration boundary",
  "worker orchestration contract",
  "worker job envelope",
  "worker validation boundary",
  "worker capability policy",
  "worker isolation policy",
  "queue handoff boundary",
  "scheduler handoff boundary",
  "worker dispatch blocked",
  "worker execution blocked",
  "process spawning blocked",
  "service creation blocked",
  "port binding blocked",
  "runtime deploy blocked",
  "worker persistence blocked",
  "no live worker orchestration",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no worker pool creation",
  "no service creation",
  "no daemon creation",
  "no subprocess creation",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "worker orchestration state",
  "worker orchestration recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2762?2793 ? Artifact Export Backend Wiring",
  "2666?2697 ? Audio Storage Backend Wiring Mega Batch v1 remains covered",
  "2634?2665 ? Asset Storage Backend Wiring Mega Batch v1 remains covered",
  "2602?2633 ? Provider Gateway Hardening Mega Batch v1 remains covered",
  "2762-2793 - Artifact Export Backend Wiring Mega Batch v1",
  "Artifact Export Backend Wiring",
  "Artifact Export Backend Wiring Completion",
  "review-only artifact export diagnostic",
  "blocked artifact export execution",
  "protected artifact export boundary",
  "artifact export contract",
  "artifact export job envelope",
  "artifact export validation boundary",
  "artifact format policy",
  "artifact manifest policy",
  "artifact packaging policy",
  "asset linkage boundary",
  "audio linkage boundary",
  "render linkage boundary",
  "worker handoff boundary",
  "file creation blocked",
  "download generation blocked",
  "archive creation blocked",
  "signed URL creation blocked",
  "publish handoff blocked",
  "artifact export persistence blocked",
  "no live artifact export",
  "no file export",
  "no download generation",
  "no archive creation",
  "no signed URL creation",
  "no publish handoff execution",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no render execution",
  "no video rendering",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no export provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no API creation from frontend",
  "no service creation",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "artifact export state",
  "artifact export recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2794-2825 - Publish Gateway Backend Wiring",
  "2730-2761 - Worker Orchestration Backend Wiring Mega Batch v1 remains covered",
  "2698-2729 - Render Queue Backend Wiring Mega Batch v1 remains covered",
  "2666-2697 - Audio Storage Backend Wiring Mega Batch v1 remains covered",
  "2634-2665 - Asset Storage Backend Wiring Mega Batch v1 remains covered",
  "2602-2633 - Provider Gateway Hardening Mega Batch v1 remains covered",
  "Preserve Phase 2043 Provider Selection Policy Preview",
  "do not claim live artifact export exists",
  "do not claim file export, download generation, archive creation, signed URL creation, or publish handoff execution exists"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

Assert-Contains $docsCombined "C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend" "canonical workspace path"
Assert-Contains $docsCombined "npm run build" "validation command npm run build"
Assert-Contains $docsCombined "smoke-codexforge-checkpoint-docs.ps1" "validation command checkpoint smoke"
Assert-Contains $docsCombined "smoke-codexforge-all.ps1" "validation command all smoke"
Assert-Contains $docsCombined "smoke-codexforge-command-ui-simplification.ps1" "validation command command UI"
Assert-Contains $docsCombined "smoke-codexforge-repo-hygiene.ps1" "validation command repo hygiene"
Assert-Contains $docsCombined "npm run smoke:codexforge:server" "validation command server smoke"
Assert-Contains $docsCombined "git diff --check" "validation command diff check"

$ciClaimScan = $docsCombined
$ciClaimScan = $ciClaimScan.Replace("Do not claim CI passed unless actual CI or terminal logs prove it.", "")
$ciClaimScan = $ciClaimScan.Replace("Do not claim CI passed unless actual CI or terminal logs prove it", "")
Assert-NotMatches $ciClaimScan "\bCI\s+passed\b" "unproven CI passed claim"

$liveClaimScan = $docsCombined
$liveClaimScan = $liveClaimScan.Replace("Do not claim live execution unless an approved local/backend/provider boundary exists.", "")
$liveClaimScan = $liveClaimScan.Replace("Do not claim live execution unless an approved local/backend/provider boundary exists", "")
Assert-NotMatches $liveClaimScan "\blive execution\s+(works|is implemented|is available|is ready|passed)\b" "unbounded live execution claim"
Assert-NotMatches $liveClaimScan "\bautomatic live execution\s+(works|is implemented|is available|is ready|passed)\b" "automatic live execution claim"

Assert-NotContains $docsCombined "Phases 230-233 are now" "old 230-series roadmap language"
Assert-NotContains $docsCombined "fully working" "unqualified fully working language"
Assert-NotMatches $docsCombined "sk-[A-Za-z0-9_-]{16,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[0-9A-Za-z-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}" "fake API keys or tokens"
Assert-NotMatches $docsCombined "https?://(api\.)?(example|fake|test)\." "fake external endpoints"
Assert-NotMatches $docsCombined "\bnpm\s+(install|i)\b|\byarn\s+add\b|\bpnpm\s+add\b" "package install behavior in checkpoint docs"

$badCharCodes = @(0xFFFD, 0x00C3, 0x00C2, 0x0192, 0x00E2)
foreach ($code in $badCharCodes) {
  if ($docsCombined.Contains([string][char]$code)) {
    throw "[FAIL] Mojibake marker found in checkpoint docs: U+$($code.ToString('X4'))"
  }
}
Assert-NotContains $docsCombined "???" "triple-question mojibake marker"
Write-Host "[PASS] no mojibake markers in checkpoint docs"

Assert-CountExactly $allSmoke "Checkpoint Documentation Consistency" 1 "all-smoke registers Checkpoint Documentation Consistency exactly once"
Assert-CountExactly $allSmoke "smoke-codexforge-checkpoint-docs.ps1" 1 "all-smoke references checkpoint docs smoke exactly once"
Assert-NotMatches $allSmoke "Phase\s+$($highestPhase + 1)\s+Checkpoint Documentation Consistency" "checkpoint smoke has no product phase number"

$changedFiles = @()
try {
  $changedFiles += git -C $repoRoot diff --name-only
  $changedFiles += git -C $repoRoot ls-files --others --exclude-standard
} catch {
  Write-Host "[WARN] git changed-file scan unavailable: $($_.Exception.Message)"
}
$changedFiles = @($changedFiles | Where-Object { $_ } | Sort-Object -Unique)

$allSmokeDiff = @()
try {
  $allSmokeDiff = git -C $repoRoot diff -- frontend/scripts/smoke-codexforge-all.ps1
} catch {
  $allSmokeDiff = @()
}
$expectedAllSmokeRouteCoverage = @(
  @{ Name = "Phase 2043 Provider Selection Policy Preview"; File = "smoke-codexforge-provider-selection-policy-preview-contract.ps1"; Required = $true }
)

foreach ($expectedCoverage in $expectedAllSmokeRouteCoverage) {
  $expectedCoverageText = Get-AllSmokeRouteEntryText $expectedCoverage
  Assert-Contains $allSmoke $expectedCoverageText "all-smoke preserves $($expectedCoverage.Name)"
}

$removedCoverage = @(
  $allSmokeDiff |
    Where-Object { $_ -match "^-\s*@\{\s*Name\s*=" } |
    Where-Object {
      $removedCoverageLine = $_
      $hasCanonicalReplacement = $false
      foreach ($expectedCoverage in $expectedAllSmokeRouteCoverage) {
        $expectedCoverageText = Get-AllSmokeRouteEntryText $expectedCoverage
        if (
          $removedCoverageLine -match [regex]::Escape('Name = "' + $expectedCoverage.Name + '"') -and
          $removedCoverageLine -notmatch [regex]::Escape('File = "' + $expectedCoverage.File + '"') -and
          $allSmoke.IndexOf($expectedCoverageText, [StringComparison]::OrdinalIgnoreCase) -ge 0
        ) {
          $hasCanonicalReplacement = $true
          break
        }
      }
      -not $hasCanonicalReplacement
    }
)
if ($removedCoverage.Count -gt 0) {
  throw "[FAIL] all-smoke route/smoke coverage removal detected: $($removedCoverage -join '; ')"
}
Write-Host "[PASS] no all-smoke route coverage removal detected"

$touchedSource = @(
  $changedFiles |
    Where-Object { $_ -match "^frontend/src/(app|lib)/" -and $_ -match "\.(ts|tsx|js|jsx)$" }
)
if ($touchedSource.Count -eq 0) {
  Write-Host "[PASS] no touched app/source files require runtime guard scan"
} else {
  $sourceText = ($touchedSource | ForEach-Object {
    Get-Content -Raw (Join-Path $repoRoot $_)
  }) -join "`n"

  $sourceRuntimeScan = $sourceText
  foreach ($marker in @(
    "no Date.now for deterministic layout/ids",
    "no Date.now",
    "no Math.random",
    "no appendEvent/saveBrainGraph calls from UI",
    "no direct appendEvent call from UI",
    "no direct saveBrainGraph call from UI",
    "no direct apply-diff call from UI",
    "no direct write-file call from UI",
    "no direct run-command call from UI"
  )) {
    $sourceRuntimeScan = $sourceRuntimeScan.Replace($marker, "")
  }

  Assert-NotContains $sourceRuntimeScan "Date.now" "no Date.now in touched app/source files"
  Assert-NotContains $sourceRuntimeScan "Math.random" "no Math.random in touched app/source files"
  Assert-NotMatches $sourceRuntimeScan "localStorage\.setItem|sessionStorage\.setItem" "no localStorage/sessionStorage credential storage in touched app/source files"
  Assert-NotMatches $sourceRuntimeScan "runCommand|brokerExecution\s*\(|brokerExecution\.run|brokerExecution\.execute|brokerExecutionClient|executeBroker|dispatchBroker|apply-diff|write-file|appendEvent|saveBrainGraph" "no runtime execution or Brain mutation calls in touched app/source files"
  Assert-NotMatches $sourceRuntimeScan "fetch\s*\(|XMLHttpRequest|EventSource|WebSocket" "no provider/local/connector/automation calls in touched app/source files"
}

$navOrCommandTouched = @(
  $changedFiles |
    Where-Object {
      $_ -match "^frontend/src/lib/codexforge/navigation-shell/navigation-route-registry\.ts$" -or
      $_ -match "^frontend/src/lib/codexforge/command-palette/command-registry\.ts$"
    }
)
if ($navOrCommandTouched.Count -eq 0) {
  Write-Host "[PASS] command/nav duplicate route scan not required"
} else {
  foreach ($file in $navOrCommandTouched) {
    $raw = Get-Content -Raw (Join-Path $repoRoot $file)
    $hrefs = [regex]::Matches($raw, 'href:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    $shortLabels = [regex]::Matches($raw, 'shortLabel:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    $duplicateHrefs = @(Get-DuplicateValues $hrefs)
    $duplicateShortLabels = @(Get-DuplicateValues $shortLabels)
    if ($duplicateHrefs.Count -gt 0) {
      throw "[FAIL] duplicate route hrefs in $file`: $($duplicateHrefs -join ', ')"
    }
    if ($duplicateShortLabels.Count -gt 0) {
      throw "[FAIL] duplicate route shortLabels in $file`: $($duplicateShortLabels -join ', ')"
    }
  }
  Write-Host "[PASS] no duplicate route hrefs/shortLabels in touched command/nav files"
}

Write-Host "[PASS] ignored/generated directories are not required"
Write-Host "[PASS] no package install behavior added by checkpoint smoke"
Write-Host "[PASS] no runtime execution behavior added by checkpoint docs batch"
Write-Host "[PASS] no provider/local/connector/automation calls added by checkpoint docs batch"
Write-Host "[OK] CodexForge Checkpoint Documentation smoke passed."

