param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2230 Premium Dark Glass Theme Preview"
  ScriptFile = "smoke-codexforge-premium-dark-glass-theme-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Premium Dark Glass Theme Preview"
  RouteHref = "/premium-dark-glass-theme-preview"
  Markers = @("Premium dark glass theme preview", "Premium dark glass theme preview adds dark glass visual treatment gradients rings borders shadows and readable contrast without external assets or packages", "Premium dark glass theme preview does not add network assets remote fonts images videos package installs or unsafe CSS side effects", "Premium dark glass theme preview keeps accessibility and performance in scope", "Denied premium theme unsafe paths remain blocked", "Premium dark glass theme checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
