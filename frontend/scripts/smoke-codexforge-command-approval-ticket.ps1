param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1184 Command Approval Ticket" `
  -ScriptFile "smoke-codexforge-command-approval-ticket.ps1" `
  -Domain "src\lib\codexforge\command-approval-ticket" `
  -Route "src\app\command-approval-ticket" `
  -MainPanel "CommandApprovalTicketPanel" `
  -CommandLabel "Go to Command Approval Ticket" `
  -Modules @("command-approval-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandApprovalTicketStableKey", "buildCommandApprovalTicket", "buildCommandApprovalTicketItems", "buildCommandApprovalTicketBoundary", "buildCommandApprovalTicketModel", "summarizeCommandApprovalTicket", "COMMAND_APPROVAL_TICKET_LANGUAGE") `
  -PhaseMarkers @("Command approval ticket", "Command approval ticket does not approve commands", "Command approval ticket requires explicit human approval", "Approval tickets keep every command blocked", "Denied command approval ticket paths remain blocked", "Command approval ticket checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command approval ticket does not approve commands", "Command approval ticket requires explicit human approval", "Denied command approval ticket paths remain blocked") `
  -RouteHref "/command-approval-ticket"

Write-Host "[OK] CodexForge Phase 1184 Command Approval Ticket smoke passed."
