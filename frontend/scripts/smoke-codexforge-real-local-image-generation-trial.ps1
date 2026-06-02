param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-local-image-generation-trial"
$route = "src\app\local-image-trial"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Local Image Generation Trial" `
  -ScriptFile "smoke-codexforge-real-local-image-generation-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealLocalImageGenerationTrialPanel" `
  -CommandLabel "Go to Local Image Trial" `
  -Modules @("real-local-image-generation-trial-types.ts","real-local-image-generation-trial-summary.ts","index.ts") `
  -Components @("RealLocalImageGenerationTrialPanel.tsx","index.ts") `
  -Exports @("buildRealLocalImageGenerationTrialStableKey","buildRealLocalImageGenerationTrialFlow","buildRealLocalImageGenerationTrialCheck","buildRealLocalImageGenerationTrialPackageSummary","buildRealLocalImageGenerationTrialBoundary","buildRealLocalImageGenerationTrialChecks","buildRealLocalImageGenerationTrialSummary","summarizeRealLocalImageGenerationTrial") `
  -PlainEnglish @("Real local image generation trial","Explicit approval before local image trial","Local ComfyUI only","Artifact capture handoff","Not a random generate button","Nothing runs automatically","health probe ready","metadata acceptable","workflow package valid","explicit user approval","review inbox handoff","recovery path defined","no cloud calls","no prompt or file upload","no arbitrary queue submit from UI","no arbitrary file browsing","no artifact deletion","no memory auto-promotion") `
  -ExtraRoutes @("/comfyui-real-health","/comfyui-metadata-reader","/workflow-package-validator","/comfyui-submit-trial","/local-output-capture","/video-review","/video-recovery")

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
