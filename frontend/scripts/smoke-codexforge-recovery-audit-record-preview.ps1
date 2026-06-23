param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1524 Recovery Audit Record Preview" `
  -ScriptFile "smoke-codexforge-recovery-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-audit-record-preview" `
  -Route "src\app\recovery-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Recovery Audit Record Preview" `
  -RouteHref "/recovery-audit-record-preview" `
  -Markers @("Recovery audit record preview", "Recovery audit record preview does not execute recovery", "Recovery audit record preview requires backend-owned audit capture", "Recovery audit record previews rollback retry restore stop explain-failure manual-review safety-stop partial-recovery and operator decision records", "Denied recovery audit paths remain blocked", "Recovery audit record checklist")
