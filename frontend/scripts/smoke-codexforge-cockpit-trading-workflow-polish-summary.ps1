param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1895 Cockpit Trading Workflow Polish Summary"
  ScriptFile = "smoke-codexforge-cockpit-trading-workflow-polish-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-trading-workflow-polish-summary"
  Route = "src\app\cockpit-trading-workflow-polish-summary"
  CommandLabel = "Go to Cockpit Trading Workflow Polish Summary"
  RouteHref = "/cockpit-trading-workflow-polish-summary"
  Markers = @("Cockpit trading workflow polish summary", "Cockpit trading workflow polish summary keeps the cockpit as the normal user surface", "Cockpit trading workflow polish summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist versions persist approvals place orders dispatch orders execute paper trades execute live trades fetch live market data calculate real P&L or persist evidence from the cockpit", "Cockpit trading workflow polish summary shows workspace map guided review rail safe next step card status strip evidence gap summary review continuity paper readiness blocked action explainer operator reminders backend prerequisites diagnostic cleanup no hidden execution affordance and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit trading workflow polish checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
