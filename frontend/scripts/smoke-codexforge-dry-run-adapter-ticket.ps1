param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1086 Dry-Run Adapter Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-adapter-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-adapter-ticket" `
  -Route "src\app\dry-run-adapter-ticket" `
  -MainPanel "DryRunAdapterTicketPanel" `
  -CommandLabel "Go to Dry-Run Adapter Ticket" `
  -Modules @("dry-run-adapter-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunAdapterTicketStableKey", "buildDryRunAdapterTicket", "buildDryRunAdapterTicketItems", "buildDryRunAdapterTicketBoundary", "buildDryRunAdapterTicketModel", "summarizeDryRunAdapterTicket", "DRY_RUN_ADAPTER_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run adapter ticket", "Dry-run adapter ticket does not execute adapters", "Adapter dry-run requires explicit operator approval", "Adapter tickets show backend adapter gates", "Denied dry-run adapter paths remain blocked", "Dry-run adapter checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run adapter ticket does not execute adapters", "Adapter dry-run requires explicit operator approval", "Denied dry-run adapter paths remain blocked") `
  -RouteHref "/dry-run-adapter-ticket"

Write-Host "[OK] CodexForge Phase 1086 Dry-Run Adapter Ticket smoke passed."
