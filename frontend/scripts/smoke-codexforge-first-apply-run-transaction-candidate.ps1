param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1496 First Apply Run Transaction Candidate" `
  -ScriptFile "smoke-codexforge-first-apply-run-transaction-candidate.ps1" `
  -Domain "src\lib\codexforge\first-apply-run-transaction-candidate" `
  -Route "src\app\first-apply-run-transaction-candidate" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to First Apply Run Transaction Candidate" `
  -RouteHref "/first-apply-run-transaction-candidate" `
  -Markers @("First apply run transaction candidate", "First apply run transaction candidate does not execute transactions from the UI", "First apply run transaction candidate requires explicit operator approval", "Candidate combines intent preflight snapshot guarded apply guarded run validation evidence result audit rollback retry recovery and denied boundaries", "Denied first apply run transaction paths remain blocked", "First apply run transaction checklist")
