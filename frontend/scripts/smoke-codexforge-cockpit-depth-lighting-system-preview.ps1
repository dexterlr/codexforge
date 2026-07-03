param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2238 Cockpit Depth Lighting System Preview"
  ScriptFile = "smoke-codexforge-cockpit-depth-lighting-system-preview.ps1"
  Domain = "cockpit-depth-lighting-system-preview"
  Route = "cockpit-depth-lighting-system-preview"
  CommandLabel = "Go to Cockpit Depth Lighting System Preview"
  RouteHref = "/cockpit-depth-lighting-system-preview"
  Markers = @("Cockpit depth lighting system preview", "Cockpit depth lighting system preview adds premium depth lighting rings glows borders and layered panel styling without external assets", "Cockpit depth lighting system preview does not compromise readability accessibility or performance", "Cockpit depth lighting system preview keeps the cockpit high-end and usable", "Denied cockpit lighting regression paths remain blocked", "Cockpit depth lighting checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
