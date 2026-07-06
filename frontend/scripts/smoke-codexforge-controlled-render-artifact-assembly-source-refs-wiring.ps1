param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3341 Controlled Render Artifact Assembly Source Refs Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-source-refs-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-source-refs-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Source Refs Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-source-refs-wiring' `
  -Phase 'Phase 3341' `
  -Title 'Controlled Render Artifact Assembly Source Refs Wiring'
