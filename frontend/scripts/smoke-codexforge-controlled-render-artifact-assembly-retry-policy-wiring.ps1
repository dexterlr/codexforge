param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3365 Controlled Render Artifact Assembly Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-retry-policy-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-retry-policy-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Retry Policy Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-retry-policy-wiring' `
  -Phase 'Phase 3365' `
  -Title 'Controlled Render Artifact Assembly Retry Policy Wiring'
