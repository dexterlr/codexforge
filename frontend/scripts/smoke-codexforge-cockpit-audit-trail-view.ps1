param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1220 Cockpit Audit Trail View" `
  -ScriptFile "smoke-codexforge-cockpit-audit-trail-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-audit-trail-view" `
  -Route "src\app\cockpit-audit-trail-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Audit Trail View" `
  -RouteHref "/cockpit-audit-trail-view" `
  -Markers @("Cockpit audit trail view", "Cockpit audit trail view does not persist audit logs", "Audit trail requires explicit operator approval before future persistence", "Audit trail shows approval evidence result recovery and operator placeholders", "Denied cockpit audit paths remain blocked", "Cockpit audit trail checklist")

