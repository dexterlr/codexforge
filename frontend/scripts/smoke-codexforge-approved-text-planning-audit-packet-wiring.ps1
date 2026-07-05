param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3070 Approved Text Planning Audit Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-audit-packet-wiring.ps1' `
  -Route 'approved-text-planning-audit-packet-wiring' `
  -CommandLabel 'Go to Approved Text Planning Audit Packet Wiring' `
  -RouteHref '/approved-text-planning-audit-packet-wiring' `
  -Phase '3070' `
  -Title 'Approved Text Planning Audit Packet Wiring'
