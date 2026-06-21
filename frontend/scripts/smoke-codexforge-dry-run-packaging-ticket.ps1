param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1091 Dry-Run Packaging Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-packaging-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-packaging-ticket" `
  -Route "src\app\dry-run-packaging-ticket" `
  -MainPanel "DryRunPackagingTicketPanel" `
  -CommandLabel "Go to Dry-Run Packaging Ticket" `
  -Modules @("dry-run-packaging-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunPackagingTicketStableKey", "buildDryRunPackagingTicket", "buildDryRunPackagingTicketItems", "buildDryRunPackagingTicketBoundary", "buildDryRunPackagingTicketModel", "summarizeDryRunPackagingTicket", "DRY_RUN_PACKAGING_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run packaging ticket", "Dry-run packaging ticket does not package outputs", "Packaging dry-run requires explicit operator approval", "Packaging tickets include export artifact and runbook review", "Denied dry-run packaging paths remain blocked", "Dry-run packaging checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run packaging ticket does not package outputs", "Packaging dry-run requires explicit operator approval", "Denied dry-run packaging paths remain blocked") `
  -RouteHref "/dry-run-packaging-ticket"

Write-Host "[OK] CodexForge Phase 1091 Dry-Run Packaging Ticket smoke passed."
