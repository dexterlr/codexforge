param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1311 Backend Result Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-result-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-result-handoff-contract" `
  -Route "src\app\backend-result-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Result Handoff Contract" `
  -RouteHref "/backend-result-handoff-contract" `
  -Markers @("Backend result handoff contract", "Backend result handoff contract does not persist results", "Backend result handoff requires explicit operator approval", "Result handoff contract defines success denied blocked failed timeout needs-review manual-review and retryable states", "Denied backend result handoff paths remain blocked", "Backend result handoff checklist")
