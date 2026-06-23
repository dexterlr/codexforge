param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1484 Transaction Preflight Preview" `
  -ScriptFile "smoke-codexforge-transaction-preflight-preview.ps1" `
  -Domain "src\lib\codexforge\transaction-preflight-preview" `
  -Route "src\app\transaction-preflight-preview" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Transaction Preflight Preview" `
  -RouteHref "/transaction-preflight-preview" `
  -Markers @("Transaction preflight preview", "Transaction preflight preview does not run preflight checks from the UI", "Transaction preflight preview requires explicit operator approval", "Transaction preflight preview checks approval freshness queue state path guard command guard snapshot readiness evidence readiness result readiness audit readiness and recovery readiness", "Denied transaction preflight paths remain blocked", "Transaction preflight checklist")
