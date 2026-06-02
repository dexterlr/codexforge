param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-approved-comfyui-submit-trial"
$route = "src\app\comfyui-submit-trial"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Approved ComfyUI Submit Trial" `
  -ScriptFile "smoke-codexforge-real-approved-comfyui-submit-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealApprovedComfyUiSubmitTrialPanel" `
  -CommandLabel "Go to ComfyUI Submit Trial" `
  -Modules @("real-approved-comfyui-submit-trial-types.ts","real-approved-comfyui-submit-trial-summary.ts","index.ts") `
  -Components @("RealApprovedComfyUiSubmitTrialPanel.tsx","index.ts") `
  -Exports @("buildRealApprovedComfyUiSubmitTrialStableKey","buildRealApprovedComfyUiSubmitTrialFlow","buildRealApprovedComfyUiSubmitTrialCheck","buildRealApprovedComfyUiSubmitTrialBoundary","buildRealApprovedComfyUiSubmitTrialChecks","buildRealApprovedComfyUiSubmitTrialSummary","summarizeRealApprovedComfyUiSubmitTrial") `
  -PlainEnglish @("Real approved ComfyUI submit trial","Explicit approval required","Local ComfyUI only","Artifact capture handoff","Recovery path before retry","Not a random generate button","approved local-only executor","explicit safety checks","explicit user approval","review inbox","health probe is ready","metadata reader is acceptable","workflow package validator is ready","approved ComfyUI submit boundary exists","artifact capture path is defined","recovery path is defined","user approval copy is present","final live queue call remains behind boundary","no arbitrary queue submit from UI","no arbitrary file browsing","no artifact deletion") `
  -ExtraRoutes @("/comfyui-real-health","/comfyui-metadata-reader","/workflow-package-validator","/comfyui-submit","/video-capture","/video-recovery")

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
