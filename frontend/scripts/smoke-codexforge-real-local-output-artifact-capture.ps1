param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-local-output-artifact-capture"
$route = "src\app\local-output-capture"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Local Output Artifact Capture" `
  -ScriptFile "smoke-codexforge-real-local-output-artifact-capture.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealLocalOutputArtifactCapturePanel" `
  -CommandLabel "Go to Local Output Capture" `
  -Modules @("real-local-output-artifact-capture-types.ts","real-local-output-artifact-capture-summary.ts","index.ts") `
  -Components @("RealLocalOutputArtifactCapturePanel.tsx","index.ts") `
  -Exports @("buildRealLocalOutputArtifactCaptureStableKey","buildRealLocalOutputArtifactCaptureRecord","buildRealLocalOutputArtifactCaptureCheck","buildRealLocalOutputArtifactCaptureChecks","buildRealLocalOutputArtifactCaptureBoundary","buildRealLocalOutputArtifactCaptureSummary","summarizeRealLocalOutputArtifactCapture") `
  -PlainEnglish @("Real artifact capture from local output","Local output reference summary","Review inbox handoff","No artifact deletion","No memory auto-promotion","Full local paths stay secondary","artifact type","source trial","checksum/status placeholder if no backend exists","recovery path","export handoff","retention note","no arbitrary file browsing","no Brain graph mutation from UI","no memory auto-promotion") `
  -ExtraRoutes @("/local-image-trial","/local-keyframe-trial","/local-video-draft-trial","/video-review","/video-recovery","/video-export")

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
