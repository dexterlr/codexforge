param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-workflow-package-validator"
$route = "src\app\workflow-package-validator"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Real Workflow Package Validator" `
  -ScriptFile "smoke-codexforge-real-workflow-package-validator.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealWorkflowPackageValidatorPanel" `
  -CommandLabel "Go to Workflow Package Validator" `
  -Modules @("real-workflow-package-validator-types.ts","real-workflow-package-validator-summary.ts","index.ts") `
  -Components @("RealWorkflowPackageValidatorPanel.tsx","index.ts") `
  -Exports @("buildRealWorkflowPackageValidatorStableKey","buildRealWorkflowPackageContract","buildRealWorkflowPackageCheck","buildRealWorkflowPackageChecks","buildRealWorkflowPackageDecision","buildRealWorkflowPackageValidatorSummary","summarizeRealWorkflowPackageValidator") `
  -PlainEnglish @("Real workflow package validator","Prepared workflow package only","Requires explicit approval","Local-only target required","Block unsafe submit","ready","blocked","needs review","missing model/node","unsafe target","not local-only","requires explicit approval","allowed local endpoint","no cloud provider destination","no secrets","no arbitrary file browsing","no destructive artifact behavior","deterministic package ID/key","approval copy is present","dry-run contract exists","no arbitrary queue submit from UI","no arbitrary file browsing","no artifact deletion") `
  -ExtraRoutes @("/comfyui-workflows/dry-run","/comfyui-jobs/package","/comfyui-metadata-reader","/comfyui-real-health","/comfyui-submit-trial")

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
