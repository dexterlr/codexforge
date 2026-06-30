param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1785 Controlled Paper Trading Result Ledger Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-paper-trading-result-ledger-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-paper-trading-result-ledger-release-candidate" `
  -Route "src\app\controlled-paper-trading-result-ledger-release-candidate" `
  -CommandLabel "Go to Controlled Paper Trading Result Ledger Release Candidate" `
  -RouteHref "/controlled-paper-trading-result-ledger-release-candidate" `
  -Markers @("Controlled paper trading result ledger release candidate", "Controlled paper trading result ledger release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled paper trading result ledger release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned paper trading result ledger workflows without frontend broker execution or frontend ledger persistence", "Denied controlled paper trading result ledger paths remain blocked", "Controlled paper trading result ledger release checklist")
