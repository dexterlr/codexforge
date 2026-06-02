param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-local-comfyui-health-probe"
$route = "src\app\comfyui-real-health"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Local ComfyUI Health Probe" `
  -ScriptFile "smoke-codexforge-real-local-comfyui-health-probe.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealLocalComfyUiHealthProbePanel" `
  -CommandLabel "Go to Real ComfyUI Health Probe" `
  -Modules @("real-local-comfyui-health-probe-types.ts","real-local-comfyui-health-probe-checks.ts","real-local-comfyui-health-probe-summary.ts","index.ts") `
  -Components @("RealLocalComfyUiHealthProbePanel.tsx","index.ts") `
  -Exports @("buildRealLocalComfyUiHealthProbeStableKey","buildRealLocalComfyUiHealthProbeContract","buildRealLocalComfyUiHealthProbeCheck","buildRealLocalComfyUiHealthProbeChecks","buildRealLocalComfyUiHealthProbeBoundary","buildRealLocalComfyUiHealthProbeHandoff","buildRealLocalComfyUiHealthProbeSummary","summarizeRealLocalComfyUiHealthProbe") `
  -PlainEnglish @("Real local ComfyUI health probe","Localhost-only readiness check","Nothing is submitted yet","No cloud calls","Approved local boundary required","local bridge availability","configured ComfyUI base URL policy","allowed host boundary","timeout and retry boundaries","health endpoint readiness","no cloud call","no secret exposure","live probe is not executed from arbitrary UI yet","localhost","127.0.0.1","::1","no arbitrary queue submit from UI","no arbitrary file browsing","no artifact deletion") `
  -ExtraRoutes @("/comfyui-health/gate","/local-bridge-health","/comfyui-metadata-reader","/workflow-package-validator","/comfyui-submit-trial")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$blockedPatterns = @{
  "no direct cloud/network call" = "fetch\s*\(|XMLHttpRequest|axios"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|webkitdirectory|<input[^>]+type=(['""])?file|browseLocal"
  "no artifact deletion" = "deleteArtifact\s*\(|Remove-Item|unlink\s*\(|deleteFile\s*\("
}
foreach ($name in $blockedPatterns.Keys) {
  if ($source -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}
