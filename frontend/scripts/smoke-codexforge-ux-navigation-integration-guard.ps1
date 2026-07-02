param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2213 UX Navigation Integration Guard"
  ScriptFile = "smoke-codexforge-ux-navigation-integration-guard.ps1"
  Domain = "src\lib\codexforge\ux-navigation-integration-guard"
  Route = "src\app\ux-navigation-integration-guard"
  CommandLabel = "Go to UX Navigation Integration Guard"
  RouteHref = "/ux-navigation-integration-guard"
  Markers = @("UX navigation integration guard", "UX navigation integration guard verifies interactive workspace routes are registered without duplicate command palette hrefs invalid route hrefs invalid navigation groups invalid safety posture values or broken cockpit links", "UX navigation integration guard keeps phase pages diagnostics and cockpit normal user surface", "UX navigation integration guard preserves existing contract navigation coverage", "Denied UX navigation regression paths remain blocked", "UX navigation integration guard checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
