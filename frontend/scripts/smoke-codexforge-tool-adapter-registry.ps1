$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param(
    [Parameter(Mandatory = $true)][string]$Path
  )

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Content.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Content.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge tool adapter registry smoke ==="

$registryPath = "src\lib\codexforge\tools\tool-adapter-registry.ts"
$serverPath = "src\lib\codexforge\tools\server.ts"
$routePath = "src\app\api\codexforge\tools\execute\route.ts"

Assert-FileExists $registryPath
Assert-FileExists $serverPath
Assert-FileExists $routePath

$registry = Get-Content -Raw $registryPath
$server = Get-Content -Raw $serverPath
$route = Get-Content -Raw $routePath

Assert-Contains $registry "export type CodexForgeToolAdapterDescriptor" "adapter descriptor type"
Assert-Contains $registry "CODEXFORGE_TOOL_ADAPTER_REGISTRY_VERSION" "registry version marker"
Assert-Contains $registry "codexForgeToolAdapterRegistry" "registry export"
Assert-Contains $registry "getCodexForgeToolAdapter" "registry lookup"
Assert-Contains $registry "requireCodexForgeToolAdapter" "registry required lookup"
Assert-Contains $registry "listCodexForgeToolAdapters" "registry list helper"
Assert-Contains $registry "getCodexForgeToolAdapterNames" "registry tool-name helper"

Assert-Contains $registry 'toolName: "render-job"' "render-job registered"
Assert-Contains $registry 'adapter: "local-safe-render-job"' "render-job local-safe adapter"
Assert-Contains $registry 'executionMode: "local-safe-simulated"' "render-job simulated execution mode"
Assert-Contains $registry 'sideEffect: "none"' "render-job no-side-effect marker"

Assert-Contains $registry 'toolName: "blender-python"' "Blender adapter placeholder"
Assert-Contains $registry 'toolName: "unreal-editor-command"' "Unreal adapter placeholder"
Assert-Contains $registry 'toolName: "comfyui-workflow-run"' "ComfyUI adapter placeholder"
Assert-Contains $registry 'toolName: "web-research"' "web research adapter placeholder"
Assert-Contains $registry 'toolName: "pc-bridge"' "PC bridge adapter placeholder"
Assert-Contains $registry 'toolName: "camera-inspect"' "camera inspection adapter placeholder"
Assert-Contains $registry 'toolName: "trading-research"' "trading research adapter placeholder"
Assert-Contains $registry 'toolName: "broker-execution"' "broker execution registered"
Assert-Contains $registry 'executionMode: "blocked"' "blocked execution mode registered"
Assert-Contains $registry 'sideEffect: "broker-action"' "broker side-effect marker"

Assert-Contains $server "tool-adapter-registry" "server imports adapter registry"
Assert-Contains $server "listCodexForgeToolAdapters" "server exposes adapter list"
Assert-Contains $server "getCodexForgeToolAdapterNames" "server exposes adapter names"
Assert-Contains $server "requireCodexForgeToolAdapter" "server exposes required adapter lookup"

Assert-Contains $route "getCodexForgeToolAdapter" "execute route imports adapter lookup"
Assert-Contains $route "toolAdapterSummary" "execute route builds adapter summary"
Assert-Contains $route "toolAdapter: toolAdapterSummary" "execute route serializes adapter summary"

Assert-NotContains $registry "broker-execution-adapter-without-risk-controls" "broker execution unsafe adapter absent"

Write-Host "[OK] CodexForge tool adapter registry smoke passed."
