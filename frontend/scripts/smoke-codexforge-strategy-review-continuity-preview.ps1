param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1888 Strategy Review Continuity Preview"
  ScriptFile = "smoke-codexforge-strategy-review-continuity-preview.ps1"
  Domain = "src\lib\codexforge\strategy-review-continuity-preview"
  Route = "src\app\strategy-review-continuity-preview"
  CommandLabel = "Go to Strategy Review Continuity Preview"
  RouteHref = "/strategy-review-continuity-preview"
  Markers = @("Strategy review continuity preview", "Strategy review continuity preview does not auto create change requests mutate strategies write files approve revisions or promote versions from the UI", "Strategy review continuity preview requires backend-owned continuity workflow", "Strategy review continuity preview shows simulated prior review simulated change request simulated version reference simulated promotion gate reference simulated paper review reference and denied frontend mutation", "Denied strategy review continuity paths remain blocked", "Strategy review continuity checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
