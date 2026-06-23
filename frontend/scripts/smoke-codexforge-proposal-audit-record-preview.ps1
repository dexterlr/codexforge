param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1518 Proposal Audit Record Preview" `
  -ScriptFile "smoke-codexforge-proposal-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\proposal-audit-record-preview" `
  -Route "src\app\proposal-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Proposal Audit Record Preview" `
  -RouteHref "/proposal-audit-record-preview" `
  -Markers @("Proposal audit record preview", "Proposal audit record preview does not execute proposals", "Proposal audit record preview requires backend-owned audit capture", "Proposal audit record previews plan files diff commands risks approval hold evidence result recovery timeline and model tool handoff", "Denied proposal audit paths remain blocked", "Proposal audit record checklist")
