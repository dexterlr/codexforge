param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3348 Controlled Render Artifact Assembly Duration Budget Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-duration-budget-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-duration-budget-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Duration Budget Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-duration-budget-wiring' `
  -Phase 'Phase 3348' `
  -Title 'Controlled Render Artifact Assembly Duration Budget Wiring'
