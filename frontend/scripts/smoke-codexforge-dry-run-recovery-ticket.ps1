param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1090 Dry-Run Recovery Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-recovery-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-recovery-ticket" `
  -Route "src\app\dry-run-recovery-ticket" `
  -MainPanel "DryRunRecoveryTicketPanel" `
  -CommandLabel "Go to Dry-Run Recovery Ticket" `
  -Modules @("dry-run-recovery-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunRecoveryTicketStableKey", "buildDryRunRecoveryTicket", "buildDryRunRecoveryTicketItems", "buildDryRunRecoveryTicketBoundary", "buildDryRunRecoveryTicketModel", "summarizeDryRunRecoveryTicket", "DRY_RUN_RECOVERY_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run recovery ticket", "Dry-run recovery ticket does not trigger recovery", "Recovery dry-run requires explicit operator approval", "Recovery tickets include rollback backup restore and retry plans", "Denied dry-run recovery paths remain blocked", "Dry-run recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run recovery ticket does not trigger recovery", "Recovery dry-run requires explicit operator approval", "Denied dry-run recovery paths remain blocked") `
  -RouteHref "/dry-run-recovery-ticket"

Write-Host "[OK] CodexForge Phase 1090 Dry-Run Recovery Ticket smoke passed."
