param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1673 Controlled Trading Mandate Risk Governor Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-trading-mandate-risk-governor-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-trading-mandate-risk-governor-release-candidate" `
  -Route "src\app\controlled-trading-mandate-risk-governor-release-candidate" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Controlled Trading Mandate Risk Governor Release Candidate" `
  -RouteHref "/controlled-trading-mandate-risk-governor-release-candidate" `
  -Markers @("Controlled trading mandate risk governor release candidate", "Controlled trading mandate risk governor release candidate does not connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading size orders monitor live accounts move money dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled trading mandate risk governor release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned trading mandate and risk-governor workflows without frontend trading execution", "Denied controlled trading mandate risk governor paths remain blocked", "Controlled trading mandate risk governor release checklist")
