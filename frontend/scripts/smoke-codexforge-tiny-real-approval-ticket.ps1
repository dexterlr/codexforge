param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1357 Tiny Real Approval Ticket" `
  -ScriptFile "smoke-codexforge-tiny-real-approval-ticket.ps1" `
  -Domain "src\lib\codexforge\tiny-real-approval-ticket" `
  -Route "src\app\tiny-real-approval-ticket" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Approval Ticket" `
  -RouteHref "/tiny-real-approval-ticket" `
  -Markers @("Tiny real approval ticket", "Tiny real approval ticket does not persist hidden approvals", "Tiny real approval ticket requires explicit human approval", "Approval ticket previews operator identity scope expiry replay protection denied paths and backend authorization checks", "Denied tiny real approval paths remain blocked", "Tiny real approval checklist")
