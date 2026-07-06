param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3345 Controlled Render Artifact Assembly Video Clip Ref Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-video-clip-ref-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-video-clip-ref-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Video Clip Ref Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-video-clip-ref-wiring' `
  -Phase 'Phase 3345' `
  -Title 'Controlled Render Artifact Assembly Video Clip Ref Wiring'
