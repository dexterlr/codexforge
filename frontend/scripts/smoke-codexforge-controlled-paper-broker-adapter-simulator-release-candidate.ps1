param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1769 Controlled Paper Broker Adapter Simulator Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-paper-broker-adapter-simulator-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-paper-broker-adapter-simulator-release-candidate" `
  -Route "src\app\controlled-paper-broker-adapter-simulator-release-candidate" `
  -CommandLabel "Go to Controlled Paper Broker Adapter Simulator Release Candidate" `
  -RouteHref "/controlled-paper-broker-adapter-simulator-release-candidate" `
  -Markers @("Controlled paper broker adapter simulator release candidate", "Controlled paper broker adapter simulator release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades move money fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled paper broker adapter simulator release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned paper broker adapter simulation without frontend broker execution", "Denied controlled paper broker adapter simulator paths remain blocked", "Controlled paper broker adapter simulator release checklist")
