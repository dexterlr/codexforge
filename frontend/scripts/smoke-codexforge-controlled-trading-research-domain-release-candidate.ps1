param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1657 Controlled Trading Research Domain Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-trading-research-domain-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-trading-research-domain-release-candidate" `
  -Route "src\app\controlled-trading-research-domain-release-candidate" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Controlled Trading Research Domain Release Candidate" `
  -RouteHref "/controlled-trading-research-domain-release-candidate" `
  -Markers @("Controlled trading research domain release candidate", "Controlled trading research domain release candidate does not connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled trading research domain release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned trading research workflows without frontend trading execution", "Denied controlled trading research domain paths remain blocked", "Controlled trading research domain release checklist")
