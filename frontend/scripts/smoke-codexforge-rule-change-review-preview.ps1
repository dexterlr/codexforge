param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1825 Rule Change Review Preview"
  ScriptFile = "smoke-codexforge-rule-change-review-preview.ps1"
  Domain = "src\lib\codexforge\rule-change-review-preview"
  Route = "src\app\rule-change-review-preview"
  CommandLabel = "Go to Rule Change Review Preview"
  RouteHref = "/rule-change-review-preview"
  Markers = @("Rule change review preview", "Rule change review preview does not alter strategy rules write files apply diffs auto promote strategies or create execution signals from the UI", "Rule change review preview requires backend-owned rule change workflow", "Rule change review preview shows simulated entry rule change simulated exit rule change simulated risk rule change simulated invalidation change simulated evidence basis and denied frontend mutation", "Denied rule change review paths remain blocked", "Rule change review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params