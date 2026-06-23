param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1488 Transaction Validation Step" `
  -ScriptFile "smoke-codexforge-transaction-validation-step.ps1" `
  -Domain "src\lib\codexforge\transaction-validation-step" `
  -Route "src\app\transaction-validation-step" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Validation Step" `
  -RouteHref "/transaction-validation-step" `
  -Markers @("Transaction validation step", "Transaction validation step does not run validation from the UI", "Transaction validation step requires explicit operator approval", "Transaction validation step previews build smoke lint test hygiene and domain validation candidates as backend-owned future checks", "Denied transaction validation paths remain blocked", "Transaction validation checklist")
