param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1849 Controlled Strategy Version Review Registry Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-strategy-version-review-registry-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-strategy-version-review-registry-release-candidate"
  Route = "src\app\controlled-strategy-version-review-registry-release-candidate"
  CommandLabel = "Go to Controlled Strategy Version Review Registry Release Candidate"
  RouteHref = "/controlled-strategy-version-review-registry-release-candidate"
  Markers = @("Controlled strategy version review registry release candidate", "Controlled strategy version review registry release candidate does not connect brokers store credentials read accounts read buying power read positions place orders dispatch orders execute trades move money fetch live market data calculate real P&L provide financial advice provide personalised recommendations issue buy sell instructions automate trading auto tune strategies auto promote strategies mutate rules write files apply diffs persist versions persist approvals persist evidence size orders monitor live accounts dispatch workers call local models models providers connectors run commands create snapshots create queues persist transactions persist audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled strategy version review registry release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned strategy version registry workflows without frontend mutation version persistence approval persistence evidence persistence auto tuning strategy promotion or execution", "Denied controlled strategy version review registry paths remain blocked", "Controlled strategy version review registry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
