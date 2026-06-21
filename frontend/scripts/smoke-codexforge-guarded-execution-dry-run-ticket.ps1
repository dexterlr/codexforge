param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1079 Guarded Execution Dry-Run Ticket" `
  -ScriptFile "smoke-codexforge-guarded-execution-dry-run-ticket.ps1" `
  -Domain "src\lib\codexforge\guarded-execution-dry-run-ticket" `
  -Route "src\app\guarded-execution-dry-run-ticket" `
  -MainPanel "GuardedExecutionDryRunTicketPanel" `
  -CommandLabel "Go to Guarded Execution Dry-Run Ticket" `
  -Modules @("guarded-execution-dry-run-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedExecutionDryRunTicketStableKey", "buildGuardedExecutionDryRunTicket", "buildGuardedExecutionDryRunTicketItems", "buildGuardedExecutionDryRunTicketBoundary", "buildGuardedExecutionDryRunTicketModel", "summarizeGuardedExecutionDryRunTicket", "GUARDED_EXECUTION_DRY_RUN_TICKET_LANGUAGE") `
  -PhaseMarkers @("Guarded execution dry-run ticket", "Guarded execution dry-run ticket does not run dry-runs", "Dry-run tickets require explicit operator approval", "Dry-run tickets preserve shared brain memory evidence result and audit gates", "Denied guarded execution dry-run ticket paths remain blocked", "Guarded execution dry-run ticket checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded execution dry-run ticket does not run dry-runs", "Dry-run tickets require explicit operator approval", "Denied guarded execution dry-run ticket paths remain blocked") `
  -RouteHref "/guarded-execution-dry-run-ticket"

Write-Host "[OK] CodexForge Phase 1079 Guarded Execution Dry-Run Ticket smoke passed."
