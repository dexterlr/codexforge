param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2232 Cockpit Visual Accessibility Guard"
  ScriptFile = "smoke-codexforge-cockpit-visual-accessibility-guard.ps1"
  Domain = "cockpit-visual-accessibility-guard"
  Route = "cockpit-visual-accessibility-guard"
  CommandLabel = "Go to Cockpit Visual Accessibility Guard"
  RouteHref = "/cockpit-visual-accessibility-guard"
  Markers = @("Cockpit visual accessibility guard", "Cockpit visual accessibility guard verifies readable contrast visible focus language clarity and non-tiny text for the premium cockpit", "Cockpit visual accessibility guard does not add backend execution persistence network calls or hidden actions", "Cockpit visual accessibility guard keeps visual polish accessible", "Denied accessibility regression paths remain blocked", "Cockpit visual accessibility checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
