param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1689 Controlled Strategy Lab Signal Engine Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-strategy-lab-signal-engine-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-strategy-lab-signal-engine-release-candidate" `
  -Route "src\app\controlled-strategy-lab-signal-engine-release-candidate" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Controlled Strategy Lab Signal Engine Release Candidate" `
  -RouteHref "/controlled-strategy-lab-signal-engine-release-candidate" `
  -Markers @("Controlled strategy lab signal engine release candidate", "Controlled strategy lab signal engine release candidate does not execute signals connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading size orders monitor live accounts move money dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled strategy lab signal engine release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned strategy and signal workflows without frontend trading execution", "Denied controlled strategy lab signal engine paths remain blocked", "Controlled strategy lab signal engine release checklist")
