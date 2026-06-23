param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1491 Transaction Audit Capture Preview" `
  -ScriptFile "smoke-codexforge-transaction-audit-capture-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-audit-capture-preview" `
  -Route "src\app\transaction-audit-capture-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Audit Capture Preview" `
  -RouteHref "/transaction-audit-capture-preview" `
  -Markers @("Transaction audit capture preview", "Transaction audit capture preview does not persist audit logs from the UI", "Transaction audit capture preview requires backend-owned audit capture", "Transaction audit capture preview records goal context plan diff command approval queue transaction snapshot evidence result recovery operator and denied paths", "Denied transaction audit paths remain blocked", "Transaction audit checklist")
