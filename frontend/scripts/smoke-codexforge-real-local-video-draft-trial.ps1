param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-local-video-draft-trial"
$route = "src\app\local-video-draft-trial"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Local Video Draft Trial" `
  -ScriptFile "smoke-codexforge-real-local-video-draft-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealLocalVideoDraftTrialPanel" `
  -CommandLabel "Go to Local Video Draft Trial" `
  -Modules @("real-local-video-draft-trial-types.ts","real-local-video-draft-trial-summary.ts","index.ts") `
  -Components @("RealLocalVideoDraftTrialPanel.tsx","index.ts") `
  -Exports @("buildRealLocalVideoDraftTrialStableKey","buildRealLocalVideoDraftTrialFlow","buildRealLocalVideoDraftTrialCheck","buildRealLocalVideoDraftTrialBounds","buildRealLocalVideoDraftTrialGpuGuidance","buildRealLocalVideoDraftTrialBoundary","buildRealLocalVideoDraftTrialChecks","buildRealLocalVideoDraftTrialSummary","summarizeRealLocalVideoDraftTrial") `
  -PlainEnglish @("Real local video draft trial","Local video draft only","Frame count and duration bounded","Dual GPUs are parallel workers","No cloud fallback","Review before promotion","image/keyframe trial readiness","video workflow package validation","explicit approval","local ComfyUI only","draft output capture","review inbox","recovery path","no multi-GPU memory sharing claim unless workflow supports it","no automatic queue mutation","no arbitrary queue submit from UI","no artifact deletion") `
  -ExtraRoutes @("/local-image-trial","/local-keyframe-trial","/workflow-package-validator","/comfyui-submit-trial","/dual-gpu","/local-output-capture","/video-review","/video-recovery")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$blockedPatterns = @{
  "no direct cloud/network call" = "fetch\s*\(|XMLHttpRequest|axios"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|webkitdirectory|<input[^>]+type=(['""])?file|browseLocal"
  "no artifact deletion" = "deleteArtifact\s*\(|Remove-Item|unlink\s*\(|deleteFile\s*\("
  "no direct Brain graph mutation" = "appendEvent\s*\(|saveBrainGraph\s*\(|mutateBrainGraph\s*\("
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\("
}
foreach ($name in $blockedPatterns.Keys) {
  if ($source -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}
