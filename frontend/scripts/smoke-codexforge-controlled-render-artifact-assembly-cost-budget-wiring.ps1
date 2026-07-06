param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3351 Controlled Render Artifact Assembly Cost Budget Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-cost-budget-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-cost-budget-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Cost Budget Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-cost-budget-wiring' `
  -Phase 'Phase 3351' `
  -Title 'Controlled Render Artifact Assembly Cost Budget Wiring'
