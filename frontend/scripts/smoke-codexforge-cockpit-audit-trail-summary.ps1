param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1527 Cockpit Audit Trail Summary" `
  -ScriptFile "smoke-codexforge-cockpit-audit-trail-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-audit-trail-summary" `
  -Route "src\app\cockpit-audit-trail-summary" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Cockpit Audit Trail Summary" `
  -RouteHref "/cockpit-audit-trail-summary" `
  -Markers @("Cockpit audit trail summary", "Cockpit audit trail summary keeps the cockpit as the normal user surface", "Cockpit audit trail summary does not persist audit logs from the cockpit", "Cockpit audit trail summary shows goal context compiler proposal approval queue transaction apply command evidence result recovery memory denied paths and operator timeline", "Phase pages remain dev test diagnostics only", "Cockpit audit trail checklist")
