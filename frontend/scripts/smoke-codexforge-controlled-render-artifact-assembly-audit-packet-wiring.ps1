param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3355 Controlled Render Artifact Assembly Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-audit-packet-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-audit-packet-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Audit Packet Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-audit-packet-wiring' `
  -Phase 'Phase 3355' `
  -Title 'Controlled Render Artifact Assembly Audit Packet Wiring'
