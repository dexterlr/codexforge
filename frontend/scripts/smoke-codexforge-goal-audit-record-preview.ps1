param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1515 Goal Audit Record Preview" `
  -ScriptFile "smoke-codexforge-goal-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\goal-audit-record-preview" `
  -Route "src\app\goal-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Goal Audit Record Preview" `
  -RouteHref "/goal-audit-record-preview" `
  -Markers @("Goal audit record preview", "Goal audit record preview does not claim execution happened", "Goal audit record preview requires backend-owned audit capture", "Goal audit record previews raw goal normalized goal domain task target done criteria and operator timeline reference", "Denied goal audit paths remain blocked", "Goal audit record checklist")
