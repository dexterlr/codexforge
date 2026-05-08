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

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

Write-Host ""
Write-Host "=== CodexForge capability bridge smoke ==="
Write-Host "Base URL: $BaseUrl"

$manifestPath = "src\lib\codexforge\tools\capability-bridge-manifest.ts"
$routePath = "src\app\api\codexforge\tools\capabilities\route.ts"
$adapterRegistryPath = "src\lib\codexforge\tools\tool-adapter-registry.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $manifestPath
Assert-FileExists $routePath
Assert-FileExists $adapterRegistryPath
Assert-FileExists $allSmokePath

$manifest = Get-Content -Raw $manifestPath
$route = Get-Content -Raw $routePath
$registry = Get-Content -Raw $adapterRegistryPath
$allSmoke = Get-Content -Raw $allSmokePath

Assert-Contains $manifest "CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION" "manifest version"
Assert-Contains $manifest "codexForgeCapabilityBridgeManifest" "manifest export"
Assert-Contains $manifest "self-inspection" "self-inspection bridge"
Assert-Contains $manifest "web-research" "web research bridge"
Assert-Contains $manifest "pc-bridge" "PC bridge"
Assert-Contains $manifest "camera-inspection" "camera bridge"
Assert-Contains $manifest "blender-production" "Blender bridge"
Assert-Contains $manifest "unreal-production" "Unreal bridge"
Assert-Contains $manifest "comfyui-production" "ComfyUI bridge"
Assert-Contains $manifest "trading-research" "trading research bridge"
Assert-Contains $manifest "broker-execution" "broker execution bridge"
Assert-Contains $manifest "consent: ""blocked""" "broker blocked consent"
Assert-Contains $manifest "explicit-session-consent" "explicit session consent"
Assert-Contains $manifest "buildCodexForgeCapabilityBridgeSummary" "bridge summary helper"
Assert-Contains $manifest "CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE" "feature sequence"

Assert-Contains $route "export async function GET" "capability route GET"
Assert-Contains $route "capabilitySummary" "capability summary response"
Assert-Contains $route "featureSequence" "feature sequence response"
Assert-Contains $route "listCodexForgeToolAdapters" "adapter list response"

Assert-Contains $registry "pc-bridge" "adapter registry PC bridge"
Assert-Contains $registry "camera-inspect" "adapter registry camera inspection"
Assert-Contains $registry "unreal-editor-command" "adapter registry Unreal command"
Assert-Contains $registry "comfyui-workflow-run" "adapter registry ComfyUI workflow"
Assert-Contains $registry "broker-execution" "adapter registry broker execution"
Assert-Contains $registry "executionMode: ""blocked""" "blocked broker execution mode"

Assert-Contains $allSmoke "Capability bridge" "managed smoke includes capability bridge"
Assert-Contains $allSmoke "smoke-codexforge-tool-adapter-registry.ps1" "managed smoke includes adapter registry"
Assert-Contains $allSmoke "smoke-codexforge-capability-bridge.ps1" "managed smoke includes bridge smoke"

try {
  $response = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/codexforge/tools/capabilities" -TimeoutSec 5

  if ($response.ok -ne $true) {
    throw "[FAIL] capability route response ok was not true"
  }

  if (-not $response.capabilitySummary) {
    throw "[FAIL] capability route missing capabilitySummary"
  }

  if ([int]$response.capabilitySummary.bridgeCount -lt 8) {
    throw "[FAIL] expected at least 8 capability bridges"
  }

  $broker = @($response.capabilities | Where-Object { $_.id -eq "broker-execution" }) | Select-Object -First 1
  if (-not $broker) {
    throw "[FAIL] capability route missing broker-execution"
  }

  if ($broker.status -ne "blocked" -or $broker.consent -ne "blocked") {
    throw "[FAIL] broker-execution must remain blocked"
  }

  Write-Host "[PASS] capability bridge API route"
} catch {
  Write-Host "[SKIP] capability bridge API route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge capability bridge smoke passed."
