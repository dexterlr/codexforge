param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2237 Cockpit Iconography System Preview"
  ScriptFile = "smoke-codexforge-cockpit-iconography-system-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Cockpit Iconography System Preview"
  RouteHref = "/cockpit-iconography-system-preview"
  Markers = @("Cockpit iconography system preview", "Cockpit iconography system preview adds text-safe or existing-icon visual markers for mission status workspace sections and blocked actions", "Cockpit iconography system preview does not import new icon packages remote icons images or external assets", "Cockpit iconography system preview keeps visual markers accessible", "Denied cockpit iconography unsafe paths remain blocked", "Cockpit iconography checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
