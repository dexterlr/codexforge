param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1817 Controlled Strategy Performance Review Loop Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-strategy-performance-review-loop-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-strategy-performance-review-loop-release-candidate" `
  -Route "src\app\controlled-strategy-performance-review-loop-release-candidate" `
  -CommandLabel "Go to Controlled Strategy Performance Review Loop Release Candidate" `
  -RouteHref "/controlled-strategy-performance-review-loop-release-candidate" `
  -Markers @("Controlled strategy performance review loop release candidate", "Controlled strategy performance review loop release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies promote strategies size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled strategy performance review loop release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned strategy performance review workflows without frontend execution auto tuning strategy promotion or evidence persistence", "Denied controlled strategy performance review loop paths remain blocked", "Controlled strategy performance review loop checklist")
