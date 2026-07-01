param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1881 Controlled Paper Trading End-to-End Review Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-paper-trading-end-to-end-review-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-paper-trading-end-to-end-review-release-candidate"
  Route = "src\app\controlled-paper-trading-end-to-end-review-release-candidate"
  CommandLabel = "Go to Controlled Paper Trading End-to-End Review Release Candidate"
  RouteHref = "/controlled-paper-trading-end-to-end-review-release-candidate"
  Markers = @("Controlled paper trading end-to-end review release candidate", "Controlled paper trading end-to-end review release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute paper trades execute live trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled paper trading end-to-end review release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned paper trading end-to-end workflows without frontend mutation version persistence approval persistence evidence persistence auto tuning auto promotion paper execution live execution or broker execution", "Denied controlled paper trading end-to-end paths remain blocked", "Controlled paper trading end-to-end checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
