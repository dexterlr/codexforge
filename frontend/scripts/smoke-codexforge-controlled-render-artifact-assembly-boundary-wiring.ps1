param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3338 Controlled Render Artifact Assembly Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-boundary-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-boundary-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Boundary Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-boundary-wiring' `
  -Phase 'Phase 3338' `
  -Title 'Controlled Render Artifact Assembly Boundary Wiring'
