param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1863 Cockpit Paper Strategy Promotion Gate Summary"
  ScriptFile = "smoke-codexforge-cockpit-paper-strategy-promotion-gate-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-paper-strategy-promotion-gate-summary"
  Route = "src\app\cockpit-paper-strategy-promotion-gate-summary"
  CommandLabel = "Go to Cockpit Paper Strategy Promotion Gate Summary"
  RouteHref = "/cockpit-paper-strategy-promotion-gate-summary"
  Markers = @("Cockpit paper strategy promotion gate summary", "Cockpit paper strategy promotion gate summary keeps the cockpit as the normal user surface", "Cockpit paper strategy promotion gate summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data calculate real P&L or persist evidence from the cockpit", "Cockpit paper strategy promotion gate summary shows promotion eligibility evidence sufficiency risk governor mandate compatibility version readiness simulated readiness score blocker queue operator review rejection packet hold state approval boundary no auto promote execution boundary and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit paper strategy promotion gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
