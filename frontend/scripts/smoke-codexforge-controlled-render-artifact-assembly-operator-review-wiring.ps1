param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3368 Controlled Render Artifact Assembly Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-operator-review-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-operator-review-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Operator Review Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-operator-review-wiring' `
  -Phase 'Phase 3368' `
  -Title 'Controlled Render Artifact Assembly Operator Review Wiring'
