param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3359 Controlled Render Artifact Assembly Export Block Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-export-block-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-export-block-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Export Block Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-export-block-wiring' `
  -Phase 'Phase 3359' `
  -Title 'Controlled Render Artifact Assembly Export Block Wiring'
