param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2231 Responsive Command Centre Layout Preview"
  ScriptFile = "smoke-codexforge-responsive-command-centre-layout-preview.ps1"
  Domain = "responsive-command-centre-layout-preview"
  Route = "responsive-command-centre-layout-preview"
  CommandLabel = "Go to Responsive Command Centre Layout Preview"
  RouteHref = "/responsive-command-centre-layout-preview"
  Markers = @("Responsive command centre layout preview", "Responsive command centre layout preview improves desktop tablet and mobile layout for the cockpit command centre", "Responsive command centre layout preview does not remove cockpit content contract safety or route coverage", "Responsive command centre layout preview keeps interactions local state only", "Denied responsive layout regression paths remain blocked", "Responsive command centre layout checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
