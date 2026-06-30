param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1824 Parameter Change Review Preview"
  ScriptFile = "smoke-codexforge-parameter-change-review-preview.ps1"
  Domain = "src\lib\codexforge\parameter-change-review-preview"
  Route = "src\app\parameter-change-review-preview"
  CommandLabel = "Go to Parameter Change Review Preview"
  RouteHref = "/parameter-change-review-preview"
  Markers = @("Parameter change review preview", "Parameter change review preview does not auto optimise parameters mutate configs write files apply diffs or generate live signals from the UI", "Parameter change review preview requires operator-reviewed synthetic parameter changes only", "Parameter change review preview shows simulated old parameter simulated new parameter simulated reason simulated risk impact simulated rollback note and no auto tune", "Denied parameter change review paths remain blocked", "Parameter change review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params