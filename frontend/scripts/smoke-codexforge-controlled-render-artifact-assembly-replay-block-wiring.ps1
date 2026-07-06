param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3364 Controlled Render Artifact Assembly Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-replay-block-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-replay-block-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Replay Block Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-replay-block-wiring' `
  -Phase 'Phase 3364' `
  -Title 'Controlled Render Artifact Assembly Replay Block Wiring'
