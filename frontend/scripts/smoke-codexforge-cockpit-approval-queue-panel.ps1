param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1199 Cockpit Approval Queue Panel" `
  -ScriptFile "smoke-codexforge-cockpit-approval-queue-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-approval-queue-panel" `
  -Route "src\app\cockpit-approval-queue-panel" `
  -MainPanel "CockpitApprovalQueuePanel" `
  -CommandLabel "Go to Cockpit Approval Queue Panel" `
  -RouteHref "/cockpit-approval-queue-panel" `
  -Markers @("Cockpit approval queue panel", "Cockpit approval queue panel does not approve actions", "Approval queue requires explicit human approval", "Approval queue keeps file writes and commands blocked", "Denied cockpit approval paths remain blocked", "Cockpit approval queue checklist")
