param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3349 Controlled Render Artifact Assembly Resolution Budget Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-resolution-budget-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-resolution-budget-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Resolution Budget Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-resolution-budget-wiring' `
  -Phase 'Phase 3349' `
  -Title 'Controlled Render Artifact Assembly Resolution Budget Wiring'
