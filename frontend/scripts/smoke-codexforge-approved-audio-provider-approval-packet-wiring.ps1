param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3116 Approved Audio Provider Approval Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-approval-packet-wiring.ps1' `
  -Route 'approved-audio-provider-approval-packet-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Approval Packet Wiring' `
  -RouteHref '/approved-audio-provider-approval-packet-wiring' `
  -Phase '3116' `
  -Title 'Approved Audio Provider Approval Packet Wiring'
