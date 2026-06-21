param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1084 Dry-Run Command Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-command-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-command-ticket" `
  -Route "src\app\dry-run-command-ticket" `
  -MainPanel "DryRunCmdTicketPanel" `
  -CommandLabel "Go to Dry-Run Command Ticket" `
  -Modules @("dry-run-command-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunCmdTicketStableKey", "buildDryRunCmdTicket", "buildDryRunCmdTicketItems", "buildDryRunCmdTicketBoundary", "buildDryRunCmdTicketModel", "summarizeDryRunCmdTicket", "DRY_RUN_COMMAND_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run command ticket", "Dry-run command ticket does not run commands", "Command dry-run requires explicit operator approval", "Command tickets show planned commands without execution", "Denied dry-run command paths remain blocked", "Dry-run command checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run command ticket does not run commands", "Command dry-run requires explicit operator approval", "Denied dry-run command paths remain blocked") `
  -RouteHref "/dry-run-command-ticket"

Write-Host "[OK] CodexForge Phase 1084 Dry-Run Command Ticket smoke passed."
