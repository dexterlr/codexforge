param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1492 Transaction Rollback Readiness Preview" `
  -ScriptFile "smoke-codexforge-transaction-rollback-readiness-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-rollback-readiness-preview" `
  -Route "src\app\transaction-rollback-readiness-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Rollback Readiness Preview" `
  -RouteHref "/transaction-rollback-readiness-preview" `
  -Markers @("Transaction rollback readiness preview", "Transaction rollback readiness preview does not execute rollback", "Transaction rollback readiness preview requires explicit operator approval", "Transaction rollback readiness preview checks snapshot availability diff reversibility touched files evidence references audit references and recovery risk", "Denied transaction rollback paths remain blocked", "Transaction rollback readiness checklist")
