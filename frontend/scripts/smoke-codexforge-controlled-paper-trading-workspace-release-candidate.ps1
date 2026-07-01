param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1913 Controlled Paper Trading Workspace Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-paper-trading-workspace-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-paper-trading-workspace-release-candidate"
  Route = "src\app\controlled-paper-trading-workspace-release-candidate"
  CommandLabel = "Go to Controlled Paper Trading Workspace Release Candidate"
  RouteHref = "/controlled-paper-trading-workspace-release-candidate"
  Markers = @("Controlled paper trading workspace release candidate", "Controlled paper trading workspace release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades execute live trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence persist queues size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage transition to live trading or guarantee performance from the frontend", "Controlled paper trading workspace release requires explicit operator approval", "Release candidate completes the review-only frontend paper trading workspace and prepares CodexForge to switch to the Video Creation Domain Pack without enabling frontend mutation version persistence approval persistence evidence persistence auto tuning auto promotion paper execution live execution hidden execution affordances broker execution or live transition", "Denied controlled paper trading workspace paths remain blocked", "Controlled paper trading workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params
