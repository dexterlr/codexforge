param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1085 Dry-Run Runtime Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-runtime-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-runtime-ticket" `
  -Route "src\app\dry-run-runtime-ticket" `
  -MainPanel "DryRunRuntimeTicketPanel" `
  -CommandLabel "Go to Dry-Run Runtime Ticket" `
  -Modules @("dry-run-runtime-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunRuntimeTicketStableKey", "buildDryRunRuntimeTicket", "buildDryRunRuntimeTicketItems", "buildDryRunRuntimeTicketBoundary", "buildDryRunRuntimeTicketModel", "summarizeDryRunRuntimeTicket", "DRY_RUN_RUNTIME_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run runtime ticket", "Dry-run runtime ticket does not start runtimes", "Runtime dry-run requires explicit operator approval", "Runtime tickets show planned runtime launches without execution", "Denied dry-run runtime paths remain blocked", "Dry-run runtime checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run runtime ticket does not start runtimes", "Runtime dry-run requires explicit operator approval", "Denied dry-run runtime paths remain blocked") `
  -RouteHref "/dry-run-runtime-ticket"

Write-Host "[OK] CodexForge Phase 1085 Dry-Run Runtime Ticket smoke passed."
