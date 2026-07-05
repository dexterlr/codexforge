param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-audio-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedAudioProviderTrialBatchSmoke `
  -SmokeName 'Phase 3123 Approved Audio Provider Transcript Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-audio-provider-transcript-packet-wiring.ps1' `
  -Route 'approved-audio-provider-transcript-packet-wiring' `
  -CommandLabel 'Go to Approved Audio Provider Transcript Packet Wiring' `
  -RouteHref '/approved-audio-provider-transcript-packet-wiring' `
  -Phase '3123' `
  -Title 'Approved Audio Provider Transcript Packet Wiring'
