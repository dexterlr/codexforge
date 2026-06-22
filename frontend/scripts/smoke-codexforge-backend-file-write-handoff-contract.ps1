param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1308 Backend File Write Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-file-write-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-file-write-handoff-contract" `
  -Route "src\app\backend-file-write-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend File Write Handoff Contract" `
  -RouteHref "/backend-file-write-handoff-contract" `
  -Markers @("Backend file write handoff contract", "Backend file write handoff contract does not write files", "Backend file write handoff requires explicit operator approval", "File write handoff contract defines path guard diff rollback evidence result and audit requirements", "Denied backend file write handoff paths remain blocked", "Backend file write handoff checklist")
