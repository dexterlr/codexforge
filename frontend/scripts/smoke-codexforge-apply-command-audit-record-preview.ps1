param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1522 Apply Command Audit Record Preview" `
  -ScriptFile "smoke-codexforge-apply-command-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\apply-command-audit-record-preview" `
  -Route "src\app\apply-command-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Apply Command Audit Record Preview" `
  -RouteHref "/apply-command-audit-record-preview" `
  -Markers @("Apply command audit record preview", "Apply command audit record preview does not write files or run commands from the UI", "Apply command audit record preview requires backend-owned audit capture", "Apply command audit record previews guarded apply path guard diff command allowlist arguments working directory timeout stdout stderr exit code and denied commands", "Denied apply command audit paths remain blocked", "Apply command audit record checklist")
