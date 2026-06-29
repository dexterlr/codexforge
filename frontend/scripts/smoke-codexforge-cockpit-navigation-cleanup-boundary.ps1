param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1722 Cockpit Navigation Cleanup Boundary" `
  -ScriptFile "smoke-codexforge-cockpit-navigation-cleanup-boundary.ps1" `
  -Domain "src\lib\codexforge\cockpit-navigation-cleanup-boundary" `
  -Route "src\app\cockpit-navigation-cleanup-boundary" `
  -CommandLabel "Go to Cockpit Navigation Cleanup Boundary" `
  -RouteHref "/cockpit-navigation-cleanup-boundary" `
  -Markers @("Cockpit navigation cleanup boundary", "Cockpit navigation cleanup boundary does not delete routes remove smokes hide safety state or enable execution", "Cockpit navigation cleanup boundary requires explicit operator approval", "Cockpit navigation cleanup boundary keeps phase pages as diagnostics while normal users start at /codexforge-cockpit", "Denied cockpit navigation cleanup paths remain blocked", "Cockpit navigation cleanup checklist")
