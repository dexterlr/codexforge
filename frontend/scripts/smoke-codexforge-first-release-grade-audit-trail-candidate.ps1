param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1528 First Release-Grade Audit Trail Candidate" `
  -ScriptFile "smoke-codexforge-first-release-grade-audit-trail-candidate.ps1" `
  -Domain "src\lib\codexforge\first-release-grade-audit-trail-candidate" `
  -Route "src\app\first-release-grade-audit-trail-candidate" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to First Release-Grade Audit Trail Candidate" `
  -RouteHref "/first-release-grade-audit-trail-candidate" `
  -Markers @("First release-grade audit trail candidate", "First release-grade audit trail candidate does not persist audit logs from the UI", "First release-grade audit trail candidate requires backend-owned audit capture", "Candidate combines goal context compiler proposal approval queue transaction apply command evidence result recovery memory denied paths and operator timeline", "Denied first release-grade audit paths remain blocked", "First release-grade audit trail checklist")
