param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1517 Compiler Audit Record Preview" `
  -ScriptFile "smoke-codexforge-compiler-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\compiler-audit-record-preview" `
  -Route "src\app\compiler-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Compiler Audit Record Preview" `
  -RouteHref "/compiler-audit-record-preview" `
  -Markers @("Compiler audit record preview", "Compiler audit record preview does not call models", "Compiler audit record preview requires backend-owned audit capture", "Compiler audit record previews goal compiler decisions domain task target context files commands risk approval evidence done recovery and model tool hints", "Denied compiler audit paths remain blocked", "Compiler audit record checklist")
