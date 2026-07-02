param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2212 UX Safety Regression Guard"
  ScriptFile = "smoke-codexforge-ux-safety-regression-guard.ps1"
  Domain = "src\lib\codexforge\ux-safety-regression-guard"
  Route = "src\app\ux-safety-regression-guard"
  CommandLabel = "Go to UX Safety Regression Guard"
  RouteHref = "/ux-safety-regression-guard"
  Markers = @("UX safety regression guard", "UX safety regression guard verifies the interactive UX remains local state only with no persistence no network no backend execution no browser storage writes no uploads no downloads no render no export no publish no schedule", "UX safety regression guard protects all existing backend contract boundaries", "UX safety regression guard blocks hidden execution affordances", "Denied UX safety regression paths remain blocked", "UX safety regression guard checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
