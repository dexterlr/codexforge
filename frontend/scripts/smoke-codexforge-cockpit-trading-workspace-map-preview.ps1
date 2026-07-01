param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1883 Cockpit Trading Workspace Map Preview"
  ScriptFile = "smoke-codexforge-cockpit-trading-workspace-map-preview.ps1"
  Domain = "src\lib\codexforge\cockpit-trading-workspace-map-preview"
  Route = "src\app\cockpit-trading-workspace-map-preview"
  CommandLabel = "Go to Cockpit Trading Workspace Map Preview"
  RouteHref = "/cockpit-trading-workspace-map-preview"
  Markers = @("Cockpit trading workspace map preview", "Cockpit trading workspace map preview does not create trading advice persist evidence mutate workspaces or create buy sell instructions from the UI", "Cockpit trading workspace map preview requires deterministic synthetic workspace map rows only", "Cockpit trading workspace map preview shows simulated research lane simulated mandate lane simulated strategy lane simulated paper review lane simulated promotion lane and denied frontend persistence", "Denied cockpit trading workspace map paths remain blocked", "Cockpit trading workspace map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
