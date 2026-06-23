param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1526 Denied Path Audit Record Preview" `
  -ScriptFile "smoke-codexforge-denied-path-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\denied-path-audit-record-preview" `
  -Route "src\app\denied-path-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Denied Path Audit Record Preview" `
  -RouteHref "/denied-path-audit-record-preview" `
  -Markers @("Denied path audit record preview", "Denied path audit record preview does not mutate workflow state", "Denied path audit record preview requires backend-owned audit capture", "Denied path audit record previews denied files commands models providers connectors secrets installs deploys ports runtimes persistence recovery memory and frontend execution", "Denied path audit paths remain blocked", "Denied path audit record checklist")
