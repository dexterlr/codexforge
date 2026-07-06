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
  "3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade"
  "CodexForge Primary Navigation, README, and Workspace Layout Upgrade"
  "god-tier product shell consolidation"
  "primary navigation product areas"
  "Home / Operator Cockpit"
  "Generate"
  "Projects"
  "Assets"
  "Providers"
  "Workflows"
  "Trading"
  "Audit / Runs"
  "Settings / Safety"
  "Developer / Checkpoints"
  "user action first"
  "safety state second"
  "evidence audit third"
  "technical implementation details last"
  "generation chat box appears first on generation pages"
  "approval state appears above technical metadata"
  "output preview appears above technical checkpoint details"
  "phase checkpoint routes remain preserved"
  "phase checkpoint routes do not dominate primary navigation"
  "README explains current live readiness status"
  "README explains provider key never exposed to frontend"
  "README explains first live text provider bridge"
  "Return OK and the approved dry-run id."
  "next likely batch: 3242-3273 - First Live Image Provider Call Backend Bridge"
)) {
  Assert-Contains $docsCombined $needle "docs mention primary navigation README workspace marker $needle"
}

foreach ($needle in @(
  "3306-3337 - First Live Video Provider Call Backend Bridge"
  "3306-3337 - First Live Video Provider Call Backend Bridge Mega Batch v1"
  "First Live Video Provider Call Backend Bridge"
  "first tightly controlled live video provider call bridge"
  "video provider only"
  "single approved video provider only"
  "one approved video provider only"
  "one harmless approved video prompt only"
  "one tiny approved test video artifact only"
  "Create one tiny neutral test video clip for the approved dry-run id."
  "manual operator approval required before live video provider call"
  "backend-owned credential reference only"
  "provider key never exposed to frontend"
  "provider token never exposed to frontend"
  "frontend secret exposure remains blocked"
  "first live video provider request envelope"
  "first live video provider response envelope"
  "first live video provider error envelope"
  "first live video provider duration cap"
  "first live video provider size cap"
  "first live video provider resolution cap"
  "first live video provider cost cap"
  "first live video provider rate cap"
  "first live video provider timeout cap"
  "first live video provider privacy gate"
  "first live video provider safety gate"
  "first live video provider redaction preview"
  "first live video provider audit packet"
  "first live video provider observability trace"
  "first live video provider result capture"
  "first live video provider result review"
  "first live video provider asset handoff remains review-only"
  "first live video provider kill switch"
  "first live video provider single call lock"
  "first live video provider idempotency key"
  "first live video provider replay remains blocked"
  "first live video provider retry policy"
  "first live video provider fallback policy"
  "first live video provider region policy"
  "backend runtime check remains required"
  "operator review remains required before first live video provider call"
  "first live video provider call backend bridge completion does not enable broad provider execution"
  "video bridge remains backend-owned"
  "video result review remains audit backed"
  "live video call cannot execute until a backend-owned execution runtime exists"
  "disabled by default"
  "hard kill switch"
  "tiny duration cap"
  "tiny cost cap"
  "tiny size cap"
  "tiny resolution cap"
  "audit/result capture"
  "no provider key in frontend"
  "no token in frontend"
  "no plaintext secrets"
  "no browser storage for secrets"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no frontend process.env provider key reads"
  "no provider SDK imports in frontend"
  "no broad provider execution"
  "no frontend video provider execution"
  "no frontend image provider execution"
  "no frontend audio provider execution"
  "no microphone access"
  "no camera access"
  "no media device access"
  "no recording execution"
  "no playback engine creation"
  "no render execution"
  "no render queue dispatch"
  "no worker execution"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no download generation"
  "no signed URL creation"
  "no OAuth flow creation"
  "no webhook creation"
  "no file writes from the app"
  "no shell/process/command execution from the app"
  "no service creation from frontend"
  "no API creation from frontend"
  "no runtime deploy"
  "next likely batch: 3338-3369 - Controlled Render Artifact Assembly Trial"
)) {
  Assert-Contains $docsCombined $needle "docs mention first live video provider bridge checkpoint $needle"
}

foreach ($needle in @(
  "3370-3401 - Controlled Render Artifact Export Review Trial"
  "3370-3401 - Controlled Render Artifact Export Review Trial Mega Batch v1"
  "Controlled Render Artifact Export Review Trial"
  "review-only controlled render artifact export review trial"
  "export review only"
  "export eligibility only"
  "approved assembly reference only"
  "approved export format policy only"
  "approved container policy only"
  "approved codec policy only"
  "approved resolution export policy only"
  "approved duration export policy only"
  "approved size export policy only"
  "approved cost export policy only"
  "controlled render artifact export privacy gate"
  "controlled render artifact export safety gate"
  "controlled render artifact export lineage packet"
  "controlled render artifact export audit packet"
  "controlled render artifact export observability trace"
  "controlled render artifact export result preview"
  "controlled render artifact export result review"
  "controlled render artifact export idempotency key"
  "controlled render artifact export replay remains blocked"
  "controlled render artifact export retry policy"
  "controlled render artifact export fallback policy"
  "render artifact export remains blocked until explicit operator approval"
  "backend-owned runtime check remains required"
  "operator review remains required before artifact export execution"
  "controlled render artifact export review trial completion does not enable render/export/publish/workers"
  "disabled by default"
  "no provider execution"
  "no network execution"
  "no render execution"
  "no export execution"
  "no publish execution"
  "no worker dispatch"
  "no file export"
  "no download generation"
  "no archive creation"
  "no signed URL creation"
  "no platform upload"
  "no OAuth flow creation"
  "no webhook creation"
  "no file writes from the app"
  "no shell/process/command execution from the app"
  "no fetch/network calls"
  "no provider SDK imports in frontend"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no browser storage for secrets"
  "next likely batch: 3402-3433 - Controlled Render Artifact Publish Review Trial"
)) {
  Assert-Contains $docsCombined $needle "docs mention controlled render artifact export review trial checkpoint $needle"
}

foreach ($needle in @(
  "3338-3369 - Controlled Render Artifact Assembly Trial"
  "3338-3369 - Controlled Render Artifact Assembly Trial Mega Batch v1"
  "Controlled Render Artifact Assembly Trial"
  "review-only controlled render artifact assembly trial"
  "assembly plan only"
  "no render execution"
  "no export execution"
  "no publish execution"
  "no worker dispatch"
  "no file export"
  "no download generation"
  "no archive creation"
  "no signed URL creation"
  "no platform upload"
  "no OAuth flow creation"
  "no webhook creation"
  "no file writes from the app"
  "no shell/process/command execution from the app"
  "render artifact assembly remains blocked until explicit operator approval"
  "backend-owned runtime check remains required"
  "operator review remains required before artifact assembly execution"
  "controlled render artifact assembly trial completion does not enable render/export/publish/workers"
  "next likely batch: 3370-3401 - Controlled Render Artifact Export Review Trial"
)) {
  Assert-Contains $docsCombined $needle "docs mention controlled render artifact assembly trial checkpoint $needle"
}

foreach ($needle in @(
  "3274-3305 - First Live Audio Provider Call Backend Bridge"
  "3274-3305 - First Live Audio Provider Call Backend Bridge Mega Batch v1"
  "First Live Audio Provider Call Backend Bridge"
  "first tightly controlled live audio provider call bridge"
  "audio provider only"
  "single approved audio provider only"
  "one approved audio provider only"
  "one harmless approved audio prompt only"
  "one tiny approved test audio artifact only"
  "Create one tiny neutral test audio clip for the approved dry-run id."
  "manual operator approval required before live audio provider call"
  "backend-owned credential reference only"
  "provider key never exposed to frontend"
  "provider token never exposed to frontend"
  "frontend secret exposure remains blocked"
  "first live audio provider request envelope"
  "first live audio provider response envelope"
  "first live audio provider error envelope"
  "first live audio provider duration cap"
  "first live audio provider size cap"
  "first live audio provider cost cap"
  "first live audio provider rate cap"
  "first live audio provider timeout cap"
  "first live audio provider privacy gate"
  "first live audio provider safety gate"
  "first live audio provider redaction preview"
  "first live audio provider audit packet"
  "first live audio provider observability trace"
  "first live audio provider result capture"
  "first live audio provider result review"
  "first live audio provider asset handoff remains review-only"
  "first live audio provider kill switch"
  "first live audio provider single call lock"
  "first live audio provider idempotency key"
  "first live audio provider replay remains blocked"
  "first live audio provider retry policy"
  "first live audio provider fallback policy"
  "first live audio provider region policy"
  "first live audio provider data retention policy"
  "backend runtime check remains required"
  "operator review remains required before first live audio provider call"
  "first live audio provider call backend bridge completion does not enable broad provider execution"
  "audio bridge remains backend-owned"
  "audio result review remains audit backed"
  "live audio call cannot execute until a backend-owned execution runtime exists"
  "disabled by default"
  "hard kill switch"
  "tiny duration cap"
  "tiny cost cap"
  "tiny size cap"
  "audit/result capture"
  "no provider key in frontend"
  "no token in frontend"
  "no plaintext secrets"
  "no browser storage for secrets"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no frontend process.env provider key reads"
  "no provider SDK imports in frontend"
  "no broad provider execution"
  "no frontend audio provider execution"
  "no microphone access"
  "no media device access"
  "no recording execution"
  "no playback engine creation"
  "no voice cloning"
  "no voice synthesis execution"
  "no transcription execution"
  "no image provider calls"
  "no video provider calls"
  "no render execution"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no download generation"
  "no signed URL creation"
  "next likely batch: 3306-3337 - First Live Video Provider Call Backend Bridge"
)) {
  Assert-Contains $docsCombined $needle "docs mention first live audio provider bridge checkpoint $needle"
}

foreach ($needle in @(
  "3242-3273 - First Live Image Provider Call Backend Bridge"
  "3242-3273 - First Live Image Provider Call Backend Bridge Mega Batch v1"
  "First Live Image Provider Call Backend Bridge"
  "first tightly controlled live image provider call bridge"
  "image provider only"
  "single approved image provider only"
  "one approved image provider only"
  "one harmless approved image prompt only"
  "one tiny approved test image only"
  "Create one tiny neutral test image for the approved dry-run id."
  "manual operator approval required before live image provider call"
  "backend-owned credential reference only"
  "provider key never exposed to frontend"
  "provider token never exposed to frontend"
  "frontend secret exposure remains blocked"
  "first live image provider request envelope"
  "first live image provider response envelope"
  "first live image provider error envelope"
  "first live image provider size cap"
  "first live image provider cost cap"
  "first live image provider rate cap"
  "first live image provider timeout cap"
  "first live image provider privacy gate"
  "first live image provider safety gate"
  "first live image provider redaction preview"
  "first live image provider audit packet"
  "first live image provider observability trace"
  "first live image provider result capture"
  "first live image provider result review"
  "first live image provider asset handoff remains review-only"
  "first live image provider kill switch"
  "first live image provider single call lock"
  "first live image provider idempotency key"
  "first live image provider replay remains blocked"
  "first live image provider retry policy"
  "first live image provider fallback policy"
  "first live image provider region policy"
  "first live image provider data retention policy"
  "backend runtime check remains required"
  "operator review remains required before first live image provider call"
  "first live image provider call backend bridge completion does not enable broad provider execution"
  "image bridge remains backend-owned"
  "image result review remains audit backed"
  "live image call cannot execute until a backend-owned execution runtime exists"
  "disabled by default"
  "hard kill switch"
  "tiny cost cap"
  "tiny size cap"
  "audit/result capture"
  "no provider key in frontend"
  "no token in frontend"
  "no plaintext secrets"
  "no browser storage for secrets"
  "no frontend process.env provider key reads"
  "no provider SDK imports in frontend"
  "no broad provider execution"
  "no frontend image provider execution"
  "no audio provider calls"
  "no video provider calls"
  "no render execution"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no download generation"
  "no signed URL creation"
  "next likely batch: 3274-3305 - First Live Audio Provider Call Backend Bridge"
)) {
  Assert-Contains $docsCombined $needle "docs mention first live image provider bridge checkpoint $needle"
}

foreach ($needle in @(
  "3178-3209 - First Live Text Provider Call Backend Bridge"
  "3178-3209 - First Live Text Provider Call Backend Bridge Mega Batch v1"
  "First Live Text Provider Call Backend Bridge"
  "first tightly controlled live text provider call bridge"
  "single approved text provider only"
  "one harmless approved prompt only"
  "Return OK and the approved dry-run id."
  "manual operator approval required before live text provider call"
  "backend-owned credential reference only"
  "provider key never exposed to frontend"
  "provider token never exposed to frontend"
  "frontend secret exposure remains blocked"
  "first live text provider request envelope"
  "first live text provider response envelope"
  "first live text provider error envelope"
  "first live text provider cost cap"
  "first live text provider rate cap"
  "first live text provider timeout cap"
  "first live text provider privacy gate"
  "first live text provider safety gate"
  "first live text provider redaction preview"
  "first live text provider audit packet"
  "first live text provider observability trace"
  "first live text provider result capture"
  "first live text provider result review"
  "first live text provider kill switch"
  "first live text provider single call lock"
  "first live text provider idempotency key"
  "first live text provider replay remains blocked"
  "first live text provider retry policy"
  "first live text provider fallback policy"
  "first live text provider region policy"
  "first live text provider data retention policy"
  "backend runtime check remains required"
  "operator review remains required before first live text provider call"
  "first live text provider runner handoff remains backend-owned"
  "first live text provider readiness gate"
  "first live text provider call backend bridge completion does not enable broad provider execution"
  "no provider key in frontend"
  "no token in frontend"
  "no plaintext secrets"
  "no browser storage for secrets"
  "no frontend process.env provider key reads"
  "no provider SDK imports in frontend"
  "no broad provider execution"
  "no image provider calls"
  "no audio provider calls"
  "no video provider calls"
  "no render execution"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "next likely batch: 3210-3241 - CodexForge Primary Navigation and Workspace Layout Upgrade"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "3146-3177 - Live Provider Credential Vault Readiness"
  "3146-3177 - Live Provider Credential Vault Readiness Mega Batch v1"
  "Live Provider Credential Vault Readiness"
  "review-only live provider credential vault readiness"
  "synthetic credential vault readiness data only"
  "live provider credential vault readiness remains blocked until explicit operator approval"
  "backend-only credential vault boundary"
  "provider secret reference contract"
  "provider key never exposed to frontend"
  "provider token never exposed to frontend"
  "frontend secret exposure remains blocked"
  "backend-only provider credential reference"
  "credential use requires explicit operator approval"
  "credential scope review remains required"
  "token scope review remains required"
  "secret rotation policy"
  "secret revocation policy"
  "environment isolation"
  "dev prod separation"
  "live provider audit packet"
  "live provider redaction packet"
  "live provider observability trace"
  "live provider cost gate"
  "live provider rate gate"
  "live provider privacy gate"
  "live provider safety gate"
  "live provider region policy"
  "live provider data retention policy"
  "live provider timeout policy"
  "live provider retry policy"
  "live provider fallback policy"
  "live provider kill switch"
  "live call eligibility remains review-only"
  "blocked live provider call candidate"
  "operator review remains required before live credential use"
  "live provider runner handoff remains review-only"
  "live provider readiness gate"
  "live provider credential vault readiness completion does not store credentials"
  "no credential storage"
  "no token storage"
  "no OAuth token storage"
  "no publish token storage"
  "no provider key storage"
  "no secret storage"
  "no plaintext secrets"
  "no environment variable reads from frontend"
  "no process.env provider key reads from frontend"
  "no live provider calls"
  "no model calls"
  "no prompt sending"
  "no streaming"
  "no provider SDK imports"
  "no text provider imports"
  "no image provider imports"
  "no video provider imports"
  "no audio provider imports"
  "no transcription provider imports"
  "no editing/upscale provider imports"
  "no metadata provider imports"
  "no safety provider imports"
  "no network egress"
  "no fetch/network calls"
  "no connector calls"
  "no upload/download"
  "no file export"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no render execution"
  "no video rendering"
  "no audio rendering"
  "no storyboard execution"
  "no keyframe generation"
  "no render queue dispatch"
  "no worker dispatch"
  "no worker execution"
  "no job execution"
  "no scheduler execution"
  "no orchestration execution"
  "no live workflow execution"
  "no process spawning"
  "no shell execution"
  "no command execution from the app"
  "no file system writes from the app"
  "no frontend persistence"
  "no browser storage writes"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no database writes"
  "no service creation"
  "no API creation from frontend"
  "no port binding"
  "no runtime deploy"
  "next likely batch: 3178-3209 - First Live Text Provider Call Backend Bridge"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "3114-3145 - First Approved Audio Provider Trial"
  "3114-3145 - First Approved Audio Provider Trial Mega Batch v1"
  "First Approved Audio Provider Trial"
  "review-only approved audio provider trial"
  "synthetic audio provider trial data only"
  "audio provider trial remains blocked until explicit operator approval"
  "approved audio provider intent"
  "approved audio provider approval packet"
  "approved audio provider selection"
  "approved audio provider credential reference boundary"
  "approved audio provider token reference boundary"
  "approved audio provider brief"
  "approved audio provider voice plan"
  "approved audio provider narration script"
  "approved audio provider transcript packet"
  "approved audio provider prompt envelope"
  "approved audio provider request envelope"
  "approved audio provider response envelope"
  "approved audio provider error envelope"
  "approved audio provider dry lock"
  "approved audio provider execution remains blocked"
  "approved audio recording remains blocked"
  "approved audio upload remains blocked"
  "approved audio download remains blocked"
  "audio safety review remains review-only"
  "audio redaction review remains review-only"
  "approved audio provider audit packet"
  "approved audio provider observability trace"
  "approved audio provider cost estimate"
  "approved audio provider rate estimate"
  "approved audio provider privacy gate"
  "approved audio provider region policy"
  "approved audio provider data retention policy"
  "approved audio provider retry fallback policy"
  "approved audio provider result review"
  "approved audio provider runner handoff remains review-only"
  "first approved audio provider trial completion does not call providers"
  "audio prompt packet remains synthetic"
  "synthetic audio result envelope"
  "audio asset handoff review remains review-only"
  "approved audio provider operator review remains required"
  "no live provider calls"
  "no audio model calls"
  "no transcription model calls"
  "no model calls"
  "no prompt sending"
  "no audio generation"
  "no audio rendering"
  "no audio recording"
  "no microphone access"
  "no media device access"
  "no transcription execution"
  "no voice cloning"
  "no voice synthesis"
  "no playback engine creation"
  "no streaming"
  "no provider SDK imports"
  "no audio provider imports"
  "no transcription provider imports"
  "no image provider imports"
  "no text provider imports"
  "no video provider imports"
  "no editing/upscale provider imports"
  "no metadata provider imports"
  "no safety provider imports"
  "no network egress"
  "no fetch/network calls"
  "no connector calls"
  "no upload/download"
  "no audio upload"
  "no audio download"
  "no file export"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no render execution"
  "no video rendering"
  "no storyboard execution"
  "no keyframe generation"
  "no render queue dispatch"
  "no worker dispatch"
  "no worker execution"
  "no job execution"
  "no scheduler execution"
  "no orchestration execution"
  "no live workflow execution"
  "no process spawning"
  "no shell execution"
  "no command execution from the app"
  "no file system writes from the app"
  "no frontend persistence"
  "no browser storage writes"
  "no localStorage"
  "no sessionStorage"
  "no IndexedDB"
  "no cookies"
  "no credential storage"
  "no token storage"
  "no OAuth token storage"
  "no provider key storage"
  "no database writes"
  "no service creation"
  "no API creation from frontend"
  "no port binding"
  "no runtime deploy"
  "next likely batch: 3146-3177 - Live Provider Credential Vault Readiness"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "3082-3113 - First Approved Image Storyboard Provider Trial"
  "3082-3113 - First Approved Image Storyboard Provider Trial Mega Batch v1"
  "First Approved Image Storyboard Provider Trial"
  "review-only approved image storyboard provider trial"
  "synthetic image storyboard provider trial data only"
  "image storyboard provider trial remains blocked until explicit operator approval"
  "approved image storyboard intent"
  "approved image storyboard approval packet"
  "approved image storyboard provider selection"
  "approved image storyboard credential reference boundary"
  "approved image storyboard token reference boundary"
  "approved image storyboard visual brief"
  "approved image storyboard prompt envelope"
  "approved image storyboard request envelope"
  "approved image storyboard response envelope"
  "approved image storyboard error envelope"
  "approved image storyboard dry lock"
  "approved image storyboard execution remains blocked"
  "storyboard frame plan remains synthetic"
  "keyframe candidate remains synthetic"
  "style guide remains synthetic"
  "shot list remains synthetic"
  "visual safety review remains review-only"
  "redaction review remains review-only"
  "approved image storyboard audit packet"
  "approved image storyboard observability trace"
  "approved image storyboard cost estimate"
  "approved image storyboard rate estimate"
  "approved image storyboard privacy gate"
  "approved image storyboard region policy"
  "approved image storyboard data retention policy"
  "approved image storyboard retry fallback policy"
  "approved image storyboard result review"
  "asset storage handoff remains review-only"
  "approved image storyboard runner handoff remains review-only"
  "approved image storyboard readiness gate"
  "first approved image storyboard provider trial completion does not call providers"
  "no live provider calls"
  "no image model calls"
  "no model calls"
  "no prompt sending"
  "no image generation"
  "no keyframe generation"
  "no storyboard execution"
  "no streaming"
  "no provider SDK imports"
  "no image provider imports"
  "no text provider imports"
  "no video provider imports"
  "no audio provider imports"
  "no transcription provider imports"
  "no editing/upscale provider imports"
  "no metadata provider imports"
  "no safety provider imports"
  "no network egress"
  "no fetch/network calls"
  "no connector calls"
  "no upload/download"
  "no file export"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no render execution"
  "no video rendering"
  "no audio rendering"
  "no render queue dispatch"
  "no worker dispatch"
  "no worker execution"
  "no job execution"
  "no scheduler execution"
  "no orchestration execution"
  "no live workflow execution"
  "no process spawning"
  "no shell execution"
  "no command execution from the app"
  "no file system writes from the app"
  "no frontend persistence"
  "no browser storage writes"
  "no credential storage"
  "no token storage"
  "no OAuth token storage"
  "no provider key storage"
  "no database writes"
  "no service creation"
  "no API creation from frontend"
  "no port binding"
  "no runtime deploy"
  "next likely batch: 3114-3145 - First Approved Audio Provider Trial"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "3050-3081 - First Approved Text Planning Provider Trial"
  "3050-3081 - First Approved Text Planning Provider Trial Mega Batch v1"
  "First Approved Text Planning Provider Trial"
  "review-only approved text planning provider trial"
  "synthetic text planning provider trial data only"
  "text planning provider trial remains blocked until explicit operator approval"
  "approved text planning intent"
  "approved text planning approval packet"
  "approved text planning provider selection"
  "approved text planning credential reference boundary"
  "approved text planning token reference boundary"
  "approved text planning prompt envelope"
  "approved text planning request envelope"
  "approved text planning response envelope"
  "approved text planning error envelope"
  "approved text planning dry lock"
  "approved text planning execution remains blocked"
  "idea expansion remains synthetic"
  "video outline remains synthetic"
  "prompt plan remains synthetic"
  "storyboard text plan remains synthetic"
  "metadata plan remains synthetic"
  "risk review remains review-only"
  "safety review remains review-only"
  "redaction review remains review-only"
  "approved text planning audit packet"
  "approved text planning observability trace"
  "approved text planning cost estimate"
  "approved text planning rate estimate"
  "approved text planning privacy gate"
  "approved text planning region policy"
  "approved text planning data retention policy"
  "approved text planning retry fallback policy"
  "approved text planning result review"
  "approved text planning runner handoff remains review-only"
  "approved text planning readiness gate"
  "first approved text planning provider trial completion does not call providers"
  "no live provider calls"
  "no text model calls"
  "no model calls"
  "no prompt sending"
  "no streaming"
  "no provider SDK imports"
  "no text provider imports"
  "no image provider imports"
  "no video provider imports"
  "no audio provider imports"
  "no transcription provider imports"
  "no editing/upscale provider imports"
  "no metadata provider imports"
  "no safety provider imports"
  "no network egress"
  "no fetch/network calls"
  "no connector calls"
  "no upload/download"
  "no file export"
  "no artifact export execution"
  "no publish gateway execution"
  "no platform upload"
  "no render execution"
  "no video rendering"
  "no audio rendering"
  "no storyboard execution"
  "no keyframe generation"
  "no render queue dispatch"
  "no worker dispatch"
  "no worker execution"
  "no job execution"
  "no scheduler execution"
  "no orchestration execution"
  "no live workflow execution"
  "no process spawning"
  "no shell execution"
  "no command execution from the app"
  "no file system writes from the app"
  "no frontend persistence"
  "no browser storage writes"
  "no credential storage"
  "no token storage"
  "no OAuth token storage"
  "no provider key storage"
  "no database writes"
  "no service creation"
  "no API creation from frontend"
  "no port binding"
  "no runtime deploy"
  "next likely batch: 3082-3113 - First Approved Image Storyboard Provider Trial"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "3018-3049 - First Real Provider Call Guard",
  "3018-3049 - First Real Provider Call Guard Mega Batch v1",
  "First Real Provider Call Guard",
  "review-only first real provider call guard",
  "synthetic first real provider call guard data only",
  "first real provider call remains blocked until explicit operator approval",
  "provider call intent",
  "provider call approval packet",
  "provider credential reference boundary",
  "provider token reference boundary",
  "provider call request envelope",
  "provider call response envelope",
  "provider call error envelope",
  "provider call dry lock",
  "provider call execution remains blocked",
  "provider call preflight checklist",
  "prompt redaction preview",
  "provider call cost estimate",
  "provider call rate estimate",
  "provider call privacy gate",
  "provider call safety gate",
  "provider call region policy",
  "provider call data retention policy",
  "provider call timeout policy",
  "provider call retry policy",
  "provider call fallback policy",
  "provider call recovery policy",
  "provider call audit packet",
  "provider call observability trace",
  "provider call result review",
  "provider registry handoff remains review-only",
  "multi-provider routing handoff remains review-only",
  "execution bridge handoff remains review-only",
  "runner handoff remains review-only",
  "operator review remains required before first real provider call",
  "first real provider call readiness gate",
  "first real provider call guard completion does not call providers",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no text provider imports",
  "no image provider imports",
  "no audio provider imports",
  "no video provider imports",
  "no transcription provider imports",
  "no editing/upscale provider imports",
  "no metadata provider imports",
  "no safety provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no file export",
  "no artifact export execution",
  "no publish gateway execution",
  "no platform upload",
  "no render execution",
  "no video rendering",
  "no audio rendering",
  "no storyboard execution",
  "no keyframe generation",
  "no render queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no live workflow execution",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no provider key storage",
  "no database writes",
  "no service creation",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "next likely batch: 3050-3081 - First Approved Text Planning Provider Trial"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "2954-2985 - First Approved Provider Execution Bridge",
  "2954-2985 - First Approved Provider Execution Bridge Mega Batch v1",
  "First Approved Provider Execution Bridge",
  "review-only approved provider execution bridge",
  "synthetic approved provider execution bridge data only",
  "approved provider execution bridge remains disabled until explicit operator approval",
  "approved provider execution intent",
  "approved provider approval packet",
  "approved provider credential reference boundary",
  "approved provider token reference boundary",
  "approved provider request envelope",
  "approved provider response envelope",
  "approved provider error envelope",
  "approved provider dry execution lock",
  "approved provider execution remains blocked",
  "approved provider replay remains blocked",
  "approved provider idempotency key",
  "approved provider audit packet",
  "approved provider redaction packet",
  "approved provider observability trace",
  "approved provider cost guard",
  "approved provider rate guard",
  "approved provider privacy guard",
  "approved provider safety guard",
  "approved provider region policy",
  "approved provider data retention policy",
  "approved provider retry policy",
  "approved provider fallback policy",
  "approved provider recovery policy",
  "approved provider timeout policy",
  "approved provider result review",
  "approved provider runner handoff remains review-only",
  "approved provider adapter registry handoff remains review-only",
  "approved provider operator review remains required",
  "approved provider readiness gate",
  "disabled approved provider execution candidate",
  "first approved provider execution bridge completion does not call providers",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no text provider imports",
  "no image provider imports",
  "no audio provider imports",
  "no video provider imports",
  "no transcription provider imports",
  "no editing/upscale provider imports",
  "no metadata provider imports",
  "no safety provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no file export",
  "no artifact export execution",
  "no publish gateway execution",
  "no platform upload",
  "no social/channel publishing",
  "no scheduled publishing",
  "no OAuth flow creation",
  "no OAuth callback creation",
  "no webhook creation",
  "no signed URL creation",
  "no render execution",
  "no video rendering",
  "no audio rendering",
  "no storyboard execution",
  "no keyframe generation",
  "no render queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no live workflow execution",
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
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "no provider key storage",
  "no database writes",
  "no service creation",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "next likely batch: 2986-3017 - Multi-Provider Capability Routing"
)) {
  Assert-Contains $docsCombined $needle "docs mention checkpoint $needle"
}

foreach ($needle in @(
  "2922-2953 - Provider Adapter Registry Backend Contract",
  "2922-2953 - Provider Adapter Registry Backend Contract Mega Batch v1",
  "Provider Adapter Registry Backend Contract",
  "review-only provider adapter registry contract",
  "synthetic provider adapter registry data only",
  "provider adapter registry remains disabled until explicit operator approval",
  "disabled provider adapter catalog",
  "provider capability map",
  "text provider capability remains disabled",
  "image provider capability remains disabled",
  "audio provider capability remains disabled",
  "video provider capability remains disabled",
  "transcription provider capability remains disabled",
  "editing provider capability remains disabled",
  "metadata provider capability remains disabled",
  "safety provider capability remains disabled",
  "provider credential boundary",
  "provider token boundary",
  "provider request envelope",
  "provider response envelope",
  "provider error envelope",
  "provider approval gate",
  "provider audit envelope",
  "provider redaction envelope",
  "provider cost guard",
  "provider rate guard",
  "provider privacy guard",
  "provider safety guard",
  "provider region policy",
  "provider data retention policy",
  "provider retry policy",
  "provider fallback policy",
  "provider observability trace",
  "provider runner handoff remains review-only",
  "provider adapter readiness gate",
  "provider adapter registry completion does not call providers",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no text provider imports",
  "no image provider imports",
  "no audio provider imports",
  "no video provider imports",
  "no transcription provider imports",
  "no editing/upscale provider imports",
  "no metadata provider imports",
  "no safety provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no file export",
  "no artifact export execution",
  "no publish gateway execution",
  "no platform upload",
  "no social/channel publishing",
  "no scheduled publishing",
  "no OAuth flow creation",
  "no OAuth callback creation",
  "no webhook creation",
  "no signed URL creation",
  "no render execution",
  "no video rendering",
  "no audio rendering",
  "no storyboard execution",
  "no keyframe generation",
  "no render queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no live workflow execution",
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
  "no credential storage",
  "no token storage",
  "no OAuth token storage",
  "no publish token storage",
  "no provider key storage",
  "no database writes",
  "no service creation",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "next likely batch: 2954-2985 - First Approved Provider Execution Bridge",
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

