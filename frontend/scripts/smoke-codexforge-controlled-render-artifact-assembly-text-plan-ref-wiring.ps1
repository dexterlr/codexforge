param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3342 Controlled Render Artifact Assembly Text Plan Ref Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-text-plan-ref-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-text-plan-ref-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Text Plan Ref Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-text-plan-ref-wiring' `
  -Phase 'Phase 3342' `
  -Title 'Controlled Render Artifact Assembly Text Plan Ref Wiring'
