param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3344 Controlled Render Artifact Assembly Audio Asset Ref Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-audio-asset-ref-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-audio-asset-ref-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Audio Asset Ref Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-audio-asset-ref-wiring' `
  -Phase 'Phase 3344' `
  -Title 'Controlled Render Artifact Assembly Audio Asset Ref Wiring'
