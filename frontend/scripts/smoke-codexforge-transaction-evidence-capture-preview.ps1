param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1489 Transaction Evidence Capture Preview" `
  -ScriptFile "smoke-codexforge-transaction-evidence-capture-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-evidence-capture-preview" `
  -Route "src\app\transaction-evidence-capture-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Evidence Capture Preview" `
  -RouteHref "/transaction-evidence-capture-preview" `
  -Markers @("Transaction evidence capture preview", "Transaction evidence capture preview does not persist evidence from the UI", "Transaction evidence capture preview requires backend-owned evidence capture", "Transaction evidence capture preview covers diff command stdout stderr exit code approval queue snapshot validation result audit and recovery evidence", "Denied transaction evidence paths remain blocked", "Transaction evidence checklist")
