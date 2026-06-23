param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-apply-run-transaction-smoke-helper.ps1") `
  -SmokeName "Phase 1497 Controlled Apply Run Transaction Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-apply-run-transaction-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-apply-run-transaction-release-candidate" `
  -Route "src\app\controlled-apply-run-transaction-release-candidate" `
  -MainPanel "ApplyRunTransactionRoutePanel" `
  -CommandLabel "Go to Controlled Apply Run Transaction Release Candidate" `
  -RouteHref "/controlled-apply-run-transaction-release-candidate" `
  -Markers @("Controlled apply run transaction release candidate", "Controlled apply run transaction release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery or write browser storage from the frontend", "Controlled apply run transaction release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned transactional apply/run without frontend transaction persistence", "Denied controlled apply run transaction paths remain blocked", "Controlled apply run transaction release checklist")
