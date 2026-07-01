param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1865 Controlled Paper Strategy Promotion Gate Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-paper-strategy-promotion-gate-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-paper-strategy-promotion-gate-release-candidate"
  Route = "src\app\controlled-paper-strategy-promotion-gate-release-candidate"
  CommandLabel = "Go to Controlled Paper Strategy Promotion Gate Release Candidate"
  RouteHref = "/controlled-paper-strategy-promotion-gate-release-candidate"
  Markers = @("Controlled paper strategy promotion gate release candidate", "Controlled paper strategy promotion gate release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades execute live trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled paper strategy promotion gate release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned paper strategy promotion workflows without frontend mutation version persistence approval persistence evidence persistence auto tuning auto promotion paper execution live execution or broker execution", "Denied controlled paper strategy promotion gate paths remain blocked", "Controlled paper strategy promotion gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
