param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3346 Controlled Render Artifact Assembly Timeline Manifest Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-timeline-manifest-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-timeline-manifest-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Timeline Manifest Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-timeline-manifest-wiring' `
  -Phase 'Phase 3346' `
  -Title 'Controlled Render Artifact Assembly Timeline Manifest Wiring'
