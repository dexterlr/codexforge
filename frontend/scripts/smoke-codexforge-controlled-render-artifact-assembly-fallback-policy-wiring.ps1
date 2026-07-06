param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3366 Controlled Render Artifact Assembly Fallback Policy Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-fallback-policy-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-fallback-policy-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Fallback Policy Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-fallback-policy-wiring' `
  -Phase 'Phase 3366' `
  -Title 'Controlled Render Artifact Assembly Fallback Policy Wiring'
