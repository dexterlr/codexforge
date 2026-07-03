param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2218 Jarvis Cockpit Visual System"
  ScriptFile = "smoke-codexforge-jarvis-cockpit-visual-system.ps1"
  Domain = "jarvis-cockpit-visual-system"
  Route = "jarvis-cockpit-visual-system"
  CommandLabel = "Go to Jarvis Cockpit Visual System"
  RouteHref = "/jarvis-cockpit-visual-system"
  Markers = @("Jarvis cockpit visual system", "Jarvis cockpit visual system upgrades the cockpit with premium dark glass mission control visuals while preserving local React state only and no backend execution", "Jarvis cockpit visual system does not call providers call models call connectors upload files download files render videos export videos publish content schedule content create APIs create services run commands persist projects or write browser storage", "Jarvis cockpit visual system makes /codexforge-cockpit feel like a high-end AI command centre", "Denied Jarvis cockpit execution paths remain blocked", "Jarvis cockpit visual system checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
