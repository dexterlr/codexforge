param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1899 Paper Trading Workspace Release Map Preview"
  ScriptFile = "smoke-codexforge-paper-trading-workspace-release-map-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-workspace-release-map-preview"
  Route = "src\app\paper-trading-workspace-release-map-preview"
  CommandLabel = "Go to Paper Trading Workspace Release Map Preview"
  RouteHref = "/paper-trading-workspace-release-map-preview"
  Markers = @("Paper trading workspace release map preview", "Paper trading workspace release map preview does not create trading advice persist evidence mutate workspaces or create buy sell instructions from the UI", "Paper trading workspace release map preview requires deterministic synthetic release map rows only", "Paper trading workspace release map preview shows simulated research lane simulated mandate lane simulated risk lane simulated strategy lane simulated paper review lane simulated release lane and denied frontend persistence", "Denied paper trading workspace release map paths remain blocked", "Paper trading workspace release map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

