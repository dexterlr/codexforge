param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1310 Backend Evidence Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-evidence-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-evidence-handoff-contract" `
  -Route "src\app\backend-evidence-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Evidence Handoff Contract" `
  -RouteHref "/backend-evidence-handoff-contract" `
  -Markers @("Backend evidence handoff contract", "Backend evidence handoff contract does not persist evidence", "Backend evidence handoff requires explicit operator approval", "Evidence handoff contract defines diff command stdout stderr exit code approval timestamp operator audit and redaction fields", "Denied backend evidence handoff paths remain blocked", "Backend evidence handoff checklist")
