param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1516 Context Audit Record Preview" `
  -ScriptFile "smoke-codexforge-context-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\context-audit-record-preview" `
  -Route "src\app\context-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Context Audit Record Preview" `
  -RouteHref "/context-audit-record-preview" `
  -Markers @("Context audit record preview", "Context audit record preview does not crawl arbitrary files from the UI", "Context audit record preview requires backend-owned audit capture", "Context audit record previews workspace identity project map stack files commands risks confidence and denied context boundaries", "Denied context audit paths remain blocked", "Context audit record checklist")
