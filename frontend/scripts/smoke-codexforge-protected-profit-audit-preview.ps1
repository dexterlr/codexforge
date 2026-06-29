param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1715 Protected Profit Audit Preview" `
  -ScriptFile "smoke-codexforge-protected-profit-audit-preview.ps1" `
  -Domain "src\lib\codexforge\protected-profit-audit-preview" `
  -Route "src\app\protected-profit-audit-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Protected Profit Audit Preview" `
  -RouteHref "/protected-profit-audit-preview" `
  -Markers @("Protected profit audit preview", "Protected profit audit preview does not persist audit evidence or money movement decisions from the UI", "Protected profit audit preview requires backend-owned capture", "Protected profit audit preview shows realised profit evidence lock percentage evidence protected bucket evidence release evidence redaction and audit continuity", "Denied protected profit audit paths remain blocked", "Protected profit audit checklist")
