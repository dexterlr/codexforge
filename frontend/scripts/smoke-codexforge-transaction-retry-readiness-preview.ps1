param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1493 Transaction Retry Readiness Preview" `
  -ScriptFile "smoke-codexforge-transaction-retry-readiness-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-retry-readiness-preview" `
  -Route "src\app\transaction-retry-readiness-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Retry Readiness Preview" `
  -RouteHref "/transaction-retry-readiness-preview" `
  -Markers @("Transaction retry readiness preview", "Transaction retry readiness preview does not execute retry", "Transaction retry readiness preview requires explicit operator approval", "Transaction retry readiness preview checks failure reason changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity", "Denied transaction retry paths remain blocked", "Transaction retry readiness checklist")
