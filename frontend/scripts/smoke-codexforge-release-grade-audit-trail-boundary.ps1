param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1514 Release-Grade Audit Trail Boundary" `
  -ScriptFile "smoke-codexforge-release-grade-audit-trail-boundary.ps1" `
  -Domain "src\lib\codexforge\release-grade-audit-trail-boundary" `
  -Route "src\app\release-grade-audit-trail-boundary" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Release-Grade Audit Trail Boundary" `
  -RouteHref "/release-grade-audit-trail-boundary" `
  -Markers @("Release-grade audit trail boundary", "Release-grade audit trail boundary does not persist audit logs from the UI", "Release-grade audit trail requires backend-owned audit capture", "Release-grade audit trail prepares trustworthy operator-visible audit records without broad execution", "Denied release-grade audit paths remain blocked", "Release-grade audit trail checklist")
