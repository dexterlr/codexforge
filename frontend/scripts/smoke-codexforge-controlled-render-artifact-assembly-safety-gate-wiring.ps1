param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3353 Controlled Render Artifact Assembly Safety Gate Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-safety-gate-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-safety-gate-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Safety Gate Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-safety-gate-wiring' `
  -Phase 'Phase 3353' `
  -Title 'Controlled Render Artifact Assembly Safety Gate Wiring'
