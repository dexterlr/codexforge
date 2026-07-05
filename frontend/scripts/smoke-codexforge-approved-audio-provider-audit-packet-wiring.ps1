param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3135 Approved Audio Provider Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-audit-packet-wiring.ps1' `
  -Route 'approved-audio-provider-audit-packet-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Audit Packet Wiring' `
  -RouteHref '/approved-audio-provider-audit-packet-wiring' `
  -Phase '3135' `
  -Title 'Approved Audio Provider Audit Packet Wiring'
