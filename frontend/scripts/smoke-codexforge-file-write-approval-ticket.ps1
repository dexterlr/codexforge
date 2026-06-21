param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1166 File Write Approval Ticket" `
  -ScriptFile "smoke-codexforge-file-write-approval-ticket.ps1" `
  -Domain "src\lib\codexforge\file-write-approval-ticket" `
  -Route "src\app\file-write-approval-ticket" `
  -MainPanel "FileWriteApprovalTicketPanel" `
  -CommandLabel "Go to File Write Approval Ticket" `
  -Modules @("file-write-approval-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFileWriteApprovalTicketStableKey", "buildFileWriteApprovalTicket", "buildFileWriteApprovalTicketItems", "buildFileWriteApprovalTicketBoundary", "buildFileWriteApprovalTicketModel", "summarizeFileWriteApprovalTicket", "FILE_WRITE_APPROVAL_TICKET_LANGUAGE") `
  -PhaseMarkers @("File-write approval ticket", "File-write approval ticket does not approve writes", "File-write approval ticket requires explicit human approval", "Approval tickets keep every mutation blocked", "Denied file-write approval ticket paths remain blocked", "File-write approval ticket checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File-write approval ticket does not approve writes", "File-write approval ticket requires explicit human approval", "Denied file-write approval ticket paths remain blocked") `
  -RouteHref "/file-write-approval-ticket"

Write-Host "[OK] CodexForge Phase 1166 File Write Approval Ticket smoke passed."
