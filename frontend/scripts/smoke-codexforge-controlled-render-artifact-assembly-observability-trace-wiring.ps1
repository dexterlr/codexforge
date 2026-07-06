param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3356 Controlled Render Artifact Assembly Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-observability-trace-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-observability-trace-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Observability Trace Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-observability-trace-wiring' `
  -Phase 'Phase 3356' `
  -Title 'Controlled Render Artifact Assembly Observability Trace Wiring'
