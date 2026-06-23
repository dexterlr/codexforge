param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1520 Queue Audit Record Preview" `
  -ScriptFile "smoke-codexforge-queue-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\queue-audit-record-preview" `
  -Route "src\app\queue-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Queue Audit Record Preview" `
  -RouteHref "/queue-audit-record-preview" `
  -Markers @("Queue audit record preview", "Queue audit record preview does not create queue jobs from the UI", "Queue audit record preview requires backend-owned audit capture", "Queue audit record previews queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and transitions", "Denied queue audit record paths remain blocked", "Queue audit record checklist")
