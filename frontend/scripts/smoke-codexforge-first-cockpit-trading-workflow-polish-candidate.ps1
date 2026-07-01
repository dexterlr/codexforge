param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1896 First Cockpit Trading Workflow Polish Candidate"
  ScriptFile = "smoke-codexforge-first-cockpit-trading-workflow-polish-candidate.ps1"
  Domain = "src\lib\codexforge\first-cockpit-trading-workflow-polish-candidate"
  Route = "src\app\first-cockpit-trading-workflow-polish-candidate"
  CommandLabel = "Go to First Cockpit Trading Workflow Polish Candidate"
  RouteHref = "/first-cockpit-trading-workflow-polish-candidate"
  Markers = @("First cockpit trading workflow polish candidate", "First cockpit trading workflow polish candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement paper execution live execution broker execution or dispatch from the UI", "First cockpit trading workflow polish candidate requires explicit operator approval", "Candidate combines workspace map guided review rail safe next step card status strip evidence gap summary review continuity paper readiness blocked action explainer operator reminder backend prerequisite summary diagnostic route cleanup no hidden execution affordance cockpit summary and denied paths", "Denied first cockpit trading workflow polish paths remain blocked", "First cockpit trading workflow polish checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
