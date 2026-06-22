param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1309 Backend Command Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-command-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-command-handoff-contract" `
  -Route "src\app\backend-command-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Command Handoff Contract" `
  -RouteHref "/backend-command-handoff-contract" `
  -Markers @("Backend command handoff contract", "Backend command handoff contract does not run commands", "Backend command handoff requires explicit operator approval", "Command handoff contract defines allowlist arguments working directory environment names evidence result and recovery requirements", "Denied backend command handoff paths remain blocked", "Backend command handoff checklist")
