param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2245 Jarvis Cockpit Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-jarvis-cockpit-navigation-regression-guard.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Jarvis Cockpit Navigation Regression Guard"
  RouteHref = "/jarvis-cockpit-navigation-regression-guard"
  Markers = @("Jarvis cockpit navigation regression guard", "Jarvis cockpit navigation regression guard verifies Jarvis visual routes are registered without duplicate command palette hrefs invalid route hrefs invalid navigation groups invalid safety posture values or broken cockpit links", "Jarvis cockpit navigation regression guard keeps phase pages diagnostics and cockpit normal user surface", "Jarvis cockpit navigation regression guard preserves existing contract and UX navigation coverage", "Denied Jarvis navigation regression paths remain blocked", "Jarvis cockpit navigation regression checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
