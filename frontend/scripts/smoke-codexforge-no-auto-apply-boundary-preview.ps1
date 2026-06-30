param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1830 No Auto Apply Boundary Preview"
  ScriptFile = "smoke-codexforge-no-auto-apply-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-auto-apply-boundary-preview"
  Route = "src\app\no-auto-apply-boundary-preview"
  CommandLabel = "Go to No Auto Apply Boundary Preview"
  RouteHref = "/no-auto-apply-boundary-preview"
  Markers = @("No auto apply boundary preview", "No auto apply boundary preview blocks automatic strategy mutation parameter optimisation rule changes version promotion evidence persistence and execution routing from the UI", "No auto apply boundary preview requires backend-owned change workflow and explicit operator approval", "No auto apply boundary preview shows denied auto apply denied auto tune denied auto promote denied frontend write denied execution route and operator approval gate", "Denied no auto apply paths remain blocked", "No auto apply boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params