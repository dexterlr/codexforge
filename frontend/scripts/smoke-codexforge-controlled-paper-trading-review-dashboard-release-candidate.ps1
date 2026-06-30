param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1801 Controlled Paper Trading Review Dashboard Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-paper-trading-review-dashboard-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-paper-trading-review-dashboard-release-candidate" `
  -Route "src\app\controlled-paper-trading-review-dashboard-release-candidate" `
  -CommandLabel "Go to Controlled Paper Trading Review Dashboard Release Candidate" `
  -RouteHref "/controlled-paper-trading-review-dashboard-release-candidate" `
  -Markers @("Controlled paper trading review dashboard release candidate", "Controlled paper trading review dashboard release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled paper trading review dashboard release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned paper trading review workflows without frontend broker execution dashboard persistence or evidence persistence", "Denied controlled paper trading review dashboard paths remain blocked", "Controlled paper trading review dashboard release checklist")
