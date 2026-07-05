param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-text-planning-provider-trial-batch-smoke-helper.ps1')

Invoke-CodexForgeApprovedTextPlanningTrialBatchSmoke `
  -SmokeName 'Phase 3052 Approved Text Planning Approval Packet Wiring' `
  -ScriptFile 'smoke-codexforge-approved-text-planning-approval-packet-wiring.ps1' `
  -Route 'approved-text-planning-approval-packet-wiring' `
  -CommandLabel 'Go to Approved Text Planning Approval Packet Wiring' `
  -RouteHref '/approved-text-planning-approval-packet-wiring' `
  -Phase '3052' `
  -Title 'Approved Text Planning Approval Packet Wiring'
