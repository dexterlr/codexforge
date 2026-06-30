param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1832 First Strategy Change Control Workflow Candidate"
  ScriptFile = "smoke-codexforge-first-strategy-change-control-workflow-candidate.ps1"
  Domain = "src\lib\codexforge\first-strategy-change-control-workflow-candidate"
  Route = "src\app\first-strategy-change-control-workflow-candidate"
  CommandLabel = "Go to First Strategy Change Control Workflow Candidate"
  RouteHref = "/first-strategy-change-control-workflow-candidate"
  Markers = @("First strategy change control workflow candidate", "First strategy change control workflow candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes approval persistence evidence persistence order placement or dispatch from the UI", "First strategy change control workflow candidate requires explicit operator approval", "Candidate combines proposed change intake rationale packet linked evidence risk impact mandate impact parameter change review rule change review strategy version draft operator decision rejection approval boundary no auto apply boundary cockpit summary and denied paths", "Denied first strategy change control workflow paths remain blocked", "First strategy change control workflow checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params