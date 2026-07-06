param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3347 Controlled Render Artifact Assembly Scene Order Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-scene-order-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-scene-order-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Scene Order Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-scene-order-wiring' `
  -Phase 'Phase 3347' `
  -Title 'Controlled Render Artifact Assembly Scene Order Wiring'
