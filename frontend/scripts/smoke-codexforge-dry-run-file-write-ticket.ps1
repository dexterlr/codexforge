param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1083 Dry-Run File Write Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-file-write-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-file-write-ticket" `
  -Route "src\app\dry-run-file-write-ticket" `
  -MainPanel "DryRunFileWriteTicketPanel" `
  -CommandLabel "Go to Dry-Run File Write Ticket" `
  -Modules @("dry-run-file-write-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunFileWriteTicketStableKey", "buildDryRunFileWriteTicket", "buildDryRunFileWriteTicketItems", "buildDryRunFileWriteTicketBoundary", "buildDryRunFileWriteTicketModel", "summarizeDryRunFileWriteTicket", "DRY_RUN_FILE_WRITE_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run file write ticket", "Dry-run file write ticket does not write files", "File write dry-run requires explicit operator approval", "File write tickets show planned mutations without applying them", "Denied dry-run file write paths remain blocked", "Dry-run file write checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run file write ticket does not write files", "File write dry-run requires explicit operator approval", "Denied dry-run file write paths remain blocked") `
  -RouteHref "/dry-run-file-write-ticket"

Write-Host "[OK] CodexForge Phase 1083 Dry-Run File Write Ticket smoke passed."
