param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1231 Local Change Approval Ticket" `
  -ScriptFile "smoke-codexforge-local-change-approval-ticket.ps1" `
  -Domain "src\lib\codexforge\local-change-approval-ticket" `
  -Route "src\app\local-change-approval-ticket" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Approval Ticket" `
  -RouteHref "/local-change-approval-ticket" `
  -Markers @("Local change approval ticket", "Local change approval ticket does not approve actions", "Local change approval ticket requires explicit human approval", "Approval ticket keeps file writes and commands blocked", "Denied local change approval paths remain blocked", "Local change approval checklist")
