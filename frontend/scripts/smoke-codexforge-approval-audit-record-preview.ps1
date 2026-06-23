param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1519 Approval Audit Record Preview" `
  -ScriptFile "smoke-codexforge-approval-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\approval-audit-record-preview" `
  -Route "src\app\approval-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Approval Audit Record Preview" `
  -RouteHref "/approval-audit-record-preview" `
  -Markers @("Approval audit record preview", "Approval audit record preview does not persist approvals from the UI", "Approval audit record preview requires explicit human approval", "Approval audit record previews operator identity scope expiry approval freshness replay protection risk level files commands and denied paths", "Denied approval audit paths remain blocked", "Approval audit record checklist")
