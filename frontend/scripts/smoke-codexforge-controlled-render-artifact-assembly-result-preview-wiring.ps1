param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3357 Controlled Render Artifact Assembly Result Preview Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-result-preview-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-result-preview-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Result Preview Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-result-preview-wiring' `
  -Phase 'Phase 3357' `
  -Title 'Controlled Render Artifact Assembly Result Preview Wiring'
