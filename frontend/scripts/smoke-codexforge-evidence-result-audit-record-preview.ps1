param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1523 Evidence Result Audit Record Preview" `
  -ScriptFile "smoke-codexforge-evidence-result-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-result-audit-record-preview" `
  -Route "src\app\evidence-result-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Evidence Result Audit Record Preview" `
  -RouteHref "/evidence-result-audit-record-preview" `
  -Markers @("Evidence result audit record preview", "Evidence result audit record preview does not persist evidence or results from the UI", "Evidence result audit record preview requires backend-owned audit capture", "Evidence result audit record previews evidence references result state stdout stderr exit code redaction operator accepted state and audit continuity", "Denied evidence result audit paths remain blocked", "Evidence result audit record checklist")
