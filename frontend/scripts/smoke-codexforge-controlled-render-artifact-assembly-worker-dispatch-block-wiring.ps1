param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3361 Controlled Render Artifact Assembly Worker Dispatch Block Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-worker-dispatch-block-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-worker-dispatch-block-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Worker Dispatch Block Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-worker-dispatch-block-wiring' `
  -Phase 'Phase 3361' `
  -Title 'Controlled Render Artifact Assembly Worker Dispatch Block Wiring'
