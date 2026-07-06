param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3358 Controlled Render Artifact Assembly Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-result-review-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-result-review-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Result Review Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-result-review-wiring' `
  -Phase 'Phase 3358' `
  -Title 'Controlled Render Artifact Assembly Result Review Wiring'
