param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-local-keyframe-generation-trial"
$route = "src\app\local-keyframe-trial"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Local Keyframe Generation Trial" `
  -ScriptFile "smoke-codexforge-real-local-keyframe-generation-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealLocalKeyframeGenerationTrialPanel" `
  -CommandLabel "Go to Local Keyframe Trial" `
  -Modules @("real-local-keyframe-generation-trial-types.ts","real-local-keyframe-generation-trial-summary.ts","index.ts") `
  -Components @("RealLocalKeyframeGenerationTrialPanel.tsx","index.ts") `
  -Exports @("buildRealLocalKeyframeGenerationTrialStableKey","buildRealLocalKeyframeGenerationTrialFlow","buildRealLocalKeyframeGenerationTrialCheck","buildRealLocalKeyframeGenerationTrialPlan","buildRealLocalKeyframeGenerationTrialBoundary","buildRealLocalKeyframeGenerationTrialChecks","buildRealLocalKeyframeGenerationTrialSummary","summarizeRealLocalKeyframeGenerationTrial") `
  -PlainEnglish @("Real local keyframe generation trial","Keyframes are reviewed first","Local-only keyframe workflow","Shot and scene linkage","No prompt or file upload","Recovery path before retry","local-only target","approved workflow package","explicit user approval","no cloud calls","no arbitrary file browsing","no artifact deletion","artifact capture destination defined","review inbox handoff","recovery path defined") `
  -ExtraRoutes @("/keyframes","/storyboard","/local-image-trial","/workflow-package-validator","/comfyui-submit-trial","/local-output-capture","/video-recovery")

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
