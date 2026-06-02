param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-local-comfyui-metadata-reader"
$route = "src\app\comfyui-metadata-reader"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Local ComfyUI Metadata Reader" `
  -ScriptFile "smoke-codexforge-real-local-comfyui-metadata-reader.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealLocalComfyUiMetadataReaderPanel" `
  -CommandLabel "Go to ComfyUI Metadata Reader" `
  -Modules @("real-local-comfyui-metadata-reader-types.ts","real-local-comfyui-metadata-reader-summary.ts","index.ts") `
  -Components @("RealLocalComfyUiMetadataReaderPanel.tsx","index.ts") `
  -Exports @("buildRealLocalComfyUiMetadataReaderStableKey","buildRealLocalComfyUiMetadataReaderContract","buildRealLocalComfyUiMetadataCapabilitySummary","buildRealLocalComfyUiMetadataCapabilitySummaries","buildRealLocalComfyUiMetadataReaderSummary","summarizeRealLocalComfyUiMetadataReader") `
  -PlainEnglish @("Real local ComfyUI metadata reader","Metadata is summarized safely","No arbitrary local file browsing","Advanced metadata is secondary","No secrets are shown","detected ComfyUI status source","available node/type summary","model/checkpoint visibility status","workflow compatibility hints","missing capability hints","privacy/safety notes","No full local paths above fold","no arbitrary queue submit from UI","no arbitrary file browsing","no artifact deletion") `
  -ExtraRoutes @("/comfyui-real-health","/comfyui-metadata","/comfyui-workflows/dry-run","/workflow-package-validator","/comfyui-submit-trial")

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
