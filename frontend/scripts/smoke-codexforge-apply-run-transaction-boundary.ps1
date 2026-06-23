param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1482 Apply Run Transaction Boundary" `
  -ScriptFile "smoke-codexforge-apply-run-transaction-boundary.ps1" `
  -Domain "src\lib\codexforge\apply-run-transaction-boundary" `
  -Route "src\app\apply-run-transaction-boundary" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Apply Run Transaction Boundary" `
  -RouteHref "/apply-run-transaction-boundary" `
  -Markers @("Apply run transaction boundary", "Apply run transaction boundary does not create transactions from the UI", "Apply run transaction requires explicit operator approval before execution", "Apply run transaction prepares backend-owned transactional apply and run without broad execution", "Denied apply run transaction paths remain blocked", "Apply run transaction checklist")
