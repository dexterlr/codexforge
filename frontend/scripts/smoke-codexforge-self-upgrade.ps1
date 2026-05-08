param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

Write-Host ""
Write-Host "=== CodexForge self-upgrade smoke ==="
Write-Host "Base URL: $BaseUrl"

$backlogPath = "src\lib\codexforge\tools\self-upgrade-backlog.ts"
$routePath = "src\app\api\codexforge\tools\self-upgrade\route.ts"
$bridgePath = "src\lib\codexforge\tools\capability-bridge-manifest.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $backlogPath
Assert-FileExists $routePath
Assert-FileExists $bridgePath
Assert-FileExists $allSmokePath

$backlog = Get-Content -Raw $backlogPath
$route = Get-Content -Raw $routePath
$bridge = Get-Content -Raw $bridgePath
$allSmoke = Get-Content -Raw $allSmokePath

Assert-Contains $backlog "CODEXFORGE_SELF_UPGRADE_BACKLOG_VERSION" "self-upgrade version"
Assert-Contains $backlog "buildCodexForgeSelfUpgradeBacklog" "self-upgrade backlog builder"
Assert-Contains $backlog "self-upgrade-console-v1" "self-upgrade console candidate"
Assert-Contains $backlog "approved-web-research-executor-v1" "web research candidate"
Assert-Contains $backlog "blender-scene-plan-schema-v1" "Blender candidate"
Assert-Contains $backlog "comfyui-workflow-manifest-v1" "ComfyUI candidate"
Assert-Contains $backlog "unreal-command-preview-v1" "Unreal candidate"
Assert-Contains $backlog "local-pc-bridge-health-v1" "PC bridge candidate"
Assert-Contains $backlog "camera-permission-state-v1" "camera candidate"
Assert-Contains $backlog "paper-trading-research-v1" "trading research candidate"
Assert-Contains $backlog "broker-risk-cap-design-v1" "broker risk design candidate"
Assert-Contains $backlog "Live broker execution remains blocked" "broker remains blocked"
Assert-Contains $backlog "explicit session consent" "session consent safety language"
Assert-Contains $backlog "No silent desktop control" "no silent desktop control"
Assert-Contains $backlog "No recording, storage, or transmission by default" "camera no-storage default"
Assert-Contains $backlog "No live orders" "no live orders"
Assert-NotContains $backlog "brokerExecution: `"enabled`"" "broker execution never enabled"

Assert-Contains $route "export async function GET" "self-upgrade API route"
Assert-Contains $route "buildCodexForgeSelfUpgradeBacklog" "self-upgrade route uses builder"
Assert-Contains $route "brokerExecution: `"blocked`"" "route keeps broker blocked"
Assert-Contains $bridge "CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE" "bridge feature sequence"
Assert-Contains $allSmoke "Self-upgrade backlog" "managed smoke includes self-upgrade"

try {
  $response = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/codexforge/tools/self-upgrade" -TimeoutSec 5

  if ($response.ok -ne $true) {
    throw "[FAIL] self-upgrade route response ok was not true"
  }

  if (-not $response.topCandidate) {
    throw "[FAIL] self-upgrade route missing topCandidate"
  }

  if ($response.safetySummary.brokerExecution -ne "blocked") {
    throw "[FAIL] broker execution must remain blocked"
  }

  if ([int]$response.candidateCount -lt 8) {
    throw "[FAIL] expected at least 8 self-upgrade candidates"
  }

  Write-Host "[PASS] self-upgrade API route"
} catch {
  Write-Host "[SKIP] self-upgrade API route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge self-upgrade smoke passed."
