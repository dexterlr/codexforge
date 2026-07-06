param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3340 Controlled Render Artifact Assembly Approval Gate Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-approval-gate-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-approval-gate-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Approval Gate Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-approval-gate-wiring' `
  -Phase 'Phase 3340' `
  -Title 'Controlled Render Artifact Assembly Approval Gate Wiring'
