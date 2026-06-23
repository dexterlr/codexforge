param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-release-grade-audit-trail-smoke-helper.ps1") `
  -SmokeName "Phase 1521 Transaction Audit Record Preview" `
  -ScriptFile "smoke-codexforge-transaction-audit-record-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-audit-record-preview" `
  -Route "src\app\transaction-audit-record-preview" `
  -MainPanel "ReleaseGradeAuditTrailRoutePanel" `
  -CommandLabel "Go to Transaction Audit Record Preview" `
  -RouteHref "/transaction-audit-record-preview" `
  -Markers @("Transaction audit record preview", "Transaction audit record preview does not create transactions from the UI", "Transaction audit record preview requires backend-owned audit capture", "Transaction audit record previews intent preflight snapshot apply run validate evidence result audit rollback retry recovery and denied boundaries", "Denied transaction audit record paths remain blocked", "Transaction audit record checklist")
