param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3367 Controlled Render Artifact Assembly Backend Runtime Check Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-backend-runtime-check-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-backend-runtime-check-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Backend Runtime Check Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-backend-runtime-check-wiring' `
  -Phase 'Phase 3367' `
  -Title 'Controlled Render Artifact Assembly Backend Runtime Check Wiring'
