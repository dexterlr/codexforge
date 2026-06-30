param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1831 Cockpit Strategy Change Control Summary"
  ScriptFile = "smoke-codexforge-cockpit-strategy-change-control-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-strategy-change-control-summary"
  Route = "src\app\cockpit-strategy-change-control-summary"
  CommandLabel = "Go to Cockpit Strategy Change Control Summary"
  RouteHref = "/cockpit-strategy-change-control-summary"
  Markers = @("Cockpit strategy change control summary", "Cockpit strategy change control summary keeps the cockpit as the normal user surface", "Cockpit strategy change control summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies auto promote strategies mutate rules write files persist approvals place orders dispatch orders execute trades fetch live market data calculate real P&L or persist evidence from the cockpit", "Cockpit strategy change control summary shows proposed change intake rationale packet linked evidence risk impact mandate impact parameter review rule review version draft operator decision rejection approval boundary no auto apply boundary and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit strategy change control checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params