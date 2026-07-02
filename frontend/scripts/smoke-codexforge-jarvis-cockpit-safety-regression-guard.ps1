param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2244 Jarvis Cockpit Safety Regression Guard"
  ScriptFile = "smoke-codexforge-jarvis-cockpit-safety-regression-guard.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Jarvis Cockpit Safety Regression Guard"
  RouteHref = "/jarvis-cockpit-safety-regression-guard"
  Markers = @("Jarvis cockpit safety regression guard", "Jarvis cockpit safety regression guard verifies the visual upgrade remains local state only with no persistence no network no backend execution no browser storage writes no uploads no downloads no render no export no publish no schedule", "Jarvis cockpit safety regression guard protects all existing backend contract boundaries", "Jarvis cockpit safety regression guard blocks hidden execution affordances", "Denied Jarvis safety regression paths remain blocked", "Jarvis cockpit safety regression checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
