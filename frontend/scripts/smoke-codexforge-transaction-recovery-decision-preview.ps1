param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1494 Transaction Recovery Decision Preview" `
  -ScriptFile "smoke-codexforge-transaction-recovery-decision-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-recovery-decision-preview" `
  -Route "src\app\transaction-recovery-decision-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Recovery Decision Preview" `
  -RouteHref "/transaction-recovery-decision-preview" `
  -Markers @("Transaction recovery decision preview", "Transaction recovery decision preview does not execute recovery", "Transaction recovery decision preview requires explicit operator approval", "Transaction recovery decision preview shows rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery decisions", "Denied transaction recovery paths remain blocked", "Transaction recovery decision checklist")
