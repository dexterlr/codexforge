param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3352 Controlled Render Artifact Assembly Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-privacy-gate-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-privacy-gate-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Privacy Gate Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-privacy-gate-wiring' `
  -Phase 'Phase 3352' `
  -Title 'Controlled Render Artifact Assembly Privacy Gate Wiring'
