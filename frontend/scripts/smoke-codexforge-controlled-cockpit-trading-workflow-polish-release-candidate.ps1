param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1897 Controlled Cockpit Trading Workflow Polish Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-cockpit-trading-workflow-polish-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-cockpit-trading-workflow-polish-release-candidate"
  Route = "src\app\controlled-cockpit-trading-workflow-polish-release-candidate"
  CommandLabel = "Go to Controlled Cockpit Trading Workflow Polish Release Candidate"
  RouteHref = "/controlled-cockpit-trading-workflow-polish-release-candidate"
  Markers = @("Controlled cockpit trading workflow polish release candidate", "Controlled cockpit trading workflow polish release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades execute live trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled cockpit trading workflow polish release requires explicit operator approval", "Release candidate prepares CodexForge for a coherent review-only cockpit trading workspace without frontend mutation version persistence approval persistence evidence persistence auto tuning auto promotion paper execution live execution hidden execution affordances or broker execution", "Denied controlled cockpit trading workflow polish paths remain blocked", "Controlled cockpit trading workflow polish checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
