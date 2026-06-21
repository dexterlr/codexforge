param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1087 Dry-Run Domain Ticket" `
  -ScriptFile "smoke-codexforge-dry-run-domain-ticket.ps1" `
  -Domain "src\lib\codexforge\dry-run-domain-ticket" `
  -Route "src\app\dry-run-domain-ticket" `
  -MainPanel "DryRunDomainTicketPanel" `
  -CommandLabel "Go to Dry-Run Domain Ticket" `
  -Modules @("dry-run-domain-ticket-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunDomainTicketStableKey", "buildDryRunDomainTicket", "buildDryRunDomainTicketItems", "buildDryRunDomainTicketBoundary", "buildDryRunDomainTicketModel", "summarizeDryRunDomainTicket", "DRY_RUN_DOMAIN_TICKET_LANGUAGE") `
  -PhaseMarkers @("Dry-run domain ticket", "Dry-run domain ticket does not execute domain adapters", "Domain dry-run requires explicit operator approval", "Domain tickets support games apps research creative trading automation data docs and integrations", "Denied dry-run domain paths remain blocked", "Dry-run domain checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run domain ticket does not execute domain adapters", "Domain dry-run requires explicit operator approval", "Denied dry-run domain paths remain blocked") `
  -RouteHref "/dry-run-domain-ticket"

Write-Host "[OK] CodexForge Phase 1087 Dry-Run Domain Ticket smoke passed."
