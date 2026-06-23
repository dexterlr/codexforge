param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1525 Memory Audit Record Preview" `
  -ScriptFile "smoke-codexforge-memory-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\memory-audit-record-preview" `
  -Route "src\app\memory-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Memory Audit Record Preview" `
  -RouteHref "/memory-audit-record-preview" `
  -Markers @("Memory audit record preview", "Memory audit record preview does not promote memory automatically", "Memory audit record preview requires explicit operator approval before promotion", "Memory audit record previews proposed memory scope retention risk redaction evidence support operator approval and denied memory paths", "Denied memory audit paths remain blocked", "Memory audit record checklist")
