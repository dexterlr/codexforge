param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3020 First Real Provider Call Approval Packet Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-approval-packet-wiring.ps1' `
  -Route 'first-real-provider-call-approval-packet-wiring' `
  -CommandLabel 'Go to First Real Provider Call Approval Packet Wiring' `
  -RouteHref '/first-real-provider-call-approval-packet-wiring' `
  -Phase '3020' `
  -Title 'First Real Provider Call Approval Packet Wiring'
