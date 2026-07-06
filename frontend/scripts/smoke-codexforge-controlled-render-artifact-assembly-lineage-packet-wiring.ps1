param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-assembly-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeControlledRenderArtifactAssemblyTrialBatchSmoke `
  -SmokeName 'Phase 3354 Controlled Render Artifact Assembly Lineage Packet Wiring' `
  -ScriptFile 'smoke-codexforge-controlled-render-artifact-assembly-lineage-packet-wiring.ps1' `
  -Route 'controlled-render-artifact-assembly-lineage-packet-wiring' `
  -CommandLabel 'Go to Controlled Render Artifact Assembly Lineage Packet Wiring' `
  -RouteHref '/controlled-render-artifact-assembly-lineage-packet-wiring' `
  -Phase 'Phase 3354' `
  -Title 'Controlled Render Artifact Assembly Lineage Packet Wiring'
