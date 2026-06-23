param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1529 Controlled Release-Grade Audit Trail Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-release-grade-audit-trail-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-release-grade-audit-trail-release-candidate" `
  -Route "src\app\controlled-release-grade-audit-trail-release-candidate" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Controlled Release-Grade Audit Trail Release Candidate" `
  -RouteHref "/controlled-release-grade-audit-trail-release-candidate" `
  -Markers @("Controlled release-grade audit trail release candidate", "Controlled release-grade audit trail release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes or write browser storage from the frontend", "Controlled release-grade audit trail release requires backend-owned audit capture", "Release candidate prepares CodexForge for backend-owned release-grade audit capture without frontend audit persistence", "Denied controlled release-grade audit paths remain blocked", "Controlled release-grade audit trail release checklist")
