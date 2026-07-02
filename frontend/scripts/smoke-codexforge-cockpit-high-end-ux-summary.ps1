param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2241 Cockpit High End UX Summary"
  ScriptFile = "smoke-codexforge-cockpit-high-end-ux-summary.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Cockpit High End UX Summary"
  RouteHref = "/cockpit-high-end-ux-summary"
  Markers = @("Cockpit high end UX summary", "Cockpit high end UX summary documents that the cockpit has a premium Jarvis-style visual upgrade while remaining local-state only and backend-blocked", "Cockpit high end UX summary does not claim live backend generation rendering export publish schedule storage or persistence", "Cockpit high end UX summary maps visual improvements to safe product surfaces", "Denied high end UX summary regression paths remain blocked", "Cockpit high end UX summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
