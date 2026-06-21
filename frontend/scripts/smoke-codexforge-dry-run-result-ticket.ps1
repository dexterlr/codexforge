param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1089 Dry-Run Result Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-result-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-result-ticket" `
  -Route "src\app\dry-run-result-ticket" `
  -MainPanel "DryRunResultTicketPanel" `
  -CommandLabel "Go to Dry-Run Result Ticket" `
  -Modules @("dry-run-result-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunResultTicketStableKey", "buildDryRunResultTicket", "buildDryRunResultTicketItems", "buildDryRunResultTicketBoundary", "buildDryRunResultTicketModel", "summarizeDryRunResultTicket", "DRY_RUN_RESULT_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run result ticket", "Dry-run result ticket does not persist results", "Result dry-run requires explicit operator approval", "Result tickets route future outputs through shared result review", "Denied dry-run result paths remain blocked", "Dry-run result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run result ticket does not persist results", "Result dry-run requires explicit operator approval", "Denied dry-run result paths remain blocked") `
  -RouteHref "/dry-run-result-ticket"

Write-Host "[OK] CodexForge Phase 1089 Dry-Run Result Ticket smoke passed."
