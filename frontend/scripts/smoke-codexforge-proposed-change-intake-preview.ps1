param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1819 Proposed Change Intake Preview"
  ScriptFile = "smoke-codexforge-proposed-change-intake-preview.ps1"
  Domain = "src\lib\codexforge\proposed-change-intake-preview"
  Route = "src\app\proposed-change-intake-preview"
  CommandLabel = "Go to Proposed Change Intake Preview"
  RouteHref = "/proposed-change-intake-preview"
  Markers = @("Proposed change intake preview", "Proposed change intake preview does not mutate strategy rules write files apply diffs auto tune parameters or promote strategies from the UI", "Proposed change intake preview requires operator-reviewed synthetic change proposals only", "Proposed change intake preview shows simulated change title simulated affected strategy simulated proposed delta simulated rationale simulated evidence gap and no frontend mutation", "Denied proposed change intake paths remain blocked", "Proposed change intake checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params