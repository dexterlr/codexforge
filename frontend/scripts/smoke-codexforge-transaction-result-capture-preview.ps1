param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1490 Transaction Result Capture Preview" `
  -ScriptFile "smoke-codexforge-transaction-result-capture-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-result-capture-preview" `
  -Route "src\app\transaction-result-capture-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Result Capture Preview" `
  -RouteHref "/transaction-result-capture-preview" `
  -Markers @("Transaction result capture preview", "Transaction result capture preview does not persist results from the UI", "Transaction result capture preview requires backend-owned result capture", "Transaction result capture preview covers success blocked denied failed timeout canceled manual-review retryable recovered and operator-accepted outcomes", "Denied transaction result paths remain blocked", "Transaction result checklist")
