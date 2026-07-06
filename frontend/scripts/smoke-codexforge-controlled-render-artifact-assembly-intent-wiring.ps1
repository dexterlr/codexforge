param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3339 Controlled Render Artifact Assembly Intent Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-intent-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-intent-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Intent Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-intent-wiring' `
  -Phase 'Phase 3339' `
  -Title 'Controlled Render Artifact Assembly Intent Wiring'
