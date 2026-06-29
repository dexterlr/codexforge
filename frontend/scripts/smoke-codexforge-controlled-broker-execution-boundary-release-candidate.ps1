param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1753 Controlled Broker Execution Boundary Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-broker-execution-boundary-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-broker-execution-boundary-release-candidate" `
  -Route "src\app\controlled-broker-execution-boundary-release-candidate" `
  -CommandLabel "Go to Controlled Broker Execution Boundary Release Candidate" `
  -RouteHref "/controlled-broker-execution-boundary-release-candidate" `
  -Markers @("Controlled broker execution boundary release candidate", "Controlled broker execution boundary release candidate does not connect brokers store credentials read accounts place orders dispatch orders move money fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled broker execution boundary release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned broker adapter workflows without frontend broker execution", "Denied controlled broker execution boundary paths remain blocked", "Controlled broker execution boundary release checklist")
