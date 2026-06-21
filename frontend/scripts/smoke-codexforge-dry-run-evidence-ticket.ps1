param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1088 Dry-Run Evidence Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-evidence-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-evidence-ticket" `
  -Route "src\app\dry-run-evidence-ticket" `
  -MainPanel "DryRunEvidenceTicketPanel" `
  -CommandLabel "Go to Dry-Run Evidence Ticket" `
  -Modules @("dry-run-evidence-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunEvidenceTicketStableKey", "buildDryRunEvidenceTicket", "buildDryRunEvidenceTicketItems", "buildDryRunEvidenceTicketBoundary", "buildDryRunEvidenceTicketModel", "summarizeDryRunEvidenceTicket", "DRY_RUN_EVIDENCE_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run evidence ticket", "Dry-run evidence ticket does not persist evidence", "Evidence dry-run requires explicit operator approval", "Evidence tickets route future outputs through shared evidence review", "Denied dry-run evidence paths remain blocked", "Dry-run evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run evidence ticket does not persist evidence", "Evidence dry-run requires explicit operator approval", "Denied dry-run evidence paths remain blocked") `
  -RouteHref "/dry-run-evidence-ticket"

Write-Host "[OK] CodexForge Phase 1088 Dry-Run Evidence Ticket smoke passed."
