param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1833 Controlled Strategy Change Control Workflow Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-strategy-change-control-workflow-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-strategy-change-control-workflow-release-candidate"
  Route = "src\app\controlled-strategy-change-control-workflow-release-candidate"
  CommandLabel = "Go to Controlled Strategy Change Control Workflow Release Candidate"
  RouteHref = "/controlled-strategy-change-control-workflow-release-candidate"
  Markers = @("Controlled strategy change control workflow release candidate", "Controlled strategy change control workflow release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled strategy change control workflow release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned strategy change control workflows without frontend mutation approval persistence evidence persistence auto tuning strategy promotion or execution", "Denied controlled strategy change control workflow paths remain blocked", "Controlled strategy change control workflow checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params