param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2235 Cockpit Empty Loading States Preview"
  ScriptFile = "smoke-codexforge-cockpit-empty-loading-states-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Cockpit Empty Loading States Preview"
  RouteHref = "/cockpit-empty-loading-states-preview"
  Markers = @("Cockpit empty loading states preview", "Cockpit empty loading states preview polishes empty and loading-like local mock states without backend fetches timers persistence or network calls", "Cockpit empty loading states preview uses deterministic synthetic placeholders only", "Cockpit empty loading states preview keeps backend wiring required messaging clear", "Denied cockpit empty loading execution paths remain blocked", "Cockpit empty loading states checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
