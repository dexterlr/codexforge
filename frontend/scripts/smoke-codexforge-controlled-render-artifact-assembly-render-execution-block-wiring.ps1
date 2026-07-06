param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3362 Controlled Render Artifact Assembly Render Execution Block Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-render-execution-block-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-render-execution-block-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Render Execution Block Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-render-execution-block-wiring' `
  -Phase 'Phase 3362' `
  -Title 'Controlled Render Artifact Assembly Render Execution Block Wiring'
